import React, { useEffect, useState } from "react";
import { Reserva } from "../../../models/Reserva";
import { Livro } from "../../../models/Livro";
import { Usuario } from "../../../models/Usuario";
import { Emprestimo } from "../../../models/Emprestimo";
import { useNavigate, useParams } from "react-router-dom";

function CadastrarReserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livroId, setLivroId] = useState("");
  const [livros, setLivros] = useState<Livro[]>([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [emprestimoId, setEmprestimoId] = useState("");
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [dataReserva, setDataReserva] = useState("");

  useEffect(() => {
    carregarLivros();
    carregarUsuarios();
    carregarEmprestimos();
  }, []);

  function carregarLivros() {
    fetch("/api/livro/listar")
      .then((resposta) => resposta.json())
      .then((livros: Livro[]) => {
        setLivros(livros);
      })
      .catch((error) => console.error("Erro ao carregar livros:", error));
  }

  function carregarUsuarios() {
    fetch("/api/usuario/listar")
      .then((resposta) => resposta.json())
      .then((usuarios: Usuario[]) => {
        setUsuarios(usuarios);
      })
      .catch((error) => console.error("Erro ao carregar usuários:", error));
  }

  function carregarEmprestimos() {
    fetch("/api/emprestimo/listar")
      .then((resposta) => resposta.json())
      .then((emprestimos: Emprestimo[]) => {
        setEmprestimos(emprestimos);
      })
      .catch((error) => console.error("Erro ao carregar empréstimos:", error));
  }

  function handleCadastrarReserva(e: any) {
    e.preventDefault();

    const reserva: Reserva = {
      livroId: livroId,
      usuarioId: usuarioId,
      emprestimoId: emprestimoId,
      dataReserva: dataReserva,
    };

    fetch("/api/reserva/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserva),
    })
      .then((resposta) => resposta.json())
      .then((reserva: Reserva) => {
        navigate("/pages/reserva/listar");
      })
      .catch((error) => console.error("Erro ao cadastrar reserva:", error));
  }

  return (
    <div className="container mt-4">
      <h1>Cadastrar uma Reserva</h1>
      <form onSubmit={handleCadastrarReserva}>
        <div className="mb-3">
          <label htmlFor="livroId" className="form-label">Livro:</label>
          <select
            id="livroId"
            className="form-select"
            value={livroId}
            onChange={(e: any) => setLivroId(e.target.value)}
          >
            <option value="">Selecione um livro</option>
            {livros.map((livro) => (
              <option key={livro.id} value={livro.id}>
                {livro.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="usuarioId" className="form-label">Usuário:</label>
          <select
            id="usuarioId"
            className="form-select"
            value={usuarioId}
            onChange={(e: any) => setUsuarioId(e.target.value)}
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="emprestimoId" className="form-label">Empréstimo:</label>
          <select
            id="emprestimoId"
            className="form-select"
            value={emprestimoId}
            onChange={(e: any) => setEmprestimoId(e.target.value)}
          >
            <option value="">Selecione um empréstimo</option>
            {emprestimos.map((emprestimo) => (
              <option key={emprestimo.id} value={emprestimo.id}>
                {emprestimo.dataDevolucao}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="dataReserva" className="form-label">Data da Reserva:</label>
          <input
            id="dataReserva"
            type="date"
            className="form-control"
            value={dataReserva}
            onChange={(e: any) => setDataReserva(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarReserva;
