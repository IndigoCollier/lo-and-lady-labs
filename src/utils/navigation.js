export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (!element) return
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

// Note: This function now requires navigate to be passed in from components using useNavigate()
export const handleCTAClick = (action, data = {}, navigate = null) => {
  switch (action) {
    case 'viewPuppies':
      if (navigate) {
        navigate('/puppies')
      } else {
        window.location.href = '/lo-and-lady-labs/puppies'
      }
      break
    case 'contact':
      if (navigate) {
        navigate('/contact')
      } else {
        window.location.href = '/lo-and-lady-labs/contact'
      }
      break
    case 'search': {
      const searchParams = new URLSearchParams()
      if (data.term) searchParams.set('search', data.term)
      if (data.filter) searchParams.set('filter', data.filter)
      if (navigate) {
        navigate(`/puppies?${searchParams.toString()}`)
      } else {
        window.location.href = `/lo-and-lady-labs/puppies?${searchParams.toString()}`
      }
      break
    }
    case 'scrollTo':
      smoothScrollTo(data.elementId, data.offset || 80)
      break
    default:
      console.log('Unknown CTA action:', action)
  }
}