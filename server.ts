// server.ts - Next.js Standalone + Socket.IO
import { config } from 'dotenv';
import { setupSocket } from '@/lib/socket';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT, gracefully shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, gracefully shutting down...');
  process.exit(0);
});

// Load environment variables from .env.local
config({ path: '.env.local' });

const dev = process.env.NODE_ENV !== 'production';
const currentPort = process.env.PORT ? parseInt(process.env.PORT) : 3000;
// Use localhost in development, but in production use 0.0.0.0 for binding while ensuring proper host header handling
const hostname = dev ? 'localhost' : '0.0.0.0';
// For production, we need to ensure the client uses the proper hostname
const publicHostname = process.env.PUBLIC_HOSTNAME || (dev ? 'localhost' : 'localhost');

// Custom server with Socket.IO integration
async function createCustomServer() {
  try {
    // Create Next.js app
    const nextApp = next({ 
      dev,
      dir: process.cwd(),
      // In production, use the current directory where .next is located
      conf: dev ? undefined : { distDir: './.next' }
    });

    await nextApp.prepare();
    const handle = nextApp.getRequestHandler();

    // Create HTTP server that will handle both Next.js and Socket.IO
    const server = createServer((req, res) => {
      // Add diagnostic logging for all requests
      console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url} | Host: ${req.headers.host}`);
      
      // Skip socket.io requests from Next.js handler
      if (req.url?.startsWith('/api/socketio')) {
        console.log(`[${new Date().toISOString()}] Skipping Socket.IO request: ${req.url}`);
        return;
      }
      
      // Handle Next.js internal routes - ensure they're properly processed
      if (req.url?.includes('__nextjs')) {
        console.log(`[${new Date().toISOString()}] Next.js internal route detected: ${req.url}`);
        // Ensure proper host header for Next.js internal routes
        if (!req.headers.host || req.headers.host.includes('0.0.0.0')) {
          req.headers.host = `${publicHostname}:${currentPort}`;
          console.log(`[${new Date().toISOString()}] Updated host header to: ${req.headers.host}`);
        }
      }
      
      // Handle all other requests with Next.js
      handle(req, res);
    });

    // Setup Socket.IO
    const io = new Server(server, {
      path: '/api/socketio',
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    setupSocket(io);

    // Start the server
    server.listen(currentPort, hostname, () => {
      console.log(`> Ready on http://${hostname}:${currentPort}`);
      console.log(`> Socket.IO server running at ws://${hostname}:${currentPort}/api/socketio`);
      
      // In development, also log the HMR WebSocket URL
      if (dev) {
        console.log(`> Next.js HMR WebSocket should connect to ws://${hostname}:${currentPort}/_next/webpack-hmr`);
      }
    });

  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
}

// Start the server
createCustomServer();
