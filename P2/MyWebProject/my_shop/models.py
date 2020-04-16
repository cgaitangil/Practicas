from django.db import models

class Product(models.Model):
    """Modelo de datos de mis productos"""

    # -- django.models.com
    name = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    price = models.FloatField()
    #filename = models.CharField(max_length=50)

    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.name

class Order(models.Model):
    """Modelo de datos de mis pedidos"""

    # -- django.models.com
    buyer = models.CharField(max_length=50)
    product = models.CharField(max_length=50)

    # -- Usamos el nombre del comprador para identificar
    # -- el pedido
    def __str__(self):
        return self.buyer
