
from django.contrib import admin

from my_shop.models import Product
admin.site.register(Product)

from my_shop.models import Order
admin.site.register(Order)
