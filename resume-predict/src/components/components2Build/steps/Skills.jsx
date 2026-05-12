import { useState } from "react";
import TagInput from "../ui/TagInput";
import styles from "./Skills.module.css";
import { suggestAPI } from "../../../services/resumeApi";

const Skills = ({ form, set, validation }) => {
  const [loadingRoleSuggest, setLoadingRoleSuggest] = useState(false);
  const [roleSuggestions, setRoleSuggestions]       = useState([]);

  // ── Fetch role-based skill suggestions ──────────────────
  const fetchRoleSkills = async () => {
    if (!form.role) return;
    setLoadingRoleSuggest(true);
    setRoleSuggestions([]);

    const result = await suggestAPI(
      "top 10 technical skills required",
      form.role,
      { role: form.role }
    );

    if (result?.suggestions) {
      setRoleSuggestions(result.suggestions);
    }
    setLoadingRoleSuggest(false);
  };

  // ── Add suggested skill ──────────────────────────────────
  const addSuggested = (skill) => {
    if (!form.skills_technical.includes(skill)) {
      set("skills_technical", [...form.skills_technical, skill]);
    }
  };

  return (
    <div className={styles.wrap}>

      {/* Technical Skills */}
      <div className={styles.section}>
        <label className={styles.label}>
          Technical Skills *
          <span className={styles.hint}>Enter dabao ya comma lagao</span>
        </label>

        <TagInput
          value={form.skills_technical}
          onChange={(v) => set("skills_technical", v)}
          placeholder="e.g. React, Node.js, Python..."
        />

        {/* Role based suggest button */}
        {form.role && (
          <button
            type="button"
            className={styles.roleBtn}
            onClick={fetchRoleSkills}
            disabled={loadingRoleSuggest}
          >
            {loadingRoleSuggest ? (
              <>
                <span className={styles.spinner} /> Suggestions aa rahi hain...
              </>
            ) : (
              `✨ "${form.role}" ke liye skills suggest karo`
            )}
          </button>
        )}

        {/* Role skill suggestions */}
        {roleSuggestions.length > 0 && (
          <div className={styles.suggestRow}>
            {roleSuggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.chip} ${
                  form.skills_technical.includes(s) ? styles.chipAdded : ""
                }`}
                onClick={() => addSuggested(s)}
                disabled={form.skills_technical.includes(s)}
              >
                {form.skills_technical.includes(s) ? `✓ ${s}` : `+ ${s}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Role Skill Mismatch Warning */}
      {validation?.role_skill_mismatch?.length > 0 && (
        <div className={styles.mismatchBox}>
          <p className={styles.mismatchTitle}>
            ⚠️ Role ke liye yeh skills missing hain:
          </p>
          <div className={styles.mismatchList}>
            {validation.role_skill_mismatch.map((m, i) => (
              <div key={i} className={styles.mismatchItem}>
                <span className={styles.mismatchSkill}>{m.skill}</span>
                <span className={styles.mismatchReason}>{m.reason}</span>
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() => addSuggested(m.skill)}
                  disabled={form.skills_technical.includes(m.skill)}
                >
                  {form.skills_technical.includes(m.skill) ? "✓ Added" : "+ Add"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Soft Skills */}
      <div className={styles.section}>
        <label className={styles.label}>
          Soft Skills
          <span className={styles.hint}>Optional</span>
        </label>
        <TagInput
          value={form.skills_soft}
          onChange={(v) => set("skills_soft", v)}
          placeholder="e.g. Communication, Leadership, Teamwork..."
        />
      </div>

      {/* Skills count info */}
      <div className={styles.countRow}>
        <span className={styles.countItem}>
          🛠️ Technical:
          <strong style={{
            color: form.skills_technical.length >= 5 ? "#00e5a0" : "#f59e0b"
          }}>
            {" "}{form.skills_technical.length}
          </strong>
          <span className={styles.countHint}>
            {form.skills_technical.length < 5 ? " (kam se kam 5 daalo)" : " ✓"}
          </span>
        </span>
        <span className={styles.countItem}>
          🤝 Soft:
          <strong style={{ color: "#94a3b8" }}>
            {" "}{form.skills_soft.length}
          </strong>
        </span>
      </div>

    </div>
  );
};

export default Skills;
