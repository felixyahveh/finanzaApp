using System;
using System.Collections.Generic;

namespace finanzaAppApi.Models;

public partial class Ingresos
{
    public int Id { get; set; }

    public int? UsuarioId { get; set; }

    public string Concepto { get; set; } = null!;

    public decimal Cantidad { get; set; }

    public DateOnly Fecha { get; set; }

    public virtual Usuarios? Usuario { get; set; }
}
