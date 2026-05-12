import AISuggestField from "../ui/AISuggestField";
import styles from "./Projects.module.css";

const Projects = ({ form, addItem, removeItem, updateItem }) => {
  const context = {
    name: form.name,
    role: form.role,
    skills: form.skills_technical,
  };

  return (
    <div className={styles.wrap}>

      {/* Hint */}
      <div className={styles.hintBox}>
        <p className={styles.hintTitle}>🚀 Projects kyun important hain?</p>
        <ul className={styles.hintList}>
          <li>Freshers ke liye projects hi experience hote hain</li>
          <li>GitHub link zaroor daalo — recruiter dekh sake</li>
          <li>Tech stack clearly likho — ATS mein keywords match honge</li>
          <li>✨ AI button se description improve karo</li>
        </ul>
      </div>

      {form.projects.map((proj, i) => (
        <div key={i} className={styles.card}>

          {/* Card header */}
          <div className={styles.cardHeader}>
            <span className={styles.cardNum}>🚀 Project {i + 1}</span>
            {form.projects.length > 1 && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeItem("projects", i)}
              >
                × Remove
              </button>
            )}
          </div>

          {/* Project Name */}
          <AISuggestField
            label="Project Name *"
            field="project name for resume"
            value={proj.name}
            onChange={(v) => updateItem("projects", i, "name", v)}
            context={context}
            placeholder="e.g. E-Commerce App, Portfolio Website..."
          />

          {/* Tech Stack */}
          <div className={styles.field}>
            <label className={styles.label}>Tech Stack *</label>
            <input
              className={styles.input}
              value={proj.tech_stack}
              onChange={(e) => updateItem("projects", i, "tech_stack", e.target.value)}
              placeholder="e.g. Kotlin, MVVM, Firebase, Retrofit"
            />
            <p className={styles.fieldHint}>
              Comma se alag karo — yeh ATS keywords mein count honge
            </p>
          </div>

          {/* Description */}
          <AISuggestField
            label="Project Description *"
            field="project description with impact and tech used for resume"
            value={proj.description}
            onChange={(v) => updateItem("projects", i, "description", v)}
            context={{
              ...context,
              project: proj.name,
              tech: proj.tech_stack,
            }}
            multiline
            placeholder="e.g. Built a full-stack e-commerce app with real-time order tracking, serving 500+ users..."
          />

          {/* GitHub Link */}
          <div className={styles.field}>
            <label className={styles.label}>GitHub / Live Link</label>
            <input
              className={styles.input}
              type="url"
              value={proj.link || ""}
              onChange={(e) => updateItem("projects", i, "link", e.target.value)}
              placeholder="e.g. github.com/raj/project or live-demo.netlify.app"
            />
          </div>

        </div>
      ))}

      {/* Add more */}
      <button
        type="button"
        className={styles.addBtn}
        onClick={() => addItem("projects")}
      >
        + Add Another Project
      </button>

    </div>
  );
};

export default Projects;
