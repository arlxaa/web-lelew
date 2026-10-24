"use client";

import { useEffect, useRef, useState } from "react";
import { answer, QUICK_QUESTIONS, type ChatAction } from "@/lib/chat";
import { type AppId, scrollToSection, useOS } from "@/components/OSProvider";
import Pet from "@/components/Pet";
import { Send } from "@/components/Icons";

type Msg = { from: "me" | "bot"; text: string; actions?: ChatAction[] };

const GREETING: Msg = {
  from: "bot",
  text: "Hi! I'm Clawd, Lele's desk pet. My answers are pre-written, but I know a lot about her. What do you want to know?",
};

// "Ask Lele" (rubens.design's Ask Rubens), offline edition.
export default function ChatApp() {
  const { chatSeed, launch } = useOS();
  const [log, setLog] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const seen = useRef(0);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text || typing) return;
    setLog((l) => [...l, { from: "me", text }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const a = answer(text);
      setLog((l) => [...l, { from: "bot", text: a.text, actions: a.actions }]);
      setTyping(false);
    }, 550 + Math.min(900, text.length * 12));
  };

  // Questions sent from the command palette arrive as a seed.
  useEffect(() => {
    if (!chatSeed || chatSeed.n === seen.current) return;
    seen.current = chatSeed.n;
    const t = window.setTimeout(() => ask(chatSeed.text), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatSeed]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [log, typing]);

  const act = (a: ChatAction) => {
    if (a.kind === "link") window.open(a.target, "_blank", "noopener");
    else if (a.kind === "section") scrollToSection(a.target);
    else launch(a.target as AppId);
  };

  return (
    <div className="app app--chat">
      <div className="chat__log" ref={logRef} aria-live="polite">
        {log.map((m, i) => (
          <div key={i} className={`chat__msg chat__msg--${m.from}`}>
            {m.from === "bot" && (
              <span className="chat__avatar">
                <Pet cell={2} />
              </span>
            )}
            <div>
              <p>{m.text}</p>
              {m.actions && (
                <div className="chat__actions">
                  {m.actions.map((a) => (
                    <button key={a.label} type="button" className="chip chip--accent" onClick={() => act(a)}>
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="chat__msg chat__msg--bot">
            <span className="chat__avatar">
              <Pet cell={2} mood="wave" />
            </span>
            <span className="chat__typing" aria-label="Clawd is typing">
              <i />
              <i />
              <i />
            </span>
          </div>
        )}
      </div>
      {log.length < 3 && (
        <div className="chat__chips">
          {QUICK_QUESTIONS.map((q) => (
            <button key={q} type="button" className="chip" onClick={() => ask(q)}>
              {q}
            </button>
          ))}
        </div>
      )}
      <form
        className="chat__input"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about Lele…" aria-label="Your question" maxLength={300} />
        <button type="submit" aria-label="Send" disabled={!input.trim() || typing}>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
