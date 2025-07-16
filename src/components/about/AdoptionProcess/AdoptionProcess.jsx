import React, { useState } from 'react'
import { 
  MessageCircle, 
  FileText, 
  CreditCard, 
  Heart, 
  Calendar, 
  Home,
  CheckCircle,
  Clock
} from 'lucide-react'
import './AdoptionProcess.css'

const iconMap = {
  MessageCircle,
  FileText,
  CreditCard,
  Heart,
  Calendar,
  Home
}

function AdoptionProcess({ steps }) {
  const [activeStep, setActiveStep] = useState(null)
  const [expandedStep, setExpandedStep] = useState(null)

  const handleStepClick = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const handleStepHover = (stepId) => {
    setActiveStep(stepId)
  }

  const handleStepLeave = () => {
    setActiveStep(null)
  }

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || MessageCircle
    return <IconComponent />
  }

  return (
    <div className="adoption-process">
      <div className="process-header">
        <h2 className="process-title">Our Adoption Process</h2>
        <p className="process-subtitle">
          We believe in finding the perfect match between families and puppies. 
          Our thorough process ensures the best outcome for everyone involved.
        </p>
      </div>

      <div className="process-timeline">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`process-step ${activeStep === step.id ? 'active' : ''} ${expandedStep === step.id ? 'expanded' : ''}`}
            onMouseEnter={() => handleStepHover(step.id)}
            onMouseLeave={handleStepLeave}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="step-connector">
              {index < steps.length - 1 && <div className="connector-line" />}
            </div>

            <div className="step-content">
              <div className="step-header">
                <div className="step-icon">
                  {getIcon(step.icon)}
                </div>
                <div className="step-info">
                  <div className="step-number">Step {step.stepNumber}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-subtitle">{step.subtitle}</p>
                </div>
                <div className="step-timing">
                  <Clock className="timing-icon" />
                  <span className="timing-text">{step.estimatedTime}</span>
                </div>
              </div>

              <div className="step-description">
                <p>{step.description}</p>
              </div>

              <div className="step-details">
                <h4>What's Included:</h4>
                <ul className="details-list">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="detail-item">
                      <CheckCircle className="check-icon" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="process-footer">
        <div className="footer-content">
          <h3>Ready to Start Your Journey?</h3>
          <p>
            Our team is here to guide you through every step of the adoption process. 
            We're committed to finding the perfect match for your family.
          </p>
          <div className="footer-actions">
            <a href="/contact" className="cta-button primary">
              Start Your Application
            </a>
            <a href="/puppies" className="cta-button secondary">
              View Available Puppies
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdoptionProcess