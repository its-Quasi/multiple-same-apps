var statusChange = document.getElementById('formStatus');
var btnAddTask = document.getElementById('btnAddTask');
var formRegisterTask = document.getElementById('formRegisterTask');


btnAddTask.addEventListener("click", (e) => {
    e.preventDefault();
    const inputTask = document.getElementById('descripcion').value;
    const inputDueDate = document.getElementById('due-date').value;

    if (!isValidInput(inputTask)) {
        console.log('cole no hay nombre')
        showErrorMessage("No puedes registrar una tarea sin nombre")
        return
    }

    if (!isValidInput(inputDueDate)) {
        showErrorMessage("No puedes registrar una tarea sin fecha")
        return
    }

    formRegisterTask.submit();
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
    const txtTask = document.getElementById('task' + task_id);
    if (txtTask.classList.contains('task-done')) {
        txtTask.classList.remove('task-done');
    }
    else txtTask.classList.add('task-done');
    statusChange.action += task_id;
    statusChange.submit();
}
