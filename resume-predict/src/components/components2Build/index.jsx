import { useState } from "react";
import styles from "./index.module.css";

// ── Hooks ────────────────────────────────────────────────────
import useResumeForm  from "../../hooks/useResumeForm";
import useValidation  from "../../hooks/useValidation";

// ── Steps ────────────────────────────────────────────────────
import BasicInfo  from "./steps/BasicInfo";
import Summary    from "./steps/Summary";
import Skills     from "./steps/Skills";
import Education  from "./steps/Education";
import Experience from "./steps/Experience";
import Projects   from "./steps/Projects";
import Extras     from "./steps/Extras";
import Review     from "./steps/Review";

// ── Preview ──────────────────────────────────────────────────
import ResumePreview from "./preview/ResumePreview";

// ── Constants ────────────────────────────────────────────────
import { STEPS } from "../../constants/resumeConstants";

// ============================================================
const ResumeBuilder = () => {
  const [step, setStep] = useState(0);

  // Form state
  const { form, set, addItem, removeItem, updateItem } = useResumeForm();

  // Validation + Generate state
  const {
    validation, validating, valError, runValidation,
    generated,  generating, genError, runGenerate,
  } = useValidation();

  // ── Handlers ──────────────────────────────────────────────
  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleValidate = async () => {
    await runValidation(form);
  };

  const handleGenerate = async () => {
    await runGenerate(form);
  };

  const handleDownload = () => {
    window.print();
  };

  // ── Step renderer ─────────────────────────────────────────
  const renderStep = () => {
    switch (step) {
      case 0:
        return <BasicInfo form={form} set={set} />;
      case 1:
        return <Summary form={form} set={set} />;
      case 2:
        return (
          <Skills
            form={form}
            set={set}
            validation={validation}
          />
        );
      case 3:
        return (
          <Education
            form={form}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        );
      case 4:
        return (
          <Experience
            form={form}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        );
      case 5:
        return (
          <Projects
            form={form}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        );
      case 6:
        return (
          <Extras
            form={form}
            set={set}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        );
      case 7:
        return (
          <Review
            form={form}
            validation={validation}
            validating={validating}
            valError={valError}
            generated={generated}
            generating={generating}
            genError={genError}
            onValidate={handleValidate}
            onGenerate={handleGenerate}
            onDownload={handleDownload}
          />
        );
      default:
        return null;
    }
  };

  // ── Progress % ────────────────────────────────────────────
  const progress = Math.round((step / (STEPS.length - 1)) * 100);

  return (
    <div className={styles.wrap}>

      {/* ── LEFT — FORM PANEL ── */}
      <div className={styles.formPanel}>

        {/* Logo */}
        <div className={styles.logo}>⚡ Resume Builder</div>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>{progress}%</span>
        </div>

        {/* Step dots */}
        <div className={styles.stepDots}>
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`${styles.dot} ${
                i < step
                  ? styles.dotDone
                  : i === step
                  ? styles.dotActive
                  : ""
              }`}
              onClick={() => setStep(i)}
              title={s.label}
            />
          ))}
        </div>

        {/* Step title */}
        <div className={styles.stepHeader}>
          <span className={styles.stepIcon}>{STEPS[step].icon}</span>
          <div>
            <h2 className={styles.stepTitle}>{STEPS[step].label}</h2>
            <p className={styles.stepSub}>
              Step {step + 1} of {STEPS.length}
            </p>
          </div>
        </div>

        {/* Step content */}
        <div className={styles.stepContent}>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className={styles.nav}>
          {step > 0 && (
            <button
              type="button"
              className={styles.btnBack}
              onClick={handleBack}
            >
              ← Back
            </button>
          )}

          {step < STEPS.length - 1 && (
            <button
              type="button"
              className={styles.btnNext}
              onClick={handleNext}
            >
              Next →
            </button>
          )}
        </div>

      </div>

      {/* ── RIGHT — PREVIEW PANEL ── */}
      <div className={styles.previewPanel}>
        <div className={styles.previewHeader}>
          <span className={styles.previewLabel}>
            Live Preview
            {generated && (
              <span className={styles.enhancedBadge}>✨ AI Enhanced</span>
            )}
          </span>
          <button
            type="button"
            className={styles.downloadBtn}
            onClick={handleDownload}
          >
            ⬇ Download PDF
          </button>
        </div>

        <ResumePreview form={form} generated={generated} />
      </div>

    </div>
  );
};

export default ResumeBuilder;
