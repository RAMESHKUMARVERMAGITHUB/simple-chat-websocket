const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const port = 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (data) => { // data coming for user sessions
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data);
            }
        })    
    })
})

server.listen(port, () => {
    console.log(`Server is listening port ${port}`)
})