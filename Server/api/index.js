const { createServer } = require('http');
const { parse } = require('url');
const { createServer: createVercelServer } = require('@vercel/node');
const { bootstrap } = require('../dist/main');

let server;

module.exports = async (req, res) => {
  if (!server) {
    const app = await bootstrap();
    server = createServer(app.getHttpServer());
  }

  // Forward the request to the NestJS app
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;
  
  // Handle the request with the NestJS app
  return new Promise((resolve, reject) => {
    const end = res.end;
    res.end = function () {
      end.apply(this, arguments);
      resolve(true);
    };
    
    server.emit('request', req, res);
  });
};

// Handle serverless function cleanup
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
