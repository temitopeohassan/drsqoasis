import { Link } from "react-router-dom";
import Address from "./Address";
import logo from "../assets/drsq-logo-reversed.png";
import { additionalLinks, company, quickLinks } from "../data/site";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>About us</h4>
            <Link to="/" className="footer-logo" aria-label={`${company.legalName} — home`}>
              <img src={logo} alt="" width="2000" height="2000" />
              <span className="footer-logo__name">{company.legalName}</span>
            </Link>
            <p>
              DRSQ Oasis LLC exists to make it easier for people to find,
              understand and use information that leads to better health. We
              bring communications, digital technology, technical assistance,
              training and research together around that goal.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Additional links</h4>
            <ul>
              {additionalLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <PinIcon className="footer-icon" />
                <Address />
              </li>
              <li>
                <PhoneIcon className="footer-icon" />
                <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>
                  {company.phone}
                </a>
              </li>
              <li>
                <MailIcon className="footer-icon" />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
            </ul>

            <p style={{ marginTop: 22 }}>
              <Link to="/contact" className="btn btn--gold">
                Contact Us
              </Link>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.legalName}. {company.tagline}
          </span>
          <span>
            <Link to="/who-we-are">Who we are</Link>
            {"  ·  "}
            <Link to="/join-our-team">Careers</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
