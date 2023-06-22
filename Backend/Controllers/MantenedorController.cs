using Microsoft.AspNetCore.Mvc;
using Backend.Datos;
using Backend.Models;

namespace Backend.Controllers
{
    public class MantenedorController : Controller
    {

        TareaDatos tareaDatos = new TareaDatos();

        public IActionResult Listar()
        {
            var lista = tareaDatos.listar();
            return View(lista);
        }

        public IActionResult Guardar()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Guardar(TareaModel tareaModel)
        {
            var respuesta = tareaDatos.Guardar(tareaModel);

            if (respuesta)
                return RedirectToAction("Listar");
            else
                return View();
        }
    }
}
