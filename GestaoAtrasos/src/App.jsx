import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import TelaInicial from "./pages/acesso/SelecaoPerfil.jsx";
import LoginAluno from "./pages/acesso/LoginAluno.jsx";
import LoginGestor from "./pages/acesso/LoginGestor.jsx";
import LoginProfessor from "./pages/acesso/LoginProfessor.jsx";
import RegistrarChegada from "./pages/aluno/RegistroAtraso.jsx";
import {
  InicioAlunoMock,
  MeusAtrasos,
  OcorrenciasAluno,
  DetalheOcorrencia,
  FormularioAtrasoMock,
  AtestadosAluno,
  PerfilAlunoMock,
  ContatoAlunoMock,
} from "./pages/aluno/TelasAluno.jsx";
import {
  InicioProfessor,
  TurmasProfessor,
  AlunosProfessor,
  RegistrarAtrasoProfessor,
  OcorrenciasProfessor,
  RelatoriosProfessor,
  PerfilProfessor,
  ContatoProfessor,
} from "./pages/professor/TelasProfessor.jsx";
import {
  InicioGestor,
  AcolhimentosGestor,
  TurmasGestor,
  AlunosGestor,
  RelatoriosGestor,
  GerarQrcodeGestor,
  PerfilGestor,
  ContatoGestor,
} from "./pages/gestor/TelasGestor.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />

        {/* Fluxo do Aluno */}
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

        {/* Fluxo do Professor */}
        <Route path="/professor" element={<LoginProfessor />} />
        <Route path="/professor/inicio" element={<InicioProfessor />} />
        <Route path="/professor/turmas" element={<TurmasProfessor />} />
        <Route path="/professor/alunos" element={<AlunosProfessor />} />
        <Route path="/professor/registrar-atraso" element={<RegistrarAtrasoProfessor />} />
        <Route path="/professor/ocorrencias" element={<OcorrenciasProfessor />} />
        <Route path="/professor/relatorios" element={<RelatoriosProfessor />} />
        <Route path="/professor/perfil" element={<PerfilProfessor />} />
        <Route path="/professor/contato" element={<ContatoProfessor />} />

        {/* Fluxo do Gestor (AQV) */}
        <Route path="/gestor" element={<LoginGestor />} />
        <Route path="/gestor/inicio" element={<InicioGestor />} />
        <Route path="/gestor/acolhimentos" element={<AcolhimentosGestor />} />
        <Route path="/gestor/turmas" element={<TurmasGestor />} />
        <Route path="/gestor/alunos" element={<AlunosGestor />} />
        <Route path="/gestor/relatorios" element={<RelatoriosGestor />} />
        <Route path="/gestor/qrcode" element={<GerarQrcodeGestor />} />
        <Route path="/gestor/perfil" element={<PerfilGestor />} />
        <Route path="/gestor/contato" element={<ContatoGestor />} />

        <Route
          path="*"
          element={
            <main style={{ padding: 40 }}>
              <h1>Página não encontrada</h1>
              <Link to="/">Voltar ao início</Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
