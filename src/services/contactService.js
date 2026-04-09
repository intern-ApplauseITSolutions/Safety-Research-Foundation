import api from './api'

export const contactService = {
  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await api.post('/contact/submit-noauth.php', contactData)
      return response.data
    } catch (error) {
      console.error('Contact service error:', error)
      // Return error response for consistent handling
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to submit form. Please try again.'
      }
    }
  }
}

export default contactService
