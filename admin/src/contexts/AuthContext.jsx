import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const userData = localStorage.getItem('admin_user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
      }
    }
    
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login.php', credentials)
      const { admin, token } = response.data.data
      
      localStorage.setItem('admin_token', token)
      localStorage.setItem('admin_user', JSON.stringify(admin))
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setUser(admin)
      setIsAuthenticated(true)
      
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout.php')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      delete api.defaults.headers.common['Authorization']
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/auth/forgot-password.php', { email })
      return { success: true, message: response.data.message }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send reset email'
      return { success: false, error: errorMessage }
    }
  }

  const resetPassword = async (token, password) => {
    try {
      const response = await api.post('/auth/reset-password.php', { token, password })
      return { success: true, message: response.data.message }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reset password'
      return { success: false, error: errorMessage }
    }
  }

  const value = {
    isAuthenticated,
    loading,
    user,
    login,
    logout,
    forgotPassword,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
