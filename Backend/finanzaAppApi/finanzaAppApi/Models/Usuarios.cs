using System;
using System.Collections.Generic;

namespace finanzaAppApi.Models;

public partial class Usuarios
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string NombreUsuario { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string Contrasena { get; set; } = null!;

    public virtual ICollection<GastosFijos> GastosFijos { get; set; } = new List<GastosFijos>();

    public virtual ICollection<GastosVariables> GastosVariables { get; set; } = new List<GastosVariables>();

    public virtual ICollection<Ingresos> Ingresos { get; set; } = new List<Ingresos>();
}
