import { useState } from "react";
import { suggestAPI } from "../services/resumeAPI";

const useAISuggest = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  // ── Fetch suggestions from AI ────────────────────────────
  const fetchSuggest = async (field, value, context) => {
    setLoading(true);
    setSuggestions(null);
    const result = await suggestAPI(field, value, context);
    setSuggestions(result);
    setLoading(false);
  };

  // ── Clear suggestions ────────────────────────────────────
  const clear = () => setSuggestions(null);

  return {
    suggestions,
    loading,
    fetchSuggest,
    clear,
  };
};

export default useAISuggest;