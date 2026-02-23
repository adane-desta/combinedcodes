import React, { useState } from 'react'
import { useParams, Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout/Layout'
import VeterinarianDashboard from '../components/Veterinarian/VeterinarianDashboard'
import FarmerDashboard from '../components/Farmer/FarmerDashboard'
import VetAppointments from '../components/Veterinarian/VetAppointments'
import VetQuestions from '../components/Veterinarian/VetQuestions'
import VetNews from '../components/Veterinarian/VetNews'
import VetResources from '../components/Veterinarian/VetResources'
import VetAccount from '../components/Veterinarian/VetAccount'
import FarmerAnimals from '../components/Farmer/FarmerAnimals'
import FarmerAppointments from '../components/Farmer/FarmerAppointments'
import FarmerQuestions from '../components/Farmer/FarmerQuestions'
import FarmerNews from '../components/Farmer/FarmerNews'
import FarmerMarket from '../components/Farmer/FarmerMarket'
import FarmerAccount from '../components/Farmer/FarmerAccount'
import NotFound from './NotFound'

function Dashboard() {
  const { role } = useParams()
  const { role: contextRole } = useApp()

  // Redirect if role doesn't match
  if (!role || (contextRole && role !== contextRole)) {
    return <Navigate to="/" replace />
  }

  return (
    <Layout role={role}>
      <Routes>
        {role === 'veterinarian' ? (
          <>
            <Route index element={<VeterinarianDashboard />} />
            <Route path="appointments" element={<VetAppointments />} />
            <Route path="questions" element={<VetQuestions />} />
            <Route path="news" element={<VetNews />} />
            <Route path="resources" element={<VetResources />} />
            <Route path="account" element={<VetAccount />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route index element={<FarmerDashboard />} />
            <Route path="animals" element={<FarmerAnimals />} />
            <Route path="appointments" element={<FarmerAppointments />} />
            <Route path="questions" element={<FarmerQuestions />} />
            <Route path="news" element={<FarmerNews />} />
            <Route path="market" element={<FarmerMarket />} />
            <Route path="account" element={<FarmerAccount />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </Layout>
  )
}

export default Dashboard
