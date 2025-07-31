import React from 'react'
import { X } from 'lucide-react'
import StripeForm from '../StripeForm'
import './DonationModal.css'

function DonationModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSuccess = (result) => {
    onSuccess && onSuccess(result)
    // Don't close automatically - let the success screen show first
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>
        <StripeForm onClose={onClose} onSuccess={handleSuccess} />
      </div>
    </div>
  )
}

export default DonationModal