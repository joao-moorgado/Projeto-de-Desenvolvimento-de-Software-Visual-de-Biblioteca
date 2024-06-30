import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListarLivro from "./components/pages/livro/listar-livro";
import ListarEmprestimo from "./components/pages/emprestimo/listar-emprestimo";
import ListarReserva from "./components/pages/reserva/listar-reserva";
//1 - Um componente SEMPRE deve começar com a primeira letra
//maiúscula
//2 - Todo componente DEVE ser uma função do JS
//3 - Todo deve retornar apenas UM elemento HTML
function App() {
  return (
    <div>
      <BrowserRouter>
        <h1>Sistema Biblioteca</h1>

        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"pages/livro/listar"}>Livros</Link> 
            </li>
            <li>
              <Link to={"pages/emprestimo/listar"}>Empréstimos</Link>
            </li>
            <li>
              <Link to={"pages/reserva/listar"}>Reservas</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route 
            path="pages/livro/listar"
            element={<ListarLivro />}
          />
          <Route
            path="pages/emprestimo/listar"
            element={<ListarEmprestimo />}
          />
          <Route
            path="pages/reserva/listar"
            element={<ListarReserva />}
          />
        </Routes>

        <footer>Desenvolvido por Alexandre Machado, Gabriela Guimarẽs e João Morgado</footer>
      </BrowserRouter>
    </div>
  );
}
//4 - OBRIGATORIAMENTE o componente DEVE ser exportado
export default App;
