import { ArrowUpRight, Mail } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="kicker">Let’s build something</span>
          <h2>Have a problem worth solving?</h2>
          <p>
            I’m available for immediate joining and open to backend or full-stack roles with
            teams solving meaningful engineering problems.
          </p>
          <a className="email-card" href="mailto:jivanparatpure2002@gmail.com">
            <span><Mail size={19} /></span>
            <div><small>Email me directly</small>jivanparatpure2002@gmail.com</div>
            <ArrowUpRight size={18} />
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
