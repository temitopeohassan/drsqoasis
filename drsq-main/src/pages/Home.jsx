import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Arc from "../components/Arc";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import { capabilities } from "../data/capabilities";
import { insights } from "../data/insights";
import { audiences, company, framework, whyDrks } from "../data/site";

export default function Home() {
  return (
    <>
      <Seo
        title="DRKS Alignment LLC | Strategy. Alignment. Results."
        description="DRKS Alignment LLC helps organizations align strategy, people, processes and execution to achieve meaningful results."
      />
      <Hero />

      {/* Trust positioning */}
      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Built around a simple principle: alignment creates momentum.</h2>
          </div>
          <div>
            <p className="lede">{company.positioning}</p>
            <p>
              We work with government buyers, prime contractors, corporate
              leadership teams and mission-driven institutions. The engagement
              changes; the discipline does not. We start with what leadership is
              actually trying to achieve, find where the organization is pulling
              against itself, and stay involved through delivery.
            </p>
            <Link to="/about/who-we-are" className="btn btn--outline">
              Who we are
            </Link>
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="section section--tint">
        <div className="shell">
          <span className="label">Core capabilities</span>
          <h2 style={{ maxWidth: "22ch" }}>
            Six practice areas, one continuous thread.
          </h2>
          <div className="grid-3" style={{ marginTop: 44 }}>
            {capabilities.map((capability) => (
              <Link
                key={capability.slug}
                to={`/capabilities/${capability.slug}`}
                className="cap-card"
              >
                <h3>{capability.name}</h3>
                <p>{capability.description}</p>
                <span className="cap-card__more">View capability</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Framework — a genuine sequence */}
      <section className="section section--navy">
        <div className="shell">
          <span className="label">The DRKS framework</span>
          <h2 style={{ maxWidth: "24ch", marginBottom: 40 }}>
            Strategy sets direction. Alignment carries it. Results prove it.
          </h2>
          <div className="framework">
            {framework.map((step) => (
              <div className="framework__step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why DRKS */}
      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Why organizations bring us in.</h2>
            <p className="lede">
              Usually because the plan is sound and the delivery is not, and
              nobody inside the organization has the standing to say why.
            </p>
          </div>
          <div className="grid-2">
            {whyDrks.map((reason) => (
              <div className="reason" key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="section section--tint">
        <div className="shell">
          <span className="label">Who we serve</span>
          <h2 style={{ maxWidth: "24ch" }}>
            Four audiences, each with a different first question.
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

      {/* Government + partner CTA */}
      <section className="section">
        <div className="shell grid-2">
          <div className="panel">
            <span className="label">For government buyers</span>
            <h3>A responsive partner for public and institutional missions.</h3>
            <p style={{ color: "var(--muted)" }}>
              Capability statement, contracting details and points of contact,
              organized the way an evaluator reads them.
            </p>
            <Link to="/government" className="btn btn--outline">
              Discuss a requirement
            </Link>
          </div>
          <div className="panel">
            <span className="label">For prime contractors</span>
            <h3>Complementary capability with responsive leadership.</h3>
            <p style={{ color: "var(--muted)" }}>
              Teaming and subcontracting support for primes who need reliable
              delivery on strategy, program and administrative scopes.
            </p>
            <Link to="/partners" className="btn btn--outline">
              Partner with DRKS
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section section--tint">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Leadership</h2>
            <p className="lede">
              Leadership names, biographies, credentials and photographs are
              supplied by DRKS and published only after verification.
            </p>
            <Link to="/about/ceo" className="btn btn--outline">
              Meet the CEO
            </Link>
          </div>
          <div className="leader">
            <div className="leader__photo">[LEADERSHIP PHOTO]</div>
            <div>
              <h3>[LEADER NAME]</h3>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>[TITLE]</p>
              <p style={{ color: "var(--muted)" }}>[LEADERSHIP BIO]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insights preview */}
      <section className="section">
        <div className="shell">
          <span className="label">Insights</span>
          <h2 style={{ maxWidth: "22ch" }}>
            Notes on strategy, alignment and getting work delivered.
          </h2>
          <div className="grid-3" style={{ marginTop: 44 }}>
            {insights.slice(0, 3).map((insight) => (
              <Link
                key={insight.slug}
                to="/insights"
                className="insight"
              >
                <span className="insight__cat">{insight.category}</span>
                <h3>{insight.title}</h3>
                <p>{insight.excerpt}</p>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 40 }}>
            <Link to="/insights" className="btn btn--outline">
              Read all insights
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
