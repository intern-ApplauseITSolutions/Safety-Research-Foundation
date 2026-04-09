import React, { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Save,
  X,
  Globe,
  Award,
  Target
} from 'lucide-react'
import api, { directApi } from '../services/api'

const PledgeManagement = () => {
  const [activeTab, setActiveTab] = useState('takers')
  const [pledgeConfigs, setPledgeConfigs] = useState([])
  const [allSubmissions, setAllSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [showContentModal, setShowContentModal] = useState(false)
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false)
  const [selectedConfig, setSelectedConfig] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [submissionLanguageFilter, setSubmissionLanguageFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [configFormData, setConfigFormData] = useState({
    title: '',
    description: '',
    year: '',
    pledge_count: 0,
    sample_certificate_url: '',
    status: 'active'
  })

  const [contentFormData, setContentFormData] = useState({
    English: {
      pledge_title: '',
      pledge_points: [''],
      form_instructions: '',
      status: 'active'
    },
    Hindi: {
      pledge_title: '',
      pledge_points: [''],
      form_instructions: '',
      status: 'active'
    }
  })

  useEffect(() => {
    fetchPledgeConfigs()
  }, [currentPage, searchTerm])

  useEffect(() => {
    fetchAllSubmissions()
  }, [])

  const apiGet = async (url) => {
    try {
      return await api.get(url)
    } catch (error) {
      if (error.response || error.request) {
        return directApi.get(url)
      }
      throw error
    }
  }

  const apiRequest = async (config) => {
    try {
      return await api(config)
    } catch (error) {
      if (error.response || error.request) {
        return directApi(config)
      }
      throw error
    }
  }

  const fetchPledgeConfigs = async () => {
    try {
      setLoading(true)
      const response = await apiGet('/pledge/list.php')
      const data = response.data
      
      if (data.success) {
        setPledgeConfigs(data.data)
      } else {
        console.error('Failed to fetch pledge configs:', data.message)
      }
    } catch (error) {
      console.error('Error fetching pledge configs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubmissions = async (configId) => {
    try {
      const response = await apiGet(`/pledge/submissions.php?config_id=${configId}`)
      const data = response.data
      
      if (data.success) {
        setSubmissions(data.data.submissions)
        setSubmissionLanguageFilter('All')
      } else {
        console.error('Failed to fetch submissions:', data.message)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    }
  }

  const fetchAllSubmissions = async () => {
    try {
      const response = await apiGet('/pledge/submissions.php?limit=200')
      const data = response.data

      if (data.success) {
        setAllSubmissions(data.data.submissions)
      } else {
        console.error('Failed to fetch all submissions:', data.message)
      }
    } catch (error) {
      console.error('Error fetching all submissions:', error)
    }
  }

  const handleConfigSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = selectedConfig ? `/api/pledge/update.php?id=${selectedConfig.id}` : '/api/pledge/create.php'
      const method = selectedConfig ? 'PUT' : 'POST'
      
      const payload = {
        ...configFormData,
        contents: Object.entries(contentFormData).map(([lang, content]) => ({
          language: lang,
          pledge_title: content.pledge_title,
          pledge_points: content.pledge_points.filter(point => point.trim() !== ''),
          form_instructions: content.form_instructions,
          status: content.status
        }))
      }

      const response = await apiRequest({
        url,
        method,
        data: payload
      })

      const data = response.data
      
      if (data.success) {
        setShowConfigModal(false)
        setShowContentModal(false)
        fetchPledgeConfigs()
        fetchAllSubmissions()
        resetForms()
      } else {
        alert('Error: ' + data.message)
      }
    } catch (error) {
      console.error('Error saving config:', error)
      alert('Error saving pledge configuration')
    }
  }

  const handleEditConfig = (config) => {
    setSelectedConfig(config)
    setConfigFormData({
      title: config.title,
      description: config.description,
      year: config.year,
      pledge_count: config.pledge_count,
      sample_certificate_url: config.sample_certificate_url,
      status: config.status
    })
    
    // Fetch content for this config
    apiGet(`/pledge/get.php?id=${config.id}`)
      .then(response => {
        const data = response.data
        if (data.success && data.data.contents) {
          const contentData = {}
          data.data.contents.forEach(content => {
            contentData[content.language] = {
              pledge_title: content.pledge_title,
              pledge_points: content.pledge_points,
              form_instructions: content.form_instructions,
              status: content.status
            }
          })
          setContentFormData(contentData)
        }
      })
      .catch(error => {
        console.error('Error fetching pledge content:', error)
      })
    
    setShowConfigModal(true)
  }

  const handleViewSubmissions = (config) => {
    setSelectedConfig(config)
    fetchSubmissions(config.id)
    setShowSubmissionsModal(true)
  }

  const filteredSubmissions = submissions.filter((submission) => {
    if (submissionLanguageFilter === 'All') {
      return true
    }
    return submission.language === submissionLanguageFilter
  })

  const submissionCounts = submissions.reduce((acc, submission) => {
    const language = submission.language || 'Unknown'
    acc.total += 1
    acc[language] = (acc[language] || 0) + 1
    return acc
  }, { total: 0, English: 0, Hindi: 0 })

  const globalSubmissionCounts = allSubmissions.reduce((acc, submission) => {
    const language = submission.language || 'Unknown'
    acc.total += 1
    acc[language] = (acc[language] || 0) + 1
    return acc
  }, { total: 0, English: 0, Hindi: 0 })

  const filteredGlobalSubmissions = allSubmissions.filter((submission) => {
    const matchesLanguage = submissionLanguageFilter === 'All' || submission.language === submissionLanguageFilter
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return matchesLanguage
    }

    return matchesLanguage && [
      submission.name,
      submission.email,
      submission.mobile,
      submission.pledge_title,
      submission.state,
      submission.district,
      submission.language
    ].some((value) => String(value || '').toLowerCase().includes(query))
  })

  const resetForms = () => {
    setConfigFormData({
      title: '',
      description: '',
      year: '',
      pledge_count: 0,
      sample_certificate_url: '',
      status: 'active'
    })
    setContentFormData({
      English: {
        pledge_title: '',
        pledge_points: [''],
        form_instructions: '',
        status: 'active'
      },
      Hindi: {
        pledge_title: '',
        pledge_points: [''],
        form_instructions: '',
        status: 'active'
      }
    })
    setSelectedConfig(null)
  }

  const addPledgePoint = (language) => {
    setContentFormData(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        pledge_points: [...prev[language].pledge_points, '']
      }
    }))
  }

  const updatePledgePoint = (language, index, value) => {
    setContentFormData(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        pledge_points: prev[language].pledge_points.map((point, i) => i === index ? value : point)
      }
    }))
  }

  const removePledgePoint = (language, index) => {
    setContentFormData(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        pledge_points: prev[language].pledge_points.filter((_, i) => i !== index)
      }
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pledge Management</h1>
          <p className="text-gray-600">View pledge takers first, manage pledge configurations when needed</p>
        </div>
        {activeTab === 'configs' && (
          <button
            onClick={() => {
              resetForms()
              setShowConfigModal(true)
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            New Pledge Configuration
          </button>
        )}
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('takers')}
          className={`rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'takers'
              ? 'border border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Pledge Takers
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('configs')}
          className={`rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'configs'
              ? 'border border-primary bg-blue-50 text-primary shadow-sm'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Pledge Configurations
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={activeTab === 'takers' ? 'Search pledge takers, email, mobile, state...' : 'Search pledge configurations...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {activeTab === 'takers' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="text-sm text-gray-500">Total Pledge Takers</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">{globalSubmissionCounts.total}</div>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="text-sm text-blue-700">English</div>
              <div className="mt-1 text-2xl font-bold text-blue-900">{globalSubmissionCounts.English}</div>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-sm text-emerald-700">Hindi</div>
              <div className="mt-1 text-2xl font-bold text-emerald-900">{globalSubmissionCounts.Hindi}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {['All', 'English', 'Hindi'].map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setSubmissionLanguageFilter(language)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  submissionLanguageFilter === language
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Submitted Pledge Takers</h2>
              <p className="text-sm text-gray-600">Live submitted users from the pledge form</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pledge</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Language</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGlobalSubmissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="px-4 py-3 text-sm">{submission.name}</td>
                      <td className="px-4 py-3 text-sm">{submission.email}</td>
                      <td className="px-4 py-3 text-sm">{submission.mobile}</td>
                      <td className="px-4 py-3 text-sm">{submission.pledge_title || '-'}</td>
                      <td className="px-4 py-3 text-sm">{submission.language}</td>
                      <td className="px-4 py-3 text-sm">{submission.state || '-'}</td>
                      <td className="px-4 py-3 text-sm">{submission.district || '-'}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          submission.status === 'completed' ? 'bg-green-100 text-green-800' :
                          submission.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{new Date(submission.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {filteredGlobalSubmissions.length === 0 && (
                    <tr>
                      <td colSpan="9" className="px-4 py-8 text-center text-sm text-gray-500">
                        No pledge takers found for the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'configs' && (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pledges</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pledge Takers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pledgeConfigs.map((config) => (
              <tr key={config.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="max-w-md">
                    <div className="text-sm font-medium text-gray-900">{config.title}</div>
                    <div
                      className="text-sm text-gray-500 overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {config.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{config.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{config.submission_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{config.content_count}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    config.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {config.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewSubmissions(config)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    title="View submitted pledge takers"
                  >
                    <Eye className="h-4 w-4" />
                    View Pledge Takers
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditConfig(config)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 transition hover:bg-gray-50"
                    title="Edit Configuration"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {selectedConfig ? 'Edit Pledge Configuration' : 'New Pledge Configuration'}
                </h2>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleConfigSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      required
                      value={configFormData.title}
                      onChange={(e) => setConfigFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="e.g., Road Safety Pledge 2025-26"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={configFormData.description}
                      onChange={(e) => setConfigFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      rows={3}
                      placeholder="Brief description of the pledge campaign"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                      <input
                        type="text"
                        required
                        value={configFormData.year}
                        onChange={(e) => setConfigFormData(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="e.g., 2025-26"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Initial Pledge Count</label>
                      <input
                        type="number"
                        value={configFormData.pledge_count}
                        onChange={(e) => setConfigFormData(prev => ({ ...prev, pledge_count: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sample Certificate URL</label>
                    <input
                      type="text"
                      value={configFormData.sample_certificate_url}
                      onChange={(e) => setConfigFormData(prev => ({ ...prev, sample_certificate_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="/assets/images/pledge-certificate.png"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={configFormData.status}
                      onChange={(e) => setConfigFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowConfigModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowConfigModal(false)
                      setShowContentModal(true)
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Next: Configure Content
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Content Configuration Modal */}
      {showContentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Configure Pledge Content</h2>
                <button
                  onClick={() => setShowContentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleConfigSubmit}>
                <div className="space-y-8">
                  {['English', 'Hindi'].map((language) => (
                    <div key={language} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Globe className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold">{language} Content</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pledge Title</label>
                          <input
                            type="text"
                            value={contentFormData[language].pledge_title}
                            onChange={(e) => setContentFormData(prev => ({
                              ...prev,
                              [language]: { ...prev[language], pledge_title: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder={`Pledge title in ${language}`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pledge Points</label>
                          <div className="space-y-2">
                            {contentFormData[language].pledge_points.map((point, index) => (
                              <div key={index} className="flex gap-2">
                                <input
                                  type="text"
                                  value={point}
                                  onChange={(e) => updatePledgePoint(language, index, e.target.value)}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                  placeholder={`Enter pledge point ${index + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => removePledgePoint(language, index)}
                                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addPledgePoint(language)}
                              className="px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800"
                            >
                              <Plus className="w-4 h-4 inline mr-2" />
                              Add Pledge Point
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Form Instructions</label>
                          <textarea
                            value={contentFormData[language].form_instructions}
                            onChange={(e) => setContentFormData(prev => ({
                              ...prev,
                              [language]: { ...prev[language], form_instructions: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            rows={3}
                            placeholder={`Instructions for form in ${language}`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            value={contentFormData[language].status}
                            onChange={(e) => setContentFormData(prev => ({
                              ...prev,
                              [language]: { ...prev[language], status: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowContentModal(false)
                      setShowConfigModal(true)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Configuration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Submissions Modal */}
      {showSubmissionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Pledge Submissions</h2>
                  <p className="text-gray-600">{selectedConfig?.title}</p>
                </div>
                <button
                  onClick={() => setShowSubmissionsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm text-gray-500">Total Submissions</div>
                  <div className="mt-1 text-2xl font-bold text-gray-900">{submissionCounts.total}</div>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="text-sm text-blue-700">English</div>
                  <div className="mt-1 text-2xl font-bold text-blue-900">{submissionCounts.English}</div>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <div className="text-sm text-emerald-700">Hindi</div>
                  <div className="mt-1 text-2xl font-bold text-emerald-900">{submissionCounts.Hindi}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                {['All', 'English', 'Hindi'].map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => setSubmissionLanguageFilter(language)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      submissionLanguageFilter === language
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Language</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="px-4 py-3 text-sm">{submission.name}</td>
                        <td className="px-4 py-3 text-sm">{submission.email}</td>
                        <td className="px-4 py-3 text-sm">{submission.mobile}</td>
                        <td className="px-4 py-3 text-sm">{submission.language}</td>
                        <td className="px-4 py-3 text-sm">{submission.state || '-'}</td>
                        <td className="px-4 py-3 text-sm">{submission.district || '-'}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            submission.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            submission.status === 'verified' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{new Date(submission.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {filteredSubmissions.length === 0 && (
                      <tr>
                        <td colSpan="8" className="px-4 py-8 text-center text-sm text-gray-500">
                          No pledge submissions found for the selected language.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PledgeManagement
