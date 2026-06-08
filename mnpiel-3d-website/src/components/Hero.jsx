import React from 'react';
import { ArrowRight, MapPin, CheckCircle } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero({ onNavigate }) {
  return (
    <section id="hero" className={styles.heroSection}>
      <div className="container">
        <div className={styles.content}>
          {/* Active region badge */}
          <div className="badge">
            <MapPin size={12} style={{ marginRight: '4px' }} />
            Telangana & Andhra Pradesh
          </div>

          {/* Tagline */}
          <h1 className={styles.title}>
            <span className={styles.titleLine1}>BUILD. SURVEY.</span>
            <span className={`${styles.titleLine2} gradient-text`}>ENGINEER.</span>
          </h1>

          {/* Description */}
          <p className={styles.subtitle}>
            MNPIEPL delivers end-to-end infrastructure and survey services — from precision land boundary surveys and high-resolution drone mapping to core drilling geotechnical logs and building construction.
          </p>

          {/* CTAs */}
          <div className={styles.ctaGroup}>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('contact')}
            >
              Get in Touch
              <ArrowRight size={16} />
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('projects')}
            >
              Our Projects
            </button>
          </div>

          {/* Quick Metrics */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>100%</div>
              <div className={styles.statLabel}>Accuracy Driven</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>DGPS & LiDAR</div>
              <div className={styles.statLabel}>Latest Tech Stack</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>TS & AP</div>
              <div className={styles.statLabel}>Statewide Services</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating scroll indicator */}
      <div 
        className={styles.scrollIndicator}
        onClick={() => onNavigate('services')}
      >
        <span>Explore Services</span>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
      </div>
    </section>
  );
}
