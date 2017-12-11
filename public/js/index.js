var socket = io();
socket.on('connect', () => {
    console.log('Connect to server');
});
socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

socket.on('newEmail', (email) => {
   console.log('new Email', email);
});

socket.emit('newEmail', {
    from : 'abc@gmail.com',
    text: 'Hello server'
});
