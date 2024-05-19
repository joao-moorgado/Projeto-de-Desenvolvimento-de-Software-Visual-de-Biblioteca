using Microsoft.AspNetCore.Mvc;
using Biblioteca.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapPost("/api/livro/cadastrar", ([FromBody] Livro livro, [FromServices] AppDataContext ctx) => 
{
    // Verifica se o livro existe
    if (ctx.Livros.Any(l => l.Nome == livro.Nome))
    {
        return Results.BadRequest("Livro já existe!");
    }

    // Verifica se o autor e o genero existem
    Autor? autor = ctx.Autores.Find(livro.AutorId);
    if (autor is null)
    {
        return Results.NotFound("Autor não encontrado");
    }

    Genero? genero = ctx.Generos.Find(livro.GeneroId);
    if (genero is null)
    {
        return Results.NotFound("Gênero não encontrado");
    }

    livro.Autor = autor;
    livro.Genero = genero;

    ctx.Livros.Add(livro);
    ctx.SaveChanges();

    return Results.Created(" ", livro);
});
app.MapPost("/api/autor/cadastrar", ([FromBody] Autor autor, [FromServices] AppDataContext ctx) =>
 {if (ctx.Autores.Any(a => a.Nome == autor.Nome))
    {
        return Results.BadRequest("Autor já existe!");
    }

    ctx.Autores.Add(autor);
    ctx.SaveChanges();
    return Results.Created(" ", autor);
});

app.MapPost("/api/genero/cadastrar", ([FromBody] Genero genero,  [FromServices] AppDataContext ctx) => 
{
    // Verificar se o genero existe
    if (ctx.Generos.Any(g => g.Nome == genero.Nome))
    {
        return Results.BadRequest("Gênero já existe!");
    }

    ctx.Generos.Add(genero);
    ctx.SaveChanges();

    return Results.Created(" ", genero);});

//listar livros
app.MapGet("/api/livro/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Livros.Any())
    {
        return Results.Ok(ctx.Livros.Include(x => x.Autor).Include(x => x.Genero));
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
app.MapPatch("/api/livro/atualizar{id}", ([FromRoute] string id, [FromBody] Livro livroAtualizado, [FromServices] AppDataContext ctx) =>
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
app.MapPatch("/api/genero/atualizar{id}", ([FromRoute] string id, [FromBody] Genero generoAtualizado, [FromServices] AppDataContext ctx) =>
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
app.MapPatch("/api/autor/atualizar{id}", ([FromRoute] string id, [FromBody] Autor autorAtualizado, [FromServices] AppDataContext ctx) =>
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
    if (ctx.Livros.Any(l => l.GeneroId == genero.Id))
        {
            return Results.BadRequest("Não é possível excluir um genero que tenha livros associados.");
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
    if (ctx.Livros.Any(l => l.AutorId == autor.Id))
        {
            return Results.BadRequest("Não é possível excluir um autor que tenha livros associados.");
        }

    ctx.Autores.Remove(autor);
    ctx.SaveChanges();
    return Results.Ok("Autor removido com sucesso.");
});

app.Run();