import { Route, Routes } from 'react-router-dom'
import BuilderPage from './pages/BuilderPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/builder" element={<BuilderPage />} />
    </Routes>
  )
}

export default App
