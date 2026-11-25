import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TelaInicial from "./pages/TelaInicial/TelaInicial";
import TelaInicialAluno from "./pages/TelaInicialAluno/TelaInicialAluno";
import TelaAcolhimentos from "./pages/Acolhimento/TelaAcolhimentos";
import TelaMinhasTurmas from "./pages/MinhasTurmas/TelaMinhasTurmas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/aluno" element={<TelaInicialAluno />} />
      <Route path="/acolhimento" element={<TelaAcolhimentos />} />
      <Route path="/minhas-turmas" element={<TelaMinhasTurmas />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
