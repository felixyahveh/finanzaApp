using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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
    public class GastosFijosController : ControllerBase
    {
        private readonly FinanzaContext _context;

        public GastosFijosController(FinanzaContext context)
        {
            _context = context;
        }

        // GET: api/Ingresos
        [HttpGet]
        public ActionResult<IEnumerable<GastosFijos>> GetIngresos()
        {
            return _context.GastosFijos.ToList();
        }

        [HttpGet("Usuario/{id}")]
        public ActionResult<IEnumerable<GastosFijos>> GetIngresosUsuario(int id)
        {
            return _context.GastosFijos.Where(ing => ing.UsuarioId == id).ToList();
        }

        // GET: api/Ingresos/5
        [HttpGet("{id}")]
        public ActionResult<GastosFijos> GetIngreso(int id)
        {
            var gastoFijo = _context.GastosFijos.Find(id);

            if (gastoFijo == null)
            {
                return NotFound();
            }

            return gastoFijo;
        }

        // PUT: api/Ingresos/5
        [HttpPut("{id}")]
        public IActionResult PutIngreso(int id, GatosFijosDto gatosFijo)
        {
            if (id != gatosFijo.Id)
            {
                return BadRequest();
            }

            var gf = _context.GastosFijos.Find(id);

            gf.Cantidad = gatosFijo.Cantidad;
            gf.Concepto = gatosFijo.Concepto;
            gf.Fecha = gatosFijo.Fecha;
            gf.UsuarioId = gatosFijo.UsuarioId;

            _context.Entry(gf).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GastoFijoExists(id))
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
        public ActionResult<GastosFijos> PostIngreso(GatosFijosDto gatosFijo)
        {
            var gf = new GastosFijos
            {
                Cantidad = gatosFijo.Cantidad,
                Concepto = gatosFijo.Concepto,
                Fecha = gatosFijo.Fecha,
                UsuarioId = gatosFijo.UsuarioId
            };
            _context.GastosFijos.Add(gf);
            _context.SaveChanges();

            return gf;
        }

        // DELETE: api/Ingresos/5
        [HttpDelete("{id}")]
        public ActionResult<GastosFijos> DeleteIngreso(int id)
        {
            var gf = _context.GastosFijos.Find(id);
            if (gf == null)
            {
                return NotFound();
            }

            _context.GastosFijos.Remove(gf);
            _context.SaveChanges();

            return gf;
        }

        private bool GastoFijoExists(int id)
        {
            return _context.GastosFijos.Any(e => e.Id == id);
        }
    }
}

