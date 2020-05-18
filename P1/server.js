
const PUERTO = 8080;

const fs = require('fs');
//-- Modulo http
const http = require('http');
//-- Módulo URL
const url = require('url');

http.createServer( (req, res) => {

//------------------------------------------------------------------------------
  // http://localhost:8080            ----> Host
  // /mi_tienda/listados.html         ----> Ruta (q.pathname)
  // ?articulo=pendrive&color=blanco  ----> Búsqueda (qsearch)
//------------------------------------------------------------------------------

  console.log("--------> Request received");
  console.log(' -Method: ' + req.method);

  //-- Acceso al objeto
  //console.log("Artículo: " + qdata.articulo)
  //console.log("Color: " + qdata.color)

  let q = url.parse(req.url, true);

  let qdata = q.query;

  console.log(" -Pathname: " +  q.pathname);

  var filename = q.pathname.slice(1);
  var req_mime = filename.slice(filename.lastIndexOf(".")+1);
  console.log('   -File: ' + filename + ' | Mime type: ' + req_mime);
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end("404 Not Found");
    } else {
      if (req_mime == "html") {
        res.writeHead(200, {'Content-Type': "text/html"});
      } else if (req_mime == 'png') {
        res.writeHead(200, {'Content-Type': "image/png"});
      }
      else if (req_mime == 'jpg') {
        res.writeHead(200, {'Content-Type': "image/jpg"});
      }
      else if (req_mime == 'css') {
        res.writeHead(200, {'Content-Type': "text/css"});
      }
      res.write(data);
      res.end();
    }
  });

}).listen(PUERTO);

console.log('\nRunning server at port ' + PUERTO + ' ...\n');
