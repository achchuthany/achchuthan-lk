import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const buildNumber = import.meta.env.VITE_BUILD_NUMBER || "dev";

  return (
    <footer className="footer">
      <p className="footer__line">
        Copyright {currentYear} Yogarajah Achchuthan · v{buildNumber}
      </p>
    </footer>
  );
}

export default Footer;
