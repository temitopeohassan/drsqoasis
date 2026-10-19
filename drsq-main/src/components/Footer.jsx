import { Link } from "react-router-dom";
import logo from "../assets/drks-logo.jpeg";
import { additionalLinks, company, quickLinks, socialLinks } from "../data/site";
import { PinIcon, PhoneIcon, MailIcon, FacebookIcon, LinkedInIcon } from "./Icons";

const socialIcons = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
};

const isPending = (value) => typeof value === "string" && value.startsWith("[");

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>About us</h4>
            <Link to="/" className="footer-logo" aria-label="DRKS Alignment LLC — home">
              <img
                src={logo}
                alt="DRKS Alignment LLC — Strategy. Alignment. Results."
                width="785"
                height="910"
              />
            </Link>
            <p>
              DRKS Alignment LLC exists to help organizations close the gap
              between strategy and execution. We bring structure to complexity,
              clarity to priorities and alignment to the people and processes
              responsible for delivering results.
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
                <span className={isPending(company.address) ? "pending" : undefined}>
                  {company.address}
                </span>
              </li>
              <li>
                <PhoneIcon className="footer-icon" />
                {isPending(company.phone) ? (
                  <span className="pending">{company.phone}</span>
                ) : (
                  <a href={`tel:${company.phone}`}>{company.phone}</a>
                )}
              </li>
              <li>
                <MailIcon className="footer-icon" />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
            </ul>

            <div className="footer-social">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                const pending = isPending(social.url);
                return (
                  <a
                    key={social.label}
                    href={pending ? "#" : social.url}
                    className={pending ? "footer-social__link is-pending" : "footer-social__link"}
                    aria-label={`DRKS Alignment LLC on ${social.label}`}
                    title={pending ? `${social.label}: ${social.url}` : social.label}
                    target={pending ? undefined : "_blank"}
                    rel={pending ? undefined : "noreferrer"}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>

            <p style={{ marginTop: 22 }}>
              <Link to="/contact" className="btn btn--gold">
                Start a conversation
              </Link>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.legalName}. {company.tagline}
          </span>
          <span>
            <Link to="/government">Government buyers</Link>
            {"  ·  "}
            <Link to="/partners">Partners</Link>
            {"  ·  "}
            <Link to="/careers">Careers</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
