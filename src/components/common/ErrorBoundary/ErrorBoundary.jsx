import React from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Button from '../Button'
import './ErrorBoundary.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleRefresh = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/lo-and-lady-labs/'
  }

  render() {
    if (this.state.hasError) {
      const { showDetails = false, customMessage } = this.props

      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">
              <AlertCircle />
            </div>
            
            <h2 className="error-title">Oops! Something went wrong</h2>
            
            <p className="error-message">
              {customMessage || "We're sorry, but something unexpected happened. Please try refreshing the page or go back to the home page."}
            </p>

            {showDetails && this.state.error && (
              <details className="error-details">
                <summary>Technical Details</summary>
                <div className="error-stack">
                  <h4>Error:</h4>
                  <code>{this.state.error.toString()}</code>
                  
                  {this.state.errorInfo && (
                    <>
                      <h4>Component Stack:</h4>
                      <code>{this.state.errorInfo.componentStack}</code>
                    </>
                  )}
                </div>
              </details>
            )}

            <div className="error-actions">
              <Button 
                onClick={this.handleRefresh}
                variant="primary"
                size="large"
                className="error-button"
              >
                <RefreshCw className="button-icon" />
                Refresh Page
              </Button>
              
              <Button 
                onClick={this.handleGoHome}
                variant="outline"
                size="large"
                className="error-button"
              >
                <Home className="button-icon" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary