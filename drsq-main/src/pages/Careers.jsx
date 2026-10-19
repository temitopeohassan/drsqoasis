import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import CtaBand from "../components/CtaBand";
import Arc from "../components/Arc";
import Seo from "../components/Seo";
import { company } from "../data/site";

const traits = [
  {
    title: "You finish things",
    description:
      "Recommendations are the easy half. We hire people who stay until the change holds.",
  },
  {
    title: "You write clearly",
    description:
      "Most of our deliverables are documents someone has to act on. Clear writing is a core skill here.",
  },
  {
    title: "You are direct",
    description:
      "Clients pay for an honest read of their situation. That requires saying the difficult part out loud.",
  },
  {
    title: "You respect the mission",
    description:
      "Much of our work supports public and institutional missions. The standards that come with that are not negotiable.",
  },
];

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers | DRKS Alignment LLC"
        description="Work with DRKS Alignment LLC on strategy, alignment, program and operations engagements."
      />
      <PageHead
        crumb="Careers"
        title="We hire for judgment and follow-through."
        intro="DRKS Alignment LLC builds small teams around each engagement. The people on them carry real accountability for delivery."
      />

      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>What we look for</h2>
            <p className="lede">
              Consulting experience helps. Operating experience helps more.
            </p>
          </div>
          <div className="grid-2">
            {traits.map((trait) => (
              <div className="reason" key={trait.title}>
                <h3>{trait.title}</h3>
                <p>{trait.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="shell">
          <span className="label">Open roles</span>
          <h2 style={{ maxWidth: "22ch" }}>No positions posted right now.</h2>
          <p className="lede" style={{ marginTop: 16 }}>
            We keep applications on file and reach out when an engagement calls
            for your background. Send a résumé and a short note on the kind of
            work you want to be doing.
          </p>
          <p style={{ marginTop: 28 }}>
            <a
              href={`mailto:${company.email}?subject=Careers%20—%20DRKS%20Alignment%20LLC`}
              className="btn btn--navy"
            >
              Send your résumé
            </a>
          </p>
        </div>
      </section>

      <CtaBand
        title="Not looking for a role, but want to work together?"
        body="Independent consultants and specialist firms are welcome to introduce themselves."
        actions={[
          { label: "Start a conversation", to: "/contact", variant: "btn--gold" },
          { label: "For partners", to: "/partners", variant: "btn--ghost" },
        ]}
      />
    </>
  );
}
