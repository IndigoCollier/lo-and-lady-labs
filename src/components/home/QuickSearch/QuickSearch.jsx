import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Heart } from 'lucide-react'
import Button from '../../common/Button'
import './QuickSearch.css' 

const quickFilters = [
  { id: 'all', label: 'All Puppies', icon: '🐕', filterType: null, filterValue: null },
  { id: 'male', label: 'Male', icon: '♂️', filterType: 'gender', filterValue: 'male' },
  { id: 'female', label: 'Female', icon: '♀️', filterType: 'gender', filterValue: 'female' },
  { id: 'small', label: 'Small', icon: '🐕‍🦺', filterType: 'size', filterValue: 'mini' },
  { id: 'medium', label: 'Medium', icon: '🐕', filterType: 'size', filterValue: 'medium' },
  { id: 'large', label: 'Large', icon: '🐕‍🦮', filterType: 'size', filterValue: 'standard' }
]

const popularSearches = [
  { term: 'Gentle temperament', filterType: 'temperament', filterValue: 'gentle' },
  { term: 'Good with kids', filterType: 'temperament', filterValue: 'gentle' },
  { term: 'Ready soon', filterType: 'availability', filterValue: 'available' },
  { term: 'Cream colored', filterType: 'color', filterValue: 'cream' },
  { term: 'Golden puppies', filterType: 'color', filterValue: 'golden' },
  { term: 'Playful', filterType: 'temperament', filterValue: 'playful' }
]

function QuickSearch() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Handle main search functionality
  const handleSearch = () => {
    const params = new URLSearchParams()
    
    // Add search term if provided
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim())
    }
    
    // Add filter if not 'all'
    if (selectedFilter !== 'all') {
      const filter = quickFilters.find(f => f.id === selectedFilter)
      if (filter && filter.filterType && filter.filterValue) {
        params.set(filter.filterType, filter.filterValue)
      }
    }
    
    // Navigate with parameters
    const queryString = params.toString()
    navigate(queryString ? `/puppies?${queryString}` : '/puppies')
  }

  // Handle quick filter button clicks with immediate navigation
  const handleFilterClick = (filterId) => {
    setSelectedFilter(filterId)
    
    // Immediately navigate if it's not 'all'
    if (filterId !== 'all') {
      const filter = quickFilters.find(f => f.id === filterId)
      if (filter && filter.filterType && filter.filterValue) {
        navigate(`/puppies?${filter.filterType}=${filter.filterValue}`)
      }
    } else {
      // If 'all' is selected, go to unfiltered puppies page
      navigate('/puppies')
    }
  }

  // Handle popular search tag clicks
  const handleQuickSearch = (searchItem) => {
    if (searchItem.filterType && searchItem.filterValue) {
      navigate(`/puppies?${searchItem.filterType}=${searchItem.filterValue}`)
    } else {
      // Fallback for text search
      navigate(`/puppies?search=${encodeURIComponent(searchItem.term)}`)
    }
  }

  // Handle advanced filter navigation with proper parameters
  const handleAdvancedFilter = (filterType, filterValue) => {
    navigate(`/puppies?${filterType}=${filterValue}`)
  }

  // Handle Enter key in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="quick-search-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Find Your Perfect Match</h2>
          <p className="hero-subtitle">
            Search our available puppies or browse by your preferences
          </p>
        </div>

        <div className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, color, temperament..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="quick-filters">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`filter-button ${selectedFilter === filter.id ? 'active' : ''}`}
              >
                <span className="filter-icon">{filter.icon}</span>
                <span className="filter-label">{filter.label}</span>
              </button>
            ))}
          </div>

          <Button 
            variant="primary" 
            size="large"
            onClick={handleSearch}
            className="search-cta"
          >
            <Search className="button-icon" />
            Search Puppies
          </Button>
        </div>

        <div className="popular-searches">
          <h3 className="popular-title">Popular Searches:</h3>
          <div className="popular-tags">
            {popularSearches.map((searchItem, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(searchItem)}
                className="popular-tag"
              >
                {searchItem.term}
              </button>
            ))}
          </div>
        </div>

        <div className="search-features">
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <Filter />
              </div>
              <h4 className="feature-title">Advanced Filters</h4>
              <p className="feature-description">
                Filter by size, temperament, age, and more to find your perfect match
              </p>
              <div className="advanced-filters">
                <button 
                  onClick={() => handleAdvancedFilter('availability', 'available')}
                  className="advanced-filter-btn"
                >
                  Available Now
                </button>
                <button 
                  onClick={() => handleAdvancedFilter('price', '2500-2750')}
                  className="advanced-filter-btn"
                >
                  Budget Friendly
                </button>
                <button 
                  onClick={() => handleAdvancedFilter('age', '8-10')}
                  className="advanced-filter-btn"
                >
                  8-10 Weeks Old
                </button>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <Heart />
              </div>
              <h4 className="feature-title">Save Favorites</h4>
              <p className="feature-description">
                Save your favorite puppies and get notifications when similar ones are available
              </p>
              <div className="advanced-filters">
                <button 
                  onClick={() => navigate('/puppies')}
                  className="advanced-filter-btn favorites"
                >
                  View My Favorites
                </button>
                
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <Search />
              </div>
              <h4 className="feature-title">Smart Search</h4>
              <p className="feature-description">
                Our intelligent search understands natural language to find exactly what you're looking for
              </p>
              <div className="advanced-filters">
                <button 
                  onClick={() => handleAdvancedFilter('color', 'cream')}
                  className="advanced-filter-btn"
                >
                  Cream Colored
                </button>
                <button 
                  onClick={() => handleAdvancedFilter('color', 'golden')}
                  className="advanced-filter-btn"
                >
                  Golden Colored
                </button>
                <button 
                  onClick={() => navigate('/puppies')}
                  className="advanced-filter-btn"
                >
                  Browse All
                </button>
                <button 
                  onClick={() => handleAdvancedFilter('temperament', 'gentle')}
                  className="advanced-filter-btn"
                >
                  Gentle Puppies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickSearch