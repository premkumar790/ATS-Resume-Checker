import { API_BASE } from "../constants/resumeConstants";

// ============================================================
// SUGGEST — AI field suggestions
// ============================================================
export const suggestAPI = async (field, value, context) => {
  try {
    const res = await fetch(`${API_BASE}/suggest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field, value, context }),
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("❌ suggestAPI Error:", err.message);
    return null;
  }
};

// ============================================================
// VALIDATE — AI resume validation
// ============================================================
export const validateAPI = async (resumeData) => {
  try {
    const res = await fetch(`${API_BASE}/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeData }),
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("❌ validateAPI Error:", err.message);
    return null;
  }
};

// ============================================================
// GENERATE — AI enhanced resume generator
// ============================================================
export const generateAPI = async (resumeData) => {
  try {
    const res = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeData }),
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("❌ generateAPI Error:", err.message);
    return null;
  }
};