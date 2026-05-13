// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./HomeSection2.module.css";

// const UploadBox = () => {
//   const fileRef = useRef(null);
//   const [fileName, setFileName] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleFile = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     const allowed = ["application/pdf"];

//     if (!allowed.includes(selected.type)) {
//       setError("Only PDF allowed");
//       return;
//     }

//     if (selected.size > 2 * 1024 * 1024) {
//       setError("Max size 2MB");
//       return;
//     }

//     setError("");
//     setFileName(selected.name);
//     setFile(selected);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       fileRef.current.click(); // pehle file choose karo
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("resume", file);

//       const res = await fetch("/api/analyze", {
// // const res = await fetch("http://localhost:5000/api/analyze", {  // ✅ SAHI

//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!data.success) throw new Error(data.error || "Something went wrong");

//       // Result page pe data bhejo
//       navigate("/result", { state: { result: data.data } });

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.uploadBox}>
//       <p className={styles.uploadText}>
//         Drop your resume here or choose a file. PDF only. Max 2MB file size.
//       </p>

//       <button
//         className={styles.uploadBtn}
//         onClick={handleUpload}
//         disabled={loading}
//       >
//         {loading
//           ? "Analyzing..."
//           : file
//           ? "Analyze Resume"
//           : "Upload Your Resume"}
//       </button>

//       <input
//         type="file"
//         ref={fileRef}
//         style={{ display: "none" }}
//         accept=".pdf"
//         onChange={handleFile}
//       />

//       {fileName && <p style={{ marginTop: "8px" }}>📄 {fileName}</p>}
//       {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

//       <p className={styles.privacy}>
//         <span className={styles.lockIcon}>🔒</span> Privacy guaranteed
//       </p>
//     </div>
//   );
// };

// export default UploadBox;




import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeSection2.module.css";

const UploadBox = () => {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowed = ["application/pdf"];

    if (!allowed.includes(selected.type)) {
      setError("Only PDF allowed");
      return;
    }

    if (selected.size > 2 * 1024 * 1024) {
      setError("Max size 2MB allowed");
      return;
    }

    setError("");
    setFileName(selected.name);
    setFile(selected);

    console.log("📄 Selected File:", selected);
  };

  const handleUpload = async () => {
    if (!file) {
      fileRef.current.click();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      console.log("📤 Sending file to backend...");

      const res = await fetch("https://ats-resume-checker-rslh.onrender.com/api/analyze", {
        method: "POST",
        body: formData,
      });

      let data;
      console.log("📄 File selected:", file);

      try {
        data = await res.json();
      } catch (jsonErr) {
        console.log("❌ JSON Parse Error:", jsonErr);
        throw new Error("Backend did not return valid JSON");
      }

      // 🔥 Debugging line (IMPORTANT)
      console.log("🔥 BACKEND RESPONSE 👉", data);

      if (!data.success) {
        console.log("❌ Backend Error:", data.error);
        throw new Error(data.error || "Something went wrong");
      }

      console.log("➡ Redirecting to /result with data:", data.data);

      navigate("/result", { state: { result: data.data } });
    } catch (err) {
      console.log("❌ FRONTEND ERROR:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadBox}>
      <p className={styles.uploadText}>
        Drop your resume here or choose a file. PDF only. Max 2MB size.
      </p>

      <button
        className={styles.uploadBtn}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading
          ? "Analyzing..."
          : file
          ? "Analyze Resume"
          : "Upload Your Resume"}
      </button>

      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        accept=".pdf"
        onChange={handleFile}
      />

      {fileName && <p style={{ marginTop: "8px" }}>📄 {fileName}</p>}
      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

      <p className={styles.privacy}>
        <span className={styles.lockIcon}>🔒</span> Privacy guaranteed
      </p>
    </div>
  );
};

export default UploadBox;