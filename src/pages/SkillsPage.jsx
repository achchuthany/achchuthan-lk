import SEOHead from "../components/SEOHead";
import Stack from "../sections/Stack";
import { PAGE_META } from "./pageMeta";

function SkillsPage() {
  return (
    <>
      <SEOHead {...PAGE_META.skills} />
      <Stack />
    </>
  );
}

export default SkillsPage;
