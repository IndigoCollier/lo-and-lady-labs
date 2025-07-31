import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { getImagePath, processImagePaths } from '../../../utils/imageHelpers'
import './PhotoGallery.css'

function PhotoGallery({ 
  images = [], 
  puppy = null,
  className = '',
  showThumbnails = true,
  allowZoom = true 
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Fallback to single image if gallery not available
  const rawImages = images.length > 0 ? images : 
    (puppy?.galleryImages || [puppy?.image].filter(Boolean))
  
  // Process all image paths to work with base URL
  const galleryImages = processImagePaths(rawImages)

  if (!galleryImages.length) {
    return (
      <div className="photo-gallery-empty">
        <div className="placeholder-image">
          <span>No photos available</span>
        </div>
      </div>
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToImage = (index) => {
    setCurrentIndex(index)
  }

  const openLightbox = () => {
    if (allowZoom) {
      setIsLightboxOpen(true)
    }
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowLeft') {
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    }
  }

  return (
    <>
      <div className={`photo-gallery ${className}`}>
        <div className="main-image-container">
          <div className="main-image-wrapper">
            <img
              src={galleryImages[currentIndex]}
              alt={puppy?.name ? `${puppy.name} - Photo ${currentIndex + 1}` : `Photo ${currentIndex + 1}`}
              className="main-image"
              onClick={openLightbox}
            />
            
            {allowZoom && (
              <button 
                className="zoom-button"
                onClick={openLightbox}
                aria-label="View full size"
              >
                <ZoomIn />
              </button>
            )}

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="nav-button nav-button-prev"
                  aria-label="Previous image"
                >
                  <ChevronLeft />
                </button>
                
                <button
                  onClick={goToNext}
                  className="nav-button nav-button-next"
                  aria-label="Next image"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="image-indicators">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {showThumbnails && galleryImages.length > 1 && (
          <div className="thumbnails-container">
            <div className="thumbnails-grid">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="lightbox-overlay"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="lightbox-close"
              aria-label="Close lightbox"
            >
              <X />
            </button>

            <img
              src={galleryImages[currentIndex]}
              alt={puppy?.name ? `${puppy.name} - Full size photo ${currentIndex + 1}` : `Full size photo ${currentIndex + 1}`}
              className="lightbox-image"
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="lightbox-nav lightbox-nav-prev"
                  aria-label="Previous image"
                >
                  <ChevronLeft />
                </button>
                
                <button
                  onClick={goToNext}
                  className="lightbox-nav lightbox-nav-next"
                  aria-label="Next image"
                >
                  <ChevronRight />
                </button>
              </>
            )}

            <div className="lightbox-info">
              {puppy?.name && (
                <h3>{puppy.name}</h3>
              )}
              <p>Photo {currentIndex + 1} of {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoGallery