from django.db import models

# Create your models here.
class Materia(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        text = "{0} ({1})"
        return text.format(self.nombre, self.id)
    
class Estado(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        text = "{0} ({1})"
        return text.format(self.nombre, self.id)
    
class Tarea(models.Model):
    fecha_entrega = models.DateField()
    descripcion = models.CharField(max_length=200)
    id_materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
    id_estado = models.ForeignKey(Estado, on_delete=models.CASCADE)
    
    def __str__(self):
        text = "{0} ({1})"
        return text.format(self.descripcion, self.id)
    
#pivot table
class Materia_Tarea(models.Model):
    id_materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
    id_tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE)
    
    def __str__(self):
        text = "{0} ({1})"
        return text.format(self.id_materia, self.id_tarea)


