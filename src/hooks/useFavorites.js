import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'puppy-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY)
      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites)
        setFavorites(Array.isArray(parsed) ? parsed : [])
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      } catch (error) {
        console.error('Error saving favorites:', error)
      }
    }
  }, [favorites, loading])

  const addToFavorites = (puppyId) => {
    const id = parseInt(puppyId)
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev // Already in favorites
      }
      return [...prev, id]
    })
  }

  const removeFromFavorites = (puppyId) => {
    const id = parseInt(puppyId)
    setFavorites(prev => prev.filter(favId => favId !== id))
  }

  const toggleFavorite = (puppyId) => {
    const id = parseInt(puppyId)
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const isFavorite = (puppyId) => {
    return favorites.includes(parseInt(puppyId))
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const getFavoritesCount = () => {
    return favorites.length
  }

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesCount
  }
}