import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Award, MapPin, Heart, Eye } from 'lucide-react'
import FavoriteButton from '../FavoriteButton'
import AdoptionStatus from '../AdoptionStatus'
import Button from '../../common/Button'
import PuppyInquiryForm from '../../forms/PuppyInquiryForm'
import { formatPrice } from '../../../data/mockPuppies'
import { getImagePath } from '../../../utils/imageHelpers'
import './PuppyCard.css'

function PuppyCard({ 
  puppy, 
  onViewDetails, 
  onToggleFavorite, 
  isFavorite = false,
  size = 'standard',
  showDetails = true,
  showInquireButton = true,
  className = ''
}) {
  const navigate = useNavigate()
  const [showInquiryModal, setShowInquiryModal] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Navigation handlers
  const handleCardClick = (e) => {
    // Don't navigate if clicking on interactive elements
    if (e.target.closest('button') || e.target.closest('.favorite-button')) {
      return
    }
    navigate(`/puppies/${puppy.id}`)
  }

  const handleViewDetails = (e) => {
    e.stopPropagation()
    navigate(`/puppies/${puppy.id}`)
  }

  const handleInquireClick = (e) => {
    e.stopPropagation()
    setShowInquiryModal(true)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    if (onToggleFavorite) {
      onToggleFavorite(puppy.id)
    }
  }

  const handleInquirySuccess = (formData) => {
    console.log('Inquiry submitted for:', puppy.name, formData)
    setShowInquiryModal(false)
  }

  // Image handlers
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <>
      <div 
        className={`puppy-card ${size} ${className}`} 
        onClick={handleCardClick}
      >
        <div className="puppy-image-container">
          <div className="image-wrapper">
            {!imageLoaded && (
              <div className="image-placeholder">
                <div className="placeholder-shimmer"></div>
                <div className="placeholder-content">
                  <div className="placeholder-icon">🐕</div>
                  <span className="placeholder-text">Loading...</span>
                </div>
              </div>
            )}
            
            {imageError ? (
              <div className="image-error">
                <div className="error-icon">📷</div>
                <span className="error-text">Photo Coming Soon</span>
              </div>
            ) : (
              <img
                src={getImagePath(puppy.image)}
                alt={`${puppy.name} - ${puppy.color} labradoodle`}
                className={`puppy-image ${imageLoaded ? 'loaded' : 'loading'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>

          {/* Image Overlay for Desktop Hover */}
          <div className="image-overlay">
            <button
              onClick={handleViewDetails}
              className="view-details-btn"
              aria-label={`View details for ${puppy.name}`}
            >
              <Eye />
              View Details
            </button>
          </div>

          <div className="card-badges">
            <AdoptionStatus status={puppy.available ? 'available' : 'pending'} />
            {puppy.microchipped && (
              <div className="feature-badge">
                <Award className="badge-icon" />
                <span>Microchipped</span>
              </div>
            )}
          </div>

          <FavoriteButton
            isActive={isFavorite}
            onClick={handleFavoriteClick}
            puppyName={puppy.name}
          />
        </div>

        <div className="puppy-info">
          <div className="puppy-header">
            <h3 className="puppy-name">{puppy.name}</h3>
            <div className="puppy-price">{formatPrice(puppy.price)}</div>
          </div>
          
          {showDetails && (
            <>
              <div className="puppy-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Age</span>
                    <span className="detail-value">{puppy.age}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Gender</span>
                    <span className="detail-value">{puppy.gender}</span>
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Color</span>
                    <span className="detail-value">{puppy.color}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Size</span>
                    <span className="detail-value">{puppy.size.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="puppy-temperament">
                <span className="temperament-label">Temperament:</span>
                <span className="temperament-value">{puppy.temperament}</span>
              </div>

              <div className="puppy-personality">
                {puppy.personality.slice(0, 2).map((trait, index) => (
                  <span key={index} className="personality-tag">{trait}</span>
                ))}
                {puppy.personality.length > 2 && (
                  <span className="personality-more">+{puppy.personality.length - 2} more</span>
                )}
              </div>

              <div className="puppy-ready-date">
                <Calendar className="calendar-icon" />
                <span>Ready: {puppy.readyDate}</span>
              </div>

              <div className="puppy-location">
                <MapPin className="location-icon" />
                <span>Memphis, TN</span>
              </div>
            </>
          )}

          {/* Action Buttons */}
          {showInquireButton && puppy.available && (
            <div className="card-actions">
              <Button
                variant="primary"
                size="medium"
                onClick={handleViewDetails}
                className="puppy-cta"
              >
                Meet {puppy.name}
              </Button>
              
              <Button 
                variant="outline" 
                size="medium"
                onClick={handleInquireClick}
                className="inquire-button"
              >
                Inquire About {puppy.name}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Modal */}
      <PuppyInquiryForm
        puppy={puppy}
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        onSuccess={handleInquirySuccess}
      />
    </>
  )
}

export default PuppyCard