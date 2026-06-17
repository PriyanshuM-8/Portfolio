import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#c98826";
const API  = import.meta.env.VITE_API_URL;

const stats = [
  { label:"Experience", value:"1+ Year", icon:"🗓️" },
  { label:"Projects",   value:"10+",     icon:"🚀" },
  { label:"Stack",      value:"MERN",    icon:"⚡" },
  { label:"Status",     value:"Open",    icon:"🟢" },
];

const About = () => {
  const titleRef  = useRef(null);
  const leftRef   = useRef(null);
  const rightRef  = useRef(null);
  const skillsRef = useRef([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/skills`)
      .then(r => r.json())
      .then(data => setSkills(data))
      .catch(() => {});
    gsap.fromTo(titleRef.current, { opacity:0, y:32 }, { opacity:1, y:0, duration:0.7, scrollTrigger:{ trigger:titleRef.current, start:"top 88%" } });
    gsap.fromTo(leftRef.current,  { opacity:0, x:-38 }, { opacity:1, x:0, duration:0.85, ease:"power3.out", scrollTrigger:{ trigger:leftRef.current,  start:"top 83%" } });
    gsap.fromTo(rightRef.current, { opacity:0, x: 38 }, { opacity:1, x:0, duration:0.85, ease:"power3.out", scrollTrigger:{ trigger:rightRef.current, start:"top 83%" } });
    gsap.fromTo(skillsRef.current.filter(Boolean), { opacity:0, y:20, scale:0.82 },
      { opacity:1, y:0, scale:1, duration:0.32, stagger:0.045, ease:"back.out(1.5)", scrollTrigger:{ trigger:rightRef.current, start:"top 80%" } });
  }, []);

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden" style={{ background:"#070707" }}>
      <div className="absolute top-0 right-0 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background:`radial-gradient(circle,rgba(201,136,38,0.07),transparent 70%)`, filter:"blur(70px)" }} />
      <div className="absolute bottom-0 left-0 w-[260px] h-[260px] rounded-full pointer-events-none"
        style={{ background:`radial-gradient(circle,rgba(201,136,38,0.05),transparent 70%)`, filter:"blur(60px)" }} />

      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[0.45em] uppercase mb-3 px-3 py-1 rounded-full"
            style={{ color:GOLD, background:"rgba(201,136,38,0.07)", border:"1px solid rgba(201,136,38,0.2)" }}>
            Who I Am
          </span>
          <h2 className="font-black text-white mb-4" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.8rem,4vw,2.9rem)" }}>
            About <span style={{ color:GOLD }}>Me</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10" style={{ background:`linear-gradient(90deg,transparent,${GOLD})` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background:GOLD }} />
            <div className="h-px w-10" style={{ background:`linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12">

          {/* Left — Bio */}
          <div ref={leftRef}>
            <div className="rounded-3xl p-7 md:p-9 h-full transition-all duration-400"
              style={{ background:"linear-gradient(150deg,#0f0f0f 0%,#0a0a0a 100%)", border:"1px solid rgba(201,136,38,0.13)", boxShadow:"0 0 0 0 transparent" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow="0 0 40px rgba(201,136,38,0.05)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow="0 0 0 0 transparent"}>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background:"rgba(201,136,38,0.1)", border:"1px solid rgba(201,136,38,0.22)" }}>
                  <span style={{ fontSize:"1.1rem" }}>👨‍💻</span>
                </div>
                <h3 className="font-bold text-white" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(0.95rem,2.2vw,1.15rem)" }}>
                  Passionate <span style={{ color:GOLD }}>MERN Developer</span>
                </h3>
              </div>

              <p className="text-slate-400 text-sm leading-[1.9] mb-4">
                I am a dedicated MERN Full Stack Developer with strong knowledge of
                <span style={{ color:"rgba(201,136,38,0.85)" }}> JavaScript, MongoDB, Express.js, React.js & Node.js</span> —
                building complete web apps from responsive UIs to secure backend APIs.
              </p>
              <p className="text-slate-400 text-sm leading-[1.9] mb-8">
                I focus on clean, optimized code. Quick learner, positive attitude, always eager to grow as a professional developer.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {stats.map(s => (
                  <div key={s.label}
                    className="rounded-2xl p-4 cursor-default transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(201,136,38,0.1)" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor="rgba(201,136,38,0.3)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor="rgba(201,136,38,0.1)"}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm leading-none">{s.icon}</span>
                      <p className="text-slate-600 text-[10px] uppercase tracking-widest">{s.label}</p>
                    </div>
                    <p className="font-black text-base" style={{ color:GOLD, fontFamily:"'Space Grotesk',sans-serif" }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Skills */}
          <div ref={rightRef}>
            <div className="flex items-center gap-3 mb-5">
              <h3 className="font-bold text-white whitespace-nowrap" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(0.9rem,2vw,1.05rem)" }}>
                Technical <span style={{ color:GOLD }}>Skills</span>
              </h3>
              <div className="flex-1 h-px" style={{ background:"linear-gradient(90deg,rgba(201,136,38,0.22),transparent)" }} />
            </div>
            <div className="grid grid-cols-3 gap-3">
             {skills.map((skill, i) => (
  <div
    key={skill._id}
    ref={el => (skillsRef.current[i] = el)}
    className="group rounded-2xl p-4 flex items-center justify-center cursor-default transition-all duration-300 hover:-translate-y-1.5"
    style={{
      background: "linear-gradient(145deg,#0f0f0f,#0b0b0b)",
      border: "1px solid rgba(201,136,38,0.08)",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "rgba(201,136,38,0.4)";
      e.currentTarget.style.boxShadow = "0 8px 28px rgba(201,136,38,0.08)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(201,136,38,0.08)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <span
      className="font-semibold text-sm group-hover:text-white transition-colors"
      style={{ color: GOLD }}
    >
      {skill.name}
    </span>
  </div>
))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};

export default About;
