import { useEffect } from "react";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import ExpertiseSection from "./components/ExpertiseSection";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";

export default function App() {
  useEffect(() => {
    const key = "portfolio-visit-recorded";

    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "pending");

      fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: window.location.pathname,
          referrer: document.referrer || null,
          screen: `${window.screen.width}x${window.screen.height}`,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Visit could not be recorded");
          sessionStorage.setItem(key, "true");
        })
        .catch(() => sessionStorage.removeItem(key));
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 851px)").matches) return undefined;

    const elements = document.querySelectorAll(
      ".section-heading, .project-card, .experience-item, .contact-copy",
    );
    elements.forEach((element) => element.classList.add("reveal-ready"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -45px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <ExpertiseSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
