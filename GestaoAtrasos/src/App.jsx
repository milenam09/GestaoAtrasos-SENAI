import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TelaInicial from "./pages/acesso/SelecaoPerfil.jsx";
import LoginAluno from "./pages/acesso/LoginAluno.jsx";
import LoginGestor from "./pages/acesso/LoginGestor.jsx";
import LoginProfessor from "./pages/acesso/LoginProfessor.jsx";
import Dashboard from "./pages/professor/DashboardProfessor.jsx";
import RegistrarChegada from "./pages/aluno/RegistroAtraso.jsx";
import { InicioAlunoMock, MeusAtrasos, OcorrenciasAluno, DetalheOcorrencia, FormularioAtrasoMock, AtestadosAluno, PerfilAlunoMock, ContatoAlunoMock } from "./pages/aluno/TelasAluno.jsx";
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
