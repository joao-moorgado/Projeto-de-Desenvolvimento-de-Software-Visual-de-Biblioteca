using Microsoft.AspNetCore.Mvc;
using Sistema_Biblioteca.Models;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/api/livro/cadastrar", async ([FromBody] Livro livro) => {return Results.Created(" ", livro);});

app.MapPost("/api/autor/cadastrar", async ([FromBody] Autor autor) => {return Results.Created(" ", autor);});

app.MapPost("/api/genero/cadastrar", async ([FromBody] Genero genero) => {return Results.Created(" ", genero);});

app.Run();