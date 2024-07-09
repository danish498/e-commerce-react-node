"use client";

import React from "react";
import Services from "./Services";
import Banner from "./Banner";
import Testimonials from "./Testimonials";
import HeroSection from "./HeroSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Services />
      <Banner />
      <Testimonials />
    </>
  );
};

export default HomePage;
