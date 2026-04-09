import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import MediaNew from './pages/MediaNew'
import ContactEnquiries from './pages/ContactEnquiries'
import PledgeManagement from './pages/PledgeManagement'
import Layout from './components/Layout'

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login /> : <Navigate to="/admin/dashboard" />} 
      />
      <Route 
        path="/forgot-password" 
        element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/admin/dashboard" />} 
      />
      <Route 
        path="/reset-password" 
        element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/admin/dashboard" />} 
      />
      
      {/* Protected routes */}
      <Route
        path="/admin/*"
        element={
          isAuthenticated ? (
            <Layout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="events" element={<Events />} />
                <Route path="media" element={<MediaNew />} />
                <Route path="contact-enquiries" element={<ContactEnquiries />} />
                <Route path="pledge-management" element={<PledgeManagement />} />
                <Route path="contact" element={<Navigate to="/admin/contact-enquiries" />} />
                <Route path="" element={<Navigate to="/admin/dashboard" />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      
      {/* Contact redirect for direct access */}
      <Route 
        path="/contact" 
        element={isAuthenticated ? <Navigate to="/admin/contact-enquiries" /> : <Navigate to="/login" />} 
      />
      
      {/* Default redirect */}
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/admin/dashboard" : "/login"} />} 
      />
    </Routes>
  )
}

export default App
