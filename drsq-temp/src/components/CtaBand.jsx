import { Link } from "react-router-dom";
import Arc from "./Arc";

export default function CtaBand({
  title = "Ready to make information work harder for the people who need it?",
  body = "Tell us what you are trying to move forward. We will tell you plainly whether we are the right partner for it.",
  actions = [
    { label: "Contact Us", to: "/contact", variant: "btn--gold" },
    { label: "Explore What We Do", to: "/what-we-do", variant: "btn--ghost" },
  ],
}) {
  return (
    <section className="cta-band">
      <div className="shell split">
        <div>
          <Arc />
          <h2>{title}</h2>
        </div>
        <div>
          <p>{body}</p>
          <div className="cta-band__actions">
            {actions.map((action) => (
              <Link key={action.to + action.label} to={action.to} className={`btn ${action.variant}`}>
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
