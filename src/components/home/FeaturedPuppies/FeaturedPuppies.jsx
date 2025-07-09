import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getFeaturedPuppies, formatPrice } from '../../../data/mockPuppies'

function FeaturedPuppies() {
  const navigate = useNavigate()
  const featuredPuppies = getFeaturedPuppies(3)

  // FIXED: Add navigation function
  const goToPuppiesPage = () => {
    navigate('/puppies')
  }

  const goToPuppyDetail = (puppyId) => {
    // For now, just log - you can implement puppy detail pages later
    console.log('Navigate to puppy detail:', puppyId)
    alert(`Viewing ${puppyId} details - This will be implemented later!`)
  }

  return (
    <section style={{ padding: '4rem 0', background: '#F5F5F5' }}>
      <div className="container">
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          color: '#1B365D',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          Meet Our Available Puppies
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '1.25rem',
          color: '#3C4043',
          marginBottom: '3rem'
        }}>
          Each puppy is lovingly raised and ready for their forever home
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {featuredPuppies.map((puppy) => (
            <div key={puppy.id} style={{
              background: 'white',
              padding: '0',
              borderRadius: '15px',
              boxShadow: '0 8px 30px rgba(27, 54, 93, 0.1)',
              textAlign: 'center',
              overflow: 'hidden',
              transition: 'transform 0.3s ease'
            }}>
              <img 
                src={puppy.image} 
                alt={puppy.name}
                style={{ 
                  width: '100%', 
                  height: '250px', 
                  objectFit: 'cover'
                }}
              />
              
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  color: '#1B365D', 
                  margin: '0 0 1rem 0',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>
                  {puppy.name}
                </h3>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  textAlign: 'left'
                }}>
                  <div><strong>Age:</strong> {puppy.age}</div>
                  <div><strong>Gender:</strong> {puppy.gender}</div>
                  <div><strong>Color:</strong> {puppy.color}</div>
                  <div><strong>Size:</strong> {puppy.size.split(' ')[0]}</div>
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {puppy.personality.slice(0, 2).map((trait, index) => (
                    <span key={index} style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4E4BC)',
                      color: '#1B365D',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {trait}
                    </span>
                  ))}
                </div>
                
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#D4AF37',
                  marginBottom: '1rem'
                }}>
                  {formatPrice(puppy.price)}
                </div>
                
                {/* FIXED: Added onClick handler for individual puppy buttons */}
                <button 
                  onClick={() => goToPuppyDetail(puppy.name)}
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Meet {puppy.name}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* FIXED: Added onClick handler for "View All Available Puppies" button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={goToPuppiesPage}
            style={{
              background: 'transparent',
              color: '#1B365D',
              border: '2px solid #1B365D',
              padding: '1rem 2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#1B365D'
              e.target.style.color = 'white'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.color = '#1B365D'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            View All Available Puppies
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPuppies