import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Users, Heart } from 'lucide-react'
import TestimonialCard from '../TestimonialCard'
import Button from '../../common/Button'
import { getFeaturedTestimonials, getAllTestimonials } from '../../../data/testimonials'
import './TestimonialSection.css'

function TestimonialSection({ 
  showAll = false, 
  featuredOnly = true, 
  title = "Happy Families, Happy Puppies" 
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAllTestimonials, setShowAllTestimonials] = useState(showAll)
  
  const testimonials = showAllTestimonials ? getAllTestimonials() : getFeaturedTestimonials()
  const visibleCount = 1 // Show one testimonial at a time for carousel

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
  }

  const handleShowAll = () => {
    setShowAllTestimonials(true)
    setCurrentIndex(0)
  }

  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="section-header">
          <Heart className="section-icon" />
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">
            Read stories from families who found their perfect companion through Lo and Lady Labs
          </p>
        </div>

        {/* Carousel View */}
        <div className="testimonial-carousel">
          <div className="carousel-container">
            <button
              onClick={prevTestimonial}
              className="carousel-nav carousel-nav-prev"
              aria-label="Previous testimonial"
              disabled={testimonials.length <= 1}
            >
              <ChevronLeft />
            </button>

            <div className="testimonial-display">
              <TestimonialCard
                testimonial={testimonials[currentIndex]}
                featured={testimonials[currentIndex]?.featured}
                size="large"
              />
            </div>

            <button
              onClick={nextTestimonial}
              className="carousel-nav carousel-nav-next"
              aria-label="Next testimonial"
              disabled={testimonials.length <= 1}
            >
              <ChevronRight />
            </button>
          </div>

          {/* Carousel Indicators */}
          {testimonials.length > 1 && (
            <div className="carousel-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Grid View for "Show All" */}
        {showAllTestimonials && testimonials.length > 3 && (
          <div className="testimonials-grid">
            <h3 className="grid-title">All Customer Stories</h3>
            <div className="grid-container">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  featured={testimonial.featured}
                  size="compact"
                />
              ))}
            </div>
          </div>
        )}

        {/* Show All Button */}
        {!showAllTestimonials && (
          <div className="section-footer">
            <Button
              variant="secondary"
              size="large"
              onClick={handleShowAll}
              className="show-all-button"
            >
              <Users className="button-icon" />
              Read All Customer Stories
            </Button>
          </div>
        )}

        {/* Statistics */}
        <div className="testimonial-stats">
          <div className="stat-item">
            <div className="stat-number">100+</div>
            <div className="stat-label">Happy Families</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5★</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Health Guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection