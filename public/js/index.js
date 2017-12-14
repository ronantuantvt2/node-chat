var socket = io();
socket.on('connect', () => {
});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

socket.on('newMessage', (message) => {    
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

$('#messageForm').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('input[name=message]').val()
  }, function(data) {
    console.log(data);
  });
});