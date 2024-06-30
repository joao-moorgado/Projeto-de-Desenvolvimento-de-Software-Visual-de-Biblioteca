import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListarLivro from "./components/pages/livro/listar-livro";
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
              <Link to={"pages/livro/listar"}>Listar livros</Link> 
            </li>
          </ul>
        </nav>
        <Routes>
          <Route 
            path="pages/livro/listar"
            element={<ListarLivro />}
          />
        </Routes>

        <footer>Desenvolvido por Alexandre Machado, Gabriela Guimarẽs e João Morgado</footer>
      </BrowserRouter>
    </div>
  );
}
//4 - OBRIGATORIAMENTE o componente DEVE ser exportado
export default App;
