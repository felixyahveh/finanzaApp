using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Text;
using finanzaAppApi.Dtos;
using finanzaAppApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using EntityState = Microsoft.EntityFrameworkCore.EntityState;
using Microsoft.AspNetCore.Authorization;

namespace finanzaAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly FinanzaContext _context;

        public UsuariosController(FinanzaContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<Usuarios>> GetUsuarios()
        {
            return _context.Usuarios.ToList();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<Usuarios> GetUsuario(int id)
        {
            var usuario = _context.Usuarios.Find(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuarios/5
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult PutUsuario(int id, UsuarioDto usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest();
            }

            var us = _context.Usuarios.Find(id);
            us.Apellido = usuario.Apellido;
            us.Contrasena = usuario.Contrasena;
            us.Correo = usuario.Correo;
            us.Nombre = usuario.Nombre;
            us.NombreUsuario = usuario.NombreUsuario;

            _context.Entry(us).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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

        // POST: api/Usuarios
        [HttpPost]
        public ActionResult<Usuarios> PostUsuario(UsuarioDto usuario)
        {
            var us = new Usuarios
            {
                NombreUsuario = usuario.NombreUsuario,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Contrasena = usuario.Contrasena,
                Correo = usuario.Correo,
            };
            _context.Usuarios.Add(us);
            _context.SaveChanges();

            return CreatedAtAction("GetUsuario", new { id = us.Id }, us);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult<Usuarios> DeleteUsuario(int id)
        {
            var usuario = _context.Usuarios.Find(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            _context.SaveChanges();

            return usuario;
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto login)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => (u.NombreUsuario == login.NombreUsuario || u.Correo == login.NombreUsuario) && u.Contrasena == login.Contrasena);

            if (usuario == null)
                return Unauthorized(); // Usuario no encontrado o contraseña incorrecta

            // Crear claims del usuario
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Correo)
                // Puedes agregar más claims según tus necesidades
            };

            // Generar llave secreta
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super secret key for the app finaza app")); // Reemplaza "tu_clave_secreta" con una clave segura en producción

            // Crear credenciales de seguridad usando la llave secreta
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Crear token con los claims y la firma
            var token = new JwtSecurityToken(
                //issuer: "tu_issuer", // Reemplaza "tu_issuer" con tu propio emisor
                //audience: "tu_audience", // Reemplaza "tu_audience" con tu propia audiencia
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1), // Tiempo de expiración del token
                signingCredentials: creds
            );

            var tokenFin = new JwtSecurityTokenHandler().WriteToken(token);
            //var token = await _usuarioService.AuthenticateAsync(login.IdUsuario, login.Contrasena);

            if (tokenFin == null)
                return Unauthorized(); // Usuario no autorizado

            return Ok(new { Token = tokenFin });
        }
    }
}


