import { useState, useEffect } from 'react'

export function useImageLoader(src) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!src) {
      setLoading(false)
      setError(true)
      return
    }

    setLoading(true)
    setError(false)
    setLoaded(false)

    const img = new Image()
    
    img.onload = () => {
      setLoading(false)
      setLoaded(true)
      setError(false)
    }
    
    img.onerror = () => {
      setLoading(false)
      setError(true)
      setLoaded(false)
    }
    
    img.src = src

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return { loading, error, loaded }
}

export function useImagePreloader(images = []) {
  const [loadedImages, setLoadedImages] = useState(new Set())
  const [failedImages, setFailedImages] = useState(new Set())
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    if (images.length === 0) {
      setAllLoaded(true)
      return
    }

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = () => reject(src)
        img.src = src
      })
    }

    const loadAllImages = async () => {
      const promises = images.map(async (src) => {
        try {
          await loadImage(src)
          setLoadedImages(prev => new Set([...prev, src]))
          return { src, status: 'loaded' }
        } catch (error) {
          setFailedImages(prev => new Set([...prev, src]))
          return { src, status: 'failed' }
        }
      })

      await Promise.allSettled(promises)
      setAllLoaded(true)
    }

    loadAllImages()
  }, [images])

  return {
    loadedImages,
    failedImages,
    allLoaded,
    loadedCount: loadedImages.size,
    failedCount: failedImages.size,
    totalCount: images.length
  }
}