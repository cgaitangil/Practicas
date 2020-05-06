// express module
const express = require('express');

// new web app
const app = express();

// creating server
const http = require('http').Server(app);

//socket.io library in server
const io = require('socket.io')(http);

const PORT = 8080

// conected users count
var count = 0;

// launching server
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

// index of MiChat
app.get('/', (req, res) => {
  let file = __dirname + '/index.html';
  res.sendFile(file);
  console.log("Acceso a " + file);
});

app.use('/', express.static(__dirname + '/'));

// new conection received
io.on('connection', function(socket){
  count += 1;
  console.log('--> Usuario Nº' + count + ' conectado! Socket id: ' + socket.id);
  // 'hello' event to welcome that client
  socket.emit('hello', "Bienvenido - Usuario Nº" + count);
  // 'msg' event, resending it to the others clients
  socket.on('msg', (msg) => {
    console.log("Cliente: " + socket.id + ': ' + msg);
    // to all conected cleints:
    //            io.emit('msg', msg);
    // to all clients but sender:
    socket.broadcast.emit('msg', msg);
  })
  // 'cmd' event cases
  socket.on('cmd', (msg) => {
    console.log("Cliente cmd: " + socket.id + ': ' + msg);
    if (msg == '/date') {
      var d = new Date();
      d = d.toJSON();
      var datetxt = d.slice(0, d.indexOf('T'));
      var hourtxt = d.slice(d.indexOf('T')+1, d.indexOf('.'));
      txt = datetxt + ' <<<br>' + hourtxt + ' <';
      socket.emit('msg', txt);
    }
    else if (msg == '/list') {
      socket.emit('msg', 'Usuarios conectados: ' + count + ' <');
    }
    else if (msg == '/help') {
      var txt = 'Comandos: <<<br>/hello<<<br>/date<<<br>/list<<<br>/help<'
      socket.emit('msg', txt);
    }
    else if (msg == '/hello') {
      socket.emit('msg', 'Hola! <');
    }
    else {
      socket.emit('msg', 'Comando no encontrado <<<br>´/help´ para mas información <');
    }
  })
  // client out
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado. Socket id: ' + socket.id);
    count -= 1;
  });
});
