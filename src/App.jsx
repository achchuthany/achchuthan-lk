import { AnimatePresence } from "framer-motion";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import SEOHead from "./components/SEOHead";
import profile from "./data/profile.json";
import Academic from "./sections/Academic";
import About from "./sections/About";
import Activities from "./sections/Activities";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Stack from "./sections/Stack";
import Timeline from "./sections/Timeline";

const seoTitle = `${profile.name} — Instructor & Software Engineer`;
const seoDescription =
  "Computer technology instructor focused on practical systems, networking, and software engineering, building mobile solutions for academia and SMEs.";

function App() {
  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <main key="single-page-layout" className="app-main">
          <Hero />
          <About />
          <Academic />
          <Projects />
          <Stack />
          <Timeline />
          <Activities />
          <Contact />
          <Footer />
        </main>
      </AnimatePresence>
    </>
  );
}

export default App;
