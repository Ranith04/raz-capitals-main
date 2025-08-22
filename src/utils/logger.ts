// Simple logger utility that logs to both browser console and server terminal
export const logger = {
  info: async (message: string, ...args: any[]) => {
    // Log to browser console
    console.log(`ℹ️ ${message}`, ...args);
    
    // Send to server API to log in terminal
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `ℹ️ ${message}`,
          data: args.length === 1 ? args[0] : args,
          level: 'info'
        })
      });
    } catch (e) {
      // Silently fail if API is not available
    }
  },

  success: async (message: string, ...args: any[]) => {
    // Log to browser console
    console.log(`✅ ${message}`, ...args);
    
    // Send to server API to log in terminal
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `✅ ${message}`,
          data: args.length === 1 ? args[0] : args,
          level: 'info'
        })
      });
    } catch (e) {
      // Silently fail if API is not available
    }
  },

  error: async (message: string, ...args: any[]) => {
    // Log to browser console
    console.error(`❌ ${message}`, ...args);
    
    // Send to server API to log in terminal
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `❌ ${message}`,
          data: args.length === 1 ? args[0] : args,
          level: 'error'
        })
      });
    } catch (e) {
      // Silently fail if API is not available
    }
  },

  warn: async (message: string, ...args: any[]) => {
    // Log to browser console
    console.warn(`⚠️ ${message}`, ...args);
    
    // Send to server API to log in terminal
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `⚠️ ${message}`,
          data: args.length === 1 ? args[0] : args,
          level: 'warn'
        })
      });
    } catch (e) {
      // Silently fail if API is not available
    }
  },

  query: async (queryNumber: number, table: string, filter: string, result: any) => {
    const message = `📊 Query ${queryNumber}: ${table}`;
    const data = { table, filter, result };
    
    // Log to browser console
    console.log(message, data);
    
    // Send to server API to log in terminal
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          data,
          level: 'info'
        })
      });
    } catch (e) {
      // Silently fail if API is not available
    }
  }
};
