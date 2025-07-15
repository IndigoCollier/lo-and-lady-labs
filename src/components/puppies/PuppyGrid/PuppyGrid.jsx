import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, List, SortAsc, SortDesc, Heart, Star, Calendar } from 'lucide-react'
import PuppyCard from '../PuppyCard'
import { useFavorites } from '../../../hooks/useFavorites'
import { useViewPreferences } from '../../../hooks/useViewPreferences'
import './PuppyGrid.css'

function PuppyGrid({
  puppies = [],
  loading = false,
  onViewDetails, // Keep for backward compatibility but PuppyCard handles its own navigation now
  emptyMessage = "No puppies found",
  showControls = true,
  defaultColumns = 3,
  maxColumns = 4,
  minColumns = 1,
  allowViewToggle = true,
  className = ''
}) {
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite, favorites } = useFavorites()
  const { viewPreferences, updateViewPreferences } = useViewPreferences()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [animationDelay, setAnimationDelay] = useState(0)

  // View controls state
  const [columns, setColumns] = useState(defaultColumns)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [quickFilter, setQuickFilter] = useState('all')

  // Initialize from saved preferences
  useEffect(() => {
    if (viewPreferences) {
      setColumns(viewPreferences.columns || defaultColumns)
      setViewMode(viewPreferences.viewMode || 'grid')
      setSortBy(viewPreferences.sortBy || 'name')
      setSortOrder(viewPreferences.sortOrder || 'asc')
    }
  }, [viewPreferences, defaultColumns])

  // Save preferences with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateViewPreferences({ columns, viewMode, sortBy, sortOrder })
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [columns, viewMode, sortBy, sortOrder, updateViewPreferences])

  const handleCardHover = useCallback((puppyId, isHovering) => {
    if (isHovering) {
      setHoveredCard(puppyId)
      setAnimationDelay(Math.random() * 0.2)
    } else {
      setHoveredCard(null)
      setAnimationDelay(0)
    }
  }, [])

  // Navigation handler - PuppyCard now handles its own navigation
  const handleViewDetails = useCallback((puppyId) => {
    if (onViewDetails) {
      onViewDetails(puppyId)
    } else {
      // Fallback navigation if no handler provided
      navigate(`/puppies/${puppyId}`)
    }
  }, [onViewDetails, navigate])

  const handleFavoriteToggle = useCallback((puppyId) => {
    toggleFavorite(puppyId)
  }, [toggleFavorite])

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('asc')
    }
  }

  const handleQuickFilter = (filterType) => {
    setQuickFilter(filterType)
  }

  // Process puppies with sorting and quick filtering
  const processedPuppies = useMemo(() => {
    let filtered = [...puppies]

    // Apply quick filters
    switch (quickFilter) {
      case 'available':
        filtered = filtered.filter(puppy => puppy.available)
        break
      case 'pending':
        filtered = filtered.filter(puppy => !puppy.available)
        break
      case 'favorites':
        filtered = filtered.filter(puppy => isFavorite(puppy.id))
        break
      case 'new':
        // Sort by ready date to get newest first
        filtered = filtered.sort((a, b) => new Date(b.readyDate) - new Date(a.readyDate)).slice(0, 3)
        break
      case 'male':
        filtered = filtered.filter(puppy => puppy.gender === 'Male')
        break
      case 'female':
        filtered = filtered.filter(puppy => puppy.gender === 'Female')
        break
      default:
        break
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'price':
          comparison = a.price - b.price
          break
        case 'age':
          comparison = parseInt(a.age) - parseInt(b.age)
          break
        case 'readyDate':
          comparison = new Date(a.readyDate) - new Date(b.readyDate)
          break
        case 'color':
          comparison = a.color.localeCompare(b.color)
          break
        case 'size':
          comparison = a.size.localeCompare(b.size)
          break
        default:
          return 0
      }
      
      return sortOrder === 'desc' ? -comparison : comparison
    })

    return filtered
  }, [puppies, quickFilter, sortBy, sortOrder, isFavorite])

  // Quick filter options
  const quickFilterOptions = [
    { value: 'all', label: 'All Puppies', icon: null },
    { value: 'available', label: 'Available', icon: <Star className="w-4 h-4" /> },
    { value: 'pending', label: 'Pending', icon: <Calendar className="w-4 h-4" /> },
    { value: 'favorites', label: 'Favorites', icon: <Heart className="w-4 h-4" /> },
    { value: 'new', label: 'Newest', icon: null },
    { value: 'male', label: 'Male', icon: null },
    { value: 'female', label: 'Female', icon: null }
  ]

  // Sort options
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'age', label: 'Age' },
    { value: 'readyDate', label: 'Ready Date' },
    { value: 'color', label: 'Color' },
    { value: 'size', label: 'Size' }
  ]

  if (loading) {
    return (
      <div className={`puppy-grid ${className}`}>
        {showControls && (
          <div className="grid-controls loading">
            <div className="controls-skeleton">
              <div className="skeleton-line medium"></div>
              <div className="skeleton-line small"></div>
            </div>
          </div>
        )}
        <div className={`grid-container loading-grid columns-${columns}`}>
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="puppy-card-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-line large"></div>
                <div className="skeleton-line medium"></div>
                <div className="skeleton-line small"></div>
                <div className="skeleton-line medium"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (processedPuppies.length === 0) {
    return (
      <div className={`puppy-grid ${className}`}>
        {showControls && (
          <div className="grid-controls">
            <div className="quick-filters">
              {quickFilterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleQuickFilter(option.value)}
                  className={`quick-filter-btn ${quickFilter === option.value ? 'active' : ''}`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="empty-state">
          <div className="empty-icon">🐕</div>
          <h3 className="empty-title">No Puppies Found</h3>
          <p className="empty-message">{emptyMessage}</p>
          {quickFilter !== 'all' && (
            <button 
              onClick={() => handleQuickFilter('all')}
              className="reset-filter-btn"
            >
              Show All Puppies
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`puppy-grid ${className}`}>
      {showControls && (
        <div className="grid-controls">
          {/* Quick Filters */}
          <div className="quick-filters">
            {quickFilterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleQuickFilter(option.value)}
                className={`quick-filter-btn ${quickFilter === option.value ? 'active' : ''}`}
              >
                {option.icon}
                {option.label}
                {option.value === 'favorites' && favorites.length > 0 && (
                  <span className="filter-count">{favorites.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="view-controls">
            {/* Sort Controls */}
            <div className="sort-controls">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="sort-order-btn"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? <SortAsc /> : <SortDesc />}
              </button>
            </div>

            {/* View Mode Toggle */}
            {allowViewToggle && (
              <div className="view-mode-controls">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  title="Grid View"
                >
                  <Grid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                  title="List View"
                >
                  <List />
                </button>
              </div>
            )}

            {/* Column Controls (Grid View Only) */}
            {viewMode === 'grid' && (
              <div className="column-controls">
                <label>Columns:</label>
                <div className="column-buttons">
                  {Array.from({ length: maxColumns - minColumns + 1 }, (_, i) => {
                    const colCount = minColumns + i
                    return (
                      <button
                        key={colCount}
                        onClick={() => setColumns(colCount)}
                        className={`column-btn ${columns === colCount ? 'active' : ''}`}
                      >
                        {colCount}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="results-count">
              {processedPuppies.length} {processedPuppies.length === 1 ? 'puppy' : 'puppies'}
            </div>
          </div>
        </div>
      )}

      {/* Puppies Grid */}
      <div className={`grid-container ${viewMode}-view columns-${columns}`}>
        {processedPuppies.map((puppy, index) => (
          <div
            key={puppy.id}
            className={`grid-item ${hoveredCard === puppy.id ? 'hovered' : ''}`}
            style={{
              animationDelay: `${index * 0.1}s`,
              '--hover-delay': `${animationDelay}s`
            }}
            onMouseEnter={() => handleCardHover(puppy.id, true)}
            onMouseLeave={() => handleCardHover(puppy.id, false)}
          >
            <PuppyCard
              puppy={puppy}
              onViewDetails={handleViewDetails}
              onToggleFavorite={handleFavoriteToggle}
              isFavorite={isFavorite(puppy.id)}
              size={viewMode === 'list' ? 'compact' : 'standard'}
              showDetails={true}
              showInquireButton={true}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PuppyGrid