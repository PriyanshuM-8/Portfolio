import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Bot, User } from "lucide-react";

const API = import.meta.env.VITE_API_URL;
const GOLD = "#c98826";

const WELCOME = " Hi! I'm Priyanshu's AI Assistant. Ask me anything about his skills, projects, or experience!";

export default function Gemini() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [message,  setMessage]  = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: WELCOME }
  ]);
  const [loading,  setLoading]  = useState(false);
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);

  // auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const handleSend = async () => {
    const text = message.trim();
    if (!text || loading) return;

    setMessages(prev => [...prev, { role: "user", text }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/gemini/chat`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: "ai",
        text: data.reply || data.error || "Sorry, something went wrong."
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "ai",
        text: "⚠️ Could not connect to server. Please try again."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        title="AI Assistant"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        style={{
          background:  `linear-gradient(135deg, ${GOLD}, #f0b429)`,
          boxShadow:   `0 8px 32px rgba(201,136,38,0.45)`,
        }}
      >
        {isOpen
          ? <X size={22} color="#080808" strokeWidth={2.5} />
          : <Sparkles size={22} color="#080808" strokeWidth={2.5} />
        }
      </button>

      {/* ── Chat Popup ── */}
      {isOpen && (
        <div
          className="fixed bottom-1 right-1 z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width:        "350px",
            height:       "475px",
            background:   "linear-gradient(160deg,#111,#0a0a0a)",
            border:       "1px solid rgba(201,136,38,0.2)",
            boxShadow:    "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,136,38,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{ background: "linear-gradient(135deg,rgba(201,136,38,0.15),rgba(201,136,38,0.05))", borderBottom: "1px solid rgba(201,136,38,0.15)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg,${GOLD},#f0b429)` }}>
                <Sparkles size={16} color="#080808" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white leading-tight">AI Assistant</h2>
                {/* <p className="text-[10px] font-medium" style={{ color: GOLD }}>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1 align-middle" style={{ boxShadow: "0 0 6px #4ade80" }} />
                  Powered by Gemini
                </p> */}
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.05)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(201,136,38,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
              <X size={16} color="#94a3b8" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5"
            style={{ scrollbarWidth: "thin", scrollbarColor: `${GOLD}40 transparent`, paddingTop:"5px"  }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div className="w-7 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: msg.role === "ai"
                      ? `linear-gradient(135deg,${GOLD},#f0b429)`
                      : "rgba(148,163,184,0.15)",
                    border: msg.role === "ai" ? "none" : "1px solid rgba(255,255,255,0.08)"
                  }}>
                  {msg.role === "ai"
                    ? <Bot size={13} color="#080808" strokeWidth={2.5} />
                    : <User size={13} color="#94a3b8" strokeWidth={2.5} />
                  }
                </div>

                {/* Bubble */}
                <div className="max-w-[78%] rounded-xl px-4 py-2.5 text-sm leading-relaxed"
                  style={msg.role === "ai"
                    ? { background: "rgba(255,255,255,0.05)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.07)", borderBottomLeftRadius: "6px" , padding:"5px" }
                    : { background: `linear-gradient(135deg,${GOLD},#f0b429)`, color: "#080808", fontWeight: 600, borderBottomRightRadius: "6px"  , padding:"5px" }
                  }>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `linear-gradient(135deg,${GOLD},#f0b429)` }}>
                  <Bot size={13} color="#080808" strokeWidth={2.5} />
                </div>
                <div className="rounded-2xl px-4 py-3 flex items-center gap-1"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderBottomLeftRadius: "6px" }}>
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: GOLD, animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 shrink-0"
            style={{ borderTop: "1px solid rgba(201,136,38,0.1)", background: "rgba(0,0,0,0.2)" }}>
            <div className="flex items-center gap-2 rounded-2xl px-4 py-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "2px solid rgba(201,136,38,0.15)", padding:"3px" }}>
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Ask anything..."
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-white outline-none  placeholder-slate-600 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim() || loading}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40"
                style={{ background: `linear-gradient(135deg,${GOLD},#f0b429)` }}
                onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.boxShadow = `0 4px 16px rgba(201,136,38,0.4)`; }}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <Send size={14} color="#080808" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* bounce keyframe */}
      <style>{`
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); opacity:0.4; }
          40%          { transform: translateY(-5px); opacity:1; }
        }
      `}</style>
    </>
  );
}
