namespace Biblioteca.Models;

public class Livro {

    public string? Id { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public DateTime? DataPublicacao { get; set; }
    public int AutorId { get; set; }   
    // Relacao com autor
    public Autor? Autor{ get; set; }
    // Relacao com genero
    public int GeneroId { get; set; }
    public Genero? Genero { get; set;}
    public Livro() {
        Id = Guid.NewGuid().ToString();
    }

    public Livro(string nome, DateTime dataPublicacao) {
        Id = Guid.NewGuid().ToString();
        Nome = nome;
        DataPublicacao = dataPublicacao;
    }

}