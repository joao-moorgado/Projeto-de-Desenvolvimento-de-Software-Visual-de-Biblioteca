import { useEffect, useState } from "react";
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
          });
      }

      function deletar(id: string) {
        console.log("Id: ${id}");
        axios
          .delete("/api/emprestimo/deletar/${id}")
          .then((resposta) => {
            console.log(resposta.data);
            setEmprestimos(resposta.data);
          });
      }
    
      return (
        <div>
          <h1>Biblioteca de Emprestimos: </h1>
          <table border={1}>
            <thead>
              <tr>
                <th>Livro</th>
                <th>Usuario</th>
                <th>Data Emprestimo</th>
                <th>Data Devoulação</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo) => (
                <tr key={emprestimo.id}>
                  <td>{emprestimo.livroId}</td>
                  <td>{emprestimo.usuarioId}</td>
                  <td>{emprestimo.dataEmprestimo}</td>
                  <td>{emprestimo.dataDevolucao}</td>
                  <td>{
                    //mostrar se disponível
                    }</td>
                  <td>
                  <Link to={"/pages/reserva/cadastrar/${emprestimo.id}"}>
                      Reservar
                    </Link>
                  </td>
                  <td>
                  <Link to={"/pages/emprestimo/cadastrar/${emprestimo.id}"}>
                      Emprestar
                    </Link>
                  </td>
                  <td>
                    <Link to={"/pages/emprestimo/alterar/${emprestimo.id}"}>
                      Alterar
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deletar(emprestimo.id!);
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
    
    export default ListarEmprestimo;