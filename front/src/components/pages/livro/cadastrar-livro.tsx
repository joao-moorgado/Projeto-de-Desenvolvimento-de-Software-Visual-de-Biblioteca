import { useEffect, useState } from "react";
import { Livro } from "../../../models/Livro";
import { Autor } from "../../../models/Autor";
import { Genero } from "../../../models/Genero";
import { useNavigate } from "react-router-dom";

function CadastrarLivro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [autorId, setAutorId] = useState("");
    const [autores, setAutores] = useState<Autor[]>([]);
    const [generoId, setGeneroId] = useState("");
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [dataPublicacao, setDataPublicacao] = useState("");
    const [disponibilidade, setDisponibilidade] = useState(true);
  
    useEffect(() => {
      carregarAutores();
    }, []);
  
    function carregarAutores() {
      //FETCH ou AXIOS
      fetch("/api/autor/listar")
        .then((resposta) => resposta.json())
        .then((autores: Autor[]) => {
          setAutores(autores);
        });
    }

    useEffect(() => {
        carregarGeneros();
      }, []);
    
      function carregarGeneros() {
        //FETCH ou AXIOS
        fetch("/api/autor/listar")
          .then((resposta) => resposta.json())
          .then((generos: Genero[]) => {
            setGeneros(generos);
          });
      }
  
    function cadastrarLivro(e: any) {
      const livro: Livro = {
        nome: nome,
        descricao: descricao,
        dataPublicacao: dataPublicacao,
        disponibilidade: disponibilidade,
        autorId: autorId,
        generoId: generoId,
      };
  
      //FETCH ou AXIOS
      fetch("/api/livro/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
      })
        .then((resposta) => resposta.json())
        .then((livro: Livro) => {
          navigate("/pages/livro/listar");
        });
      e.preventDefault();
    }
    return (
      <div>
        <h1>Cadastrar Livro</h1>
        <form onSubmit={cadastrarLivro}>
          <label>Título:</label>
          <input
            type="text"
            placeholder="Digite o título do livro"
            onChange={(e: any) => setNome(e.target.value)}
            required
          />
          <br />
          <label>Sinopse:</label>
          <input
            type="text"
            placeholder="Digite a sinopse do livro"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
          <br />
          <label>Data de Publicação:</label>
          <input
            type="text"
            placeholder="Digite a data de Publicação"
            onChange={(e: any) => setDataPublicacao(e.target.value)}
          />
          <br />
          <label>Disponibilidade:</label>
          <input
            type="checkbox"
            checked={disponibilidade}
            onChange={(e: any) => setDisponibilidade(e.target.checked)}
          />
          <br />
          <label>Autores:</label>
          <select onChange={(e: any) => setAutorId(e.target.value)}>
            {autores.map((autor) => (
              <option value={autor.id} key={autor.id}>
                {autor.nome}
              </option>
            ))}
          </select>
          <br />
          <label>Generos:</label>
          <select onChange={(e: any) => setGeneroId(e.target.value)}>
            {generos.map((genero) => (
              <option value={genero.id} key={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
  
  export default CadastrarLivro;