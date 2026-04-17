import { useState } from "react";
import { motion } from "framer-motion";
import Badge from "../components/Badge";
import Card from "../components/Card";
import FilterTabs from "../components/FilterTabs";
import SectionHeading from "../components/SectionHeading";
import timeline from "../data/timeline.json";
import "./Timeline.css";

const MotionSection = motion.section;
const MotionArticle = motion.article;

const FILTERS = ["Show All", "Academic only", "Software only"];

function formatDateRange(entry) {
  return `${entry.from} – ${entry.current ? "Present" : entry.to}`;
}

function Timeline() {
  const [filter, setFilter] = useState("Show All");

  const filteredTimeline =
    filter === "Show All"
      ? timeline
      : timeline.filter(
          (item) =>
            item.track ===
            (filter === "Academic only" ? "academic" : "software"),
        );

  return (
    <MotionSection
      id="timeline"
      className="timeline-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="timeline-header">
        <SectionHeading
          label="Timeline"
          title="Experience across teaching and software roles."
        />

        <div className="timeline-filter-row">
          <FilterTabs tabs={FILTERS} active={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="timeline-track">
        {filteredTimeline.map((entry, index) => {
          const side = index % 2 === 0 ? "left" : "right";
          const xOffset = side === "left" ? -30 : 30;

          return (
            <div
              key={entry.id}
              className={`timeline-entry timeline-entry--${side}`}
            >
              <MotionArticle
                initial={{ opacity: 0, x: xOffset }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Card className="timeline-entry__card" hover={false}>
                  <div className="timeline-entry__top">
                    <h3 className="timeline-entry__role">{entry.role}</h3>
                    <Badge variant={entry.track}>
                      {entry.track === "academic" ? "Academic" : "Software"}
                    </Badge>
                  </div>

                  <p className="timeline-entry__org">{entry.org}</p>

                  <p className="timeline-entry__date">
                    <span>{formatDateRange(entry)}</span>
                    {entry.current && (
                      <span
                        className="timeline-entry__current-dot"
                        aria-hidden="true"
                      ></span>
                    )}
                  </p>

                  <p className="timeline-entry__description">
                    {entry.description}
                  </p>
                </Card>
              </MotionArticle>

              <span
                className={`timeline-entry__connector timeline-entry__connector--${entry.track}`}
                aria-hidden="true"
              ></span>
            </div>
          );
        })}
      </div>
    </MotionSection>
  );
}

export default Timeline;
