import { motion } from "framer-motion";
import profile from "../data/profile.json";
import "./Hero.css";

const MotionSection = motion.section;
const MotionDiv = motion.div;

function Hero() {
  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MotionSection id="hero" className="hero-section">
      <MotionDiv
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="hero-name">{profile.name}</h1>

        <p className="hero-tagline">{profile.tagline}</p>

        <div className="hero-cta-row">
          <button
            type="button"
            className="hero-cta"
            onClick={() => scrollToSection("academic")}
          >
            View academic work
          </button>

          <button
            type="button"
            className="hero-cta"
            onClick={() => scrollToSection("projects")}
          >
            See projects
          </button>
        </div>

        <div className="hero-meta">
          <span>{profile.location}</span>
          {profile.availableForConsulting && (
            <span className="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true"></span>
              Open to consulting
            </span>
          )}
        </div>
      </MotionDiv>
    </MotionSection>
  );
}

export default Hero;
