import React from "react";
import { HappyRect } from "./components/shad0w0-2/happy-rectangle";
import Intro from "./components/shad0w0-2/intros";
import HeroSection from "./components/shad0w0-2/back-ground-test";

export default function Home() {
  return (
    <div className="">
      <div className="">
        <HeroSection />
      </div>
      <div className=" overflow-x-clip">
        <HappyRect />
      </div>
      <div className="">
        <Intro />
      </div>
    </div>
  );
}
