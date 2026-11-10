import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import Card from "../components/Card";
import FilterTabs from "../components/FilterTabs";
import SectionHeading from "../components/SectionHeading";
import projects from "../data/projects.json";
import "./Projects.css";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionDivItem = motion.div;

const CATEGORY_LABELS = { web: "Web", mobile: "Mobile" };

// Only offer a filter for categories that actually have projects, so a tab
// never leads to an empty list. With a single category, no filter is shown.
const CATEGORIES = [...new Set(projects.map((project) => project.category))];
const FILTERS = [
  "All",
  ...CATEGORIES.map((category) => CATEGORY_LABELS[category] ?? category),
];

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
    .filter((word) => /^[A-Za-z0-9]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter(
          (project) =>
            (CATEGORY_LABELS[project.category] ?? project.category) === filter,
        );

  return (
    <MotionSection
      id="projects"
      className="projects-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="projects-header">
        <SectionHeading
          icon={Rocket}
          label="Projects"
          title="Systems and products built for education and operations."
        />

        {CATEGORIES.length > 1 && (
          <div className="projects-filter-row">
            <FilterTabs tabs={FILTERS} active={filter} onChange={setFilter} />
          </div>
        )}
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
          viewport={{ once: true, amount: "some" }}
        >
          {filteredProjects.map((project) => (
            <MotionDivItem key={project.id} variants={itemVariants}>
              <Card className="projects-card">
                <div className="projects-card__thumbnail" aria-hidden="true">
                  <span>{getInitials(project.title)}</span>
                </div>

                <div className="projects-card__body">
                  <div className="projects-card__meta">
                    <h3 className="projects-card__title">
                      <Link to={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
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
                    <Link
                      className="projects-card__link"
                      to={`/projects/${project.slug}`}
                    >
                      <ArrowRight size={16} aria-hidden="true" />
                      <span>View details</span>
                    </Link>

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
