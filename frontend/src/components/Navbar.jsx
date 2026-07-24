import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#expertise" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const lastScrollY = useRef(0);
  const navbarRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function closeOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function closeWithEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [open]);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const distance = currentScrollY - lastScrollY.current;
      const sectionIds = ["top", "work", "experience", "expertise", "about", "contact"];
      let currentSection = "top";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && currentScrollY >= section.offsetTop - 160) currentSection = id;
      });

      setScrolled(currentScrollY > 20);
      setActiveSection(currentSection);
      if (open || currentScrollY < 70) {
        setHidden(false);
      } else if (distance > 6) {
        setHidden(true);
      } else if (distance < -6) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    }

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <header
      ref={navbarRef}
      className={`nav-wrap ${hidden ? "nav-hidden" : ""} ${scrolled ? "nav-scrolled" : ""}`}
    >
      <nav className="nav container">
        <Logo />
        <button
          className="menu-button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.label}
              className={activeSection === link.href.slice(1) ? "active" : ""}
              onClick={() => setOpen(false)}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <a className="nav-cta" href="/Jivan_Paratpure.pdf" download onClick={() => setOpen(false)}>
            Resume <Download size={15} />
          </a>
        </div>
      </nav>
    </header>
  );
}
