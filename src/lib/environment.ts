// Environment configuration for production vs development
export const environment = {
  // Environment detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Logging configuration
  logging: {
    enabled: process.env.NODE_ENV === 'development',
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
    showDebugInfo: process.env.NODE_ENV === 'development',
  },
  
  // Error handling configuration
  errorHandling: {
    showErrorDetails: process.env.NODE_ENV === 'development',
    logToConsole: process.env.NODE_ENV === 'development',
    reportToService: process.env.NODE_ENV === 'production',
  },
  
  // Feature flags
  features: {
    debugMode: process.env.NODE_ENV === 'development',
    performanceMonitoring: process.env.NODE_ENV === 'production',
    analytics: process.env.NODE_ENV === 'production',
  }
};

// Helper functions
export const isDev = () => environment.isDevelopment;
export const isProd = () => environment.isProduction;
export const shouldLog = () => environment.logging.enabled;
export const shouldShowDebugInfo = () => environment.logging.showDebugInfo;
