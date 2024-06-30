import { useEffect, useState } from "react";
import { Livro } from "../../../models/Livro";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarLivro() {
    const [livros, setLivros] = useState<Livro[]>([]);
    
    useEffect(() => {
        carregarLivros();
      }, []);
    
      function carregarLivros() {
        fetch("http://localhost:5296/api/livro/listar")
          .then((resposta) => resposta.json())
          .then((livros: Livro[]) => {
            console.table(livros);
            setLivros(livros);
          });
      }

      function deletar(id: string) {
        console.log("Id: ${id}");
        axios
          .delete("/api/livro/deletar/${id}")
          .then((resposta) => {
            console.log(resposta.data);
            setLivros(resposta.data);
          });
      }
    
      return (
        <div>
          <h1>Biblioteca de Livros: </h1>
          <table border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Sinopse</th>
                <th>Autor</th>
                <th>Genero</th>
                <th>Data de Publicação</th>
                <th>Disponibilidade</th>
                <th>Reservar</th>
                <th>Emprestar</th>
                <th>Alterar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <tr key={livro.id}>
                  <td>{livro.id}</td>
                  <td>{livro.nome}</td>
                  <td>{livro.descricao}</td>
                  <td>{livro.autorId}</td>
                  <td>{livro.generoId}</td>
                  <td>{livro.dataPublicacao}</td>
                  <td>{
                    //mostrar se disponível
                    }</td>
                  <td>
                  <Link to={"/pages/reserva/cadastrar/${livro.id}"}>
                      Reservar
                    </Link>
                  </td>
                  <td>
                  <Link to={"/pages/emprestimo/cadastrar/${livro.id}"}>
                      Emprestar
                    </Link>
                  </td>
                  <td>
                    <Link to={"/pages/livro/alterar/${livro.id}"}>
                      Alterar
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deletar(livro.id!);
                      }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
    export default ListarLivro;