import React, { useState } from 'react'
import { useFavorites } from '../hooks/useFavorites'
import PuppyGrid from '../components/puppies/PuppyGrid'
import PuppyCard from '../components/puppies/PuppyCard'
import FavoriteButton from '../components/puppies/FavoriteButton'
import AdoptionStatus from '../components/puppies/AdoptionStatus'
import { mockPuppies } from '../data/mockPuppies'

function TestPuppyCards() {
  const { toggleFavorite, isFavorite } = useFavorites()
  const [isLoading, setIsLoading] = useState(false)
  const [testPuppies] = useState(mockPuppies)

  const handleViewDetails = (puppyId) => {
    console.log('View details for puppy:', puppyId)
    alert(`Viewing details for puppy ID: ${puppyId}`)
  }

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }

  return (
    <div style={{ padding: '2rem', background: '#F5E6D3', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1B365D' }}>
          Complete Puppy Grid System Test
        </h1>

        {/* Test Controls */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <button 
            onClick={simulateLoading}
            style={{
              background: '#4A90E2',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              marginRight: '1rem'
            }}
          >
            Test Loading State (3s)
          </button>
          <span style={{ color: '#5F6368' }}>
            Test grid controls, sorting, filtering, and view modes below
          </span>
        </div>

        {/* Main Grid Test */}
        <PuppyGrid
          puppies={testPuppies}
          loading={isLoading}
          onViewDetails={handleViewDetails}
          showControls={true}
          defaultColumns={3}
          maxColumns={4}
          minColumns={1}
          allowViewToggle={true}
          emptyMessage="No puppies found - try adjusting your filters!"
        />

        {/* Component Tests */}
        <div style={{ marginTop: '4rem', background: '#FFFFFF', padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ color: '#1B365D', marginBottom: '2rem' }}>Individual Component Tests</h2>
          
          {/* Status Badge Tests */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1B365D', marginBottom: '1rem' }}>Status Badges:</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <AdoptionStatus status="available" />
              <AdoptionStatus status="pending" />
              <AdoptionStatus status="adopted" />
              <AdoptionStatus status="reserved" />
              <AdoptionStatus status="unavailable" />
            </div>
          </div>

          {/* Favorite Button Tests */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1B365D', marginBottom: '1rem' }}>Favorite Buttons (Click to test animation):</h3>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              {['small', 'medium', 'large'].map(size => (
                <div key={size} style={{ 
                  position: 'relative', 
                  width: '80px', 
                  height: '80px', 
                  background: '#E8EAED', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FavoriteButton 
                    isActive={isFavorite(size)}
                    onClick={() => toggleFavorite(size)}
                    size={size}
                    puppyName="Test Puppy"
                  />
                  <span style={{ 
                    position: 'absolute', 
                    bottom: '-1.5rem', 
                    fontSize: '0.8rem',
                    color: '#5F6368',
                    textAlign: 'center',
                    width: '100%'
                  }}>
                    {size}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Single Card Test */}
          <div>
            <h3 style={{ color: '#1B365D', marginBottom: '1rem' }}>Single Card Test:</h3>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <PuppyCard
                puppy={testPuppies[0]}
                onViewDetails={handleViewDetails}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite(testPuppies[0].id)}
              />
            </div>
          </div>
        </div>

        {/* Testing Instructions */}
        <div style={{ marginTop: '2rem', background: '#E8F4FD', padding: '2rem', borderRadius: '16px' }}>
          <h3 style={{ color: '#1B365D', marginBottom: '1rem' }}>Testing Instructions:</h3>
          <ul style={{ color: '#5F6368', lineHeight: '1.6' }}>
            <li>Use the grid controls to change columns (1-4)</li>
            <li>Toggle between grid and list view</li>
            <li>Test sorting by name, price, age, ready date</li>
            <li>Test filtering by availability, gender, favorites</li>
            <li>Click favorite buttons to test animations</li>
            <li>Test responsive behavior by resizing window</li>
            <li>Check that preferences persist after page refresh</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TestPuppyCards