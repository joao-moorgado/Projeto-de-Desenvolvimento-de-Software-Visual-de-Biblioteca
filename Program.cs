using Microsoft.AspNetCore.Mvc;
using Sistema_Biblioteca.Models;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/api/livro/cadastrar", async ([FromBody] Livro livro) => {return Results.Created(" ", livro);});


app.Run();
