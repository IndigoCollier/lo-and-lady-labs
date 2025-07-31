import React, { useState } from 'react'
import { Heart, Send, CheckCircle } from 'lucide-react'
import FormField from '../FormField'
import Modal from '../Modal'
import Button from '../../common/Button'
import useFormValidation from '../../../hooks/useFormValidation'
import './PuppyInquiryForm.css'

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  experienceLevel: '',
  hasYard: '',
  otherPets: '',
  children: '',
  timeline: '',
  questions: '',
  agreeToTerms: false
}

const validationSchema = {
  firstName: ['required', 'name'],
  lastName: ['required', 'name'],
  email: ['required', 'email'],
  phone: ['required', 'phone'],
  address: ['required'],
  city: ['required'],
  state: ['required'],
  zipCode: ['required'],
  experienceLevel: ['required'],
  hasYard: ['required'],
  timeline: ['required'],
  agreeToTerms: ['required']
}

const experienceOptions = [
  { value: 'first-time', label: 'First-time dog owner' },
  { value: 'some-experience', label: 'Some experience with dogs' },
  { value: 'very-experienced', label: 'Very experienced with dogs' },
  { value: 'professional', label: 'Professional (breeder, trainer, etc.)' }
]

const yardOptions = [
  { value: 'large-fenced', label: 'Large fenced yard' },
  { value: 'small-fenced', label: 'Small fenced yard' },
  { value: 'large-unfenced', label: 'Large unfenced yard' },
  { value: 'no-yard', label: 'No yard/apartment' }
]

const timelineOptions = [
  { value: 'immediately', label: 'Immediately' },
  { value: 'within-month', label: 'Within a month' },
  { value: 'within-3-months', label: 'Within 3 months' },
  { value: 'flexible', label: 'Flexible timing' }
]

function PuppyInquiryForm({ puppy, isOpen, onClose, onSuccess }) {
  const [showSuccess, setShowSuccess] = useState(false)
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useFormValidation(initialFormValues, validationSchema)

  const onSubmit = async (formData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Inquiry submitted:', {
      puppy: puppy,
      applicantData: formData
    })
    
    // Show success message
    setShowSuccess(true)
    
    // Call success callback if provided
    if (onSuccess) {
      onSuccess(formData)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const success = await handleSubmit(onSubmit)
    if (!success) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.form-input.error, .form-textarea.error, .form-select.error')
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    handleChange(name, type === 'checkbox' ? checked : value)
  }

  const handleInputBlur = (e) => {
    handleBlur(e.target.name)
  }

  const handleCloseModal = () => {
    if (!isSubmitting) {
      resetForm()
      setShowSuccess(false)
      onClose()
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    resetForm()
    onClose()
  }

  if (showSuccess) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleSuccessClose}
        title="Inquiry Submitted Successfully!"
        size="medium"
      >
        <div className="success-content">
          <div className="success-icon">
            <CheckCircle />
          </div>
          <h3>Thank you for your interest in {puppy?.name}!</h3>
          <p>
            We've received your inquiry and will review your application carefully. 
            Our team will contact you within 24-48 hours to discuss the next steps.
          </p>
          <div className="success-details">
            <h4>What happens next?</h4>
            <ul>
              <li>We'll review your application and references</li>
              <li>Schedule a phone or video call to get to know you better</li>
              <li>Arrange a meet-and-greet with {puppy?.name}</li>
              <li>Complete the adoption process if it's a good match</li>
            </ul>
          </div>
          <Button 
            variant="primary" 
            size="large"
            onClick={handleSuccessClose}
            className="success-button"
          >
            Close
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title={`Inquiry for ${puppy?.name}`}
      size="large"
      closeOnOverlayClick={!isSubmitting}
    >
      <div className="inquiry-form-container">
        {puppy && (
          <div className="puppy-summary">
            <img src={puppy.image} alt={puppy.name} className="puppy-image" />
            <div className="puppy-info">
              <h3>{puppy.name}</h3>
              <p>{puppy.age} • {puppy.gender} • {puppy.color}</p>
              <p className="puppy-price">${puppy.price?.toLocaleString()}</p>
            </div>
            <Heart className="heart-icon" />
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="inquiry-form">
          <div className="form-section">
            <h4 className="section-title form-title">Personal Information</h4>
            <div className="form-row">
              <FormField
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.firstName}
                touched={touched.firstName}
                required
                disabled={isSubmitting}
              />
              <FormField
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.lastName}
                touched={touched.lastName}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-row">
              <FormField
                label="Email Address"
                type="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.email}
                touched={touched.email}
                required
                disabled={isSubmitting}
              />
              <FormField
                label="Phone Number"
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.phone}
                touched={touched.phone}
                placeholder="(555) 123-4567"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Address Information</h4>
            <FormField
              label="Street Address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.address}
              touched={touched.address}
              required
              disabled={isSubmitting}
            />
            
            <div className="form-row">
              <FormField
                label="City"
                name="city"
                value={values.city}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.city}
                touched={touched.city}
                required
                disabled={isSubmitting}
              />
              <FormField
                label="State"
                name="state"
                value={values.state}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.state}
                touched={touched.state}
                placeholder="AZ"
                required
                disabled={isSubmitting}
              />
              <FormField
                label="Zip Code"
                name="zipCode"
                value={values.zipCode}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.zipCode}
                touched={touched.zipCode}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Experience & Living Situation</h4>
            <FormField
              label="Experience with Dogs"
              type="select"
              name="experienceLevel"
              value={values.experienceLevel}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.experienceLevel}
              touched={touched.experienceLevel}
              options={experienceOptions}
              required
              disabled={isSubmitting}
            />
            
            <FormField
              label="Yard Situation"
              type="select"
              name="hasYard"
              value={values.hasYard}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.hasYard}
              touched={touched.hasYard}
              options={yardOptions}
              required
              disabled={isSubmitting}
            />
            
            <div className="form-row">
              <FormField
                label="Other Pets"
                type="textarea"
                name="otherPets"
                value={values.otherPets}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.otherPets}
                touched={touched.otherPets}
                placeholder="Please describe any other pets you have..."
                rows={3}
                disabled={isSubmitting}
              />
              <FormField
                label="Children in Home"
                type="textarea"
                name="children"
                value={values.children}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={errors.children}
                touched={touched.children}
                placeholder="Please describe any children in your home (ages, etc.)..."
                rows={3}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-section">
            <h4 className="section-title">Additional Information</h4>
            <FormField
              label="Timeline for Adoption"
              type="select"
              name="timeline"
              value={values.timeline}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.timeline}
              touched={touched.timeline}
              options={timelineOptions}
              required
              disabled={isSubmitting}
            />
            
            <FormField
              label="Questions or Comments"
              type="textarea"
              name="questions"
              value={values.questions}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.questions}
              touched={touched.questions}
              placeholder="Any questions about this puppy or our adoption process?"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-section">
            <FormField
              type="checkbox"
              name="agreeToTerms"
              value={values.agreeToTerms}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              error={errors.agreeToTerms}
              touched={touched.agreeToTerms}
              label="I agree to the adoption terms and understand that this inquiry does not guarantee adoption. I certify that all information provided is accurate."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="button-icon" />
                  Submit Inquiry
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default PuppyInquiryForm