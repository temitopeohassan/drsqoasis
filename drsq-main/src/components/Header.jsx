import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/drks-logo.jpeg";
import { navigation } from "../data/site";

function NavItem({ item }) {
  const [subOpen, setSubOpen] = useState(false);

  if (!item.children) {
    return (
      <NavLink
        to={item.path}
        end={item.path === "/"}
        className={({ isActive }) =>
          isActive ? "nav__link is-active" : "nav__link"
        }
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div
      className={subOpen ? "nav__item nav__item--dropdown is-open" : "nav__item nav__item--dropdown"}
      onMouseEnter={() => setSubOpen(true)}
      onMouseLeave={() => setSubOpen(false)}
    >
      <div className="nav__link-row">
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            isActive ? "nav__link is-active" : "nav__link"
          }
        >
          {item.label}
        </NavLink>
        <button
          type="button"
          className="nav__caret"
          aria-expanded={subOpen}
          aria-label={`${subOpen ? "Close" : "Open"} ${item.label} submenu`}
          onClick={() => setSubOpen((value) => !value)}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
            <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
      <div className="nav__submenu">
        {item.children.map((child) => (
          <NavLink
            key={child.path}
            to={child.path}
            className={({ isActive }) =>
              isActive ? "nav__sublink is-active" : "nav__sublink"
            }
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link to="/" className="brand" aria-label="DRKS Alignment LLC — home">
          <img
            className="brand__logo"
            src={logo}
            alt="DRKS Alignment LLC — Strategy. Alignment. Results."
            width="785"
            height="910"
          />
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
          <span className="visually-hidden" style={{ position: "absolute", left: "-9999px" }}>
            {open ? "Close menu" : "Open menu"}
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={open ? "nav is-open" : "nav"}
          aria-label="Primary"
        >
          {navigation.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
          <Link to="/contact" className="btn btn--navy nav__cta">
            Start a conversation
          </Link>
        </nav>
      </div>
    </header>
  );
}
