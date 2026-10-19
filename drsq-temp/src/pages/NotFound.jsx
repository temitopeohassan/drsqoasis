import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | DRSQ Oasis LLC" />
      <PageHead
        crumb="Page not found"
        title="That page is not here."
        intro="The link may be out of date, or the page may have moved. The main sections are below."
      />
      <section className="section">
        <div className="shell grid-3">
          <Link to="/what-we-do" className="cap-card">
            <h3>What We Do</h3>
            <p>Five practice areas, from strategic communications to research.</p>
            <span className="cap-card__more">View what we do</span>
          </Link>
          <Link to="/who-we-are" className="cap-card">
            <h3>Who We Are</h3>
            <p>Mission, leadership, clients and qualifications.</p>
            <span className="cap-card__more">View page</span>
          </Link>
          <Link to="/contact" className="cap-card">
            <h3>Contact</h3>
            <p>Tell us what you are trying to move forward.</p>
            <span className="cap-card__more">Contact us</span>
          </Link>
        </div>
      </section>
    </>
  );
}
