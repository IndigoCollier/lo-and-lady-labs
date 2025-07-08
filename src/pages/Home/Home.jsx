import HeroCarousel from '../../components/home/HeroCarousel'
import FeaturedPuppies from '../../components/home/FeaturedPuppies'

function Home() {
  return (
    <div>
      <HeroCarousel />
      <FeaturedPuppies />
      
      <section style={{ 
        padding: '4rem 0', 
        textAlign: 'center', 
        background: '#FFFFFF' 
      }}>
        <div className="container">
          <h2 style={{ 
            color: '#1B365D', 
            marginBottom: '1rem',
            fontSize: '2.5rem',
            fontWeight: '700'
          }}>
            Why Choose Lo and Lady Labs?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
            maxWidth: '800px',
            margin: '3rem auto 0'
          }}> {/* ← ADD THIS CLOSING BRACE AND ANGLE BRACKET */}
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
              <h3 style={{ color: '#1B365D', marginBottom: '1rem' }}>Premium Breeding</h3>
              <p style={{ color: '#3C4043' }}>
                Health tested parents, champion bloodlines, and exceptional care standards.
              </p>
            </div>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
              <h3 style={{ color: '#1B365D', marginBottom: '1rem' }}>Family Raised</h3>
              <p style={{ color: '#3C4043' }}>
                Every puppy is raised in our home with love, socialization, and individual attention.
              </p>
            </div>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ color: '#1B365D', marginBottom: '1rem' }}>Perfect Match</h3>
              <p style={{ color: '#3C4043' }}>
                We carefully match each puppy to the right family based on lifestyle and needs.
              </p>
            </div>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ color: '#1B365D', marginBottom: '1rem' }}>Lifetime Support</h3>
            <p style={{ color: '#3C4043' }}>
               Comprehensive support throughout your puppy's life with training resources and guidance.
           </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home