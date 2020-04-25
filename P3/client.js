//-- Traza de prueba
console.log("Hola!");

//-- Obtener el botón de VER del DOM
const s = document.getElementById('search');

const result = document.getElementById('productsresp');


s.addEventListener('keyup', function() {
  
  var str = this.value;
  // if there is any char on text input once we stop pressing buttons
  if (str != '') {
    console.log('haycosillas');
    //-- Crear objeto para hacer peticiones AJAX
    const m = new XMLHttpRequest();

    //-- Configurar la petición
    var req = 'http://localhost:8080/searchbox?param=' + str;
    m.open("GET", req, true);

    // Any advice of requests
    m.onreadystatechange=function(){
      // Everything OK!
      if (m.readyState==4 && m.status==200){
        let prods = JSON.parse(m.responseText)
        result.innerHTML = "";
        // no products received (empty list) but not empty text input
        if (prods.length == 0) {
          result.innerHTML = "No se encontró ningún producto";
        }
        // not empty list
        else {
          for (let i=0; i < prods.length; i++) {
            result.innerHTML += prods[i];
            if (i < prods.length-1) {
              result.innerHTML += '</p><p>';
            }
          }
        }
     }
    };
    m.send();
  // if text input is empty (last char celeted with delete button)
  } else {
    result.innerHTML = "Resultado de la búsqueda";
  }

});
