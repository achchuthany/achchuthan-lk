import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profile from "../data/profile.json";
import "./Hero.css";

const MotionSection = motion.section;
const MotionDiv = motion.div;

function Hero() {
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
          <Link to="/academic" className="hero-cta hero-cta--primary">
            View academic work
          </Link>

          <Link to="/projects" className="hero-cta">
            See projects
          </Link>
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
