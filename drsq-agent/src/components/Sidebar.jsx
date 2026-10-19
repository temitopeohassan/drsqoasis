import { useState } from "react";
import { ChatIcon, CloseIcon, PencilIcon, PlusIcon, TrashIcon } from "./Icons";

const DAY = 24 * 60 * 60 * 1000;

// Group conversations the way Claude and ChatGPT do: Today, Yesterday, …
function groupByDate(conversations) {
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const groups = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Previous 7 days", items: [] },
    { label: "Previous 30 days", items: [] },
    { label: "Older", items: [] },
  ];

  for (const conversation of conversations) {
    const age = startOfToday - conversation.updatedAt;
    if (age <= 0) groups[0].items.push(conversation);
    else if (age <= DAY) groups[1].items.push(conversation);
    else if (age <= 7 * DAY) groups[2].items.push(conversation);
    else if (age <= 30 * DAY) groups[3].items.push(conversation);
    else groups[4].items.push(conversation);
  }

  return groups.filter((group) => group.items.length > 0);
}

function HistoryItem({ conversation, active, onSelect, onRename, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(conversation.title);

  if (editing) {
    const finish = () => {
      onRename(conversation.id, draft);
      setEditing(false);
    };
    return (
      <li className="history__item is-editing">
        <input
          className="history__rename"
          value={draft}
          autoFocus
          aria-label="Chat title"
          onChange={(event) => setDraft(event.target.value)}
          onBlur={finish}
          onKeyDown={(event) => {
            if (event.key === "Enter") finish();
            if (event.key === "Escape") {
              setDraft(conversation.title);
              setEditing(false);
            }
          }}
        />
      </li>
    );
  }

  return (
    <li className={active ? "history__item is-active" : "history__item"}>
      <button
        type="button"
        className="history__link"
        onClick={() => onSelect(conversation.id)}
        aria-current={active ? "page" : undefined}
        title={conversation.title}
      >
        <ChatIcon />
        <span>{conversation.title}</span>
      </button>
      <div className="history__actions">
        <button
          type="button"
          className="history__action"
          aria-label={`Rename "${conversation.title}"`}
          onClick={() => {
            setDraft(conversation.title);
            setEditing(true);
          }}
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          className="history__action"
          aria-label={`Delete "${conversation.title}"`}
          onClick={() => onDelete(conversation.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

export default function Sidebar({
  open,
  conversations,
  activeId,
  onNewChat,
  onSelect,
  onRename,
  onDelete,
  onClose,
}) {
  const groups = groupByDate(conversations);

  return (
    <>
      <div className={open ? "sidebar-scrim is-visible" : "sidebar-scrim"} onClick={onClose} />
      <aside id="chat-sidebar" className={open ? "sidebar is-open" : "sidebar"} aria-label="Chat history">
        <div className="sidebar__top">
          <button type="button" className="btn btn--gold sidebar__new" onClick={onNewChat}>
            <PlusIcon />
            New chat
          </button>
          <button type="button" className="icon-btn sidebar__close" onClick={onClose} aria-label="Close chat history">
            <CloseIcon />
          </button>
        </div>

        <nav className="history">
          {groups.length === 0 && (
            <p className="history__empty">Your conversations will appear here.</p>
          )}
          {groups.map((group) => (
            <section key={group.label} className="history__group">
              <h2 className="history__label">{group.label}</h2>
              <ul className="history__list">
                {group.items.map((conversation) => (
                  <HistoryItem
                    key={conversation.id}
                    conversation={conversation}
                    active={conversation.id === activeId}
                    onSelect={onSelect}
                    onRename={onRename}
                    onDelete={onDelete}
                  />
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </aside>
    </>
  );
}
