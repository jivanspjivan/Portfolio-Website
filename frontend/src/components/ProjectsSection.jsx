import { projects } from "../data/portfolio";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection() {
  return (
    <section id="work" className="section container">
      <SectionHeading
        kicker="Selected work"
        title="Ideas engineered end to end."
        description="Three full-stack products spanning AI recommendations, business operations, and event-driven developer automation."
      />
      <div className="projects">
        {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
      </div>
    </section>
  );
}
