/**
 * Utility functions for handling image paths in production and development
 */

/**
 * Get the correct image path for the current environment
 * @param {string} imagePath - The image path (e.g., "images/puppies/puppy-1.jpg" or "puppies/puppy-1.jpg")
 * @returns {string} - The correct full path for the current environment
 */
export const getImagePath = (imagePath) => {
  if (!imagePath) return imagePath
  
  // Clean up the path - remove leading slashes/dots and normalize
  let cleanPath = imagePath.replace(/^(\.\/|\/)+/, '')
  
  // If path doesn't start with 'images/', add it
  if (!cleanPath.startsWith('images/')) {
    cleanPath = `images/${cleanPath}`
  }
  
  // Get base URL and ensure it ends with /
  const baseUrl = import.meta.env.BASE_URL || '/'
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  
  return `${normalizedBaseUrl}${cleanPath}`
}

/**
 * Process an array of image paths
 * @param {string[]} imagePaths - Array of image paths
 * @returns {string[]} - Array of processed image paths
 */
export const processImagePaths = (imagePaths) => {
  return imagePaths.map(path => getImagePath(path))
}

/**
 * Process puppy data to fix image paths
 * @param {Object} puppy - Puppy object with image and galleryImages properties
 * @returns {Object} - Puppy object with corrected image paths
 */
export const processPuppyImages = (puppy) => {
  if (!puppy) return puppy
  
  return {
    ...puppy,
    image: puppy.image ? getImagePath(puppy.image) : puppy.image,
    galleryImages: puppy.galleryImages ? processImagePaths(puppy.galleryImages) : puppy.galleryImages
  }
}