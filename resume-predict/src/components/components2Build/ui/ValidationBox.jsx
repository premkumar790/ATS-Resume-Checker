import styles from "./AISuggestField.module.css";
import useAISuggest from "../../../hooks/useAISuggest";

const AISuggestField = ({
  label,
  field,
  value,
  onChange,
  context,
  multiline = false,
  type = "text",
  placeholder = "",
}) => {
  const { suggestions, loading, fetchSuggest, clear } = useAISuggest();

  const handleSuggest = () => {
    fetchSuggest(field, value, context);
  };

  const handlePick = (s) => {
    onChange(s);
    clear();
  };

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>{label}</label>

      <div className={styles.inputRow}>
        {multiline ? (
          <textarea
            className={styles.textarea}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            className={styles.input}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        )}

        <button
          type="button"
          className={styles.aiBtn}
          onClick={handleSuggest}
          disabled={loading}
          title="AI se suggest karwao"
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            "✨ AI"
          )}
        </button>
      </div>

      {/* Loading text */}
      {loading && (
        <p className={styles.loadingText}>AI soch raha hai...</p>
      )}

      {/* Suggestions box */}
      {suggestions && !loading && (
        <div className={styles.suggestBox}>

          {/* Tip */}
          {suggestions.tip && (
            <p className={styles.tip}>💡 {suggestions.tip}</p>
          )}

          {/* Chips */}
          {suggestions.suggestions?.length > 0 && (
            <div className={styles.chips}>
              {suggestions.suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className={styles.chip}
                  onClick={() => handlePick(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Example */}
          {suggestions.example && (
            <p className={styles.example}>
              <span>Example: </span>{suggestions.example}
            </p>
          )}

          {/* Close */}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={clear}
          >
            ✕ Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AISuggestField;
