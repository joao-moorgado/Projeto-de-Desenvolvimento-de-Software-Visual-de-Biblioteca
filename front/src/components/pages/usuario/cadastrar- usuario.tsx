import React, { useState } from "react";
import { Usuario } from "../../../models/Usuario";
import { useNavigate } from "react-router-dom";

function CadastrarUsuario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");

  function cadastrarUsuario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const usuario: Usuario = {
      nome: nome,
    };

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
      })
      .catch((error) => console.error("Erro ao cadastrar usuário:", error));
  }

  return (
    <div className="container mt-4">
      <h1>Cadastrar um Usuário</h1>
      <form onSubmit={cadastrarUsuario}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome:
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastrarUsuario;
