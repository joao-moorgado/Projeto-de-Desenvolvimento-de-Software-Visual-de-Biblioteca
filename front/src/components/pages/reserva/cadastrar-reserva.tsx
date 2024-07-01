import { useEffect, useState } from "react";
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
        console.log("Livros carregados:", livros); // Log dos livros carregados
        setLivros(livros);
      })
      .catch((error) => console.error("Erro ao carregar livros:", error)); // Log de erro
  }

  function carregarUsuarios() {
    fetch("/api/usuario/listar")
      .then((resposta) => resposta.json())
      .then((usuarios: Usuario[]) => {
        console.log("Usuarios carregados:", usuarios); // Log dos usuários carregados
        setUsuarios(usuarios);
      })
      .catch((error) => console.error("Erro ao carregar usuarios:", error)); // Log de erro
  }

  function carregarEmprestimos() {
    fetch("/api/emprestimo/listar")
      .then((resposta) => resposta.json())
      .then((emprestimos: Emprestimo[]) => {
        console.log("Empréstimos carregados:", emprestimos); // Log dos empréstimos carregados
        setEmprestimos(emprestimos);
      })
      .catch((error) => console.error("Erro ao carregar emprestimos:", error)); // Log de erro
  }

  function handleCadastrarReserva(e: any) {
    e.preventDefault();

    const reserva: Reserva = {
      livroId: livroId,
      usuarioId: usuarioId,
      emprestimoId: emprestimoId,
      dataReserva: dataReserva,
    };

    console.log("Dados da reserva:", reserva); // Log dos dados da reserva

    fetch("/api/reserva/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserva),
    })
      .then((resposta) => resposta.json())
      .then((reserva: Reserva) => {
        console.log("Reserva cadastrada:", reserva); // Log da reserva cadastrada
        navigate("/pages/reserva/listar");
      })
      .catch((error) => console.error("Erro ao cadastrar reserva:", error)); // Log de erro
  }

  return (
    <div>
      <h1>Cadastrar uma Reserva</h1>
      <form onSubmit={handleCadastrarReserva}>
        <label>Livro:</label>
        <select value={livroId} onChange={(e: any) => setLivroId(e.target.value)}>
          <option value="">Selecione um livro</option>
          {livros.map((livro) => (
            <option value={livro.id} key={livro.id}>
              {livro.nome}
            </option>
          ))}
        </select>
        <br />
        <label>Usuario:</label>
        <select value={usuarioId} onChange={(e: any) => setUsuarioId(e.target.value)}>
          <option value="">Selecione um usuário</option>
          {usuarios.map((usuario) => (
            <option value={usuario.id} key={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>
        <br />
        <label>Emprestimo:</label>
        <select value={emprestimoId} onChange={(e: any) => setEmprestimoId(e.target.value)}>
          <option value="">Selecione um empréstimo</option>
          {emprestimos.map((emprestimo) => (
            <option value={emprestimo.id} key={emprestimo.id}>
              {emprestimo.dataDevolucao}
            </option>
          ))}
        </select>
        <br />
        <label>Data da Reserva:</label>
        <input
          type="date"
          value={dataReserva}
          onChange={(e: any) => setDataReserva(e.target.value)}
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarReserva;
