const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/suggest", async (req, res) => {
  try {
    const { field, value, context } = req.body;
    const prompt = `
You are an expert resume writer and career coach.
The user is filling a resume form. Give smart suggestions for the field.

Field: "${field}"
Current Input: "${value || "empty"}"
Context (other filled fields): ${JSON.stringify(context || {})}

Return ONLY raw JSON (no markdown, no explanation):
{
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "tip": "one line practical advice for this field",
  "example": "one strong real-world example"
}

RULES:
- suggestions: 3 short professional options user can pick
- tip: specific advice for this exact field
- example: one concrete strong example
- Return ONLY JSON
`;
    const aiRes = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = aiRes.choices[0].message.content.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");
    const result = JSON.parse(jsonMatch[0]);
    console.log("✅ Suggest:", field);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("❌ Suggest Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/validate", async (req, res) => {
  try {
    const { resumeData } = req.body;
    const prompt = `
You are an expert ATS resume validator and career coach.
Analyze this resume data and find all issues, missing things, and improvements.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Return ONLY raw JSON (no markdown, no explanation):
{
  "missing_skills": ["skill1", "skill2"],
  "missing_sections": ["section1"],
  "weak_sections": [
    { "section": "summary", "reason": "too short", "fix": "Add 2-3 lines about your expertise" }
  ],
  "role_skill_mismatch": [
    { "skill": "HTML", "reason": "Required for Web Developer but missing in skills" }
  ],
  "overall_score": 0,
  "critical_issues": ["issue1", "issue2"],
  "good_points": ["point1", "point2"],
  "priority_fixes": ["fix1", "fix2", "fix3"]
}

RULES:
- overall_score: 0-100 based on completeness and quality
- role_skill_mismatch: compare role with skills, find gaps
- critical_issues: things that will get resume rejected by ATS
- priority_fixes: top 3 things to fix RIGHT NOW
- Return ONLY JSON
`;
    const aiRes = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = aiRes.choices[0].message.content.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");
    const result = JSON.parse(jsonMatch[0]);
    console.log("✅ Validate done, score:", result.overall_score);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("❌ Validate Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/generate", async (req, res) => {
  try {
    const { resumeData } = req.body;
    const prompt = `
You are an expert resume writer.
Using the provided data, write a professional ATS-optimized resume.
Improve weak descriptions, use action verbs, make everything sound professional.

Input Data:
${JSON.stringify(resumeData, null, 2)}

Return ONLY raw JSON (no markdown, no explanation):
{
  "candidate_name": "",
  "role": "",
  "contact": {
    "email": "",
    "phone": "",
    "linkedin": "",
    "github": "",
    "portfolio": ""
  },
  "summary": "",
  "skills": {
    "technical": [],
    "soft": []
  },
  "education": [
    {
      "degree": "",
      "institution": "",
      "year": "",
      "score": "",
      "achievements": []
    }
  ],
  "experience": [
    {
      "title": "",
      "company": "",
      "duration": "",
      "location": "",
      "points": []
    }
  ],
  "projects": [
    {
      "name": "",
      "tech_stack": [],
      "description": "",
      "points": [],
      "link": ""
    }
  ],
  "certifications": [
    {
      "name": "",
      "issuer": "",
      "year": ""
    }
  ],
  "languages": [],
  "achievements": []
}

RULES:
- summary: 3-4 strong professional lines
- experience points: use action verbs (Built, Developed, Implemented, Optimized)
- project points: mention impact and tech used
- Make everything ATS-friendly and professional
- Return ONLY JSON
`;
    const aiRes = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = aiRes.choices[0].message.content.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");
    const result = JSON.parse(jsonMatch[0]);
    console.log("✅ Generate done:", result.candidate_name);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("❌ Generate Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;