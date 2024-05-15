using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using finanzaAppApi.Dtos;
using finanzaAppApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EntityState = Microsoft.EntityFrameworkCore.EntityState;

namespace finanzaAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class IngresosController : ControllerBase
    {
        private readonly FinanzaContext _context;

        public IngresosController(FinanzaContext context)
        {
            _context = context;
        }

        // GET: api/Ingresos
        [HttpGet]
        public ActionResult<IEnumerable<Ingresos>> GetIngresos()
        {
            return _context.Ingresos.ToList();
        }

        [HttpGet("Usuario")]
        public ActionResult<IEnumerable<Ingresos>> GetIngresosUsuario()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var id = Int32.Parse(identity.FindFirst(ClaimTypes.Name)?.Value);
            return _context.Ingresos.Where(ing => ing.UsuarioId == id).ToList();
        }

        // GET: api/Ingresos/5
        [HttpGet("{id}")]
        public ActionResult<Ingresos> GetIngreso(int id)
        {
            var ingreso = _context.Ingresos.Find(id);

            if (ingreso == null)
            {
                return NotFound();
            }

            return ingreso;
        }

        // PUT: api/Ingresos/5
        [HttpPut("{id}")]
        public IActionResult PutIngreso(int id, IngresosDto ingreso)
        {
            if (id != ingreso.Id)
            {
                return BadRequest();
            }

            var ing = _context.Ingresos.Find(id);

            ing.Cantidad = ingreso.Cantidad;
            ing.Concepto = ingreso.Concepto;
            ing.Fecha = DateOnly.FromDateTime( ingreso.Fecha);
            ing.UsuarioId = ingreso.UsuarioId;

            _context.Entry(ing).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngresoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Ingresos
        [HttpPost]
        public ActionResult<Ingresos> PostIngreso(IngresosDto ingreso)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var id = Int32.Parse(identity.FindFirst(ClaimTypes.Name)?.Value);
            var ing = new Ingresos
            {
                Cantidad = ingreso.Cantidad,
                Concepto = ingreso.Concepto,
                Fecha = DateOnly.FromDateTime(ingreso.Fecha),
                UsuarioId = id,
            };
            _context.Ingresos.Add(ing);
            _context.SaveChanges();
 
            return CreatedAtAction("GetIngreso", new { id = ing.Id }, ing);
        }

        // DELETE: api/Ingresos/5
        [HttpDelete("{id}")]
        public ActionResult<Ingresos> DeleteIngreso(int id)
        {
            var ingreso = _context.Ingresos.Find(id);
            if (ingreso == null)
            {
                return NotFound();
            }

            _context.Ingresos.Remove(ingreso);
            _context.SaveChanges();

            return ingreso;
        }

        private bool IngresoExists(int id)
        {
            return _context.Ingresos.Any(e => e.Id == id);
        }
    }
}
