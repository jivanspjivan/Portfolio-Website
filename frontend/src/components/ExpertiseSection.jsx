import { Check, Code2, Layers3, ServerCog } from "lucide-react";
import { capabilities } from "../data/portfolio";
import SectionHeading from "./SectionHeading";

const icons = {
  frontend: Code2,
  backend: ServerCog,
  product: Layers3,
};

export default function ExpertiseSection() {
  function updateSpotlight(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <section id="expertise" className="section expertise">
      <div className="container">
        <SectionHeading
          kicker="How I contribute"
          title="How I Build Products."
          description="I’m most useful where craft, speed, and pragmatism all matter."
        />
        <div className="capability-grid">
          {capabilities.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article className="capability" key={item.title} onMouseMove={updateSpotlight}>
                <div className="capability-top"><Icon size={25} /><span>{item.number}</span></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul>
                  {item.items.map((text) => <li key={text}><Check size={15} />{text}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
