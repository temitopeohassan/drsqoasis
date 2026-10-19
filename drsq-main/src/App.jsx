import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollReveal from "./components/ScrollReveal";
import Home from "./pages/Home";
import Partners from "./pages/Partners";
import Government from "./pages/Government";
import Insights from "./pages/Insights";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AboutIndex, WhoWeAre, MissionStatement, AboutCeo } from "./pages/About";
import { CapabilitiesIndex, CapabilityDetail } from "./pages/Capabilities";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <ScrollToTop />
      <ScrollReveal />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<AboutIndex />} />
          <Route path="/about/who-we-are" element={<WhoWeAre />} />
          <Route path="/about/mission-statement" element={<MissionStatement />} />
          <Route path="/about/ceo" element={<AboutCeo />} />
          <Route path="/government" element={<Government />} />
          <Route path="/capabilities" element={<CapabilitiesIndex />} />
          <Route path="/capabilities/:slug" element={<CapabilityDetail />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
