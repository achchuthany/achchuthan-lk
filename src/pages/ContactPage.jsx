import SEOHead from "../components/SEOHead";
import Contact from "../sections/Contact";
import { PAGE_META } from "./pageMeta";

function ContactPage() {
  return (
    <>
      <SEOHead {...PAGE_META.contact} />
      <Contact />
    </>
  );
}

export default ContactPage;
