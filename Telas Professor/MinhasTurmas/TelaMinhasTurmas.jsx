import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faClipboardList,
  faUsers,
  faChartBar,
  faUser,
  faRightFromBracket,
  faBars,
  faXmark,
  faChalkboardUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import "./TelaMinhasTurmas.css";
import Sidebar from "../../components/layout/Sidebar";
import backArrowIcon from "../../assets/Vector (4).png";

function TelaMinhasTurmas() {
  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todas as turmas");
  const [modalNova, setModalNova] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itensPorPagina = 5;

  const [turmas, setTurmas] = useState([
    {
      id: 1,
      turma: "DEV-M",
      curso: "Informática",
      turno: "Integral",
      alunos: 31,
      atrasos: 3,
    },
    {
      id: 2,
      turma: "INF",
      curso: "Informática",
      turno: "Manhã",
      alunos: 26,
      atrasos: 2,
    },
    {
      id: 3,
      turma: "RED",
      curso: "Mecatrônica",
      turno: "Tarde",
      alunos: 35,
      atrasos: 5,
    },
    {
      id: 4,
      turma: "MCT",
      curso: "Robótica",
      turno: "Manhã",
      alunos: 25,
      atrasos: 1,
    },
    {
      id: 5,
      turma: "ROB",
      curso: "Robótica",
      turno: "Manhã",
      alunos: 33,
      atrasos: 2,
    },
    {
      id: 6,
      turma: "ADS",
      curso: "Robótica",
      turno: "Tarde",
      alunos: 38,
      atrasos: 0,
    },
  ]);

  const [novaTurma, setNovaTurma] = useState({
    turma: "",
    curso: "",
    turno: "",
    alunos: "",
  });

  const navigate = useNavigate();

  // PESQUISA E FILTRO
  const turmasFiltradas = turmas.filter((item) => {
    const correspondePesquisa =
      item.turma.toLowerCase().includes(pesquisa.toLowerCase()) ||
      item.curso.toLowerCase().includes(pesquisa.toLowerCase());

    const correspondeFiltro =
      filtro === "Todas as turmas" || item.turno === filtro;

    return correspondePesquisa && correspondeFiltro;
  });

  // PAGINAÇÃO
  const totalPaginas = Math.ceil(
    turmasFiltradas.length / itensPorPagina
  );

  const paginaSegura = Math.min(
    paginaAtual,
    Math.max(totalPaginas, 1)
  );

  const indiceInicial = (paginaSegura - 1) * itensPorPagina;

  const turmasPaginadas = turmasFiltradas.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  const primeiroItem =
    turmasFiltradas.length === 0 ? 0 : indiceInicial + 1;

  const ultimoItem = Math.min(
    indiceInicial + itensPorPagina,
    turmasFiltradas.length
  );

  // CADASTRAR TURMA
  function cadastrarTurma(e) {
    e.preventDefault();

    if (
      !novaTurma.turma.trim() ||
      !novaTurma.curso.trim() ||
      !novaTurma.turno ||
      novaTurma.alunos === ""
    ) {
      return;
    }

    setTurmas((turmasAnteriores) => [
      ...turmasAnteriores,
      {
        id: Date.now(),
        turma: novaTurma.turma.toUpperCase(),
        curso: novaTurma.curso,
        turno: novaTurma.turno,
        alunos: Number(novaTurma.alunos),
        atrasos: 0,
      },
    ]);

    setNovaTurma({
      turma: "",
      curso: "",
      turno: "",
      alunos: "",
    });

    setPaginaAtual(1);
    setModalNova(false);
  }

  return (
    <div className="minhas-turmas-container">
      <Sidebar role="professor" />

      <main className="minhas-turmas-main">
        {/* CABEÇALHO */}
        <header className="minhas-turmas-header">
          <h2>
            <button
              type="button"
              className="minhas-turmas-voltar"
              onClick={() => navigate(-1)}
              aria-label="Voltar"
            >
              <img src={backArrowIcon} alt="" />
            </button>
            Minhas Turmas
          </h2>

          <p>
            Visualize as turmas que você administra e acompanhe
            o número de alunos e atrasos.
          </p>
        </header>

        {/* PESQUISA E FILTROS */}
        <section className="minhas-turmas-filtros">
          <div className="minhas-turmas-busca">
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>

            <input
              type="text"
              placeholder="Buscar por turma..."
              value={pesquisa}
              onChange={(e) => {
                setPesquisa(e.target.value);
                setPaginaAtual(1);
              }}
            />
          </div>

          <select
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value);
              setPaginaAtual(1);
            }}
          >
            <option>Todas as turmas</option>
            <option>Manhã</option>
            <option>Tarde</option>
            <option>Integral</option>
          </select>

          <button
            className="minhas-turmas-nova"
            onClick={() => setModalNova(true)}
          >
            <span>＋</span> Nova Turma
          </button>
        </section>

        {/* TABELA */}
        <section className="minhas-turmas-tabela-container">
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
              {turmasPaginadas.map((item) => (
                <tr key={item.id}>
                  <td className="minhas-turmas-nome">{item.turma}</td>
                  <td>{item.curso}</td>
                  <td>{item.turno}</td>
                  <td className="minhas-turmas-total">{item.alunos}</td>
                  <td>
                    <span
                      className={`minhas-turmas-atrasos ${
                        item.atrasos === 0 ? "sem-atrasos" : ""
                      }`}
                    >
                      {item.atrasos}
                    </span>
                  </td>
                  <td>
                    <button
                      className="minhas-turmas-ver"
                      onClick={() => setTurmaSelecionada(item)}
                    >
                      Ver Turma ❯
                    </button>
                  </td>
                </tr>
              ))}

              {turmasFiltradas.length === 0 && (
                <tr>
                  <td colSpan="6" className="minhas-turmas-vazio">
                    Nenhuma turma encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* PAGINAÇÃO */}
        <div className="minhas-turmas-paginacao">
          <span className="minhas-turmas-mostrando">
            Mostrando {primeiroItem}–{ultimoItem} de {turmasFiltradas.length}
          </span>

          <div className="minhas-turmas-paginas">
            <button
              className="minhas-turmas-seta"
              disabled={paginaSegura === 1}
              onClick={() => setPaginaAtual((pagina) => Math.max(1, pagina - 1))}
              aria-label="Página anterior"
            >
              ‹
            </button>

            {Array.from(
              { length: totalPaginas },
              (_, index) => index + 1
            ).map((pagina) => (
              <button
                key={pagina}
                className={`minhas-turmas-numero ${
                  paginaSegura === pagina ? "pagina-ativa" : ""
                }`}
                onClick={() => setPaginaAtual(pagina)}
              >
                {pagina}
              </button>
            ))}

            <button
              className="minhas-turmas-seta"
              disabled={paginaSegura >= totalPaginas || totalPaginas === 0}
              onClick={() =>
                setPaginaAtual((pagina) =>
                  Math.min(totalPaginas, pagina + 1)
                )
              }
              aria-label="Próxima página"
            >
              ›
            </button>
          </div>
        </div>
      </main>

      {/* MODAL NOVA TURMA */}
      {modalNova && (
        <div
          className="minhas-turmas-modal-fundo"
          onClick={() => setModalNova(false)}
        >
          <div
            className="minhas-turmas-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Nova Turma</h2>

            <p>
              Preencha as informações para cadastrar uma turma.
            </p>

            <form onSubmit={cadastrarTurma}>
              <label>Nome da turma</label>
              <input
                type="text"
                placeholder="Ex: DEV-M"
                value={novaTurma.turma}
                onChange={(e) =>
                  setNovaTurma({
                    ...novaTurma,
                    turma: e.target.value,
                  })
                }
                required
              />

              <label>Curso</label>
              <input
                type="text"
                placeholder="Digite o curso"
                value={novaTurma.curso}
                onChange={(e) =>
                  setNovaTurma({
                    ...novaTurma,
                    curso: e.target.value,
                  })
                }
                required
              />

              <label>Turno</label>
              <select
                value={novaTurma.turno}
                onChange={(e) =>
                  setNovaTurma({
                    ...novaTurma,
                    turno: e.target.value,
                  })
                }
                required
              >
                <option value="">Selecione o turno</option>
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Integral</option>
              </select>

              <label>Total de alunos</label>
              <input
                type="number"
                min="0"
                placeholder="Quantidade de alunos"
                value={novaTurma.alunos}
                onChange={(e) =>
                  setNovaTurma({
                    ...novaTurma,
                    alunos: e.target.value,
                  })
                }
                required
              />

              <div className="minhas-turmas-modal-botoes">
                <button
                  type="button"
                  className="minhas-turmas-cancelar"
                  onClick={() => setModalNova(false)}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="minhas-turmas-salvar"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VER TURMA */}
      {turmaSelecionada && (
        <div
          className="minhas-turmas-modal-fundo"
          onClick={() => setTurmaSelecionada(null)}
        >
          <div
            className="minhas-turmas-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Informações da Turma</h2>

            <p>
              <strong>Turma:</strong> {turmaSelecionada.turma}
            </p>

            <p>
              <strong>Curso:</strong> {turmaSelecionada.curso}
            </p>

            <p>
              <strong>Turno:</strong> {turmaSelecionada.turno}
            </p>

            <p>
              <strong>Total de alunos:</strong> {turmaSelecionada.alunos}
            </p>

            <p>
              <strong>Atrasos hoje:</strong> {turmaSelecionada.atrasos}
            </p>

            <button
              className="minhas-turmas-salvar"
              onClick={() => setTurmaSelecionada(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TelaMinhasTurmas;
