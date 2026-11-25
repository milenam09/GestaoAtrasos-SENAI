
import { useState } from "react";
import "./App.css";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  ArrowLeft,
  SlidersHorizontal,
  GraduationCap,
} from "lucide-react";

import Menu from "./components/Menu/Menu";



const alunosIniciais = [
  {
    id: 1,
    nome: "João Silva",
    turma: "T1A",
    ocorrencias: 6,
    atraso: "10/03/2026",
    status: "Andamento",
    cor: "#a94343",
    iniciais: "JS",
  },
  {
    id: 2,
    nome: "Milena Mares",
    turma: "T3A",
    ocorrencias: 3,
    atraso: "05/03/2026",
    status: "Pendente",
    cor: "#6d8494",
    iniciais: "MM",
  },
  {
    id: 3,
    nome: "Beatriz Paz",
    turma: "T2B",
    ocorrencias: 2,
    atraso: "20/02/2026",
    status: "Andamento",
    cor: "#eea04e",
    iniciais: "BP",
  },
  {
    id: 4,
    nome: "Anna Beatriz",
    turma: "T2A",
    ocorrencias: 7,
    atraso: "12/02/2026",
    status: "Pendente",
    cor: "#41843b",
    iniciais: "AB",
  },
  {
    id: 5,
    nome: "Isabela Garcia",
    turma: "T2B",
    ocorrencias: 4,
    atraso: "03/02/2026",
    status: "Concluída",
    cor: "#e2df36",
    iniciais: "IG",
  },
];



function App() {
  const [busca, setBusca] = useState("");
  const [turma, setTurma] = useState("Todas as turmas");
  const [status, setStatus] = useState("Todos os status");
  const [pagina, setPagina] = useState(1);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  /* FILTRAGEM */

  const alunosFiltrados = alunosIniciais.filter((aluno) => {
    const correspondeNome = aluno.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeTurma =
      turma === "Todas as turmas" || aluno.turma === turma;

    const correspondeStatus =
      status === "Todos os status" || aluno.status === status;

    return correspondeNome && correspondeTurma && correspondeStatus;
  });

  /* PAGINAÇÃO */

  const porPagina = 5;

  const totalPaginas = Math.max(
    1,
    Math.ceil(alunosFiltrados.length / porPagina)
  );

  const alunosVisiveis = alunosFiltrados.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  function mudarPagina(novaPagina) {
    setPagina(Math.max(1, Math.min(novaPagina, totalPaginas)));
  }


  function limparFiltros() {
    setBusca("");
    setTurma("Todas as turmas");
    setStatus("Todos os status");
    setPagina(1);
  }

  return (
    <div className="pagina">

      <Menu />

      

      <main className="conteudo">

        <header className="cabecalho">
          <div className="titulo-pagina">
            <ArrowLeft size={21} strokeWidth={2.5} />

            <div>
              <h1>Alunos</h1>
              <p>
                Consulte os alunos das suas turmas e acompanhe
                o histórico de ocorrências.
              </p>
            </div>
          </div>
        </header>

        <section className="painel">

          

          <div className="barra-filtros">

            <label className="campo-busca">
              <input
                type="text"
                placeholder="Buscar por aluno"
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setPagina(1);
                }}
              />

              <Search size={18} />
            </label>

            <select
              value={turma}
              onChange={(e) => {
                setTurma(e.target.value);
                setPagina(1);
              }}
            >
              <option>Todas as turmas</option>
              <option>T1A</option>
              <option>T2A</option>
              <option>T2B</option>
              <option>T3A</option>
            </select>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPagina(1);
              }}
            >
              <option>Todos os status</option>
              <option>Andamento</option>
              <option>Pendente</option>
              <option>Concluída</option>
            </select>

            <button
              type="button"
              className={`botao-filtros ${
                filtrosAbertos ? "selecionado" : ""
              }`}
              onClick={() => setFiltrosAbertos(!filtrosAbertos)}
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>

          </div>

         

          <div className="filtros-extra">
            <span>
              {filtrosAbertos
                ? "Utilize os campos acima para filtrar os alunos."
                : "Filtre os alunos usando os campos acima."}
            </span>

            <button type="button" onClick={limparFiltros}>
              Limpar filtros
            </button>
          </div>

        

          <div className="tabela-container">

            <table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Nome</th>
                  <th>Turmas</th>
                  <th>Ocorrências</th>
                  <th>Último Atraso</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {alunosVisiveis.map((aluno) => (
                  <tr key={aluno.id}>

                    <td>
                      <div
                        className="avatar-aluno"
                        style={{ backgroundColor: aluno.cor }}
                      >
                        {aluno.iniciais}
                      </div>
                    </td>

                    <td className="nome-aluno">
                      {aluno.nome}
                    </td>

                    <td>{aluno.turma}</td>

                    <td>{aluno.ocorrencias}</td>

                    <td>{aluno.atraso}</td>

                    <td>
                      <span
                        className={`status status-${aluno.status
                          .toLowerCase()
                          .replace("í", "i")
                          .replace("ú", "u")}`}
                      >
                        {aluno.status}
                      </span>
                    </td>

                    <td>
                      <div className="acoes">

                        <button
                          type="button"
                          title="Visualizar aluno"
                          onClick={() => setAlunoSelecionado(aluno)}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          title="Mais opções"
                          onClick={() =>
                            alert(`Opções para ${aluno.nome}`)
                          }
                        >
                          <MoreVertical size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {alunosVisiveis.length === 0 && (
                  <tr>
                    <td colSpan="7" className="sem-resultados">
                      Nenhum aluno encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>

          

          <footer className="rodape-tabela">

            <span>
              Mostrando{" "}
              {alunosFiltrados.length === 0
                ? 0
                : (pagina - 1) * porPagina + 1}
              {" - "}
              {Math.min(pagina * porPagina, alunosFiltrados.length)}
              {" de "}
              {alunosFiltrados.length}
            </span>

            <div className="paginacao">

              <button
                type="button"
                onClick={() => mudarPagina(pagina - 1)}
                disabled={pagina === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from(
                { length: totalPaginas },
                (_, i) => i + 1
              )
                .slice(0, 5)
                .map((numero) => (
                  <button
                    type="button"
                    key={numero}
                    className={
                      pagina === numero ? "pagina-ativa" : ""
                    }
                    onClick={() => mudarPagina(numero)}
                  >
                    {numero}
                  </button>
                ))}

              <button
                type="button"
                onClick={() => mudarPagina(pagina + 1)}
                disabled={pagina === totalPaginas}
              >
                <ChevronRight size={16} />
              </button>

            </div>

          </footer>

        </section>

      </main>

     

      {alunoSelecionado && (
        <div
          className="modal-fundo"
          onClick={() => setAlunoSelecionado(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="fechar-modal"
              onClick={() => setAlunoSelecionado(null)}
            >
              ×
            </button>

            <GraduationCap size={28} />

            <h2>{alunoSelecionado.nome}</h2>

            <p>Turma: {alunoSelecionado.turma}</p>
            <p>Ocorrências: {alunoSelecionado.ocorrencias}</p>
            <p>Último atraso: {alunoSelecionado.atraso}</p>
            <p>Status: {alunoSelecionado.status}</p>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
