import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const NAV_ITEMS = ["home", "about", "projects", "services", "contact"];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(logoRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
    gsap.fromTo(linksRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.4 });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      document.querySelectorAll("section").forEach((sec) => {
        const top = window.scrollY, offset = sec.offsetTop - 120, height = sec.offsetHeight;
        if (top >= offset && top < offset + height) setActive(sec.getAttribute("id"));
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed z-50 transition-all duration-500
        w-full top-0 h-14
        ${scrolled
          ? "bg-[#080808]/95 backdrop-blur-xl border-b border-[#c98826]/10 shadow-lg shadow-black/60"
          : "bg-transparent"
        }
        md:left-1/2 md:-translate-x-1/2 md:w-[calc(100%-3rem)] md:max-w-5xl
        ${scrolled
          ? "md:top-3 md:h-12 md:rounded-2xl md:border md:border-[#c98826]/15 md:shadow-xl md:shadow-black/70"
          : "md:top-5 md:h-13 md:rounded-2xl md:bg-[#0c0d0d]/40 md:backdrop-blur-md md:border md:border-white/6"
        }`}
    >
      <div className="w-full h-full px-5 sm:px-6 lg:px-8 flex items-center justify-between">

        <span ref={logoRef} className="text-lg font-black tracking-tight cursor-default select-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span style={{ color: "#c98826" }}>P</span>riyanshu<span style={{ color: "#c98826" }}>.</span>
        </span>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item, i) => (
            <a key={item} ref={(el) => (linksRef.current[i] = el)} href={`#${item}`}
              className={`relative text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${
                active === item ? "" : "text-slate-500 hover:text-white"
              }`}
              style={active === item ? { color: "#c98826" } : {}}>
              {item}
              <span className="absolute -bottom-1 left-0 h-px transition-all duration-300 rounded-full"
                style={{ width: active === item ? "100%" : "0", background: "#c98826" }} />
            </a>
          ))}
          <a href="#contact"
            className="ml-1 px-4 py-2 text-[11px] font-bold tracking-widest uppercase rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(201,136,38,0.5)", color: "#c98826" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c98826"; e.currentTarget.style.color = "#080808"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,136,38,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c98826"; e.currentTarget.style.boxShadow = "none"; }}>
            Hire Me
          </a>
        </nav>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg" aria-label="Menu"
          style={{ border: "1px solid rgba(201,136,38,0.15)" }}>
          <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center ${
            menuOpen ? "rotate-45 translate-y-[7px]" : ""
          }`} style={{ background: "#c98826" }} />
          <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 ${
            menuOpen ? "opacity-0 scale-x-0" : ""
          }`} style={{ background: "#c98826" }} />
          <span className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center ${
            menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
          }`} style={{ background: "#c98826" }} />
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bottom-0 overflow-y-auto flex flex-col z-50 "
          style={{ background: "rgba(8,8,8,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(201,136,38,0.1)"}}>
          <div className="px-6 py-8 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-colors border-b"
                style={{
                  color: active === item ? "#c98826" : "#64748b",
                  borderColor: "rgba(201,136,38,0.06)"
                }}>
                {item}
                {active === item && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#c98826" }} />}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="mt-6 py-3.5 text-center text-sm font-bold uppercase tracking-widest rounded-2xl transition-all duration-300"
              style={{ background: "#c98826", color: "#080808" }}>
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
