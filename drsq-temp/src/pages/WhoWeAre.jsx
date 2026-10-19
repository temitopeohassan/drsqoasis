import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import CtaBand from "../components/CtaBand";
import Arc from "../components/Arc";
import Seo from "../components/Seo";
import { brandPrinciples, company } from "../data/site";
import { services } from "../data/services";
import { primaryLeader } from "../data/leadership";

export default function WhoWeAre() {
  return (
    <>
      <Seo
        title="Who We Are | DRSQ Oasis LLC"
        description="DRSQ Oasis LLC's mission, philosophy, leadership and organizational qualifications."
      />
      <PageHead
        crumb="Who We Are"
        title={company.coreIdea}
        intro={company.positioning}
      />

      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Our mission</h2>
            <p className="lede">{company.mission}</p>
            <h2 style={{ marginTop: 36 }}>Our vision</h2>
            <p>{company.vision}</p>
          </div>
          <div className="panel">
            <span className="label">Brand principles</span>
            <ul className="service-list">
              {brandPrinciples.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Leadership</h2>
            <p className="lede">
              DRSQ is led by an executive who has spent more than 20 years
              turning complex operational, financial and regulatory
              requirements into strategies organizations can actually run.
            </p>
            <Link to="/who-we-are/leadership" className="btn btn--outline">
              Meet our leadership
            </Link>
          </div>
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
            </div>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="shell">
          <span className="label">How that shows up in the work</span>
          <h2 style={{ maxWidth: "24ch", marginBottom: 24 }}>
            Five practices, brought to one goal.
          </h2>
          <dl>
            {services.map((service) => (
              <div className="data-row" key={service.slug}>
                <dt>{service.name}</dt>
                <dd>{service.description}</dd>
              </div>
            ))}
          </dl>
          <p style={{ marginTop: 28 }}>
            <Link to="/what-we-do" className="btn btn--gold">
              Explore What We Do
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export function Leadership() {
  return (
    <>
      <Seo
        title="Leadership | DRSQ Oasis LLC"
        description={`${primaryLeader.name}, ${primaryLeader.title} of DRSQ Oasis LLC.`}
      />
      <PageHead
        crumb={
          <>
            <Link to="/who-we-are">Who We Are</Link> / Leadership
          </>
        }
        title="The people accountable for delivery."
        intro="DRSQ is led by an executive team that has carried operational, financial and regulatory responsibility inside the kinds of organizations we now serve."
      />

      <section className="section">
        <div className="shell">
          <div className="leader">
            <div className="leader__photo">
              <img src={primaryLeader.photo} alt={primaryLeader.photoAlt} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.9rem", marginBottom: 4 }}>
                {primaryLeader.name}
              </h2>
              <p style={{ color: "var(--gold)", fontWeight: 600, marginBottom: 4 }}>
                {primaryLeader.title}
              </p>
              <p className="leader__strapline">{primaryLeader.strapline}</p>
              {primaryLeader.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} style={{ color: "var(--muted)" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="shell grid-2">
          <div className="panel">
            <h3>Areas of expertise</h3>
            <ul className="service-list">
              {primaryLeader.expertise.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <h3>Current roles</h3>
            <dl>
              {primaryLeader.roles.map((role) => (
                <div className="data-row" key={role.organization}>
                  <dt>{role.organization}</dt>
                  <dd>{role.title}</dd>
                </div>
              ))}
            </dl>
            <h3 style={{ marginTop: 32 }}>Earlier experience</h3>
            <ul className="service-list">
              {primaryLeader.priorExperience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="shell">
          <span className="label">Education</span>
          <h2 style={{ maxWidth: "24ch", marginBottom: 24 }}>
            Qualifications behind the practice.
          </h2>
          <dl>
            {primaryLeader.education.map((item) => (
              <div className="data-row" key={item.credential}>
                <dt>{item.institution}</dt>
                <dd>{item.credential}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        title="Talk to us about the requirement in front of you."
        body="Tell us what you are trying to move forward. We will tell you plainly whether we are the right partner for it."
        actions={[
          { label: "Contact Us", to: "/contact", variant: "btn--gold" },
          { label: "Explore What We Do", to: "/what-we-do", variant: "btn--ghost" },
        ]}
      />
    </>
  );
}
