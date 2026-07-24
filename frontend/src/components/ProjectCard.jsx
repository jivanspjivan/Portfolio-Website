import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import VideoModal from "./VideoModal";

export default function ProjectCard({ project }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <article className="project-card">
      <div className={`project-visual ${project.tone} ${project.image ? "has-screenshot" : ""}`}>
        <span className="project-number">{project.index}</span>
        {project.image ? (
          <div className="project-screenshot">
            {project.videoId ? (
              <button
                className="project-video-trigger"
                onClick={() => setVideoOpen(true)}
                aria-label={`Watch ${project.title} demo`}
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`;
                  }}
                />
                <span><Play size={24} fill="currentColor" /></span>
                <strong>Watch demo</strong>
              </button>
            ) : (
              <img src={project.image} alt={project.imageAlt} loading="lazy" />
            )}
          </div>
        ) : (
          <div className="mock-window">
            <div className="mock-top"><i /><i /><i /></div>
            <div className="mock-content">
              <div className="mock-sidebar" />
              <div className="mock-main">
                <span />
                <b />
                <div className="mock-row"><i /><i /><i /></div>
              </div>
            </div>
          </div>
        )}
        <div className="metric-pill">
          <strong>{project.metric}</strong>
          <span>{project.metricLabel}</span>
        </div>
      </div>
      <div className="project-copy">
        <span className="eyebrow">{project.eyebrow}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <ul className="project-highlights">
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        {project.credentials && (
          <details className="demo-credentials">
            <summary>Demo credentials</summary>
            <div className="credential-list">
              {project.credentials.map((credential) => (
                <div key={credential.role}>
                  <strong>{credential.role}</strong>
                  <span>{credential.email}</span>
                  <span>{credential.password}</span>
                </div>
              ))}
            </div>
          </details>
        )}
        <div className="project-links">
          {project.videoId && (
            <button className="project-link-button" onClick={() => setVideoOpen(true)}>
              Watch demo <Play size={15} />
            </button>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live demo <ArrowUpRight size={17} />
            </a>
          )}
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      {videoOpen && (
        <VideoModal
          videoId={project.videoId}
          title={project.title}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </article>
  );
}
