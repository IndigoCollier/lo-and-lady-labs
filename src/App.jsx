import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import Puppies from './pages/Puppies'
import PuppyDetail from './pages/PuppyDetail'  
import About from './pages/About'
import Contact from './pages/Contact'
import Support from './pages/Support'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    // Handle GitHub Pages SPA redirect
    const urlParams = new URLSearchParams(window.location.search)
    const redirectPath = urlParams.get('p')
    
    console.log('App.jsx - URL params:', window.location.search)
    console.log('App.jsx - Redirect path:', redirectPath)
    
    if (redirectPath) {
      // Clean up the path
      let cleanPath = redirectPath
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath
      } else {
        cleanPath = '/' + cleanPath
      }
      
      console.log('App.jsx - Navigating to:', cleanPath)
      
      // Clear the URL and navigate
      const newUrl = window.location.pathname + window.location.hash
      window.history.replaceState({}, '', newUrl)
      navigate(cleanPath, { replace: true })
    }
  }, [navigate])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/puppies" element={<Puppies />} />
         <Route path="/puppies/:id" element={<PuppyDetail />} />  
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Layout>
  )
}

export default App