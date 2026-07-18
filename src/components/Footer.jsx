import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const buildNumber = import.meta.env.VITE_BUILD_NUMBER || "dev";

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Link to="/" className="footer__brand">
          <img className="footer__mark" src="/favicon.svg" alt="" />
          <span className="footer__name">Yogarajah Achchuthan</span>
        </Link>

        <p className="footer__line">
          © {currentYear} Yogarajah Achchuthan · v{buildNumber}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
