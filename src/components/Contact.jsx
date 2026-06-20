import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Send, MapPin, GitBranch, Heart, Code2, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#c98826";
const YEAR = new Date().getFullYear();
const API  = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form,    setForm]    = useState({ name:"", email:"", message:"" });
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const titleRef = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity:0, y:32 }, { opacity:1, y:0, duration:0.7, scrollTrigger:{ trigger:titleRef.current, start:"top 88%" } });
    gsap.fromTo(leftRef.current,  { opacity:0, x:-38 }, { opacity:1, x:0, duration:0.85, ease:"power3.out", scrollTrigger:{ trigger:leftRef.current,  start:"top 83%" } });
    gsap.fromTo(rightRef.current, { opacity:0, x: 38 }, { opacity:1, x:0, duration:0.85, ease:"power3.out", scrollTrigger:{ trigger:rightRef.current, start:"top 83%" } });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ name:"", email:"", message:"" });
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden" style={{ background:"#090806" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 55% 38% at 50% 0%,rgba(201,136,38,0.055),transparent)" }} />

      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-10 md:mb-14">
          <span className="inline-block text-[10px] font-bold tracking-[0.45em] uppercase mb-3 px-3 py-1 rounded-full"
            style={{ color:GOLD, background:"rgba(201,136,38,0.07)", border:"1px solid rgba(201,136,38,0.2)" }}>
            Let's Talk
          </span>
          <h2 className="font-black text-white mb-4" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.8rem,4vw,2.9rem)" }}>
            Get In <span style={{ color:GOLD }}>Touch</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10" style={{ background:`linear-gradient(90deg,transparent,${GOLD})` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background:GOLD }} />
            <div className="h-px w-10" style={{ background:`linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-7 lg:gap-9">

          {/* Left */}
          <div ref={leftRef} className="w-full lg:w-[41%] lg:shrink-0">
            <div className="rounded-3xl p-7 md:p-8 h-full flex flex-col gap-6 transition-all duration-400"
              style={{ background:"linear-gradient(155deg,#0f0f0f,#0a0a0a)", border:"1px solid rgba(201,136,38,0.13)" }}>

              <div>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background:"rgba(201,136,38,0.1)", border:"1px solid rgba(201,136,38,0.2)" }}>
                  <span style={{ fontSize:"1.2rem" }}>💬</span>
                </div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1rem,2.4vw,1.15rem)" }}>
                  Let's work <span style={{ color:GOLD }}>together</span>
                </h3>
                <p className="text-slate-500 text-sm leading-[1.85]">
                  I'm always open to new projects, creative ideas or opportunities. Feel free to drop a message!
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { icon:Mail,   label:"Email",    value:"priyanshupm9@gmail.com", href:"mailto:priyanshupm9@gmail.com" },
                  { icon:Phone,  label:"Phone",    value:"+91 8808802188",         href:"tel:+918808802188" },
                  { icon:MapPin, label:"Location", value:"India",                   href:"#" },
                ].map(item => (
                  <a key={item.label} href={item.href}
                    className="flex items-center gap-3.5 group p-3 rounded-2xl transition-all duration-280"
                    onMouseEnter={e => e.currentTarget.style.background="rgba(201,136,38,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-280 group-hover:scale-110"
                      style={{ background:"rgba(201,136,38,0.08)", border:"1px solid rgba(201,136,38,0.18)" }}>
                      <item.icon className="w-4 h-4" style={{ color:GOLD }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-600 text-[10px] uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-slate-300 text-sm font-medium truncate group-hover:text-white transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-auto">
                <p className="text-slate-700 text-[10px] uppercase tracking-widest mb-3 font-semibold">Connect</p>
                <div className="flex gap-3">
                  {[
                    { label:"LinkedIn", href:"https://www.linkedin.com/in/priyanshum1" },
                    { label:"GitHub",   href:"https://github.com/PriyanshuM-8" },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                      className="flex-1 text-center py-3 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all duration-280 hover:-translate-y-0.5"
                      style={{ border:"1px solid rgba(201,136,38,0.2)", color:GOLD }}
                      onMouseEnter={e => { e.currentTarget.style.background="rgba(201,136,38,0.1)"; e.currentTarget.style.boxShadow="0 4px 18px rgba(201,136,38,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.boxShadow="none"; }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef} className="w-full lg:flex-1">
            <div className="rounded-3xl p-7 md:p-8"
              style={{ background:"linear-gradient(155deg,#0f0f0f,#0a0a0a)", border:"1px solid rgba(201,136,38,0.13)" }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-5">
                  <div className="w-16 h-16 rounded-3xl flex items-center justify-center"
                    style={{ background:"rgba(201,136,38,0.1)", border:"1px solid rgba(201,136,38,0.3)", boxShadow:"0 0 32px rgba(201,136,38,0.1)" }}>
                    <Send className="w-7 h-7" style={{ color:GOLD }} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily:"'Space Grotesk',sans-serif" }}>Message Sent! 🎉</h3>
                    <p className="text-slate-500 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                  </div>
                  <button onClick={() => setSent(false)}
                    className="text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200"
                    style={{ color:GOLD, border:"1px solid rgba(201,136,38,0.2)" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(201,136,38,0.08)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {[
                    { key:"name",  label:"Your Name",  type:"text",  placeholder:"Priyanshu Maddeshiya" },
                    { key:"email", label:"Your Email", type:"email", placeholder:"example@email.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color:"#475569" }}>{f.label}</label>
                      <input type={f.type} required value={form[f.key]} placeholder={f.placeholder}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-280"
                        style={{ background:"#0b0b0b", border:"1px solid rgba(201,136,38,0.12)", color:"white" }}
                        onFocus={e => { e.target.style.borderColor="rgba(201,136,38,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(201,136,38,0.06)"; }}
                        onBlur={e  => { e.target.style.borderColor="rgba(201,136,38,0.12)"; e.target.style.boxShadow="none"; }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color:"#475569" }}>Message</label>
                    <textarea required rows="5" value={form.message} placeholder="Tell me about your project..."
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-280"
                      style={{ background:"#0b0b0b", border:"1px solid rgba(201,136,38,0.12)", resize:"none", color:"white" }}
                      onFocus={e => { e.target.style.borderColor="rgba(201,136,38,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(201,136,38,0.06)"; }}
                      onBlur={e  => { e.target.style.borderColor="rgba(201,136,38,0.12)"; e.target.style.boxShadow="none"; }} />
                  </div>
                  <button type="submit" disabled={sending}
                    className="flex items-center justify-center gap-2 w-full py-3.5 font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
                    style={{ background:`linear-gradient(135deg,${GOLD},#f0b429)`, color:"#080808", boxShadow:"0 4px 22px rgba(201,136,38,0.28)" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow="0 10px 36px rgba(201,136,38,0.45)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow="0 4px 22px rgba(201,136,38,0.28)"}>
                    {sending
                      ? <span className="w-4 h-4 border-2 border-[#080808] border-t-transparent rounded-full animate-spin" />
                      : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

  {/* ───────── PREMIUM FOOTER ───────── */}
<footer
  className="relative z-10 mt-28 overflow-hidden"
  style={{
    borderTop: "1px solid rgba(201,136,38,0.10)",
  }}
>
  {/* Top Golden Accent */}
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px"
    style={{
      background: `linear-gradient(90deg,transparent,${GOLD},transparent)`,
    }}
  />

  {/* Soft Glow */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "radial-gradient(circle at center top, rgba(201,136,38,0.08), transparent 65%)",
    }}
  />

  <div className="relative w-full max-w-6xl mx-auto px-9 sm:px-10 lg:px-14 py-18">



    {/* Divider */}
    <div
      className="h-px w-full "
      style={{
        background:
          "linear-gradient(90deg,transparent,rgba(201,136,38,0.18),transparent)",
      }}
    />

    {/* Bottom */}
    <div className="flex flex-col md:flex-row items-center justify-between m-auto p-20 gap-4" style={{padding:"4%"}}>

      <p className="text-slate-500 text-xs tracking-wide">
        © {YEAR} 
        <span
          className="font-semibold ml-1"
          style={{ color: "rgba(201,136,38,0.85)" }}
        >
           Priyanshu Maddeshiya
        </span>
        . All rights reserved.
      </p>

      <div className="flex items-center gap-2 text-xs text-slate-600">
        <span>Built with</span>
        <span style={{ color: GOLD }}>React</span>
        <span>•</span>
        <span style={{ color: GOLD }}>GSAP </span>
      </div>

    </div>
  </div>
</footer>
    </section>
  );
};

export default Contact;
