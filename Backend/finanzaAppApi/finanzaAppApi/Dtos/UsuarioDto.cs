﻿using System;
namespace finanzaAppApi.Dtos
{
	public class UsuarioDto
	{
		public int? Id { get; set; }
		public string Nombre { get; set; }
		public string Apellido { get; set; }
        public string NombreUsuario { get; set; }
        public string Correo { get; set; }
        public string Contrasena { get; set; }
    }
}

