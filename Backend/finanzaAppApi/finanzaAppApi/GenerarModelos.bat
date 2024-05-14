dotnet ef dbcontext scaffold "Server=localhost;Database=finanzas_app;User=root;Password=12345678;" Pomelo.EntityFrameworkCore.MySql --no-build -o "Models" -f --context FinanzaContext --no-pluralize --no-onconfiguring
pause
