import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GraduationCap } from "lucide-react";
import Badge from "../components/Badge";
import Card from "../components/Card";
import FilterTabs from "../components/FilterTabs";
import SectionHeading from "../components/SectionHeading";
import adminRoles from "../data/adminRoles.json";
import courses from "../data/courses.json";
import education from "../data/education.json";
import publications from "../data/publications.json";
import { formatDateRange } from "../utils/date";
import "./Academic.css";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionArticle = motion.article;

const PUBLICATION_FILTERS = ["All", "Journal", "Conference"];

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

function Academic() {
  const [courseFilter, setCourseFilter] = useState("All");
  const [publicationFilter, setPublicationFilter] = useState("All");

  // Course level filter tabs are derived from the data so new levels appear
  // automatically without touching this component.
  const courseFilters = useMemo(() => {
    const levels = Array.from(new Set(courses.map((course) => course.level)));
    return ["All", ...levels];
  }, []);

  const filteredCourses =
    courseFilter === "All"
      ? courses
      : courses.filter((course) => course.level === courseFilter);

  const filteredPublications =
    publicationFilter === "All"
      ? publications
      : publications.filter(
          (publication) => publication.type === publicationFilter.toLowerCase(),
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
          icon={GraduationCap}
          label="Academic"
          title="Teaching, education, and research output."
        />
      </div>

      <div className="academic-subsection">
        <div className="academic-subsection__head">
          <h3 className="academic-subtitle">Teaching &amp; Courses</h3>
          <FilterTabs
            tabs={courseFilters}
            active={courseFilter}
            onChange={setCourseFilter}
          />
        </div>

        {filteredCourses.length === 0 ? (
          <p className="academic-empty">No courses in this category.</p>
        ) : (
          <MotionDiv
            className="academic-courses-grid"
            key={courseFilter}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {filteredCourses.map((course) => (
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
        )}

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
                  <td>{formatDateRange(role.from, role.to)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="academic-roles-cards" aria-label="Administrative roles">
          {adminRoles.map((role) => (
            <Card
              key={`${role.id}-card`}
              className="academic-role-card"
              hover={false}
            >
              <div className="academic-role-card__header">
                <h4 className="academic-role-card__title">{role.role}</h4>
                <p className="academic-role-card__range">
                  {formatDateRange(role.from, role.to)}
                </p>
              </div>
              <p className="academic-role-card__department">{role.department}</p>
              <p className="academic-role-card__institution">{role.institution}</p>
            </Card>
          ))}
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
                {item.institution} · {formatDateRange(item.from, item.to)} · GPA: {item.GPA}
              </p>
              {item.thesis && (
                <p className="academic-education-thesis">{item.thesis}</p>
              )}
            </MotionArticle>
          ))}
        </MotionDiv>
      </div>

      <div className="academic-subsection">
        <div className="academic-subsection__head">
          <h3 className="academic-subtitle">Research &amp; Publications</h3>
          <FilterTabs
            tabs={PUBLICATION_FILTERS}
            active={publicationFilter}
            onChange={setPublicationFilter}
          />
        </div>

        {filteredPublications.length === 0 ? (
          <p className="academic-empty">
            No {publicationFilter.toLowerCase()} publications yet.
          </p>
        ) : (
          <MotionDiv
            className="academic-publications-list"
            key={publicationFilter}
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
                    href={
                      publication.doi.startsWith("http")
                        ? publication.doi
                        : `https://doi.org/${publication.doi}`
                    }
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
        )}
      </div>
    </MotionSection>
  );
}

export default Academic;
