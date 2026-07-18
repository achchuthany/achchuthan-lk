import SEOHead from "../components/SEOHead";
import Timeline from "../sections/Timeline";
import { PAGE_META } from "./pageMeta";

function TimelinePage() {
  return (
    <>
      <SEOHead {...PAGE_META.timeline} />
      <Timeline />
    </>
  );
}

export default TimelinePage;
