# Práctica 3

# 3.1
	Servidor: > node server.js
	Client:   localhost(ServerIP):8080/SiVasSinTetera
	
		Aparecerá la tienda de teteras/cafeteras SiVasSinTetera. 
		
			-> shop.html 

		La cual contiene 4 productos (con los respectivos botones para añadir al carrito)
		y dos botones, uno para ingresar/registrarse (signup.html) y otro para
		finalizar la compra (buyform.html).
		Si no se encuentra registrado (cookie 'name') no podrá añadir productos al 
		carrito (cookie 'cart') ni finalizar la compra, puesto que para finalizar la compra
		es necesario que haya cookies, ambas. 
			
			-> buyform.html ----POST----> 	Ninguna cookie -> registro.
							Cookie 'name' -> carrito vacío.	
							Cookie 'cart' -> imposible, mecesaria
										cookie 'name'
							Ambas cookies -> éxito

		Si ya se encuentra registrado podrá añadir al carrito de la compra
		cualquier producto haciendo click en 'Añadir al carrito' que aparece en cada uno 			de ellos.

			-> shop.html ----POST----> /cart en server.js

		Si ha añadido ya los productos que desea comprar haga click en 'COMPRAR'.
	
			-> buyform.html ----POST----> Éxito.

# 3.2

		Estando en la página principal (shop.html), podremos realizar una
		búsqueda del producto deseado mediante un cuadro de búsqueda situado en la parte
		superior de la misma.

			-> shop.html -> text input ->  server.js  
					(client.js)   (/searchbox)
			

