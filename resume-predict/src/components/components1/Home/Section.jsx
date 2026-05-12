import React from "react";
import "./Home.css";

const Section = ({ title, children }) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="section-box">{children}</div>
    </section>
  );
};

export default Section;