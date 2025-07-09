import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PuppyGrid from '../../components/puppies/PuppyGrid'
import { mockPuppies } from '../../data/mockPuppies'
import './Puppies.css'

function Puppies() {
  const [puppies, setPuppies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()

  // SAFE: Read URL parameters once, no state updates
  const urlGender = searchParams.get('gender')
  const urlStatus = searchParams.get('status') 
  const urlSort = searchParams.get('sort')

  useEffect(() => {
    const loadPuppies = async () => {
      try {
        setLoading(true)
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Use all mock puppies (available and pending)
        setPuppies(mockPuppies)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPuppies()
  }, [])

  const handleViewDetails = (puppyId) => {
    // Navigate to puppy detail page (will implement routing later)
    console.log('Navigate to puppy detail:', puppyId)
    // For now, just show an alert
    alert(`Viewing details for puppy ID: ${puppyId}. This will navigate to the detail page once routing is implemented.`)
  }

  // SAFE: Simple message based on URL params (no state)
  const getPageMessage = () => {
    if (urlGender === 'male') {
      return "Showing male puppies - energetic and loyal companions"
    } else if (urlGender === 'female') {
      return "Showing female puppies - gentle and loving companions"  
    } else if (urlStatus === 'available') {
      return "Showing available puppies - ready for their forever homes"
    } else if (urlSort === 'price') {
      return "Sorted by price (low to high) - find the perfect match for your budget"
    }
    
    return "Browse our available puppies and find your new best friend. Each puppy is health tested, vaccinated, and ready to bring joy to your family."
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
            {getPageMessage()}
          </p>
          
          {/* SAFE: Simple filter indicator (no complex state) */}
          {(urlGender || urlStatus || urlSort) && (
            <div className="active-filters">
              {urlGender && (
                <span className="filter-badge filter-badge-primary">
                  Filter: {urlGender === 'male' ? 'Male Puppies' : 'Female Puppies'}
                </span>
              )}
              {urlStatus && (
                <span className="filter-badge filter-badge-primary">
                  Status: Available
                </span>
              )}
              {urlSort && (
                <span className="filter-badge filter-badge-secondary">
                  Sort: Price
                </span>
              )}
            </div>
          )}
        </div>

        <PuppyGrid
          puppies={puppies}
          loading={loading}
          onViewDetails={handleViewDetails}
          emptyMessage="No puppies match your current filters. Try adjusting your search criteria or check back later for new arrivals."
          showControls={true}
          defaultColumns={3}
          maxColumns={4}
          minColumns={1}
          allowViewToggle={true}
          // SAFE: Pass URL params as simple props (no callbacks)
          urlGender={urlGender}
          urlStatus={urlStatus}
          urlSort={urlSort}
        />
      </div>
    </div>
  )
}

export default Puppies