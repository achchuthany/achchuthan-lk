import { useState } from "react";
import { motion } from "framer-motion";
import Badge from "../components/Badge";
import FilterTabs from "../components/FilterTabs";
import SectionHeading from "../components/SectionHeading";
import stack from "../data/stack.json";
import "./Stack.css";

const MotionSection = motion.section;

const STACK_COLUMNS = [
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "mobile", label: "Mobile" },
  { key: "infrastructure", label: "Infrastructure" },
];

const FILTERS = ["All", ...STACK_COLUMNS.map((column) => column.label)];

function Stack() {
  const [filter, setFilter] = useState("All");

  const visibleColumns =
    filter === "All"
      ? STACK_COLUMNS
      : STACK_COLUMNS.filter((column) => column.label === filter);

  return (
    <MotionSection
      id="stack"
      className="stack-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="stack-section__inner">
        <div className="stack-section__heading">
          <SectionHeading label="Skills" title="Technical stack" />

          <div className="stack-section__filter">
            <FilterTabs tabs={FILTERS} active={filter} onChange={setFilter} />
          </div>
        </div>

        <div className="stack-section__grid">
          {visibleColumns.map((column) => (
            <div key={column.key} className="stack-column">
              <p className="stack-column__label">{column.label}</p>

              <div className="stack-column__list">
                {stack[column.key].map((skill) => (
                  <div key={skill.name} className="stack-skill">
                    <div className="stack-skill__top">
                      <span className="stack-skill__meta">
                        <span className="stack-skill__name">{skill.name}</span>
                        <span className="stack-skill__years">
                          {skill.years} yrs
                        </span>
                      </span>
                      <Badge variant={skill.level}>
                        {skill.level === "expert" ? "Expert" : "Proficient"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

export default Stack;
