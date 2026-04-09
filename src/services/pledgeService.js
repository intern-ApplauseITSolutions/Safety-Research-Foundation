// Pledge Service for API calls
const API_BASE = '/api';

export const pledgeService = {
  // Get pledge data for public page
  getPledgeData: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/pledge.php`);
      const contentType = response.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch pledge data');
      }
    } catch (error) {
      console.error('Error fetching pledge data:', error);
      throw error;
    }
  },

  // Send OTP
  sendOTP: async (email, name, mobile) => {
    try {
      const response = await fetch(`${API_BASE}/pledge/send-otp.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          mobile: mobile.trim()
        })
      });
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error('Server error: Invalid response format');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // If OTP is returned (for testing), show it
        if (data.data && data.data.otp) {
          console.log('TESTING OTP:', data.data.otp);
          alert(`For testing: Your OTP is ${data.data.otp}`);
        }
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const normalizedOtp = otp.replace(/\D/g, '').trim();
      const response = await fetch(`${API_BASE}/pledge/verify-otp.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          otp: normalizedOtp
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },

  // Submit pledge
  submitPledge: async (pledgeData) => {
    try {
      const response = await fetch(`${API_BASE}/pledge/submit.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pledgeData)
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to submit pledge');
      }
    } catch (error) {
      console.error('Error submitting pledge:', error);
      throw error;
    }
  },

  sendExistingCertificateOTP: async ({ email, configId }) => {
    try {
      const response = await fetch(`${API_BASE}/pledge/send-certificate-otp.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          config_id: configId
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending existing certificate OTP:', error);
      throw error;
    }
  },

  getExistingCertificate: async ({ email, otp, configId, action }) => {
    try {
      const response = await fetch(`${API_BASE}/pledge/certificate.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.replace(/\D/g, '').trim(),
          config_id: configId,
          action
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to process certificate request');
      }
    } catch (error) {
      console.error('Error processing certificate request:', error);
      throw error;
    }
  }
};
