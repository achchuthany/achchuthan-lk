import { motion } from "framer-motion";
import "./Card.css";

const MotionDiv = motion.div;

function Card({ children, hover = true, className = "" }) {
  const classes = ["card", className].filter(Boolean).join(" ");

  if (!hover) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <MotionDiv
      className={classes}
      whileHover={{ scale: 1.015, borderColor: "#aaa" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </MotionDiv>
  );
}

export default Card;
