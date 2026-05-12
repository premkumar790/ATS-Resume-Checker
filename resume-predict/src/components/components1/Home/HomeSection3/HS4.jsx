import React from 'react'
import styles from "./HS4.module.css"

function CheckItem({ text }) {
  return (
    <div className={styles.checkItem}>
      <span className={styles.tick}>✓</span>
      <span>{text}</span>
    </div>
  );
}

const HS4 = () => {
  return (
    <section className={styles.sec}>
      <h2 className={styles.secTitle}>
        Our AI-powered resume checker goes beyond typos and punctuation
      </h2>
      <p className={styles.secSub}>
        We've built-in ChatGPT to help you create a resume that's tailored to the position you're applying for.
      </p>

      <div className={styles.grid}>

        <div className={styles.intro}>
          <h3>Resume optimization checklist</h3>
          <p>We check for 16 crucial things across 5 different categories on your resume including content, file type, and keywords...</p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconBox}>📄</div>
          <h4>Format</h4>
          <CheckItem text="File format and size" />
          <CheckItem text="Resume length" />
          <CheckItem text="Long bullet points with suggestions on how to shorten" />
        </div>

        <div className={styles.card}>
          <div className={styles.iconBox}>📋</div>
          <h4>Resume sections</h4>
          <CheckItem text="Contact information" />
          <CheckItem text="Essential sections" />
          <CheckItem text="Personality showcase with tips on how to improve" />
        </div>

        <div className={styles.card}>
          <div className={styles.iconBox}>✏️</div>
          <h4>Content</h4>
          <CheckItem text="ATS parse rate" />
          <CheckItem text="Repetition of words and phrases" />
          <CheckItem text="Spelling and grammar" />
          <CheckItem text="Quantifying impact in experience section" />
        </div>

        <div className={styles.card}>
          <div className={styles.iconBox}>💡</div>
          <h4>Skills suggestion</h4>
          <CheckItem text="Hard skills" />
          <CheckItem text="Soft skills" />
        </div>

        <div className={styles.card}>
          <div className={styles.iconBox}>🅰️</div>
          <h4>Style</h4>
          <CheckItem text="Resume design" />
          <CheckItem text="Email address" />
          <CheckItem text="Usage of active voice" />
          <CheckItem text="Usage of buzzwords and cliches" />
        </div>

      </div>
    </section>
  );
}

export default HS4