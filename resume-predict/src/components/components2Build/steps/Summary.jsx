import AISuggestField from "../ui/AISuggestField";
import styles from "./Summary.module.css";

const Summary = ({ form, set }) => {
  const context = {
    name: form.name,
    role: form.role,
    skills: form.skills_technical,
  };

  return (
    <div className={styles.wrap}>

      {/* Hint box */}
      <div className={styles.hintBox}>
        <p className={styles.hintTitle}>💡 Achha Summary kaise likhein?</p>
        <ul className={styles.hintList}>
          <li>3-4 lines rakho — zyada lamba mat karo</li>
          <li>Apna role + experience + key skills mention karo</li>
          <li>Action words use karo — "Passionate", "Experienced", "Skilled"</li>
          <li>✨ AI button dabao — AI likh dega tumhare role ke hisaab se</li>
        </ul>
      </div>

      {/* Summary field */}
      <AISuggestField
        label="Professional Summary *"
        field="professional summary for resume"
        value={form.summary}
        onChange={(v) => set("summary", v)}
        context={context}
        multiline
        placeholder="e.g. Passionate Android Developer with 2+ years of experience building production-grade apps using Kotlin, MVVM, and Jetpack Compose..."
      />

      {/* Character count */}
      <p className={styles.charCount}>
        {form.summary.length} characters
        {form.summary.length < 100 && form.summary.length > 0 && (
          <span className={styles.charWarn}> — thoda aur likho</span>
        )}
        {form.summary.length >= 100 && form.summary.length <= 600 && (
          <span className={styles.charGood}> — perfect length ✓</span>
        )}
        {form.summary.length > 600 && (
          <span className={styles.charWarn}> — thoda chhota karo</span>
        )}
      </p>

    </div>
  );
};

export default Summary;
