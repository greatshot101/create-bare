import { createServer } from 'node:https';
import { createServer as createHTTP } from 'node:http';
import { createBareServer } from '@tomphttp/bare-server-node';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import express from 'express';
import * as fs from 'fs';
import * as process from 'process';
const bare = createBareServer('/bare/');
const app = express();

app.use(express.static('static'));
app.use('/uv/', express.static('static/js/uv/'));
const httpServer = createHTTP()
const server = createServer({
    key: fs.readFileSync(process.env.KEY),
    cert: fs.readFileSync(process.env.CERT)
});

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

httpServer.on('request', (req,res) => {
    app(req, res);
    // res.writeHead(200)
    // res.end("<h1>ERROR: This server only supports https<h1/>")
})

httpServer.listen({
    port: 80,
});

server.listen({
    port: 443,
});
