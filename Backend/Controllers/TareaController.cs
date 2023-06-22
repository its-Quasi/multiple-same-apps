using Backend.Datos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    public class TareaController : Controller
    {
        TareaDatos tareaDatos = new TareaDatos();

        [HttpDelete("/deleteTask/{idTask}/{idSubject}")]
        public IActionResult deleteTask([FromRoute] int idTask, [FromRoute] int idSubject)
        {
            bool resul = tareaDatos.Eliminar(idTask, idSubject);

            if (resul) { return Ok(); }

            return BadRequest();
        }

        [HttpPost("/addTask")]
        public IActionResult addTask([FromForm] TareaModel tareaModel)
        {
            bool resul = tareaDatos.Guardar(tareaModel);

            if (resul) { return Ok(); } 
            
            return BadRequest();
        }
    }
}
