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
        <div>
            <h1>Cadastrar Livro</h1>
            <form onSubmit={cadastrarLivro}>
                <label>Título:</label>
                <input
                    type="text"
                    placeholder="Digite o título do livro"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <br />
                <label>Sinopse:</label>
                <input
                    type="text"
                    placeholder="Digite a sinopse do livro"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <br />
                <label>Data de Publicação:</label>
                <input
                    type="date"
                    placeholder="Digite a data de Publicação"
                    value={dataPublicacao}
                    onChange={(e) => setDataPublicacao(e.target.value)}
                />
                <br />
                <label>Disponibilidade:</label>
                <input
                    type="checkbox"
                    checked={disponibilidade}
                    onChange={(e) => setDisponibilidade(e.target.checked)}
                />
                <br />
                <label>Autores:</label>
                <select value={autorId} onChange={(e) => setAutorId(e.target.value)}>
                    <option value="">Selecione um autor</option>
                    {autores.map((autor) => (
                        <option value={autor.id} key={autor.id}>
                            {autor.id} - {autor.nome}
                        </option>
                    ))}
                </select>
                <br />
                <label>Gêneros:</label>
                <select value={generoId} onChange={(e) => setGeneroId(e.target.value)}>
                    <option value="">Selecione um gênero</option>
                    {generos.map((genero) => (
                        <option value={genero.id} key={genero.id}>
                            {genero.id} - {genero.nome}
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
