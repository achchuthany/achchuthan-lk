import SEOHead from "../components/SEOHead";
import Academic from "../sections/Academic";
import { PAGE_META } from "./pageMeta";

function AcademicPage() {
  return (
    <>
      <SEOHead {...PAGE_META.academic} />
      <Academic />
    </>
  );
}

export default AcademicPage;
