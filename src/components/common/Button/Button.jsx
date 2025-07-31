import styles from './Button.module.css'

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
  const baseClasses = styles.btn
  const variantClass = styles[`btn-${variant}`]
  const sizeClass = styles[`btn-${size}`]
  const disabledClass = disabled ? styles['btn-disabled'] : ''
  
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