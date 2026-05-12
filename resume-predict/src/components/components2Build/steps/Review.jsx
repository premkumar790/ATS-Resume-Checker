import ValidationBox from "../ui/ValidationBox";
import styles from "./Review.module.css";

const Review = ({
  form,
  validation,
  validating,
  valError,
  generated,
  generating,
  genError,
  onValidate,
  onGenerate,
  onDownload,
}) => {
  return (
    <div className={styles.wrap}>

      {/* Summary of filled data */}
      <div className={styles.summaryBox}>
        <h3 className={styles.summaryTitle}>📋 Resume Summary</h3>
        <div className={styles.summaryGrid}>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Name</span>
            <span className={styles.summaryVal}>
              {form.name || <em className={styles.empty}>Not filled</em>}
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Role</span>
            <span className={styles.summaryVal}>
              {form.role || <em className={styles.empty}>Not filled</em>}
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Email</span>
            <span className={styles.summaryVal}>
              {form.email || <em className={styles.empty}>Not filled</em>}
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Technical Skills</span>
            <span className={styles.summaryVal}>
              {form.skills_technical.length > 0
                ? `${form.skills_technical.length} skills added`
                : <em className={styles.empty}>None added</em>}
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Education</span>
            <span className={styles.summaryVal}>
              {form.education.filter(e => e.degree).length} added
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Experience</span>
            <span className={styles.summaryVal}>
              {form.experience.filter(e => e.title).length} added
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Projects</span>
            <span className={styles.summaryVal}>
              {form.projects.filter(p => p.name).length} added
            </span>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Certifications</span>
            <span className={styles.summaryVal}>
              {form.certifications.filter(c => c.name).length} added
            </span>
          </div>

        </div>
      </div>

      {/* Step 1 — Validate */}
      <div className={styles.actionBox}>
        <p className={styles.actionTitle}>Step 1 — AI se validate karwao</p>
        <p className={styles.actionDesc}>
          AI tumhara resume check karega — missing skills, weak sections, aur score batayega
        </p>
        <button
          type="button"
          className={styles.validateBtn}
          onClick={onValidate}
          disabled={validating}
        >
          {validating ? (
            <><span className={styles.spinner} /> Validating...</>
          ) : (
            "🔍 Validate Resume"
          )}
        </button>
      </div>

      {/* Validation result */}
      <ValidationBox
        validation={validation}
        validating={validating}
        valError={valError}
      />

      {/* Step 2 — Generate */}
      <div className={styles.actionBox}>
        <p className={styles.actionTitle}>Step 2 — AI se enhance karwao</p>
        <p className={styles.actionDesc}>
          AI tumhara resume professionally rewrite karega — action verbs, better descriptions, ATS-friendly
        </p>
        <button
          type="button"
          className={styles.generateBtn}
          onClick={onGenerate}
          disabled={generating}
        >
          {generating ? (
            <><span className={styles.spinner} /> Enhancing...</>
          ) : (
            "✨ Enhance Resume with AI"
          )}
        </button>

        {genError && (
          <p className={styles.genError}>❌ {genError}</p>
        )}

        {generated && !generating && (
          <div className={styles.successBox}>
            ✅ Resume AI se enhance ho gaya! Preview mein dekho →
          </div>
        )}
      </div>

      {/* Step 3 — Download */}
      <div className={styles.actionBox}>
        <p className={styles.actionTitle}>Step 3 — PDF download karo</p>
        <p className={styles.actionDesc}>
          Right side preview se bilkul waise PDF milegi jaise dikhta hai
        </p>
        <button
          type="button"
          className={styles.downloadBtn}
          onClick={onDownload}
        >
          ⬇ Download PDF
        </button>
      </div>

    </div>
  );
};

export default Review;
