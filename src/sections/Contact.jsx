import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import profile from "../data/profile.json";
import "./Contact.css";

const MotionSection = motion.section;

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.05A9.32 9.32 0 0 1 12 6.84c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.43.21 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.94 8.5H3.56V19h3.38V8.5Zm.22-3.25c0-1.03-.78-1.75-1.91-1.75-1.12 0-1.9.72-1.9 1.75 0 1 .75 1.75 1.85 1.75h.02c1.15 0 1.94-.75 1.94-1.75ZM20.44 13.05c0-3.22-1.72-4.72-4.02-4.72-1.85 0-2.67 1.03-3.13 1.75V8.5H9.91c.04 1.05 0 10.5 0 10.5h3.38v-5.87c0-.31.02-.62.11-.84.25-.62.81-1.25 1.76-1.25 1.24 0 1.74.94 1.74 2.31V19h3.38v-5.95Z"
      />
    </svg>
  );
}

function ResearchGateIcon() {
  return <span className="contact-rg-badge">RG</span>;
}

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <MotionSection
      id="contact"
      className="contact-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="contact-grid">
        <div className="contact-copy">
          <div className="contact-heading">
            <SectionHeading
              icon={Mail}
              label="Contact"
              title="Get in touch"
            />
          </div>
          <p className="contact-description">
            Open to teaching collaborations, freelance web projects, and
            research partnerships.
          </p>

          <a className="contact-email-row" href={`mailto:${profile.email}`}>
            <Mail size={16} aria-hidden="true" />
            <span>{profile.email}</span>
          </a>

          <div className="contact-socials">
            <a
              className="contact-social-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>

            <a
              className="contact-social-link"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>

            <a
              className="contact-social-link"
              href={profile.researchgate}
              target="_blank"
              rel="noreferrer"
            >
              <ResearchGateIcon />
              <span>ResearchGate</span>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-field">
            <span className="contact-label">Name</span>
            <input className="contact-input" type="text" name="name" required />
          </label>

          <label className="contact-field">
            <span className="contact-label">Email</span>
            <input
              className="contact-input"
              type="email"
              name="email"
              required
            />
          </label>

          <label className="contact-field">
            <span className="contact-label">Subject</span>
            <select
              className="contact-select"
              name="subject"
              defaultValue="Teaching inquiry"
            >
              <option>Teaching inquiry</option>
              <option>Project inquiry</option>
              <option>Research</option>
              <option>Other</option>
            </select>
          </label>

          <label className="contact-field">
            <span className="contact-label">Message</span>
            <textarea
              className="contact-textarea"
              name="message"
              rows="5"
              required
            ></textarea>
          </label>

          <button className="btn btn--primary btn--block" type="submit">
            <Send size={17} aria-hidden="true" />
            Send message
          </button>

          {isSubmitted && <p className="contact-confirmation">Message sent!</p>}
        </form>
      </div>
    </MotionSection>
  );
}

export default Contact;
