import React from 'react'
import { AlertCircle } from 'lucide-react'
import './FormField.css'

function FormField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  touched,
  disabled = false,
  className = '',
  helpText,
  rows,
  options = [], // For select fields
  children
}) {
  const fieldId = `field-${name}`
  const hasError = touched && error
  
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows || 4}
            className={`form-textarea ${hasError ? 'error' : ''} ${className}`}
          />
        )
      
      case 'select':
        return (
          <select
            id={fieldId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            className={`form-select ${hasError ? 'error' : ''} ${className}`}
          >
            <option value="">
              {placeholder || `Select ${label}`}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'checkbox':
        return (
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id={fieldId}
              name={name}
              checked={value}
              onChange={onChange}
              onBlur={onBlur}
              required={required}
              disabled={disabled}
              className={`form-checkbox ${hasError ? 'error' : ''} ${className}`}
            />
            <label htmlFor={fieldId} className="checkbox-label">
              {label}
              {required && <span className="required-asterisk">*</span>}
            </label>
          </div>
        )
      
      default:
        return (
          <input
            type={type}
            id={fieldId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`form-input ${hasError ? 'error' : ''} ${className}`}
          />
        )
    }
  }

  if (type === 'checkbox') {
    return (
      <div className="form-field checkbox-field">
        {renderInput()}
        {hasError && (
          <div className="error-message">
            <AlertCircle className="error-icon" />
            {error}
          </div>
        )}
        {helpText && !hasError && (
          <div className="help-text">{helpText}</div>
        )}
      </div>
    )
  }

  return (
    <div className="form-field">
      <label htmlFor={fieldId} className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      {renderInput()}
      {hasError && (
        <div className="error-message">
          <AlertCircle className="error-icon" />
          {error}
        </div>
      )}
      {helpText && !hasError && (
        <div className="help-text">{helpText}</div>
      )}
      {children}
    </div>
  )
}

export default FormField