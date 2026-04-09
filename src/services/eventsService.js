import api from './api'

export const eventsService = {
  // Get all events for public display
  getAllEvents: async (params = {}) => {
    const response = await api.get('/public/events.php', { params })
    return response.data
  },

  // Get featured events
  getFeaturedEvents: async (limit = 3) => {
    const response = await api.get('/public/events.php', {
      params: { featured: 'true', limit }
    })
    return response.data
  },

  // Get events by category
  getEventsByCategory: async (category, params = {}) => {
    const response = await api.get('/public/events.php', {
      params: { category, ...params }
    })
    return response.data
  }
}

export default eventsService
