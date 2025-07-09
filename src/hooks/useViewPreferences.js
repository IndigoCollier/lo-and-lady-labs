import { useState, useEffect, useCallback } from 'react'

const VIEW_PREFERENCES_KEY = 'puppy-view-preferences'

const defaultPreferences = {
  columns: 3,
  viewMode: 'grid',
  sortBy: 'name',
  filterBy: 'all',
  showControls: true
}

export function useViewPreferences() {
  const [viewPreferences, setViewPreferences] = useState(defaultPreferences)
  const [loading, setLoading] = useState(true)

  // Load preferences from localStorage on mount ONLY
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem(VIEW_PREFERENCES_KEY)
      if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences)
        setViewPreferences({ ...defaultPreferences, ...parsed })
      }
    } catch (error) {
      console.error('Error loading view preferences:', error)
      setViewPreferences(defaultPreferences)
    } finally {
      setLoading(false)
    }
  }, []) // FIXED: Empty dependency array - only run once

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(VIEW_PREFERENCES_KEY, JSON.stringify(viewPreferences))
      } catch (error) {
        console.error('Error saving view preferences:', error)
      }
    }
  }, [viewPreferences, loading]) // FIXED: Proper dependencies

  // FIXED: Use useCallback to prevent function recreation on every render
  const updateViewPreferences = useCallback((updates) => {
    setViewPreferences(prev => ({ ...prev, ...updates }))
  }, [])

  const resetViewPreferences = useCallback(() => {
    setViewPreferences(defaultPreferences)
  }, [])

  const getViewPreference = useCallback((key) => {
    return viewPreferences[key] ?? defaultPreferences[key]
  }, [viewPreferences])

  return {
    viewPreferences,
    loading,
    updateViewPreferences,
    resetViewPreferences,
    getViewPreference
  }
}