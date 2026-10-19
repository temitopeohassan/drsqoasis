import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | DRKS Alignment LLC" />
      <PageHead
        crumb="Page not found"
        title="That page is not here."
        intro="The link may be out of date, or the page may have moved. The main sections are below."
      />
      <section className="section">
        <div className="shell grid-3">
          <Link to="/capabilities" className="cap-card">
            <h3>Capabilities</h3>
            <p>Six practice areas, from strategic consulting to training.</p>
            <span className="cap-card__more">View capabilities</span>
          </Link>
          <Link to="/government" className="cap-card">
            <h3>For government buyers</h3>
            <p>Contracting information, capability statement and contacts.</p>
            <span className="cap-card__more">View page</span>
          </Link>
          <Link to="/contact" className="cap-card">
            <h3>Contact</h3>
            <p>Tell us what you are trying to move forward.</p>
            <span className="cap-card__more">Start a conversation</span>
          </Link>
        </div>
      </section>
    </>
  );
}
