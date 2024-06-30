namespace Biblioteca.Models;

    public class Reserva
    {
        public string? Id { get; set; }
        public string? LivroId { get; set; }
        public string? UsuarioId { get; set; }
        public string? EmprestimoId { get; set; }

        public Livro? Livro { get; set; }
        public Usuario? Usuario { get; set; }
        public Emprestimo? Emprestimo { get; set; }
        public DateTime? DataReserva{ get; set; }
        
         public Reserva() {
        Id = Guid.NewGuid().ToString();
        }

        public Reserva(string livroId, string usuarioId, DateTime dataReserva) {
            LivroId = livroId;
            UsuarioId = usuarioId;
            DataReserva = dataReserva;
        }

    }
