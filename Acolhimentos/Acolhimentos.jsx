
import { useState } from "react";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  Plus,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "./Acolhimentos.css";

const dadosIniciais = [
  { numero: "00125", aluno: "Joao Silva", turma: "TIA", motivo: "Atraso recorrente", prioridade: "Alta", status: "Andamento" },
  { numero: "00126", aluno: "Milena Mares", turma: "T3A", motivo: "Atraso recorrente", prioridade: "Média", status: "Pendente" },
  { numero: "00124", aluno: "Beatryz Paz", turma: "T2B", motivo: "Justificativa", prioridade: "Baixa", status: "Andamento" },
  { numero: "00118", aluno: "Anna Beatriz", turma: "T2A", motivo: "Atraso recorrente", prioridade: "Alta", status: "Pendente" },
  { numero: "00107", aluno: "Isabela Garcia", turma: "T2B", motivo: "Questao Pessoal", prioridade: "Média", status: "Concluída" },
  { numero: "00109", aluno: "Pedro Santos", turma: "TIA", motivo: "Falta recorrente", prioridade: "Alta", status: "Pendente" },
  { numero: "00110", aluno: "Julia Costa", turma: "T3A", motivo: "Justificativa", prioridade: "Baixa", status: "Concluída" },
  { numero: "00111", aluno: "Lucas Mendes", turma: "T2A", motivo: "Atraso recorrente", prioridade: "Média", status: "Andamento" },
  { numero: "00112", aluno: "Ana Clara", turma: "T2B", motivo: "Questao Pessoal", prioridade: "Baixa", status: "Pendente" },
  { numero: "00113", aluno: "Gabriel Lima", turma: "TIA", motivo: "Falta recorrente", prioridade: "Alta", status: "Andamento" },
];

export default function Acolhimentos({ telaAtiva = "Acolhimentos", onNavegar }) {
  const [ocorrencias, setOcorrencias] = useState(dadosIniciais);
  const [busca, setBusca] = useState("");
  const [turma, setTurma] = useState("Todas as turmas");
  const [status, setStatus] = useState("Todos os status");
  const [pagina, setPagina] = useState(1);
  const [selecionada, setSelecionada] = useState(null);
  const [campoClicado, setCampoClicado] = useState("");
  const [novaOS, setNovaOS] = useState(false);
  const [alunoNovo, setAlunoNovo] = useState("");
  const [turmaNova, setTurmaNova] = useState("TIA");
  const [motivoNovo, setMotivoNovo] = useState("Atraso recorrente");

  const filtradas = ocorrencias.filter((item) => {
    const texto =
      `${item.numero} ${item.aluno} ${item.turma} ${item.motivo}`.toLowerCase();

    return (
      texto.includes(busca.toLowerCase()) &&
      (turma === "Todas as turmas" || item.turma === turma) &&
      (status === "Todos os status" || item.status === status)
    );
  });

  const porPagina = 5;
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / porPagina));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const visiveis = filtradas.slice(
    (paginaAtual - 1) * porPagina,
    paginaAtual * porPagina
  );

  function cadastrarOS(evento) {
    evento.preventDefault();
    if (!alunoNovo.trim()) return;

    const maiorNumero = Math.max(
      0,
      ...ocorrencias.map((item) => Number(item.numero))
    );

    const nova = {
      numero: String(maiorNumero + 1).padStart(5, "0"),
      aluno: alunoNovo.trim(),
      turma: turmaNova,
      motivo: motivoNovo,
      prioridade: "Média",
      status: "Pendente",
    };

    setOcorrencias((anteriores) => [nova, ...anteriores]);
    setBusca("");
    setTurma("Todas as turmas");
    setStatus("Todos os status");
    setPagina(1);
    setAlunoNovo("");
    setNovaOS(false);
  }

  return (
    <div className="professor-app">
      <div className="layout-professor">
      <Sidebar telaAtiva={telaAtiva} onNavegar={onNavegar} />

        <main className="conteudo-acolhimentos">
          <div className="cabecalho-pagina">
            <button
              className="voltar"
              onClick={() => window.history.back()}
              aria-label="Voltar"
            >
              <ArrowLeft size={31} strokeWidth={3} />
            </button>

            <div>
              <h2>Acolhimentos</h2>
              <p>Acompanhe as ocorrências encaminhadas para AQV</p>
            </div>
          </div>

          <div className="ferramentas">
            <label
              className={`campo-busca ${campoClicado === "busca" ? "campo-ativo" : ""}`}
              onClick={() => setCampoClicado("busca")}
            >
              <Search size={20} />
              <input
                value={busca}
                onFocus={() => setCampoClicado("busca")}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setPagina(1);
                }}
                placeholder="Buscar por aluno, turma ou motivo..."
              />
            </label>

            <div
              className={`campo-select ${campoClicado === "turma" ? "campo-ativo" : ""}`}
            >
              <select
                value={turma}
                onFocus={() => setCampoClicado("turma")}
                onClick={() => setCampoClicado("turma")}
                onChange={(e) => {
                  setTurma(e.target.value);
                  setPagina(1);
                }}
                aria-label="Filtrar turma"
              >
                <option>Todas as turmas</option>
                <option>TIA</option>
                <option>T2A</option>
                <option>T2B</option>
                <option>T3A</option>
              </select>
              <ChevronDown size={16} />
            </div>

            <div
              className={`campo-select ${campoClicado === "status" ? "campo-ativo" : ""}`}
            >
              <select
                value={status}
                onFocus={() => setCampoClicado("status")}
                onClick={() => setCampoClicado("status")}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPagina(1);
                }}
                aria-label="Filtrar status"
              >
                <option>Todos os status</option>
                <option>Andamento</option>
                <option>Pendente</option>
                <option>Concluída</option>
              </select>
              <ChevronDown size={16} />
            </div>

            <button
              className="botao-nova-os"
              onClick={() => {
                setCampoClicado("");
                setNovaOS(true);
              }}
            >
              <Plus size={17} /> Nova OS
            </button>
          </div>

          <div className="tabela-container">
            <table className="tabela-os">
              <thead>
                <tr>
                  <th>NºOS</th>
                  <th>Aluno</th>
                  <th>Turmas</th>
                  <th>Motivo</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {visiveis.map((item) => (
                  <tr key={item.numero}>
                    <td>Os-{item.numero}</td>
                    <td>{item.aluno}</td>
                    <td>{item.turma}</td>
                    <td className="motivo">{item.motivo}</td>
                    <td>
                      <span
                        className={`etiqueta prioridade-${item.prioridade === "Média" ? "media" : item.prioridade.toLowerCase()}`}
                      >
                        {item.prioridade}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`etiqueta status-${item.status === "Andamento" ? "andamento" : item.status === "Pendente" ? "pendente" : "concluida"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="acoes">
                        <button
                          title="Ver detalhes"
                          aria-label="Ver detalhes"
                          onClick={() => setSelecionada(item)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="Mais opções"
                          aria-label="Mais opções"
                          onClick={() => setSelecionada(item)}
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visiveis.length === 0 && (
                  <tr>
                    <td colSpan="7" className="sem-resultados">
                      Nenhuma ocorrência encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="paginacao">
            <strong>
              Mostrando{" "}
              {filtradas.length === 0
                ? 0
                : (paginaAtual - 1) * porPagina + 1}
              {" - "}
              {Math.min(paginaAtual * porPagina, filtradas.length)} de{" "}
              {filtradas.length}
            </strong>

            <div className="botoes-pagina">
              <button
                disabled={paginaAtual === 1}
                onClick={() => setPagina(paginaAtual - 1)}
                aria-label="Página anterior"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                (n) => (
                  <button
                    key={n}
                    className={paginaAtual === n ? "pagina-ativa" : ""}
                    onClick={() => setPagina(n)}
                  >
                    {n}
                  </button>
                )
              )}

              <button
                disabled={paginaAtual === totalPaginas}
                onClick={() => setPagina(paginaAtual + 1)}
                aria-label="Próxima página"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </footer>
        </main>
      </div>

      {(novaOS || selecionada) && (
        <div
          className="fundo-modal"
          onClick={() => {
            setNovaOS(false);
            setSelecionada(null);
          }}
        >
          <section
            className="modal-os"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="fechar-modal"
              onClick={() => {
                setNovaOS(false);
                setSelecionada(null);
              }}
              aria-label="Fechar"
            >
              <X size={22} />
            </button>

            {novaOS ? (
              <>
                <h2>Nova OS</h2>
                <p>Cadastre uma nova ocorrência de acolhimento.</p>

                <form onSubmit={cadastrarOS}>
                  <label>
                    Nome do aluno
                    <input
                      value={alunoNovo}
                      onChange={(e) => setAlunoNovo(e.target.value)}
                      placeholder="Digite o nome do aluno"
                      required
                    />
                  </label>

                  <label>
                    Turma
                    <select
                      value={turmaNova}
                      onChange={(e) => setTurmaNova(e.target.value)}
                    >
                      <option>TIA</option>
                      <option>T2A</option>
                      <option>T2B</option>
                      <option>T3A</option>
                    </select>
                  </label>

                  <label>
                    Motivo
                    <select
                      value={motivoNovo}
                      onChange={(e) => setMotivoNovo(e.target.value)}
                    >
                      <option>Atraso recorrente</option>
                      <option>Justificativa</option>
                      <option>Questao Pessoal</option>
                      <option>Falta recorrente</option>
                    </select>
                  </label>

                  <button className="botao-nova-os" type="submit">
                    Cadastrar OS
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2>Detalhes da OS-{selecionada.numero}</h2>
                <p><strong>Aluno:</strong> {selecionada.aluno}</p>
                <p><strong>Turma:</strong> {selecionada.turma}</p>
                <p><strong>Motivo:</strong> {selecionada.motivo}</p>
                <p><strong>Prioridade:</strong> {selecionada.prioridade}</p>

                <label>
                  Atualizar status
                  <select
                    value={selecionada.status}
                    onChange={(e) => {
                      const novoStatus = e.target.value;

                      setOcorrencias((anteriores) =>
                        anteriores.map((o) =>
                          o.numero === selecionada.numero
                            ? { ...o, status: novoStatus }
                            : o
                        )
                      );

                      setSelecionada({
                        ...selecionada,
                        status: novoStatus,
                      });
                    }}
                  >
                    <option>Pendente</option>
                    <option>Andamento</option>
                    <option>Concluída</option>
                  </select>
                </label>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
