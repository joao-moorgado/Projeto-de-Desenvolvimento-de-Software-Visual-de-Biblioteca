using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Models;

public class AppDataContext : DbContext {

    public DbSet<Autor> Autores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Biblioteca.db");
    }

}