import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Headings and body copy across the site. Deliberately excludes form
// fields/status and the hero's rotating live-region caption so validation
// messages and slide captions appear immediately rather than waiting on
// scroll/observer timing.
const TARGET_SELECTOR = "h1, h2, h3, .lede, p";
const EXCLUDE_SELECTOR = ".form, .field, .form-status, .hero__caption";

const STAGGER_STEP_MS = 70;
const STAGGER_STEPS = 4;

// Fades page text in on load and as it scrolls into view. Applies to
// every route's content inside <main> without each page needing to opt in.
export default function ScrollReveal() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const main = document.getElementById("main");
    if (!main) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const targets = Array.from(
      main.querySelectorAll(TARGET_SELECTOR)
    ).filter((el) => !el.closest(EXCLUDE_SELECTOR));

    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty(
        "--reveal-delay",
        `${(i % STAGGER_STEPS) * STAGGER_STEP_MS}ms`
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
