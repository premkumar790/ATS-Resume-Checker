import { useState } from "react";
import { validateAPI, generateAPI } from "../services/resumeAPI";

const useValidation = () => {
  const [validation, setValidation]   = useState(null);
  const [generated, setGenerated]     = useState(null);
  const [validating, setValidating]   = useState(false);
  const [generating, setGenerating]   = useState(false);
  const [valError, setValError]       = useState("");
  const [genError, setGenError]       = useState("");

  // ── Run AI Validation ────────────────────────────────────
  const runValidation = async (formData) => {
    setValidating(true);
    setValError("");
    setValidation(null);

    const result = await validateAPI(formData);

    if (result) {
      setValidation(result);
    } else {
      setValError("Validation fail ho gayi. Dobara try karo.");
    }

    setValidating(false);
    return result;
  };

  // ── Run AI Generate (enhance resume) ────────────────────
  const runGenerate = async (formData) => {
    setGenerating(true);
    setGenError("");
    setGenerated(null);

    const result = await generateAPI(formData);

    if (result) {
      setGenerated(result);
    } else {
      setGenError("Resume generate nahi hua. Dobara try karo.");
    }

    setGenerating(false);
    return result;
  };

  // ── Clear all ────────────────────────────────────────────
  const clearAll = () => {
    setValidation(null);
    setGenerated(null);
    setValError("");
    setGenError("");
  };

  return {
    // Validation
    validation,
    validating,
    valError,
    runValidation,

    // Generate
    generated,
    generating,
    genError,
    runGenerate,

    // Reset
    clearAll,
  };
};

export default useValidation;