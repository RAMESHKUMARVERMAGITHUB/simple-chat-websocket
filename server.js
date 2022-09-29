const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const port = 6969;
const port2 = 8080;
const app = express();
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/index.html'))
})
app.listen(port2, () => {
    console.log('html server running on port ' + port2)
})


server.listen(port, () => {
    console.log(`Server is listening port ${port}`)
})