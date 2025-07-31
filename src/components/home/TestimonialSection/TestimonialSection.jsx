import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import './TestimonialSection.css'

const testimonials = [
  {
    id: 1,
    name: "Sarah & Mike Johnson",
    location: "Memphis, TN",
    puppyName: "Bella",
    rating: 5,
    text: "Bella has been the perfect addition to our family! Lo and Lady Labs made the entire process seamless. Their dedication to health testing and socialization really shows - Bella is healthy, happy, and so well-adjusted.",
    image: "images/testimonials/family-1.jpg",
    puppyImage: "images/testimonials/bella-family.jpg"
  },
  {
    id: 2,
    name: "Jennifer Martinez",
    location: "Nashville, TN", 
    puppyName: "Cooper",
    rating: 5,
    text: "Cooper is everything we hoped for and more! He's gentle with our kids, incredibly smart, and has the sweetest temperament. The team was professional and caring throughout the entire adoption process.",
    image: "images/testimonials/family-2.jpg",
    puppyImage: "images/testimonials/cooper-family.jpg"
  },
  {
    id: 3,
    name: "David & Lisa Chen",
    location: "Gatlinburg, TN",
    puppyName: "Luna",
    rating: 5,
    text: "We couldn't be happier with Luna! She's brought so much joy to our home. The health guarantees and ongoing support from Lo and Lady Labs gave us complete confidence in our choice.",
    image: "images/testimonials/family-3.jpg",
    puppyImage: "images/testimonials/luna-family.jpg"
  }
]

function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
      />
    ))
  }

  const current = testimonials[currentTestimonial]

  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="testimonial-header">
          <h2 className="testimonial-title">Happy Families, Happy Pups</h2>
          <p className="testimonial-subtitle">
            See why families across Tennessee choose Lo and Lady Labs
          </p>
        </div>

        <div className="testimonial-carousel">
          <div className="testimonial-content">
            <div className="quote-icon-container">
              <Quote className="quote-icon" />
            </div>
            
            <div className="testimonial-text">
              <p>"{current.text}"</p>
            </div>

            <div className="rating">
              {renderStars(current.rating)}
            </div>

            <div className="testimonial-author">
              <div className="author-info">
                <h4 className="author-name">{current.name}</h4>
                <p className="author-location">{current.location}</p>
                <p className="puppy-name">Proud parents of {current.puppyName}</p>
              </div>
            </div>
          </div>

        
        </div>

        <div className="testimonial-controls">
          <button onClick={prevTestimonial} className="nav-button prev">
            <ChevronLeft className="nav-icon" />
          </button>

          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
              />
            ))}
          </div>

          <button onClick={nextTestimonial} className="nav-button next">
            <ChevronRight className="nav-icon" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection