import { useEffect, useState } from "react";
import { Usuario } from "../../../models/Usuario";
import { useNavigate } from "react-router-dom";

function CadastrarUsuario() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
  
    function cadastrarUsuario(e: any) {
      const usuario: Usuario = {
        nome: nome,
      };
  
      //FETCH ou AXIOS
      fetch("/api/usuario/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      })
        .then((resposta) => resposta.json())
        .then((usuario: Usuario) => {
          navigate("/pages/usuario/listar");
        });
      e.preventDefault();
    }
    return (
      <div>
        <h1>Cadastrar um Usuario</h1>
        <form onSubmit={cadastrarUsuario}>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome"
            onChange={(e: any) => setNome(e.target.value)}
          />
          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
  
  export default CadastrarUsuario;