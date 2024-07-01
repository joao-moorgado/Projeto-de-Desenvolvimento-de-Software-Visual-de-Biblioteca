import { useEffect, useState } from "react";
import { Emprestimo } from "../../../models/Emprestimo";
import { useNavigate, useParams } from "react-router-dom";

function AlterarEmprestimo() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>(); // id agora é opcional
  const [dataEmprestimo, setDataEmprestimo] = useState<string>("");
  const [livroId, setLivroId] = useState<string>("");
  const [usuarioId, setUsuarioId] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5296/api/emprestimo/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((emprestimo: Emprestimo) => {
          setDataEmprestimo(emprestimo.dataEmprestimo || "");
          setLivroId(emprestimo.livroId || "");
          setUsuarioId(emprestimo.usuarioId || "");
        });
    }
  }, [id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return; // Se id for undefined, não continua
    const emprestimo: Emprestimo = {
      dataEmprestimo: dataEmprestimo,
      livroId: livroId,
      usuarioId: usuarioId,
    };

    fetch(`http://localhost:5296/api/emprestimo/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emprestimo),
    })
      .then((resposta) => resposta.json())
      .then((emprestimo: Emprestimo) => {
        navigate("/pages/emprestimo/listar");
      });
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Alterar Empréstimo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dataEmprestimo" className="form-label">Data do Empréstimo:</label>
          <input
            type="text"
            className="form-control"
            id="dataEmprestimo"
            value={dataEmprestimo}
            placeholder="Digite a data do Empréstimo"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDataEmprestimo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="livroId" className="form-label">Livro ID:</label>
          <input
            type="text"
            className="form-control"
            id="livroId"
            value={livroId}
            placeholder="Digite o ID do Livro"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLivroId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usuarioId" className="form-label">Usuário ID:</label>
          <input
            type="text"
            className="form-control"
            id="usuarioId"
            value={usuarioId}
            placeholder="Digite o ID do Usuário"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsuarioId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}

export default AlterarEmprestimo;
