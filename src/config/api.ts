// API Configuration
const API_CONFIG = {
  // Development (local)
  development: {
    baseURL: 'http://localhost:3001',
  },
  // Production (deployed backend)
  production: {
    baseURL: 'https://dental-salary-app.onrender.com', // Replace with your actual Render URL
  }
};

// Get current environment - default to production for deployed app
const isDevelopment = process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost';
const currentConfig = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

// Export API endpoints
export const API_ENDPOINTS = {
  // Public endpoints
  submissions: `${currentConfig.baseURL}/api/submissions`,
  health: `${currentConfig.baseURL}/api/health`,
  
  // Admin endpoints
  adminLogin: `${currentConfig.baseURL}/api/admin/login`,
  adminSubmissions: `${currentConfig.baseURL}/api/admin/submissions`,
  adminDeleteSubmission: (id: string) => `${currentConfig.baseURL}/api/admin/submissions/${id}`,
};

// Export base URL for other uses
export const API_BASE_URL = currentConfig.baseURL;

// Helper function to get full URL
export const getApiUrl = (endpoint: string) => `${currentConfig.baseURL}${endpoint}`; 