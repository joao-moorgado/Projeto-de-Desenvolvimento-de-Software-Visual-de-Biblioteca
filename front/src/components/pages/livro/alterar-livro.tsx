import React, { useEffect, useState } from "react";
import { Livro } from "../../../models/Livro";
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
    <div className="container">
      <h1 className="mt-4 mb-4">Alterar Livro</h1>
      <form onSubmit={alterarLivro}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            value={nome}
            placeholder="Digite o título"
            onChange={(e: any) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sinopse" className="form-label">
            Sinopse:
          </label>
          <input
            type="text"
            id="sinopse"
            className="form-control"
            value={descricao}
            placeholder="Digite a sinopse"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dataPublicacao" className="form-label">
            Data de Publicação:
          </label>
          <input
            type="text"
            id="dataPublicacao"
            className="form-control"
            value={dataPublicacao}
            placeholder="Digite a data de Publicação"
            onChange={(e: any) => setDataPublicacao(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="disponibilidade"
            className="form-check-input"
            checked={disponibilidade}
            onChange={(e: any) => setDisponibilidade(e.target.checked)}
          />
          <label htmlFor="disponibilidade" className="form-check-label">
            Disponibilidade
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default AlterarLivro;
