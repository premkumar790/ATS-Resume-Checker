import AISuggestField from "../ui/AISuggestField";
import styles from "./Education.module.css";

const Education = ({ form, addItem, removeItem, updateItem }) => {
  const context = {
    name: form.name,
    role: form.role,
  };

  return (
    <div className={styles.wrap}>

      {form.education.map((edu, i) => (
        <div key={i} className={styles.card}>

          {/* Card header */}
          <div className={styles.cardHeader}>
            <span className={styles.cardNum}>🎓 Education {i + 1}</span>
            {form.education.length > 1 && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeItem("education", i)}
              >
                × Remove
              </button>
            )}
          </div>

          {/* Degree */}
          <AISuggestField
            label="Degree / Course *"
            field="education degree or course name"
            value={edu.degree}
            onChange={(v) => updateItem("education", i, "degree", v)}
            context={context}
            placeholder="e.g. B.Tech Computer Science, BCA, MCA..."
          />

          {/* Institution */}
          <AISuggestField
            label="College / University *"
            field="college or university name in India"
            value={edu.institution}
            onChange={(v) => updateItem("education", i, "institution", v)}
            context={{ ...context, degree: edu.degree }}
            placeholder="e.g. ABC Engineering College, Dhanbad"
          />

          {/* Year + Score */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Passing Year *</label>
              <input
                className={styles.input}
                value={edu.year}
                onChange={(e) => updateItem("education", i, "year", e.target.value)}
                placeholder="e.g. 2024 or 2022 – 2025"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Score / CGPA</label>
              <input
                className={styles.input}
                value={edu.score}
                onChange={(e) => updateItem("education", i, "score", e.target.value)}
                placeholder="e.g. 8.2 CGPA or 78%"
              />
            </div>
          </div>

        </div>
      ))}

      {/* Add more button */}
      <button
        type="button"
        className={styles.addBtn}
        onClick={() => addItem("education")}
      >
        + Add Another Education
      </button>

    </div>
  );
};

export default Education;
