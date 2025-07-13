import React, { useState } from 'react'
import { Send, CheckCircle, Mail, Phone, MessageCircle } from 'lucide-react'
import FormField from '../FormField'
import Button from '../../common/Button'
import useFormValidation from '../../../hooks/useFormValidation'
import './ContactForm.css'

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  preferredContact: 'email',
  agreeToContact: false
}

const validationSchema = {
  firstName: ['required', 'name'],
  lastName: ['required', 'name'],
  email: ['required', 'email'],
  subject: ['required'],
  message: ['required', { type: 'minLength', params: 10 }],
  preferredContact: ['required'],
  agreeToContact: ['required']
}

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'puppy-availability', label: 'Puppy Availability' },
  { value: 'adoption-process', label: 'Adoption Process' },
  { value: 'visit-schedule', label: 'Schedule a Visit' },
  { value: 'breeding-program', label: 'Breeding Program' },
  { value: 'other', label: 'Other' }
]

const contactMethodOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'text', label: 'Text Message' }
]

function ContactForm({ className = '', onSuccess }) {
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
    
    console.log('Contact form submitted:', formData)
    
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

  const handleNewMessage = () => {
    setShowSuccess(false)
    resetForm()
  }

  if (showSuccess) {
    return (
      <div className={`contact-form-container ${className}`}>
        <div className="success-content">
          <div className="success-icon">
            <CheckCircle />
          </div>
          <h3>Message Sent Successfully!</h3>
          <p>
            Thank you for contacting Lo and Lady Labs. We've received your message 
            and will get back to you within 24 hours.
          </p>
          <div className="success-details">
            <h4>What to expect next:</h4>
            <ul>
              <li>We'll review your message carefully</li>
              <li>Respond via your preferred contact method</li>
              <li>Provide detailed answers to your questions</li>
              <li>Schedule any necessary follow-up calls or visits</li>
            </ul>
          </div>
          <Button 
            variant="primary" 
            size="large"
            onClick={handleNewMessage}
            className="new-message-button"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`contact-form-container ${className}`}>
      <div className="form-header">
        <h2 className="form-title">Contact Us</h2>
        <p className="form-subtitle">
          Have questions about our puppies or adoption process? We'd love to hear from you!
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="contact-form">
        <div className="form-section">
          <h4 className="section-title">Personal Information</h4>
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
              helpText="Optional, but helpful for urgent inquiries"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title">Your Message</h4>
          <FormField
            label="Subject"
            type="select"
            name="subject"
            value={values.subject}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.subject}
            touched={touched.subject}
            options={subjectOptions}
            required
            disabled={isSubmitting}
          />
          
          <FormField
            label="Message"
            type="textarea"
            name="message"
            value={values.message}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.message}
            touched={touched.message}
            placeholder="Please tell us how we can help you..."
            rows={6}
            required
            disabled={isSubmitting}
            helpText="Please provide as much detail as possible so we can assist you better"
          />
        </div>

        <div className="form-section">
          <h4 className="section-title">Contact Preferences</h4>
          <FormField
            label="How would you prefer we contact you?"
            type="select"
            name="preferredContact"
            value={values.preferredContact}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.preferredContact}
            touched={touched.preferredContact}
            options={contactMethodOptions}
            required
            disabled={isSubmitting}
          />
          
          <div className="contact-methods-info">
            <div className="contact-method">
              <Mail className="contact-icon" />
              <span>Email responses within 24 hours</span>
            </div>
            <div className="contact-method">
              <Phone className="contact-icon" />
              <span>Phone calls during business hours</span>
            </div>
            <div className="contact-method">
              <MessageCircle className="contact-icon" />
              <span>Text messages for quick updates</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <FormField
            type="checkbox"
            name="agreeToContact"
            value={values.agreeToContact}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.agreeToContact}
            touched={touched.agreeToContact}
            label="I agree to be contacted by Lo and Lady Labs regarding my inquiry. I understand that my information will be kept confidential."
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-actions">
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
                Sending...
              </>
            ) : (
              <>
                <Send className="button-icon" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm