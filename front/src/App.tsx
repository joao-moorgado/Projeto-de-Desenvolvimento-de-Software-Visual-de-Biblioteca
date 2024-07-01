import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListarLivro from "./components/pages/livro/listar-livro";
import ListarEmprestimo from "./components/pages/emprestimo/listar-emprestimo";
import ListarReserva from "./components/pages/reserva/listar-reserva";
import CadastrarReserva from "./components/pages/reserva/cadastrar-reserva";
import CadastrarEmprestimo from "./components/pages/emprestimo/cadastrar-emprestimo";

// Componente principal do aplicativo
function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Sistema Biblioteca</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/pages/livro/listar">Livros</Link>
              </li>
              <li>
                <Link to="/pages/emprestimo/listar">Empréstimos</Link>
              </li>
              <li>
                <Link to="/pages/reserva/listar">Reservas</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<div>Bem-vindo ao Sistema Biblioteca!</div>} />
            <Route path="/pages/livro/listar" element={<ListarLivro />} />
            <Route path="/pages/emprestimo/listar" element={<ListarEmprestimo />} />
            <Route path="/pages/reserva/listar" element={<ListarReserva />} />
            <Route path="/pages/reserva/realizar/:id" element={<CadastrarReserva />} />
            <Route path="/pages/emprestimo/realizar/:id" element={<CadastrarEmprestimo />} />
          </Routes>
        </main>

        <footer>
          Desenvolvido por Alexandre Machado, Gabriela Guimarães e João Morgado
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
