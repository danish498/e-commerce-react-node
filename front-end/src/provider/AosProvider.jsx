"use client";
import AOS from "aos";

import "aos/dist/aos.css";
// import 'aos/src/sass/aos.scss';
// import '@/app/global.css';

import { useEffect } from "react";

const AOSProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        offset: 100,
        duration: 500,
        easing: "ease-in",
        delay: 100,
      });
      // AOS.refresh();
    }
  }, []);

  return <>{children}</>;
};

export default AOSProvider;
