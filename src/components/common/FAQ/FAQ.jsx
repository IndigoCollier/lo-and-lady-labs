import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Search, HelpCircle, FileText, Heart, DollarSign } from 'lucide-react'
import { faqCategories, searchFAQs } from '../../../data/faqData'
import './FAQ.css'

const iconMap = {
  HelpCircle,
  FileText,
  Heart,
  DollarSign
}

function FAQ({ showSearch = true, maxHeight = "auto" }) {
  const [activeCategory, setActiveCategory] = useState(1)
  const [expandedFAQ, setExpandedFAQ] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setExpandedFAQ(null)
    setIsSearching(false)
    setSearchTerm('')
  }

  const handleFAQToggle = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.trim().length > 2) {
      const results = searchFAQs(term)
      setSearchResults(results)
      setIsSearching(true)
      setExpandedFAQ(null)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || HelpCircle
    return <IconComponent />
  }

  const currentCategory = faqCategories.find(cat => cat.id === activeCategory)
  const displayFAQs = isSearching ? searchResults : (currentCategory?.faqs || [])

  return (
    <div className="faq-section">
      <div className="faq-header">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Find answers to common questions about our labradoodles and adoption process
        </p>
      </div>

      {showSearch && (
        <div className="faq-search">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
          {isSearching && (
            <div className="search-status">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"
              <button 
                onClick={() => handleSearch('')}
                className="clear-search"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      )}

      <div className="faq-content">
        {!isSearching && (
          <div className="faq-categories">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              >
                <span className="category-icon">
                  {getIcon(category.icon)}
                </span>
                <span className="category-title">{category.title}</span>
                <span className="category-count">({category.faqs.length})</span>
              </button>
            ))}
          </div>
        )}

        <div 
          className="faq-list"
          style={{ maxHeight: maxHeight }}
        >
          {displayFAQs.length > 0 ? (
            displayFAQs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  onClick={() => handleFAQToggle(faq.id)}
                  className={`faq-question ${expandedFAQ === faq.id ? 'expanded' : ''}`}
                >
                  <span className="question-text">{faq.question}</span>
                  <span className="question-icon">
                    {expandedFAQ === faq.id ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </button>
                
                <div className={`faq-answer ${expandedFAQ === faq.id ? 'expanded' : ''}`}>
                  <div className="answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <HelpCircle className="no-results-icon" />
              <h3>No questions found</h3>
              <p>
                {isSearching 
                  ? `No questions match "${searchTerm}". Try a different search term.`
                  : "No questions available in this category."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQ