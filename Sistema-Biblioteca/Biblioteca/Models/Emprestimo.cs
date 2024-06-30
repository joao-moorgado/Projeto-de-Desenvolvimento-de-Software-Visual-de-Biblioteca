namespace Biblioteca.Models;

    public class Emprestimo
    {
        public string? Id { get; set; }
        public string? LivroId { get; set; }
        public string? UsuarioId { get; set; }
        public Livro? Livro { get; set; }
        public Usuario? Usuario { get; set; }
        public DateTime? DataEmprestimo { get; set; }
        public DateTime? DataDevolucao { get; set; }
         public Emprestimo() {
        Id = Guid.NewGuid().ToString();
    }



    }

   


