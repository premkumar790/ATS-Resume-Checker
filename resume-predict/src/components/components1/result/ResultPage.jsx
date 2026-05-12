import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./result.module.css";

// ===========================
// PARSE BACKEND → UI FORMAT
// ===========================
const parseApiResult = (apiData, fileName) => {
  console.log(apiData);
  
  if (!apiData) return null;

  return {
    
    name: apiData.candidate_name || "Candidate",
    role: apiData.role || "Professional",
    fileName: fileName || "resume.pdf",
    atsScore: apiData.ats_score || 0,
    
   breakdown: [
  // { label: "FullATS Score",    score: apiData.ats_score || 0,           icon: "🔑" },
  { label: "Formatting",  score: apiData.formatting_score || 0,    icon: "📄" },
  { label: "Readability", score: apiData.readability_score || 0,   icon: "📖" },
  { label: "Experience",  score: apiData.experience_score || 0,    icon: "💼" },
  { label: "Skills Match",score: apiData.skills_match_score || 0,  icon: "🛠️" },
],
strengths: apiData.strengths || [],

issues: (apiData.weaknesses || []).map((w, i, arr) => {
  const total = arr.length;

  let level = "low";
  if (i < total * 0.3) level = "high";
  else if (i < total * 0.7) level = "medium";

  return {
    level,
    text: w
  };
}),

    presentKeywords: apiData.present_keywords || [],
    missingKeywords: apiData.missing_keywords || [],

  suggestions: (apiData.suggestions || []).map((s, i, arr) => {
  const t = typeof s === "string" ? s : s.text;
  const total = arr.length;

  let priority = "Low";
  if (i < total * 0.3) priority = "High";
  else if (i < total * 0.7) priority = "Medium";

  return {
    priority,
    text: t
  };
}),
  };
};

// ===========================
// SCORE RING
// ===========================
const ScoreRing = ({ score }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color =
    score >= 75 ? "#00c896" : score >= 50 ? "#f5a623" : "#e05252";

  return (
    <svg className={styles.ring} viewBox="0 0 160 160">
      <circle cx="80" cy="80" r={r} fill="none" stroke="#1e2a3a" strokeWidth="14" />
      <circle
        cx="80"
        cy="80"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeDasharray={`${fill} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 80 80)"
      />
      <text x="80" y="74" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="700">
        {score}
      </text>
      <text x="80" y="96" textAnchor="middle" fill="#8a9bb0" fontSize="12">
        /100
      </text>
    </svg>
  );
};

// ===========================
// MINI PROGRESS BAR
// ===========================
const MiniBar = ({ score }) => {
  const color =
    score >= 75 ? "#00c896" : score >= 50 ? "#f5a623" : "#e05252";

  return (
    <div className={styles.miniBarTrack}>
      <div className={styles.miniBarFill} style={{ width: `${score}%`, background: color }} />
    </div>
  );
};

// ===========================
// MAIN PAGE
// ===========================
const ResultPage = () => {
  const location = useLocation();
  const apiResult = location.state?.result;
  const fileName = location.state?.fileName;

  const d = parseApiResult(apiResult, fileName);

  if (!d) {
    return <h2 style={{ color: "white", textAlign: "center" }}>No Data Found</h2>;
  }

  const scoreColor =
    d.atsScore >= 75 ? "#00c896" : d.atsScore >= 50 ? "#f5a623" : "#e05252";

  const scoreLabel =
    d.atsScore >= 75 ? "Good" : d.atsScore >= 50 ? "Average" : "Weak";

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <span className={styles.logo}>⚡ ResumePredict</span>
        <span className={styles.fileName}>📄 {d.fileName}</span>
      </header>

      <main className={styles.main}>
        {/* HERO CARD */}
        <section className={styles.heroCard}>
          <div className={styles.heroLeft}>
            <p className={styles.heroLabel}>ATS Score</p>
            <ScoreRing score={d.atsScore} />
            <span className={styles.scoreTag} style={{ color: scoreColor, borderColor: scoreColor }}>
              {scoreLabel}
            </span>
          </div>

          <div className={styles.heroRight}>
            <h1 className={styles.candidateName}>{d.name}</h1>
            <p className={styles.candidateRole}>{d.role}</p>
            <p className={styles.heroDesc}>
              Your resume has been analysed against <strong>16 ATS checks</strong>.
            </p>

            <div className={styles.breakdown}>
              {d.breakdown.map((item) => (
                <div key={item.label} className={styles.breakItem}>
                  <span className={styles.breakLabel}>
                    {item.icon} {item.label}
                  </span>
                  <MiniBar score={item.score} />
                  <span className={styles.breakScore}>{item.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRID SECTIONS */}
        <div className={styles.grid}>
          {/* Strengths */}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>
              <span className={styles.dot} style={{ background: "#00c896" }} />
              Strengths
            </h2>

            {d.strengths.length > 0 ? (
              <ul className={styles.strengthList}>
                {d.strengths.map((s, i) => (
                  <li key={i} className={styles.strengthItem}>✅ {s}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#8a9bb0" }}>No strengths detected.</p>
            )}
          </section>

          {/* Issues */}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>
              <span className={styles.dot} style={{ background: "#e05252" }} />
              Issues Found
            </h2>

            {d.issues.length > 0 ? (
              <ul className={styles.issueList}>
                {d.issues.map((issue, i) => (
                  <li key={i} className={`${styles.issueItem} ${styles[issue.level]}`}>
                    <span className={styles.issueBadge}>{issue.level.toUpperCase()}</span>
                    {issue.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#00c896" }}>No major issues found! 🎉</p>
            )}
          </section>

          {/* Keywords */}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>
              <span className={styles.dot} style={{ background: "#4fa3e0" }} />
              Keyword Analysis
            </h2>

            <p className={styles.kwLabel}>✅ Present</p>
            <div className={styles.tagRow}>
              {d.presentKeywords.length > 0 ? (
                d.presentKeywords.map((k) => (
                  <span key={k} className={`${styles.tag} ${styles.tagGreen}`}>
                    {k}
                  </span>
                ))
              ) : (
                <span style={{ color: "#8a9bb0" }}>None detected</span>
              )}
            </div>

            <p className={styles.kwLabel} style={{ marginTop: "1rem" }}>
              ❌ Missing
            </p>
            <div className={styles.tagRow}>
              {d.missingKeywords?.length > 0 ? (
                d.missingKeywords.map((k) => (
                  <span key={k} className={`${styles.tag} ${styles.tagRed}`}>
                    {k}
                  </span>
                ))
              ) : (
                <span style={{ color: "#8a9bb0" }}>None missing</span>
              )}
            </div>
          </section>
          {/* Suggestions */}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>
              <span className={styles.dot} style={{ background: "#f5a623" }} />
              Improvement Tips
            </h2>

            {d.suggestions.length > 0 ? (
              <ul className={styles.suggestList}>
                {d.suggestions.map((s, i) => (
                  <li key={i} className={styles.suggestItem}>
                    <span className={`${styles.priority} ${styles[s.priority?.toLowerCase()]}`}>
                      {s.priority}
                    </span>
                    {s.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#8a9bb0", fontSize: "14px" }}>
                No suggestions available.
              </p>
            )}
          </section>
        </div>

        <div className={styles.cta}>
          <button className={styles.ctaBtn} onClick={() => window.history.back()}>
            ← Analyse Another Resume
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;