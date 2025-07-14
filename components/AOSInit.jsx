"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    const handleInit = () => {
      AOS.init({
        duration: 600,
        once: true,
        offset: 100,
      });
    };

    if (typeof window !== "undefined" && document.readyState === "complete") {
      // если уже загружено
      handleInit();
    } else {
      // если ещё нет — ждём полной загрузки
      window.addEventListener("load", handleInit);
      return () => window.removeEventListener("load", handleInit);
    }
  }, []);

  return null;
}
