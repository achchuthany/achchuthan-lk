import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Badge from "../components/Badge";
import Card from "../components/Card";
import FilterTabs from "../components/FilterTabs";
import SectionHeading from "../components/SectionHeading";
import adminRoles from "../data/adminRoles.json";
import courses from "../data/courses.json";
import education from "../data/education.json";
import publications from "../data/publications.json";
import "./Academic.css";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionArticle = motion.article;

const FILTERS = ["All", "Journal", "Conference"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function formatRoleRange(from, to) {
  return `${from} – ${to}`;
}

function Academic() {
  const [filter, setFilter] = useState("All");

  const filteredPublications =
    filter === "All"
      ? publications
      : publications.filter(
          (publication) => publication.type === filter.toLowerCase(),
        );

  return (
    <MotionSection
      id="academic"
      className="academic-section"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="academic-header">
        <SectionHeading
          label="Academic"
          title="Teaching, education, and research output."
        />
      </div>

      <div className="academic-subsection">
        <h3 className="academic-subtitle">Teaching & Courses</h3>

        <MotionDiv
          className="academic-courses-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {courses.map((course) => (
            <MotionArticle key={course.id} variants={itemVariants}>
              <Card className="academic-course-card" hover={false}>
                <div className="academic-course-meta">
                  <h4 className="academic-course-title">{course.title}</h4>
                  <Badge variant="default">{course.level}</Badge>
                </div>
                <p className="academic-course-term">
                  {course.semester} · {course.year}
                </p>
                <p className="academic-course-description">
                  {course.description}
                </p>
              </Card>
            </MotionArticle>
          ))}
        </MotionDiv>

        <p className="academic-roles-heading">Administrative roles</p>
        <div className="academic-roles-table-wrap">
          <table className="academic-roles-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Department</th>
                <th>From–to</th>
              </tr>
            </thead>
            <tbody>
              {adminRoles.map((role) => (
                <tr key={role.id}>
                  <td>{role.role}</td>
                  <td>{role.department}</td>
                  <td>{formatRoleRange(role.from, role.to)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="academic-subsection">
        <h3 className="academic-subtitle">Education</h3>

        <MotionDiv
          className="academic-education-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {education.map((item) => (
            <MotionArticle
              key={item.id}
              className="academic-education-item"
              variants={itemVariants}
            >
              <h4 className="academic-education-degree">
                {item.degree} in {item.field}
              </h4>
              <p className="academic-education-meta">
                {item.institution} · {item.year}
              </p>
              {item.thesis && (
                <p className="academic-education-thesis">{item.thesis}</p>
              )}
            </MotionArticle>
          ))}
        </MotionDiv>
      </div>

      <div className="academic-subsection">
        <h3 className="academic-subtitle">Research & Publications</h3>

        <div className="academic-filter-row">
          <FilterTabs tabs={FILTERS} active={filter} onChange={setFilter} />
        </div>

        <MotionDiv
          className="academic-publications-list"
          key={filter}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredPublications.map((publication) => (
            <MotionArticle key={publication.id} variants={itemVariants}>
              <Card className="academic-publication-card" hover={false}>
                <h4 className="academic-publication-title">
                  {publication.title}
                </h4>
                <p className="academic-publication-meta">
                  {publication.journal} · {publication.year}
                </p>
                <p className="academic-publication-authors">
                  {publication.authors.join(", ")}
                </p>
                <a
                  className="academic-doi-link"
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  <span>{publication.doi}</span>
                </a>
              </Card>
            </MotionArticle>
          ))}
        </MotionDiv>
      </div>
    </MotionSection>
  );
}

export default Academic;
