import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import CtaBand from "../components/CtaBand";
import Arc from "../components/Arc";
import Seo from "../components/Seo";
import { capabilities } from "../data/capabilities";
import { company, governmentData } from "../data/site";

const contractingRows = [
  { label: "UEI", value: governmentData.uei },
  { label: "CAGE code", value: governmentData.cage },
  { label: "Primary NAICS", value: governmentData.primaryNaics },
  { label: "Additional NAICS", value: governmentData.additionalNaics },
  { label: "Certifications", value: governmentData.certifications },
  { label: "Contract vehicles", value: governmentData.contractVehicles },
];

export default function Government() {
  return (
    <>
      <Seo
        title="For Government Buyers | DRKS Alignment LLC"
        description="DRKS Alignment LLC provides strategic, professional, administrative, program and operational support for government and institutional requirements."
      />
      <PageHead
        crumb="For government buyers"
        title="A responsive partner for government and institutional requirements."
        intro="DRKS Alignment LLC provides strategic, professional, administrative, program and operational support designed around the needs of organizations responsible for delivering important public and institutional missions."
      />

      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>What we deliver</h2>
            <p>
              Scopes are structured for clear deliverables, named points of
              contact and reporting that stands up to oversight. Where a
              requirement extends beyond our core areas, we say so and, where it
              helps, identify a teaming route.
            </p>
            <ul className="service-list">
              {capabilities.map((capability) => (
                <li key={capability.slug}>
                  <Link to={`/capabilities/${capability.slug}`}>
                    {capability.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <span className="label">Contracting information</span>
            <dl>
              {contractingRows.map((row) => (
                <div className="data-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd className={row.value.startsWith("[") ? "pending" : ""}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="field__hint" style={{ marginTop: 16 }}>
              Registrations, codes, certifications and vehicles are published
              only after verification against official records.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="shell grid-2">
          <div className="panel">
            <h3>Capability statement</h3>
            <p style={{ color: "var(--muted)" }}>
              A one-page summary of core competencies, differentiators, NAICS
              codes and contact details, prepared for contracting officers and
              small business specialists.
            </p>
            <p className="field__hint">
              Available once company registration details are verified.
            </p>
            <Link to="/contact" className="btn btn--navy">
              Request the capability statement
            </Link>
          </div>
          <div className="panel">
            <h3>Past performance</h3>
            <p style={{ color: "var(--muted)" }}>
              Past performance references, contract history and client names are
              provided on request and only where the client has consented to be
              named.
            </p>
            <p className="field__hint">
              We do not publish unverified performance claims or quantitative
              results.
            </p>
            <Link to="/contact" className="btn btn--outline">
              Request references
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Contracts and business development contact</h2>
          </div>
          <div>
            <dl>
              <div className="data-row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${company.email}`} style={{ color: "inherit" }}>
                    {company.email}
                  </a>
                </dd>
              </div>
              <div className="data-row">
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${company.phone}`} style={{ color: "inherit" }}>
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div className="data-row">
                <dt>Headquarters</dt>
                <dd>{company.headquarters}</dd>
              </div>
              <div className="data-row">
                <dt>Service area</dt>
                <dd>{company.serviceArea}</dd>
              </div>
            </dl>
            <p style={{ marginTop: 26 }}>
              <Link to="/contact" className="btn btn--gold">
                Discuss a requirement
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a requirement coming to market?"
        body="Send the scope, the timeline and the vehicle. We will respond with a straight answer on fit."
        actions={[
          { label: "Discuss a requirement", to: "/contact", variant: "btn--gold" },
          { label: "Partner with DRKS", to: "/partners", variant: "btn--ghost" },
        ]}
      />
    </>
  );
}
