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

        public Emprestimo(string livroId, string usuarioId) {
            Id = Guid.NewGuid().ToString();
            LivroId = livroId;
            UsuarioId = usuarioId;
            DataEmprestimo = DateTime.Now;
            DataDevolucao = DataEmprestimo.Value.AddDays(7);
        }


    }

   


