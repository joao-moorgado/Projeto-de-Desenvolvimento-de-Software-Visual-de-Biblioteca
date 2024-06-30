namespace Biblioteca.Models;

public class Usuario {

    public string? Id { get; set; }
    public string? Nome { get; set; }
    

    public Usuario() {
        Id = Guid.NewGuid().ToString();
    }

    public Usuario(string nome) {
        Id = Guid.NewGuid().ToString();
        Nome = nome;
    }

}