/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Portfolio } from "./pages/Portfolio";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { useEffect } from "react";
import { cn } from "./lib/utils";

// ScrollToTop component to ensure pages start at the top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isPortfolio = location.pathname === '/portfolio';
  const isServices = location.pathname === '/services';
  
  const bgClass = isPortfolio ? 'bg-brand-blue' : isServices ? 'bg-brand-dark' : 'bg-brand-bg';
  
  return (
    <div className={cn("min-h-screen flex flex-col font-sans transition-colors duration-300", bgClass)}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageWrapper>
        <Header />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </PageWrapper>
    </Router>
  );
}

