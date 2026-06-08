import React from 'react';
import { 
  Train, Map, Droplets, Anchor, Globe, 
  Zap, Mountain, Scan, Route 
} from 'lucide-react';
import styles from './Projects.module.css';

export default function Projects() {
  const projectSectors = [
    {
      code: 'SEC-01',
      icon: Train,
      title: 'Railway & Metro Rail',
      desc: 'Complete corridor engineering and alignment mapping to support rapid transit rail network laying.',
      features: [
        'Railway Alignment Surveys',
        'Metro Corridor Mapping',
        'Track Design Support',
        'Infrastructure Planning'
      ]
    },
    {
      code: 'SEC-02',
      icon: Map,
      title: 'Urban Planning Master Plans',
      desc: 'High-accuracy zoning surveys and municipal land-use mapping using geospatial databases.',
      features: [
        'City Development Plans',
        'Land Use Mapping',
        'Zoning Analysis',
        'Urban GIS Services'
      ]
    },
    {
      code: 'SEC-03',
      icon: Droplets,
      title: 'Irrigation & Water Resources',
      desc: 'Hydrology tracking, canal profiles, and reservoir catchment modeling for irrigation works.',
      features: [
        'Canal Surveys',
        'Hydrology Analysis',
        'Reservoir Mapping',
        'Water Resource Planning'
      ]
    },
    {
      code: 'SEC-04',
      icon: Route,
      title: 'Highways & Roads',
      desc: 'Terrain modeling, road alignment profiling, and cut/fill volume surveys for state and national highways.',
      features: [
        'Road Alignment Surveys',
        'Transportation Planning',
        'Terrain Mapping',
        'Road Corridor Studies'
      ]
    },
    {
      code: 'SEC-05',
      icon: Anchor,
      title: 'Ports & Shipyards',
      desc: 'Coastal mapping, harbor depth surveys, and shipyard structural layout tracking.',
      features: [
        'Coastal Surveys',
        'Port Mapping',
        'Marine Infrastructure',
        'Harbor Engineering'
      ]
    },
    {
      code: 'SEC-06',
      icon: Globe,
      title: 'Geospatial Services & GIS',
      desc: 'Remote sensing, thematic map creation, and enterprise spatial data analysis.',
      features: [
        'GIS Mapping',
        'Remote Sensing',
        'Satellite Data Analysis',
        'Spatial Planning'
      ]
    },
    {
      code: 'SEC-07',
      icon: Zap,
      title: 'Transmission Lines & Power',
      desc: 'Power corridor routing, sag analysis, and tower footprint surveys across rough terrains.',
      features: [
        'Power Corridor Mapping',
        'Tower Positioning',
        'Electrical Surveys',
        'Transmission Planning'
      ]
    },
    {
      code: 'SEC-08',
      icon: Mountain,
      title: 'Mine Mapping',
      desc: 'Stockpile measurements, quarry boundary layouts, and safety elevation profile tracking.',
      features: [
        'Mine Surveys',
        'Drone Volume Audits',
        'Volumetric Analysis',
        'Terrain Modeling'
      ]
    },
    {
      code: 'SEC-09',
      icon: Scan,
      title: 'Drone Survey & Mapping',
      desc: 'Precision photogrammetric scanning and 3D surface model outputs for development groups.',
      features: [
        'UAV Surveys & LiDAR',
        'Orthophoto Generation',
        '3D Terrain Models',
        'Inspection Services'
      ]
    }
  ];

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <div className={styles.titleBlock}>
          <div className="badge">Project Domains</div>
          <h2 className={styles.sectionTitle}>Sectors We Service</h2>
          <p className={styles.introText}>
            Our engineering teams deliver precision survey and data solutions across several critical infrastructure sectors.
          </p>
        </div>

        <div className={styles.grid}>
          {projectSectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div key={idx} className={`${styles.projectCard} glass-panel`}>
                <div>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      <Icon size={20} />
                    </div>
                    <span className={styles.projectCode}>{sector.code}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{sector.title}</h3>
                  <p className={styles.projectDesc}>{sector.desc}</p>
                </div>
                
                <ul className={styles.featureList}>
                  {sector.features.map((feat, fIdx) => (
                    <li key={fIdx} className={styles.featureItem}>
                      <span className={styles.bullet} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
