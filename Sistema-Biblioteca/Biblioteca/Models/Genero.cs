namespace Biblioteca.Models;

public class Genero {

    public string? Id { get; set; }
    public string? Nome { get; set; }

    public Genero() {
        Id = Guid.NewGuid().ToString();
    }

    public Genero(string nome) {
        Id = Guid.NewGuid().ToString();
        Nome = nome;
    }

}