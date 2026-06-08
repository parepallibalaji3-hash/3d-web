import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'survey',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Enquiry: ${formData.serviceType.charAt(0).toUpperCase() + formData.serviceType.slice(1)}`,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: 'survey',
          message: ''
        });
      } else {
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Failed to reach the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      content: (
        <>
          D-No-43-29-47, Narona Road, Dondaparthy,<br />
          New Colony, Visakhapatnam,<br />
          Andhra Pradesh - 530 016
        </>
      )
    },
    {
      icon: Phone,
      title: 'Phone',
      content: <a href="tel:+919515743539">+91 95157 43539</a>
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: <a href="mailto:pullarao2hanuman@gmail.com">pullarao2hanuman@gmail.com</a>
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon – Sat: 9:00 AM – 6:00 PM'
    }
  ];

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Panel: Contact info */}
          <div className={styles.infoBlock}>
            <div className="badge">Get In Touch</div>
            <h2 className={styles.title}>Let's Discuss Your Project</h2>
            <p className={styles.description}>
              Whether it's a boundary survey, construction estimate, drill log, or drone flight — our engineering team is ready to scope and deliver results.
            </p>

            <div className={styles.infoCards}>
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className={styles.infoCard}>
                    <div className={styles.iconWrapper}>
                      <Icon size={20} />
                    </div>
                    <div className={styles.infoContent}>
                      <h4>{info.title}</h4>
                      <p>{info.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Real Google Maps Location Card */}
            <div className={styles.mapCard}>
              <div className={styles.mapHeader}>
                <div>
                  <span className={styles.mapTitle}>Visakhapatnam HQ Coordinates</span>
                  <div className={styles.mapCoordinates}>17°43'30.9"N &nbsp; 83°17'51.9"E</div>
                </div>
                <span className={styles.mapTag}>Active Station</span>
              </div>
              <div className={styles.mapFrameWrapper}>
                <iframe
                  title="MNPIEPL Visakhapatnam Headquarters"
                  src="https://maps.google.com/maps?q=17%C2%B043'30.9%22N%2083%C2%B017'51.9%22E&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ 
                    border: 0, 
                    borderRadius: '8px', 
                    filter: 'invert(90%) hue-rotate(180deg) grayscale(80%) contrast(110%) brightness(95%)' 
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Panel: Glassmorphism form or success */}
          <div className={`${styles.formPanel} glass-panel`}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className={styles.formHeader}>
                  <h3>Send Us a Message</h3>
                  <p>Fill out the details below and we will respond within 24 hours.</p>
                </div>

                <div className={styles.row}>
                  <div className="form-group">
                    <label htmlFor="form-name">Name *</label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-email">Email *</label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className="form-group">
                    <label htmlFor="form-phone">Phone Number</label>
                    <input
                      id="form-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-service">Required Service</label>
                    <select
                      id="form-service"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="construction">Construction</option>
                      <option value="survey">Land Surveying</option>
                      <option value="drilling">Core Drilling</option>
                      <option value="drone">Drone Mapping</option>
                      <option value="design">Design & Estimation</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="form-message">Project Description *</label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Briefly describe your site location, scope of work, and key deliverables needed."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : (
                    <>
                      Send Enquiry
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className={styles.successPanel}>
                <div className={styles.successIcon}>
                  <CheckCircle2 size={40} />
                </div>
                <h3 className={styles.successTitle}>Thank You!</h3>
                <p className={styles.successDesc}>
                  We've received your enquiry regarding <strong>{formData.serviceType === 'survey' ? 'Land Surveying' : formData.serviceType.charAt(0).toUpperCase() + formData.serviceType.slice(1)}</strong> services. A specialist will review your request and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
