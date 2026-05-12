import { useState } from "react";
import {
  INITIAL_FORM,
  EDUCATION_TEMPLATE,
  EXPERIENCE_TEMPLATE,
  PROJECT_TEMPLATE,
  CERTIFICATION_TEMPLATE,
} from "../constants/resumeConstants";

const useResumeForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);

  // ── Single field update ──────────────────────────────────
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  // ── Repeater: add item ───────────────────────────────────
  const addItem = (key) => {
    const templates = {
      education:      EDUCATION_TEMPLATE,
      experience:     EXPERIENCE_TEMPLATE,
      projects:       PROJECT_TEMPLATE,
      certifications: CERTIFICATION_TEMPLATE,
    };
    setForm((f) => ({ ...f, [key]: [...f[key], { ...templates[key] }] }));
  };

  // ── Repeater: remove item ────────────────────────────────
  const removeItem = (key, index) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].filter((_, i) => i !== index),
    }));

  // ── Repeater: update single field inside item ────────────
  const updateItem = (key, index, field, val) =>
    setForm((f) => {
      const arr = [...f[key]];
      arr[index] = { ...arr[index], [field]: val };
      return { ...f, [key]: arr };
    });

  // ── Reset form ───────────────────────────────────────────
  const resetForm = () => setForm(INITIAL_FORM);

  return {
    form,
    set,
    addItem,
    removeItem,
    updateItem,
    resetForm,
  };
};

export default useResumeForm;