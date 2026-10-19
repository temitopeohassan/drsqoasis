import { useState } from "react";
import PageHead from "../components/PageHead";
import Arc from "../components/Arc";
import Seo from "../components/Seo";
import { company } from "../data/site";

const initialValues = {
  name: "",
  email: "",
  organization: "",
  inquiryType: "Corporate or institutional",
  message: "",
};

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Enter your name so we know who to reply to.";
    if (!values.email.trim()) {
      next.email = "Enter an email address we can reply to.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "That email address is missing an @ or a domain.";
    }
    if (!values.message.trim()) {
      next.message = "Tell us what you are trying to move forward.";
    }
    return next;
  };

  const handleSubmit = () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSent(true);
    setValues(initialValues);
  };

  return (
    <>
      <Seo
        title="Contact | DRKS Alignment LLC"
        description="Contact DRKS Alignment LLC to discuss a requirement, a partnership or a strategic engagement."
      />
      <PageHead
        crumb="Contact"
        title="Start a conversation."
        intro="Tell us what you are trying to move forward and who needs to be aligned around it. We reply within two business days."
      />

      <section className="section">
        <div className="shell split">
          <div>
            <Arc />
            <h2>Send a message</h2>

            {sent && (
              <div className="form-status" style={{ marginBottom: 24 }} role="status">
                Message sent. We will reply to the address you provided within
                two business days.
              </div>
            )}

            <div className="form">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={update("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p className="field__error" id="name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={update("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p className="field__error" id="email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="organization">Organization</label>
                <input
                  id="organization"
                  type="text"
                  value={values.organization}
                  onChange={update("organization")}
                />
              </div>

              <div className="field">
                <label htmlFor="inquiryType">What is this about?</label>
                <select
                  id="inquiryType"
                  value={values.inquiryType}
                  onChange={update("inquiryType")}
                >
                  <option>Corporate or institutional</option>
                  <option>Government requirement</option>
                  <option>Teaming or subcontracting</option>
                  <option>Capability statement request</option>
                  <option>Careers</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={values.message}
                  onChange={update("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p className="field__error" id="message-error">
                    {errors.message}
                  </p>
                )}
                <p className="field__hint">
                  Scope, timeline and who is involved is enough to start.
                </p>
              </div>

              <div>
                <button type="button" className="btn btn--navy" onClick={handleSubmit}>
                  Send message
                </button>
              </div>
            </div>
          </div>

          <div className="panel">
            <span className="label">Direct contact</span>
            <dl>
              <div className="data-row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </dd>
              </div>
              <div className="data-row">
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${company.phone}`}>{company.phone}</a>
                </dd>
              </div>
              <div className="data-row">
                <dt>Headquarters</dt>
                <dd className="pending">{company.headquarters}</dd>
              </div>
              <div className="data-row">
                <dt>Service area</dt>
                <dd className="pending">{company.serviceArea}</dd>
              </div>
            </dl>
            <p className="field__hint" style={{ marginTop: 18 }}>
              This form currently validates and confirms in the browser. Connect
              it to your email service or CRM endpoint before launch.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
