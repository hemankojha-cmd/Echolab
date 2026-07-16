const WebSocket = require("ws");

const websocketHandler = require("../websocket/websocketHandler");

module.exports = (server) => {

    const wss = new WebSocket.Server({
        server
    });

    console.log("WebSocket Server Started");

    wss.on("connection", (socket) => {

        websocketHandler(socket);

    });

};