import React from "react";
import Banner from "../components/sections/about/Banner";
import RoadScene from "../components/sections/home/RoadScene";
import Mission from "../components/sections/about/Mission";
import CreativeTeam from "../components/sections/about/CreativeTeam";
import TechnicalExpertise from "../components/sections/about/TechnicalExpertise";
import Objectives from "../components/sections/about/Objectives";

export default function AboutPage() {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Temporarily prevent horizontal scroll during page load
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";

    // Clean up on unmount
    return () => {
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, []);

  return (
    <div className="overflow-x-hidden w-full -mt-10 md:-mt-20">
      <Banner />
      <RoadScene />
      <Mission />
      <CreativeTeam />
      <TechnicalExpertise />
      <Objectives />
    </div>
  );
}
