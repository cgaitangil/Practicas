
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from random import randint

# Create your views here.

# -- Fichero mi_tienda/views.py
from django.http import HttpResponse

from my_shop.models import Producto

# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
# --def index(request):
# --    return HttpResponse("Hola! esta es la página principal de Mi tienda!")

from django.http import HttpResponse
from django.shortcuts import render
from random import randint

# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
def index(request):
    return render(request, 'shop.html', {})

# -- Ejemplo de generacion a partir de cadenas con código html
def test1(request):

    # -- Obtener el número aleatorio
    numero = randint(0, 100)

    # Párrafo a insertar
    P = "<p>Numero aleatorio: " + str(numero) + " </p>"

    PAGINA_INI = """
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Test1</title>
      </head>
      <body>
        <h1>TEST1</h1>
    """

    PAGINA_FIN = """
      </body>
    </html>
    """
    return HttpResponse(PAGINA_INI + P + PAGINA_FIN)

    # -- Ejemplo de generacion mediante una plantilla en el código
def test2(request):

    # -- Obtener el número aleatorio
    numero = randint(0, 100)

    PLANTILLA = """
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Test2</title>
      </head>
      <body>
        <h1>TEST2</h1>
        <p> Numero aleatorio:  {{numero}} </p>
      </body>
    </html>
    """

    # --Procesar la plantilla
    t = Template(PLANTILLA)

    # -- Crear el contexto: Asignar el numero
    c = Context({'numero': str(numero)})

    # -- Obtener la pagina html final
    html = t.render(c)

    return HttpResponse(html)

    # -- Ejemplo de generacion mediante una plantilla en FICHERO
def test3(request):

    # -- Obtener el número aleatorio
    numero = randint(0, 100)

    # -- Leer la plantilla del fichero
    t = get_template('test.html')

    # -- Crear el contexto: Asignar el numero
    c = {'numero': str(numero)}

    # -- Obtener la pagina html final
    html = t.render(c)

    return HttpResponse(html)

    # -- Ejemplo de uso de la función Render
def test4(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'test.html', {'numero':str(numero)})

def test5(request):
# -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'test5.html', {'numero':str(numero)})

# import Producto
def list(request):
    productos = Producto.objects.all()
    html = "<h2>Listado de articulos</h2>"
    for prod in productos:
        print(prod.nombre)
        html += '<p>'+ prod.nombre + ' ' + str(prod.precio) + '<p>'
    return HttpResponse(html)

# con plantilla -> render()
def list2(request):
    productos = Producto.objects.all()
    return render(request, 'listado.html', {'productos':productos})

def formulario(request):
    return render(request, 'formulario.html', {})

def recepcion(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona}")
    return HttpResponse("Datos recibidos!!. Comprador: " + request.POST['nombre'])
