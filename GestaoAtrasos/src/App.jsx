import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TelaInicial from "./pages/TelaInicial.jsx";
import LoginAluno from "./pages/LoginAluno.jsx";
import LoginGestor from "./pages/LoginGestor.jsx";
import LoginProfessor from "./pages/LoginProfessor.jsx";
import Dashboard from "./pages/DashboardProfessor.jsx";
import RegistrarChegada from "./pages/RegistroAtraso.jsx";
import { InicioAlunoMock, MeusAtrasos, OcorrenciasAluno, DetalheOcorrencia, FormularioAtrasoMock, AtestadosAluno, PerfilAlunoMock, ContatoAlunoMock } from "./pages/TelasAluno.jsx";
export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<TelaInicial />} />
    <Route path="/aluno" element={<LoginAluno />} />
    <Route path="/aluno/inicio" element={<InicioAlunoMock />} />
    <Route path="/aluno/registrar-chegada" element={<RegistrarChegada />} />
    <Route path="/aluno/registrar-atraso" element={<FormularioAtrasoMock />} />
    <Route path="/aluno/atrasos" element={<MeusAtrasos />} />
    <Route path="/aluno/ocorrencias" element={<OcorrenciasAluno />} />
    <Route path="/aluno/ocorrencias/:id" element={<DetalheOcorrencia />} />
    <Route path="/aluno/atestados" element={<AtestadosAluno />} />
    <Route path="/aluno/perfil" element={<PerfilAlunoMock />} />
    <Route path="/aluno/contato" element={<ContatoAlunoMock />} />
    <Route path="/contato" element={<Navigate to="/aluno/contato" replace />} />
    <Route path="/professor" element={<LoginProfessor />} />
    <Route path="/professor/inicio" element={<Dashboard />} />
    <Route path="/gestor" element={<LoginGestor />} />
    <Route path="*" element={<main style={{ padding: 40 }}><h1>Página não encontrada</h1><a href="/">Voltar ao início</a></main>} />
  </Routes></BrowserRouter>;
}
