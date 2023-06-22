var inputSubject = document.getElementById("inputSubject");
var btnAddSubject = document.getElementById("btnSubjects");
var formSubject = document.getElementById("formSubject");
var btnUpdateSubject = document.getElementById("btnUpdate");

btnAddSubject.addEventListener("click", (e) => {
  e.preventDefault(); 
  const subjectName = inputSubject.value
  if(!isValidInput(subjectName)) {
    showErrorMessage("No puedes registrar una asignatura sin nombre")
    return
  }
  formSubject.submit();
});

const isValidInput = subjectName => subjectName.trim() !== ""

const showErrorMessage = (msgError) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msgError,
  })
}


//JS para el modal de actualizar una materia  
var exampleModal = document.getElementById('exampleModal')

exampleModal.addEventListener('show.bs.modal', function (event) {

  var button = event.relatedTarget
  var recipient = button.getAttribute('data-bs-name')
  const id = button.getAttribute('data-bs-id')

  var modalTitle = exampleModal.querySelector('.modal-title')
  var modalBodyInput = exampleModal.querySelectorAll('.modal-body input')

  console.log(modalBodyInput)

  modalTitle.textContent = 'Update ' + recipient + ' Subject'
  modalBodyInput[1].value = recipient
  modalBodyInput[2].value = id


})

//JS para la actualizacion de una materia
btnUpdateSubject.addEventListener("click", (e) => {
  const formUpdate = document.getElementById('formUpdateSubject');
  const inputUpdate = document.getElementById('recipient-name');
  console.log(inputSubject.value)
  const subjectName = inputUpdate.value
  console.log(subjectName)
  if(!isValidInput(subjectName)) {
    showErrorMessage("No puedes actualizar a una asignatura sin nombre")
    return
  }
  formUpdate.submit();
});



