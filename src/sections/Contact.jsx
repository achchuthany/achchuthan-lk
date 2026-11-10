import { motion } from "framer-motion";
import { Briefcase, CircleCheck, Handshake, Mail, MapPin } from "lucide-react";
import Avatar from "../components/Avatar";
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

const SOCIAL_LINKS = [
  { key: "github", label: "GitHub", icon: GitHubIcon },
  { key: "linkedin", label: "LinkedIn", icon: LinkedInIcon },
  { key: "researchgate", label: "ResearchGate", icon: ResearchGateIcon },
].filter((link) => profile[link.key]);

function Contact() {
  return (
    <MotionSection
      id="contact"
      className="contact-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="contact-grid">
        <div className="contact-copy">
          <div className="contact-heading">
            <SectionHeading icon={Mail} label="Contact" title="Get in touch" />
          </div>

          <div className="contact-identity">
            <Avatar size={88} />
            <div className="contact-identity__text">
              <p className="contact-identity__name">{profile.name}</p>
              <p className="contact-identity__role">
                {profile.role} from {profile.location}
              </p>
            </div>
          </div>

          <p className="contact-description">
            The quickest way to reach me is by email. I&apos;m open to{" "}
            {profile.openTo
              .map((item) => item.toLowerCase())
              .join(", ")
              .replace(/, ([^,]*)$/, ", and $1")}
            .
          </p>

          <div className="contact-actions">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              <Mail size={17} aria-hidden="true" />
              Email me
            </a>
          </div>

          {SOCIAL_LINKS.length > 0 && (
            <div className="contact-socials">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.key}
                    className="contact-social-link"
                    href={profile[link.key]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <aside className="contact-card" aria-label="Contact details">
          <dl className="contact-details">
            <div className="contact-detail">
              <dt>
                <MapPin size={16} aria-hidden="true" />
                Location
              </dt>
              <dd>{profile.location}</dd>
            </div>

            <div className="contact-detail">
              <dt>
                <Mail size={16} aria-hidden="true" />
                Email
              </dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>

            <div className="contact-detail">
              <dt>
                <Briefcase size={16} aria-hidden="true" />
                Role
              </dt>
              <dd>{profile.tagline}</dd>
            </div>

            {profile.availableForConsulting && (
              <div className="contact-detail">
                <dt>
                  <CircleCheck size={16} aria-hidden="true" />
                  Availability
                </dt>
                <dd>
                  <span className="contact-availability">
                    <span
                      className="contact-availability__dot"
                      aria-hidden="true"
                    ></span>
                    Open to consulting
                  </span>
                </dd>
              </div>
            )}

            {profile.openTo?.length > 0 && (
              <div className="contact-detail">
                <dt>
                  <Handshake size={16} aria-hidden="true" />
                  Open to
                </dt>
                <dd>
                  <ul className="contact-chips">
                    {profile.openTo.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </MotionSection>
  );
}

export default Contact;
