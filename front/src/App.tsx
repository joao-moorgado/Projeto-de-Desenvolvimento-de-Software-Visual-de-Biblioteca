import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListarLivro from "./components/pages/livro/listar-livro";
import ListarEmprestimo from "./components/pages/emprestimo/listar-emprestimo";
import ListarReserva from "./components/pages/reserva/listar-reserva";
import CadastrarReserva from "./components/pages/reserva/cadastrar-reserva";
import CadastrarEmprestimo from "./components/pages/emprestimo/cadastrar-emprestimo";
import CadastrarLivro from "./components/pages/livro/cadastrar-livro";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <header className="mb-4">
          <h1 className="text-center mt-4">Sistema Biblioteca</h1>
          <nav>
            <ul className="nav nav-pills justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pages/livro/listar">Livros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pages/emprestimo/listar">Empréstimos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pages/reserva/listar">Reservas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pages/livro/cadastrar">Cadastrar Livro</Link>
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
            <Route path="/pages/livro/cadastrar" element={<CadastrarLivro />} />
          </Routes>
        </main>

        <footer className="text-center mt-4">
          Desenvolvido por Alexandre Machado, Gabriela Guimarães e João Morgado
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
