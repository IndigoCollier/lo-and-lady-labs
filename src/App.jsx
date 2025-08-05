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
    
    if (redirectPath) {
      // Remove the query parameter and navigate to the intended path
      const decodedPath = decodeURIComponent(redirectPath)
      window.history.replaceState({}, '', window.location.pathname)
      navigate(decodedPath, { replace: true })
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