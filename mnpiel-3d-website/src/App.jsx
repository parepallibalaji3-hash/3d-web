import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ThreeCanvas from './components/ThreeCanvas';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeService, setActiveService] = useState('survey');
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulated premium asset loading progress
  useEffect(() => {
    const duration = 1200; // ms
    const intervalTime = 30; // ms
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);
        // Add a tiny delay for visual satisfaction
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // IntersectionObserver to auto-update active navigation link during scrolling
  useEffect(() => {
    if (loading) return;

    const sections = ['hero', 'services', 'about', 'projects', 'contact'];
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Trigger when section occupies the main center screen
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [loading]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Set active directly for quick feedback
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {loading && (
        <div className="loading-screen">
          <div className="spinner" />
          <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '2rem', fontSize: '1.2rem', color: 'var(--primary)', letterSpacing: '2px' }}>
            LOADING DGPS ENGINE
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'monospace' }}>
            INITIALIZING CONTOURS... {loadingProgress}%
          </div>
        </div>
      )}

      {/* Fixed 3D canvas backdrop */}
      {!loading && (
        <ThreeCanvas 
          activeSection={activeSection} 
          activeService={activeService} 
        />
      )}

      {/* Scrolled text sections overlay */}
      <div className="sections-overlay">
        <Header 
          activeSection={activeSection} 
          onNavigate={scrollToSection} 
        />

        <main>
          {/* Hero section */}
          <Hero onNavigate={scrollToSection} />

          {/* Services tabs */}
          <Services 
            onActiveServiceChange={setActiveService} 
            onNavigate={scrollToSection} 
          />

          {/* About details */}
          <About />

          {/* Sectors layout grid */}
          <Projects />

          {/* Contact form */}
          <Contact />
        </main>

        {/* High-tech simple footer */}
        <footer style={{ background: '#050505', padding: '2.5rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div className="container">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              &copy; {new Date().getFullYear()} Mulleti's and Pusuluri's Infracon and Engineers (P) Ltd (MNPIEPL). All Rights Reserved.
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Delivering precision engineering, surveys, core drilling, and drone mapping solutions across AP & TS.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
