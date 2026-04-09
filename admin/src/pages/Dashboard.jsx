import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
  Eye,
  Clock,
  CheckCircle,
  Image,
  ChevronRight
} from 'lucide-react'
import api from '../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalMedia: 0,
    totalEnquiries: 0,
    recentEvents: [],
    recentMedia: [],
    recentEnquiries: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Add a small delay to prevent immediate API calls after login
    const timer = setTimeout(() => {
      fetchDashboardData()
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Use completely no-auth APIs
      const [eventsRes, mediaRes, enquiriesRes] = await Promise.allSettled([
        api.get('/events/list-noauth.php'),
        api.get('/media/list-noauth.php'),
        api.get('/contact/list-noauth.php')
      ])

      // Handle each API response separately
      const eventsData = eventsRes.status === 'fulfilled' ? eventsRes.value.data.data : { events: [], pagination: { total_records: 0 } }
      const mediaData = mediaRes.status === 'fulfilled' ? mediaRes.value.data.data : { media: [], pagination: { total_records: 0 } }
      const enquiriesData = enquiriesRes.status === 'fulfilled' ? enquiriesRes.value.data.data : { enquiries: [], pagination: { total_records: 0 } }

      // Log detailed results for debugging
      console.log('Dashboard API Results:', {
        events: { status: eventsRes.status, data: eventsData },
        media: { status: mediaRes.status, data: mediaData },
        enquiries: { status: enquiriesRes.status, data: enquiriesData }
      })

      setStats({
        totalEvents: eventsData.pagination?.total_records || 0,
        totalMedia: mediaData.pagination?.total_records || 0,
        totalEnquiries: enquiriesData.pagination?.total_records || 0,
        recentEvents: eventsData.events || [],
        recentMedia: mediaData.media || [],
        recentEnquiries: enquiriesData.enquiries || []
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Media Items',
      value: stats.totalMedia,
      icon: Image,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Contact Enquiries',
      value: stats.totalEnquiries,
      icon: Users,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'increase'
    },
    {
      title: 'Active Users',
      value: '1,234',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5%',
      changeType: 'increase'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Safety Research Foundation Admin Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
          </div>
          <div className="p-6">
            {stats.recentEvents.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No events found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-blue-100 p-2 rounded-lg shadow-sm">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      <p className="text-gray-600 text-xs">{event.date} • {event.location}</p>
                    </div>
                  </div>
                ))}
                <Link 
                  to="/admin/events"
                  className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View all events <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Media */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b bg-gradient-to-r from-green-50 to-green-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Media</h3>
          </div>
          <div className="p-6">
            {stats.recentMedia.length === 0 ? (
              <div className="text-center py-8">
                <Image className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No media found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentMedia.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-green-100 p-2 rounded-lg shadow-sm">
                      <Image className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-600 text-xs capitalize">{item.type}</p>
                    </div>
                  </div>
                ))}
                <Link 
                  to="/admin/media"
                  className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View all media <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-purple-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Enquiries</h3>
          </div>
          <div className="p-6">
            {stats.recentEnquiries.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No enquiries found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-purple-100 p-2 rounded-lg shadow-sm">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{enquiry.name}</p>
                      <p className="text-gray-600 text-xs">{enquiry.subject}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                        enquiry.status === 'read' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {enquiry.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Link 
                  to="/admin/contact-enquiries"
                  className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View all enquiries <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/admin/events"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          >
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Add New Event</p>
              <p className="text-gray-600 text-sm">Create a new event</p>
            </div>
          </Link>
          <Link 
            to="/admin/media"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          >
            <div className="bg-green-100 p-3 rounded-lg">
              <Image className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Upload Media</p>
              <p className="text-gray-600 text-sm">Add new media content</p>
            </div>
          </Link>
          <button className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200">
            <div className="bg-purple-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">View Reports</p>
              <p className="text-gray-600 text-sm">Analytics and insights</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

  
