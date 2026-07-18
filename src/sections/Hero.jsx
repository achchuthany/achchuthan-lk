import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import profile from "../data/profile.json";
import "./Hero.css";

const MotionSection = motion.section;
const MotionDiv = motion.div;

function Hero() {
  return (
    <MotionSection id="hero" className="hero-section">
      <div className="hero-glow" aria-hidden="true"></div>

      <MotionDiv
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {profile.availableForConsulting && (
          <span className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true"></span>
            Open to consulting
          </span>
        )}

        <h1 className="hero-name">{profile.name}</h1>

        <p className="hero-tagline">{profile.tagline}</p>

        <div className="hero-cta-row">
          <Link to="/academic" className="btn btn--primary">
            <GraduationCap size={18} aria-hidden="true" />
            View academic work
          </Link>

          <Link to="/projects" className="btn btn--ghost">
            See projects
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="hero-meta">
          <MapPin size={15} aria-hidden="true" />
          <span>{profile.location}</span>
        </div>
      </MotionDiv>
    </MotionSection>
  );
}

export default Hero;
