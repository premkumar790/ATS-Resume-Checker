const express = require("express");
const router = express.Router();
const multer = require("multer");
const Groq = require("groq-sdk");
const pdfParse = require("pdf-parse");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

async function extractTextFromPDF(buffer) {
    const data = await pdfParse(buffer);
    return data.text;
}

router.post("/analyze", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "No file uploaded" });
        }

        console.log("📄 File received:", req.file.originalname);

        const resumeText = await extractTextFromPDF(req.file.buffer);
        console.log("📄 RESUME TEXT START 👉", resumeText.slice(0, 200));

        if (!resumeText || resumeText.trim().length < 50) {
            return res.status(400).json({
                success: false,
                error: "PDF se text nahi nikla. Readable PDF upload karein."
            });
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        // ============================================================
        // 🔥 PROMPT 1 — Main Analysis
        // ============================================================

        const analysisPrompt = `
You are an ATS resume analyzer.
Analyze the resume and return ONLY raw JSON, no markdown, no explanation.

{
  "candidate_name": "",
  "role": "",
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

RULES:
- candidate_name: Full name at top of resume, exactly as written
- If name not found, return "Unknown"
- strengths, weaknesses, suggestions must be arrays of strings
- suggestions must NOT be empty
- Return ONLY the JSON object
`;

        // ============================================================
        // 🔥 PROMPT 2 — Keywords Only
        // ============================================================

        const keywordsPrompt = `
You are an ATS keyword expert.
Based on this resume, return ONLY a raw JSON array of 12 important ATS keywords for the detected job role.

Example:
["Kotlin", "MVVM", "Android SDK", "Retrofit", "Room Database", "Firebase", "REST API", "Git", "Java", "UI/UX", "Material Design", "Jetpack Compose"]

STRICT RULES:
- Return ONLY the JSON array
- No object, no key, no markdown, no explanation
- Exactly 12 strings
`;

        // ============================================================
        // 🔥 PARALLEL AI CALLS
        // ============================================================

        const [analysisRes, keywordsRes] = await Promise.all([
            groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                temperature: 0.1,
                messages: [
                    { role: "system", content: analysisPrompt },
                    { role: "user", content: resumeText }
                ]
            }),
            groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                temperature: 0.2,
                messages: [
                    { role: "system", content: keywordsPrompt },
                    { role: "user", content: resumeText }
                ]
            })
        ]);

        // ============================================================
        // 🔥 PARSE ANALYSIS
        // ============================================================

        const analysisRaw = analysisRes.choices[0].message.content.trim();
        console.log("📝 ANALYSIS RAW:", analysisRaw);

        const analysisJson = analysisRaw.match(/\{[\s\S]*\}/);
        if (!analysisJson) throw new Error("Analysis JSON parse failed");
        const analysis = JSON.parse(analysisJson[0]);
        console.log("✅ Analysis parsed");

        // ============================================================
        // 🔥 PARSE KEYWORDS
        // ============================================================

        const keywordsRaw = keywordsRes.choices[0].message.content.trim();
        console.log("🔑 KEYWORDS RAW:", keywordsRaw);

        const keywordsMatch = keywordsRaw.match(/\[[\s\S]*\]/);
        if (!keywordsMatch) throw new Error("Keywords array parse failed");

        let keywords = JSON.parse(keywordsMatch[0]);
        keywords = keywords.filter(k => typeof k === "string" && k.trim().length > 0);
        console.log("✅ Keywords parsed:", keywords);

        // ============================================================
        // 🔥 SCORING LOGIC
        // ============================================================

        const resumeLower = resumeText.toLowerCase();
        const wordCount = resumeText.split(/\s+/).length;

        const hasEmail    = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
        const hasPhone    = /(\+91|0)?[6-9]\d{9}/.test(resumeText);
        const hasLinkedIn = /linkedin/i.test(resumeText);
        const hasGithub   = /github/i.test(resumeText);

        let formattingScore = 50;
        if (hasEmail)    formattingScore += 15;
        if (hasPhone)    formattingScore += 15;
        if (hasLinkedIn) formattingScore += 10;
        if (hasGithub)   formattingScore += 10;
        formattingScore = Math.min(100, formattingScore);

        let readabilityScore = 50;
        if (wordCount >= 200) readabilityScore = 60;
        if (wordCount >= 350) readabilityScore = 75;
        if (wordCount >= 500) readabilityScore = 85;
        if (wordCount >= 700) readabilityScore = 95;

        const expKeywords = ["experience", "project", "internship", "worked", "developed", "built", "created", "implemented"];
        const expMatches  = expKeywords.filter(k => resumeLower.includes(k)).length;
        const experienceScore = Math.min(100, 40 + (expMatches * 8));

        // ============================================================
        // 🔥 KEYWORD MATCHING
        // ============================================================

        const present = keywords.filter(k => resumeLower.includes(k.toLowerCase()));
        const missing  = keywords.filter(k => !resumeLower.includes(k.toLowerCase()));

        const skillsMatchScore = keywords.length
            ? Math.min(100, Math.round((present.length / keywords.length) * 100))
            : 50;

        const atsScore = Math.round(
            (skillsMatchScore + formattingScore + readabilityScore + experienceScore) / 4
        );

        console.log("✅ Scores:", { atsScore, formattingScore, readabilityScore, experienceScore, skillsMatchScore });

        // ============================================================
        // 🔥 FINAL RESPONSE
        // ============================================================

        res.json({
            success: true,
            data: {
                candidate_name: analysis.candidate_name?.trim() || "Unknown",
                role: (analysis.role || "unknown").toLowerCase(),
                summary: analysis.summary || "",
                strengths:  Array.isArray(analysis.strengths)  ? analysis.strengths  : [],
                weaknesses: Array.isArray(analysis.weaknesses) ? analysis.weaknesses : [],
                suggestions:Array.isArray(analysis.suggestions)? analysis.suggestions: [],
                required_keywords: keywords,
                ats_score:         atsScore,
                present_keywords:  present,
                missing_keywords:  missing,
                formatting_score:  formattingScore,
                readability_score: readabilityScore,
                experience_score:  experienceScore,
                skills_match_score:skillsMatchScore
            }
        });

    } catch (error) {
        console.error("❌ Error:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;