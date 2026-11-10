import { useParams } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import projects from "../data/projects.json";
import ProjectDetail from "../sections/ProjectDetail";
import NotFoundPage from "./NotFoundPage";
import { projectMeta } from "./pageMeta";

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <>
      <SEOHead {...projectMeta(project)} />
      <ProjectDetail project={project} />
    </>
  );
}

export default ProjectDetailPage;
