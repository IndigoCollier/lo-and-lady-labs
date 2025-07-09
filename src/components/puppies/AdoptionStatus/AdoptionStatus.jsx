import React from 'react'
import { CheckCircle, Clock, Heart, XCircle } from 'lucide-react'
import './AdoptionStatus.css'

function AdoptionStatus({ 
  status = 'available', 
  size = 'medium',
  showIcon = true,
  customText = null
}) {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'available':
        return {
          text: customText || 'Available',
          icon: CheckCircle,
          className: 'available'
        }
      case 'pending':
        return {
          text: customText || 'Pending',
          icon: Clock,
          className: 'pending'
        }
      case 'adopted':
        return {
          text: customText || 'Adopted',
          icon: Heart,
          className: 'adopted'
        }
      case 'reserved':
        return {
          text: customText || 'Reserved',
          icon: Heart,
          className: 'reserved'
        }
      case 'unavailable':
        return {
          text: customText || 'Unavailable',
          icon: XCircle,
          className: 'unavailable'
        }
      default:
        return {
          text: customText || 'Unknown',
          icon: XCircle,
          className: 'unknown'
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  const getBadgeClass = () => {
    let classes = ['adoption-status', `status-${config.className}`, `size-${size}`]
    return classes.join(' ')
  }

  return (
    <div className={getBadgeClass()}>
      {showIcon && (
        <Icon className="status-icon" />
      )}
      <span className="status-text">{config.text}</span>
    </div>
  )
}

export default AdoptionStatus