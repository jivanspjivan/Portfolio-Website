import { ArrowUpRight, Download, Github, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <div className="hero-identity">
          <span className="name-glow" aria-hidden="true" />
          <span>Jivan Paratpure</span>
          <strong><i /> Available immediately</strong>
        </div>
        <h1>Building scalable backend systems with <em>AI, Kafka & PostgreSQL.</em></h1>
        <p className="hero-lead">
          Backend engineer building scalable APIs, AI-powered applications, and event-driven
          systems using Node.js, Kafka, PostgreSQL, and FastAPI.
        </p>
        <div className="trust-strip" aria-label="Professional highlights">
          <span><strong>1.5 years</strong> experience</span>
          <span><strong>Ex-Vymo</strong> product engineer</span>
          <span><strong>1200+</strong> DSA problems</span>
          <span><strong>Immediate</strong> joiner</span>
        </div>
        <div className="hero-actions">
          <a className="button primary" href="/Jivan_Paratpure.pdf" download>
            View resume <Download className="cta-icon" size={20} />
          </a>
          <a
            className="button ghost"
            href="https://github.com/jivanspjivan"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Github className="cta-icon" size={20} /><ArrowUpRight className="github-arrow" size={14} />
          </a>
        </div>
        <div className="hero-proof">
          <a href="https://www.linkedin.com/in/jivanparatpure/" target="_blank" rel="noreferrer">
            LinkedIn verified profile
          </a>
          <a href="https://github.com/jivanspjivan" target="_blank" rel="noreferrer">
            Active on GitHub
          </a>
          <a href="https://leetcode.com/u/jivanthegreat/" target="_blank" rel="noreferrer">
            LeetCode 1200+
          </a>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="code-card code-main">
          <div className="code-head"><i /><i /><i /><span>server.js</span></div>
          <code>
            <span className="purple">const</span> embedding = <span className="purple">await</span><br />
            &nbsp;&nbsp;openai.embeddings.<span className="blue">create</span>(&#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;model: <span className="green">'text-embedding-3-small'</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;input: productContext<br />
            &nbsp;&nbsp;&#125;);<br />
            <span className="purple">await</span> kafkaProducer.<span className="blue">send</span>(&#123;<br />
            &nbsp;&nbsp;topic: <span className="green">'ai-events'</span>, messages<br />
            &#125;);
          </code>
        </div>
        <div className="code-card code-small">
          <Sparkles size={19} />
          <span>Idea → shipped</span>
          <strong>Clean. Fast. Useful.</strong>
        </div>
        <div className="floating-chip"><i /> API online</div>
      </div>
    </section>
  );
}
