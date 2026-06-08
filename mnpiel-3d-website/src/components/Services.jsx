import React, { useState } from 'react';
import { HardHat, Compass, Layers, Scan, Ruler, ArrowRight } from 'lucide-react';
import styles from './Services.module.css';

export default function Services({ onActiveServiceChange, onNavigate }) {
  const [activeService, setActiveService] = useState('survey'); // Default to survey

  const services = [
    {
      id: 'construction',
      label: 'Construction',
      icon: HardHat,
      color: 'yellow',
      title: 'Structural Construction',
      description: 'Residential, commercial, and industrial construction from foundation to finish. We manage the entire build with quality and on-time delivery.',
      features: [
        { title: 'Residential Buildings', desc: 'From custom G+1 villas to G+10 residential complexes.' },
        { title: 'Commercial Complexes', desc: 'Modern workspaces, business parks, and shopping spaces.' },
        { title: 'Industrial Structures', desc: 'Warehouses, structural steel sheds, and plant foundations.' },
        { title: 'Infrastructure Works', desc: 'Bridges, concrete structures, and retaining walls.' }
      ]
    },
    {
      id: 'survey',
      label: 'Land Surveying',
      icon: Compass,
      color: 'teal',
      title: 'Precision Land Surveying',
      description: 'Precision boundary surveys, topographic surveys, and cadastral mapping using state-of-the-art total stations and GPS equipment.',
      features: [
        { title: 'Boundary Demarcation', desc: 'High-accuracy legal boundary surveys and marking.' },
        { title: 'Topographic Surveys', desc: 'Elevation profiling, contours, and physical feature mapping.' },
        { title: 'Subdivision Layouts', desc: 'Urban development plot layout mapping and approval assistance.' },
        { title: 'Setting Out / As-Built', desc: 'Transferring architectural drawings to physical sites exactly.' }
      ]
    },
    {
      id: 'drilling',
      label: 'Soil Testing & Drilling',
      icon: Layers,
      color: 'teal',
      title: 'Soil Testing & Geotechnical Drilling',
      description: 'Comprehensive soil testing and geotechnical core drilling. We perform Standard Penetration Tests (SPT), soil bearing capacity analysis, compaction testing, and physical sample logging to support safe engineering designs.',
      features: [
        { title: 'Soil Strata Profiling', desc: 'Borehole logging to map subsurface layers and soil classification.' },
        { title: 'Bearing Capacity Testing', desc: 'Evaluating load capacity (SPT, plate load tests) for foundations.' },
        { title: 'Undisturbed Sampling', desc: 'Extracting rock and soil core samples for laboratory analysis.' },
        { title: 'Geotechnical Reports', desc: 'Certified technical reports with engineering recommendations.' }
      ]
    },
    {
      id: 'drone',
      label: 'Drone Mapping',
      icon: Scan,
      color: 'teal',
      title: 'UAV Survey & Mapping',
      description: 'UAV-based aerial photography, photogrammetric surveys, volumetric analysis, and high-resolution orthoimagery for any terrain.',
      features: [
        { title: 'Aerial Orthoimagery', desc: 'Stitched high-resolution georeferenced aerial maps.' },
        { title: 'Photogrammetric Clouds', desc: 'High-density 3D point clouds and digital surface models.' },
        { title: 'Stockpile Volume Calc', desc: 'Precise volumetric analysis of aggregates, sand, or coal.' },
        { title: 'Progress Monitoring', desc: 'Periodic aerial tracking of large-scale site progression.' }
      ]
    },
    {
      id: 'design',
      label: 'Design & Estimation',
      icon: Ruler,
      color: 'teal',
      title: 'Design & Estimation Services',
      description: 'Architectural & structural design, AutoCAD drafting, detailed Bill of Quantities (BOQ) preparation, and accurate project cost estimation.',
      features: [
        { title: 'Architectural Drafting', desc: 'Conceptual blueprints and detailed 2D/3D AutoCAD outputs.' },
        { title: 'Structural Design', desc: 'RCC and steel structure design with safety and code checks.' },
        { title: 'Detailed BOQ', desc: 'Item-wise material quantity and cost estimates.' },
        { title: 'Cost Estimation', desc: 'Accurate financial budget planning for public/private projects.' }
      ]
    }
  ];

  const handleServiceSelect = (id) => {
    setActiveService(id);
    if (onActiveServiceChange) {
      onActiveServiceChange(id);
    }
  };

  const currentService = services.find(s => s.id === activeService);

  return (
    <section id="services" className={styles.servicesSection}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left panel: Intro & service selector */}
          <div className={styles.intro}>
            <div className="badge">Our Core Services</div>
            <h2 className={styles.title}>What We Deliver</h2>
            <p className={styles.description}>
              We provide end-to-end site engineering, geospatial mapping, and robust construction services tailored to municipal standards and complex environments.
            </p>

            <div className={styles.serviceList}>
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = service.id === activeService;
                let btnClass = styles.serviceBtn;
                if (isActive) {
                  btnClass += ` ${service.color === 'yellow' ? styles.activeServiceBtnYellow : styles.activeServiceBtn}`;
                }
                return (
                  <button
                    key={service.id}
                    className={btnClass}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className={styles.iconWrapper}>
                      <Icon size={20} />
                    </div>
                    <span className={styles.serviceLabel}>{service.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right panel: Detail card */}
          <div className={`${styles.detailPanel} glass-panel`}>
            <div>
              <div className={styles.detailHeader}>
                <div className={`badge ${currentService.color === 'yellow' ? 'badge-yellow' : ''}`}>
                  {currentService.label} Overview
                </div>
                <h3 className={styles.detailTitle}>
                  {currentService.title}
                </h3>
                <p className={styles.detailDesc}>
                  {currentService.description}
                </p>
              </div>

              <div className={styles.featureGrid}>
                {currentService.features.map((feat, idx) => (
                  <div key={idx} className={styles.featureCard}>
                    <h4 className={styles.featureTitle}>{feat.title}</h4>
                    <p className={styles.featureDesc}>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.detailFooter}>
              <button 
                className={`btn ${currentService.color === 'yellow' ? 'btn-construction' : 'btn-primary'}`}
                onClick={() => onNavigate('contact')}
              >
                Inquire About Service
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
