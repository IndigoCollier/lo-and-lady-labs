import React from 'react'
import { Award, Heart, Users, Shield } from 'lucide-react'
import './TeamSection.css'

function TeamSection({ teamMembers, breedingPhilosophy }) {
  return (
    <section className="team-section">
      <div className="container">
        <div className="section-header">
          <Users className="section-icon" />
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Dedicated professionals committed to raising healthy, happy labradoodles
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="member-image">
                <img 
                  src={member.image} 
                  alt={member.name}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="image-placeholder" style={{ display: 'none' }}>
                  <Users className="placeholder-icon" />
                </div>
              </div>
              
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                
                <div className="member-bio">
                  <p>{member.bio}</p>
                </div>
                
                <div className="member-specialties">
                  <h4>Specialties:</h4>
                  <ul className="specialties-list">
                    {member.specialties.map((specialty, index) => (
                      <li key={index} className="specialty-item">
                        <Heart className="specialty-icon" />
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="member-credentials">
                  <h4>Credentials:</h4>
                  <ul className="credentials-list">
                    {member.credentials.map((credential, index) => (
                      <li key={index} className="credential-item">
                        <Award className="credential-icon" />
                        {credential}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="philosophy-section">
          <div className="philosophy-header">
            <Shield className="philosophy-icon" />
            <h3 className="philosophy-title">Our Breeding Philosophy</h3>
          </div>
          
          <div className="philosophy-content">
            <div className="mission-statement">
              <h4>Our Mission</h4>
              <p>{breedingPhilosophy.mission}</p>
            </div>
            
            <div className="values-grid">
              {breedingPhilosophy.values.map((value, index) => (
                <div key={index} className="value-card">
                  <h5 className="value-title">{value.title}</h5>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
            
            <div className="commitment-statement">
              <blockquote>
                {breedingPhilosophy.commitment}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection