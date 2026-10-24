"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

// message.eml: rubens.design's message.bat. No backend: "Send" opens the
// visitor's mail app with everything pre-filled.
export default function MailApp() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = name ? `${body}\n\n— ${name}` : body;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject || "Hi Lele!")}&body=${encodeURIComponent(text)}`;
    window.location.href = href;
    setSent(true);
  };

  if (sent)
    return (
      <div className="app app--mail mail-sent">
        <span className="mail-sent__check">✓</span>
        <p className="mail-sent__head">Draft opened in your mail app</p>
        <p className="mail-sent__sub">Nothing opened? Write to {profile.email}</p>
        <button type="button" className="btn-ghost" onClick={() => setSent(false)}>
          Write another
        </button>
      </div>
    );

  return (
    <form className="app app--mail" onSubmit={send}>
      <div className="mail__head">
        <div className="mail__row">
          <span className="mail__label">To:</span>
          <span>{profile.name}</span>
        </div>
        <label className="mail__row">
          <span className="mail__label">From:</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </label>
        <label className="mail__row">
          <span className="mail__label">Subject:</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="New message" />
        </label>
      </div>
      <textarea
        className="mail__body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your message here…"
        required
        aria-label="Message"
      />
      <footer className="statusbar mail__foot">
        <span>{body.length} characters</span>
        <button type="submit" className="btn-primary">
          Send
        </button>
      </footer>
    </form>
  );
}
