const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const keys = require('./config/keys');
const cors = require('cors');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require('./utils/users');

// Routes
const router = require('./routes/router');

// Instantiate
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log('We have a new connection!');

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback({ error });

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}.`
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined.` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback({ error: null });
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if (!user) return callback({ error: 'User is not found in the room.' });

    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback({ error: null });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user)
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left the room.`
      });
  });
});

app.use(cors());
// app.use(router);
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
