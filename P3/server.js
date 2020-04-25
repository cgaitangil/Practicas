//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

const fs = require('fs');
//-- Modulo http
const http = require('http');
//-- Módulo URL
const url = require('url');

function postSlice(str) {
  var dictionary = {};

  equalTimes = (str.match(/=/g) || []).length;
  for (var i = 0; i < (equalTimes); i++) {
    key = str.slice(0, str.indexOf('='));
    // there is another input value, separated with &
    if ( !(str.indexOf('&') < 0) ) {
      value = str.slice(str.indexOf('=')+1, str.indexOf('&'));
      str = str.slice(str.indexOf('&')+1);
    } else {
      value = str.slice(str.indexOf('=')+1);
    }
    dictionary[key] = value;
  }
  //console.log(keys);
  //console.log(values);
  return dictionary;
}

let products = ["Tetera VIER", "Tetera HIBILI HANOI",
                 "Tetera FULOON", "Tetera PLUIESO"];

http.createServer( (req, res) => {

//------------------------------------------------------------------------------
  // http://localhost:8080            ----> Host
  // /mi_tienda/listados.html         ----> Ruta (q.pathname)
  // ?articulo=pendrive&color=blanco  ----> Búsqueda (qsearch)
//------------------------------------------------------------------------------

  console.log("--------> Peticion recibida");
  //console.log(req.headers)
  //console.log(req.headers.accept.slice(0, 4));
  console.log(' -Method: ' + req.method);

  //-- Acceso al objeto
  //console.log("Artículo: " + qdata.articulo)
  //console.log("Color: " + qdata.color)

  let q = url.parse(req.url, true);

  let qdata = q.query;

  switch (q.pathname) {

    case "/SiVasSinTetera":
      fs.readFile('shop.html', (err, data) => {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end("404 Not Found");
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        }
      });
      break;

    case '/signupreceiver':
      if (req.method === 'POST') {
        // Handle post info...
        var content = `
        <!DOCTYPE html>
        <html lang="es" >
          <head>
            <link rel="icon" type="image/png" href="favicon.png">
            <link rel='stylesheet' href="form.css">
            <meta charset="utf-8">
            <title>SiVasSinTetera</title>
          </head>
          <body>
            <p>Bienvenido `
        req.on('data', chunk => {
          //-- Leer los datos (convertir el buffer a cadena)
          data = chunk.toString();

          // Cookie with username given by signup post
          //   received data:       name=[]&email=[]&password=[]
          namecookie = data.slice(0, data.indexOf('&'));
          res.setHeader('Set-Cookie', namecookie);
          content += data.slice(data.indexOf('=')+1, data.indexOf('&'));
          content += `.
              </p>
              <a style='color:white;' href="SiVasSinTetera">Volver a tienda</a>
            </body>
          </html>
          `
          //-- Mostrar los datos en la consola del servidor
          console.log("Datos recibidos: " + data)
          res.statusCode = 200;
        });
        req.on('end', ()=> {
          //-- Generar el mensaje de respuesta
          res.setHeader('Content-Type', 'text/html')
          res.write(content);
          res.end();
        })
        return
      }
      break

    case '/toCart':
      if (!req.headers.cookie) {
        fs.readFile('signup.html', (err, data) => {
          if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end("404 Not Found");
          } else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
          }
        });
      }
      // there's a cookie already, just adding a cookie with received form
      // from post button 'add to cart' in shop.html
      else {
          var content = `
          <!DOCTYPE html>
          <html lang="es" >
            <head>
              <link rel="icon" type="image/png" href="favicon.png">
              <link rel='stylesheet' href="form.css">
              <meta charset="utf-8">
              <title>SiVasSinTetera</title>
            </head>
            <body>
              <p> Producto '`
          req.on('data', chunk => {
            data = chunk.toString();
            console.log('  loquellega:' + data)
            // Text in html response
            // changing '+'->' ' between words for message once we add to cart
            var prod = data.slice(data.indexOf('=')+1);
            while ( !(prod.indexOf('+') < 0) ) {
              prod = prod.replace('+', ' ');
            }
            content += prod + `' añadido al carrito.
                </p>
                <a style='color:white;' href="SiVasSinTetera">Volver a tienda</a>
              </body>
            </html>
            `
            res.statusCode = 200;
            // Cookie
            // there is already at least one product in our cart
            if ( !(req.headers.cookie.indexOf('cart') < 0) ) {
              var c = req.headers.cookie.slice(req.headers.cookie.indexOf('cart'));
              data = c + ',' + data.slice(data.indexOf('cart')+5);
            }
            res.setHeader('Set-Cookie', data);
          });
          req.on('end', ()=> {
            //-- Generar el mensaje de respuesta
            res.setHeader('Content-Type', 'text/html')
            res.write(content);
            res.end();
          })
          return
      }
      break;

      case '/buyreceiver':
        if (!req.headers.cookie) {
          fs.readFile('signup.html', (err, data) => {
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'});
              res.end("404 Not Found");
            } else{
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.end();
            }
          });
        } else {
          var content = `
            <!DOCTYPE html>
            <html lang="es" >
            <head>
              <link rel="icon" type="image/png" href="favicon.png">
              <link rel='stylesheet' href="form.css">
              <meta charset="utf-8">
              <title>SiVasSinTetera</title>
            </head>
            <body> `
          req.on('data', chunk => {
            // there is not a cart cookie, no products in cart
            if ( req.headers.cookie.indexOf('cart') < 0 ){
              content += ` <p>Su carrito de la compra está vacío.</p>`;
            }
            // cart is not empty
            else {
              content +=
              `
                <p> Compra realizada con éxito.</p>
                <p> Productos:</p>
                <p>
              `
              // taking what is after 'cart' in headers/cookies for message
              // in client
              var products = req.headers.cookie.slice(req.headers.cookie.indexOf('cart') + 5);
              while ( !(products.indexOf('+') < 0) ) {
                products = products.replace('+', ' ');
              }
              while ( !(products.indexOf(',') < 0) ) {
                products = products.replace(',', '</p><p>');
              }
              content += products;
            }
            content += `
                </p>
                <a style='color:white;' href="SiVasSinTetera">Volver a tienda</a>
              </body>
            </html>
            `

            // deleting 'cart' cookie
            //res.clearCookie('cart');

            res.statusCode = 200;
          });
          req.on('end', ()=> {
            //-- Generar el mensaje de respuesta
            res.setHeader('Content-Type', 'text/html')
            res.write(content);
            res.end();
          })
          return
        }
      break;

    case '/searchbox':
      let txt = q.query.param;
      var prodToSend = [];
      for (var i=0; i<products.length; i++) {
        const p = products[i];
        console.log(p.match(txt, '/gi'));
        if (  ( !(products[i].toUpperCase().indexOf(txt)<0) ) ||
              ( !(products[i].toLowerCase().indexOf(txt)<0) ) ){
          prodToSend.push(products[i]);
        }
      }
      content = JSON.stringify(prodToSend) + '\n';
      res.setHeader('Content-Type', 'application/json');
      res.write(content);
      res.end();
      return
      break

    default:
      var filename = q.pathname.slice(1);
      var req_mime = filename.slice(filename.lastIndexOf(".")+1);
      console.log('   -Pide fichero: ' + filename + ' | Tipo mime: ' + req_mime);
      fs.readFile(filename, (err, data) => {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end("404 Not Found");
        } else {
          if (req_mime == "js") {
            res.writeHead(200, {'Content-Type': 'application/javascript'});
          }
          if (req_mime == "html") {
            //res.setHeader('Set-Cookie', 'user=niideaEsAutom')
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

    }

}).listen(PUERTO);

console.log("Arrancando servidor...")
console.log("Puerto: " + PUERTO)
