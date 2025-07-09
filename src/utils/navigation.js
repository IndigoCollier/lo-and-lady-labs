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

export const handleCTAClick = (action, data = {}) => {
  switch (action) {
    case 'viewPuppies':
      window.location.href = '/puppies'
      break
    case 'contact':
      window.location.href = '/contact'
      break
    case 'search':
      const searchParams = new URLSearchParams()
      if (data.term) searchParams.set('search', data.term)
      if (data.filter) searchParams.set('filter', data.filter)
      window.location.href = `/puppies?${searchParams.toString()}`
      break
    case 'scrollTo':
      smoothScrollTo(data.elementId, data.offset || 80)
      break
    default:
      console.log('Unknown CTA action:', action)
  }
}