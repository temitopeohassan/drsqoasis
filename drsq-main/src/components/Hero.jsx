import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Photos: Unsplash License (free for commercial use, no attribution required).
// hero-strategy.jpg / hero-alignment.jpg by Vitaly Gariev (@silverkblack),
// hero-results.jpg by Ambre Estève (@ambresteve). Swap for real DRKS
// photography when available (see README pre-launch checklist).
import heroStrategy from "../assets/hero-strategy.jpg";
import heroAlignment from "../assets/hero-alignment.jpg";
import heroResults from "../assets/hero-results.jpg";

const slides = [
  {
    image: heroStrategy,
    caption: "Strategy",
    headline: "Strategy Aligned. Execution Focused. Results Driven.",
    body: "DRKS Alignment LLC helps organizations turn strategic priorities into coordinated action, stronger operations and measurable results.",
  },
  {
    image: heroAlignment,
    caption: "Alignment",
    headline: "Where Strategy Becomes Execution.",
    body: "We bring strategy, people, processes and priorities into alignment so organizations can move forward with clarity and confidence.",
  },
  {
    image: heroResults,
    caption: "Results",
    headline: "Align Your Strategy. Accelerate Your Results.",
    body: "DRKS Alignment LLC provides strategic and operational support designed to help organizations navigate complexity and execute what matters most.",
  },
];

const ROTATION_MS = 7000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  const active = slides[index];

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero__media" aria-hidden="true">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.caption}
            className={
              slideIndex === index ? "hero__slide is-active" : "hero__slide"
            }
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      <div className="shell hero__inner">
        <svg className="arc" viewBox="0 0 116 10" aria-hidden="true">
          <path d="M2 8 C 36 8, 78 6, 112 2" />
        </svg>
        <h1>{active.headline}</h1>
        <p className="hero__body">{active.body}</p>
        <div className="hero__actions">
          <Link to="/contact" className="btn btn--gold">
            Start a conversation
          </Link>
          <Link to="/capabilities" className="btn btn--ghost">
            Explore our capabilities
          </Link>
        </div>

        <div className="hero__dots" role="tablist" aria-label="Hero slides">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.caption}
              type="button"
              role="tab"
              aria-selected={slideIndex === index}
              aria-label={`Show slide ${slideIndex + 1}: ${slide.caption}`}
              className={
                slideIndex === index ? "hero__dot is-active" : "hero__dot"
              }
              onClick={() => setIndex(slideIndex)}
            />
          ))}
        </div>
        <p className="hero__caption" aria-live="polite">
          {active.caption}
        </p>
      </div>
    </section>
  );
}
