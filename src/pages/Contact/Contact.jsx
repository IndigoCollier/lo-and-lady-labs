import React from 'react'
import { Mail, Phone, MapPin, Clock, Heart } from 'lucide-react'
import ContactForm from '../../components/forms/ContactForm'
import './Contact.css'

function Contact() {
  const handleContactSuccess = (formData) => {
    console.log('Contact form submitted successfully:', formData)
    // You could add analytics tracking, etc. here
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Ready to welcome a new family member? Have questions about our puppies? 
            We're here to help you every step of the way.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-header">
                <Heart className="info-icon" />
                <h3>Lo and Lady Labs</h3>
              </div>
              <p>Premium Labradoodle Breeders</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div>
                    <strong>Phone</strong>
                    <p>(901) 123-4567</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div>
                    <strong>Email</strong>
                    <p>hello@loandladylabs.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div>
                    <strong>Location</strong>
                    <p>Memphis, TN</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <div>
                    <strong>Response Time</strong>
                    <p>Within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="visit-info">
              <h4>Schedule a Visit</h4>
              <p>
                We welcome families to meet our puppies and parents in person. 
                Visits are by appointment only to ensure the best experience for 
                both you and our dogs.
              </p>
              <ul>
                <li>Meet available puppies</li>
                <li>See our facilities</li>
                <li>Meet the parent dogs</li>
                <li>Ask questions about care</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-section">
            <ContactForm onSuccess={handleContactSuccess} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact