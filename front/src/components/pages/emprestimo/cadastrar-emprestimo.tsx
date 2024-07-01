import { useEffect, useState } from "react";
import { Emprestimo } from "../../../models/Emprestimo";
import { Livro } from "../../../models/Livro";
import { Usuario } from "../../../models/Usuario";
import { useNavigate } from "react-router-dom";

function CadastrarEmprestimo() {
  const navigate = useNavigate();
  const [livroId, setLivroId] = useState("");
  const [livros, setLivros] = useState<Livro[]>([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");

  useEffect(() => {
    carregarLivros();
    carregarUsuarios();
  }, []);

  function carregarLivros() {
    fetch("/api/livro/listar")
      .then((resposta) => resposta.json())
      .then((livros: Livro[]) => {
        console.log("Livros carregados:", livros); // Adicione este log
        setLivros(livros);
      })
      .catch((error) => console.error("Erro ao carregar livros:", error)); // Adicione este log de erro
  }

  function carregarUsuarios() {
    fetch("/api/usuario/listar")
      .then((resposta) => resposta.json())
      .then((usuarios: Usuario[]) => {
        console.log("Usuarios carregados:", usuarios); // Adicione este log
        setUsuarios(usuarios);
      })
      .catch((error) => console.error("Erro ao carregar usuarios:", error)); // Adicione este log de erro
  }

  function handleCadastrarEmprestimo(e: any) {
    e.preventDefault();

    const emprestimo: Emprestimo = {
      livroId: livroId,
      usuarioId: usuarioId,
      dataEmprestimo: dataEmprestimo,
      dataDevolucao: dataDevolucao,
    };

    console.log("Dados do empréstimo:", emprestimo); // Adicione este log

    fetch("/api/emprestimo/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emprestimo),
    })
      .then((resposta) => resposta.json())
      .then((emprestimo: Emprestimo) => {
        console.log("Empréstimo cadastrado:", emprestimo); // Adicione este log
        navigate("/pages/emprestimo/listar");
      })
      .catch((error) => console.error("Erro ao cadastrar empréstimo:", error)); // Adicione este log de erro
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Cadastrar um Empréstimo</h1>
      <form onSubmit={handleCadastrarEmprestimo}>
        <div className="mb-3">
          <label htmlFor="livroId" className="form-label">Livro:</label>
          <select
            className="form-select"
            value={livroId}
            onChange={(e: any) => setLivroId(e.target.value)}
          >
            <option value="">Selecione um livro</option>
            {livros.map((livro) => (
              <option value={livro.id} key={livro.id}>
                {livro.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="usuarioId" className="form-label">Usuário:</label>
          <select
            className="form-select"
            value={usuarioId}
            onChange={(e: any) => setUsuarioId(e.target.value)}
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option value={usuario.id} key={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="dataEmprestimo" className="form-label">Data do Empréstimo:</label>
          <input
            type="date"
            className="form-control"
            value={dataEmprestimo}
            onChange={(e: any) => setDataEmprestimo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dataDevolucao" className="form-label">Data da Devolução:</label>
          <input
            type="date"
            className="form-control"
            value={dataDevolucao}
            onChange={(e: any) => setDataDevolucao(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarEmprestimo;
