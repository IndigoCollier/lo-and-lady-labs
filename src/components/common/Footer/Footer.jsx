import { Crown, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1B365D 0%, #0F1B2F 100%)',
      color: '#F5E6D3',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          padding: '4rem 0 2rem'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              fontWeight: '700',
              fontSize: '1.5rem'
            }}>
              <Crown style={{ 
                color: '#D4AF37', 
                width: '28px', 
                height: '28px',
                filter: 'drop-shadow(0 2px 4px rgba(212, 175, 55, 0.3))'
              }} />
              <span Link to="/" style={{ color: '#FFFFFF' }}>Lo and Lady Labs</span>
            </div>
            <p style={{ 
              color: '#F5E6D3', 
              lineHeight: '1.7',
              fontSize: '1.1rem',
              opacity: '0.9'
            }}>
              Connecting discerning families with exceptional labradoodle companions. 
              Premium breeding, lifetime support.
            </p>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 style={{ 
              marginBottom: '1.5rem', 
              fontSize: '1.25rem',
              color: '#D4AF37',
              fontWeight: '600',
              letterSpacing: '0.025em'
            }}>
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                color: '#F5E6D3',
                fontSize: '1.05rem'
              }}>
                <Phone style={{ 
                  width: '20px', 
                  height: '20px', 
                  color: '#D4AF37',
                  filter: 'drop-shadow(0 1px 2px rgba(212, 175, 55, 0.3))'
                }} />
                <span>(901) 123-4567</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                color: '#F5E6D3',
                fontSize: '1.05rem'
              }}>
                <Mail style={{ 
                  width: '20px', 
                  height: '20px', 
                  color: '#D4AF37',
                  filter: 'drop-shadow(0 1px 2px rgba(212, 175, 55, 0.3))'
                }} />
                <span>hello@loandladylabs.com</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                color: '#F5E6D3',
                fontSize: '1.05rem'
              }}>
                <MapPin style={{ 
                  width: '20px', 
                  height: '20px', 
                  color: '#D4AF37',
                  filter: 'drop-shadow(0 1px 2px rgba(212, 175, 55, 0.3))'
                }} />
                <span>Memphis, TN</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(245, 230, 211, 0.2)',
          padding: '2rem 0',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'rgba(245, 230, 211, 0.8)', 
            fontSize: '0.95rem',
            letterSpacing: '0.025em'
          }}>
            &copy; 2025 Lo and Lady Labs. Crafted with ❤️ for exceptional families.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer