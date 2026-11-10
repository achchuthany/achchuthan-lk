import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ExternalLink, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import "../components/SectionHeading.css";
import "./ProjectDetail.css";

const MotionArticle = motion.article;

function ProjectDetail({ project }) {
  return (
    <MotionArticle
      id={`project-${project.slug}`}
      className="project-detail"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link className="project-detail__back" to="/projects">
        <ArrowLeft size={16} aria-hidden="true" />
        All projects
      </Link>

      <header className="project-detail__header">
        <span className="section-heading__label">
          <span className="section-heading__icon" aria-hidden="true">
            <Rocket size={15} strokeWidth={2.25} />
          </span>
          Project
        </span>
        <h1 className="project-detail__title">{project.title}</h1>

        <div className="project-detail__meta">
          {project.category && (
            <Badge variant="default">
              {project.category === "web" ? "Web" : "Mobile"}
            </Badge>
          )}
          {project.duration && (
            <Badge variant="default">{project.duration}</Badge>
          )}
        </div>
      </header>

      <div className="project-detail__body">
        <section className="project-detail__block">
          <h2 className="project-detail__subtitle">Overview</h2>
          <p className="project-detail__text">{project.description}</p>
        </section>

        {project.highlights?.length > 0 && (
          <section className="project-detail__block">
            <h2 className="project-detail__subtitle">Key features</h2>
            <ul className="project-detail__highlights">
              {project.highlights.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="project-detail__block">
          <h2 className="project-detail__subtitle">Built with</h2>
          <div className="project-detail__stack">
            {project.stack.map((item) => (
              <Badge key={item} variant="default">
                {item}
              </Badge>
            ))}
          </div>
        </section>

        {(project.hosted || project.repo) && (
          <div className="project-detail__actions">
            {project.hosted && (
              <a
                className="btn btn--primary"
                href={project.hosted}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Visit live site
              </a>
            )}
            {project.repo && (
              <a
                className="btn btn--ghost"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                Source code
              </a>
            )}
          </div>
        )}
      </div>
    </MotionArticle>
  );
}

export default ProjectDetail;
