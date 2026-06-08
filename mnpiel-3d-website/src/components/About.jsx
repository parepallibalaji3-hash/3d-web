import React from 'react';
import { CheckCircle, Zap, ShieldCheck, Users, Cpu, User, Landmark } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  const values = [
    {
      icon: CheckCircle,
      title: 'Precision First',
      desc: 'Every boundary, coordinate, and elevation measurement is double-verified. We never compromise on millimeter accuracy.'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      desc: 'Modern motorized total stations and UAV drone workflows allow us to compile datasets and drawings on schedule.'
    },
    {
      icon: ShieldCheck,
      title: 'Fully Compliant',
      desc: 'All land surveys, drilling reports, and building estimations are fully compliant with AP & TS municipal regulations.'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      desc: 'From initial boundary briefs to final structural handovers, we keep developers and government bodies fully in the loop.'
    },
    {
      icon: Cpu,
      title: 'Latest Technology',
      desc: 'Equipped with DGPS receivers, DJI survey-grade mapping drones, heavy-duty core drill rigs, and CAD structural estimators.'
    }
  ];

  const team = [
    {
      name: 'Mr. Mulleti Hareesh',
      role: 'Co-Founder & Director',
      isFounder: true
    },
    {
      name: 'Mr. Pusuluri Pulla Rao',
      role: 'Co-Founder & Director',
      isFounder: true
    },
    {
      name: 'Survey Lead',
      role: 'Chief Land Surveyor',
      isFounder: false
    },
    {
      name: 'Drone Unit',
      role: 'UAV Pilot & Photogrammetrist',
      isFounder: false
    },
    {
      name: 'Geo Team',
      role: 'Geotechnical Specialist',
      isFounder: false
    },
    {
      name: 'Design Cell',
      role: 'Structural & Civil Designer',
      isFounder: false
    }
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        <div className={styles.titleBlock}>
          <div className="badge">Who We Are</div>
          <h2 className={styles.sectionTitle}>Built from the Ground Up</h2>
          <p className={styles.introText}>
            Mulleti's and Pusuluri's Infracon and Engineers (P) Ltd (MNPIEPL) delivers survey, mapping, drilling, and building works with uncompromising integrity.
          </p>
        </div>

        {/* Narrative & Values Grid */}
        <div className={styles.contentGrid}>
          <div className={styles.storyBlock}>
            <h3 className={styles.storyTitle}>Our Story</h3>
            <p className={styles.storyPara}>
              Headquartered in Visakhapatnam, Andhra Pradesh, and serving across the twin Telugu states, we started as a specialized surveying unit. By investing in top-tier machinery and hiring experienced engineers, we expanded into a multi-disciplinary contracting and consulting company.
            </p>
            <p className={styles.storyPara}>
              Whether we are drilling 30-meter boreholes for structural feasibility, flying RTK-enabled drone mapping flights, or building commercial developments layer by layer, our operations are integrated under a singular standard of engineering excellence.
            </p>
          </div>

          <div className={styles.valuesList}>
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className={styles.valueItem}>
                  <Icon className={styles.valueIcon} size={24} />
                  <div className={styles.valueContent}>
                    <h4>{val.title}</h4>
                    <p>{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Grid */}
        <div>
          <h3 className={styles.teamTitle}>Our Leadership & Specialists</h3>
          <div className={styles.teamGrid}>
            {team.map((member, idx) => (
              <div key={idx} className={styles.teamCard}>
                <div className={`${styles.avatar} ${member.isFounder ? styles.coFounderAvatar : ''}`}>
                  <User size={36} />
                </div>
                <div className={styles.memberName}>{member.name}</div>
                <div className={styles.memberRole}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
