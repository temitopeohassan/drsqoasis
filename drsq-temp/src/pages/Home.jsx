import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Arc from "../components/Arc";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import { services } from "../data/services";
import { audiences, company } from "../data/site";
import { primaryLeader } from "../data/leadership";

export default function Home() {
  return (
    <>
      <Seo
        title="DRSQ Oasis LLC | Knowledge Improves Lives"
        description="DRSQ Oasis LLC helps people find, understand and use the evidence-based information that leads to better health, through communications, digital technology, technical assistance, training and research."
      />
      <Hero />

      {/* Mission */}
      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>{company.coreIdea}</h2>
          </div>
          <div>
            <p className="lede">{company.positioning}</p>
            <p>
              We work with federal health agencies, government program
              leaders, healthcare and public health organizations, nonprofits
              and foundations, and science and research organizations. The
              audience changes; the discipline does not — start with what
              they need to know, then make it clear, engaging and accessible.
            </p>
            <Link to="/who-we-are" className="btn btn--outline">
              Who we are
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section section--tint">
        <div className="shell">
          <span className="label">What we do</span>
          <h2 style={{ maxWidth: "22ch" }}>
            Five practice areas, one continuous thread.
          </h2>
          <div className="grid-3" style={{ marginTop: 44 }}>
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/what-we-do/${service.slug}`}
                className="cap-card"
              >
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <span className="cap-card__more">View service</span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 40 }}>
            <Link to="/what-we-do" className="btn btn--outline">
              Explore What We Do
            </Link>
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section section--navy">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Who we are</h2>
            <p className="lede">{company.mission}</p>
          </div>
          <div>
            <p>{company.vision}</p>
            <Link to="/who-we-are" className="btn btn--gold">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section">
        <div className="shell">
          <span className="label">Who we serve</span>
          <h2 style={{ maxWidth: "24ch" }}>
            Six audiences, each with a different first question.
          </h2>
          <div className="grid-2" style={{ marginTop: 44 }}>
            {audiences.map((audience) => (
              <div className="audience" key={audience.id}>
                <h3>{audience.name}</h3>
                <ul>
                  {audience.needs.map((need) => (
                    <li key={need}>{need}</li>
                  ))}
                </ul>
                <Link to={audience.ctaPath}>{audience.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="section section--tint">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Join our team</h2>
            <p className="lede">
              Mission-driven, collaborative work with flexible scheduling and
              a national network of experts.
            </p>
          </div>
          <div>
            <p>
              We&apos;re always glad to hear from communications, technology,
              research, training and technical-assistance specialists who
              want to do work that improves lives.
            </p>
            <Link to="/join-our-team" className="btn btn--navy">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* CEO quote */}
      <section className="section">
        <div className="shell">
          <div className="leader">
            <div className="leader__photo">
              <img src={primaryLeader.photo} alt={primaryLeader.photoAlt} />
            </div>
            <div>
              <h3>{primaryLeader.name}</h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>
                {primaryLeader.title}
              </p>
              <p style={{ color: "var(--muted)" }}>{primaryLeader.summary}</p>
              <Link to="/who-we-are/leadership" className="cap-card__more">
                Read the full biography
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
