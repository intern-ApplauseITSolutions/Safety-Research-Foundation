import React, { useEffect, useRef, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronDown,
  Image,
  Target
} from 'lucide-react'
import logo from '../../../src/assets/images/SRF logo.png'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Events',
      path: '/admin/events',
      icon: Calendar
    },
    {
      name: 'Media',
      path: '/admin/media',
      icon: Image
    },
    {
      name: 'Pledge Management',
      path: '/admin/pledge-management',
      icon: Target
    },
    {
      name: 'Contact Enquiries',
      path: '/admin/contact-enquiries',
      icon: MessageSquare
    }
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="sticky top-0 flex items-center justify-between min-h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 flex-shrink-0 z-10">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Safety Research Foundation"
              className="mr-3 h-14 w-auto min-w-[56px] object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SRF Admin</h1>
              <p className="text-xs text-gray-500 font-medium">Safety Research Foundation</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive(item.path) ? 'text-blue-700' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4" ref={profileDropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 text-left transition hover:bg-gray-100"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-sm">
              <span className="text-sm font-semibold text-white">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileDropdownOpen && (
            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0 bg-gray-50 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="hidden lg:flex items-center gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">Safety Research Foundation</p>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}

export default Layout
