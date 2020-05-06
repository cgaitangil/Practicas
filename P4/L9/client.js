console.log("Ejecutando cliente JS...");

// DOM elements
const display = document.getElementById("display");
const msg = document.getElementById("msg");
const send = document.getElementById("send");

// creating websocket conection with server
const socket = io();

// event 'hello' received
socket.on('hello', (msg) => {
  console.log("Mensaje del servidor: " + msg);
  display.innerHTML += msg + '<< <br>';
});

// msg received
socket.on('msg', (msg) => {
  display.innerHTML += msg + '<<br>';
});

// 'ENVIAR' button pressed
send.onclick = () => {
  if (msg.value) {
    // sending if text input not empty
    if (msg.value[0] == '/') {
      socket.emit('cmd', msg.value);
    }
    else {
      socket.emit('msg', msg.value);
    }
    display.innerHTML += "<p align='left'> >" + msg.value;
  }

  // deleting sent msg
  msg.value = "";
}
