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

app.MapPost("/api/usuario/cadastrar", ([FromBody] Usuario usuario, [FromServices] AppDataContext ctx) =>
 {if (ctx.Usuarios.Any(u => u.Nome == usuario.Nome))
    {
        return Results.BadRequest("Usuario já existe!");
    }

    ctx.Usuarios.Add(usuario);
    ctx.SaveChanges();
    return Results.Created(" ", usuario);
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

    //realizar emprestimo
app.MapPost("/api/emprestimo/realizar", ([FromBody] Emprestimo emprestimo, [FromServices] AppDataContext ctx) => 
{
    Livro? livro = ctx.Livros.Find(emprestimo.LivroId);
    if (livro is null)
    {
        return Results.NotFound("Livro não encontrado");
    }

    Usuario? usuario = ctx.Usuarios.Find(emprestimo.UsuarioId);
    if (usuario is null)
    {
        return Results.NotFound("Usuario não encontrado");
    }

    if (livro.EstaEmprestado)
    {
        return Results.BadRequest("Livro já emprestado");
    }

    livro.EstaEmprestado = true; // Marcar como emprestado

    emprestimo.DataEmprestimo = DateTime.Now;
    ctx.Emprestimos.Add(emprestimo);
    ctx.SaveChanges();

    return Results.Created($"/api/emprestimo/{emprestimo.Id}", emprestimo);
});
// reservar Livro
app.MapPost("/api/reserva/realizar", ([FromBody] Reserva reserva, [FromServices] AppDataContext ctx) => 
{
    Livro? livro = ctx.Livros.Find(reserva.LivroId);
    if (livro is null)
    {
        return Results.NotFound("Livro não encontrado");
    }

    // Verificar se o livro está emprestado
    if (!livro.EstaEmprestado)
    {
        return Results.BadRequest("Livro não está emprestado");
    }

    // Verificar se o livro já está reservado
    if (livro.EstaReservado)
    {
        return Results.BadRequest("Livro já reservado");
    }

    livro.EstaReservado = true; // Marcar como reservado

    reserva.DataReserva = DateTime.Now;
    ctx.Reservas.Add(reserva);
    ctx.SaveChanges();

    return Results.Created($"/api/reserva/{reserva.Id}", reserva);
});

//listar livros
app.MapGet("/api/livro/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Livros.Any())
    {
        return Results.Ok(ctx.Livros
        .Include(x => x.Autor)
        .Include(x => x.Genero));
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

app.MapGet("/api/usuario/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Usuarios.Any())
    {
        return Results.Ok(ctx.Usuarios.ToList());
    }
    return Results.NotFound("Tabela de usuários vazia!");
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

app.MapGet("/api/emprestimo/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Emprestimos.Any())
    {
        return Results.Ok(ctx.Emprestimos
           .Include(e => e.Livro)
           .Include(e => e.Usuario));
    }
    return Results.NotFound("Tabela de empréstimos vazia!");
});

app.MapGet("/api/reserva/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Reservas.Any())
    {
        return Results.Ok(ctx.Reservas
           .Include(r => r.Livro)
           .Include(r => r.Usuario));
    }
    return Results.NotFound("Tabela de reservas vazia!");
});

//alterar livro por id
app.MapPatch("/api/livro/atualizar/{id}", ([FromRoute] string id, [FromBody] Livro livroAtualizado, [FromServices] AppDataContext ctx) =>
{
    Livro? livro = ctx.Livros.Find(id);
    if (livro is null) 
    {
        return Results.
            NotFound("Livro não encontrado!");
    }

    livro.Nome = livroAtualizado.Nome ?? livro.Nome;
    livro.Descricao = livroAtualizado.Descricao ?? livro.Descricao;
    livro.DataPublicacao = livroAtualizado.DataPublicacao ?? livro.DataPublicacao;

    ctx.Livros.Update(livro);
    ctx.SaveChanges();
    return Results.Ok("Livro atualizado com sucesso.");
});

//alterar genero por id
app.MapPatch("/api/genero/atualizar/{id}", ([FromRoute] string id, [FromBody] Genero generoAtualizado, [FromServices] AppDataContext ctx) =>
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
app.MapPatch("/api/autor/atualizar/{id}", ([FromRoute] string id, [FromBody] Autor autorAtualizado, [FromServices] AppDataContext ctx) =>
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

app.MapPatch("/api/usuario/atualizar/{id}", ([FromRoute] string id, [FromBody] Usuario usuarioAtualizado, [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.Find(id);
    if (usuario is null) 
    {
        return Results.NotFound("Usuário não encontrado!");
    }

    usuario.Nome = usuarioAtualizado.Nome ?? usuario.Nome;
    
    ctx.Usuarios.Update(usuario);
    ctx.SaveChanges();
    return Results.Ok("Usuário atualizado com sucesso.");
});

app.MapPatch("/api/emprestimo/atualizar/{id}", ([FromRoute] string id, [FromBody] Emprestimo emprestimoAtualizado, [FromServices] AppDataContext ctx) =>
{
    Emprestimo? emprestimo = ctx.Emprestimos.Find(id);
    if (emprestimo is null) 
    {
        return Results.NotFound("Empréstimo não encontrado!");
    }

    emprestimo.DataEmprestimo = emprestimoAtualizado.DataEmprestimo ?? emprestimo.DataEmprestimo;
    emprestimo.DataDevolucao = emprestimoAtualizado.DataDevolucao ?? emprestimo.DataDevolucao;
    emprestimo.LivroId = emprestimoAtualizado.LivroId ?? emprestimo.LivroId;
    emprestimo.UsuarioId = emprestimoAtualizado.UsuarioId ?? emprestimo.UsuarioId;

    ctx.Emprestimos.Update(emprestimo);
    ctx.SaveChanges();
    return Results.Ok("Empréstimo atualizado com sucesso.");
});

app.MapPatch("/api/reserva/atualizar/{id}", ([FromRoute] string id, [FromBody] Reserva reservaAtualizado, [FromServices] AppDataContext ctx) =>
{
    Reserva? reserva = ctx.Reservas.Find(id);
    if (reserva is null) 
    {
        return Results.NotFound("Reserva não encontrada!");
    }

    reserva.DataReserva = reservaAtualizado.DataReserva ?? reserva.DataReserva;
    reserva.LivroId = reservaAtualizado.LivroId ?? reserva.LivroId;
    reserva.UsuarioId = reservaAtualizado.UsuarioId ?? reserva.UsuarioId;

    ctx.Reservas.Update(reserva);
    ctx.SaveChanges();
    return Results.Ok("Reserva atualizada com sucesso.");
});
//deletar livro por id
app.MapDelete("/api/livro/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
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
app.MapDelete("/api/genero/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
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
app.MapDelete("/api/autor/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
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

app.MapDelete("/api/usuario/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.Find(id);
    if (usuario is null) 
    {
        return Results.NotFound("Usuário não encontrado!");
    }

    ctx.Usuarios.Remove(usuario);
    ctx.SaveChanges();
    return Results.Ok("Usuário removido com sucesso.");
});

app.MapDelete("/api/emprestimo/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    Emprestimo? emprestimo = ctx.Emprestimos.Find(id);
    if (emprestimo is null) 
    {
        return Results.NotFound("Empréstimo não encontrado!");
    }

    ctx.Emprestimos.Remove(emprestimo);
    ctx.SaveChanges();
    return Results.Ok("Empréstimo removido com sucesso.");
});

app.MapDelete("/api/reserva/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    Reserva? reserva = ctx.Reservas.Find(id);
    if (reserva is null) 
    {
        return Results.NotFound("Reserva não encontrada!");
    }

    ctx.Reservas.Remove(reserva);
    ctx.SaveChanges();
    return Results.Ok("Reserva removida com sucesso.");
});

app.Run();