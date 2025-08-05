  import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Crown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getImagePath } from '../../../utils/imageHelpers'

const carouselSlides = [
  {
    id: 1,
    image: "images/carousel/hero-slide-1.jpg",
    title: "Premium Labradoodle Companions",
    subtitle: "Where luxury meets unconditional love",
    cta: "Meet Our Puppies",
    ctaLink: "/puppies",
    overlay: "rgba(27, 54, 93, 0.4)"
  },
  {
    id: 2,
    image: "images/carousel/hero-slide-2.jpg",
    title: "Exceptional Breeding Standards",
    subtitle: "Health tested, family raised, lifetime support",
    cta: "Our Process",
    ctaLink: "/about",
    overlay: "rgba(212, 175, 55, 0.3)"
  },
  {
    id: 3,
    image: "images/carousel/hero-slide-3.jpg",
    title: "Find Your Perfect Match",
    subtitle: "Carefully matched to your family's lifestyle",
    cta: "Start Your Journey",
    ctaLink: "/contact",
    overlay: "rgba(27, 54, 93, 0.5)"
  }
]

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % carouselSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + carouselSlides.length) % carouselSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const currentSlideData = carouselSlides[currentSlide]

  return (
    <div style={{
      position: 'relative',
      height: '70vh',
      minHeight: '500px',
      overflow: 'hidden',
      borderRadius: '0 0 24px 24px',
      boxShadow: '0 10px 40px rgba(27, 54, 93, 0.2)'
    }}>
      {/* Background Images */}
      {carouselSlides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${getImagePath(slide.image)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: 1
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: slide.overlay,
            zIndex: 2
          }} />
        </div>
      ))}

      {/* Content Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        padding: '0 2rem'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#FFFFFF',
          maxWidth: '800px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <Crown style={{
              width: '48px',
              height: '48px',
              color: '#D4AF37',
              filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.4))'
            }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            lineHeight: '1.1',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.02em',
            color: '#F4E4BC'
          }}>
            {currentSlideData.title}
          </h1>

          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            marginBottom: '2.5rem',
            opacity: '0.95',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.025em',
            lineHeight: '1.4'
          }}>
            {currentSlideData.subtitle}
          </p>

          <button style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
            color: '#FFFFFF',
            border: 'none',
            padding: '1.25rem 3rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
            boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)'
          }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            
            console.log('🚀 UPDATED CAROUSEL - Button clicked, navigating to:', currentSlideData.ctaLink)
            
            // Use direct navigation with full URL to ensure it works
            const fullUrl = `https://indigocollier.github.io/lo-and-lady-labs${currentSlideData.ctaLink}`
            console.log('🎯 Full URL:', fullUrl)
            console.log('🕐 Timestamp:', new Date().toISOString())
            
            // Force navigation
            window.location.replace(fullUrl)
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)'
            e.target.style.boxShadow = '0 12px 35px rgba(212, 175, 55, 0.5)'
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)'
          }}
          >
            {currentSlideData.cta}
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 15
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(212, 175, 55, 0.9)'
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.15)'
        }}
      >
        <ChevronLeft style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 15
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(212, 175, 55, 0.9)'
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.15)'
        }}
      >
        <ChevronRight style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
      </button>

      {/* Dot Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '1rem',
        zIndex: 15
      }}>
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentSlide ? '40px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              background: index === currentSlide 
                ? 'linear-gradient(135deg, #D4AF37, #F4E4BC)' 
                : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              backdropFilter: 'blur(10px)'
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.2)',
        zIndex: 15
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #D4AF37, #F4E4BC)',
          width: `${((currentSlide + 1) / carouselSlides.length) * 100}%`,
          transition: 'width 0.5s ease',
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
        }} />
      </div>
    </div>
  )
}

export default HeroCarousel
