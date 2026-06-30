import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import profile from "../assets/Priyanshu.jpeg"; 


const GOLD = "#c98826";
const ROLES = ["MERN Stack Developer", "Full Stack Developer", "React Developer", "Node.js Developer", "Freelancer"];

const Home = () => {
  const headingRef = useRef(null);
  const roleRef = useRef(null);
  const paraRef = useRef(null);
  const btnsRef = useRef(null);
  const imgRef = useRef(null);
  const glowRef = useRef(null);
  const badgeRef = useRef(null);
  const socialRef = useRef(null);

  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const cur = ROLES[roleIdx];
    let t;
    if (!isDeleting && displayed.length < cur.length)
      t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 75);
    else if (!isDeleting && displayed.length === cur.length)
      t = setTimeout(() => setIsDeleting(true), 2000);
    else if (isDeleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    else { setIsDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIdx]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
      .fromTo(imgRef.current, { opacity: 0, scale: 0.82, x: 30 }, { opacity: 1, scale: 1, x: 0, duration: 1.0 }, "-=0.3")
      .fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.7")
      .fromTo(roleRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
      .fromTo(paraRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(btnsRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(socialRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

    gsap.to(glowRef.current, { scale: 1.25, opacity: 0.55, duration: 3.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
    gsap.to(imgRef.current, { y: -14, duration: 3.8, repeat: -1, yoyo: true, ease: "power1.inOut" });
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: "linear-gradient(150deg,#060606 0%,#0d0800 45%,#060606 100%)" }}>

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-8%] left-[-4%] w-[520px] h-[520px] rounded-full opacity-[0.07]"
          style={{ background: `radial-gradient(circle,${GOLD},transparent 70%)`, filter: "blur(90px)", animation: "orbFloat1 9s ease-in-out infinite" }} />
        <div className="absolute bottom-[-8%] right-[-4%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: `radial-gradient(circle,${GOLD},transparent 70%)`, filter: "blur(110px)", animation: "orbFloat2 11s ease-in-out infinite" }} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "72px 72px" }} />

      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-16 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20 relative z-10">

        {/* IMAGE */}
        <div className="w-full flex justify-center md:order-2 md:w-auto md:shrink-0">
          <div className="relative">
            <div ref={glowRef} className="absolute -inset-8 rounded-[2rem] pointer-events-none"
              style={{ background: `radial-gradient(circle,rgba(201,136,38,0.2),transparent 70%)`, filter: "blur(24px)" }} />
            <div className="absolute -inset-3 rounded-[2rem] border border-dashed pointer-events-none"
              style={{ borderColor: "rgba(201,136,38,0.18)", animation: "spinSlow 22s linear infinite" }} />

            <div ref={imgRef} className="relative z-10">
              <div className="overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03]"
                style={{
                  width: "clamp(200px,36vw,265px)", height: "clamp(200px,36vw,265px)",
                  borderRadius: "1.75rem", border: "2px solid rgba(201,136,38,0.5)",
                  boxShadow: "0 24px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,136,38,0.08)"
                }}>
                <img src={profile} alt="Priyanshu" className="w-full h-full object-cover" />
              </div>

              {/* Corner accents */}
              {["-top-3 -left-3 border-t-2 border-l-2 rounded-tl-2xl",
                "-top-3 -right-3 border-t-2 border-r-2 rounded-tr-2xl",
                "-bottom-3 -left-3 border-b-2 border-l-2 rounded-bl-2xl",
                "-bottom-3 -right-3 border-b-2 border-r-2 rounded-br-2xl"].map((cls, i) => (
                  <div key={i} className={`absolute w-6 h-6 ${cls}`} style={{ borderColor: GOLD }} />
                ))}

              {/* Badges */}
              <div className="absolute -top-5 -right-6 text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap"
                style={{ background: "#111", border: "1px solid rgba(201,136,38,0.35)", color: GOLD, boxShadow: "0 6px 24px rgba(0,0,0,0.5)" }}>
                ⚡ MERN Stack
              </div>
              <div className="absolute -bottom-5 -left-6 text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap"
                style={{ background: "#111", border: "1px solid rgba(201,136,38,0.35)", color: GOLD, boxShadow: "0 6px 24px rgba(0,0,0,0.5)" }}>
                🚀 Full Stack Dev
              </div>
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div className="flex-1 text-center md:text-left md:order-1 max-w-lg mx-auto md:mx-0">

          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.18em] uppercase mb-6"
            style={{ border: "1px solid rgba(201,136,38,0.28)", color: GOLD, background: "rgba(201,136,38,0.06)", backdropFilter: "blur(12px)" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e80", animation: "pulseGlow 2s infinite" }} />
            Available for Work
          </div>

          {/* Heading */}
          <h1 ref={headingRef} className="font-black leading-[1.07] mb-5"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,5.2vw,3.5rem)" }}>
            Hi, I'm
            <br />
            <span style={{
              background: "linear-gradient(135deg,#b87820 0%,#f0b429 35%,#ffd166 55%,#e8920d 80%,#c98826 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 2px 24px rgba(201,136,38,0.28))"
            }}>
              Priyanshu Maddheshiya
            </span>
          </h1>

          {/* Typewriter */}
          <div ref={roleRef} className="font-mono font-semibold mb-5 flex items-center gap-2 justify-center md:justify-start"
            style={{ fontSize: "clamp(0.82rem,1.9vw,1rem)", color: "#94a3b8" }}>
            <span style={{ color: GOLD }}>&lt;</span>
            <span className="text-white" style={{ minWidth: "200px", display: "inline-block" }}>
              {displayed}
              <span style={{ color: GOLD, animation: "blink 1s step-end infinite" }}>|</span>
            </span>
            <span style={{ color: GOLD }}>/&gt;</span>
          </div>

          <p ref={paraRef} className="text-slate-400 leading-[1.85] mb-8 mx-auto md:mx-0"
            style={{ fontSize: "clamp(0.82rem,1.7vw,0.93rem)", maxWidth: "420px" }}>
            Passionate Full Stack Developer crafting responsive, high-performance web apps using
            <span style={{ color: "rgba(201,136,38,0.9)" }}> MongoDB, Express, React & Node.js</span>.
            Turning ideas into elegant digital experiences.
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a href="#projects"
              className="px-7 py-3 font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1 text-[#080808] flex items-center gap-2 text-sm"
              style={{ background: `linear-gradient(135deg,#c98826,#f0b429)`, letterSpacing: "0.04em", boxShadow: "0 4px 22px rgba(201,136,38,0.3)" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 10px 38px rgba(201,136,38,0.5)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 22px rgba(201,136,38,0.3)"}>
              View Projects →
            </a>
            <a href="#contact"
              className="px-7 py-3 font-bold rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 text-sm"
              style={{ borderColor: "rgba(201,136,38,0.45)", color: GOLD, background: "transparent", letterSpacing: "0.04em" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,136,38,0.09)"; e.currentTarget.style.borderColor = "rgba(201,136,38,0.7)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(201,136,38,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,136,38,0.45)"; e.currentTarget.style.boxShadow = "none"; }}>
              Hire Me ✦
            </a>
          </div>

          {/* Social */}
          <div ref={socialRef} className="flex items-center gap-4 mt-8 justify-center md:justify-start">
            <span className="text-slate-700 text-[10px] tracking-[0.3em] uppercase font-semibold">Follow</span>
            <div className="flex-1 h-px max-w-[60px]" style={{ background: `linear-gradient(90deg,rgba(201,136,38,0.25),transparent)` }} />
            {[
              { label: "GitHub", href: "https://github.com/PriyanshuM-8" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/priyanshum1" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-lg transition-all duration-250"
                style={{ color: "#475569", border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = "rgba(201,136,38,0.35)"; e.currentTarget.style.background = "rgba(201,136,38,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "transparent"; }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
};

export default Home;
