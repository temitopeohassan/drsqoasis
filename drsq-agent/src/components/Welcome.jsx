import logo from "../assets/drsq-logo.png";
import { agent, company } from "../data/site";

export default function Welcome({ onPick }) {
  return (
    <div className="welcome">
      <img className="welcome__logo" src={logo} alt="" width="2000" height="2000" />
      <p className="welcome__eyebrow">{company.tagline}</p>
      <h1 className="welcome__title">{agent.greeting}</h1>
      <p className="welcome__intro">{agent.intro}</p>
      <div className="welcome__grid">
        {agent.suggestions.map((item) => (
          <button key={item.title} type="button" className="suggestion" onClick={() => onPick(item.prompt)}>
            <span className="suggestion__title">{item.title}</span>
            <span className="suggestion__prompt">{item.prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
