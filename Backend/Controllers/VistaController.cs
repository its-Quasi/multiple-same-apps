using Backend.Datos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    public class VistaController : Controller
    {
        TareaDatos tareaDatos = new TareaDatos();

        [HttpGet("/listarTareas/{id}")]
        public IActionResult Index([FromRoute] int id)
        {
            List<TareaModel> lista = tareaDatos.listarPorId(id);
            return View("tasklist", lista);
        }
    }
}
