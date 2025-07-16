import React from 'react'
import { Heart, Award, Users, Shield } from 'lucide-react'
import TestimonialSection from '../../components/home/TestimonialSection'
import AdoptionProcess from '../../components/about/AdoptionProcess'
import TeamSection from '../../components/about/TeamSection'
import Button from '../../components/common/Button'
import { getAdoptionSteps } from '../../data/adoptionProcess'
import { getTeamMembers, getBreedingPhilosophy } from '../../data/teamInfo'
import './About.css'

function About() {
  const adoptionSteps = getAdoptionSteps()
  const teamMembers = getTeamMembers()
  const breedingPhilosophy = getBreedingPhilosophy()

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">About Lo and Lady Labs</h1>
              <p className="hero-subtitle">
                Dedicated to breeding exceptional labradoodles with love, care, and unwavering commitment to health and temperament
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Happy Families</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Health Guarantee</div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="/images/about/hero-image.jpg" 
                alt="Lo and Lady Labs - Happy labradoodle family"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="hero-placeholder" style={{ display: 'none' }}>
                <Heart className="placeholder-icon" />
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-icon">
              <Heart className="icon" />
            </div>
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-text">
              At Lo and Lady Labs, we believe every family deserves a healthy, well-socialized, and loving companion. 
              We are committed to ethical breeding practices, comprehensive health testing, and providing lifelong support 
              to ensure the best possible outcomes for both our puppies and their new families.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Lo and Lady Labs?</h2>
            <p className="section-subtitle">
              What sets us apart in the world of labradoodle breeding
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Shield />
              </div>
              <h3 className="feature-title">Health First</h3>
              <p className="feature-description">
                All breeding dogs undergo comprehensive health testing including hip, elbow, eye, and genetic screenings 
                to ensure the healthiest puppies possible.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Heart />
              </div>
              <h3 className="feature-title">Early Socialization</h3>
              <p className="feature-description">
                Our puppies are raised in a home environment with extensive socialization to children, adults, and other pets 
                from birth to 8 weeks.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>
              <h3 className="feature-title">Perfect Matching</h3>
              <p className="feature-description">
                We carefully match each puppy's temperament with the right family based on lifestyle, experience, and preferences.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Award />
              </div>
              <h3 className="feature-title">Lifetime Support</h3>
              <p className="feature-description">
                We provide ongoing support and guidance throughout your dog's life, including training resources and health advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adoption Process */}
      <AdoptionProcess steps={adoptionSteps} />

      {/* Team Section */}
      <TeamSection teamMembers={teamMembers} breedingPhilosophy={breedingPhilosophy} />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Find Your Perfect Companion?</h2>
            <p className="cta-description">
              Join the hundreds of families who have found their perfect labradoodle through Lo and Lady Labs. 
              Our team is here to guide you through every step of the journey.
            </p>
            <div className="cta-buttons">
              <Button variant="primary" size="large" onClick={() => window.location.href = '/puppies'}>
                View Available Puppies
              </Button>
              <Button variant="secondary" size="large" onClick={() => window.location.href = '/contact'}>
                Contact Us Today
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About