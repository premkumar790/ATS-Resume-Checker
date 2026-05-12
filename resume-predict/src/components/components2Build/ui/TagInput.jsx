import { useState } from "react";
import styles from "./TagInput.module.css";

const TagInput = ({ value = [], onChange, placeholder = "Type and press Enter..." }) => {
  const [input, setInput] = useState("");

  // ── Add tag ──────────────────────────────────────────────
  const addTag = (val) => {
    const trimmed = val.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  // ── Remove tag ───────────────────────────────────────────
  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  // ── Key handler ──────────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div className={styles.wrap}>
      {value.map((tag, i) => (
        <span key={i} className={styles.tag}>
          {tag}
          <button
            type="button"
            className={styles.remove}
            onClick={() => removeTag(i)}
          >
            ×
          </button>
        </span>
      ))}

      <input
        className={styles.input}
        value={input}
        placeholder={value.length === 0 ? placeholder : ""}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && addTag(input)}
      />
    </div>
  );
};

export default TagInput;
