using Microsoft.AspNetCore.Mvc;
using Biblioteca.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapPost("/api/livro/cadastrar", ([FromBody] Livro livro) => {return Results.Created(" ", livro);});

app.MapPost("/api/autor/cadastrar", ([FromBody] Autor autor) => {return Results.Created(" ", autor);});

app.MapPost("/api/genero/cadastrar", ([FromBody] Genero genero) => {return Results.Created(" ", genero);});

//listar livros
app.MapGet("/api/livro/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Livros.Any())
    {
        return Results.Ok(ctx.Livros.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//listar generos
app.MapGet("/api/genero/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Generos.Any())
    {
        return Results.Ok(ctx.Generos.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//listar autores
app.MapGet("/api/autor/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Autores.Any())
    {
        return Results.Ok(ctx.Autores.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//alterar livro por id
app.MapPut("/api/livro/atualizar{id}", ([FromRoute] string id, [FromBody] Livro livroAtualizado, [FromServices] AppDataContext ctx) =>
{
    Livro? livro = ctx.Livros.Find(id);
    if (livro is null) 
    {
        return Results.
            NotFound("Livro não encontrado!");
    }

    livro.Nome = livroAtualizado.Nome;
    livro.Descricao = livroAtualizado.Descricao;
    livro.DataPublicacao = livroAtualizado.DataPublicacao;

    ctx.Livros.Update(livro);
    ctx.SaveChanges();
    return Results.Ok("Livro atualizado com sucesso.");
});

//alterar genero por id
app.MapPut("/api/genero/atualizar{id}", ([FromRoute] string id, [FromBody] Genero generoAtualizado, [FromServices] AppDataContext ctx) =>
{
    Genero? genero = ctx.Generos.Find(id);
    if (genero is null) 
    {
        return Results.
            NotFound("Gênero não encontrado!");
    }

    genero.Nome = generoAtualizado.Nome;

    ctx.Generos.Update(genero);
    ctx.SaveChanges();
    return Results.Ok("Gênero atualizado com sucesso.");
});

//alterar autor por id
app.MapPut("/api/autor/atualizar{id}", ([FromRoute] string id, [FromBody] Autor autorAtualizado, [FromServices] AppDataContext ctx) =>
{
    Autor? autor = ctx.Autores.Find(id);
    if (autor is null) 
    {
        return Results.
            NotFound("Autor não encontrado!");
    }

    autor.Nome = autorAtualizado.Nome;

    ctx.Autores.Update(autor);
    ctx.SaveChanges();
    return Results.Ok("Autor atualizado com sucesso.");
});

//deletar livro por id
app.MapDelete("/api/livro/deletar{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    Livro? livro = ctx.Livros.Find(id);
    if (livro is null) 
    {
        return Results.
            NotFound("Livro não encontrado!");
    }

    ctx.Livros.Remove(livro);
    ctx.SaveChanges();
    return Results.Ok("Livro removido com sucesso.");
});

//deletar genero por id
app.MapDelete("/api/genero/deletar{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    Genero? genero = ctx.Generos.Find(id);
    if (genero is null) 
    {
        return Results.
            NotFound("Gênero não encontrado!");
    }

    ctx.Generos.Remove(genero);
    ctx.SaveChanges();
    return Results.Ok("Gênero removido com sucesso.");
});

//deletar autor por id
app.MapDelete("/api/autor/deletar{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    Autor? autor = ctx.Autores.Find(id);
    if (autor is null) 
    {
        return Results.
            NotFound("Autor não encontrado!");
    }

    ctx.Autores.Remove(autor);
    ctx.SaveChanges();
    return Results.Ok("Autor removido com sucesso.");
});

app.Run();