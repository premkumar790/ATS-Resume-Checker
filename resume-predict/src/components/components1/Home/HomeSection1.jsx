import React from "react";
import Section from "./Section";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const HomeSection1 = () => {
  return (
    <Section title="Our Features">
      <Card title="AI Prediction" description="Smart AI powered results." />
      <Card title="Fast Performance" description="Super fast speed." />
      <Card title="Secure System" description="Top-level security." />
    </Section>
  );
};

export default HomeSection1;