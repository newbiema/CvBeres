import { Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import BuilderPage from './pages/BuilderPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
