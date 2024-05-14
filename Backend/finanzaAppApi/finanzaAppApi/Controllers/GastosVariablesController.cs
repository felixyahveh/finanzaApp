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
    public class GastosVariablesController : ControllerBase
    {
        private readonly FinanzaContext _context;

        public GastosVariablesController(FinanzaContext context)
        {
            _context = context;
        }

        // GET: api/Ingresos
        [HttpGet]
        public ActionResult<IEnumerable<GastosVariables>> GetIngresos()
        {
            return _context.GastosVariables.ToList();
        }

        [HttpGet("Usuario/{id}")]
        public ActionResult<IEnumerable<GastosVariables>> GetIngresosUsuario(int id)
        {
            return _context.GastosVariables.Where(ing => ing.UsuarioId == id).ToList();
        }

        // GET: api/Ingresos/5
        [HttpGet("{id}")]
        public ActionResult<GastosVariables> GetIngreso(int id)
        {
            var gastoVariable = _context.GastosVariables.Find(id);

            if (gastoVariable == null)
            {
                return NotFound();
            }

            return gastoVariable;
        }

        // PUT: api/Ingresos/5
        [HttpPut("{id}")]
        public IActionResult PutIngreso(int id, GastosVariablesDto gastosVariable)
        {
            if (id != gastosVariable.Id)
            {
                return BadRequest();
            }

            var gv = _context.GastosVariables.Find(id);

            gv.Cantidad = gastosVariable.Cantidad;
            gv.Concepto = gastosVariable.Concepto;
            gv.Fecha = gastosVariable.Fecha;
            gv.UsuarioId = gastosVariable.UsuarioId;

            _context.Entry(gv).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GastoVariableExists(id))
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
        public ActionResult<GastosVariables> PostIngreso(GastosVariables gatosFijo)
        {
            var gf = new GastosVariables
            {
                Cantidad = gatosFijo.Cantidad,
                Concepto = gatosFijo.Concepto,
                Fecha = gatosFijo.Fecha,
                UsuarioId = gatosFijo.UsuarioId
            };
            _context.GastosVariables.Add(gf);
            _context.SaveChanges();

            return gf;
        }

        // DELETE: api/Ingresos/5
        [HttpDelete("{id}")]
        public ActionResult<GastosVariables> DeleteIngreso(int id)
        {
            var gf = _context.GastosVariables.Find(id);
            if (gf == null)
            {
                return NotFound();
            }

            _context.GastosVariables.Remove(gf);
            _context.SaveChanges();

            return gf;
        }

        private bool GastoVariableExists(int id)
        {
            return _context.GastosVariables.Any(e => e.Id == id);
        }
    }
}

