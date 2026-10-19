import { Link, useParams } from "react-router-dom";
import PageHead from "../components/PageHead";
import CtaBand from "../components/CtaBand";
import Arc from "../components/Arc";
import Seo from "../components/Seo";
import NotFound from "./NotFound";
import { capabilities, getCapability } from "../data/capabilities";

export function CapabilitiesIndex() {
  return (
    <>
      <Seo
        title="Capabilities | DRKS Alignment LLC"
        description="Professional and administrative support, healthcare and medical services, information technology solutions, professional development services, facilities and operations, and medical and surgical device supply."
      />
      <PageHead
        crumb="Capabilities"
        title="Capabilities built for delivery, not just advice."
        intro="Six practice areas that work together. Most engagements begin in one and pull in another once the real constraint becomes clear."
      />
      <section className="section">
        <div className="shell grid-2">
          {capabilities.map((capability) => (
            <Link
              key={capability.slug}
              to={`/capabilities/${capability.slug}`}
              className="cap-card"
            >
              <h3>{capability.name}</h3>
              <p style={{ color: "var(--navy)", fontWeight: 600 }}>
                {capability.headline}
              </p>
              <p>{capability.description}</p>
              <span className="cap-card__more">View capability</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function CapabilityDetail() {
  const { slug } = useParams();
  const capability = getCapability(slug);

  if (!capability) return <NotFound />;

  const others = capabilities.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${capability.name} | DRKS Alignment LLC`}
        description={capability.description}
      />
      <PageHead
        crumb={
          <>
            <Link to="/capabilities">Capabilities</Link> / {capability.name}
          </>
        }
        title={capability.headline}
        intro={capability.description}
      />

      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>{capability.name}</h2>
            <p>{capability.detail}</p>
            <h3 style={{ marginTop: 36 }}>How the work runs</h3>
            <ul className="service-list">
              {capability.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <span className="label">Services in this area</span>
            <ul className="service-list">
              {capability.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <p style={{ marginTop: 28 }}>
              <Link to="/contact" className="btn btn--navy">
                Discuss a requirement
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="shell">
          <span className="label">Related capabilities</span>
          <div className="grid-3" style={{ marginTop: 28 }}>
            {others.map((item) => (
              <Link
                key={item.slug}
                to={`/capabilities/${item.slug}`}
                className="cap-card"
              >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="cap-card__more">View capability</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
