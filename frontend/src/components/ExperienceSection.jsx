import { experience } from "../data/portfolio";
import SectionHeading from "./SectionHeading";

function highlightMetrics(text) {
  return text.split(/(\b\d+ms\b|\b\d[\d,.]*\+?%?)/g).map((part, index) => {
    const isMetric = /^(\d+ms|\d[\d,.]*\+?%?)$/.test(part);
    return isMetric ? <mark key={`${part}-${index}`}>{part}</mark> : part;
  });
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section experience container">
      <SectionHeading
        kicker="Professional experience"
        title="Built and operated in production."
        description="Hands-on ownership across payments, APIs, event pipelines, databases, and incident response."
      />
      <div className="experience-list">
        {experience.map((job, index) => (
          <article
            className="experience-item"
            key={job.company}
            style={{ "--reveal-delay": `${index * 100}ms` }}
          >
            <span className="timeline-marker" aria-hidden="true">
              <img src={job.companyLogo} alt="" />
            </span>
            <div className="experience-meta">
              <span>{job.period}</span>
              <small>{job.location}</small>
            </div>
            <div>
              <h3>{job.company}</h3>
              <strong>{job.role}</strong>
              <div className="experience-tech">
                {job.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <ul>
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlightMetrics(highlight)}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
