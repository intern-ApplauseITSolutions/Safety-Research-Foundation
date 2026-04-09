import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Temporarily disable automatic logout for debugging
    console.log('API Error:', error.response?.status, error.config?.url)
    if (error.response?.status === 401) {
      // Only logout if we're not on the login page and it's not a login attempt
      const currentPath = window.location.pathname
      if (currentPath !== '/login' && !error.config?.url?.includes('/auth/login')) {
        console.log('401 error detected but not auto-logging out for debugging')
        // Commented out for debugging: 
        // localStorage.removeItem('admin_token')
        // localStorage.removeItem('admin_user')
        // window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Create a fallback API that uses absolute URLs for debugging
export const directApi = axios.create({
  baseURL: 'http://localhost/srf/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

directApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
