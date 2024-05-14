using System;
namespace finanzaAppApi.Dtos
{
	public class IngresosDto
	{
        public int? Id { get; set; }

        public int? UsuarioId { get; set; }

        public string Concepto { get; set; } = null!;

        public decimal Cantidad { get; set; }

        public DateOnly Fecha { get; set; }
    }
}

