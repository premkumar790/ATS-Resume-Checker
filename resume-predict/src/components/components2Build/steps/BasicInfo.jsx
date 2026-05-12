import AISuggestField from "../ui/AISuggestField";
import styles from "./BasicInfo.module.css";

const BasicInfo = ({ form, set }) => {
  const context = {
    name: form.name,
    role: form.role,
  };

  return (
    <div className={styles.wrap}>

      {/* Name */}
      {/* <div className={styles.input}> */}
      <AISuggestField 
        label="Full Name *"
        field="full name for professional resume"
        value={form.name}
        onChange={(v) => set("name", v)}
        context={context}
        placeholder="e.g. Prem Kumar seth"
      />
      {/* Role */}
      <AISuggestField
        label="Job Role / Title *"
        field="job role or professional title"
        value={form.role}
        onChange={(v) => set("role", v)}
        context={context}
        placeholder="e.g. FullStack Developer, Web Developer..."
      />

      {/* Email + Phone */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Email *</label>
          <input
            className={styles.input}
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="e.g. Prem@gmail.com"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Phone *</label>
          <input
            className={styles.input}
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="e.g. +91 xxxxxx1535"
          />
        </div>
      </div>

      {/* LinkedIn */}
      <AISuggestField
        label="LinkedIn URL"
        field="linkedin profile URL format"
        value={form.linkedin}
        onChange={(v) => set("linkedin", v)}
        context={context}
        placeholder="e.g. linkedin.com/in/prem-kumar"
      />

      {/* GitHub */}
      <AISuggestField
        label="GitHub URL"
        field="github profile URL format"
        value={form.github}
        onChange={(v) => set("github", v)}
        context={context}
        placeholder="e.g. github.com/prem-7903"
      />

      {/* Portfolio */}
      <div className={styles.field}>
        <label className={styles.label}>Portfolio (Optional)</label>
        <input
          className={styles.input}
          type="url"
          value={form.portfolio}
          onChange={(e) => set("portfolio", e.target.value)}
          placeholder="e.g. prem-portfolio.netlify.app"
        />
      </div>

    </div>
  );
};

export default BasicInfo;
