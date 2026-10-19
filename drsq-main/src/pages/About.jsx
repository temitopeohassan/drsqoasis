import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import CtaBand from "../components/CtaBand";
import Arc from "../components/Arc";
import Seo from "../components/Seo";
import { company, framework } from "../data/site";

const values = [
  {
    title: "Clarity",
    description:
      "Say what is true about the situation, including the parts leadership may not want stated.",
  },
  {
    title: "Accountability",
    description:
      "Every priority has an owner, a measure and a date. Otherwise it is an intention.",
  },
  {
    title: "Practicality",
    description:
      "Recommend only what the organization has the capacity to carry out.",
  },
  {
    title: "Integrity",
    description:
      "Claim only what can be verified. No borrowed credentials, no inflated performance.",
  },
];

export function AboutIndex() {
  return (
    <>
      <Seo
        title="About | DRKS Alignment LLC"
        description="DRKS Alignment LLC exists to help organizations close the gap between strategy and execution."
      />
      <PageHead
        crumb="About"
        title="Built around a simple principle: alignment creates momentum."
        intro="DRKS Alignment LLC exists to help organizations close the gap between strategy and execution."
      />
      <section className="section">
        <div className="shell grid-3">
          <Link to="/about/who-we-are" className="cap-card">
            <h3>Who we are</h3>
            <p>How the firm works, who we serve and what an engagement looks like.</p>
            <span className="cap-card__more">Read more</span>
          </Link>
          <Link to="/about/mission-statement" className="cap-card">
            <h3>Mission statement</h3>
            <p>The commitments that govern how we take on and deliver work.</p>
            <span className="cap-card__more">Read more</span>
          </Link>
          <Link to="/about/ceo" className="cap-card">
            <h3>About CEO</h3>
            <p>The person accountable for delivery on every engagement.</p>
            <span className="cap-card__more">Read more</span>
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function WhoWeAre() {
  return (
    <>
      <Seo
        title="Who We Are | DRKS Alignment LLC"
        description="DRKS Alignment LLC brings structure to complexity, clarity to priorities and alignment to the people and processes responsible for delivering results."
      />
      <PageHead
        crumb={
          <>
            <Link to="/about">About</Link> / Who we are
          </>
        }
        title="A consulting partner that stays through delivery."
      />
      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <p className="lede">
              We bring structure to complexity, clarity to priorities and
              alignment to the people and processes responsible for delivering
              results.
            </p>
            <p>
              DRKS Alignment LLC was founded on an observation most leaders will
              recognize: the strategy is rarely the problem. The problem is the
              distance between what leadership decided and what the organization
              is set up to do. Roles overlap. Priorities compete. Measures track
              activity instead of progress. The plan is not wrong; it is
              unsupported.
            </p>
            <p>
              We work in that gap. Engagements typically start with an
              assessment, move into alignment work across people and process,
              and end with the organization holding a running system it can
              maintain without us.
            </p>
          </div>
          <div className="panel">
            <span className="label">At a glance</span>
            <dl>
              <div className="data-row">
                <dt>Legal name</dt>
                <dd>{company.legalName}</dd>
              </div>
              <div className="data-row">
                <dt>Founded</dt>
                <dd className="pending">{company.founded}</dd>
              </div>
              <div className="data-row">
                <dt>Headquarters</dt>
                <dd className="pending">{company.headquarters}</dd>
              </div>
              <div className="data-row">
                <dt>Service area</dt>
                <dd className="pending">{company.serviceArea}</dd>
              </div>
            </dl>
            <p className="field__hint" style={{ marginTop: 18 }}>
              Bracketed fields are placeholders. They are replaced with verified
              company information before launch.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function MissionStatement() {
  return (
    <>
      <Seo
        title="Mission Statement | DRKS Alignment LLC"
        description="The commitments that govern how DRKS Alignment LLC takes on and delivers work."
      />
      <PageHead
        crumb={
          <>
            <Link to="/about">About</Link> / Mission statement
          </>
        }
        title="Our mission is narrow on purpose."
        intro="Help organizations turn strategic priorities into coordinated action, stronger operations and measurable results."
      />
      <section className="section">
        <div className="shell grid-2">
          {values.map((value) => (
            <div className="reason" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section section--navy">
        <div className="shell">
          <span className="label">How we work</span>
          <h2 style={{ maxWidth: "24ch", marginBottom: 40 }}>
            The same three movements, on every engagement.
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
      <CtaBand />
    </>
  );
}

export function AboutCeo() {
  return (
    <>
      <Seo
        title="About CEO | DRKS Alignment LLC"
        description="The CEO of DRKS Alignment LLC."
      />
      <PageHead
        crumb={
          <>
            <Link to="/about">About</Link> / About CEO
          </>
        }
        title="The person accountable for delivery."
        intro="CEO name, biography, credentials and photograph must be supplied and verified before publication."
      />
      <section className="section">
        <div className="shell">
          <div className="leader">
            <div className="leader__photo">[LEADERSHIP PHOTO]</div>
            <div>
              <h2 style={{ fontSize: "1.9rem" }}>[LEADER NAME]</h2>
              <p style={{ color: "var(--gold)", fontWeight: 600 }}>[TITLE]</p>
              <p style={{ color: "var(--muted)" }}>[LEADERSHIP BIO]</p>
              <ul className="service-list" style={{ marginTop: 24 }}>
                <li>Credentials: [VERIFY]</li>
                <li>Certifications: [VERIFY]</li>
                <li>Sector experience: [VERIFY]</li>
              </ul>
            </div>
          </div>
          <div className="form-status" style={{ marginTop: 48 }}>
            This page is intentionally unpublished content. Nothing here should
            go live until names, biographies, credentials and photographs are
            confirmed by DRKS.
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
