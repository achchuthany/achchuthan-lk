import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { NOT_FOUND_META } from "./pageMeta";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <>
      <SEOHead {...NOT_FOUND_META} />
      <section className="notfound">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">This page could not be found.</h1>
        <p className="notfound__text">
          The link may be broken or the page may have moved.
        </p>
        <Link className="btn btn--primary" to="/">
          Back to home
        </Link>
      </section>
    </>
  );
}

export default NotFoundPage;
