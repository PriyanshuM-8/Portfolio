import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Globe, Plug, Palette, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GOLD   = "#c98826";
const ICONS  = [Code2, Server, Globe, Plug, Palette, Zap];
const COLORS = [GOLD, "#60a5fa", "#34d399", "#f472b6", "#a78bfa", "#fb923c"];

const fallbackServices = [
  { title:"Frontend Development",   desc:"Building responsive and interactive UIs using React, HTML5, CSS3, JavaScript, Bootstrap and Tailwind CSS." },
  { title:"Backend Development",    desc:"Developing secure and scalable backend systems using Node.js, Express.js and MongoDB with RESTful APIs." },
  { title:"Full Stack Development", desc:"End-to-end web application development using MERN Stack with clean architecture and optimized performance." },
  { title:"API Development",        desc:"Designing and integrating REST APIs, third-party services and payment gateways with robust data handling." },
  { title:"UI / UX Design",         desc:"Creating modern, clean and user-friendly interfaces focusing on usability, accessibility and performance." },
  { title:"Real-Time Applications", desc:"Developing real-time systems like chat apps, live tracking and notifications using Socket.io and WebSockets." },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/services`)
      .then(r => r.json())
      .then(d => setServices(d?.length ? d : fallbackServices))
      .catch(() => setServices(fallbackServices));
  }, []);

  useEffect(() => {
    if (!services.length) return;
    gsap.fromTo(titleRef.current, { opacity:0, y:32 }, { opacity:1, y:0, duration:0.7, scrollTrigger:{ trigger:titleRef.current, start:"top 88%" } });
    gsap.fromTo(cardsRef.current.filter(Boolean), { opacity:0, y:42, scale:0.94 },
      { opacity:1, y:0, scale:1, duration:0.48, stagger:0.08, ease:"power3.out", scrollTrigger:{ trigger:cardsRef.current[0], start:"top 88%" } });
  }, [services]);

  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden " style={{ background:"#070707" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 70% 45% at 50% 100%,rgba(201,136,38,0.04),transparent)" }} />

      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[0.45em] uppercase mb-3 px-3 py-1 rounded-full"
            style={{ color:GOLD, background:"rgba(201,136,38,0.07)", border:"1px solid rgba(201,136,38,0.2)" }}>
            What I Offer
          </span>
          <h2 className="font-black text-white mb-4" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.8rem,4vw,2.9rem)" }}>
            My <span style={{ color:GOLD }}>Services</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background:`linear-gradient(90deg,transparent,${GOLD})` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background:GOLD }} />
            <div className="h-px w-10" style={{ background:`linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>
          <p className="text-slate-500 mx-auto mt-3" style={{ fontSize:"clamp(0.8rem,1.7vw,0.88rem)", maxWidth:"420px", lineHeight:"1.85" }}>
            Professional web development services focused on building high-quality, scalable applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon  = ICONS[i % ICONS.length];
            const color = COLORS[i % COLORS.length];
            return (
              <div key={service._id || i} ref={el => (cardsRef.current[i] = el)}
                className="group relative rounded-3xl p-7 min-h-[220px] transition-all duration-320 hover:-translate-y-1.5 overflow-hidden cursor-default flex flex-col"
                style={{ background:"linear-gradient(155deg,#0f0f0f,#0a0a0a)", border:"1px solid rgba(201,136,38,0.08)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(201,136,38,0.3)"; e.currentTarget.style.boxShadow="0 20px 55px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(201,136,38,0.08)"; e.currentTarget.style.boxShadow="none"; }}>

                {/* Top color shimmer */}
                <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background:`linear-gradient(90deg,transparent,${color},transparent)` }} />

                {/* Hover bg glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                  style={{ background:`radial-gradient(circle at 25% 25%,${color}09,transparent 60%)` }} />

                {/* Number watermark */}
                <span className="absolute bottom-4 right-5 font-black select-none pointer-events-none"
                  style={{ color:"rgba(255,255,255,0.04)", fontSize:"3.8rem", fontFamily:"'Space Grotesk',sans-serif", lineHeight:1 }}>
                  {String(i + 1).padStart(2,"0")}
                </span>

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background:`${color}15`, border:`1px solid ${color}28` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="font-bold text-white mb-2.5 leading-snug" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(0.85rem,1.9vw,0.95rem)" }}>
                    {service.title}
                  </h3>
                  <p className="text-slate-500 leading-[1.82] flex-1" style={{ fontSize:"clamp(0.74rem,1.5vw,0.8rem)" }}>
                    {service.desc}
                  </p>
                  {/* bottom accent */}
                  <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                    style={{ background:`linear-gradient(90deg,${color}55,transparent)` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};

export default Services;
