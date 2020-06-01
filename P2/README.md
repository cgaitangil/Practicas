# Práctica 2

		Servidor (terminal): 'python3 manage.py runserver'
		Cliente (navegador): 'http://localhost:8000/my_shop/'

		- Al menos 3 productos diferentes:
			- Tetera VIER
			- Tetera IBILI HANOI
			- Tetera FULOON
			- Tetera PLUIESO

		- El sitio debe generar varias vistas: 
			- la general: 'index'
			- productos[1234]: 'prod[1234]'
			- Se deben utilizar plantillas para generar los contenidos dinámicos 				  concretos:
				- 'shop.html': página principal
				- 'prod.html'
				- 'formulario.html'
				- 'recepcion.html'
		- El cliente debe poder rellenar un formulario para relizar un pedido concreto, 		  que se recibe en el servidor y se inserta en la base de datos:
			Al hacer 'click' sobre el botón comprar, nos reedirige al formulario
			de compra, en el cuál podremos insertar nuestro nombre y escoger el 
			producto a comprar, indicándonos posteriormente si la compra
			se ha realizado con éxito o no, debido a la falta de stock (vista 				recepción, que recoge los datos introducidos en el formulario).
		
		- Modelos de datos:
			- Modelo 'Product' por cada producto:
				- name 
				- stock
				- price
			- Modelo 'Order' por cada uno de los pedidos realizados:
				- buyer
				- product

