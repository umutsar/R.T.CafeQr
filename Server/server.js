const WebSocket = require('ws');

const clients = new Set();

function handleClient(websocket, path) {
    clients.add(websocket);
    console.log("Yeni bağlantı alındı: " + websocket._socket.remoteAddress + ":" + websocket._socket.remotePort);

    // Bağlantı başarılı mesajını gönder
    const message = "Bağlantı başarılı! Hoş geldiniz.";
    websocket.send(message);

    websocket.on('message', function incoming(message) {
        clients.forEach(function (client) {
            const senderInfo = websocket._socket.remoteAddress + ":" + websocket._socket.remotePort;
            client.send(`${senderInfo}: ${message}`);
        });
    });

    websocket.on('close', function () {
        clients.delete(websocket);
    });
}

async function startServer() {
    const server = new WebSocket.Server({ port: 5556, host: '10.100.2.248' });

    server.on('connection', handleClient);

    console.log("Server dinlemeye başladı...");
}

startServer();
