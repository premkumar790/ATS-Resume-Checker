import React from "react";
import styles from "./HomeSection2.module.css";
import TopBar from "./TopBar";
import GoodEnough from "./GoodEnough";
import ParagraphBox from "./ParagraphBox";
import ImageBox from "./ImageBox";

const HomeSection2 = () => {
  return (
    <div className={styles.Section2Container}>
      <div className={styles.container}>
        <TopBar />
        <GoodEnough />

        <div className={styles.ParagraphBox}>
          <ParagraphBox />
          <ImageBox />
        </div>

      </div>
    </div>
  );
};

export default HomeSection2;