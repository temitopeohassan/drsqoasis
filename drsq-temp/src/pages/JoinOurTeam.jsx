import PageHead from "../components/PageHead";
import CtaBand from "../components/CtaBand";
import Arc from "../components/Arc";
import Seo from "../components/Seo";
import { company, culture } from "../data/site";

const traits = [
  {
    title: "You care about the mission",
    description:
      "Much of our work supports public health missions. The people on our team stay motivated by the idea that knowledge improves lives.",
  },
  {
    title: "You write and communicate clearly",
    description:
      "Most of what we produce is meant to be understood by someone outside our field. Clear, plain-language communication is a core skill here.",
  },
  {
    title: "You're evidence-based and human-centered",
    description:
      "We start with research and design around the people who will actually use what we build.",
  },
  {
    title: "You collaborate well",
    description:
      "Our teams work across communications, technology, research and training. Collaboration across disciplines is how the work gets done.",
  },
];

export default function JoinOurTeam() {
  return (
    <>
      <Seo
        title="Join Our Team | DRSQ Oasis LLC"
        description="Work with DRSQ Oasis LLC on health communications, digital technology, technical assistance, training and research and evaluation."
      />
      <PageHead
        crumb="Join Our Team"
        title="Mission-driven work, built around flexibility."
        intro="DRSQ Oasis LLC brings together communications, technology, research, training and technical-assistance specialists around a shared goal: knowledge that improves lives."
      />

      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>What we look for</h2>
            <p className="lede">{culture.positioning}</p>
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
        <div className="shell grid-2">
          <div className="panel">
            <h3>How we work</h3>
            <ul className="service-list">
              {culture.workModel.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <h3>Well-being</h3>
            <ul className="service-list">
              {culture.wellbeing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <span className="label">Open roles</span>
          <h2 style={{ maxWidth: "22ch" }}>No positions posted right now.</h2>
          <p className="lede" style={{ marginTop: 16 }}>
            We keep applications on file and reach out when an opening calls
            for your background. Send a résumé and a short note on the kind of
            work you want to be doing.
          </p>
          <p style={{ marginTop: 28 }}>
            <a
              href={`mailto:${company.email}?subject=Careers%20—%20DRSQ%20Oasis%20LLC`}
              className="btn btn--navy"
            >
              Send your résumé
            </a>
          </p>
        </div>
      </section>

      <CtaBand
        title="Have questions about working with DRSQ?"
        body="Tell us what you'd like to know about roles, flexibility or our culture."
        actions={[
          { label: "Contact Us", to: "/contact", variant: "btn--gold" },
          { label: "Who We Are", to: "/who-we-are", variant: "btn--ghost" },
        ]}
      />
    </>
  );
}
