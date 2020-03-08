from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),

    path('test1/', views.test1, name='test1'),
    path('test2/', views.test2, name='test2'),
    path('test3/', views.test3, name='test3'),
    path('test4/', views.test4, name='test4'),
    path('test5/', views.test5, name='test5'),
    path('list1/', views.list1, name='list1'),
    path('list2/', views.list2, name='list2'),
    path('list3/', views.list3, name='list3'),
    path('list4/', views.list4, name='list4'),
    path('formulario/', views.formulario, name='formulario'),
    path('recepcion/', views.recepcion, name='recepcion'),



]
