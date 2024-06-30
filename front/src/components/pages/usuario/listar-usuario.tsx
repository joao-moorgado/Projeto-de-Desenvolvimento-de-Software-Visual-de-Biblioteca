import { useEffect, useState } from "react";
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
          });
      }

      function deletar(id: string) {
        console.log("Id: ${id}");
        axios
          .delete("/api/usuario/deletar/${id}")
          .then((resposta) => {
            console.log(resposta.data);
            setUsuarios(resposta.data);
          });
      }
    
      return (
        <div>
          <h1> Usuarios </h1>
          <table border={1}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nome}</td>
                  <td>
                    <button
                      onClick={() => {
                        deletar(usuario.id!);
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
    
    export default ListarUsuario;