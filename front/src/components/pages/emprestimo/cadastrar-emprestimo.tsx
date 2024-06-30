import { useEffect, useState } from "react";
import { Emprestimo} from "../../../models/Emprestimo";
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

  
    function CadastrarEmprestimo(e: any) {
      const emprestimo: Emprestimo = {
        livroId: livroId,
        usuarioId: usuarioId,
        dataEmprestimo: dataEmprestimo,
        dataDevolucao: dataDevolucao,
      };
  
      //FETCH ou AXIOS
      fetch("/api/emprestimo/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emprestimo),
      })
        .then((resposta) => resposta.json())
        .then((emprestimo: Emprestimo) => {
          navigate("/pages/emprestimo/listar");
        });
      e.preventDefault();
    }
    return (
      <div>
        <h1>Cadastrar um Emprestimo</h1>
        <form onSubmit={CadastrarEmprestimo}>
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
          <label>Data do Emprestimo:</label>
          <input
            type="text"
            placeholder="Digite a data do Emprestimo"
            onChange={(e: any) => setDataEmprestimo(e.target.value)}
          />
          <br />
          <label>Data da Devolução:</label>
          <input
            type="text"
            placeholder="Digite a data para a Devolução"
            onChange={(e: any) => setDataDevolucao(e.target.value)}
          />
          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
  
  export default CadastrarEmprestimo;