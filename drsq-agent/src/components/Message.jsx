import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import icon from "../assets/drsq-icon.png";

// Links in replies open in a new tab so the chat stays put. `node` is the
// markdown AST node react-markdown passes in; it must not reach the DOM.
const markdownComponents = {
  // eslint-disable-next-line no-unused-vars
  a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
};

export function Avatar() {
  return (
    <span className="msg__avatar" aria-hidden="true">
      <img src={icon} alt="" />
    </span>
  );
}

export default function Message({ role, text, error }) {
  if (role === "user") {
    return (
      <div className="msg msg--user">
        <div className="msg__bubble">{text}</div>
      </div>
    );
  }

  return (
    <div className={error ? "msg msg--assistant msg--error" : "msg msg--assistant"}>
      <Avatar />
      <div className="msg__body markdown">
        <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {text}
        </Markdown>
      </div>
    </div>
  );
}

export function Thinking() {
  return (
    <div className="msg msg--assistant" aria-live="polite">
      <Avatar />
      <div className="msg__body">
        <span className="thinking" aria-label="The assistant is writing a reply">
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  );
}
