import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Livro } from "../../../models/Livro";

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
      })
      .catch((error) => console.error("Erro ao carregar livros:", error));
  }

  function deletar(id: string) {
    console.log(`Id: ${id}`);
    axios
      .delete(`http://localhost:5296/api/livro/deletar/${id}`)
      .then((resposta) => {
        console.log(resposta.data);
        setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== id));
      })
      .catch((error) => console.error("Erro ao deletar livro:", error));
  }

  return (
    <div className="container mt-4">
      <h1>Biblioteca de Livros</h1>
      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>Título</th>
            <th>Sinopse</th>
            <th>Autor</th>
            <th>Gênero</th>
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
              <td>{livro.nome}</td>
              <td>{livro.descricao}</td>
              <td>{livro.autorId}</td>
              <td>{livro.generoId}</td>
              <td>{livro.dataPublicacao}</td>
              <td>{livro.disponibilidade.toString()}</td>
              <td>
                <Link to={`/pages/reserva/realizar/${livro.id}`} className="btn btn-primary">
                  Reservar
                </Link>
              </td>
              <td>
                <Link to={`/pages/emprestimo/realizar/${livro.id}`} className="btn btn-success">
                  Emprestar
                </Link>
              </td>
              <td>
                <Link to={`/pages/livro/alterar/${livro.id}`} className="btn btn-warning">
                  Alterar
                </Link>
              </td>
              <td>
                <button onClick={() => deletar(livro.id || "")} className="btn btn-danger">
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
