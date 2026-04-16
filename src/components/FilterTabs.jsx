import "./FilterTabs.css";

function FilterTabs({ tabs, active, onChange }) {
  return (
    <div className="filter-tabs" role="tablist">
      {tabs.map((tab) => {
        const isActive = active === tab;

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`filter-tabs__button ${isActive ? "filter-tabs__button--active" : ""}`}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;
