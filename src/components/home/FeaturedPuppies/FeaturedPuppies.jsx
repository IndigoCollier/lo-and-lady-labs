import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown, Star, Calendar, Award } from 'lucide-react'
import Button from '../../common/Button'
import FavoriteButton from '../../puppies/FavoriteButton'
import { getFeaturedPuppies, formatPrice } from '../../../data/mockPuppies'
import { getImagePath } from '../../../utils/imageHelpers'
import { useFavorites } from '../../../hooks/useFavorites'
import './FeaturedPuppies.css'

function FeaturedPuppies() {
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()
  const featuredPuppies = getFeaturedPuppies(3)

  // Navigate to individual puppy detail page
  const handlePuppyClick = (puppyId) => {
    navigate(`/puppies/${puppyId}`)
  }

  // Navigate to main puppies page
  const handleViewAllPuppies = () => {
    navigate('/puppies')
  }

  // Handle favorite toggle
  const handleFavoriteClick = (puppyId) => {
    toggleFavorite(puppyId)
  }

  return (
    <section className="featured-puppies">
      <div className="container">
        <div className="section-header">
          <Crown className="section-icon" />
          <h2 className="section-title">Meet Our Available Puppies</h2>
          <p className="hero-subtitle">
            Each puppy is lovingly raised and ready for their forever home
          </p>
        </div>

        <div className="puppies-grid">
          {featuredPuppies.map((puppy) => (
            <div key={puppy.id} className="puppy-card">
              <div className="puppy-image-container">
                <img 
                  src={getImagePath(puppy.image)} 
                  alt={puppy.name} 
                  className="puppy-image"
                  onClick={() => handlePuppyClick(puppy.id)}
                  style={{ cursor: 'pointer' }}
                />
                
                <div className="available-badge">
                  <Star className="badge-icon" />
                  Available
                </div>
                
                <FavoriteButton
                  isActive={isFavorite(puppy.id)}
                  onClick={() => handleFavoriteClick(puppy.id)}
                  puppyName={puppy.name}
                  size="medium"
                />
              </div>

              <div className="puppy-info">
                <h3 className="puppy-name">{puppy.name}</h3>
                
                <div className="puppy-details">
                  <div className="detail-item">
                    <span className="detail-label">Age:</span>
                    <span className="detail-value">{puppy.age}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Gender:</span>
                    <span className="detail-value">{puppy.gender}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Color:</span>
                    <span className="detail-value">{puppy.color}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Size:</span>
                    <span className="detail-value">{puppy.size.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="personality-tags">
                  {puppy.personality.slice(0, 2).map((trait, index) => (
                    <span key={index} className="personality-tag">{trait}</span>
                  ))}
                </div>

                <div className="ready-date">
                  <Calendar className="calendar-icon" />
                  <span>Ready: {puppy.readyDate}</span>
                </div>

                <div className="puppy-price">{formatPrice(puppy.price)}</div>

                <div className="health-badge">
                  <Award className="health-icon" />
                  <span>Health Tested Parents</span>
                </div>

                {/* Updated to use Button component and proper navigation */}
                <Button 
                  variant="primary" 
                  size="medium"
                  className="puppy-cta"
                  onClick={() => handlePuppyClick(puppy.id)}
                >
                  Meet {puppy.name}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          {/* Updated to use Button component */}
          <Button 
            variant="secondary" 
            size="large"
            onClick={handleViewAllPuppies}
          >
            View All Available Puppies
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPuppies