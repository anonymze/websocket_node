const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const { Server, WebSocket } = require('ws');
const express = require('express');

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', function connection(ws) {
    console.log('New client detected');

    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });

    });
});