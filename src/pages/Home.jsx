import Hero from "../components/Hero";
import WhatWeDo from "../components/WhatWeDo";
import About from "./About";
import Certifications from "./Certifications";
import Stories from "./Stories";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatWeDo />
      <Stories />
    </>
  );
}
