import React, { useEffect, useState } from "react";
import { Emprestimo } from "../../../models/Emprestimo";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarEmprestimo() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);

  useEffect(() => {
    carregarEmprestimos();
  }, []);

  function carregarEmprestimos() {
    fetch("http://localhost:5296/api/emprestimo/listar")
      .then((resposta) => resposta.json())
      .then((emprestimos: Emprestimo[]) => {
        console.table(emprestimos);
        setEmprestimos(emprestimos);
      })
      .catch((error) => console.error("Erro ao carregar empréstimos:", error));
  }

  function deletar(id: string) {
    console.log("Id:", id);
    axios
      .delete(`/api/emprestimo/deletar/${id}`)
      .then((resposta) => {
        console.log(resposta.data);
        setEmprestimos(resposta.data);
      })
      .catch((error) => console.error("Erro ao deletar empréstimo:", error));
  }

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Biblioteca de Empréstimos</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Livro</th>
            <th>Usuário</th>
            <th>Data de Empréstimo</th>
            <th>Data de Devolução</th>
            <th>Alterar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo) => (
            <tr key={emprestimo.id}>
              <td>{emprestimo.livroId}</td>
              <td>{emprestimo.usuarioId}</td>
              <td>{emprestimo.dataEmprestimo}</td>
              <td>{emprestimo.dataDevolucao}</td>
              <td>
                <Link to={`/pages/emprestimo/alterar/${emprestimo.id}`} className="btn btn-primary">
                  Alterar
                </Link>
              </td>
              <td>
                <button onClick={() => deletar(emprestimo.id!)} className="btn btn-danger">
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

export default ListarEmprestimo;
