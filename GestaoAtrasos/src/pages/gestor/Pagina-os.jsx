
import { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Bell,
  Plus,
  Search,
  SlidersHorizontal,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

import Menu from "../../components/navigation/gestor/MenuOrdensServico.jsx";
import "../../css/gestor/variantes/App-src-telas-os-src.css";



const modelosOS = [
  {
    aluno: "João Silva",
    turma: "T1A",
    motivo: "Atraso recorrente",
    prioridade: "Alta",
    status: "Andamento"
  },
  {
    aluno: "Lucas Ferreira",
    turma: "T2B",
    motivo: "Atraso recorrente",
    prioridade: "Média",
    status: "Pendente"
  },
  {
    aluno: "Beatriz Souza",
    turma: "T1B",
    motivo: "Justificativa",
    prioridade: "Baixa",
    status: "Andamento"
  },
  {
    aluno: "Rafael Costa",
    turma: "T3A",
    motivo: "Atraso recorrente",
    prioridade: "Alta",
    status: "Pendente"
  },
  {
    aluno: "Juliana Alves",
    turma: "T2A",
    motivo: "Questão pessoal",
    prioridade: "Média",
    status: "Concluída"
  }
];

const nomesExtras = [
  "Mariana Oliveira",
  "Pedro Henrique",
  "Ana Clara",
  "Gabriel Santos",
  "Camila Rodrigues"
];

const ordensIniciais = Array.from({ length: 25 }, (_, index) => {
  const modelo = modelosOS[index % modelosOS.length];

  return {
    id: `OS-${String(125 - index).padStart(5, "0")}`,
    ...modelo,
    aluno:
      index < 5
        ? modelo.aluno
        : nomesExtras[(index - 5) % nomesExtras.length]
  };
});

export default function App() {
  const [ordens, setOrdens] = useState(ordensIniciais);
  const [busca, setBusca] = useState("");
  const [turma, setTurma] = useState("Todas");
  const [status, setStatus] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [modal, setModal] = useState(null);
  const [menuAcao, setMenuAcao] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(true);

  const [novaOS, setNovaOS] = useState({
    aluno: "",
    turma: "T1A",
    motivo: "",
    prioridade: "Média"
  });

 

  useEffect(() => {
    function fecharEscape(event) {
      if (event.key === "Escape") {
        setModal(null);
        setMenuAcao(null);
      }
    }

    window.addEventListener("keydown", fecharEscape);

    return () => {
      window.removeEventListener("keydown", fecharEscape);
    };
  }, []);



  const ordensFiltradas = useMemo(() => {
    return ordens.filter((os) => {
      const texto = busca.toLowerCase();

      const correspondeBusca =
        os.aluno.toLowerCase().includes(texto) ||
        os.turma.toLowerCase().includes(texto) ||
        os.id.toLowerCase().includes(texto);

      const correspondeTurma =
        turma === "Todas" || os.turma === turma;

      const correspondeStatus =
        status === "Todos" || os.status === status;

      return (
        correspondeBusca &&
        correspondeTurma &&
        correspondeStatus
      );
    });
  }, [ordens, busca, turma, status]);



  const porPagina = 5;

  const totalPaginas = Math.max(
    1,
    Math.ceil(ordensFiltradas.length / porPagina)
  );

  const paginaAtual = Math.min(pagina, totalPaginas);

  const ordensExibidas = ordensFiltradas.slice(
    (paginaAtual - 1) * porPagina,
    paginaAtual * porPagina
  );

  

  function criarOS(event) {
    event.preventDefault();

    const maiorNumero = Math.max(
      125,
      ...ordens.map((os) => Number(os.id.replace("OS-", "")))
    );

    const novaOrdem = {
      id: `OS-${String(maiorNumero + 1).padStart(5, "0")}`,
      ...novaOS,
      status: "Pendente"
    };

    setOrdens((anteriores) => [novaOrdem, ...anteriores]);

    setPagina(1);
    setBusca("");
    setTurma("Todas");
    setStatus("Todos");
    setModal(null);

    setNovaOS({
      aluno: "",
      turma: "T1A",
      motivo: "",
      prioridade: "Média"
    });
  }

  /* ALTERAR STATUS */

  function alterarStatus(id, novoStatus) {
    setOrdens((anteriores) =>
      anteriores.map((os) =>
        os.id === id
          ? { ...os, status: novoStatus }
          : os
      )
    );

    setMenuAcao(null);
  }

  return (
    <div className="dashboard">

    

      <Menu />

     

      <main className="conteudo">
        <div className="area-ordens">

         

          <header className="cabecalho-ordens">

            <div className="titulo-ordens">
              <ArrowLeft size={25} />

              <div>
                <h1>Ordens de serviço</h1>
                <p>
                  Acompanhe e gerencie as ocorrências dos alunos.
                </p>
              </div>
            </div>

            <div className="acoes-cabecalho">

              <div className="data-atual">
                <Bell size={20} />

                <span>
                  Seg, 10 de mar de 2026
                  <br />
                  14:32
                </span>
              </div>

              <button
                className="botao-nova"
                onClick={() => setModal({ tipo: "nova" })}
              >
                <Plus size={17} />
                Nova OS
              </button>

            </div>
          </header>

          

          <div className="barra-filtros">

            <div className="campo-busca">
              <Search size={17} />

              <input
                type="text"
                placeholder="Buscar por aluno ou turma..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setPagina(1);
                }}
              />
            </div>

            {mostrarFiltros && (
              <>
                <select
                  value={turma}
                  onChange={(e) => {
                    setTurma(e.target.value);
                    setPagina(1);
                  }}
                >
                  <option value="Todas">Todas as turmas</option>
                  <option value="T1A">T1A</option>
                  <option value="T1B">T1B</option>
                  <option value="T2A">T2A</option>
                  <option value="T2B">T2B</option>
                  <option value="T3A">T3A</option>
                </select>

                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPagina(1);
                  }}
                >
                  <option value="Todos">Todos os status</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Andamento">Andamento</option>
                  <option value="Concluída">Concluída</option>
                </select>

                <div className="campo-data">
                  01/03/2026 - 10/03/2026
                </div>
              </>
            )}

            <button
              className="botao-filtros"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
            >
              <SlidersHorizontal size={17} />
              Filtros
            </button>

          </div>


          <div className="tabela-scroll">
            <table className="tabela-os">

              <thead>
                <tr>
                  <th>N°OS</th>
                  <th>Aluno</th>
                  <th>Turma</th>
                  <th>Motivo</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {ordensExibidas.map((os) => (
                  <tr key={os.id}>

                    <td>{os.id}</td>

                    <td className="nome-aluno">
                      {os.aluno}
                    </td>

                    <td>{os.turma}</td>

                    <td>{os.motivo}</td>

                    <td>
                      <span
                        className={`prioridade ${
                          os.prioridade === "Média"
                            ? "media"
                            : os.prioridade.toLowerCase()
                        }`}
                      >
                        {os.prioridade}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status status-${os.status.toLowerCase()}`}
                      >
                        {os.status}
                      </span>
                    </td>

                    <td>
                      <div className="acoes-linha">

                        <button
                          title="Visualizar"
                          onClick={() =>
                            setModal({ tipo: "detalhes", os })
                          }
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          title="Mais opções"
                          onClick={() =>
                            setMenuAcao(
                              menuAcao === os.id ? null : os.id
                            )
                          }
                        >
                          <MoreVertical size={18} />
                        </button>

                        {menuAcao === os.id && (
                          <div className="menu-acoes">

                            <button
                              onClick={() =>
                                alterarStatus(os.id, "Pendente")
                              }
                            >
                              Pendente
                            </button>

                            <button
                              onClick={() =>
                                alterarStatus(os.id, "Andamento")
                              }
                            >
                              Em andamento
                            </button>

                            <button
                              onClick={() =>
                                alterarStatus(os.id, "Concluída")
                              }
                            >
                              Concluir
                            </button>

                          </div>
                        )}

                      </div>
                    </td>

                  </tr>
                ))}

                {ordensExibidas.length === 0 && (
                  <tr>
                    <td colSpan="7" className="sem-resultados">
                      Nenhuma ordem encontrada.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>


          <div className="rodape-tabela">

            <span>
              Mostrando{" "}
              {ordensFiltradas.length === 0
                ? 0
                : (paginaAtual - 1) * porPagina + 1}
              {" - "}
              {Math.min(
                paginaAtual * porPagina,
                ordensFiltradas.length
              )}
              {" de "}
              {ordensFiltradas.length}
            </span>

            <div className="paginacao">

              <button
                disabled={paginaAtual === 1}
                onClick={() => setPagina(paginaAtual - 1)}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from(
                { length: totalPaginas },
                (_, index) => (
                  <button
                    key={index}
                    className={
                      paginaAtual === index + 1
                        ? "pagina-ativa"
                        : ""
                    }
                    onClick={() => setPagina(index + 1)}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                disabled={paginaAtual === totalPaginas}
                onClick={() => setPagina(paginaAtual + 1)}
              >
                <ChevronRight size={16} />
              </button>

            </div>
          </div>

        </div>
      </main>

      {/* MODAIS */}

      {modal && (
        <div
          className="modal-fundo"
          onClick={() => setModal(null)}
        >
          <div
            className="modal-caixa"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-fechar"
              onClick={() => setModal(null)}
            >
              <X size={22} />
            </button>

            {modal.tipo === "nova" ? (
              <>
                <h2>Nova ordem de serviço</h2>

                <form
                  className="formulario-os"
                  onSubmit={criarOS}
                >

                  <label>
                    Nome do aluno
                    <input
                      required
                      value={novaOS.aluno}
                      onChange={(e) =>
                        setNovaOS({
                          ...novaOS,
                          aluno: e.target.value
                        })
                      }
                    />
                  </label>

                  <label>
                    Turma
                    <select
                      value={novaOS.turma}
                      onChange={(e) =>
                        setNovaOS({
                          ...novaOS,
                          turma: e.target.value
                        })
                      }
                    >
                      <option>T1A</option>
                      <option>T1B</option>
                      <option>T2A</option>
                      <option>T2B</option>
                      <option>T3A</option>
                    </select>
                  </label>

                  <label>
                    Motivo
                    <input
                      required
                      value={novaOS.motivo}
                      onChange={(e) =>
                        setNovaOS({
                          ...novaOS,
                          motivo: e.target.value
                        })
                      }
                    />
                  </label>

                  <label>
                    Prioridade
                    <select
                      value={novaOS.prioridade}
                      onChange={(e) =>
                        setNovaOS({
                          ...novaOS,
                          prioridade: e.target.value
                        })
                      }
                    >
                      <option>Alta</option>
                      <option>Média</option>
                      <option>Baixa</option>
                    </select>
                  </label>

                  <button type="submit" className="botao-nova">
                    Salvar OS
                  </button>

                </form>
              </>
            ) : (
              <>
                <h2>Detalhes da OS</h2>

                <p><strong>Número:</strong> {modal.os.id}</p>
                <p><strong>Aluno:</strong> {modal.os.aluno}</p>
                <p><strong>Turma:</strong> {modal.os.turma}</p>
                <p><strong>Motivo:</strong> {modal.os.motivo}</p>
                <p><strong>Prioridade:</strong> {modal.os.prioridade}</p>
                <p><strong>Status:</strong> {modal.os.status}</p>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
