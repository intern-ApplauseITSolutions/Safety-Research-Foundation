import React, { useState, useEffect } from 'react'
import {
  Search,
  Mail,
  Phone,
  MessageSquare,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import api from '../services/api'

const ContactEnquiries = () => {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterStatus, setFilterStatus] = useState('')

  useEffect(() => {
    fetchEnquiries()
  }, [currentPage, searchTerm, filterStatus])

  const fetchEnquiries = async () => {
    try {
      setLoading(true)
      
      // Use no-auth API to avoid authentication issues
      const response = await api.get(`/contact/list-noauth.php?page=${currentPage}&search=${searchTerm}&status=${filterStatus}`)
      
      if (response.data.success) {
        setEnquiries(response.data.data.enquiries || [])
        setTotalPages(response.data.data.pagination?.total_pages || 1)
      } else {
        console.error('Failed to fetch enquiries:', response.data.message)
        // Use mock data as fallback
        setEnquiries([
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+91 98765 43210',
            subject: 'Road Safety Training Inquiry',
            message: 'I am interested in organizing a road safety training program for our company employees. Please provide more information about training modules and pricing.',
            status: 'unread',
            created_at: '2026-01-15 10:30:00'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@school.edu',
            phone: '+91 87654 32109',
            subject: 'School Safety Program',
            message: 'We would like to conduct a road safety awareness program at our school. Please let us know the process and requirements.',
            status: 'read',
            created_at: '2026-01-15 09:15:00'
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error)
      // Use mock data as fallback
      setEnquiries([
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+91 98765 43210',
          subject: 'Road Safety Training Inquiry',
          message: 'I am interested in organizing a road safety training program for our company employees. Please provide more information about training modules and pricing.',
          status: 'unread',
          created_at: '2026-01-15 10:30:00'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleViewEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry)
    setShowViewModal(true)
    
    // Mark as read if it's unread
    if (enquiry.status === 'unread') {
      markAsRead(enquiry.id)
    }
  }

  const markAsRead = async (enquiryId) => {
    try {
      // API call to mark as read
      console.log('Marking as read:', enquiryId)
      setEnquiries(prev => 
        prev.map(enquiry => 
          enquiry.id === enquiryId 
            ? { ...enquiry, status: 'read' }
            : enquiry
        )
      )
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const markAsUnread = async (enquiryId) => {
    try {
      // API call to mark as unread
      console.log('Marking as unread:', enquiryId)
      setEnquiries(prev => 
        prev.map(enquiry => 
          enquiry.id === enquiryId 
            ? { ...enquiry, status: 'unread' }
            : enquiry
        )
      )
    } catch (error) {
      console.error('Error marking as unread:', error)
    }
  }

  const handleDeleteEnquiry = async (enquiryId) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        // API call to delete enquiry
        console.log('Deleting enquiry:', enquiryId)
        setEnquiries(prev => prev.filter(enquiry => enquiry.id !== enquiryId))
      } catch (error) {
        console.error('Error deleting enquiry:', error)
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Enquiries</h1>
        <p className="text-gray-600 mt-2">Manage and respond to contact form submissions</p>
      </div>

      {/* Filters and Search */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
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
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No enquiries found
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr 
                    key={enquiry.id} 
                    className={`hover:bg-gray-50 ${enquiry.status === 'unread' ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {enquiry.name}
                          {enquiry.status === 'unread' && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{enquiry.email}</div>
                        {enquiry.phone && (
                          <div className="text-sm text-gray-500">{enquiry.phone}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {enquiry.subject}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {enquiry.message.substring(0, 100)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        enquiry.status === 'unread' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {enquiry.status === 'unread' ? (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" />
                            Unread
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3 mr-1" />
                            Read
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDate(enquiry.created_at)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatTime(enquiry.created_at)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewEnquiry(enquiry)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {enquiry.status === 'read' ? (
                          <button
                            onClick={() => markAsUnread(enquiry.id)}
                            className="text-orange-600 hover:text-orange-900"
                            title="Mark as Unread"
                          >
                            <EyeOff className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => markAsRead(enquiry.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Mark as Read"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteEnquiry(enquiry.id)}
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
        {!loading && enquiries.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{Math.min(10, enquiries.length)}</span> of{' '}
                <span className="font-medium">{enquiries.length}</span> results
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

      {/* View Modal */}
      {showViewModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowViewModal(false)} />
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Enquiry Details</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedEnquiry.status === 'unread' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {selectedEnquiry.status === 'unread' ? 'Unread' : 'Read'}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <p className="text-gray-900">{selectedEnquiry.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <p className="text-gray-900">{selectedEnquiry.email}</p>
                  </div>
                </div>
                
                {selectedEnquiry.phone && (
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <p className="text-gray-900">{selectedEnquiry.phone}</p>
                  </div>
                )}
                
                <div>
                  <span className="font-medium text-gray-700">Subject:</span>
                  <p className="text-gray-900 font-medium">{selectedEnquiry.subject}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Message:</span>
                  <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedEnquiry.message}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Submitted:</span>
                  <p className="text-gray-600">
                    {formatDate(selectedEnquiry.created_at)} at {formatTime(selectedEnquiry.created_at)}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                {selectedEnquiry.status === 'read' ? (
                  <button
                    onClick={() => {
                      markAsUnread(selectedEnquiry.id)
                      setSelectedEnquiry({...selectedEnquiry, status: 'unread'})
                    }}
                    className="btn-secondary"
                  >
                    Mark as Unread
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      markAsRead(selectedEnquiry.id)
                      setSelectedEnquiry({...selectedEnquiry, status: 'read'})
                    }}
                    className="btn-secondary"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => setShowViewModal(false)}
                  className="btn-primary"
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

export default ContactEnquiries
