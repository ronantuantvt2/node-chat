const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.port || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New connection');
    socket.on('disconnect', () => {
       console.log('Disconnect to browser') ;
    });
});

server.listen(port, () => {
   console.log(`Server is running or port ${port}`);
});

