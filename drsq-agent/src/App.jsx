import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Message, { Thinking } from "./components/Message";
import Composer from "./components/Composer";
import Welcome from "./components/Welcome";
import useConversations from "./hooks/useConversations";
import { agent } from "./data/site";

const WIDE_SCREEN = "(min-width: 900px)";

async function postChat(body) {
  const response = await fetch(agent.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok && !data.reply) throw new Error(data.error || "Request failed");
  return data;
}

export default function App() {
  const { conversations, create, append, rename, remove } = useConversations();
  const [activeId, setActiveId] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(() => window.matchMedia(WIDE_SCREEN).matches);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const active = conversations.find((item) => item.id === activeId) ?? null;
  const messages = active?.messages ?? [];
  const busy = pendingId !== null;

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages.length, pendingId, activeId]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeId]);

  // On small screens the sidebar is an overlay; close it after picking a chat.
  const closeSidebarOnMobile = () => {
    if (!window.matchMedia(WIDE_SCREEN).matches) setSidebarOpen(false);
  };

  const newChat = () => {
    setActiveId(null);
    setInput("");
    closeSidebarOnMobile();
  };

  const select = (id) => {
    setActiveId(id);
    closeSidebarOnMobile();
  };

  const deleteChat = (id) => {
    remove(id);
    if (id === activeId) setActiveId(null);
    // Server-side history is removed too; failure only leaves an orphaned file.
    postChat({ action: "delete", conversationId: id }).catch(() => {});
  };

  const send = async (text) => {
    const message = text.trim();
    if (!message || busy) return;

    const id = activeId ?? create(message);
    setActiveId(id);
    append(id, { role: "user", text: message });
    setInput("");
    setPendingId(id);

    try {
      const data = await postChat({ conversationId: id, message });
      append(id, { role: "assistant", text: data.reply });
    } catch {
      append(id, { role: "assistant", text: agent.errorMessage, error: true });
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className={sidebarOpen ? "app has-sidebar" : "app"}>
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((open) => !open)} />

      <div className="app__body">
        <Sidebar
          open={sidebarOpen}
          conversations={conversations}
          activeId={activeId}
          onNewChat={newChat}
          onSelect={select}
          onRename={rename}
          onDelete={deleteChat}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="chat" id="main">
          <div className="chat__scroll" ref={scrollRef}>
            <div className="chat__column">
              {messages.length === 0 && pendingId !== activeId ? (
                <Welcome onPick={send} />
              ) : (
                <>
                  {active && <h1 className="chat__title">{active.title}</h1>}
                  {messages.map((item, index) => (
                    <Message key={index} {...item} />
                  ))}
                  {pendingId === activeId && <Thinking />}
                </>
              )}
            </div>
          </div>

          <div className="chat__composer">
            <Composer ref={inputRef} value={input} onChange={setInput} onSend={send} busy={busy} />
          </div>
        </main>
      </div>
    </div>
  );
}
