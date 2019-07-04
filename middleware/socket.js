module.exports = function(io) {
  var users = {};
  
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      delete users[socket.user_id];
      socket.leave(socket.room);
      console.log('client disconnected');
    });

    socket.on('join', (params) => {
      console.log('user joined room: default');
      socket.user_id = params.user_id;
      socket.room = 'default';
      users[params.user_id] = params.user_id;
      socket.join('default');
    });

    socket.on('sendMessage', (message_id) => {
      console.log('new message emitted');
      console.log(socket.rooms);
      io.sockets.in(socket.room).emit('newMessage', message_id);
    });

    socket.on('switchRoom', (channel_id) => {
      console.log('joining room: ' + channel_id);
      socket.leave(socket.room);
      socket.join(channel_id);
      socket.room = channel_id;
    });
  });

  // setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
};