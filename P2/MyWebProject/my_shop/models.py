from django.db import models

class Product(models.Model):
    """Modelo de datos de mis productos"""

    # -- django.models.com
    name = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    price = models.FloatField()

    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.name
