import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Landmark } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ activeSection, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="#hero" className={styles.logoContainer} onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>
          <div className={styles.logoText}>
            MNPIEPL<span className={styles.logoDot}>.</span>
          </div>
          <div className={styles.logoSubText}>
            MULLETI'S & PUSULURI'S INFRACON
          </div>
        </a>

        {/* Desktop & Mobile Navigation */}
        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navActive : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.navLink} ${activeSection === item.id ? styles.activeLink : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions / CTA */}
        <div className={styles.actions}>
          <a href="tel:+919515743539" className={styles.phoneLink}>
            <Phone size={16} className="text-primary" style={{ color: 'var(--primary)' }} />
            <span>+91 95157 43539</span>
          </a>
          <button
            className="btn btn-primary"
            onClick={() => handleNavClick('contact')}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.menuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
