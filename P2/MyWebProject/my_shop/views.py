
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from random import randint

from my_shop.models import Product
from my_shop.models import Order

def index(request):
    products = Product.objects.all()
    orders = Order.objects.all()
    return render(request, 'shop.html', {'products':products,
                                         'orders':orders})
def prod1(request):
    products = Product.objects.all()
    return render(request, 'prod.html', {'product':products[0]})
def prod2(request):
    products = Product.objects.all()
    return render(request, 'prod.html', {'product':products[1]})
def prod3(request):
    products = Product.objects.all()
    return render(request, 'prod.html', {'product':products[2]})
def prod4(request):
    products = Product.objects.all()
    return render(request, 'prod.html', {'product':products[3]})

def formulario(request):
    return render(request, 'formulario.html',
                  {'products':Product.objects.all()})

def recepcion(request):
    person = request.POST['nombre']
    prod = request.POST['product']
    products = Product.objects.all()
    # checking index of element for checking stock
    if prod == 'Tetera VIER':
        index = 0
    if prod == 'Tetera IBILI HANOI':
        index = 1
    if prod == 'Tetera FULOON':
        index = 2
    if prod == 'Tetera PLUIESO':
        index = 3
    if products[index].stock == 0:
        available_el = False
    else:
        available_el = True
        # -1 stock in that product if its not 0
        element = Product.objects.get(name = prod)
        element.stock = element.stock - 1
        element.save()
        # Saving in database
        order = Order(buyer=person, product=prod)
        order.save()
        # Pinting in server console
        print(f" Order received!!! ----> Who? : {person} | What? : {prod}" )
    # returning html as response
    return render(request, 'recepcion.html', {'available':available_el})
