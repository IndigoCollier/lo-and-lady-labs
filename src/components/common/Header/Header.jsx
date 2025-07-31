import { Link, useLocation } from 'react-router-dom'
import { Crown, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 20px rgba(27, 54, 93, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #F5E6D3'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 0'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: '#1B365D',
            fontWeight: '700',
            fontSize: '1.5rem',
            letterSpacing: '-0.025em'
          }}>
            <Crown style={{ 
              color: '#D4AF37', 
              width: '28px', 
              height: '28px',
              filter: 'drop-shadow(0 2px 4px rgba(212, 175, 55, 0.3))'
            }} />
            <span style={{
              background: 'linear-gradient(135deg, #1B365D 0%, #2C5282 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Lo and Lady Labs
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', gap: '3rem' }}>
            <Link 
              to="/" 
              style={{
                textDecoration: 'none',
                color: isActive('/') ? '#D4AF37' : '#1B365D',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: isActive('/') ? '3px solid #D4AF37' : '3px solid transparent',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                letterSpacing: '0.025em'
              }}
            >
              Home
            </Link>
            <Link 
              to="/puppies" 
              style={{
                textDecoration: 'none',
                color: isActive('/puppies') ? '#D4AF37' : '#1B365D',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: isActive('/puppies') ? '3px solid #D4AF37' : '3px solid transparent',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                letterSpacing: '0.025em'
              }}
            >
              Find Labradoodles
            </Link>
            <Link 
              to="/about" 
              style={{
                textDecoration: 'none',
                color: isActive('/about') ? '#D4AF37' : '#1B365D',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: isActive('/about') ? '3px solid #D4AF37' : '3px solid transparent',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                letterSpacing: '0.025em'
              }}
            >
              About Us
            </Link>
            <Link 
              to="/support" 
              style={{
                textDecoration: 'none',
                color: isActive('/support') ? '#D4AF37' : '#1B365D',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: isActive('/support') ? '3px solid #D4AF37' : '3px solid transparent',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                letterSpacing: '0.025em'
              }}
            >
              Support
            </Link>
            <Link 
              to="/contact" 
              style={{
                textDecoration: 'none',
                color: isActive('/contact') ? '#D4AF37' : '#1B365D',
                fontWeight: '600',
                padding: '0.75rem 0',
                borderBottom: isActive('/contact') ? '3px solid #D4AF37' : '3px solid transparent',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                letterSpacing: '0.025em'
              }}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header