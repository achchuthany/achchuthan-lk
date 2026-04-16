import Badge from "../components/Badge";
import SectionHeading from "../components/SectionHeading";
import stack from "../data/stack.json";
import "./Stack.css";

const STACK_COLUMNS = [
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "mobile", label: "Mobile" },
  { key: "infrastructure", label: "Infrastructure" },
];

function Stack() {
  return (
    <section id="stack" className="stack-section">
      <div className="stack-section__inner">
        <div className="stack-section__heading">
          <SectionHeading title="Technical skills" />
        </div>

        <div className="stack-section__grid">
          {STACK_COLUMNS.map((column) => (
            <div key={column.key} className="stack-column">
              <p className="stack-column__label">{column.label}</p>

              <div className="stack-column__list">
                {stack[column.key].map((skill) => (
                  <div key={skill.name} className="stack-skill">
                    <div className="stack-skill__top">
                      <span className="stack-skill__name">{skill.name}</span>
                      <Badge variant={skill.level}>
                        {skill.level === "expert" ? "Expert" : "Proficient"}
                      </Badge>
                    </div>
                    <span className="stack-skill__years">
                      {skill.years} yrs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stack;
