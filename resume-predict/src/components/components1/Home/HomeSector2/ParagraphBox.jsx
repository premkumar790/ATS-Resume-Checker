import React from "react";
import styles from "./HomeSection2.module.css";
import UploadBox from "./UploadBox";

const ParagraphBox = () => {
  return (
    <div className={styles.ParagraphBoxContent}>
      <div className={styles.paragraph}>
        <p>
          A free and fast AI resume checker doing 16 crucial checks
          to ensure your resume is ready to perform and get you interview callbacks.
        </p>
      </div>

      <UploadBox />
    </div>
  );
};

export default ParagraphBox;