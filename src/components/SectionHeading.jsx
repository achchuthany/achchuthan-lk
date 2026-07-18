import "./SectionHeading.css";

function SectionHeading({ label, title, align = "left", icon: Icon }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {label ? (
        <span className="section-heading__label">
          {Icon ? (
            <span className="section-heading__icon" aria-hidden="true">
              <Icon size={15} strokeWidth={2.25} />
            </span>
          ) : null}
          {label}
        </span>
      ) : null}
      <h2 className="section-heading__title">{title}</h2>
    </div>
  );
}

export default SectionHeading;
