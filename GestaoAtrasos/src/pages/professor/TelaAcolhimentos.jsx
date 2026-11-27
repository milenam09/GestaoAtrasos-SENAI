import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar/index.js";
import backArrowIcon from "../../assets/vector-4.png";
import "../../css/professor/TelaAcolhimentos.css";

const ocorrencias = [
  {
    numero: "Os-00125",
    aluno: "Joao Silva",
    turma: "T1A",
    motivo: "Atraso recorrente",
    prioridade: "Alta",
    status: "Andamento",
  },
  {
    numero: "Os-00126",
    aluno: "Milena Mares",
    turma: "T3A",
    motivo: "Atraso recorrente",
    prioridade: "Média",
    status: "Pendente",
  },
  {
    numero: "Os-00124",
    aluno: "Beatryz Paz",
    turma: "T2B",
    motivo: "Justificativa",
    prioridade: "Baixa",
    status: "Andamento",
  },
  {
    numero: "Os-00118",
    aluno: "Anna Beatriz",
    turma: "T2A",
    motivo: "Atraso recorrente",
    prioridade: "Alta",
    status: "Pendente",
  },
  {
    numero: "Os-00107",
    aluno: "Isabela Garcia",
    turma: "T2B",
    motivo: "Questão Pessoal",
    prioridade: "Média",
    status: "Concluída",
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    numero: `Os-${String(126 + i).padStart(5, "0")}`,
    aluno: ["Lucas Santos", "Maria Clara", "Pedro Henrique", "Ana Julia"][i % 4],
    turma: ["T1A", "T2A", "T2B", "T3A"][i % 4],
    motivo: ["Atraso recorrente", "Justificativa", "Questão Pessoal"][i % 3],
    prioridade: ["Alta", "Média", "Baixa"][i % 3],
    status: ["Pendente", "Andamento", "Concluída"][i % 3],
  })),
];

function TelaAcolhimentos() {
  const navigate = useNavigate();
  const [pesquisa, setPesquisa] = useState("");
  const [turma, setTurma] = useState("Todas as turmas");
  const [status, setStatus] = useState("Todos os status");
  const [pagina, setPagina] = useState(1);
  const [selecionada, setSelecionada] = useState(null);
  const [novaOS, setNovaOS] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null);

  const filtradas = ocorrencias.filter((item) => {
    const texto = pesquisa.toLowerCase();

    return (
      (item.aluno.toLowerCase().includes(texto) ||
        item.numero.toLowerCase().includes(texto) ||
        item.motivo.toLowerCase().includes(texto)) &&
      (turma === "Todas as turmas" || item.turma === turma) &&
      (status === "Todos os status" || item.status === status)
    );
  });

  const porPagina = 5;
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const inicio = (paginaSegura - 1) * porPagina;
  const exibidas = filtradas.slice(inicio, inicio + porPagina);

  function mudarFiltro(callback, valor) {
    callback(valor);
    setPagina(1);
  }

  return (
    <div className="acolhimentos-container">
      <Sidebar role="professor" />

      <main className="acolhimentos-main">
        <header className="acolhimentos-header">
          <h2>
            <button
              type="button"
              className="acolhimentos-voltar"
              onClick={() => navigate(-1)}
              aria-label="Voltar"
            >
              <img src={backArrowIcon} alt="" />
            </button>
            Acolhimentos
          </h2>
          <p>Acompanhe as ocorrências encaminhadas para AQV</p>
        </header>

        <section className="acolhimentos-filtros">
          <div className="acolhimentos-busca">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Buscar por aluno, turma ou motivo..."
              value={pesquisa}
              onChange={(e) => mudarFiltro(setPesquisa, e.target.value)}
            />
          </div>

          <select
            value={turma}
            onChange={(e) => mudarFiltro(setTurma, e.target.value)}
          >
            <option>Todas as turmas</option>
            <option>T1A</option>
            <option>T2A</option>
            <option>T2B</option>
            <option>T3A</option>
          </select>

          <select
            value={status}
            onChange={(e) => mudarFiltro(setStatus, e.target.value)}
          >
            <option>Todos os status</option>
            <option>Pendente</option>
            <option>Andamento</option>
            <option>Concluída</option>
          </select>

          <button
            className="acolhimentos-nova-os"
            onClick={() => setNovaOS(true)}
          >
            + Nova OS
          </button>
        </section>

        <section className="acolhimentos-tabela-container">
          <table className="acolhimentos-tabela">
            <thead>
              <tr>
                <th>Nº OS</th>
                <th>Aluno</th>
                <th>Turmas</th>
                <th>Motivo</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {exibidas.map((item, index) => (
                <tr key={item.numero}>
                  <td className="numero-os">{item.numero}</td>
                  <td className="nome-aluno">{item.aluno}</td>
                  <td className="nome-turma">{item.turma}</td>
                  <td className="motivo-os">{item.motivo}</td>
                  <td>
                    <span className={`prioridade ${item.prioridade.toLowerCase()}`}>
                      {item.prioridade}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="acoes-os">
                    <button
                      title="Visualizar"
                      onClick={() => setSelecionada(item)}
                    >
                      ◉
                    </button>

                    <button
                      title="Mais opções"
                      onClick={() =>
                        setMenuAberto(menuAberto === index ? null : index)
                      }
                    >
                      ⋮
                    </button>

                    {menuAberto === index && (
                      <div className="acolhimentos-menu-acoes">
                        <button
                          onClick={() => {
                            setSelecionada(item);
                            setMenuAberto(null);
                          }}
                        >
                          Ver detalhes
                        </button>
                        <button onClick={() => setMenuAberto(null)}>
                          Fechar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {exibidas.length === 0 && (
                <tr>
                  <td colSpan="7" className="acolhimentos-vazio">
                    Nenhuma ocorrência encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <footer className="acolhimentos-paginacao">
          <span>
            Mostrando {filtradas.length === 0 ? 0 : inicio + 1} -{" "}
            {Math.min(inicio + porPagina, filtradas.length)} de {filtradas.length}
          </span>

          <div className="acolhimentos-paginas">
            <button
              onClick={() => setPagina(Math.max(1, paginaSegura - 1))}
              disabled={paginaSegura === 1}
            >
              ‹
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                className={paginaSegura === i + 1 ? "pagina-ativa" : ""}
                onClick={() => setPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPagina(Math.min(totalPaginas, paginaSegura + 1))}
              disabled={paginaSegura === totalPaginas}
            >
              ›
            </button>
          </div>
        </footer>
      </main>

      {selecionada && (
        <div
          className="acolhimentos-modal-fundo"
          onClick={() => setSelecionada(null)}
        >
          <div
            className="acolhimentos-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Detalhes do Acolhimento</h2>
            <p><strong>Nº OS:</strong> {selecionada.numero}</p>
            <p><strong>Aluno:</strong> {selecionada.aluno}</p>
            <p><strong>Turma:</strong> {selecionada.turma}</p>
            <p><strong>Motivo:</strong> {selecionada.motivo}</p>
            <p><strong>Prioridade:</strong> {selecionada.prioridade}</p>
            <p><strong>Status:</strong> {selecionada.status}</p>
            <button onClick={() => setSelecionada(null)}>Fechar</button>
          </div>
        </div>
      )}

      {novaOS && (
        <div
          className="acolhimentos-modal-fundo"
          onClick={() => setNovaOS(false)}
        >
          <div
            className="acolhimentos-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Nova OS</h2>
            <p>Cadastro de ocorrência em desenvolvimento.</p>
            <button className="acolhimentos-fechar-modal" onClick={() => setNovaOS(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TelaAcolhimentos;
