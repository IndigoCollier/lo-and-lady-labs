import React, { useState } from 'react'
import { Heart, Users, Phone, MessageCircle, ExternalLink, Shield, Award, Star } from 'lucide-react'
import DonationWidget from '../../components/common/DonationWidget'
import DonationModal from '../../components/common/DonationModal'
import Button from '../../components/common/Button'
import './Support.css'

const mentalHealthResources = [
  {
    id: 1,
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "24/7 free and confidential support for people in distress and crisis resources.",
    type: "Crisis Support",
    availability: "24/7"
  },
  {
    id: 2, 
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free, 24/7 crisis support via text message.",
    type: "Text Support",
    availability: "24/7"
  },
  {
    id: 3,
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Treatment referral and information service for mental health and substance use disorders.",
    type: "Treatment Referral",
    availability: "24/7"
  },
  {
    id: 4,
    name: "National Alliance on Mental Illness",
    phone: "1-800-950-6264",
    description: "Information, referrals, and support for individuals and families affected by mental illness.",
    type: "Support & Information",
    availability: "Monday-Friday 10am-10pm ET"
  }
]

const therapyDogPrograms = [
  {
    id: 1,
    title: "Hospital Therapy Visits",
    description: "Our certified therapy labradoodles visit hospitals to provide comfort to patients and families during difficult times.",
    icon: <Heart />,
    impact: "200+ hospital visits annually"
  },
  {
    id: 2,
    title: "Senior Living Communities", 
    description: "Regular visits to senior centers and assisted living facilities to bring joy and companionship to elderly residents.",
    icon: <Users />,
    impact: "15 facilities served monthly"
  },
  {
    id: 3,
    title: "School Support Programs",
    description: "Supporting students through reading programs, stress relief during exams, and social-emotional learning activities.",
    icon: <Star />,
    impact: "5 schools in our program"
  },
  {
    id: 4,
    title: "Crisis Response Team",
    description: "Specially trained teams that respond to community traumas and disasters to provide emotional support.",
    icon: <Shield />,
    impact: "Available 24/7 for emergencies"
  }
]

function Support() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)

  const handleCallResource = (phone) => {
    if (phone.includes('text')) {
      alert(`To access Crisis Text Line, send a text message:\n\n${phone}`)
    } else {
      window.location.href = `tel:${phone.replace(/[^\d]/g, '')}`
    }
  }

  const handleDonationSuccess = (result) => {
    console.log('Donation successful:', result)
    // Here you could add additional success handling like sending a thank you email
  }

  return (
    <div className="support-page">
      {/* Hero Section */}
      <section className="support-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Mental Health Support & Resources</h1>
              <p className="hero-subtitle">
                At Lo and Lady Labs, we believe in the healing power of the human-animal bond. 
                Our therapy-trained labradoodles and community partnerships help support mental health awareness and provide resources for those in need.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Therapy Dogs Trained</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1,000+</span>
                  <span className="stat-label">Lives Touched</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Partner Organizations</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="./images/support/therapy-dog-and-child.png" 
                alt="Therapy dog providing comfort to a child"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="crisis-resources">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Immediate Mental Health Resources</h2>
            <p className="hero-subtitle">
              If you or someone you know is in crisis, help is available 24/7. These resources provide immediate support and guidance.
            </p>
          </div>

          <div className="resources-grid">
            {mentalHealthResources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-header">
                  <div className="resource-type">{resource.type}</div>
                  <div className="resource-availability">{resource.availability}</div>
                </div>
                
                <h3 className="resource-name">{resource.name}</h3>
                <p className="resource-description">{resource.description}</p>
                
                <div className="resource-contact">
                  <Button
                    variant="primary"
                    size="large"
                    onClick={() => handleCallResource(resource.phone)}
                    className="contact-button"
                  >
                    {resource.phone.includes('text') ? (
                      <MessageCircle className="button-icon" />
                    ) : (
                      <Phone className="button-icon" />
                    )}
                    {resource.phone}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="emergency-notice">
            <div className="notice-content">
              <Shield className="notice-icon" />
              <div className="notice-text">
                <h4>Emergency Notice</h4>
                <p>If you are experiencing a life-threatening emergency, please call 911 immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapy Dog Programs */}
      <section className="therapy-programs">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Therapy Dog Programs</h2>
            <p className="hero-subtitle">
              Our specially trained labradoodles work throughout the community to provide comfort, support, and healing through the human-animal bond.
            </p>
          </div>

          <div className="programs-grid">
            {therapyDogPrograms.map((program) => (
              <div key={program.id} className="program-card hover-lift">
                <div className="program-icon">
                  {program.icon}
                </div>
                <h3 className="program-title">{program.title}</h3>
                <p className="program-description">{program.description}</p>
                <div className="program-impact">
                  <Award className="impact-icon" />
                  <span>{program.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lo and Lady Labs Donation Section */}
      <section className="lab-donation-section">
        <div className="container">
          <div className="lab-donation-content">
            <div className="lab-donation-header">
              <Heart className="lab-donation-icon" />
              <h2 className="section-title">Support Lo and Lady Labs</h2>
              <p className="section-subtitle">
                Your donation directly supports our mission of training therapy labradoodles and providing mental health resources to our community.
              </p>
            </div>

            <div className="lab-donation-features">
              <div className="donation-feature">
                <Users className="feature-icon" />
                <h3>Therapy Dog Training</h3>
                <p>Fund the training and certification of therapy labradoodles</p>
              </div>
              <div className="donation-feature">
                <Heart className="feature-icon" />
                <h3>Community Programs</h3>
                <p>Support visits to hospitals, schools, and senior centers</p>
              </div>
              <div className="donation-feature">
                <Star className="feature-icon" />
                <h3>Mental Health Initiatives</h3>
                <p>Help expand our mental health awareness programs</p>
              </div>
            </div>

            <div className="lab-donation-cta">
              <Button
                variant="primary"
                size="large"
                onClick={() => setIsDonationModalOpen(true)}
                className="donate-to-lab-button"
              >
                <Heart className="button-icon" />
                Donate to Lo and Lady Labs
              </Button>
              <p className="donation-note">
                Secure payments powered by Stripe • Tax-deductible donations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* External Donation Section */}
      <section className="donation-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Support Mental Health Organizations</h2>
            <p className="hero-subtitle">
              In addition to supporting our work, consider donating to these important mental health organizations.
            </p>
          </div>
          <DonationWidget 
            variant="featured" 
            showTitle={false}
            backgroundColor="default"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="support-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Get Involved in Mental Health Support</h2>
            <p className="cta-description">
              Whether you're interested in therapy dog training, volunteering, or learning more about mental health resources, 
              we're here to help you make a difference in your community.
            </p>
            <div className="cta-buttons">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => window.location.href = '/contact'}
                className="btn-hover-glow"
              >
                Contact Us About Programs
              </Button>
              <Button 
                variant="outline" 
                size="large"
                onClick={() => window.location.href = '/about'}
                className="secondary-cta"
              >
                Learn About Our Mission
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onSuccess={handleDonationSuccess}
      />
    </div>
  )
}

export default Support