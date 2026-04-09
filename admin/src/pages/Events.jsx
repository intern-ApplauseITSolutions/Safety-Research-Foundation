import React, { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Tag,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterCategory, setFilterCategory] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    category: '',
    excerpt: '',
    content: '',
    full_description: '',
    featured: false
  })

  const categories = ['Awareness Session', 'Public Awareness', 'School Program', 'Safety Audit', 'Training']

  useEffect(() => {
    fetchEvents()
  }, [currentPage, searchTerm, filterCategory])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      const mockEvents = [
        {
          id: 1,
          title: 'Parent Awareness & Child Car Seat Safety Sessions',
          date: '20th – 21st December 2025',
          location: 'Bengaluru',
          category: 'Awareness Session',
          excerpt: 'SRF conducted hands-on parent awareness sessions focusing on child car seat safety and seatbelt use...',
          content: 'SRF conducted hands-on parent awareness sessions focusing on child car seat safety and seatbelt use.',
          featured: true,
          status: 'active',
          created_at: '2025-12-20 10:00:00'
        },
        {
          id: 2,
          title: 'Road Safety Mural & Employee Engagement Initiative',
          date: '17th January 2026',
          location: 'Bengaluru',
          category: 'Public Awareness',
          excerpt: 'SRF, with support from Bosch India, organised a road safety mural painting activity...',
          content: 'SRF, with support from Bosch India, organised a road safety mural painting activity.',
          featured: true,
          status: 'active',
          created_at: '2026-01-17 14:30:00'
        },
        {
          id: 3,
          title: 'School Zone Road Safety Audits in Bengaluru',
          date: '27th – 31st January 2026',
          location: 'Bengaluru',
          category: 'Safety Audit',
          excerpt: 'SRF carried out on-ground road safety audits around school zones to identify pedestrian risks...',
          content: 'SRF carried out on-ground road safety audits around school zones.',
          featured: false,
          status: 'active',
          created_at: '2026-01-27 09:00:00'
        }
      ]

      // Filter events based on search and category
      let filteredEvents = mockEvents
      if (searchTerm) {
        filteredEvents = filteredEvents.filter(event =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      if (filterCategory) {
        filteredEvents = filteredEvents.filter(event => event.category === filterCategory)
      }

      setTimeout(() => {
        setEvents(filteredEvents)
        setTotalPages(Math.ceil(filteredEvents.length / 10))
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Error fetching events:', error)
      setLoading(false)
    }
  }

  const handleAddEvent = () => {
    setFormData({
      title: '',
      date: '',
      location: '',
      category: '',
      excerpt: '',
      content: '',
      full_description: '',
      featured: false
    })
    setShowAddModal(true)
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setFormData({
      title: event.title,
      date: event.date,
      location: event.location,
      category: event.category,
      excerpt: event.excerpt,
      content: event.content,
      full_description: event.full_description || '',
      featured: event.featured
    })
    setShowEditModal(true)
  }

  const handleViewEvent = (event) => {
    setSelectedEvent(event)
    setShowViewModal(true)
  }

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // API call to delete event
        console.log('Deleting event:', eventId)
        fetchEvents()
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // API call to add/update event
      console.log('Submitting event:', formData)
      setShowAddModal(false)
      setShowEditModal(false)
      fetchEvents()
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600 mt-2">Manage and organize your events</p>
        </div>
        <button
          onClick={handleAddEvent}
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No events found
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {event.title}
                          {event.featured && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {event.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {event.date}
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {event.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Tag className="h-3 w-3 mr-1" />
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewEvent(event)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && events.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{Math.min(10, events.length)}</span> of{' '}
                <span className="font-medium">{events.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-3 py-1 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal - Placeholder */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => {
              setShowAddModal(false)
              setShowEditModal(false)
            }} />
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
              <h2 className="text-xl font-bold mb-4">
                {showAddModal ? 'Add New Event' : 'Edit Event'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows={3}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={4}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">Featured Event</label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setShowEditModal(false)
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {showAddModal ? 'Add Event' : 'Update Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal - Placeholder */}
      {showViewModal && selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowViewModal(false)} />
            <div className="relative bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <p className="text-gray-600">{selectedEvent.date}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <p className="text-gray-600">{selectedEvent.location}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {selectedEvent.category}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Excerpt:</span>
                  <p className="text-gray-600 mt-1">{selectedEvent.excerpt}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Content:</span>
                  <p className="text-gray-600 mt-1">{selectedEvent.content}</p>
                </div>
                {selectedEvent.featured && (
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured Event
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Events
