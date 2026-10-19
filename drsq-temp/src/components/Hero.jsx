import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Photos: Unsplash License (free for commercial use, no attribution required).
// hero-strategy.jpg / hero-alignment.jpg by Vitaly Gariev (@silverkblack),
// hero-results.jpg by Ambre Estève (@ambresteve). Swap for real DRSQ
// photography when available (see README pre-launch checklist).
import heroStrategy from "../assets/hero-strategy.jpg";
import heroAlignment from "../assets/hero-alignment.jpg";
import heroResults from "../assets/hero-results.jpg";

const slides = [
  {
    image: heroStrategy,
    caption: "Knowledge Improves Lives",
    headline: "Knowledge Improves Lives.",
    body: "DRSQ Oasis LLC helps people find, understand and use the evidence-based information that leads to better health.",
  },
  {
    image: heroAlignment,
    caption: "Communications, Technology, Research",
    headline: "Evidence, Made Clear, Engaging and Accessible.",
    body: "We bring communications, digital technology, technical assistance, training and research together around a single goal: information people can actually use.",
  },
  {
    image: heroResults,
    caption: "Human-Centered, Outcome-Focused",
    headline: "Human-Centered. Evidence-Based. Outcome-Focused.",
    body: "DRSQ Oasis LLC designs health communications and digital experiences around the people who depend on them.",
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
            Contact Us
          </Link>
          <Link to="/what-we-do" className="btn btn--ghost">
            Explore What We Do
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
