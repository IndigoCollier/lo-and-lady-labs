import React, { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Youtube,
  Users,
  Heart,
  Award,
  Navigation
} from 'lucide-react'
import ContactForm from '../../components/forms/ContactForm'
import FAQ from '../../components/common/FAQ'
import Button from '../../components/common/Button'
import { contactInfo } from '../../data/faqData'
import { getTeamMembers } from '../../data/teamInfo'
import './Contact.css'

function Contact() {
  const [activeTab, setActiveTab] = useState('contact')
  const teamMembers = getTeamMembers()

  const handleGetDirections = () => {
    const address = encodeURIComponent(contactInfo.business.address.full)
    window.open(`https://maps.google.com/maps?q=${address}`, '_blank')
  }

  const handlePhoneCall = (phone) => {
    window.location.href = `tel:${phone}`
  }

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}?subject=Puppy Inquiry - Lo and Lady Labs`
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title contact-title">Get in Touch</h1>
            <p className="hero-subtitle contact-subtitle">
              We'd love to hear from you! Reach out with questions about our puppies, 
              adoption process, or to schedule a visit.
            </p>
            
            <div className="contact-tabs">
              <button
                onClick={() => setActiveTab('contact')}
                className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
              >
                <MessageCircle className="tab-icon" />
                Contact Us
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
              >
                <Users className="tab-icon" />
                FAQ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      {activeTab === 'contact' && (
        <>
          {/* Contact Methods */}
          <section className="contact-methods">
            <div className="container">
              <div className="methods-grid">
                {/* Team Members */}
                {teamMembers.map((member) => (
                  <div key={member.id} className="contact-card team-member">
                    <div className="card-header">
                      <Heart className="card-icon" />
                      <h3>{member.role}</h3>
                    </div>
                    <div className="contact-person">
                      <h4>{member.name}</h4>
                      <p className="person-title">Age {member.age}</p>
                      <div className="contact-methods-list">
                        <button 
                          onClick={() => handlePhoneCall("(555) 123-4567")}
                          className="contact-method"
                        >
                          <Phone className="method-icon" />
                          <span>(901) 123-4567</span>
                        </button>
                        <button 
                          onClick={() => handleEmailClick("info@loandladylabs.com")}
                          className="contact-method"
                        >
                          <Mail className="method-icon" />
                          <span>info@loandladylabs.com</span>
                        </button>
                        <div className="availability">
                          <Clock className="method-icon" />
                          <span>Monday-Saturday 9AM-5PM</span>
                        </div>
                      </div>
                      
                      <div className="member-specialties">
                        <h5>Specialties:</h5>
                        <ul className="specialties-list">
                          {member.specialties.slice(0, 3).map((specialty, index) => (
                            <li key={index}>{specialty}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Location Info */}
                <div className="contact-card location-card">
                  <div className="card-header">
                    <MapPin className="card-icon" />
                    <h3>Visit Our Location</h3>
                  </div>
                  <div className="location-info">
                    <div className="address">
                      <h4>{contactInfo.business.name}</h4>
                      <p>{contactInfo.business.address.full}</p>
                    </div>
                    <div className="visiting-hours">
                      <h5>Visiting Hours:</h5>
                      <p><strong>Weekdays:</strong> {contactInfo.visitingHours.weekdays}</p>
                      <p><strong>Weekends:</strong> {contactInfo.visitingHours.weekends}</p>
                      <p className="visiting-note">{contactInfo.visitingHours.notes}</p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={handleGetDirections}
                      className="directions-button"
                    >
                      <Navigation className="button-icon" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="contact-form-section">
            <div className="container">
              <div className="section-header">
                <h2>Send Us a Message</h2>
                <p className='hero-subtitle contact-form-subtitle'>
                  Have specific questions about a puppy or want to start the adoption process? 
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              
              <div className="form-container">
                <ContactForm />
              </div>
            </div>
          </section>

          {/* Social Media */}
          <section className="social-media-section">
            <div className="container">
              <div className="social-header">
                <h3>Follow Our Journey</h3>
                <p>Stay updated with puppy photos, family updates, and breeding news</p>
              </div>
              
              <div className="social-links">
                <a 
                  href={`https://${contactInfo.business.socialMedia.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link facebook"
                >
                  <Facebook className="social-icon" />
                  <span>Facebook</span>
                </a>
                <a 
                  href={`https://instagram.com/${contactInfo.business.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link instagram"
                >
                  <Instagram className="social-icon" />
                  <span>Instagram</span>
                </a>
                <a 
                  href={`https://${contactInfo.business.socialMedia.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link youtube"
                >
                  <Youtube className="social-icon" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <section className="faq-section-container">
          <div className="container">
            <FAQ showSearch={true} maxHeight="600px" />
          </div>
        </section>
      )}
    </div>
  )
}

export default Contact