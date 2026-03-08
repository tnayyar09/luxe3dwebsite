import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Agar URL /projects rakhna hai */}
          <Route path="/projects" element={<Projects />} />

          {/* Agar URL /services rakhna hai to upar wali line ki jagah ye use karo:
          <Route path="/services" element={<Projects />} />
          */}

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}