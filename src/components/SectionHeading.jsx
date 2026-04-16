import "./SectionHeading.css";

function SectionHeading({ label, title, align = "left" }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {label ? <span className="section-heading__label">{label}</span> : null}
      <h2 className="section-heading__title">{title}</h2>
    </div>
  );
}

export default SectionHeading;
