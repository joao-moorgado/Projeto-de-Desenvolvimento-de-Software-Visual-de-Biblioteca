using Microsoft.AspNetCore.Mvc;
using Biblioteca.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapPost("/api/livro/cadastrar", ([FromBody] Livro livro) => {return Results.Created(" ", livro);});

app.MapPost("/api/autor/cadastrar", ([FromBody] Autor autor) => {return Results.Created(" ", autor);});

app.MapPost("/api/genero/cadastrar", ([FromBody] Genero genero) => {return Results.Created(" ", genero);});

app.Run();