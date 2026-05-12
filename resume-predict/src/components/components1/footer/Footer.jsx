import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* ── COL 1 — Logo + Description ── */}
        <div className={styles.brand}>
          <div className={styles.logo}>⚡ ResumePredict</div>
          <p className={styles.desc}>
            AI-powered resume analyzer and builder. Get ATS score, keyword
            analysis, and build a professional resume in minutes.
          </p>
          {/* Social Icons */}
          <div className={styles.socials}>
            <a
              href="https://github.com/premkumar790"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/prem-kumar-825356287"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              title="Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
{/* ------------------------------------------------------------ */}
        {/* --- COL 2 — Quick Links ── */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><NavLink to="/home"    className={styles.link}>🏠 Home</NavLink></li>
            <li><NavLink to="/ats"     className={styles.link}>📄 ATS Checker</NavLink></li>
            <li><NavLink to="/builder" className={styles.link}>✏️ Resume Builder</NavLink></li>
            <li><NavLink to="/how"     className={styles.link}>❓ How It Works</NavLink></li>
          </ul>
        </div>
{/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        {/* ── COL 3 — Features ── */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Features</h4>
          <ul className={styles.linkList}>
            <li><span className={styles.featureItem}>✅ ATS Score Analysis</span></li>
            <li><span className={styles.featureItem}>🔑 Keyword Matching</span></li>
            <li><span className={styles.featureItem}>✨ AI Resume Builder</span></li>
            <li><span className={styles.featureItem}>📊 Resume Scoring</span></li>
            <li><span className={styles.featureItem}>⬇ PDF Download</span></li>
            <li><span className={styles.featureItem}>🔍 AI Validation</span></li>
          </ul>
        </div>

        {/* ── COL 4 — Tech Stack ── */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Built With</h4>
          <div className={styles.techTags}>
            {["React.js", "Node.js", "Express.js", "Groq AI", "LLaMA 3.3", "Vite"].map((t) => (
              <span key={t} className={styles.techTag}>{t}</span>
            ))}
          </div>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {currentYear} ResumePredict. All rights reserved.
        </p>
        <p className={styles.madeWith}>
          Made with ❤️ using <span className={styles.accent}>Groq AI</span>
        </p>
      </div>

    </footer>
  );
};

export default Footer;
