
import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Filter, X } from 'lucide-react'
import PuppyGrid from '../../components/puppies/PuppyGrid'
import { mockPuppies } from '../../data/mockPuppies'
import './Puppies.css'

function Puppies() {
  const navigate = useNavigate()
  const [puppies, setPuppies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    gender: '',
    color: '',
    size: '',
    temperament: '',
    price: '',
    availability: '',
    age: ''
  })

  // Initialize filters from URL params
  useEffect(() => {
    const urlFilters = {
      gender: searchParams.get('gender') || '',
      color: searchParams.get('color') || '',
      size: searchParams.get('size') || '',
      temperament: searchParams.get('temperament') || '',
      price: searchParams.get('price') || '',
      availability: searchParams.get('availability') || '',
      age: searchParams.get('age') || ''
    }
    setActiveFilters(urlFilters)
    setSearchTerm(searchParams.get('search') || '')
  }, [searchParams])

  useEffect(() => {
    const loadPuppies = async () => {
      try {
        setLoading(true)
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setPuppies(mockPuppies)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPuppies()
  }, [])

  // Enhanced search term mapping for natural language
  const mapSearchTerm = (term) => {
    const normalizedTerm = term.toLowerCase().trim()
    
    // Gender mappings
    if (['male', 'boy', 'boys', 'males'].includes(normalizedTerm)) return { type: 'gender', value: 'male' }
    if (['female', 'girl', 'girls', 'females'].includes(normalizedTerm)) return { type: 'gender', value: 'female' }
    
    // Size mappings
    if (['small', 'mini', 'tiny', 'little'].includes(normalizedTerm)) return { type: 'size', value: 'mini' }
    if (['medium', 'med', 'middle'].includes(normalizedTerm)) return { type: 'size', value: 'medium' }
    if (['large', 'big', 'standard', 'huge'].includes(normalizedTerm)) return { type: 'size', value: 'standard' }
    
    // Color mappings
    if (['cream', 'white', 'light'].includes(normalizedTerm)) return { type: 'color', value: 'cream' }
    if (['golden', 'gold', 'blonde'].includes(normalizedTerm)) return { type: 'color', value: 'golden' }
    if (['apricot', 'orange', 'peach'].includes(normalizedTerm)) return { type: 'color', value: 'apricot' }
    if (['chocolate', 'brown', 'dark'].includes(normalizedTerm)) return { type: 'color', value: 'chocolate' }
    if (['black', 'dark'].includes(normalizedTerm)) return { type: 'color', value: 'black' }
    
    // Temperament mappings
    if (['gentle', 'calm', 'quiet', 'peaceful', 'mild'].includes(normalizedTerm)) return { type: 'temperament', value: 'gentle' }
    if (['playful', 'fun', 'active', 'lively'].includes(normalizedTerm)) return { type: 'temperament', value: 'playful' }
    if (['energetic', 'hyper', 'bouncy', 'excited'].includes(normalizedTerm)) return { type: 'temperament', value: 'energetic' }
    if (['smart', 'intelligent', 'clever', 'bright'].includes(normalizedTerm)) return { type: 'temperament', value: 'intelligent' }
    if (['loving', 'affectionate', 'cuddly', 'sweet'].includes(normalizedTerm)) return { type: 'temperament', value: 'affectionate' }
    if (['confident', 'bold', 'brave', 'strong'].includes(normalizedTerm)) return { type: 'temperament', value: 'confident' }
    if (['social', 'friendly', 'outgoing'].includes(normalizedTerm)) return { type: 'temperament', value: 'social' }
    
    // Availability mappings
    if (['available', 'ready', 'open'].includes(normalizedTerm)) return { type: 'availability', value: 'available' }
    if (['pending', 'reserved', 'taken'].includes(normalizedTerm)) return { type: 'availability', value: 'pending' }
    
    // Age mappings
    if (['young', 'baby', 'puppy', 'new'].includes(normalizedTerm)) return { type: 'age', value: 'under-8' }
    if (['older', 'mature', 'ready'].includes(normalizedTerm)) return { type: 'age', value: 'over-10' }
    
    // Price mappings
    if (['cheap', 'affordable', 'budget', 'low'].includes(normalizedTerm)) return { type: 'price', value: 'under-2500' }
    if (['expensive', 'premium', 'high'].includes(normalizedTerm)) return { type: 'price', value: 'over-3000' }
    
    return null
  }

  // Filter puppies based on search term and active filters
  const filteredPuppies = puppies.filter(puppy => {
    // Enhanced search term filter with natural language mapping
    const matchesSearch = !searchTerm || (() => {
      const searchLower = searchTerm.toLowerCase()
      
      // Check if search term matches mapped values
      const mappedSearch = mapSearchTerm(searchTerm)
      if (mappedSearch) {
        switch (mappedSearch.type) {
          case 'gender':
            return puppy.gender.toLowerCase() === mappedSearch.value
          case 'size':
            return puppy.size.toLowerCase().includes(mappedSearch.value)
          case 'color':
            return puppy.color.toLowerCase().includes(mappedSearch.value)
          case 'temperament':
            return puppy.temperament.toLowerCase().includes(mappedSearch.value) ||
                   puppy.personality.some(trait => trait.toLowerCase().includes(mappedSearch.value))
          case 'availability':
            return mappedSearch.value === 'available' ? puppy.available : !puppy.available
          case 'age':
            const ageInWeeks = puppy.ageInWeeks || parseInt(puppy.age)
            switch (mappedSearch.value) {
              case 'under-8': return ageInWeeks < 8
              case 'over-10': return ageInWeeks > 10
              default: return true
            }
          case 'price':
            const price = puppy.price
            switch (mappedSearch.value) {
              case 'under-2500': return price < 2500
              case 'over-3000': return price > 3000
              default: return true
            }
          default:
            return false
        }
      }
      
      // Original text-based search (fallback)
      return puppy.name.toLowerCase().includes(searchLower) ||
             puppy.color.toLowerCase().includes(searchLower) ||
             puppy.temperament.toLowerCase().includes(searchLower) ||
             puppy.description.toLowerCase().includes(searchLower) ||
             puppy.personality.some(trait => trait.toLowerCase().includes(searchLower)) ||
             puppy.gender.toLowerCase().includes(searchLower) ||
             puppy.size.toLowerCase().includes(searchLower)
    })()

    // Gender filter
    const matchesGender = !activeFilters.gender || 
      puppy.gender.toLowerCase() === activeFilters.gender.toLowerCase()

    // Color filter (includes variations like "chocolate", "apricot", etc.)
    const matchesColor = !activeFilters.color || 
      puppy.color.toLowerCase().includes(activeFilters.color.toLowerCase())

    // Size filter
    const matchesSize = !activeFilters.size || 
      puppy.size.toLowerCase().includes(activeFilters.size.toLowerCase())

    // Temperament filter
    const matchesTemperament = !activeFilters.temperament || 
      puppy.temperament.toLowerCase().includes(activeFilters.temperament.toLowerCase()) ||
      puppy.personality.some(trait => trait.toLowerCase().includes(activeFilters.temperament.toLowerCase()))

    // Price filter
    const matchesPrice = !activeFilters.price || (() => {
      const price = puppy.price
      switch (activeFilters.price) {
        case 'under-2500': return price < 2500
        case '2500-2750': return price >= 2500 && price <= 2750
        case '2750-3000': return price >= 2750 && price <= 3000
        case 'over-3000': return price > 3000
        default: return true
      }
    })()

    // Availability filter
    const matchesAvailability = !activeFilters.availability || 
      (activeFilters.availability === 'available' && puppy.available) ||
      (activeFilters.availability === 'pending' && !puppy.available)

    // Age filter
    const matchesAge = !activeFilters.age || (() => {
      const ageInWeeks = puppy.ageInWeeks || parseInt(puppy.age)
      switch (activeFilters.age) {
        case 'under-8': return ageInWeeks < 8
        case '8-10': return ageInWeeks >= 8 && ageInWeeks <= 10
        case 'over-10': return ageInWeeks > 10
        default: return true
      }
    })()

    return matchesSearch && matchesGender && matchesColor && matchesSize && 
           matchesTemperament && matchesPrice && matchesAvailability && matchesAge
  })

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set('search', value)
    } else {
      newParams.delete('search')
    }
    setSearchParams(newParams)
  }

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value }
    setActiveFilters(newFilters)
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(filterType, value)
    } else {
      newParams.delete(filterType)
    }
    setSearchParams(newParams)
  }

  const clearAllFilters = () => {
    setActiveFilters({
      gender: '',
      color: '',
      size: '',
      temperament: '',
      price: '',
      availability: '',
      age: ''
    })
    setSearchTerm('')
    setSearchParams({})
  }

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(Boolean).length + (searchTerm ? 1 : 0)
  }

  // UPDATED: Replace the old handleViewDetails with proper navigation
const handleViewDetails = (puppyId) => {
  navigate(`/puppies/${puppyId}`)
}

  if (error) {
    return (
      <div className="puppies-page">
        <div className="container">
          <div className="error-state">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="puppies-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Find Your Perfect Labradoodle</h1>
          <p className="page-subtitle">
            Browse our available puppies and find your new best friend. Each puppy is health tested, vaccinated, and ready to bring joy to your family.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="search-filter-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, color, temperament..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange({ target: { value: '' } })}
                  className="clear-search-btn"
                >
                  <X />
                </button>
              )}
            </div>
          </div>

          <div className="filter-controls">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
            >
              <Filter />
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="filter-count">{getActiveFilterCount()}</span>
              )}
            </button>

            {getActiveFilterCount() > 0 && (
              <button onClick={clearAllFilters} className="clear-filters-btn">
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-grid">
              {/* Gender Filter */}
              <div className="filter-group">
                <label>Gender</label>
                <select
                  value={activeFilters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Color Filter */}
              <div className="filter-group">
                <label>Color</label>
                <select
                  value={activeFilters.color}
                  onChange={(e) => handleFilterChange('color', e.target.value)}
                >
                  <option value="">All Colors</option>
                  <option value="cream">Cream</option>
                  <option value="golden">Golden</option>
                  <option value="apricot">Apricot</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="black">Black</option>
                  <option value="parti">Parti</option>
                  <option value="phantom">Phantom</option>
                </select>
              </div>

              {/* Size Filter */}
              <div className="filter-group">
                <label>Size</label>
                <select
                  value={activeFilters.size}
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                >
                  <option value="">All Sizes</option>
                  <option value="mini">Mini (15-30 lbs)</option>
                  <option value="medium">Medium (30-50 lbs)</option>
                  <option value="standard">Standard (50+ lbs)</option>
                </select>
              </div>

              {/* Temperament Filter */}
              <div className="filter-group">
                <label>Temperament</label>
                <select
                  value={activeFilters.temperament}
                  onChange={(e) => handleFilterChange('temperament', e.target.value)}
                >
                  <option value="">All Temperaments</option>
                  <option value="gentle">Gentle</option>
                  <option value="playful">Playful</option>
                  <option value="calm">Calm</option>
                  <option value="energetic">Energetic</option>
                  <option value="confident">Confident</option>
                  <option value="social">Social</option>
                  <option value="intelligent">Intelligent</option>
                  <option value="affectionate">Affectionate</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <label>Price Range</label>
                <select
                  value={activeFilters.price}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                >
                  <option value="">All Prices</option>
                  <option value="under-2500">Under $2,500</option>
                  <option value="2500-2750">$2,500 - $2,750</option>
                  <option value="2750-3000">$2,750 - $3,000</option>
                  <option value="over-3000">Over $3,000</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="filter-group">
                <label>Availability</label>
                <select
                  value={activeFilters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                >
                  <option value="">All Puppies</option>
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Age Filter */}
              <div className="filter-group">
                <label>Age</label>
                <select
                  value={activeFilters.age}
                  onChange={(e) => handleFilterChange('age', e.target.value)}
                >
                  <option value="">All Ages</option>
                  <option value="under-8">Under 8 weeks</option>
                  <option value="8-10">8-10 weeks</option>
                  <option value="over-10">Over 10 weeks</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="active-filters">
            <span className="active-filters-label">Active Filters:</span>
            <div className="filter-tags">
              {searchTerm && (
                <span className="filter-tag">
                  Search: "{searchTerm}"
                  <button onClick={() => handleSearchChange({ target: { value: '' } })}>
                    <X />
                  </button>
                </span>
              )}
              {Object.entries(activeFilters).map(([key, value]) => 
                value && (
                  <span key={key} className="filter-tag">
                    {key}: {value}
                    <button onClick={() => handleFilterChange(key, '')}>
                      <X />
                    </button>
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            {loading ? 'Loading...' : `Showing ${filteredPuppies.length} of ${puppies.length} puppies`}
          </p>
        </div>

        <PuppyGrid
          puppies={filteredPuppies}
          loading={loading}
          onViewDetails={handleViewDetails}
          emptyMessage="No puppies match your current search and filters. Try adjusting your criteria or check back later for new arrivals."
          showControls={true}
          defaultColumns={3}
          maxColumns={4}
          minColumns={1}
          allowViewToggle={true}
        />
      </div>
    </div>
  )
}

export default Puppies