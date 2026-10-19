import logo from "../assets/drsq-logo.png";
import { agent, company } from "../data/site";
import { ExternalIcon, MenuIcon } from "./Icons";

export default function Header({ onToggleSidebar, sidebarOpen }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button
          type="button"
          className="icon-btn sidebar-toggle"
          onClick={onToggleSidebar}
          aria-expanded={sidebarOpen}
          aria-controls="chat-sidebar"
          aria-label={sidebarOpen ? "Hide chat history" : "Show chat history"}
        >
          <MenuIcon />
        </button>

        <a className="brand" href={company.website} aria-label={`${company.legalName} — website`}>
          <img className="brand__logo" src={logo} alt="" width="2000" height="2000" />
          <span className="brand__name">{company.legalName}</span>
        </a>

        <span className="brand__badge">{agent.badge}</span>

        <a className="btn btn--navy site-header__cta" href={company.website}>
          Visit website
          <ExternalIcon />
        </a>
      </div>
    </header>
  );
}
