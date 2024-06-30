import { useEffect, useState } from "react";
import { Reserva } from "../../../models/Reserva";
import { Livro } from "../../../models/Livro";
import { Usuario } from "../../../models/Usuario";
import { Emprestimo} from "../../../models/Emprestimo";
import { useNavigate } from "react-router-dom";

function CadastrarReserva() {
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
    }, []);
  
    function carregarLivros() {
      //FETCH ou AXIOS
      fetch("/api/livro/listar")
        .then((resposta) => resposta.json())
        .then((livros: Livro[]) => {
          setLivros(livros);
        });
    }

    useEffect(() => {
        carregarUsuarios();
      }, []);
    
    function carregarUsuarios() {
        //FETCH ou AXIOS
        fetch("/api/usuario/listar")
          .then((resposta) => resposta.json())
          .then((usuarios: Usuario[]) => {
            setUsuarios(usuarios);
          });
    }

    function carregarEmprestimos() {
        //FETCH ou AXIOS
        fetch("/api/emprestimo/listar")
          .then((resposta) => resposta.json())
          .then((emprestimos: Emprestimo[]) => {
            setEmprestimos(emprestimos);
          });
    }
  
    function cadastrarReserva(e: any) {
      const reserva: Reserva = {
        livroId: livroId,
        usuarioId: usuarioId,
        emprestimoId: emprestimoId,
        dataReserva: dataReserva,
      };
  
      //FETCH ou AXIOS
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
        });
      e.preventDefault();
    }
    return (
      <div>
        <h1>Cadastrar uma Reserva</h1>
        <form onSubmit={cadastrarReserva}>

        <label>Livro:</label>
          <select onChange={(e: any) => setLivroId(e.target.value)}>
            {livros.map((livro) => (
              <option value={livro.id} key={livro.id}>
                {livro.nome}
              </option>
            ))}
          </select>
          <br />
          <label>Usuario:</label>
          <select onChange={(e: any) => setUsuarioId(e.target.value)}>
            {usuarios.map((usuario) => (
              <option value={usuario.id} key={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
          <br />
          <label>Emprestimo:</label>
          <select onChange={(e: any) => setEmprestimoId(e.target.value)}>
            {emprestimos.map((emprestimo) => (
              <option value={emprestimo.id} key={emprestimo.id}>
                {emprestimo.dataDevolucao}
              </option>
            ))}
          </select>
          <br />
          
          <label>Data da Reserva:</label>
          <input
            type="text"
            placeholder="Digite a data para Reserva"
            onChange={(e: any) => setDataReserva(e.target.value)}
          />
          <br />
          
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
  
  export default CadastrarReserva;