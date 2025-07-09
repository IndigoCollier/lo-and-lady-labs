import React, { useState } from 'react'
import { Search, Filter, Heart } from 'lucide-react'
import Button from '../../common/Button'
import './QuickSearch.css' 

const quickFilters = [
  { id: 'all', label: 'All Puppies', icon: '🐕' },
  { id: 'male', label: 'Male', icon: '♂️' },
  { id: 'female', label: 'Female', icon: '♀️' },
  { id: 'small', label: 'Small', icon: '🐕‍🦺' },
  { id: 'medium', label: 'Medium', icon: '🐕' },
  { id: 'large', label: 'Large', icon: '🐕‍🦮' }
]

const popularSearches = [
  'Gentle temperament',
  'Good with kids',
  'Ready soon',
  'Cream colored',
  'Low energy',
  'Playful'
]

function QuickSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedFilter !== 'all') params.set('filter', selectedFilter)
    
    window.location.href = `/puppies?${params.toString()}`
  }

  const handleQuickSearch = (term) => {
    window.location.href = `/puppies?search=${encodeURIComponent(term)}`
  }

  return (
    <section className="quick-search-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Find Your Perfect Match</h2>
          <p className="section-subtitle">
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
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className="quick-filters">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
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
            {popularSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(term)}
                className="popular-tag"
              >
                {term}
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
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <Heart />
              </div>
              <h4 className="feature-title">Save Favorites</h4>
              <p className="feature-description">
                Save your favorite puppies and get notifications when similar ones are available
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <Search />
              </div>
              <h4 className="feature-title">Smart Search</h4>
              <p className="feature-description">
                Our intelligent search understands natural language to find exactly what you're looking for
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickSearch