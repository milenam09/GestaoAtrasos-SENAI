import { useState } from "react";
import { ArrowLeft, Search, Plus, ChevronDown, ChevronRight } from "lucide-react";
import Sidebar from "../components/Sidebar";
import "./MinhasTurmas.css";

const turmasIniciais = [
  { sigla: "DEV-M", curso: "Informática", turno: "Integral", alunos: 31, atrasos: 3 },
  { sigla: "INF", curso: "Informática", turno: "Manhã", alunos: 26, atrasos: 2 },
  { sigla: "RED", curso: "Mecatrônica", turno: "Tarde", alunos: 35, atrasos: 5 },
  { sigla: "MCT", curso: "Robótica", turno: "Manhã", alunos: 25, atrasos: 1 },
  { sigla: "ROB", curso: "Robótica", turno: "Manhã", alunos: 33, atrasos: 2 },
  { sigla: "ADS", curso: "Robótica", turno: "Tarde", alunos: 38, atrasos: 0 },
];

export default function MinhasTurmas({ telaAtiva = "Minhas Turmas", onNavegar }) {
  const [busca, setBusca] = useState("");
  const [turno, setTurno] = useState("Todas as turmas");

  const turmasFiltradas = turmasIniciais.filter((turma) => {
    const correspondeBusca =
      turma.sigla.toLowerCase().includes(busca.toLowerCase()) ||
      turma.curso.toLowerCase().includes(busca.toLowerCase());

    const correspondeTurno =
      turno === "Todas as turmas" || turma.turno === turno;

    return correspondeBusca && correspondeTurno;
  });

  function abrirTurma(turma) {
    alert(`Você selecionou a turma ${turma.sigla}.`);
  }

  function novaTurma() {
    alert("A função de cadastrar uma nova turma será adicionada depois.");
  }

  return (
    <div className="minhas-turmas-app">
     <Sidebar telaAtiva={telaAtiva} onNavegar={onNavegar} />

      <main className="minhas-turmas-conteudo">
        <header className="minhas-turmas-cabecalho">
          <button
            className="minhas-turmas-voltar"
            onClick={() => window.history.back()}
            aria-label="Voltar"
          >
            <ArrowLeft size={32} />
          </button>

          <div>
            <h1>Minhas Turmas</h1>
            <p>
              Visualize as turmas que você administra e acompanhe o número
              de alunos e atrasos.
            </p>
          </div>
        </header>

        <section className="minhas-turmas-ferramentas">
          <label className="minhas-turmas-busca">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar por turma..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              aria-label="Buscar por turma"
            />
          </label>

          <div className="minhas-turmas-filtro">
            <select
              value={turno}
              onChange={(e) => setTurno(e.target.value)}
              aria-label="Filtrar por turno"
            >
              <option>Todas as turmas</option>
              <option>Integral</option>
              <option>Manhã</option>
              <option>Tarde</option>
            </select>
            <ChevronDown size={17} />
          </div>

          <button
            className="minhas-turmas-nova"
            onClick={novaTurma}
          >
            <Plus size={21} />
            Nova Turma
          </button>
        </section>

        <div className="minhas-turmas-tabela-container">
          <table className="minhas-turmas-tabela">
            <thead>
              <tr>
                <th>Turma</th>
                <th>Curso</th>
                <th>Turno</th>
                <th>Total de alunos</th>
                <th>Atrasos hoje</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {turmasFiltradas.length > 0 ? (
                turmasFiltradas.map((turma) => (
                  <tr key={turma.sigla}>
                    <td className="minhas-turmas-sigla">{turma.sigla}</td>
                    <td>{turma.curso}</td>
                    <td>{turma.turno}</td>
                    <td className="minhas-turmas-numero">{turma.alunos}</td>
                    <td>
                      <span
                        className={`minhas-turmas-atrasos ${
                          turma.atrasos === 0 ? "sem-atrasos" : ""
                        }`}
                      >
                        {turma.atrasos}
                      </span>
                    </td>
                    <td>
                      <button
                        className="minhas-turmas-ver"
                        onClick={() => abrirTurma(turma)}
                      >
                        Ver Turma <ChevronRight size={17} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="minhas-turmas-vazio">
                    Nenhuma turma encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}