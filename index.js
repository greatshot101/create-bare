import { createServer } from 'node:http'; // Import the 'http' module
import express from 'express';
import createBareServer from '@tomphttp/bare-server-node';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';

const bare = createBareServer('/bare/');
const app = express();

app.use(express.static('static'));
app.use('/uv/', express.static('static/js/uv/'));

const server = createServer();

server.on('request', (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

export default async (req, res) => {
  // Handle incoming HTTP requests using Vercel serverless functions
  server.emit('request', req, res);
};
