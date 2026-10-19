import { Link } from "react-router-dom";

export default function PageHead({ crumb, title, intro }) {
  return (
    <section className="page-head">
      <div className="shell">
        {crumb && (
          <p className="crumb">
            <Link to="/">Home</Link> / {crumb}
          </p>
        )}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}
