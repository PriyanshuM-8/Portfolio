import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, GitBranch, ImageOff } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#c98826";

const fallbackProjects = [
  { title:"Blinkit Clone",          type:"Frontend", desc:"A fully responsive Blinkit-inspired grocery delivery app built using React with modern UI, product listing, cart system and smooth UX." },
  { title:"Fanta Animated Website", type:"Frontend", desc:"Creative animated landing page using HTML, CSS and JavaScript with smooth scroll animations and interactive transitions." },
  { title:"E-Commerce Web App",     type:"Frontend", desc:"Complete shopping website with product categories, add-to-cart, responsive design and optimized performance using React." },
  { title:"AI Chatbot — Gemini",    type:"Frontend", desc:"Smart AI chatbot integrated with Google Gemini API, capable of answering questions and providing real-time responses." },
  { title:"To-Do App (CRUD)",       type:"Backend",  desc:"Task management system built with Node.js, Express and MongoDB supporting create, update, delete and authentication." },
  { title:"Uber Clone Backend",     type:"Backend",  desc:"Scalable backend for a ride booking platform with user authentication, driver management and real-time APIs." },
];

const TYPE = {
  Frontend:  { bg:"rgba(201,136,38,0.11)", color:GOLD,       border:"rgba(201,136,38,0.3)",   dot:GOLD },
  Backend:   { bg:"rgba(59,130,246,0.1)",  color:"#60a5fa",  border:"rgba(59,130,246,0.3)",   dot:"#60a5fa" },
  Fullstack: { bg:"rgba(168,85,247,0.1)",  color:"#c084fc",  border:"rgba(168,85,247,0.3)",   dot:"#c084fc" },
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter,   setFilter]   = useState("All");
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(r => r.json())
      .then(d => setProjects(d?.length ? d : fallbackProjects))
      .catch(() => setProjects(fallbackProjects));
  }, []);

  useEffect(() => {
    if (!projects.length) return;
    gsap.fromTo(titleRef.current, { opacity:0, y:32 }, { opacity:1, y:0, duration:0.7, scrollTrigger:{ trigger:titleRef.current, start:"top 88%" } });
    gsap.fromTo(cardsRef.current.filter(Boolean), { opacity:0, y:42, scale:0.96 },
      { opacity:1, y:0, scale:1, duration:0.5, stagger:0.08, ease:"power3.out", scrollTrigger:{ trigger:cardsRef.current[0], start:"top 88%" } });
  }, [projects]);

  const filtered = filter === "All" ? projects : projects.filter(p => p.type === filter);

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden" style={{ background:"#090806" }}>
      <div className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background:`radial-gradient(circle,rgba(201,136,38,0.06),transparent 70%)`, filter:"blur(80px)" }} />
      <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background:`radial-gradient(circle,rgba(201,136,38,0.04),transparent 70%)`, filter:"blur(80px)" }} />

      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-10 md:mb-12">
          <span className="inline-block text-[10px] font-bold tracking-[0.45em] uppercase mb-3 px-3 py-1 rounded-full"
            style={{ color:GOLD, background:"rgba(201,136,38,0.07)", border:"1px solid rgba(201,136,38,0.2)" }}>
            What I've Built
          </span>
          <h2 className="font-black text-white mb-4" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.8rem,4vw,2.9rem)" }}>
            My <span style={{ color:GOLD }}>Projects</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-px w-10" style={{ background:`linear-gradient(90deg,transparent,${GOLD})` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background:GOLD }} />
            <div className="h-px w-10" style={{ background:`linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>

          {/* Filter pill */}
          <div className="inline-flex items-center gap-8 p-1 rounded-2xl"
            style={{ background:"#0c0c0c", border:"1px solid rgba(201,136,38,0.12)" }}>
            {["All","Frontend","Backend","Fullstack"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-280 cursor-pointer"
                style={filter === f
                  ? { background:GOLD, color:"#080808", boxShadow:"0 4px 16px rgba(201,136,38,0.3)" }
                  : { background:"transparent", color:"#64748b" }}
                onMouseEnter={e => { if(filter!==f) e.currentTarget.style.color="white"; }}
                onMouseLeave={e => { if(filter!==f) e.currentTarget.style.color="#64748b"; }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Outer border box */}
        <div className="rounded-3xl p-4 sm:p-5"
          style={{ background:"linear-gradient(160deg,rgba(201,136,38,0.025),rgba(0,0,0,0) 60%)", border:"1px solid rgba(201,136,38,0.15)", boxShadow:"0 0 60px rgba(201,136,38,0.03), inset 0 1px 0 rgba(201,136,38,0.07)" }}>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => {
              const cfg = TYPE[project.type] || TYPE.Frontend;
              return (
                <div key={project._id || i} ref={el => (cardsRef.current[i] = el)}
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 relative"
                  style={{ background:"linear-gradient(160deg,#101010,#0b0b0b)", border:"1px solid rgba(201,136,38,0.1)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(201,136,38,0.4)"; e.currentTarget.style.boxShadow="0 18px 52px rgba(0,0,0,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(201,136,38,0.1)"; e.currentTarget.style.boxShadow="none"; }}>

                  {/* shimmer top */}
                  <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background:`linear-gradient(90deg,transparent,${GOLD},transparent)` }} />

                  {/* Image */}
                  <div className="h-44 flex items-center justify-center overflow-hidden relative shrink-0"
                    style={{ background:"linear-gradient(135deg,#111,#0d0d0d)" }}>
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{ background:"rgba(201,136,38,0.05)", border:"1px solid rgba(201,136,38,0.1)" }}>
                          <ImageOff className="w-5 h-5" style={{ color:"rgba(201,136,38,0.3)" }} />
                        </div>
                        <span className="text-[11px] text-slate-700">No Preview</span>
                      </div>
                    )}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background:"linear-gradient(to top,#101010 0%,rgba(10,10,10,0.3) 55%,transparent 100%)" }} />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg"
                      style={{ background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, backdropFilter:"blur(10px)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background:cfg.dot }} />
                      {project.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 py-4 flex flex-col flex-1 gap-2">
                    <h3 className="font-bold text-white text-sm leading-snug transition-colors duration-250 group-hover:text-[#c98826]"
                      style={{ fontFamily:"'Space Grotesk',sans-serif" }}>
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-[0.76rem] leading-[1.75] flex-1 line-clamp-3">{project.desc}</p>

                    <div className="flex items-center gap-3 pt-2.5 mt-1" style={{ borderTop:"1px solid rgba(255,255,255,0.04)" }}>
                      {project.githubLink ? (
                        <a href={project.githubLink} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-white transition-colors font-medium">
                          <GitBranch className="w-3.5 h-3.5" /> Code
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[11px] text-slate-800 font-medium">
                          <GitBranch className="w-3.5 h-3.5" /> Code
                        </span>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] font-bold ml-auto hover:-translate-y-0.5 transition-transform"
                          style={{ color:GOLD }}>
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
