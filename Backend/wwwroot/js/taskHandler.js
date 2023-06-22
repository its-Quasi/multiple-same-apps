const deleteTask = (idTask, idSubject) => {
    Swal.fire({
        title: 'Esta seguro de eliminar la tarea?',
        text: "No podras recuperar la tarea!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: `/deleteTask/${idTask}/${idSubject}`,
                success: function (data, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function (data, textStatus, jqXHR) {
                    Swal.fire(
                        'Error!',
                        'La materia no podido ser eliminada.',
                        'error'
                    )
                }
            })
        }
    })
}

btnAddTask.addEventListener("click", (e) => {
    e.preventDefault();
    const inputTask = document.getElementById('descripcion').value;
    const inputDueDate = document.getElementById('due-date').value;
    const inputMateria = document.getElementById('idNombreMateria');
    const idMateria = inputMateria.getAttribute("data-bs-idMateria");

    if (!isValidInput(inputTask)) {
        showErrorMessage("No puedes registrar una tarea sin nombre")
        return
    }

    if (!isValidInput(inputDueDate)) {
        showErrorMessage("No puedes registrar una tarea sin fecha")
        return
    }

    $.ajax({
        type: "POST",
        url: "/addTask",
        data: {
            "descripcion": inputTask,
            "entrega": inputDueDate,
            "idMateria": idMateria
        },
        success: function (data, textStatus, jqXHR) {
            window.location.reload();
        },
        error: function (data, textStatus, jqXHR) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido insertar la asignatura',
            })
        }
    })
});

const isValidInput = input => input.trim() !== ""

const showErrorMessage = (msgError) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msgError,
    })
}

const changeStatus = (task_id) => {
    const txtTask = document.getElementById('task_'+task_id);
    if (txtTask.classList.contains('task-done')) {
        txtTask.classList.remove('task-done');
    }
    else txtTask.classList.add('task-done');
}