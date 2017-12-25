var socket = io();
socket.on('connect', () => {
    var params = $.deparam(window.location.search);
    socket.emit('join', params, (err) => {
       if (err) {
           alert(err);
           window.location.href = '/';
       } else {
           console.log('No error');
       }
    });
});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

socket.on('updateUserList', function(users) {
    console.log('User list: ', users);  
    var $ol = $('<ol></ol>');
    users.forEach(function(user) {
        var $li = $('<li></li>');
        $li.text(user);
        $ol.append($li);
    });
    $('#users').html($ol);
});

socket.on('newMessage', (message) => {    
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var messageTemplate = $('#messageTpl').html();
    var messageHtml = Mustache.render(messageTemplate, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    
    $('#messages').append(messageHtml);    
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