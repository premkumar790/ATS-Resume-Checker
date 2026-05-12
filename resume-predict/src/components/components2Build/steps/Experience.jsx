import AISuggestField from "../ui/AISuggestField";
import styles from "./Experience.module.css";

const Experience = ({ form, addItem, removeItem, updateItem }) => {
  const context = {
    name: form.name,
    role: form.role,
    skills: form.skills_technical,
  };

  return (
    <div className={styles.wrap}>

      {/* Hint */}
      <div className={styles.hintBox}>
        <p className={styles.hintText}>
          💡 Fresher ho? Internship ya part-time kaam bhi yahan daalo.
          Kuch nahi hai toh yeh step skip kar sakte ho.
        </p>
      </div>

      {form.experience.map((exp, i) => (
        <div key={i} className={styles.card}>

          {/* Card header */}
          <div className={styles.cardHeader}>
            <span className={styles.cardNum}>💼 Experience {i + 1}</span>
            {form.experience.length > 1 && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeItem("experience", i)}
              >
                × Remove
              </button>
            )}
          </div>

          {/* Job Title */}
          <AISuggestField
            label="Job Title *"
            field="job title or designation"
            value={exp.title}
            onChange={(v) => updateItem("experience", i, "title", v)}
            context={context}
            placeholder="e.g. Android Developer Intern, Frontend Developer..."
          />

          {/* Company */}
          <AISuggestField
            label="Company Name *"
            field="company name"
            value={exp.company}
            onChange={(v) => updateItem("experience", i, "company", v)}
            context={{ ...context, title: exp.title }}
            placeholder="e.g. TCS, Infosys, Startup XYZ..."
          />

          {/* Duration + Location */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Duration *</label>
              <input
                className={styles.input}
                value={exp.duration}
                onChange={(e) => updateItem("experience", i, "duration", e.target.value)}
                placeholder="e.g. Jan 2023 – Jun 2023"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Location</label>
              <input
                className={styles.input}
                value={exp.location || ""}
                onChange={(e) => updateItem("experience", i, "location", e.target.value)}
                placeholder="e.g. Bangalore, Remote"
              />
            </div>
          </div>

          {/* Description */}
          <AISuggestField
            label="Key Responsibilities & Achievements *"
            field="job responsibilities and achievements using action verbs"
            value={exp.description}
            onChange={(v) => updateItem("experience", i, "description", v)}
            context={{
              ...context,
              title: exp.title,
              company: exp.company,
            }}
            multiline
            placeholder="e.g. Developed Android app features using Kotlin and MVVM architecture, reducing crash rate by 30%..."
          />

        </div>
      ))}

      {/* Add more */}
      <button
        type="button"
        className={styles.addBtn}
        onClick={() => addItem("experience")}
      >
        + Add Another Experience
      </button>

    </div>
  );
};

export default Experience;
