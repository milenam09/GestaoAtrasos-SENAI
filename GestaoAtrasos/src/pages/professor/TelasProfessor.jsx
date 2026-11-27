import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock,
  Eye,
  Hexagon,
  Home,
  Plus,
  Search,
  UserRound,
  Users,
} from "lucide-react";
import {
  CardKpi,
  ContatoConteudo,
  ModalPainel,
  PaginacaoPainel,
  PainelLayout,
  PerfilConteudo,
  RelatoriosConteudo,
  StatusBadge,
  TabelaPainel,
} from "../../components/layout/PainelDemo.jsx";
import { hojeFormatado, perfilProfessor, useMockSistema } from "../../data/mockSistema.js";

const LINKS_PROFESSOR = [
  { para: "/professor/inicio", rotulo: "Início", Icone: Home },
  { para: "/professor/turmas", rotulo: "Minhas Turmas", Icone: Users },
  { para: "/professor/alunos", rotulo: "Alunos", Icone: UserRound },
  { para: "/professor/registrar-atraso", rotulo: "Registrar Atraso", Icone: Clock },
  { para: "/professor/ocorrencias", rotulo: "Ocorrências", Icone: ClipboardList },
  { para: "/professor/relatorios", rotulo: "Relatórios", Icone: BarChart3 },
  { para: "/professor/perfil", rotulo: "Perfil", Icone: UserRound },
];

function EstruturaProfessor({ titulo, subtitulo, acoes, mostrarVoltar = false, children }) {
  return (
    <PainelLayout
      usuario={perfilProfessor}
      links={LINKS_PROFESSOR}
      rotaInicio="/professor/inicio"
      titulo={titulo}
      subtitulo={subtitulo}
      acoes={acoes}
      mostrarVoltar={mostrarVoltar}
    >
      {children}
    </PainelLayout>
  );
}

export function InicioProfessor() {
  const { dados } = useMockSistema();
  const navigate = useNavigate();

  const minhasTurmas = dados.turmas.filter((t) => t.minhaTurma);
  const codigosMinhas = new Set(minhasTurmas.map((t) => t.codigo));

  const totalAlunos = minhasTurmas.reduce((acc, t) => acc + t.totalAlunos, 0);
  const atrasosHoje = minhasTurmas.reduce((acc, t) => acc + t.atrasosHoje, 0);
  const minhasOcorrencias = dados.ocorrencias.filter((o) => codigosMinhas.has(o.turma));
  const emAtendimento = minhasOcorrencias.filter((o) =>
    ["Em andamento", "Aguardando retorno", "Pendente"].includes(o.status)
  ).length;
  const concluidos = minhasOcorrencias.filter((o) => o.status === "Concluída").length;

  const topAlunos = dados.alunos
    .filter((a) => codigosMinhas.has(a.turma))
    .slice()
    .sort((a, b) => b.ocorrencias - a.ocorrencias)
    .slice(0, 5);

  return (
    <EstruturaProfessor
      titulo={`Olá, ${perfilProfessor.nomeCurto}!`}
      subtitulo="Veja o resumo das suas turmas e acompanhe os atrasos dos alunos."
      acoes={
        <Link className="pd-btn" to="/professor/registrar-atraso">
          <Plus size={16} /> Registrar atraso
        </Link>
      }
    >
      <section className="pd-kpi-grid">
        <CardKpi
          titulo="Total de alunos"
          valor={totalAlunos}
          descricao={`Em ${minhasTurmas.length} turmas atribuídas.`}
          cor="vermelho"
          Icone={Users}
        />
        <CardKpi
          titulo="Atrasos hoje"
          valor={atrasosHoje}
          descricao="Registrados nas suas turmas."
          cor="laranja"
          Icone={ClipboardList}
        />
        <CardKpi
          titulo="Em atendimento"
          valor={emAtendimento}
          descricao="Aguardando retorno ou análise."
          cor="roxo"
          Icone={Hexagon}
        />
        <CardKpi
          titulo="Concluídos"
          valor={concluidos}
          descricao="Ocorrências finalizadas."
          cor="verde"
          Icone={CheckCircle2}
        />
      </section>

      <section className="pd-grid-2">
        <article className="pd-card" style={{ marginBottom: 0 }}>
          <div className="pd-card-head">
            <h2>Minhas turmas</h2>
            <Link className="pd-link-btn" to="/professor/turmas">
              Ver todas <ArrowRight size={15} />
            </Link>
          </div>
          {minhasTurmas.slice(0, 4).map((turma) => (
            <div className="pd-list-item" key={turma.id}>
              <div className="pd-list-left">
                <div className="pd-code-badge">{turma.codigo}</div>
                <div className="pd-list-text">
                  <strong>{turma.curso}</strong>
                  <span>
                    {turma.totalAlunos} alunos · {turma.horario}
                  </span>
                </div>
              </div>
              <span className="pd-pill-red">
                {turma.atrasosHoje} {turma.atrasosHoje === 1 ? "atraso" : "atrasos"} hoje
              </span>
            </div>
          ))}
        </article>

        <article className="pd-card" style={{ marginBottom: 0 }}>
          <div className="pd-card-head">
            <h2>Alunos com mais ocorrências</h2>
            <Link className="pd-link-btn" to="/professor/alunos">
              Ver todos <ArrowRight size={15} />
            </Link>
          </div>
          {topAlunos.map((aluno, idx) => (
            <div className="pd-list-item" key={aluno.id}>
              <div className="pd-list-left">
                <span
                  className="pd-avatar-mini"
                  style={{ background: "#edf7fc", color: "#17364d" }}
                >
                  {idx + 1}
                </span>
                <div className="pd-list-text">
                  <strong>{aluno.nome}</strong>
                  <span>Turma {aluno.turma} · Frequência {aluno.frequencia}%</span>
                </div>
              </div>
              <span className="pd-pill-red">{aluno.ocorrencias} ocorrências</span>
            </div>
          ))}
        </article>
      </section>

      <section className="pd-alert-box">
        <div className="pd-alert-left">
          <div className="pd-alert-icon">
            <AlertCircle size={20} />
          </div>
          <div>
            <strong style={{ display: "block", fontSize: 15 }}>Alertas importantes!</strong>
            <span style={{ fontSize: 13, color: "#5a6b7d" }}>
              Há alunos com atrasos recorrentes nas turmas T1A e T2B aguardando acompanhamento.
            </span>
          </div>
        </div>
        <button
          type="button"
          className="pd-link-btn"
          onClick={() => navigate("/professor/ocorrencias")}
        >
          Ver detalhes <ArrowRight size={15} />
        </button>
      </section>
    </EstruturaProfessor>
  );
}

export function TurmasProfessor() {
  const { dados, adicionarTurma } = useMockSistema();
  const [busca, setBusca] = useState("");
  const [turno, setTurno] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [modalNova, setModalNova] = useState(false);
  const [turmaDetalhes, setTurmaDetalhes] = useState(null);
  const [aviso, setAviso] = useState("");
  const [form, setForm] = useState({
    codigo: "",
    curso: "",
    turno: "Manhã",
    horario: "07h45 - 11h15",
    sala: "",
    totalAlunos: "30",
  });

  const minhasTurmas = dados.turmas.filter((t) => t.minhaTurma);
  const filtradas = minhasTurmas.filter((t) => {
    const q = busca.toLowerCase();
    const matchTexto =
      t.codigo.toLowerCase().includes(q) || t.curso.toLowerCase().includes(q);
    const matchTurno = turno === "Todos" || t.turno === turno;
    return matchTexto && matchTurno;
  });

  const porPagina = 5;
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const exibidas = filtradas.slice((paginaSegura - 1) * porPagina, paginaSegura * porPagina);

  function criarTurma(e) {
    e.preventDefault();
    if (!form.codigo.trim() || !form.curso.trim()) return;
    const criada = adicionarTurma({ ...form, minhaTurma: true });
    setModalNova(false);
    setForm({
      codigo: "",
      curso: "",
      turno: "Manhã",
      horario: "07h45 - 11h15",
      sala: "",
      totalAlunos: "30",
    });
    setPagina(1);
    setAviso(`Turma ${criada.codigo} adicionada às suas turmas.`);
  }

  return (
    <EstruturaProfessor
      titulo="Minhas Turmas"
      subtitulo="Consulte suas turmas, acompanhe os atrasos do dia e veja os alunos vinculados."
      mostrarVoltar
      acoes={
        <button type="button" className="pd-btn" onClick={() => setModalNova(true)}>
          <Plus size={16} /> Nova turma
        </button>
      }
    >
      {aviso && <div className="pd-feedback">{aviso}</div>}

      <section className="pd-card">
        <div className="pd-toolbar">
          <div className="pd-search-wrap">
            <Search size={17} />
            <input
              type="text"
              className="pd-input"
              placeholder="Buscar por código ou curso..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
            />
          </div>
          <select
            className="pd-select"
            value={turno}
            onChange={(e) => {
              setTurno(e.target.value);
              setPagina(1);
            }}
          >
            <option value="Todos">Todos os turnos</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
            <option value="Integral">Integral</option>
          </select>
        </div>

        <TabelaPainel
          cabecalhos={["Turma", "Curso", "Turno / Horário", "Alunos", "Atrasos hoje", "Ações"]}
          quantidade={exibidas.length}
        >
          {exibidas.map((t) => (
            <tr key={t.id}>
              <td>
                <strong>{t.codigo}</strong>
              </td>
              <td>{t.curso}</td>
              <td>
                {t.turno} · {t.horario}
              </td>
              <td>{t.totalAlunos}</td>
              <td>
                <span className="pd-pill-red">{t.atrasosHoje}</span>
              </td>
              <td>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="pd-btn pd-btn-sec pd-btn-sm"
                    onClick={() => setTurmaDetalhes(t)}
                  >
                    <Eye size={14} /> Detalhes
                  </button>
                  <Link
                    className="pd-btn pd-btn-sm"
                    to={`/professor/alunos?turma=${encodeURIComponent(t.codigo)}`}
                  >
                    Ver alunos
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </TabelaPainel>

        <PaginacaoPainel
          paginaAtual={paginaSegura}
          totalPaginas={totalPaginas}
          totalItens={filtradas.length}
          porPagina={porPagina}
          aoMudar={setPagina}
        />
      </section>

      <ModalPainel aberto={modalNova} titulo="Cadastrar nova turma" aoFechar={() => setModalNova(false)}>
        <form className="pd-form-grid" onSubmit={criarTurma}>
          <div className="pd-field">
            <label htmlFor="prof-turma-cod">Código da turma</label>
            <input
              id="prof-turma-cod"
              className="pd-input"
              required
              placeholder="Ex.: T4A"
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
            />
          </div>
          <div className="pd-field">
            <label htmlFor="prof-turma-turno">Turno</label>
            <select
              id="prof-turma-turno"
              className="pd-select"
              value={form.turno}
              onChange={(e) => setForm({ ...form, turno: e.target.value })}
            >
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
              <option>Integral</option>
            </select>
          </div>
          <div className="pd-field full">
            <label htmlFor="prof-turma-curso">Curso</label>
            <input
              id="prof-turma-curso"
              className="pd-input"
              required
              placeholder="Ex.: Técnico em Desenvolvimento de Sistemas"
              value={form.curso}
              onChange={(e) => setForm({ ...form, curso: e.target.value })}
            />
          </div>
          <div className="pd-field">
            <label htmlFor="prof-turma-horario">Horário</label>
            <input
              id="prof-turma-horario"
              className="pd-input"
              value={form.horario}
              onChange={(e) => setForm({ ...form, horario: e.target.value })}
            />
          </div>
          <div className="pd-field">
            <label htmlFor="prof-turma-alunos">Quantidade de alunos</label>
            <input
              id="prof-turma-alunos"
              type="number"
              min="1"
              className="pd-input"
              value={form.totalAlunos}
              onChange={(e) => setForm({ ...form, totalAlunos: e.target.value })}
            />
          </div>
          <div className="pd-field full" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="pd-btn pd-btn-sec" onClick={() => setModalNova(false)}>
              Cancelar
            </button>
            <button type="submit" className="pd-btn">
              Salvar turma
            </button>
          </div>
        </form>
      </ModalPainel>

      <ModalPainel
        aberto={Boolean(turmaDetalhes)}
        titulo={turmaDetalhes ? `Turma ${turmaDetalhes.codigo}` : ""}
        aoFechar={() => setTurmaDetalhes(null)}
      >
        {turmaDetalhes && (
          <div>
            <p><strong>Curso:</strong> {turmaDetalhes.curso}</p>
            <p><strong>Turno:</strong> {turmaDetalhes.turno} ({turmaDetalhes.horario})</p>
            <p><strong>Sala:</strong> {turmaDetalhes.sala} · <strong>Total de alunos:</strong> {turmaDetalhes.totalAlunos}</p>
            <p><strong>Atrasos registrados hoje:</strong> {turmaDetalhes.atrasosHoje}</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
              <Link
                className="pd-btn"
                to={`/professor/alunos?turma=${encodeURIComponent(turmaDetalhes.codigo)}`}
              >
                Listar alunos da turma
              </Link>
            </div>
          </div>
        )}
      </ModalPainel>
    </EstruturaProfessor>
  );
}

export function AlunosProfessor() {
  const { dados } = useMockSistema();
  const [searchParams] = useSearchParams();
  const turmaInicial = searchParams.get("turma") || "Todas";

  const [busca, setBusca] = useState("");
  const [turma, setTurma] = useState(turmaInicial);
  const [status, setStatus] = useState("Todos");
  const [ordem, setOrdem] = useState("ocorrencias");
  const [pagina, setPagina] = useState(1);
  const [selecionado, setSelecionado] = useState(null);

  const minhasTurmas = dados.turmas.filter((t) => t.minhaTurma);
  const codigosMinhas = new Set(minhasTurmas.map((t) => t.codigo));

  const alunosBase = dados.alunos.filter((a) => codigosMinhas.has(a.turma));
  const filtrados = alunosBase
    .filter((a) => {
      const q = busca.toLowerCase();
      const matchTexto = a.nome.toLowerCase().includes(q) || a.ra.includes(q);
      const matchTurma = turma === "Todas" || a.turma === turma;
      const matchStatus = status === "Todos" || a.status === status;
      return matchTexto && matchTurma && matchStatus;
    })
    .slice()
    .sort((a, b) => {
      if (ordem === "ocorrencias") return b.ocorrencias - a.ocorrencias;
      if (ordem === "frequencia") return a.frequencia - b.frequencia;
      return a.nome.localeCompare(b.nome);
    });

  const porPagina = 5;
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const exibidos = filtrados.slice((paginaSegura - 1) * porPagina, paginaSegura * porPagina);

  return (
    <EstruturaProfessor
      titulo="Alunos"
      subtitulo="Consulte os alunos das suas turmas, frequência e histórico de ocorrências."
      mostrarVoltar
      acoes={
        <Link className="pd-btn" to="/professor/registrar-atraso">
          <Plus size={16} /> Registrar atraso
        </Link>
      }
    >
      <section className="pd-card">
        <div className="pd-toolbar">
          <div className="pd-search-wrap">
            <Search size={17} />
            <input
              type="text"
              className="pd-input"
              placeholder="Buscar por nome ou RA..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
            />
          </div>

          <select
            className="pd-select"
            value={turma}
            onChange={(e) => {
              setTurma(e.target.value);
              setPagina(1);
            }}
          >
            <option value="Todas">Todas as turmas</option>
            {minhasTurmas.map((t) => (
              <option key={t.id} value={t.codigo}>
                {t.codigo}
              </option>
            ))}
          </select>

          <select
            className="pd-select"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPagina(1);
            }}
          >
            <option value="Todos">Todos os status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Aguardando retorno">Aguardando retorno</option>
            <option value="Concluída">Concluída</option>
          </select>

          <select
            className="pd-select"
            value={ordem}
            onChange={(e) => setOrdem(e.target.value)}
          >
            <option value="ocorrencias">Mais ocorrências</option>
            <option value="frequencia">Menor frequência</option>
            <option value="nome">Nome (A-Z)</option>
          </select>
        </div>

        <TabelaPainel
          cabecalhos={["Aluno", "RA", "Turma", "Ocorrências", "Frequência", "Último atraso", "Status", "Ações"]}
          quantidade={exibidos.length}
        >
          {exibidos.map((a) => (
            <tr key={a.id}>
              <td>
                <div className="pd-list-left">
                  <span className="pd-avatar-mini" style={{ background: a.cor }}>
                    {a.iniciais}
                  </span>
                  <strong>{a.nome}</strong>
                </div>
              </td>
              <td>{a.ra}</td>
              <td>{a.turma}</td>
              <td>{a.ocorrencias}</td>
              <td>{a.frequencia}%</td>
              <td>{a.ultimoAtraso}</td>
              <td>
                <StatusBadge valor={a.status} />
              </td>
              <td>
                <button
                  type="button"
                  className="pd-btn pd-btn-sec pd-btn-sm"
                  onClick={() => setSelecionado(a)}
                >
                  <Eye size={14} /> Detalhes
                </button>
              </td>
            </tr>
          ))}
        </TabelaPainel>

        <PaginacaoPainel
          paginaAtual={paginaSegura}
          totalPaginas={totalPaginas}
          totalItens={filtrados.length}
          porPagina={porPagina}
          aoMudar={setPagina}
        />
      </section>

      <ModalPainel
        aberto={Boolean(selecionado)}
        titulo={selecionado ? selecionado.nome : ""}
        aoFechar={() => setSelecionado(null)}
      >
        {selecionado && (
          <div>
            <p><strong>RA:</strong> {selecionado.ra} · <strong>Turma:</strong> {selecionado.turma}</p>
            <p><strong>E-mail:</strong> {selecionado.email} · <strong>Telefone:</strong> {selecionado.telefone}</p>
            <p><strong>Frequência:</strong> {selecionado.frequencia}% · <strong>Ocorrências:</strong> {selecionado.ocorrencias}</p>
            <p><strong>Último atraso:</strong> {selecionado.ultimoAtraso}</p>
            <p><strong>Status:</strong> <StatusBadge valor={selecionado.status} /></p>
            <p style={{ background: "#f8fafc", padding: 12, borderRadius: 8, border: "1px solid #d4dde6" }}>
              {selecionado.observacao}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
              <Link className="pd-btn" to="/professor/registrar-atraso">
                Registrar atraso
              </Link>
            </div>
          </div>
        )}
      </ModalPainel>
    </EstruturaProfessor>
  );
}

export function RegistrarAtrasoProfessor() {
  const { dados, registrarAtraso } = useMockSistema();
  const minhasTurmas = dados.turmas.filter((t) => t.minhaTurma);
  const codigosMinhas = new Set(minhasTurmas.map((t) => t.codigo));
  const alunosDisponiveis = dados.alunos.filter((a) => codigosMinhas.has(a.turma));

  const [turmaFiltro, setTurmaFiltro] = useState("Todas");
  const [alunoId, setAlunoId] = useState(String(alunosDisponiveis[0]?.id || ""));
  const [horarioChegada, setHorarioChegada] = useState(() =>
    new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  );
  const [motivo, setMotivo] = useState("Transporte público");
  const [observacao, setObservacao] = useState("");
  const [abrirOS, setAbrirOS] = useState(true);
  const [feedback, setFeedback] = useState("");

  const alunosFiltrados = alunosDisponiveis.filter(
    (a) => turmaFiltro === "Todas" || a.turma === turmaFiltro
  );

  function enviar(e) {
    e.preventDefault();
    const registro = registrarAtraso({
      alunoId: alunoId || alunosFiltrados[0]?.id,
      horarioChegada,
      motivo,
      observacao,
      abrirOS,
    });
    if (!registro) return;
    setObservacao("");
    setFeedback(
      `Atraso de ${registro.aluno} (${registro.turma}) registrado às ${registro.chegada}.${abrirOS ? " Uma ocorrência também foi encaminhada para a AQV." : ""}`
    );
  }

  return (
    <EstruturaProfessor
      titulo="Registrar Atraso"
      subtitulo="Registre a chegada em atraso de um aluno das suas turmas."
      mostrarVoltar
    >
      {feedback && <div className="pd-feedback">{feedback}</div>}

      <section className="pd-card">
        <div className="pd-card-head">
          <h2>Novo registro de chegada</h2>
        </div>

        <form className="pd-form-grid" onSubmit={enviar}>
          <div className="pd-field">
            <label htmlFor="atr-turma">Filtrar por turma</label>
            <select
              id="atr-turma"
              className="pd-select"
              value={turmaFiltro}
              onChange={(e) => {
                const novaTurma = e.target.value;
                setTurmaFiltro(novaTurma);
                const primeiro = alunosDisponiveis.find(
                  (a) => novaTurma === "Todas" || a.turma === novaTurma
                );
                if (primeiro) setAlunoId(String(primeiro.id));
              }}
            >
              <option value="Todas">Todas as minhas turmas</option>
              {minhasTurmas.map((t) => (
                <option key={t.id} value={t.codigo}>
                  {t.codigo} — {t.curso}
                </option>
              ))}
            </select>
          </div>

          <div className="pd-field">
            <label htmlFor="atr-aluno">Aluno</label>
            <select
              id="atr-aluno"
              className="pd-select"
              required
              value={alunoId}
              onChange={(e) => setAlunoId(e.target.value)}
            >
              {alunosFiltrados.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome} ({a.turma} · RA {a.ra})
                </option>
              ))}
            </select>
          </div>

          <div className="pd-field">
            <label htmlFor="atr-hora">Horário de chegada</label>
            <input
              id="atr-hora"
              type="time"
              className="pd-input"
              required
              value={horarioChegada}
              onChange={(e) => setHorarioChegada(e.target.value)}
            />
          </div>

          <div className="pd-field">
            <label htmlFor="atr-motivo">Motivo informado</label>
            <select
              id="atr-motivo"
              className="pd-select"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            >
              <option>Transporte público</option>
              <option>Problemas pessoais</option>
              <option>Problemas de saúde</option>
              <option>Trabalho / Estágio</option>
              <option>Outros</option>
            </select>
          </div>

          <div className="pd-field full">
            <label htmlFor="atr-obs">Observação</label>
            <textarea
              id="atr-obs"
              className="pd-textarea"
              placeholder="Descreva detalhes adicionais sobre o atraso..."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </div>

          <div className="pd-field full">
            <label className="pd-check-row">
              <input
                type="checkbox"
                checked={abrirOS}
                onChange={(e) => setAbrirOS(e.target.checked)}
              />
              Abrir também Ordem de Serviço (Acolhimento) para acompanhamento da AQV
            </label>
          </div>

          <div className="pd-field full" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            <button type="submit" className="pd-btn">
              Salvar registro de atraso
            </button>
          </div>
        </form>
      </section>

      <section className="pd-card">
        <div className="pd-card-head">
          <h2>Últimos atrasos registrados ({hojeFormatado()})</h2>
        </div>
        <TabelaPainel
          cabecalhos={["Data", "Aluno", "Turma", "Previsto", "Chegada", "Motivo", "Origem"]}
          quantidade={dados.atrasos.length}
        >
          {dados.atrasos.slice(0, 8).map((atr) => (
            <tr key={atr.id}>
              <td>{atr.data}</td>
              <td><strong>{atr.aluno}</strong></td>
              <td>{atr.turma}</td>
              <td>{atr.previsto}</td>
              <td>{atr.chegada}</td>
              <td>{atr.motivo}</td>
              <td>{atr.registradoPor}</td>
            </tr>
          ))}
        </TabelaPainel>
      </section>
    </EstruturaProfessor>
  );
}

export function OcorrenciasProfessor() {
  const { dados, adicionarOS, atualizarStatusOS } = useMockSistema();
  const [busca, setBusca] = useState("");
  const [turma, setTurma] = useState("Todas");
  const [status, setStatus] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [modalNova, setModalNova] = useState(false);
  const [detalhe, setDetalhe] = useState(null);
  const [aviso, setAviso] = useState("");

  const minhasTurmas = dados.turmas.filter((t) => t.minhaTurma);
  const codigosMinhas = new Set(minhasTurmas.map((t) => t.codigo));
  const alunosMinhas = dados.alunos.filter((a) => codigosMinhas.has(a.turma));

  const [novaOS, setNovaOS] = useState({
    aluno: alunosMinhas[0]?.nome || "João Silva",
    turma: alunosMinhas[0]?.turma || "T1A",
    motivo: "Atraso recorrente",
    prioridade: "Alta",
    descricao: "",
  });

  const filtradas = dados.ocorrencias
    .filter((o) => codigosMinhas.has(o.turma))
    .filter((o) => {
      const q = busca.toLowerCase();
      const matchTexto =
        o.aluno.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.motivo.toLowerCase().includes(q);
      const matchTurma = turma === "Todas" || o.turma === turma;
      const matchStatus = status === "Todos" || o.status === status;
      return matchTexto && matchTurma && matchStatus;
    });

  const porPagina = 5;
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const exibidas = filtradas.slice((paginaSegura - 1) * porPagina, paginaSegura * porPagina);

  function criarOS(e) {
    e.preventDefault();
    const criada = adicionarOS({
      ...novaOS,
      responsavel: `${perfilProfessor.nome} (Prof.)`,
    });
    setModalNova(false);
    setNovaOS({
      aluno: alunosMinhas[0]?.nome || "João Silva",
      turma: alunosMinhas[0]?.turma || "T1A",
      motivo: "Atraso recorrente",
      prioridade: "Alta",
      descricao: "",
    });
    setAviso(`Ocorrência ${criada.id} criada para ${criada.aluno}.`);
  }

  return (
    <EstruturaProfessor
      titulo="Ocorrências e Acolhimentos"
      subtitulo="Acompanhe e encaminhe ocorrências das suas turmas para a equipe AQV."
      mostrarVoltar
      acoes={
        <button type="button" className="pd-btn" onClick={() => setModalNova(true)}>
          <Plus size={16} /> Nova OS
        </button>
      }
    >
      {aviso && <div className="pd-feedback">{aviso}</div>}

      <section className="pd-card">
        <div className="pd-toolbar">
          <div className="pd-search-wrap">
            <Search size={17} />
            <input
              type="text"
              className="pd-input"
              placeholder="Buscar por OS, aluno ou motivo..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
            />
          </div>

          <select
            className="pd-select"
            value={turma}
            onChange={(e) => {
              setTurma(e.target.value);
              setPagina(1);
            }}
          >
            <option value="Todas">Todas as turmas</option>
            {minhasTurmas.map((t) => (
              <option key={t.id} value={t.codigo}>
                {t.codigo}
              </option>
            ))}
          </select>

          <select
            className="pd-select"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPagina(1);
            }}
          >
            <option value="Todos">Todos os status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Aguardando retorno">Aguardando retorno</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>

        <TabelaPainel
          cabecalhos={["Nº OS", "Data", "Aluno", "Turma", "Motivo", "Prioridade", "Status", "Ações"]}
          quantidade={exibidas.length}
        >
          {exibidas.map((o) => (
            <tr key={o.id}>
              <td><strong>{o.id}</strong></td>
              <td>{o.data}</td>
              <td>{o.aluno}</td>
              <td>{o.turma}</td>
              <td>{o.motivo}</td>
              <td><StatusBadge valor={o.prioridade} /></td>
              <td><StatusBadge valor={o.status} /></td>
              <td>
                <button
                  type="button"
                  className="pd-btn pd-btn-sec pd-btn-sm"
                  onClick={() => setDetalhe(o)}
                >
                  <Eye size={14} /> Detalhes
                </button>
              </td>
            </tr>
          ))}
        </TabelaPainel>

        <PaginacaoPainel
          paginaAtual={paginaSegura}
          totalPaginas={totalPaginas}
          totalItens={filtradas.length}
          porPagina={porPagina}
          aoMudar={setPagina}
        />
      </section>

      <ModalPainel aberto={modalNova} titulo="Abrir nova ocorrência (OS)" aoFechar={() => setModalNova(false)}>
        <form className="pd-form-grid" onSubmit={criarOS}>
          <div className="pd-field">
            <label htmlFor="prof-os-aluno">Aluno</label>
            <select
              id="prof-os-aluno"
              className="pd-select"
              value={novaOS.aluno}
              onChange={(e) => {
                const selecionado = alunosMinhas.find((a) => a.nome === e.target.value);
                setNovaOS({
                  ...novaOS,
                  aluno: e.target.value,
                  turma: selecionado?.turma || novaOS.turma,
                });
              }}
            >
              {alunosMinhas.map((a) => (
                <option key={a.id} value={a.nome}>
                  {a.nome} ({a.turma})
                </option>
              ))}
            </select>
          </div>
          <div className="pd-field">
            <label htmlFor="prof-os-pri">Prioridade</label>
            <select
              id="prof-os-pri"
              className="pd-select"
              value={novaOS.prioridade}
              onChange={(e) => setNovaOS({ ...novaOS, prioridade: e.target.value })}
            >
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>
          </div>
          <div className="pd-field full">
            <label htmlFor="prof-os-mot">Motivo</label>
            <select
              id="prof-os-mot"
              className="pd-select"
              value={novaOS.motivo}
              onChange={(e) => setNovaOS({ ...novaOS, motivo: e.target.value })}
            >
              <option>Atraso recorrente</option>
              <option>Justificativa</option>
              <option>Questão pessoal</option>
              <option>Atestado médico</option>
            </select>
          </div>
          <div className="pd-field full">
            <label htmlFor="prof-os-desc">Descrição</label>
            <textarea
              id="prof-os-desc"
              className="pd-textarea"
              required
              placeholder="Descreva o motivo do encaminhamento para a AQV..."
              value={novaOS.descricao}
              onChange={(e) => setNovaOS({ ...novaOS, descricao: e.target.value })}
            />
          </div>
          <div className="pd-field full" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="pd-btn pd-btn-sec" onClick={() => setModalNova(false)}>
              Cancelar
            </button>
            <button type="submit" className="pd-btn">
              Criar ocorrência
            </button>
          </div>
        </form>
      </ModalPainel>

      <ModalPainel
        aberto={Boolean(detalhe)}
        titulo={detalhe ? `Ocorrência ${detalhe.id}` : ""}
        aoFechar={() => setDetalhe(null)}
      >
        {detalhe && (
          <div>
            <p><strong>Aluno:</strong> {detalhe.aluno} (Turma {detalhe.turma})</p>
            <p><strong>Data:</strong> {detalhe.data} · <strong>Responsável:</strong> {detalhe.responsavel}</p>
            <p><strong>Motivo:</strong> {detalhe.motivo} · <strong>Prioridade:</strong> <StatusBadge valor={detalhe.prioridade} /></p>
            <p><strong>Status atual:</strong> <StatusBadge valor={detalhe.status} /></p>
            <p style={{ background: "#f8fafc", padding: 12, borderRadius: 8, border: "1px solid #d4dde6" }}>
              {detalhe.descricao}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end", marginTop: 18 }}>
              {["Pendente", "Em andamento", "Concluída"].map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`pd-btn pd-btn-sm ${detalhe.status === st ? "" : "pd-btn-sec"}`}
                  onClick={() => {
                    atualizarStatusOS(detalhe.id, st);
                    setDetalhe({ ...detalhe, status: st });
                    setAviso(`Status da ${detalhe.id} atualizado para "${st}".`);
                  }}
                >
                  Marcar como {st}
                </button>
              ))}
            </div>
          </div>
        )}
      </ModalPainel>
    </EstruturaProfessor>
  );
}

export function RelatoriosProfessor() {
  const { dados } = useMockSistema();
  return (
    <EstruturaProfessor
      titulo="Relatórios do Professor"
      subtitulo="Acompanhe indicadores, gráficos por turma e motivos das ocorrências."
      mostrarVoltar
    >
      <RelatoriosConteudo dados={dados} apenasMinhasTurmas />
    </EstruturaProfessor>
  );
}

export function PerfilProfessor() {
  return (
    <EstruturaProfessor
      titulo="Meu Perfil"
      subtitulo="Confira seus dados pessoais e acadêmicos no sistema."
      mostrarVoltar
    >
      <PerfilConteudo
        perfil={perfilProfessor}
        rotaContato="/professor/contato"
        detalhesExtra={[
          ["Turmas atribuídas", perfilProfessor.turmasResumo],
          ["Turnos de atuação", perfilProfessor.turno],
          ["Situação", "Ativa"],
          ["Unidade", perfilProfessor.unidade],
        ]}
      />
    </EstruturaProfessor>
  );
}

export function ContatoProfessor() {
  return (
    <EstruturaProfessor
      titulo="Contato da Unidade"
      subtitulo="Canais de atendimento da secretaria escolar e coordenação."
      mostrarVoltar
    >
      <ContatoConteudo rotaPerfil="/professor/perfil" />
    </EstruturaProfessor>
  );
}
