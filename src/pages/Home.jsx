import Hero from "../components/Hero";
import SvarpPillars from "../components/SvarpPillars";
import WhatWeDo from "../components/WhatWeDo";
import About from "./About";
import Certifications from "./Certifications";
import Stories from "./Stories";

export default function Home() {
  return (
    <>
      <Hero />
      <SvarpPillars />
      <About showTeam={false} />
      <WhatWeDo />
      <Stories />
    </>
  );
}
