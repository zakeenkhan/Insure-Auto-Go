const { bootstrap } = require('../dist/main');
const http = require('http');

let app;
let server;

// Initialize the app and server
async function initializeApp() {
  if (!app) {
    // Initialize NestJS application
    app = await bootstrap();
    
    // Get the HTTP server instance from NestJS
    const httpAdapter = app.getHttpAdapter();
    server = http.createServer(httpAdapter.getInstance());
  }
  return { app, server };
}

module.exports = async (req, res) => {
  try {
    // Initialize the app if not already done
    const { server: httpServer } = await initializeApp();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      return res.end();
    }

    // Forward the request to the NestJS app
    return new Promise((resolve) => {
      // Handle response completion
      const originalEnd = res.end;
      res.end = function (...args) {
        originalEnd.apply(this, args);
        resolve(true);
      };

      // Emit the request to the server
      httpServer.emit('request', req, res);
    });
  } catch (error) {
    console.error('Error handling request:', error);
    
    // Send error response
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'error',
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString()
    }));
    
    return true;
  }
};

// Handle serverless function cleanup
module.exports.config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};
