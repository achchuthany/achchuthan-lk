import SEOHead from "../components/SEOHead";
import Projects from "../sections/Projects";
import { PAGE_META } from "./pageMeta";

function ProjectsPage() {
  return (
    <>
      <SEOHead {...PAGE_META.projects} />
      <Projects />
    </>
  );
}

export default ProjectsPage;
