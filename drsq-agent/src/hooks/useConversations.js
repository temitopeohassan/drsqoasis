import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "drsq-agent-conversations";
const TITLE_LENGTH = 48;

// localStorage can throw (private windows, blocked site data); the app keeps
// working in memory, it just won't remember chats after a reload.
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function save(conversations) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch {
    // not persisted; ignore
  }
}

function newId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
}

export function titleFrom(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > TITLE_LENGTH ? `${clean.slice(0, TITLE_LENGTH).trimEnd()}…` : clean;
}

/**
 * Chat history shown in the sidebar. Each conversation is
 * { id, title, createdAt, updatedAt, messages: [{ role, text, error? }] },
 * newest first. The server keeps its own copy of the model history under the
 * same id, so only display text is stored here.
 */
export default function useConversations() {
  const [conversations, setConversations] = useState(load);

  useEffect(() => {
    save(conversations);
  }, [conversations]);

  const create = useCallback((firstMessage) => {
    const now = Date.now();
    const conversation = {
      id: newId(),
      title: titleFrom(firstMessage),
      createdAt: now,
      updatedAt: now,
      messages: [],
    };
    setConversations((current) => [conversation, ...current]);
    return conversation.id;
  }, []);

  const append = useCallback((id, message) => {
    setConversations((current) => {
      const target = current.find((item) => item.id === id);
      if (!target) return current;
      const updated = { ...target, updatedAt: Date.now(), messages: [...target.messages, message] };
      return [updated, ...current.filter((item) => item.id !== id)];
    });
  }, []);

  const rename = useCallback((id, title) => {
    const clean = title.trim();
    if (!clean) return;
    setConversations((current) =>
      current.map((item) => (item.id === id ? { ...item, title: clean } : item))
    );
  }, []);

  const remove = useCallback((id) => {
    setConversations((current) => current.filter((item) => item.id !== id));
  }, []);

  return { conversations, create, append, rename, remove };
}
