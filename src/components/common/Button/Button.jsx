import './Button.module.css'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  ...props 
}) {
  const baseClasses = 'btn'
  const variantClass = `btn-${variant}`
  const sizeClass = `btn-${size}`
  const disabledClass = disabled ? 'btn-disabled' : ''
  
  const allClasses = [baseClasses, variantClass, sizeClass, disabledClass, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={allClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button