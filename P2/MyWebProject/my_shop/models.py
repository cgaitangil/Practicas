
from django.db import models

class Product(models.Model):
    """My products model"""
    name = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    price = models.FloatField()
    # Identifying product by name
    def __str__(self):
        return self.name

class Order(models.Model):
    """Orders model"""
    buyer = models.CharField(max_length=50)
    product = models.CharField(max_length=50)
    # Identifying product by name
    def __str__(self):
        return self.buyer
