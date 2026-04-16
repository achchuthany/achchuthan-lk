import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Badge from "../components/Badge";
import Card from "../components/Card";
import FilterTabs from "../components/FilterTabs";
import SectionHeading from "../components/SectionHeading";
import projects from "../data/projects.json";
import "./Projects.css";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionDivItem = motion.div;

const FILTERS = ["All", "Web", "Mobile"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

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

function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter.toLowerCase());

  return (
    <MotionSection
      id="projects"
      className="projects-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="projects-header">
        <SectionHeading title="Projects" />

        <div className="projects-filter-row">
          <FilterTabs tabs={FILTERS} active={filter} onChange={setFilter} />
        </div>
      </div>

      <MotionDiv
        className="projects-grid"
        key={filter}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {filteredProjects.map((project) => (
          <MotionDivItem key={project.id} variants={itemVariants}>
            <Card className="projects-card">
              <div className="projects-card__thumbnail" aria-hidden="true">
                <span>Thumbnail</span>
              </div>

              <div className="projects-card__body">
                <h3 className="projects-card__title">{project.title}</h3>
                <p className="projects-card__description">
                  {project.description}
                </p>

                <div className="projects-card__stack">
                  {project.stack.map((item) => (
                    <Badge key={`${project.id}-${item}`} variant="default">
                      {item}
                    </Badge>
                  ))}
                </div>

                <div className="projects-card__footer">
                  <a
                    className="projects-card__link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon />
                    <span>GitHub</span>
                  </a>

                  <a
                    className="projects-card__link"
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </Card>
          </MotionDivItem>
        ))}
      </MotionDiv>
    </MotionSection>
  );
}

export default Projects;
