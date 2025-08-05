import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import Puppies from './pages/Puppies'
import PuppyDetail from './pages/PuppyDetail'  
import About from './pages/About'
import Contact from './pages/Contact'
import Support from './pages/Support'

function App() {
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