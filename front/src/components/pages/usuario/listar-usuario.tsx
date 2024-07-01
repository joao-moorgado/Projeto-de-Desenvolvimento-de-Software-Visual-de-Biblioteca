import React, { useEffect, useState } from "react";
import { Usuario } from "../../../models/Usuario";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function carregarUsuarios() {
    fetch("http://localhost:5296/api/usuario/listar")
      .then((resposta) => resposta.json())
      .then((usuarios: Usuario[]) => {
        console.table(usuarios);
        setUsuarios(usuarios);
      })
      .catch((error) => console.error("Erro ao carregar usuários:", error));
  }

  function deletar(id: string) {
    console.log(`Id: ${id}`);
    axios
      .delete(`/api/usuario/deletar/${id}`)
      .then((resposta) => {
        console.log(resposta.data);
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== id)
        );
      })
      .catch((error) => console.error("Erro ao deletar usuário:", error));
  }

  return (
    <div className="container mt-4">
      <h1>Lista de Usuários</h1>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletar(usuario.id!)}
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

export default ListarUsuario;
