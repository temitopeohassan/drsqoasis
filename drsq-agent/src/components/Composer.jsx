import { forwardRef, useLayoutEffect } from "react";
import { agent } from "../data/site";
import { SendIcon } from "./Icons";

const MAX_LENGTH = 4000;

const Composer = forwardRef(function Composer({ value, onChange, onSend, busy }, textareaRef) {

  // Grow with the text, up to the CSS max-height.
  useLayoutEffect(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [value, textareaRef]);

  const submit = (event) => {
    event.preventDefault();
    if (!busy && value.trim()) onSend(value);
  };

  return (
    <form className="composer" onSubmit={submit}>
      <div className="composer__box">
        <label htmlFor="composer-input" className="visually-hidden">
          Message
        </label>
        <textarea
          id="composer-input"
          ref={textareaRef}
          rows={1}
          value={value}
          maxLength={MAX_LENGTH}
          placeholder={agent.placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) submit(event);
          }}
        />
        <button
          type="submit"
          className="composer__send"
          disabled={busy || !value.trim()}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
      <p className="composer__note">{agent.disclaimer}</p>
    </form>
  );
});

export default Composer;
