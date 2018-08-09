const { api } = require('./config');

module.exports = function listen(app) {
  const server = require('http').Server(app);
  // const io = require('socket.io')(server);
  
  server.listen(api.port, function started() {
    const address = this.address();
    
    const host = address.address !== '::' ? address.address : 'localhost';
    const port = address.port;
    console.log('App listening at http://%s:%s', host, port);
    console.log('Swagger Doc started at at http://%s:%s/docs', host, port);
  });
  
  /*io.on('connection', (socket) => {
      socket.emit('connected');
      
      socket.on('disconnectMe', () => {
        const rooms = io.nsps['/'].adapter.rooms;
        for (let room in rooms) {
          if (room !== connectedUsersRoom) {
            io.to(room).emit('leave', socket.id);
            socket.leave(room);
          }
        }
        socket.disconnect(0);
      });
      
      socket.on('some_message', (conversation) => {
      
      });
    },
  );*/
};
