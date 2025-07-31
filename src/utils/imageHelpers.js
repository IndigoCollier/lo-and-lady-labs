/**
 * Utility functions for handling image paths in production and development
 */

/**
 * Get the correct image path for the current environment
 * @param {string} imagePath - The image path relative to public/images (e.g., "puppies/puppy-1.jpg")
 * @returns {string} - The correct full path for the current environment
 */
export const getImagePath = (imagePath) => {
  // Remove leading slash or dot if present
  const cleanPath = imagePath.replace(/^(\.\/|\/)?images\//, '')
  
  // In production (GitHub Pages), use base URL + images path
  // In development, use root-relative path
  const baseUrl = import.meta.env.BASE_URL || '/'
  return `${baseUrl}images/${cleanPath}`
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