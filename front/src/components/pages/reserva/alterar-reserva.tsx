import { useEffect, useState } from "react";
import { Reserva } from "../../../models/Reserva";
import { useNavigate, useParams } from "react-router-dom";

function AlterarReserva() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataReserva, setDataReserva] = useState("");
  
    useEffect(() => {
      if (id) {
        fetch("http://localhost:5296/api/reserva/buscar/${id}")
          .then((resposta) => resposta.json())
          .then((reserva: Reserva) => {
            setDataReserva(reserva.dataReserva);
          });
      }
    }, []);
  
    function alterarReserva(e: any) {
      const reserva: Reserva = {
        dataReserva: dataReserva,
      };
      //FETCH ou AXIOS
      fetch("http://localhost:5296/api/resreva/alterar/${id}", {
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
      e.preventDefault();
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
            onChange={(e: any) => setDataReserva(e.target.value)}
          />
          <br />
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  }
  
  export default AlterarReserva;
  