//Cuando se carga la página, se cargan las materias
window.addEventListener('load', function () {
    var divPadre = document.getElementById("listaMaterias");
    $.ajax({
        type: "GET",
        url: "/listarMaterias",
        success: function (data, textStatus, jqXHR) {
            
            var materias = '';
            for (materia of data) {
                materias += `
                <div class="ag-courses_item">
                    <div class="ag-courses-item_link">
                    <a href="#" class="link">
                        <div class="ag-courses-item_bg"></div>
                        <div class="ag-courses-item_title">${materia.nombre}</div>
                    </a>
                        <div class="ag-courses-item_date-box">
                            <span class="ag-courses-item_date">
                                <a class="link" href="${materia.idMateria}" data-bs-name="${materia.nombre}" data-bs-id="${materia.idMateria}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit"></i></a>
                                <a class="link" onclick="eliminarMateria(${materia.idMateria})"><i class="fas fa-trash-alt"></i></a>
                            </span>
                        </div>
                    </div>
                </div>`;
                divPadre.innerHTML = materias;
            }
        }
    })
});

const isValidInput = subjectName => subjectName.trim() !== ""

const addSubject = () => {
    const subject = document.getElementById("inputSubject").value;
    if (subject === "") {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una Asignatura',
    })
    return;
    }

    $.ajax({
        type: "POST",
        url: "/agregarMateria",
        data: {
            "nombre": subject
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
}

const eliminarMateria = (id) => {
    Swal.fire({
        title: 'Esta seguro de eliminar la materia?',
        text: "No podras recuperar la materia!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: `/eliminarMateria/${id}`,
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

const showErrorMessage = (msgError) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msgError,
    })
}

exampleModal.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    var button = event.relatedTarget
    // Extract info from data-bs-* attributes
    var recipient = button.getAttribute('data-bs-name')
    const id = button.getAttribute('data-bs-id')
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    var modalTitle = exampleModal.querySelector('.modal-title')
    var modalBodyInput = exampleModal.querySelectorAll('.modal-body input')
    console.log(modalBodyInput)
    modalTitle.textContent = 'Update ' + recipient + ' Subject'
    modalBodyInput[0].value = recipient
    modalBodyInput[1].value = id

})

//JS para la actualizacion de una materia
btnUpdate.addEventListener("click", (e) => {
    const inputUpdate = document.getElementById('nombreMateria');
    const subjectName = inputUpdate.value;
    const idUpdate = document.getElementById('idMateria').value;
    if (!isValidInput(subjectName)) {
        showErrorMessage("No puedes actualizar a una asignatura sin nombre");
        return;
    }
    $.ajax({
        type: "PUT",
        url: "/editarMateria",
        data: {
            "idMateria": idUpdate,
            "nombre": subjectName
        },
        success: function (data, textStatus, jqXHR) {
            window.location.reload();
        },
        error: function (data, textStatus, jqXHR) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido actualizar la asignatura',
            })
        }
    })
});
