// Edited By: Tuan Tran 

var app = require('http').createServer(httpserver);
var io = require('socket.io').listen(app);
var fs = require('fs');
var b = require('bonescript');
 
// Defined Port Number
app.listen(7080);

// Led variable
var led = 'USR3';

// Function led
setup = function() {
    b.pinMode(led, OUTPUT);
    b.digitalWrite(led,b.HIGH);
};

// Function server
function httpserver (req, res) {
  fs.readFile('/var/www/client.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

// Establish a socket
io.sockets.on('connection', function (socket) {
  socket.on('led', function (data) {
    console.log(data);
    if (data == 'on'){
        b.digitalWrite(led, b.HIGH); 
        socket.emit('led', 'on');
    }else{
        b.digitalWrite(led, b.LOW);
        socket.emit('led', 'off');
    }
  });
});

