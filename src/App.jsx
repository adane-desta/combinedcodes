import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import RoleSelection from './pages/RoleSelection'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/dashboard/:role/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
