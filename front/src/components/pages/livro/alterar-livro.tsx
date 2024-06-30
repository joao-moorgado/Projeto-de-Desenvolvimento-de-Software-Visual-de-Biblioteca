import { useEffect, useState } from "react";
import { Livro } from "../../../models/Livro";
import { Autor } from "../../../models/Autor";
import { Genero } from "../../../models/Genero";
import { useNavigate, useParams } from "react-router-dom";

function AlterarLivro() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataPublicacao, setDataPublicacao] = useState("");
    const [disponibilidade, setDisponibilidade] = useState(true);
  
    useEffect(() => {
      if (id) {
        fetch(`http://localhost:5296/api/livro/buscar/${id}`)
          .then((resposta) => resposta.json())
          .then((livro: Livro) => {
            setNome(livro.nome);
            setDescricao(livro.descricao);
            setDataPublicacao(livro.dataPublicacao);
            setDisponibilidade(livro.disponibilidade);
          });
      }
    }, [id]);
  
    function alterarLivro(e: any) {
      const livro: Livro = {
        nome: nome,
        descricao: descricao,
        dataPublicacao: dataPublicacao,
        disponibilidade: disponibilidade,
      };
      //FETCH ou AXIOS
      fetch(`http://localhost:5296/api/livro/alterar/${id}`, {
        method: "PUT",
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
        <h1>Alterar Livro</h1>
        <form onSubmit={alterarLivro}>
          <label>Título:</label>
          <input
            type="text"
            value={nome}
            placeholder="Digite o título"
            onChange={(e: any) => setNome(e.target.value)}
            required
          />
          <br />
          <label>Sinopse:</label>
          <input
            type="text"
            value={descricao}
            placeholder="Digite a sinopse"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
          <br />
          <label>Data de Publicação:</label>
          <input
            type="text"
            value={dataPublicacao}
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
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  }
  
  export default AlterarLivro;
  