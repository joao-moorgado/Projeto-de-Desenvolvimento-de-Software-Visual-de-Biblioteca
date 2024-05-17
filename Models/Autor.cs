namespace Sistema_Biblioteca.Models;

public class Autor {

    public string? Id { get; set; }
    public string? Nome { get; set; }
   

    public Autor() {
        Id = Guid.NewGuid().ToString();
    }

    public Autor(string nome) {
        Id = Guid.NewGuid().ToString();
        Nome = nome;
    }

}