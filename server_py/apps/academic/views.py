from django.shortcuts import render, redirect
from .models import Materia, Tarea, Estado, Materia_Tarea
# Create your views here.

def home(request):
    subjects = Materia.objects.all()
    return render(request, "index.html", {"subjects": subjects})

def registerSubject(request):
    nombre = request.POST["inputSubject"]
    Materia.objects.create(nombre = nombre)
    return redirect('/')

def deleteSubject(request, id):
    Materia.objects.get(id = id).delete()
    return redirect('/')

def updateSubject(request):
    nombre = request.POST["recipient-name"]
    id = request.POST["recipient-id"] 
    Materia.objects.filter(id = id).update(nombre = nombre)
    return redirect('/')


def getTasklist(request, id):
    subject = Materia.objects.get(id = id)

    tasks = Tarea.objects.in_bulk(
                list(Materia_Tarea.objects.all()
                    .filter(id_materia = id)
                    .values_list('id_tarea', flat=True)
                )
            ).items()
    
    return render(request, "tasklist.html", {"tasks": tasks, "subject": subject})

def deleteTask(request, id_tarea, id_materia):
    Materia_Tarea.objects.all().filter(id_tarea = id_tarea, id_materia = id_materia).delete()
    Tarea.objects.get(id = id_tarea).delete()
    return redirect('/getTasklist/'+id_materia)

def registerTask(request):
    fecha_entrega = request.POST["due-date"].format('YYYY-MM-DD')
    descripcion = request.POST["descripcion"]
    id_materia = request.POST["id-subject"]
    id_estado = request.POST["id-status"]
    tarea = Tarea.objects.create(fecha_entrega = fecha_entrega, descripcion = descripcion, id_materia = Materia.objects.get(id = id_materia), id_estado = Estado.objects.get(id = id_estado))
    Materia_Tarea.objects.create(id_materia = Materia.objects.get(id = id_materia), id_tarea = tarea)
    return redirect('/getTasklist/'+id_materia)

def updateStatusTask(request, id):
    print('thats ID ' , id)
    tarea = Tarea.objects.get(id = id)
    print(tarea.descripcion)
    if tarea.id_estado.id == 1:
        tarea.id_estado = Estado.objects.get(id = 2)
    else:
        tarea.id_estado = Estado.objects.get(id = 1)
    tarea.save()
    print(tarea.id_materia.id)
    return redirect('/getTasklist/'+str(tarea.id_materia.id))
