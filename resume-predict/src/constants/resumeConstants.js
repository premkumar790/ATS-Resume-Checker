export const STEPS = [
  { id: "basic",      label: "Basic Info",      icon: "👤" },
  { id: "summary",    label: "Summary",         icon: "📝" },
  { id: "skills",     label: "Skills",          icon: "🛠️" },
  { id: "education",  label: "Education",       icon: "🎓" },
  { id: "experience", label: "Experience",      icon: "💼" },
  { id: "projects",   label: "Projects",        icon: "🚀" },
  { id: "extras",     label: "Extras",          icon: "🏆" },
  { id: "review",     label: "Review & Export", icon: "✅" },
];

export const INITIAL_FORM = {
  name:             "",
  role:             "",
  email:            "",
  phone:            "",
  linkedin:         "",
  github:           "",
  portfolio:        "",
  summary:          "",
  skills_technical: [],
  skills_soft:      [],
  education:        [{ degree: "", institution: "", year: "", score: "" }],
  experience:       [{ title: "", company: "", duration: "", description: "" }],
  projects:         [{ name: "", tech_stack: "", description: "" }],
  certifications:   [{ name: "", issuer: "", year: "" }],
  languages:        "",
};

export const EDUCATION_TEMPLATE    = { degree: "", institution: "", year: "", score: "" };
export const EXPERIENCE_TEMPLATE   = { title: "", company: "", duration: "", description: "" };
export const PROJECT_TEMPLATE      = { name: "", tech_stack: "", description: "" };
export const CERTIFICATION_TEMPLATE = { name: "", issuer: "", year: "" };

export const API_BASE = "https://ats-resume-checker-rslh.onrender.com/api/resume";