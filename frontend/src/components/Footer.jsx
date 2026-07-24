import { Github, Linkedin, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Logo />
        <p>Designed and built with intention.</p>
        <div className="footer-links">
          <a href="https://github.com/jivanspjivan" target="_blank" rel="noreferrer">
            <Github size={18} /><span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/jivanparatpure/" target="_blank" rel="noreferrer">
            <Linkedin size={18} /><span>LinkedIn</span>
          </a>
          <a href="mailto:jivanparatpure2002@gmail.com">
            <Mail size={18} /><span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
