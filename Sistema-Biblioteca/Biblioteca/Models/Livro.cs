namespace Sistema_Biblioteca.Models;

public class Livro {

    public string? Id { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public DateTime? DataPublicacao { get; set; }

    // Relacao com autor

    // Relacao com genero

    public Livro() {
        Id = Guid.NewGuid().ToString();
    }

    public Livro(string nome, DateTime dataPublicacao) {
        Id = Guid.NewGuid().ToString();
        Nome = nome;
        DataPublicacao = dataPublicacao;
    }

}