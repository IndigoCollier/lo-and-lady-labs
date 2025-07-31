import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Heart, Shield, CreditCard } from 'lucide-react'
import Button from '../Button'
import './StripeForm.css'

// Initialize Stripe (you'll need to replace with your actual publishable key)
const stripePromise = loadStripe('pk_test_51Rqecb1uAESTJfjlMu1wPw7PhQDD3aPdaQXzaqjmM1wZ0wq6zQdX0Lq7n3uzrGp5SEh1oWf819mgbu1XYHeX4t2u00GjlJjzdq')

const DONATION_AMOUNTS = [25, 50, 100, 250, 500]

const CheckoutForm = ({ selectedAmount, customAmount, onSuccess, onError }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: ''
  })

  const amount = customAmount || selectedAmount

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements || !amount) return

    setProcessing(true)

    const cardElement = elements.getElement(CardElement)

    try {
      // In a real implementation, you'd create a payment intent on your backend
      // This is a simplified example - you'll need backend integration
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: donorInfo.name,
          email: donorInfo.email,
        },
      })

      if (error) {
        onError(error.message)
      } else {
        // Here you would send the paymentMethod.id to your backend
        // For now, we'll simulate success
        onSuccess({
          amount,
          donorInfo,
          paymentMethodId: paymentMethod.id
        })
      }
    } catch (err) {
      onError('An unexpected error occurred. Please try again.')
    }

    setProcessing(false)
  }

  const handleInputChange = (field, value) => {
    setDonorInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="donor-info">
        <h3>Donor Information</h3>
        <div className="form-group">
          <label htmlFor="donor-name">Full Name *</label>
          <input
            id="donor-name"
            type="text"
            value={donorInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="donor-email">Email Address *</label>
          <input
            id="donor-email"
            type="email"
            value={donorInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="donor-message">Message (Optional)</label>
          <textarea
            id="donor-message"
            value={donorInfo.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Leave a message for Lo and Lady Labs..."
            rows="3"
          />
        </div>
      </div>

      <div className="payment-section">
        <h3>Payment Information</h3>
        <div className="donation-amount">
          <span className="amount-label">Donation Amount:</span>
          <span className="amount-value">${amount}</span>
        </div>
        
        <div className="card-element-container">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1B365D',
                  '::placeholder': {
                    color: '#9AA0A6',
                  },
                },
              },
            }}
          />
        </div>

        <div className="security-info">
          <Shield className="security-icon" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        disabled={!stripe || processing || !amount || !donorInfo.name || !donorInfo.email}
        className="donate-submit-button"
      >
        <Heart className="button-icon" />
        {processing ? 'Processing...' : `Donate $${amount}`}
      </Button>
    </form>
  )
}

function StripeForm({ onClose, onSuccess }) {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount('')
    setShowCustom(false)
  }

  const handleCustomAmountChange = (value) => {
    const numValue = parseInt(value)
    if (numValue > 0) {
      setCustomAmount(numValue)
      setSelectedAmount(0)
    } else {
      setCustomAmount('')
    }
  }

  const handleSuccess = (result) => {
    setSuccess(true)
    setError('')
    onSuccess && onSuccess(result)
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
    setSuccess(false)
  }

  if (success) {
    return (
      <div className="donation-success">
        <div className="success-content">
          <Heart className="success-icon" />
          <h2>Thank You for Your Donation!</h2>
          <p>
            Your generous contribution of ${customAmount || selectedAmount} will help Lo and Lady Labs 
            continue our mission of training therapy labradoodles and supporting mental health initiatives.
          </p>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="stripe-form-container">
      <div className="donation-header">
        <Heart className="donation-icon" />
        <h2>Support Lo and Lady Labs</h2>
        <p>Help us train therapy dogs and support mental health initiatives in our community</p>
      </div>

      <div className="amount-selection">
        <h3>Select Donation Amount</h3>
        <div className="amount-buttons">
          {DONATION_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
            >
              ${amount}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustom(true)}
            className={`amount-button ${showCustom ? 'selected' : ''}`}
          >
            Custom
          </button>
        </div>

        {showCustom && (
          <div className="custom-amount">
            <label htmlFor="custom-amount">Custom Amount ($)</label>
            <input
              id="custom-amount"
              type="number"
              min="1"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              placeholder="Enter amount"
              autoFocus
            />
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <span>{error}</span>
        </div>
      )}

      <Elements stripe={stripePromise}>
        <CheckoutForm
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Elements>
    </div>
  )
}

export default StripeForm