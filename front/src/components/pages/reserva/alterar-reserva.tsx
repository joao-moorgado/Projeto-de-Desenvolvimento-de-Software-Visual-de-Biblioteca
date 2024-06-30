import { useEffect, useState } from "react";
import { Reserva } from "../../../models/Reserva";
import { useNavigate, useParams } from "react-router-dom";

function AlterarReserva() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>(); // id agora é opcional
  const [dataReserva, setDataReserva] = useState<string>("");
  const [livroId, setLivroId] = useState<string>("");
  const [usuarioId, setUsuarioId] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5296/api/reserva/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((reserva: Reserva) => {
          setDataReserva(reserva.dataReserva || "");
          setLivroId(reserva.livroId || "");
          setUsuarioId(reserva.usuarioId || "");
        });
    }
  }, [id]);

  function alterarReserva(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return; // Se id for undefined, não continua
    const reserva: Reserva = {
      dataReserva: dataReserva,
      livroId: livroId,
      usuarioId: usuarioId,
    };

    fetch(`http://localhost:5296/api/reserva/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserva),
    })
      .then((resposta) => resposta.json())
      .then((reserva: Reserva) => {
        navigate("/pages/reserva/listar");
      });
  }

  return (
    <div>
      <h1>Alterar Reserva</h1>
      <form onSubmit={alterarReserva}>
        <label>Data da Reserva:</label>
        <input
          type="text"
          value={dataReserva}
          placeholder="Digite a data da Reserva"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDataReserva(e.target.value)}
        />
        <br />
        <label>Livro ID:</label>
        <input
          type="text"
          value={livroId}
          placeholder="Digite o ID do Livro"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLivroId(e.target.value)}
        />
        <br />
        <label>Usuário ID:</label>
        <input
          type="text"
          value={usuarioId}
          placeholder="Digite o ID do Usuário"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsuarioId(e.target.value)}
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default AlterarReserva;
