import { BrowserRouter, Routes, Route } from "react-router-dom";

import TelaInicial from "./components/Tela Inicial/Tela-Inicial";
import Gestor from "./components/Gestor/Gestor";
import TelaInicialProfessor from "./components/Login professor/TelaInicial";
import TelaInicialAluno from "./components/Tela aluno/TelaInicial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/aluno" element={<TelaInicialAluno />} />
        <Route path="/professor" element={<TelaInicialProfessor />} />
        <Route path="/gestor" element={<Gestor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
