var socket = io();
socket.on('connect', () => {
});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

socket.on('newMessage', (message) => {
    console.log(message);    
});

socket.emit('createMessage', {
  from: 'Ronan',
  text: 'Hello'
}, function(data) {
  console.log(data);
});