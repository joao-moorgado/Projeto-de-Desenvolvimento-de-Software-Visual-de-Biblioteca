using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Biblioteca.Migrations
{
    /// <inheritdoc />
    public partial class Emprestimo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Emprestimos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LivroId = table.Column<int>(type: "INTEGER", nullable: true),
                    UsuarioId = table.Column<int>(type: "INTEGER", nullable: true),
                    LivroId1 = table.Column<string>(type: "TEXT", nullable: true),
                    UsuarioId1 = table.Column<string>(type: "TEXT", nullable: true),
                    DataEmprestimo = table.Column<DateTime>(type: "TEXT", nullable: true),
                    DataDevolucao = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emprestimos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Emprestimos_Livros_LivroId1",
                        column: x => x.LivroId1,
                        principalTable: "Livros",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Emprestimos_Usuarios_UsuarioId1",
                        column: x => x.UsuarioId1,
                        principalTable: "Usuarios",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Reservas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LivroId = table.Column<int>(type: "INTEGER", nullable: true),
                    UsuarioId = table.Column<int>(type: "INTEGER", nullable: true),
                    EmprestimoId = table.Column<int>(type: "INTEGER", nullable: true),
                    LivroId1 = table.Column<string>(type: "TEXT", nullable: true),
                    UsuarioId1 = table.Column<string>(type: "TEXT", nullable: true),
                    DataReserva = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservas_Emprestimos_EmprestimoId",
                        column: x => x.EmprestimoId,
                        principalTable: "Emprestimos",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reservas_Livros_LivroId1",
                        column: x => x.LivroId1,
                        principalTable: "Livros",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reservas_Usuarios_UsuarioId1",
                        column: x => x.UsuarioId1,
                        principalTable: "Usuarios",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Emprestimos_LivroId1",
                table: "Emprestimos",
                column: "LivroId1");

            migrationBuilder.CreateIndex(
                name: "IX_Emprestimos_UsuarioId1",
                table: "Emprestimos",
                column: "UsuarioId1");

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_EmprestimoId",
                table: "Reservas",
                column: "EmprestimoId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_LivroId1",
                table: "Reservas",
                column: "LivroId1");

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_UsuarioId1",
                table: "Reservas",
                column: "UsuarioId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservas");

            migrationBuilder.DropTable(
                name: "Emprestimos");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
