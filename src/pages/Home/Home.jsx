import { useNavigate } from 'react-router-dom'
import HeroCarousel from '../../components/home/HeroCarousel'
import FeaturedPuppies from '../../components/home/FeaturedPuppies'
import TestimonialSection from '../../components/home/TestimonialSection'
import QuickSearch from '../../components/home/QuickSearch'
import Button from '../../components/common/Button'
import { Crown, Award, Heart, Users } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [featuresRef, featuresVisible] = useScrollAnimation()
  const [searchRef, searchVisible] = useScrollAnimation()
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation()
  const [ctaRef, ctaVisible] = useScrollAnimation()

  // SAFE: Simple navigation function with URL parameters
  const goToPuppiesWithFilter = (filterType, filterValue) => {
    navigate(`/puppies?${filterType}=${filterValue}`)
  }

  // FIXED: Navigate to puppies page
  const goToPuppies = () => {
    navigate('/puppies')
  }

  const goToContact = () => {
    navigate('/contact')
  }

  return (
    <div className="home-page page-enter">
      <HeroCarousel />
      <FeaturedPuppies />
      
      <section 
        ref={featuresRef}
        className={`why-choose-section ${featuresVisible ? 'animate-fade-in-up' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <Crown className="section-icon" />
            <h2 className="section-title">Why Choose Lo and Lady Labs?</h2>
            <p className="section-subtitle">
              We're committed to raising healthy, happy labradoodles with exceptional care
            </p>
          </div>
          
          {/* UPDATED: 4 columns layout */}
          <div className={`features-grid features-grid-4 ${featuresVisible ? 'animate-stagger-children' : ''}`}>
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <Award />
              </div>
              <h3 className="feature-title">Premium Breeding</h3>
              <p className="feature-description">
                Health tested parents, champion bloodlines, and exceptional care standards for every puppy.
              </p>
            </div>
            
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <Heart />
              </div>
              <h3 className="feature-title">Family Raised</h3>
              <p className="feature-description">
                Every puppy is raised in our home with love, socialization, and individual attention from day one.
              </p>
            </div>
            
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <Users />
              </div>
              <h3 className="feature-title">Perfect Match</h3>
              <p className="feature-description">
                We carefully match each puppy to the right family based on lifestyle, experience, and needs.
              </p>
            </div>
            
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <Crown />
              </div>
              <h3 className="feature-title">Lifetime Support</h3>
              <p className="feature-description">
                Comprehensive support throughout your puppy's life with training resources, guidance, and care tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UPDATED: Filter Section with Better Colors */}
      <section className="quick-filter-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Find Your Perfect Match</h2>
            <p className="section-subtitle">
              Use our quick filters to find puppies that match your preferences
            </p>
          </div>
          
          {/* UPDATED: 4 columns layout with website-matching colors */}
          <div className="quick-filter-grid quick-filter-grid-4">
            <Button
              variant="primary"
              size="large"
              className="filter-button male-filter-new"
              onClick={() => goToPuppiesWithFilter('gender', 'male')}
            >
              <span className="filter-icon">🐕</span>
              <span className="filter-text">
                <strong>Male Puppies</strong>
                <small>Energetic & Loyal</small>
              </span>
            </Button>
            
            <Button
              variant="primary"
              size="large"
              className="filter-button female-filter-new"
              onClick={() => goToPuppiesWithFilter('gender', 'female')}
            >
              <span className="filter-icon">🐕</span>
              <span className="filter-text">
                <strong>Female Puppies</strong>
                <small>Gentle & Loving</small>
              </span>
            </Button>
            
            <Button
              variant="secondary"
              size="large"
              className="filter-button available-filter-new"
              onClick={() => goToPuppiesWithFilter('status', 'available')}
            >
              <span className="filter-icon">✅</span>
              <span className="filter-text">
                <strong>Available Now</strong>
                <small>Ready for their new home</small>
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="large"
              className="filter-button price-filter-new"
              onClick={() => goToPuppiesWithFilter('sort', 'price')}
            >
              <span className="filter-icon">💰</span>
              <span className="filter-text">
                <strong>Sort by Price</strong>
                <small>Low to high pricing</small>
              </span>
            </Button>
          </div>
        </div>
      </section>

      <div 
        ref={searchRef}
        className={searchVisible ? 'animate-fade-in-up' : ''}
      >
        <QuickSearch />
      </div>
      
      <div 
        ref={testimonialsRef}
        className={testimonialsVisible ? 'animate-fade-in-up' : ''}
      >
        <TestimonialSection />
      </div>
      
      <section 
        ref={ctaRef}
        className={`cta-section ${ctaVisible ? 'animate-fade-in-up' : ''}`}
      >
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Find Your New Best Friend?</h2>
            <p className="cta-description">
              Browse our available puppies or get in touch to learn more about upcoming litters
            </p>
            <div className="cta-buttons">
              <Button 
                variant="primary" 
                size="large"
                className="btn-hover-glow"
                onClick={goToPuppies}
              >
                View Available Puppies
              </Button>
              <Button 
                variant="outline" 
                size="large"
                onClick={goToContact}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home