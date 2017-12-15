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

var messageTextBox = $('input[name=message]');
var sendButton = $('button[name=sendButton]');
$('#messageForm').on('submit', function(e) {
  e.preventDefault();
  sendButton.attr('disabled', 'disabled');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function(data) {
    messageTextBox.val('');
    sendButton.removeAttr('disabled');
  });
});