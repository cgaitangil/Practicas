
from django.urls import path

# Import views from 'my_shop'
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('prod1/', views.prod1, name='prod1'),
    path('prod2/', views.prod2, name='prod2'),
    path('prod3/', views.prod3, name='prod3'),
    path('prod4/', views.prod4, name='prod4'),
    path('formulario/', views.formulario, name='formulario'),
    path('recepcion/', views.recepcion, name='recepcion'),
]
