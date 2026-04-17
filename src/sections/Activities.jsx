import { useState } from "react";
import { motion } from "framer-motion";
import Badge from "../components/Badge";
import FilterTabs from "../components/FilterTabs";
import SectionHeading from "../components/SectionHeading";
import activities from "../data/activities.json";
import "./Activities.css";

const MotionSection = motion.section;
const MotionRow = motion.tr;
const MotionArticle = motion.article;

const ACTIVITY_CATEGORIES = [
  { label: "Show All", value: "all" },
  { label: "Conferences & Workshops", value: "conferences" },
  { label: "Creative Work", value: "creative" },
  { label: "Institutional Development", value: "institutional" },
];

const CATEGORY_TITLES = {
  conferences: "Attended Conferences & Workshops",
  creative: "Creative Work",
  institutional: "Institutional Development",
};

const CATEGORY_BADGES = {
  conferences: { label: "Conference", variant: "academic" },
  creative: { label: "Creative", variant: "creative" },
  institutional: { label: "Institutional", variant: "software" },
};

function Activities() {
  const [filter, setFilter] = useState("all");

  const activityStats = {
    total: activities.length,
    conferences: activities.filter((item) => item.category === "conferences")
      .length,
    creative: activities.filter((item) => item.category === "creative").length,
    institutional: activities.filter(
      (item) => item.category === "institutional",
    ).length,
  };

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((item) => item.category === filter);

  const groupedActivities = {};
  filteredActivities.forEach((item) => {
    if (!groupedActivities[item.category]) {
      groupedActivities[item.category] = [];
    }
    groupedActivities[item.category].push(item);
  });

  const getCategoryLabel = (category) => {
    return CATEGORY_TITLES[category] || category;
  };

  return (
    <MotionSection
      id="activities"
      className="activities-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="activities-header">
        <SectionHeading
          label="Activities"
          title="Conferences, creative output, and institutional work."
        />

        <div className="activities-stats" aria-label="Activity statistics">
          <div className="activities-stat">
            <span className="activities-stat__label">Total</span>
            <span className="activities-stat__value">{activityStats.total}</span>
          </div>
          <div className="activities-stat">
            <span className="activities-stat__label">Conferences</span>
            <span className="activities-stat__value">
              {activityStats.conferences}
            </span>
          </div>
          <div className="activities-stat">
            <span className="activities-stat__label">Creative</span>
            <span className="activities-stat__value">
              {activityStats.creative}
            </span>
          </div>
          <div className="activities-stat">
            <span className="activities-stat__label">Institutional</span>
            <span className="activities-stat__value">
              {activityStats.institutional}
            </span>
          </div>
        </div>

        <div className="activities-filter-row">
          <FilterTabs
            tabs={ACTIVITY_CATEGORIES.map((cat) => cat.label)}
            active={
              ACTIVITY_CATEGORIES.find((cat) => cat.value === filter)?.label ||
              "Show All"
            }
            onChange={(selected) => {
              const category = ACTIVITY_CATEGORIES.find(
                (cat) => cat.label === selected,
              );
              setFilter(category?.value || "all");
            }}
          />
        </div>
      </div>

      <div className="activities-container">
        {Object.entries(groupedActivities).map(([category, items]) => (
          <div key={category} className="activity-category">
            <h3 className="activity-category__title">
              {getCategoryLabel(category)}
            </h3>

            <div className="activity-table-wrap">
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Organisation</th>
                    <th>Details</th>
                    <th>Summary</th>
                    <th>Link</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, index) => {
                    const categoryBadge = CATEGORY_BADGES[category];
                    const metaPrimary =
                      category === "conferences"
                        ? item.date
                        : category === "creative"
                          ? item.year
                          : item.period;
                    const metaSecondary =
                      category === "conferences"
                        ? item.location
                        : category === "creative"
                          ? item.type
                          : item.role;

                    return (
                      <MotionRow
                        key={item.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.35,
                          ease: "easeOut",
                          delay: index * 0.03,
                        }}
                      >
                        <td>
                          <div className="activity-cell-title">{item.title}</div>
                          <Badge variant={categoryBadge?.variant || "default"}>
                            {categoryBadge?.label || "Activity"}
                          </Badge>
                        </td>

                        <td className="activity-cell-org">{item.organization}</td>

                        <td>
                          <div className="activity-cell-meta-primary">
                            {metaPrimary}
                          </div>
                          <div className="activity-cell-meta-secondary">
                            {metaSecondary}
                          </div>
                        </td>

                        <td className="activity-cell-summary">{item.description}</td>

                        <td>
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="activity-item__link"
                            >
                              Visit
                            </a>
                          ) : (
                            <span className="activity-cell-empty">-</span>
                          )}
                        </td>
                      </MotionRow>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="activity-mobile-list">
              {items.map((item, index) => {
                const categoryBadge = CATEGORY_BADGES[category];
                const metaPrimary =
                  category === "conferences"
                    ? item.date
                    : category === "creative"
                      ? item.year
                      : item.period;
                const metaSecondary =
                  category === "conferences"
                    ? item.location
                    : category === "creative"
                      ? item.type
                      : item.role;

                return (
                  <MotionArticle
                    key={`mobile-${item.id}`}
                    className="activity-mobile-card"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      delay: index * 0.03,
                    }}
                  >
                    <div className="activity-mobile-card__head">
                      <h4 className="activity-mobile-card__title">{item.title}</h4>
                      <Badge variant={categoryBadge?.variant || "default"}>
                        {categoryBadge?.label || "Activity"}
                      </Badge>
                    </div>

                    <p className="activity-mobile-card__org">{item.organization}</p>
                    <p className="activity-mobile-card__meta">{metaPrimary}</p>
                    <p className="activity-mobile-card__meta">{metaSecondary}</p>
                    <p className="activity-mobile-card__summary">{item.description}</p>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="activity-item__link"
                      >
                        Visit
                      </a>
                    )}
                  </MotionArticle>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </MotionSection>
  );
}

export default Activities;
