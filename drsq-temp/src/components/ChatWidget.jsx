import { useEffect, useRef, useState } from "react";
import { chat } from "../data/chat";

const STORAGE_KEY = "drsq-chat-messages";
const MAX_LENGTH = 2000;

const greeting = { role: "assistant", text: chat.greeting };

// sessionStorage can throw in private windows or with site data blocked;
// the chat still works without it, it just won't survive a reload.
function loadMessages() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length > 0) return saved;
  } catch {
    // fall through to the greeting
  }
  return [greeting];
}

function saveMessages(messages) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // not persisted; ignore
  }
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="9.5" r="1.1" fill="currentColor" />
      <circle cx="12" cy="9.5" r="1.1" fill="currentColor" />
      <circle cx="15.5" cy="9.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M4 12 20 4l-6 16-2.5-6.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadMessages);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => {
    saveMessages(messages);
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  const send = async (text) => {
    const message = text.trim();
    if (!message || busy) return;

    setMessages((current) => [...current, { role: "user", text: message }]);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch(chat.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ message }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.reply) throw new Error(data.error || "Chat request failed");

      setMessages((current) => [...current, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: chat.errorMessage, error: true },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  };

  const restart = async () => {
    setMessages([greeting]);
    try {
      await fetch(chat.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ reset: true }),
      });
    } catch {
      // the server transcript expires with the session anyway
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send(input);
    }
  };

  const showSuggestions = messages.length === 1 && !busy;

  return (
    <div className="chat-widget">
      {open && (
        <section
          className="chat-window"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-title"
          onKeyDown={(event) => event.key === "Escape" && close()}
        >
          <header className="chat-window__header">
            <div>
              <h2 id="chat-title" className="chat-window__title">
                {chat.title}
              </h2>
              <p className="chat-window__subtitle">{chat.subtitle}</p>
            </div>
            <div className="chat-window__actions">
              {messages.length > 1 && (
                <button type="button" className="chat-window__restart" onClick={restart}>
                  New chat
                </button>
              )}
              <button
                type="button"
                className="chat-window__close"
                onClick={close}
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>
          </header>

          <div className="chat-window__messages" ref={listRef} aria-live="polite">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`chat-msg chat-msg--${item.role}${item.error ? " chat-msg--error" : ""}`}
              >
                {item.text}
              </div>
            ))}
            {busy && (
              <div className="chat-msg chat-msg--assistant chat-msg--typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            )}
            {showSuggestions && (
              <div className="chat-suggestions">
                {chat.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="chat-suggestions__item"
                    onClick={() => send(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat-window__form"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="chat-input" className="visually-hidden">
              Message
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_LENGTH}
              placeholder={chat.placeholder}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="chat-window__send"
              disabled={busy || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </form>
          <p className="chat-window__note">{chat.privacyNote}</p>
        </section>
      )}

      {!open && (
        <button
          type="button"
          ref={launcherRef}
          className="chat-launcher"
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
        >
          <ChatBubbleIcon />
        </button>
      )}
    </div>
  );
}
