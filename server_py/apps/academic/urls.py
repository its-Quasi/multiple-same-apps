from django.urls import path
from . import views
urlpatterns = [
    path('', views.home),
    path('registerSubject/', views.registerSubject),
    path('updateSubject/', views.updateSubject),
    path('deleteSubject/<id>', views.deleteSubject),
    path('getTasklist/<id>', views.getTasklist),
    path('getTasklist/deleteTask/<id_tarea>/<id_materia>', views.deleteTask),
    path('registerTask/', views.registerTask),
    path('updateStatusTask/<id>', views.updateStatusTask),
    
]