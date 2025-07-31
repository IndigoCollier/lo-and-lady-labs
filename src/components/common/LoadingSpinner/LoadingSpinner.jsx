import React from 'react'
import './LoadingSpinner.css'

function LoadingSpinner({ size = 'medium', color = 'primary', text = '' }) {
  return (
    <div className={`loading-spinner-wrapper ${size}`}>
      <div className={`loading-spinner ${size} ${color}`}>
        <div className="spinner-circle"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  )
}

export default LoadingSpinner