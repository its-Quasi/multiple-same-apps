using Backend.Datos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.Controllers
{
    [ApiController]
    public class MateriaController : Controller
    {
        MateriaDatos materiaDatos = new MateriaDatos();

        [HttpPost("/agregarMateria")]
        public IActionResult save([FromForm] MateriaModel materiaModel)
        {
            var respuesta = materiaDatos.Guardar(materiaModel);

            if (respuesta)
                return Ok();

            return BadRequest();
        }

        [HttpGet("/listarMaterias")]
        public IActionResult getMaterias()
        {
            return Ok(materiaDatos.listar());
        }

        [HttpDelete("/eliminarMateria/{id}")]
        public IActionResult deleteMaterias([FromRoute] int id){
            var respuesta = materiaDatos.Eliminar(id);
            if(respuesta)
                return Ok();
            return BadRequest();
        }

        [HttpGet("/listarMateria/{id}")]
        public IActionResult listarPorId([FromRoute] int id) {
            return Ok(materiaDatos.listarPorId(id));
        }

        [HttpPut("/editarMateria")]
        public IActionResult updateMateria([FromForm] MateriaModel materiaModel){
            var respuesta = materiaDatos.Editar(materiaModel);
            if (respuesta){
                return Ok();
            }
            return BadRequest();
        }
    }
}
