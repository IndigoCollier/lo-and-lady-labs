import { useState, useEffect } from 'react'

// Validation rules
const validationRules = {
  required: (value) => {
    if (typeof value === 'string') {
      return value.trim().length > 0 ? null : 'This field is required'
    }
    return value ? null : 'This field is required'
  },
  
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) ? null : 'Please enter a valid email address'
  },
  
  phone: (value) => {
    const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(value.replace(/\s/g, '')) ? null : 'Please enter a valid phone number'
  },
  
  minLength: (min) => (value) => {
    return value && value.length >= min ? null : `Must be at least ${min} characters`
  },
  
  maxLength: (max) => (value) => {
    return value && value.length <= max ? null : `Must be no more than ${max} characters`
  },
  
  name: (value) => {
    const nameRegex = /^[a-zA-Z\s'-]+$/
    return nameRegex.test(value) ? null : 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)'
  }
}

function useFormValidation(initialValues, validationSchema) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validate a single field
  const validateField = (name, value) => {
    const fieldRules = validationSchema[name]
    if (!fieldRules) return null

    for (const rule of fieldRules) {
      if (typeof rule === 'string') {
        // Built-in rule
        const validator = validationRules[rule]
        if (validator) {
          const error = validator(value)
          if (error) return error
        }
      } else if (typeof rule === 'function') {
        // Custom validation function
        const error = rule(value)
        if (error) return error
      } else if (typeof rule === 'object') {
        // Rule with parameters (e.g., { type: 'minLength', params: 3 })
        const validator = validationRules[rule.type]
        if (validator) {
          const error = validator(rule.params)(value)
          if (error) return error
        }
      }
    }
    return null
  }

  // Validate all fields
  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    Object.keys(validationSchema).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName])
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  // Handle field value change
  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  // Handle field blur (for validation)
  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, values[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  // Reset form
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  // Submit form
  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true)
    
    // Mark all fields as touched
    const allTouched = {}
    Object.keys(validationSchema).forEach(key => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    // Validate form
    const isValid = validateForm()
    
    if (isValid) {
      try {
        await onSubmit(values)
        // Form submitted successfully - don't reset here, let the parent component handle it
      } catch (error) {
        console.error('Form submission error:', error)
      }
    }
    
    setIsSubmitting(false)
    return isValid
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateForm,
    setValues
  }
}

export default useFormValidation