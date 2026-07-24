import { BriefcaseBusiness } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="section about container">
      <div className="about-label"><span className="kicker">A little context</span></div>
      <div className="about-copy">
        <h2>I care about the space between <em>“it works”</em> and <em>“it survives production.”</em></h2>
        <div className="about-columns">
          <p>
            I’m a backend-focused engineer in Bangalore, experienced in building APIs,
            Kafka workflows, AI services, and reliable production systems.
          </p>
          <p>
            I enjoy startup teams where ownership, practical engineering, and fast learning
            turn ideas into useful products.
          </p>
        </div>
        <div className="working-on">
          <BriefcaseBusiness size={21} />
          <div>
            <strong>Open to opportunities</strong>
            <span>Backend and full-stack roles.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
