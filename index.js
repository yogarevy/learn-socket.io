var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //on is receive
  socket.on('server', (msg) => {
    console.log('message: ' + msg);
    io.emit('client', msg);
  });
});

http.listen(3000, () => {
  console.log(`listening on http://localhost:${port}`);
});