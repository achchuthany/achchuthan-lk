import profile from "../data/profile.json";
import "./Avatar.css";

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

// Profile photo in a gradient ring. Uses `profile.avatar` (a path under
// public/, e.g. "/avatar.jpg") when set, otherwise an initials monogram.
function Avatar({ size = 96, className = "" }) {
  const classes = ["avatar", className].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      style={{ "--avatar-size": `${size}px` }}
      aria-hidden={profile.avatar ? undefined : "true"}
    >
      {profile.avatar ? (
        <img
          className="avatar__image"
          src={profile.avatar}
          alt={profile.name}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="avatar__initials">{getInitials(profile.name)}</span>
      )}
    </span>
  );
}

export default Avatar;
