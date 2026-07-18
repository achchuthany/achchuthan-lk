import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page not found — Yogarajah Achchuthan"
        description="The page you are looking for does not exist."
        canonical="https://achchuthan.lk/"
      />
      <section className="notfound">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">This page could not be found.</h1>
        <p className="notfound__text">
          The link may be broken or the page may have moved.
        </p>
        <Link className="notfound__link" to="/">
          Back to home
        </Link>
      </section>
    </>
  );
}

export default NotFoundPage;
