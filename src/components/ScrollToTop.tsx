// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// NOTE: App.tsx me isko `{ ScrollToTop }` ke saath import kiya hai,
// isliye yahan "named export" kar rahe hain
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // agar URL me #section hai to us element tak scroll kare
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // otherwise top pe scroll
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}