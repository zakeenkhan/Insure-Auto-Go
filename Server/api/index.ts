// This file is required by Vercel for serverless functions
import { bootstrap } from '../src/main';

// Initialize the application
const appPromise = bootstrap();

// Export the Vercel serverless function
export default async function handler(req: any, res: any) {
  try {
    const app = await appPromise;
    // Forward the request to NestJS
    return app.getHttpAdapter().getInstance()(req, res);
  } catch (error) {
    console.error('Error in Vercel serverless function:', error);
    res.status(500).json({ 
      statusCode: 500, 
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message 
    });
  }
}
