import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import CtaBand from "../components/CtaBand";
import Arc from "../components/Arc";
import Seo from "../components/Seo";
import { capabilities } from "../data/capabilities";

const reasons = [
  {
    title: "Complementary capability",
    description:
      "Strategy, program and administrative scopes that sit alongside technical delivery rather than competing with it.",
  },
  {
    title: "Reliable delivery",
    description:
      "Defined deliverables, agreed reporting and a named point of contact for the length of the engagement.",
  },
  {
    title: "Responsive leadership",
    description:
      "Decisions come from people close to the work, so scope questions are answered in days rather than weeks.",
  },
  {
    title: "Contract support",
    description:
      "Documentation, coordination and reporting support that keeps contract obligations covered.",
  },
];

const idealPartners = [
  "Prime contractors seeking subcontract support on strategy, program or administrative scopes",
  "Firms pursuing work that requires additional delivery capacity",
  "Organizations building teaming arrangements ahead of a solicitation",
  "Institutions needing a responsive partner for time-bound initiatives",
];

export default function Partners() {
  return (
    <>
      <Seo
        title="For Partners | DRKS Alignment LLC"
        description="DRKS Alignment LLC works with organizations that need a responsive, capable partner to strengthen delivery, expand capacity and support mission-critical initiatives."
      />
      <PageHead
        crumb="For partners"
        title="A strategic partner built for alignment and execution."
        intro="DRKS Alignment LLC works with organizations that need a responsive, capable partner to strengthen delivery, expand capacity and support mission-critical initiatives."
      />

      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Why partner with DRKS</h2>
            <p className="lede">
              We take the scopes that primes often carry reluctantly, and we
              carry them properly.
            </p>
          </div>
          <div className="grid-2">
            {reasons.map((reason) => (
              <div className="reason" key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="shell">
          <span className="label">Partner capabilities</span>
          <h2 style={{ maxWidth: "24ch" }}>What we bring to a team.</h2>
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

      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Teaming and subcontracting</h2>
            <p>
              We work as a subcontractor on prime-led efforts and as a teaming
              partner on pursuits where our scope strengthens the offer. Terms,
              flow-downs and reporting expectations are agreed before award, not
              after.
            </p>
            <p>
              For pursuits, we can support capture with capability inputs,
              staffing plans and narrative sections within our practice areas.
            </p>
          </div>
          <div className="panel">
            <span className="label">Ideal partners</span>
            <ul className="service-list">
              {idealPartners.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p style={{ marginTop: 26 }}>
              <Link to="/contact" className="btn btn--navy">
                Partner with DRKS
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Working a pursuit that needs our scope?"
        body="Send the solicitation number and the piece you need covered. We will tell you quickly whether we can strengthen the bid."
        actions={[
          { label: "Partner with DRKS", to: "/contact", variant: "btn--gold" },
          { label: "For government buyers", to: "/government", variant: "btn--ghost" },
        ]}
      />
    </>
  );
}
