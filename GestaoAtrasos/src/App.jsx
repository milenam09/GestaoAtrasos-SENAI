
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TelaInicial from "./components/TelasIniciais/TelaInicial/Tela-Inicial";
import LoginAluno from "./components/TelasIniciais/Aluno/TelaInicial";
import PainelAluno from "./components/TelasAlunos/Telainicial/TelaInicialAluno";
import Gestor from "./components/TelasIniciais/Gestor/Gestor";
import TelaInicialProfessor from "./components/TelasIniciais/Professor/TelaInicial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/aluno" element={<LoginAluno />} />
        <Route path="/aluno/inicio" element={<PainelAluno />} />
        <Route path="/gestor" element={<Gestor />} />
        <Route path="/professor" element={<TelaInicialProfessor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
