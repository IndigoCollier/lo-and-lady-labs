import PuppyInquiryForm from '../../forms/PuppyInquiryForm'
import React, { useState } from 'react'
import { Calendar, Award, MapPin } from 'lucide-react'
import FavoriteButton from '../FavoriteButton'
import AdoptionStatus from '../AdoptionStatus'
import Button from '../../common/Button'
import { formatPrice } from '../../../data/mockPuppies'
import './PuppyCard.css'


function PuppyCard({ 
  puppy, 
  onViewDetails, 
  onToggleFavorite, 
  isFavorite = false,
  size = 'standard'
}) {

  const [showInquiryModal, setShowInquiryModal] = useState(false)

  const handleInquireClick = (e) => {
  e.stopPropagation() // Prevent card click event
  setShowInquiryModal(true)
}

  const handleInquirySuccess = (formData) => {
  console.log('Inquiry submitted for:', puppy.name, formData)
  setShowInquiryModal(false)
  // You could show a toast notification here
}
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(puppy.id)
    }
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    if (onToggleFavorite) {
      onToggleFavorite(puppy.id)
    }
  }

  return (
    <div className={`puppy-card ${size}`} onClick={handleCardClick}>
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
              src={puppy.image}
              alt={`${puppy.name} - ${puppy.color} labradoodle`}
              className={`puppy-image ${imageLoaded ? 'loaded' : 'loading'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
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
          {puppy.personality.slice(0, 3).map((trait, index) => (
            <span key={index} className="personality-tag">{trait}</span>
          ))}
        </div>

        <div className="puppy-ready-date">
          <Calendar className="calendar-icon" />
          <span>Ready: {puppy.readyDate}</span>
        </div>

        <div className="puppy-location">
          <MapPin className="location-icon" />
          <span>Memphis, TN</span>
        </div>

        <Button
          variant="primary"
          size="medium"
          onClick={handleCardClick}
          className="puppy-cta"
        >
          Meet {puppy.name}
        </Button>

        <Button 
          variant="primary" 
          size="medium"
          onClick={handleInquireClick}
          className="inquire-button"
        >
          Inquire About {puppy.name}
        </Button>
      </div>

      <PuppyInquiryForm
        puppy={puppy}
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        onSuccess={handleInquirySuccess}
      />
    </div>
  )
}

export default PuppyCard