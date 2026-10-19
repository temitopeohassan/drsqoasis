import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollReveal from "./components/ScrollReveal";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import WhoWeAre, { Leadership } from "./pages/WhoWeAre";
import { WhatWeDoIndex, ServiceDetail } from "./pages/WhatWeDo";
import JoinOurTeam from "./pages/JoinOurTeam";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

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
          <Route path="/what-we-do" element={<WhatWeDoIndex />} />
          <Route path="/what-we-do/:slug" element={<ServiceDetail />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/who-we-are/leadership" element={<Leadership />} />
          <Route path="/join-our-team" element={<JoinOurTeam />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
