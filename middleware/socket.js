module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
      console.log('client disconnected');
    });
  });

  setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
};