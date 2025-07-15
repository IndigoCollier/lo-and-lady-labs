import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Calendar, 
  Award,
  Users,
  Home,
  Activity,
  Scissors,
  BookOpen,
  Shield,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import PhotoGallery from '../../components/puppies/PhotoGallery'
import PuppyInquiryForm from '../../components/forms/PuppyInquiryForm'
import Button from '../../components/common/Button'
import { getPuppyById, getRelatedPuppies, formatPrice } from '../../data/mockPuppies'
import './PuppyDetail.css'

function PuppyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [puppy, setPuppy] = useState(null)
  const [relatedPuppies, setRelatedPuppies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showInquiryModal, setShowInquiryModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const loadPuppy = async () => {
      try {
        setLoading(true)
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const foundPuppy = getPuppyById(id)
        
        if (!foundPuppy) {
          setError('Puppy not found')
          return
        }
        
        setPuppy(foundPuppy)
        setRelatedPuppies(getRelatedPuppies(foundPuppy, 3))
        
        // Check if puppy is in favorites (from localStorage)
        const favorites = JSON.parse(localStorage.getItem('favoritePuppies') || '[]')
        setIsFavorite(favorites.includes(foundPuppy.id))
        
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadPuppy()
    }
  }, [id])

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favoritePuppies') || '[]')
    
    if (isFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter(fav => fav !== puppy.id)
      localStorage.setItem('favoritePuppies', JSON.stringify(newFavorites))
      setIsFavorite(false)
    } else {
      // Add to favorites
      const newFavorites = [...favorites, puppy.id]
      localStorage.setItem('favoritePuppies', JSON.stringify(newFavorites))
      setIsFavorite(true)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Meet ${puppy.name} - Lo and Lady Labs`,
          text: puppy.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleInquire = () => {
    setShowInquiryModal(true)
  }

  const handleInquirySuccess = () => {
    setShowInquiryModal(false)
    alert('Thank you for your inquiry! We\'ll be in touch soon.')
  }

  const goBack = () => {
    navigate('/puppies')
  }

  if (loading) {
    return (
      <div className="puppy-detail-page">
        <div className="container">
          <div className="loading-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-content">
              <div className="skeleton-image"></div>
              <div className="skeleton-info">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !puppy) {
    return (
      <div className="puppy-detail-page">
        <div className="container">
          <div className="error-state">
            <h2>Puppy Not Found</h2>
            <p>Sorry, we couldn't find the puppy you're looking for.</p>
            <Button variant="primary" onClick={goBack}>
              Back to Puppies
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="puppy-detail-page">
      <div className="container">
        {/* Header with Back Button */}
        <div className="page-header">
          <button onClick={goBack} className="back-button">
            <ArrowLeft />
            Back to Puppies
          </button>
          
          <div className="header-actions">
            <button 
              onClick={handleFavoriteToggle}
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
            >
              <Heart className={isFavorite ? 'filled' : ''} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
            
            <button onClick={handleShare} className="share-button">
              <Share2 />
              Share
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="puppy-detail-content">
          {/* Left Column - Photos */}
          <div className="photo-section">
            <PhotoGallery 
              puppy={puppy}
              images={puppy.galleryImages}
              showThumbnails={true}
              allowZoom={true}
            />
          </div>

          {/* Right Column - Puppy Info */}
          <div className="info-section">
            <div className="puppy-header">
              <div className="puppy-title">
                <h1>{puppy.name}</h1>
                <div className="puppy-badges">
                  <span className={`availability-badge ${puppy.available ? 'available' : 'pending'}`}>
                    {puppy.available ? 'Available' : 'Pending'}
                  </span>
                  <span className="gender-badge">{puppy.gender}</span>
                </div>
              </div>
              
              <div className="puppy-price">
                {formatPrice(puppy.price)}
              </div>
            </div>

            <div className="puppy-summary">
              <div className="summary-item">
                <span className="label">Age:</span>
                <span className="value">{puppy.age}</span>
              </div>
              <div className="summary-item">
                <span className="label">Color:</span>
                <span className="value">{puppy.color}</span>
              </div>
              <div className="summary-item">
                <span className="label">Size:</span>
                <span className="value">{puppy.size}</span>
              </div>
              <div className="summary-item">
                <span className="label">Temperament:</span>
                <span className="value">{puppy.temperament}</span>
              </div>
            </div>

            <div className="puppy-description">
              <p>{puppy.detailedDescription || puppy.description}</p>
            </div>

            <div className="personality-tags">
              <h4>Personality Traits</h4>
              <div className="tags">
                {puppy.personality.map((trait, index) => (
                  <span key={index} className="personality-tag">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="ready-date">
              <Calendar className="icon" />
              <span>Ready for new home: <strong>{puppy.readyDate}</strong></span>
            </div>

            {puppy.available && (
              <div className="action-buttons">
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={handleInquire}
                  className="inquire-button"
                >
                  Inquire About {puppy.name}
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={() => navigate('/contact')}
                >
                  Contact Breeder
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Information Sections */}
        <div className="detail-sections">
          {/* Health & Care */}
          <div className="detail-card">
            <div className="card-header">
              <Shield className="icon" />
              <h3>Health & Care Information</h3>
            </div>
            <div className="card-content">
              <div className="info-grid">
                <div className="info-item">
                  <Award className="item-icon" />
                  <div>
                    <h4>Health Testing</h4>
                    <ul>
                      {puppy.healthTesting.map((test, index) => (
                        <li key={index}>{test}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="info-item">
                  <Activity className="item-icon" />
                  <div>
                    <h4>Care Details</h4>
                    <p><strong>Vaccinations:</strong> {puppy.vaccinations}</p>
                    <p><strong>Microchipped:</strong> {puppy.microchipped ? 'Yes' : 'No'}</p>
                    <p><strong>Energy Level:</strong> {puppy.energyLevel}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <Scissors className="item-icon" />
                  <div>
                    <h4>Grooming</h4>
                    <p>{puppy.groomingNeeds}</p>
                    <p><strong>Coat Type:</strong> {puppy.coatType}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <BookOpen className="item-icon" />
                  <div>
                    <h4>Training</h4>
                    <p><strong>Level:</strong> {puppy.trainingLevel}</p>
                    <p><strong>Exercise Needs:</strong> {puppy.exerciseNeeds}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="detail-card">
            <div className="card-header">
              <Users className="icon" />
              <h3>Perfect For</h3>
            </div>
            <div className="card-content">
              <div className="good-with-tags">
                {puppy.goodWith.map((item, index) => (
                  <span key={index} className="good-with-tag">
                    {item}
                  </span>
                ))}
              </div>
              {puppy.specialNeeds && (
                <div className="special-needs">
                  <h4>Special Considerations</h4>
                  <p>{puppy.specialNeeds}</p>
                </div>
              )}
            </div>
          </div>

          {/* Parent Information */}
          <div className="detail-card">
            <div className="card-header">
              <Home className="icon" />
              <h3>Parent Information</h3>
            </div>
            <div className="card-content">
              <div className="parents-info">
                <div className="parent">
                  <h4>Mother (Dam)</h4>
                  <p>{puppy.parents.mother}</p>
                </div>
                <div className="parent">
                  <h4>Father (Sire)</h4>
                  <p>{puppy.parents.father}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="contact-section">
          <div className="contact-card">
            <h3>Questions About {puppy.name}?</h3>
            <p>Our team is here to help you learn more about this special puppy.</p>
            <div className="contact-methods">
              <div className="contact-method">
                <Phone className="icon" />
                <div>
                  <strong>Call Us</strong>
                  <p>(901) 123-4567</p>
                </div>
              </div>
              <div className="contact-method">
                <Mail className="icon" />
                <div>
                  <strong>Email</strong>
                  <p>hello@loandladylabs.com</p>
                </div>
              </div>
              <div className="contact-method">
                <MapPin className="icon" />
                <div>
                  <strong>Visit</strong>
                  <p>Memphis, TN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Puppies */}
        {relatedPuppies.length > 0 && (
          <div className="related-section">
            <h3>Other Available Puppies</h3>
            <div className="related-puppies">
              {relatedPuppies.map(relatedPuppy => (
                <div key={relatedPuppy.id} className="related-puppy-card">
                  <img 
                    src={relatedPuppy.image} 
                    alt={relatedPuppy.name}
                    onClick={() => navigate(`/puppies/${relatedPuppy.id}`)}
                  />
                  <div className="related-puppy-info">
                    <h4>{relatedPuppy.name}</h4>
                    <p>{relatedPuppy.age} • {relatedPuppy.gender}</p>
                    <p className="related-puppy-price">{formatPrice(relatedPuppy.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <PuppyInquiryForm
        puppy={puppy}
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        onSuccess={handleInquirySuccess}
      />
    </div>
  )
}

export default PuppyDetail