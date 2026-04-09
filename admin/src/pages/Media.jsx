import React, { useState, useEffect, useRef } from 'react'
import { Plus, Search, Filter, Edit2, Trash2, Eye, Image as ImageIcon, Video, FileText, Headphones, BookOpen, ExternalLink, Download, X, Check, Upload } from 'lucide-react'
import api, { directApi } from '../services/api'

const Media = () => {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const thumbnailInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'image',
    category: '',
    file_url: '',
    file: null,
    thumbnail_url: '',
    thumbnail: null,
    file_size: '',
    duration: '',
    video_id: '',
    download_url: '',
    external_url: '',
    featured: false,
    status: 'active',
    sort_order: 0
  })

  const mediaTypes = [
    { value: 'video', label: 'Video', icon: Video },
    { value: 'image', label: 'Image', icon: ImageIcon },
    { value: 'document', label: 'Document', icon: FileText },
    { value: 'audio', label: 'Audio', icon: Headphones },
    { value: 'ebook', label: 'eBook', icon: BookOpen }
  ]

  const getFileAcceptType = (type) => {
    switch (type) {
      case 'image':
        return 'image/*'
      case 'video':
        return 'video/*'
      case 'audio':
        return 'audio/*'
      case 'document':
        return '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'
      case 'ebook':
        return '.pdf,.epub,.mobi'
      default:
        return '*/*'
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      setLoading(true)
      // Use directApi temporarily to bypass proxy issues
      const response = await directApi.get('/media/list.php', {
        params: { type: filterType, search: searchTerm }
      })
      if (response.data.success) {
        setMedia(response.data.data.media)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'image',
      category: '',
      file_url: '',
      file: null,
      thumbnail_url: '',
      thumbnail: null,
      file_size: '',
      duration: '',
      video_id: '',
      download_url: '',
      external_url: '',
      featured: false,
      status: 'active',
      sort_order: 0
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = ''
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        file: file,
        file_url: file.name,
        file_size: formatFileSize(file.size),
        title: formData.title || file.name.split('.')[0]
      })
    }
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        thumbnail: file,
        thumbnail_url: file.name
      })
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await api.post('/upload.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.file_url
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      let fileUrl = formData.file_url
      let thumbnailUrl = formData.thumbnail_url
      
      // Upload main file if selected
      if (formData.file) {
        fileUrl = await uploadFile(formData.file)
      }
      
      // Upload thumbnail if selected
      if (formData.thumbnail) {
        thumbnailUrl = await uploadFile(formData.thumbnail)
      }
      
      const submitData = {
        ...formData,
        file_url: fileUrl,
        thumbnail_url: thumbnailUrl
      }
      
      const endpoint = selectedMedia ? '/media/update.php' : '/media/create.php'
      const method = selectedMedia ? 'put' : 'post'
      
      if (selectedMedia) {
        await api.put(`${endpoint}?id=${selectedMedia.id}`, submitData)
      } else {
        await api.post(endpoint, submitData)
      }
      
      fetchMedia()
      setShowAddModal(false)
      setShowEditModal(false)
      setSelectedMedia(null)
      resetForm()
    } catch (error) {
      console.error('Error saving media:', error)
      alert('Error saving media. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (item) => {
    setSelectedMedia(item)
    setFormData({
      title: item.title,
      description: item.description || '',
      type: item.type,
      category: item.category || '',
      file_url: item.file_url,
      thumbnail_url: item.thumbnail_url || '',
      file_size: item.file_size || '',
      duration: item.duration || '',
      video_id: item.video_id || '',
      download_url: item.download_url || '',
      external_url: item.external_url || '',
      featured: item.featured,
      status: item.status,
      sort_order: item.sort_order || 0
    })
    setShowEditModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this media item?')) {
      try {
        await api.delete(`/media/delete.php?id=${id}`)
        fetchMedia()
      } catch (error) {
        console.error('Error deleting media:', error)
      }
    }
  }

  const getMediaIcon = (type) => {
    const mediaType = mediaTypes.find(t => t.value === type)
    return mediaType ? mediaType.icon : ImageIcon
  }

  const getMediaTypeLabel = (type) => {
    const mediaType = mediaTypes.find(t => t.value === type)
    return mediaType ? mediaType.label : type
  }

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600">Manage videos, images, documents, audio, and eBooks</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowAddModal(true)
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Media
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {mediaTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            <button
              onClick={fetchMedia}
              className="btn-secondary"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {media.map((item) => {
          const Icon = getMediaIcon(item.type)
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-gray-100">
                {item.type === 'video' && item.video_id ? (
                  <img
                    src={`https://img.youtube.com/vi/${item.video_id}/maxresdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`
                    }}
                  />
                ) : item.thumbnail_url ? (
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                {item.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {getMediaTypeLabel(item.type)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedMedia(item)
                        setShowViewModal(true)
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {item.external_url && (
                    <a
                      href={item.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">
                {showAddModal ? 'Add New Media' : 'Edit Media'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {mediaTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File *
                  </label>
                  <div className="space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      required={!formData.file_url}
                      onChange={handleFileChange}
                      accept={getFileAcceptType(formData.type)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.file_size && (
                      <p className="text-sm text-gray-600">File size: {formData.file_size}</p>
                    )}
                    <div className="text-xs text-gray-500">
                      Or enter file URL:
                    </div>
                    <input
                      type="url"
                      value={formData.file_url}
                      onChange={(e) => setFormData({...formData, file_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/file.jpg"
                    />
                  </div>
                </div>
                {formData.type === 'video' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        YouTube Video ID
                      </label>
                      <input
                        type="text"
                        value={formData.video_id}
                        onChange={(e) => setFormData({...formData, video_id: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        placeholder="e.g., 15:30"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
                {(formData.type === 'image' || formData.type === 'video') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thumbnail URL
                    </label>
                    <input
                      type="url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                {(formData.type === 'document' || formData.type === 'ebook') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Size
                      </label>
                      <input
                        type="text"
                        value={formData.file_size}
                        onChange={(e) => setFormData({...formData, file_size: e.target.value})}
                        placeholder="e.g., 2.5 MB"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Download URL
                      </label>
                      <input
                        type="url"
                        value={formData.download_url}
                        onChange={(e) => setFormData({...formData, download_url: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
                {formData.type === 'audio' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 15:30"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    External URL
                  </label>
                  <input
                    type="url"
                    value={formData.external_url}
                    onChange={(e) => setFormData({...formData, external_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="mr-2"
                      />
                      Featured
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="mr-2"
                      />
                      Active
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="mr-2"
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setShowEditModal(false)
                    resetForm()
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {showAddModal ? 'Add Media' : 'Update Media'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">{selectedMedia.title}</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                {selectedMedia.type === 'video' && selectedMedia.video_id ? (
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedMedia.video_id}`}
                      title={selectedMedia.title}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                ) : selectedMedia.thumbnail_url ? (
                  <img
                    src={selectedMedia.thumbnail_url}
                    alt={selectedMedia.title}
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    {React.createElement(getMediaIcon(selectedMedia.type), { className: 'w-16 h-16 text-gray-400' })}
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Type:</span> {getMediaTypeLabel(selectedMedia.type)}
                    </div>
                    {selectedMedia.category && (
                      <div>
                        <span className="font-medium">Category:</span> {selectedMedia.category}
                      </div>
                    )}
                    {selectedMedia.duration && (
                      <div>
                        <span className="font-medium">Duration:</span> {selectedMedia.duration}
                      </div>
                    )}
                    {selectedMedia.file_size && (
                      <div>
                        <span className="font-medium">File Size:</span> {selectedMedia.file_size}
                      </div>
                    )}
                  </div>
                </div>
                {selectedMedia.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedMedia.description}</p>
                  </div>
                )}
                <div className="flex gap-3">
                  {selectedMedia.external_url && (
                    <a
                      href={selectedMedia.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </a>
                  )}
                  {selectedMedia.download_url && (
                    <a
                      href={selectedMedia.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Media
