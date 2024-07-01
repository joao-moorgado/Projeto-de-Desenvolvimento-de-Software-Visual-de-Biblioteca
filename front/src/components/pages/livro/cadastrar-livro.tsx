import React, { useEffect, useState } from "react";
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
    carregarGeneros();
  }, []);

  function carregarAutores() {
    fetch("/api/autor/listar")
      .then((resposta) => resposta.json())
      .then((autores: Autor[]) => {
        setAutores(autores);
      })
      .catch((error) => {
        console.error("Erro ao carregar autores:", error);
      });
  }

  function carregarGeneros() {
    fetch("/api/genero/listar")
      .then((resposta) => resposta.json())
      .then((generos: Genero[]) => {
        setGeneros(generos);
      })
      .catch((error) => {
        console.error("Erro ao carregar gêneros:", error);
      });
  }

  function cadastrarLivro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const livro: Livro = {
      nome: nome,
      descricao: descricao,
      dataPublicacao: dataPublicacao,
      disponibilidade: disponibilidade,
      autorId: autorId,
      generoId: generoId,
    };

    fetch("/api/livro/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao cadastrar o livro.");
        }
        return resposta.json();
      })
      .then((livro: Livro) => {
        console.log("Livro cadastrado:", livro);
        navigate("/pages/livro/listar");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o livro:", error);
      });
  }

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Cadastrar Livro</h1>
      <form onSubmit={cadastrarLivro}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            placeholder="Digite o título do livro"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
            placeholder="Digite a sinopse do livro"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dataPublicacao" className="form-label">
            Data de Publicação:
          </label>
          <input
            type="date"
            id="dataPublicacao"
            className="form-control"
            placeholder="Digite a data de Publicação"
            value={dataPublicacao}
            onChange={(e) => setDataPublicacao(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="disponibilidade"
            className="form-check-input"
            checked={disponibilidade}
            onChange={(e) => setDisponibilidade(e.target.checked)}
          />
          <label htmlFor="disponibilidade" className="form-check-label">
            Disponibilidade
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="autores" className="form-label">
            Autores:
          </label>
          <select
            id="autores"
            className="form-select"
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
          >
            <option value="">Selecione um autor</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.id} - {autor.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="generos" className="form-label">
            Gêneros:
          </label>
          <select
            id="generos"
            className="form-select"
            value={generoId}
            onChange={(e) => setGeneroId(e.target.value)}
          >
            <option value="">Selecione um gênero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.id} - {genero.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastrarLivro;
