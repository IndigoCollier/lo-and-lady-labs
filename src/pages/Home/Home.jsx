import HeroCarousel from '../../components/home/HeroCarousel'
import FeaturedPuppies from '../../components/home/FeaturedPuppies'
import TestimonialSection from '../../components/home/TestimonialSection'
import QuickSearch from '../../components/home/QuickSearch'
import Button from '../../components/common/Button'
import { Crown, Award, Heart, Users } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import './Home.css'

function Home() {
  const [featuresRef, featuresVisible] = useScrollAnimation()
  const [searchRef, searchVisible] = useScrollAnimation()
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation()
  const [ctaRef, ctaVisible] = useScrollAnimation()

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
          
          <div className={`features-grid ${featuresVisible ? 'animate-stagger-children' : ''}`}>
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
                onClick={() => window.location.href = '/puppies'}
              >
                View Available Puppies
              </Button>
              <Button 
                variant="outline" 
                size="large"
                onClick={() => window.location.href = '/contact'}
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