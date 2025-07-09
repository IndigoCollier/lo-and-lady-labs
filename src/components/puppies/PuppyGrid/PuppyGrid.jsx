import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Grid, List, Filter, SortAsc } from 'lucide-react'
import PuppyCard from '../PuppyCard'
import GridControls from '../GridControls'
import { useFavorites } from '../../../hooks/useFavorites'
import { useViewPreferences } from '../../../hooks/useViewPreferences'
import './PuppyGrid.css'

function PuppyGrid({
  puppies = [],
  loading = false,
  onViewDetails,
  emptyMessage = "No puppies found",
  showControls = true,
  defaultColumns = 3,
  maxColumns = 4,
  minColumns = 1,
  allowViewToggle = true,
  className = '',
  // SAFE: Simple URL props (no complex state management)
  urlGender = null,
  urlStatus = null,
  urlSort = null
}) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { viewPreferences, updateViewPreferences } = useViewPreferences()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [animationDelay, setAnimationDelay] = useState(0)

  // SAFE: Simple state initialization
  const [columns, setColumns] = useState(defaultColumns)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState(() => {
    // SAFE: Set initial sort from URL, but don't cause re-renders
    if (urlSort === 'price') return 'price'
    return 'name'
  })
  const [filterBy, setFilterBy] = useState(() => {
    // SAFE: Set initial filter from URL, but don't cause re-renders
    if (urlGender === 'male') return 'male'
    if (urlGender === 'female') return 'female'
    if (urlStatus === 'available') return 'available'
    return 'all'
  })

  // SAFE: Simple preference update (debounced to prevent loops)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateViewPreferences({ columns, viewMode, sortBy, filterBy })
    }, 1000) // Longer timeout to prevent loops

    return () => clearTimeout(timeoutId)
  }, [columns, viewMode, sortBy, filterBy, updateViewPreferences])

  const handleCardHover = useCallback((puppyId, isHovering) => {
    if (isHovering) {
      setHoveredCard(puppyId)
      setAnimationDelay(Math.random() * 0.2)
    } else {
      setHoveredCard(null)
      setAnimationDelay(0)
    }
  }, [])

  const handleViewDetails = useCallback((puppyId) => {
    if (onViewDetails) {
      onViewDetails(puppyId)
    }
  }, [onViewDetails])

  const handleFavoriteToggle = useCallback((puppyId) => {
    toggleFavorite(puppyId)
  }, [toggleFavorite])

  // SAFE: Filter and sort puppies (no complex state dependencies)
  const processedPuppies = useMemo(() => {
    let filtered = [...puppies]

    // Apply filters
    if (filterBy !== 'all') {
      switch (filterBy) {
        case 'available':
          filtered = filtered.filter(puppy => puppy.available)
          break
        case 'pending':
          filtered = filtered.filter(puppy => !puppy.available)
          break
        case 'favorites':
          filtered = filtered.filter(puppy => isFavorite(puppy.id))
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
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price':
          return a.price - b.price
        case 'age':
          return parseInt(a.age) - parseInt(b.age)
        case 'readyDate':
          return new Date(a.readyDate) - new Date(b.readyDate)
        default:
          return 0
      }
    })

    return filtered
  }, [puppies, filterBy, sortBy, isFavorite])

  if (loading) {
    return (
      <div className={`puppy-grid ${className}`}>
        {showControls && (
          <GridControls
            columns={columns}
            onColumnsChange={setColumns}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
            maxColumns={maxColumns}
            minColumns={minColumns}
            allowViewToggle={allowViewToggle}
            disabled={true}
          />
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
          <GridControls
            columns={columns}
            onColumnsChange={setColumns}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
            maxColumns={maxColumns}
            minColumns={minColumns}
            allowViewToggle={allowViewToggle}
            disabled={false}
          />
        )}
        <div className="empty-state">
          <div className="empty-icon">🐕</div>
          <h3 className="empty-title">No Puppies Found</h3>
          <p className="empty-message">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`puppy-grid ${className}`}>
      {showControls && (
        <GridControls
          columns={columns}
          onColumnsChange={setColumns}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterBy={filterBy}
          onFilterChange={setFilterBy}
          maxColumns={maxColumns}
          minColumns={minColumns}
          allowViewToggle={allowViewToggle}
          disabled={false}
          resultsCount={processedPuppies.length}
        />
      )}

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
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PuppyGrid