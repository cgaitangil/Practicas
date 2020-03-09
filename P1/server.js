//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

const fs = require('fs');
//-- Modulo http
const http = require('http');
//-- Módulo URL
const url = require('url');

http.createServer( (req, res) => {
  console.log("--------> Peticion recibida");
  //console.log(req.headers)
  console.log(req.headers.accept.slice(0, 4));
  console.log(req.method);
  //console.log("  ---> Cabecera de la petición:")
  //console.log("HOST: " + req.headers.host)
  //console.log("USER AGENT: " + req.headers['user-agent'])
  //console.log("ACCEPT:" + req.headers['accept-language'])
  //onsole.log("ACCEPT-ENCODING:" + req.headers['accept-encoding'])
  //nsole.log("CONNECTION: " + req.headers.connection)
  //console.log("UPGRADE-INSECURE-REQUEST: " +
  //            req.headers['upgrade-insecure-requests'])

  console.log('Requested URL: ' + req.url);

  //-- Analisis de la URL recibida:
  let q = url.parse(req.url, true);

  console.log("Pathname: " +  q.pathname);
  console.log("search: " + q.search);
  console.log("Búsqueda:");
  let qdata = q.query;
  console.log(qdata);

  //-- Acceso al objeto
  console.log("Artículo: " + qdata.articulo)
  console.log("Color: " + qdata.color)

  //-- Crear mensaje de respuesta
  //_- Crear el mensaje de respuesta. Primero la cabecera
  //-- El código 200 se usa para indicar que todo está ok
  //-- En el campo Content-Type tenemos que introducir el tipo MIME
  //-- de lo que devolvemos

  var filename = q.pathname.slice(1)
  console.log('----->' + filename)
  fs.readFile(filename, 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } else {
      var req_mime = filename.slice(filename.lastIndexOf(".")+1);
      console.log(req_mime);
      if (req_mime == "html") {
        console.log('es  html');
        res.writeHead(200, {'Content-Type': "text/html"});
        res.write(data);
        res.end();
      }
      else if (req_mime == 'png') {
        console.log('es img png');
        res.writeHead(200, {'Content-Type': "image/png"});
        res.end(data, 'binary');
      }
      else if (req_mime == 'jpg') {
        console.log('es img jpg');
        res.writeHead(200, {'Content-Type': "image/jpg"});
        res.end(data, 'binary');
      }
      else if (req_mime == 'css') {
        console.log('es css');
        res.writeHead(200, {'Content-Type': "text/css"});
        res.write(data);
        res.end();
      }
    }
  });







}).listen(PUERTO);

console.log("Arrancando servidor...")
console.log("Puerto: " + PUERTO)
