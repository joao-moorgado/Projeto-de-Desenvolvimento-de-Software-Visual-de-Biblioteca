using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Biblioteca.Migrations
{
    /// <inheritdoc />
    public partial class AddLivroRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Livros_Autores_AutorId1",
                table: "Livros");

            migrationBuilder.DropForeignKey(
                name: "FK_Livros_Generos_GeneroId1",
                table: "Livros");

            migrationBuilder.DropIndex(
                name: "IX_Livros_AutorId1",
                table: "Livros");

            migrationBuilder.DropIndex(
                name: "IX_Livros_GeneroId1",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "AutorId1",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "GeneroId1",
                table: "Livros");

            migrationBuilder.AlterColumn<string>(
                name: "GeneroId",
                table: "Livros",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "AutorId",
                table: "Livros",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_Livros_AutorId",
                table: "Livros",
                column: "AutorId");

            migrationBuilder.CreateIndex(
                name: "IX_Livros_GeneroId",
                table: "Livros",
                column: "GeneroId");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_Autores_AutorId",
                table: "Livros",
                column: "AutorId",
                principalTable: "Autores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_Generos_GeneroId",
                table: "Livros",
                column: "GeneroId",
                principalTable: "Generos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Livros_Autores_AutorId",
                table: "Livros");

            migrationBuilder.DropForeignKey(
                name: "FK_Livros_Generos_GeneroId",
                table: "Livros");

            migrationBuilder.DropIndex(
                name: "IX_Livros_AutorId",
                table: "Livros");

            migrationBuilder.DropIndex(
                name: "IX_Livros_GeneroId",
                table: "Livros");

            migrationBuilder.AlterColumn<int>(
                name: "GeneroId",
                table: "Livros",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "AutorId",
                table: "Livros",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "AutorId1",
                table: "Livros",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GeneroId1",
                table: "Livros",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Livros_AutorId1",
                table: "Livros",
                column: "AutorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Livros_GeneroId1",
                table: "Livros",
                column: "GeneroId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_Autores_AutorId1",
                table: "Livros",
                column: "AutorId1",
                principalTable: "Autores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_Generos_GeneroId1",
                table: "Livros",
                column: "GeneroId1",
                principalTable: "Generos",
                principalColumn: "Id");
        }
    }
}
