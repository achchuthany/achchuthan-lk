import SEOHead from "../components/SEOHead";
import Activities from "../sections/Activities";
import { PAGE_META } from "./pageMeta";

function ActivitiesPage() {
  return (
    <>
      <SEOHead {...PAGE_META.activities} />
      <Activities />
    </>
  );
}

export default ActivitiesPage;
