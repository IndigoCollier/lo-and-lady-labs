import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import './FavoriteButton.css'

function FavoriteButton({ 
  isActive = false, 
  onClick, 
  puppyName = 'this puppy',
  size = 'medium',
  disabled = false
}) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    
    if (disabled) return

    // Trigger animation
    setIsAnimating(true)
    
    // Call the parent's onClick handler
    if (onClick) {
      onClick(e)
    }
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const getButtonClass = () => {
    let classes = ['favorite-button', `favorite-button-${size}`]
    
    if (isActive) {
      classes.push('active')
    }
    
    if (isAnimating) {
      classes.push('animating')
    }
    
    if (disabled) {
      classes.push('disabled')
    }
    
    return classes.join(' ')
  }

  return (
    <button
      onClick={handleClick}
      className={getButtonClass()}
      disabled={disabled}
      aria-label={
        isActive 
          ? `Remove ${puppyName} from favorites` 
          : `Add ${puppyName} to favorites`
      }
      title={
        isActive 
          ? `Remove ${puppyName} from favorites` 
          : `Add ${puppyName} to favorites`
      }
    >
      <Heart className="heart-icon" />
      
      {/* Animated hearts for the heart explosion effect */}
      {isAnimating && (
        <div className="heart-explosion">
          <Heart className="explosion-heart heart-1" />
          <Heart className="explosion-heart heart-2" />
          <Heart className="explosion-heart heart-3" />
          <Heart className="explosion-heart heart-4" />
          <Heart className="explosion-heart heart-5" />
          <Heart className="explosion-heart heart-6" />
        </div>
      )}
      
      {/* Pulse rings for added effect */}
      {isAnimating && (
        <div className="pulse-rings">
          <div className="pulse-ring ring-1"></div>
          <div className="pulse-ring ring-2"></div>
          <div className="pulse-ring ring-3"></div>
        </div>
      )}
    </button>
  )
}

export default FavoriteButton