import AISuggestField from "../ui/AISuggestField";
import styles from "./Extras.module.css";

const Extras = ({ form, set, addItem, removeItem, updateItem }) => {
  const context = {
    name: form.name,
    role: form.role,
    skills: form.skills_technical,
  };

  return (
    <div className={styles.wrap}>

      {/* Certifications */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📜 Certifications</h3>

        {form.certifications.map((cert, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNum}>Certification {i + 1}</span>
              {form.certifications.length > 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeItem("certifications", i)}
                >
                  × Remove
                </button>
              )}
            </div>

            {/* Cert Name */}
            <AISuggestField
              label="Certification Name"
              field="online certification or course name for resume"
              value={cert.name}
              onChange={(v) => updateItem("certifications", i, "name", v)}
              context={context}
              placeholder="e.g. Android Developer Certification, AWS Cloud Practitioner..."
            />

            {/* Issuer + Year */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Issuer / Platform</label>
                <input
                  className={styles.input}
                  value={cert.issuer || ""}
                  onChange={(e) => updateItem("certifications", i, "issuer", e.target.value)}
                  placeholder="e.g. Google, Udemy, Coursera"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Year</label>
                <input
                  className={styles.input}
                  value={cert.year || ""}
                  onChange={(e) => updateItem("certifications", i, "year", e.target.value)}
                  placeholder="e.g. 2024"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className={styles.addBtn}
          onClick={() => addItem("certifications")}
        >
          + Add Certification
        </button>
      </div>

      {/* Languages */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>🌐 Languages Known</h3>
        <div className={styles.field}>
          <label className={styles.label}>Languages</label>
          <input
            className={styles.input}
            value={form.languages}
            onChange={(e) => set("languages", e.target.value)}
            placeholder="e.g. Hindi (Native), English (Fluent), Bhojpuri"
          />
          <p className={styles.fieldHint}>
            Comma se alag karo
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>🏆 Achievements (Optional)</h3>
        <AISuggestField
          label="Key Achievements"
          field="academic or professional achievements for resume"
          value={form.achievements || ""}
          onChange={(v) => set("achievements", v)}
          context={context}
          multiline
          placeholder="e.g. Won 1st place in college Hackathon 2023, Published research paper on ML..."
        />
      </div>

    </div>
  );
};

export default Extras;
