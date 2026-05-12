import styles from "./ResumePreview.module.css";

// ============================================================
// HELPERS
// ============================================================
const val = (generated, form, genKey, formKey) =>
  generated?.[genKey] || form?.[formKey] || "";

const arrVal = (generated, form, genKey, formKey) =>
  generated?.[genKey]?.length > 0
    ? generated[genKey]
    : form?.[formKey] || [];

// ============================================================
// SECTION TITLE
// ============================================================
const SectionTitle = ({ children }) => (
  <div className={styles.sectionTitle}>{children}</div>
);

// ============================================================
// MAIN PREVIEW
// ============================================================
const ResumePreview = ({ form, generated }) => {
  // Contact
  const name     = val(generated, form, "candidate_name", "name");
  const role     = val(generated, form, "role", "role");
  const email    = generated?.contact?.email    || form.email    || "";
  const phone    = generated?.contact?.phone    || form.phone    || "";
  const linkedin = generated?.contact?.linkedin || form.linkedin || "";
  const github   = generated?.contact?.github   || form.github   || "";
  const portfolio= generated?.contact?.portfolio|| form.portfolio|| "";

  // Summary
  const summary = val(generated, form, "summary", "summary");

  // Skills
  const techSkills = generated?.skills?.technical?.length > 0
    ? generated.skills.technical
    : form.skills_technical || [];

  const softSkills = generated?.skills?.soft?.length > 0
    ? generated.skills.soft
    : form.skills_soft || [];

  // Education
  const education = arrVal(generated, form, "education", "education");

  // Experience
  const experience = arrVal(generated, form, "experience", "experience");

  // Projects
  const projects = arrVal(generated, form, "projects", "projects");

  // Certifications
  const certifications = arrVal(generated, form, "certifications", "certifications");

  // Languages
  const languages = generated?.languages?.length > 0
    ? (Array.isArray(generated.languages)
        ? generated.languages.join(", ")
        : generated.languages)
    : form.languages || "";

  // Achievements
  const achievements = generated?.achievements?.length > 0
    ? generated.achievements
    : form.achievements
      ? [form.achievements]
      : [];

  return (
    <div className={styles.paper} id="resume-paper">

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <h1 className={styles.name}>{name || "Your Name"}</h1>
        <p className={styles.role}>{role || "Your Role"}</p>

        <div className={styles.contact}>
          {email    && <span>✉ {email}</span>}
          {phone    && <span>📱 {phone}</span>}
          {linkedin && <span>🔗 {linkedin}</span>}
          {github   && <span>💻 {github}</span>}
          {portfolio&& <span>🌐 {portfolio}</span>}
        </div>
      </div>

      <div className={styles.divider} />

      {/* ── SUMMARY ── */}
      {summary && (
        <div className={styles.section}>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className={styles.summary}>{summary}</p>
        </div>
      )}

      {/* ── SKILLS ── */}
      {(techSkills.length > 0 || softSkills.length > 0) && (
        <div className={styles.section}>
          <SectionTitle>Skills</SectionTitle>

          {techSkills.length > 0 && (
            <div className={styles.skillGroup}>
              <span className={styles.skillGroupLabel}>Technical</span>
              <div className={styles.skillTags}>
                {techSkills.map((s, i) => (
                  <span key={i} className={styles.skillTag}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {softSkills.length > 0 && (
            <div className={styles.skillGroup}>
              <span className={styles.skillGroupLabel}>Soft Skills</span>
              <div className={styles.skillTags}>
                {softSkills.map((s, i) => (
                  <span key={i} className={`${styles.skillTag} ${styles.softTag}`}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── EDUCATION ── */}
      {education.some(e => e.degree) && (
        <div className={styles.section}>
          <SectionTitle>Education</SectionTitle>
          {education.filter(e => e.degree).map((e, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemHead}>
                <div>
                  <p className={styles.itemTitle}>{e.degree}</p>
                  <p className={styles.itemSub}>{e.institution}</p>
                </div>
                <div className={styles.itemRight}>
                  <p className={styles.itemDate}>{e.year}</p>
                  {e.score && <p className={styles.itemDate}>{e.score}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── EXPERIENCE ── */}
      {experience.some(e => e.title) && (
        <div className={styles.section}>
          <SectionTitle>Experience</SectionTitle>
          {experience.filter(e => e.title).map((e, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemHead}>
                <div>
                  <p className={styles.itemTitle}>{e.title}</p>
                  <p className={styles.itemSub}>{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                </div>
                <p className={styles.itemDate}>{e.duration}</p>
              </div>

              {/* AI generated points */}
              {e.points?.length > 0 ? (
                <ul className={styles.points}>
                  {e.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              ) : e.description ? (
                <ul className={styles.points}>
                  <li>{e.description}</li>
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* ── PROJECTS ── */}
      {projects.some(p => p.name) && (
        <div className={styles.section}>
          <SectionTitle>Projects</SectionTitle>
          {projects.filter(p => p.name).map((p, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemHead}>
                <div>
                  <p className={styles.itemTitle}>
                    {p.name}
                    {p.link && (
                      <a href={p.link} className={styles.projLink} target="_blank" rel="noreferrer">
                        {" "}🔗
                      </a>
                    )}
                  </p>
                  <p className={styles.itemSub}>
                    {Array.isArray(p.tech_stack)
                      ? p.tech_stack.join(", ")
                      : p.tech_stack}
                  </p>
                </div>
              </div>

              {p.points?.length > 0 ? (
                <ul className={styles.points}>
                  {p.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              ) : p.description ? (
                <ul className={styles.points}>
                  <li>{p.description}</li>
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications.some(c => c.name) && (
        <div className={styles.section}>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.filter(c => c.name).map((c, i) => (
            <div key={i} className={styles.certItem}>
              <strong>{c.name}</strong>
              {c.issuer && <span> — {c.issuer}</span>}
              {c.year   && <span> ({c.year})</span>}
            </div>
          ))}
        </div>
      )}

      {/* ── ACHIEVEMENTS ── */}
      {achievements.length > 0 && (
        <div className={styles.section}>
          <SectionTitle>Achievements</SectionTitle>
          <ul className={styles.points}>
            {achievements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      {/* ── LANGUAGES ── */}
      {languages && (
        <div className={styles.section}>
          <SectionTitle>Languages</SectionTitle>
          <p className={styles.langText}>{languages}</p>
        </div>
      )}

    </div>
  );
};

export default ResumePreview;
