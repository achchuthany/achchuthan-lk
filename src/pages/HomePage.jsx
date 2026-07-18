import SEOHead from "../components/SEOHead";
import About from "../sections/About";
import Hero from "../sections/Hero";
import { PAGE_META } from "./pageMeta";

function HomePage() {
  return (
    <>
      <SEOHead {...PAGE_META.home} />
      <Hero />
      <About />
    </>
  );
}

export default HomePage;
