import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
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

function getInitials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
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
        <SectionHeading
          label="Projects"
          title="Systems and products built for education and operations."
        />

        <div className="projects-filter-row">
          <FilterTabs tabs={FILTERS} active={filter} onChange={setFilter} />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="projects-empty">No {filter.toLowerCase()} projects yet.</p>
      ) : (
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
                  <span>{getInitials(project.title)}</span>
                </div>

                <div className="projects-card__body">
                  <div className="projects-card__meta">
                    <h3 className="projects-card__title">{project.title}</h3>
                    {project.duration && (
                      <Badge variant="default">{project.duration}</Badge>
                    )}
                  </div>

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
                    {project.hosted && (
                      <a
                        className="projects-card__link"
                        href={project.hosted}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                        <span>Live site</span>
                      </a>
                    )}

                    {project.blog && (
                      <a
                        className="projects-card__link"
                        href={project.blog}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FileText size={16} aria-hidden="true" />
                        <span>Case study</span>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </MotionDivItem>
          ))}
        </MotionDiv>
      )}
    </MotionSection>
  );
}

export default Projects;
