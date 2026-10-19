import { Link, useParams } from "react-router-dom";
import PageHead from "../components/PageHead";
import CtaBand from "../components/CtaBand";
import Arc from "../components/Arc";
import Seo from "../components/Seo";
import NotFound from "./NotFound";
import { services, getService } from "../data/services";

export function WhatWeDoIndex() {
  return (
    <>
      <Seo
        title="What We Do | DRSQ Oasis LLC"
        description="Strategic communications, digital technology, technical assistance, training, and research and evaluation for health-focused missions."
      />
      <PageHead
        crumb="What We Do"
        title="Five practice areas, one continuous thread."
        intro="Evidence-based information only changes outcomes once it reaches people, makes sense to them and can be acted on. Most engagements begin in one area and pull in another once the real need becomes clear."
      />
      <section className="section">
        <div className="shell grid-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/what-we-do/${service.slug}`}
              className="cap-card"
            >
              <h3>{service.name}</h3>
              <p style={{ color: "var(--navy)", fontWeight: 600 }}>
                {service.headline}
              </p>
              <p>{service.description}</p>
              <span className="cap-card__more">View service</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <NotFound />;

  const others = services.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${service.name} | DRSQ Oasis LLC`}
        description={service.description}
      />
      <PageHead
        crumb={
          <>
            <Link to="/what-we-do">What We Do</Link> / {service.name}
          </>
        }
        title={service.headline}
        intro={service.description}
      />

      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>{service.name}</h2>
            <p>{service.detail}</p>
            <h3 style={{ marginTop: 36 }}>How we work</h3>
            <ul className="service-list">
              {service.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <span className="label">Capabilities</span>
            <ul className="service-list">
              {service.services.map((item) => (
                <li key={item}>{item}</li>
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
          <span className="label">Related practice areas</span>
          <div className="grid-3" style={{ marginTop: 28 }}>
            {others.map((item) => (
              <Link
                key={item.slug}
                to={`/what-we-do/${item.slug}`}
                className="cap-card"
              >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="cap-card__more">View service</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
