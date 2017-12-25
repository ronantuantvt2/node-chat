const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.port || 3000;
const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/user');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('join', (param, callback) => {        
        if (!isRealString(param.name) || !isRealString(param.room)) {
            return callback('Name & room are required.');
        }
        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);
        io.to(param.room).emit('updateUserList', users.getUserList(param.room));
        socket.emit('newMessage',generateMessage('Admin', 'Welcome'));    
        socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin', `${param.name} has joined`));        
    });
    socket.on('disconnect', () => {
        console.log('remove user by socket:', socket.id);
        var user = users.removeUser(socket.id);
      
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList());
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });                
});

server.listen(port, () => {
   console.log(`Server is running or port ${port}`);
});

