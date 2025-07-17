import api from './api';

export const paymentService = {
  // Get all payments
  getAllPayments: async () => {
    try {
      const response = await api.get('/payments');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get client payments
  getClientPayments: async (clientId) => {
    try {
      const response = await api.get(`/payments/client/${clientId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create payment
  createPayment: async (paymentData) => {
    try {
      const response = await api.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Parse M-Pesa message
  parseMpesaMessage: async (message) => {
    try {
      const response = await api.post('/payments/mpesa/parse', { message });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Process M-Pesa payment
  processMpesaPayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/mpesa/process', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};