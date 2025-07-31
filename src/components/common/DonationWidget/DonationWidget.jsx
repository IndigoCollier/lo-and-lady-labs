import React, { useState, useEffect } from 'react'
import { Heart, ExternalLink, Target, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../Button'
import './DonationWidget.css'

const mentalHealthOrganizations = [
  {
    id: 1,
    name: "NAMI (National Alliance on Mental Illness)",
    description: "Leading grassroots mental health organization providing education, support, and advocacy.",
    website: "https://nami.org",
    donateUrl: "https://nami.org/Get-Involved/Donate",
    focus: "Mental health education and support",
    impact: "Serves millions of people affected by mental illness"
  },
  {
    id: 2,
    name: "Crisis Text Line",
    description: "Free, 24/7 crisis support via text message for people in crisis.",
    website: "https://crisistextline.org",
    donateUrl: "https://crisistextline.org/donate/",
    focus: "Crisis intervention and support",
    impact: "Text HOME to 741741 for immediate help"
  },
  {
    id: 3,
    name: "Mental Health America",
    description: "Leading community-based nonprofit addressing mental health needs across America.",
    website: "https://mhanational.org",
    donateUrl: "https://give.mhanational.org/",
    focus: "Mental health advocacy and resources",
    impact: "Reaches over 10 million people annually"
  },
{
  id: 4,
  name: "Postpartum Support International",
  description: "Dedicated to helping families suffering from postpartum depression, anxiety, and distress.",
  website: "https://postpartum.net/",
  donateUrl: "https://postpartum.net/join-us/donate/",
  focus: "Support for Women experiencing symptoms of Postpartum Depression, anxiety, and distress",
  impact: "Receives more than 100,000 visitors a year who seek PSI for support, education and local resource information."
}
]

function DonationWidget({ 
  variant = 'compact', // 'compact' | 'expanded' | 'featured'
  showTitle = true,
  className = '',
  backgroundColor = 'default'
}) {
  const [selectedOrg, setSelectedOrg] = useState(mentalHealthOrganizations[0])
  const [showAllOrgs, setShowAllOrgs] = useState(false)
  const [currentOrgIndex, setCurrentOrgIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const handleDonate = (donateUrl) => {
    window.open(donateUrl, '_blank', 'noopener,noreferrer')
  }

  const handleLearnMore = (website) => {
    window.open(website, '_blank', 'noopener,noreferrer')
  }

  const nextOrg = () => {
    setCurrentOrgIndex((prev) => (prev + 1) % mentalHealthOrganizations.length)
    setIsAutoScrolling(false) // Stop auto-scroll when user manually navigates
  }

  const prevOrg = () => {
    setCurrentOrgIndex((prev) => (prev - 1 + mentalHealthOrganizations.length) % mentalHealthOrganizations.length)
    setIsAutoScrolling(false) // Stop auto-scroll when user manually navigates
  }

  const goToOrg = (index) => {
    setCurrentOrgIndex(index)
    setIsAutoScrolling(false) // Stop auto-scroll when user manually navigates
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || isHovered) return

    const interval = setInterval(() => {
      setCurrentOrgIndex((prev) => (prev + 1) % mentalHealthOrganizations.length)
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoScrolling, isHovered])

  // Resume auto-scroll after 10 seconds of inactivity
  useEffect(() => {
    if (isAutoScrolling) return

    const timeout = setTimeout(() => {
      setIsAutoScrolling(true)
    }, 10000) // Resume after 10 seconds

    return () => clearTimeout(timeout)
  }, [isAutoScrolling, currentOrgIndex])

  if (variant === 'compact') {
    return (
      <div className={`donation-widget compact ${backgroundColor} ${className}`}>
        <div className="widget-header">
          <Heart className="widget-icon" />
          {showTitle && <h3 className="widget-title">Supporting Mental Health</h3>}
        </div>
        
        <p className="widget-description">
          Help support mental health awareness and resources in our community.
        </p>
        
        <div className="quick-donate">
          <Button
            variant="primary"
            size="medium"
            onClick={() => handleDonate(selectedOrg.donateUrl)}
            className="donate-button"
          >
            <Heart className="button-icon" />
            Donate to {selectedOrg.name}
          </Button>
        </div>
      </div>
    )
  }

  if (variant === 'expanded') {
    return (
      <div className={`donation-widget expanded ${backgroundColor} ${className}`}>
        {showTitle && (
          <div className="widget-header">
            <Heart className="widget-icon" />
            <h3 className="widget-title">Mental Health Support</h3>
          </div>
        )}
        
        <div className="organization-selector">
          <h4>Choose an Organization:</h4>
          <div className="org-tabs">
            {mentalHealthOrganizations.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrg(org)}
                className={`org-tab ${selectedOrg.id === org.id ? 'active' : ''}`}
              >
                {org.name}
              </button>
            ))}
          </div>
        </div>

        <div className="selected-org">
          <h4 className="org-name">{selectedOrg.name}</h4>
          <p className="org-description">{selectedOrg.description}</p>
          
          <div className="org-details">
            <div className="detail-item">
              <Target className="detail-icon" />
              <span>{selectedOrg.focus}</span>
            </div>
            <div className="detail-item">
              <Users className="detail-icon" />
              <span>{selectedOrg.impact}</span>
            </div>
          </div>

          <div className="org-actions">
            <Button
              variant="primary"
              size="large"
              onClick={() => handleDonate(selectedOrg.donateUrl)}
              className="donate-button"
            >
              <Heart className="button-icon" />
              Donate Now
            </Button>
            <Button
              variant="outline"
              size="large"
              onClick={() => handleLearnMore(selectedOrg.website)}
              className="learn-more-button"
            >
              <ExternalLink className="button-icon" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Featured variant
  return (
    <div className={`donation-widget featured ${backgroundColor} ${className}`}>
      <div className="featured-header">
        <div className="header-content">
          <Heart className="featured-icon" />
          <div className="header-text">
            <h2 className="featured-title">Mental Health Matters</h2>
            <p className="featured-subtitle">
              Together with therapy dogs, we're supporting mental health awareness and resources
            </p>
          </div>
        </div>
      </div>

      <div className="featured-content">
        <div className="therapy-connection">
          <div className="connection-item">
            <Star className="connection-icon" />
            <h4>Therapy Dog Training</h4>
            <p>Our labradoodles are often selected for therapy work due to their gentle temperaments</p>
          </div>
          <div className="connection-item">
            <Users className="connection-icon" />
            <h4>Community Support</h4>
            <p>We partner with local mental health organizations to provide emotional support</p>
          </div>
          <div className="connection-item">
            <Heart className="connection-icon" />
            <h4>Making a Difference</h4>
            <p>Every donation helps provide crucial mental health resources and support</p>
          </div>
        </div>

        <div className="featured-organizations">
          <h3>Support These Important Organizations:</h3>
          <div 
            className="org-carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button 
              className="carousel-nav prev" 
              onClick={prevOrg}
              aria-label="Previous organization"
            >
              <ChevronLeft />
            </button>
            
            <div className="carousel-container">
              <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentOrgIndex * 100}%)` }}
              >
                {mentalHealthOrganizations.map((org, index) => (
                  <div key={org.id} className="org-card">
                    <h4 className="card-org-name">{org.name}</h4>
                    <p className="card-org-description">{org.description}</p>
                    <div className="org-details">
                      <div className="detail-item">
                        <Target className="detail-icon" />
                        <span>{org.focus}</span>
                      </div>
                      <div className="detail-item">
                        <Users className="detail-icon" />
                        <span>{org.impact}</span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <Button
                        variant="primary"
                        size="medium"
                        onClick={() => handleDonate(org.donateUrl)}
                        className="card-donate-button"
                      >
                        <Heart className="button-icon" />
                        Donate
                      </Button>
                      <Button
                        variant="outline"
                        size="medium"
                        onClick={() => handleLearnMore(org.website)}
                        className="card-learn-button"
                      >
                        <ExternalLink className="button-icon" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="carousel-nav next" 
              onClick={nextOrg}
              aria-label="Next organization"
            >
              <ChevronRight />
            </button>
          </div>
          
          <div className="carousel-dots">
            {mentalHealthOrganizations.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentOrgIndex ? 'active' : ''}`}
                onClick={() => goToOrg(index)}
                aria-label={`Go to organization ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationWidget