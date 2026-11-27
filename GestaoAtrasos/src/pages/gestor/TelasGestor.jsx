import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ClipboardList,
  Clock,
  Copy,
  Eye,
  FileCheck2,
  GraduationCap,
  Hexagon,
  Home,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Trash2,
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
import { perfilGestor, useMockSistema } from "../../data/mockSistema.js";

const LINKS_GESTOR = [
  { para: "/gestor/inicio", rotulo: "Início", Icone: Home },
  { para: "/gestor/acolhimentos", rotulo: "Acolhimentos", Icone: ClipboardList },
  { para: "/gestor/turmas", rotulo: "Turmas", Icone: Users },
  { para: "/gestor/alunos", rotulo: "Alunos", Icone: GraduationCap },
  { para: "/gestor/relatorios", rotulo: "Relatórios", Icone: BarChart3 },
  { para: "/gestor/qrcode", rotulo: "Gerar QR Code", Icone: QrCode },
  { para: "/gestor/perfil", rotulo: "Perfil", Icone: UserRound },
];

function EstruturaGestor({ titulo, subtitulo, acoes, mostrarVoltar = false, children }) {
  return (
    <PainelLayout
      usuario={perfilGestor}
      links={LINKS_GESTOR}
      rotaInicio="/gestor/inicio"
      titulo={titulo}
      subtitulo={subtitulo}
      acoes={acoes}
      mostrarVoltar={mostrarVoltar}
    >
      {children}
    </PainelLayout>
  );
}

export function InicioGestor() {
  const { dados, marcarNotificacoesLidas } = useMockSistema();
  const [notifAbertas, setNotifAbertas] = useState(false);

  const totalCasos = dados.ocorrencias.length;
  const emAndamento = dados.ocorrencias.filter((o) => o.status === "Em andamento").length;
  const aguardando = dados.ocorrencias.filter((o) =>
    ["Aguardando retorno", "Pendente"].includes(o.status)
  ).length;
  const concluidos = dados.ocorrencias.filter((o) => o.status === "Concluída").length;
  const atestadosPendentes = dados.atestados.filter((d) => d.status === "Em análise").length;
  const naoLidas = dados.notificacoes.filter((n) => !n.lida).length;

  const casosPrioritarios = dados.ocorrencias
    .filter((o) => o.status !== "Concluída")
    .slice(0, 4);

  return (
    <EstruturaGestor
      titulo={`Olá, ${perfilGestor.nomeCurto}!`}
      subtitulo="Aqui está o resumo dos acolhimentos, turmas e registros da unidade."
      acoes={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link className="pd-btn" to="/gestor/qrcode">
            <QrCode size={16} /> Gerar QR Code
          </Link>

          <div className="pd-notif-wrap">
            <button
              type="button"
              className="pd-notif-btn"
              aria-label="Abrir notificações"
              aria-expanded={notifAbertas}
              onClick={() => setNotifAbertas((aberta) => !aberta)}
            >
              <Bell size={20} />
              {naoLidas > 0 && <span className="pd-notif-dot" />}
            </button>

            {notifAbertas && (
              <div className="pd-notif-popover">
                <div className="pd-card-head" style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>Notificações ({naoLidas} novas)</strong>
                  {naoLidas > 0 && (
                    <button
                      type="button"
                      className="pd-link-btn"
                      style={{ fontSize: 12 }}
                      onClick={marcarNotificacoesLidas}
                    >
                      Marcar lidas
                    </button>
                  )}
                </div>
                {dados.notificacoes.slice(0, 5).map((item) => (
                  <div className="pd-notif-item" key={item.id}>
                    <strong>{item.titulo}</strong>
                    <span>{item.descricao}</span>
                    <small>{item.horario}{item.lida ? " · lida" : ""}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      }
    >
      <section className="pd-kpi-grid">
        <CardKpi
          titulo="Total de casos"
          valor={totalCasos}
          descricao="Ordens de serviço registradas"
          cor="vermelho"
          Icone={ClipboardList}
        />
        <CardKpi
          titulo="Em andamento"
          valor={emAndamento}
          descricao="Em atendimento pela AQV"
          cor="laranja"
          Icone={Hexagon}
        />
        <CardKpi
          titulo="Aguardando retorno"
          valor={aguardando}
          descricao="Pendentes ou aguardando aluno"
          cor="roxo"
          Icone={Clock}
        />
        <CardKpi
          titulo="Concluídos"
          valor={concluidos}
          descricao="Atendimentos finalizados"
          cor="verde"
          Icone={CheckCircle2}
        />
      </section>

      <section className="pd-grid-2">
        <article className="pd-card" style={{ marginBottom: 0 }}>
          <div className="pd-card-head">
            <h2>Casos prioritários</h2>
            <Link className="pd-link-btn" to="/gestor/acolhimentos">
              Ver todos <ArrowRight size={15} />
            </Link>
          </div>
          {casosPrioritarios.map((caso) => (
            <div className="pd-list-item" key={caso.id}>
              <div className="pd-list-left">
                <div className="pd-code-badge">{caso.turma}</div>
                <div className="pd-list-text">
                  <strong>
                    {caso.aluno} · {caso.id}
                  </strong>
                  <span>
                    {caso.motivo} · {caso.data}
                  </span>
                </div>
              </div>
              <StatusBadge valor={caso.status} />
            </div>
          ))}
        </article>

        <article className="pd-card" style={{ marginBottom: 0 }}>
          <div className="pd-card-head">
            <h2>Acesso rápido da gestão</h2>
          </div>
          <div className="pd-grid-2" style={{ marginBottom: 0 }}>
            <Link className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }} to="/gestor/acolhimentos">
              <ClipboardList size={22} color="#e30613" />
              <h3 style={{ margin: "10px 0 4px", fontSize: 15 }}>Ordens de Serviço</h3>
              <p style={{ margin: 0, fontSize: 13, color: "#5a6b7d" }}>
                Gerencie acolhimentos e status
              </p>
            </Link>
            <Link className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }} to="/gestor/acolhimentos?aba=atestados">
              <FileCheck2 size={22} color="#e30613" />
              <h3 style={{ margin: "10px 0 4px", fontSize: 15 }}>
                Atestados ({atestadosPendentes})
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: "#5a6b7d" }}>
                Documentos aguardando análise
              </p>
            </Link>
            <Link className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }} to="/gestor/turmas">
              <Users size={22} color="#e30613" />
              <h3 style={{ margin: "10px 0 4px", fontSize: 15 }}>Turmas ({dados.turmas.length})</h3>
              <p style={{ margin: 0, fontSize: 13, color: "#5a6b7d" }}>
                Cadastre e acompanhe turmas
              </p>
            </Link>
            <Link className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }} to="/gestor/relatorios">
              <BarChart3 size={22} color="#e30613" />
              <h3 style={{ margin: "10px 0 4px", fontSize: 15 }}>Relatórios</h3>
              <p style={{ margin: 0, fontSize: 13, color: "#5a6b7d" }}>
                Gráficos e exportação
              </p>
            </Link>
          </div>
        </article>
      </section>
    </EstruturaGestor>
  );
}

export function AcolhimentosGestor() {
  const { dados, adicionarOS, atualizarStatusOS, atualizarStatusAtestado } = useMockSistema();
  const [searchParams, setSearchParams] = useSearchParams();
  const aba = searchParams.get("aba") === "atestados" ? "atestados" : "os";

  const [busca, setBusca] = useState("");
  const [turma, setTurma] = useState("Todas");
  const [status, setStatus] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [modalNova, setModalNova] = useState(false);
  const [osDetalhe, setOsDetalhe] = useState(null);
  const [docDetalhe, setDocDetalhe] = useState(null);
  const [aviso, setAviso] = useState("");

  const [novaOS, setNovaOS] = useState({
    aluno: dados.alunos[0]?.nome || "João Silva",
    turma: dados.alunos[0]?.turma || "T1A",
    motivo: "Atraso recorrente",
    prioridade: "Alta",
    descricao: "",
  });

  function trocarAba(novaAba) {
    setPagina(1);
    setStatus("Todos");
    setSearchParams(novaAba === "atestados" ? { aba: "atestados" } : {});
  }

  const osFiltradas = dados.ocorrencias.filter((o) => {
    const q = busca.toLowerCase();
    const matchTexto =
      o.id.toLowerCase().includes(q) ||
      o.aluno.toLowerCase().includes(q) ||
      o.motivo.toLowerCase().includes(q);
    const matchTurma = turma === "Todas" || o.turma === turma;
    const matchStatus = status === "Todos" || o.status === status;
    return matchTexto && matchTurma && matchStatus;
  });

  const docsFiltrados = dados.atestados.filter((d) => {
    const q = busca.toLowerCase();
    const matchTexto =
      d.aluno.toLowerCase().includes(q) ||
      d.arquivo.toLowerCase().includes(q) ||
      d.tipo.toLowerCase().includes(q);
    const matchTurma = turma === "Todas" || d.turma === turma;
    const matchStatus = status === "Todos" || d.status === status;
    return matchTexto && matchTurma && matchStatus;
  });

  const porPagina = 5;
  const listaAtiva = aba === "os" ? osFiltradas : docsFiltrados;
  const totalPaginas = Math.max(1, Math.ceil(listaAtiva.length / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const exibidos = listaAtiva.slice((paginaSegura - 1) * porPagina, paginaSegura * porPagina);

  function criarOS(e) {
    e.preventDefault();
    const criada = adicionarOS({
      ...novaOS,
      responsavel: `${perfilGestor.nome} (AQV)`,
    });
    setModalNova(false);
    setNovaOS({
      aluno: dados.alunos[0]?.nome || "João Silva",
      turma: dados.alunos[0]?.turma || "T1A",
      motivo: "Atraso recorrente",
      prioridade: "Alta",
      descricao: "",
    });
    setAviso(`Ordem de Serviço ${criada.id} criada para ${criada.aluno}.`);
  }

  return (
    <EstruturaGestor
      titulo="Acolhimentos e Ordens de Serviço"
      subtitulo="Gerencie os atendimentos dos alunos e valide atestados ou justificativas enviadas."
      mostrarVoltar
      acoes={
        <button type="button" className="pd-btn" onClick={() => setModalNova(true)}>
          <Plus size={16} /> Nova OS
        </button>
      }
    >
      {aviso && <div className="pd-feedback">{aviso}</div>}

      <div className="pd-tabs">
        <button
          type="button"
          className={`pd-tab ${aba === "os" ? "active" : ""}`}
          onClick={() => trocarAba("os")}
        >
          Ordens de Serviço ({dados.ocorrencias.length})
        </button>
        <button
          type="button"
          className={`pd-tab ${aba === "atestados" ? "active" : ""}`}
          onClick={() => trocarAba("atestados")}
        >
          Atestados e Justificativas ({dados.atestados.length})
        </button>
      </div>

      <section className="pd-card">
        <div className="pd-toolbar">
          <div className="pd-search-wrap">
            <Search size={17} />
            <input
              type="text"
              className="pd-input"
              placeholder={
                aba === "os"
                  ? "Buscar por OS, aluno ou motivo..."
                  : "Buscar por aluno, tipo ou arquivo..."
              }
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
            {dados.turmas.map((t) => (
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
            {aba === "os" ? (
              <>
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Aguardando retorno">Aguardando retorno</option>
                <option value="Concluída">Concluída</option>
              </>
            ) : (
              <>
                <option value="Em análise">Em análise</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Recusado">Recusado</option>
              </>
            )}
          </select>
        </div>

        {aba === "os" ? (
          <TabelaPainel
            cabecalhos={["Nº OS", "Data", "Aluno", "Turma", "Motivo", "Prioridade", "Status", "Ações"]}
            quantidade={exibidos.length}
          >
            {exibidos.map((os) => (
              <tr key={os.id}>
                <td><strong>{os.id}</strong></td>
                <td>{os.data}</td>
                <td>{os.aluno}</td>
                <td>{os.turma}</td>
                <td>{os.motivo}</td>
                <td><StatusBadge valor={os.prioridade} /></td>
                <td><StatusBadge valor={os.status} /></td>
                <td>
                  <button
                    type="button"
                    className="pd-btn pd-btn-sec pd-btn-sm"
                    onClick={() => setOsDetalhe(os)}
                  >
                    <Eye size={14} /> Gerenciar
                  </button>
                </td>
              </tr>
            ))}
          </TabelaPainel>
        ) : (
          <TabelaPainel
            cabecalhos={["Data", "Aluno", "Turma", "Tipo", "Arquivo", "Status", "Ações"]}
            quantidade={exibidos.length}
          >
            {exibidos.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.data}</td>
                <td><strong>{doc.aluno}</strong></td>
                <td>{doc.turma}</td>
                <td>{doc.tipo}</td>
                <td>{doc.arquivo}</td>
                <td><StatusBadge valor={doc.status} /></td>
                <td>
                  <button
                    type="button"
                    className="pd-btn pd-btn-sec pd-btn-sm"
                    onClick={() => setDocDetalhe(doc)}
                  >
                    <Eye size={14} /> Analisar
                  </button>
                </td>
              </tr>
            ))}
          </TabelaPainel>
        )}

        <PaginacaoPainel
          paginaAtual={paginaSegura}
          totalPaginas={totalPaginas}
          totalItens={listaAtiva.length}
          porPagina={porPagina}
          aoMudar={setPagina}
        />
      </section>

      <ModalPainel aberto={modalNova} titulo="Registrar nova Ordem de Serviço" aoFechar={() => setModalNova(false)}>
        <form className="pd-form-grid" onSubmit={criarOS}>
          <div className="pd-field">
            <label htmlFor="gest-os-aluno">Aluno</label>
            <select
              id="gest-os-aluno"
              className="pd-select"
              value={novaOS.aluno}
              onChange={(e) => {
                const al = dados.alunos.find((item) => item.nome === e.target.value);
                setNovaOS({
                  ...novaOS,
                  aluno: e.target.value,
                  turma: al?.turma || novaOS.turma,
                });
              }}
            >
              {dados.alunos.map((al) => (
                <option key={al.id} value={al.nome}>
                  {al.nome} ({al.turma} · RA {al.ra})
                </option>
              ))}
            </select>
          </div>
          <div className="pd-field">
            <label htmlFor="gest-os-pri">Prioridade</label>
            <select
              id="gest-os-pri"
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
            <label htmlFor="gest-os-mot">Motivo da OS</label>
            <select
              id="gest-os-mot"
              className="pd-select"
              value={novaOS.motivo}
              onChange={(e) => setNovaOS({ ...novaOS, motivo: e.target.value })}
            >
              <option>Atraso recorrente</option>
              <option>Justificativa</option>
              <option>Atestado médico</option>
              <option>Questão pessoal</option>
              <option>Acompanhamento familiar</option>
            </select>
          </div>
          <div className="pd-field full">
            <label htmlFor="gest-os-desc">Observações e encaminhamento</label>
            <textarea
              id="gest-os-desc"
              className="pd-textarea"
              required
              placeholder="Descreva os detalhes da ocorrência e próximos passos..."
              value={novaOS.descricao}
              onChange={(e) => setNovaOS({ ...novaOS, descricao: e.target.value })}
            />
          </div>
          <div className="pd-field full" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="pd-btn pd-btn-sec" onClick={() => setModalNova(false)}>
              Cancelar
            </button>
            <button type="submit" className="pd-btn">
              Salvar OS
            </button>
          </div>
        </form>
      </ModalPainel>

      <ModalPainel
        aberto={Boolean(osDetalhe)}
        titulo={osDetalhe ? `Gerenciar ${osDetalhe.id}` : ""}
        aoFechar={() => setOsDetalhe(null)}
      >
        {osDetalhe && (
          <div>
            <p><strong>Aluno:</strong> {osDetalhe.aluno} (RA {osDetalhe.ra}) · <strong>Turma:</strong> {osDetalhe.turma}</p>
            <p><strong>Data:</strong> {osDetalhe.data} · <strong>Responsável:</strong> {osDetalhe.responsavel}</p>
            <p><strong>Motivo:</strong> {osDetalhe.motivo} · <strong>Prioridade:</strong> <StatusBadge valor={osDetalhe.prioridade} /></p>
            <p><strong>Status atual:</strong> <StatusBadge valor={osDetalhe.status} /></p>
            <p style={{ background: "#f8fafc", padding: 12, borderRadius: 8, border: "1px solid #d4dde6" }}>
              {osDetalhe.descricao}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end", marginTop: 18 }}>
              {["Pendente", "Em andamento", "Aguardando retorno", "Concluída"].map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`pd-btn pd-btn-sm ${osDetalhe.status === st ? "" : "pd-btn-sec"}`}
                  onClick={() => {
                    atualizarStatusOS(osDetalhe.id, st);
                    setOsDetalhe({ ...osDetalhe, status: st });
                    setAviso(`Status da ${osDetalhe.id} alterado para "${st}".`);
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        )}
      </ModalPainel>

      <ModalPainel
        aberto={Boolean(docDetalhe)}
        titulo={docDetalhe ? `${docDetalhe.tipo} · ${docDetalhe.aluno}` : ""}
        aoFechar={() => setDocDetalhe(null)}
      >
        {docDetalhe && (
          <div>
            <p><strong>Turma:</strong> {docDetalhe.turma} · <strong>Enviado em:</strong> {docDetalhe.data}</p>
            <p><strong>Arquivo:</strong> {docDetalhe.arquivo}</p>
            <p><strong>Status atual:</strong> <StatusBadge valor={docDetalhe.status} /></p>
            <p style={{ background: "#f8fafc", padding: 12, borderRadius: 8, border: "1px solid #d4dde6" }}>
              {docDetalhe.observacao}
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button
                type="button"
                className="pd-btn pd-btn-sec"
                onClick={() => {
                  atualizarStatusAtestado(docDetalhe.id, "Recusado");
                  setDocDetalhe({ ...docDetalhe, status: "Recusado" });
                  setAviso(`Documento de ${docDetalhe.aluno} marcado como Recusado.`);
                }}
              >
                Recusar
              </button>
              <button
                type="button"
                className="pd-btn pd-btn-ok"
                onClick={() => {
                  atualizarStatusAtestado(docDetalhe.id, "Aprovado");
                  setDocDetalhe({ ...docDetalhe, status: "Aprovado" });
                  setAviso(`Documento de ${docDetalhe.aluno} aprovado pela AQV.`);
                }}
              >
                Aprovar documento
              </button>
            </div>
          </div>
        )}
      </ModalPainel>
    </EstruturaGestor>
  );
}

export function TurmasGestor() {
  const { dados, adicionarTurma } = useMockSistema();
  const [busca, setBusca] = useState("");
  const [turno, setTurno] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [modalNova, setModalNova] = useState(false);
  const [detalhe, setDetalhe] = useState(null);
  const [aviso, setAviso] = useState("");

  const [form, setForm] = useState({
    codigo: "",
    curso: "Técnico em Mecatrônica",
    turno: "Noturno",
    periodo: "2º semestre de 2026",
    sala: "Lab 05",
    capacidade: "28",
  });
  const [diasAula, setDiasAula] = useState([
    { id: 1, dia: "Segunda-feira", inicio: "18:30", fim: "22:00" },
    { id: 2, dia: "Quarta-feira", inicio: "18:30", fim: "22:00" },
  ]);

  const filtradas = dados.turmas.filter((t) => {
    const q = busca.toLowerCase();
    const matchTexto =
      t.codigo.toLowerCase().includes(q) ||
      t.curso.toLowerCase().includes(q) ||
      t.sala.toLowerCase().includes(q);
    const matchTurno = turno === "Todos" || t.turno === turno;
    return matchTexto && matchTurno;
  });

  const porPagina = 5;
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const exibidas = filtradas.slice((paginaSegura - 1) * porPagina, paginaSegura * porPagina);

  function salvarTurma(e) {
    e.preventDefault();
    if (!form.codigo.trim() || !form.curso.trim()) return;
    const primeiro = diasAula[0];
    const horarioResumo = primeiro
      ? `${primeiro.inicio.replace(":", "h")} - ${primeiro.fim.replace(":", "h")}`
      : "07h45 - 11h15";
    const criada = adicionarTurma({
      ...form,
      horario: horarioResumo,
      totalAlunos: Number(form.capacidade) || 28,
      diasAula,
      minhaTurma: false,
    });
    setModalNova(false);
    setForm({
      codigo: "",
      curso: "Técnico em Mecatrônica",
      turno: "Noturno",
      periodo: "2º semestre de 2026",
      sala: "Lab 05",
      capacidade: "28",
    });
    setAviso(`Turma ${criada.codigo} (${criada.curso}) cadastrada com sucesso.`);
  }

  return (
    <EstruturaGestor
      titulo="Turmas da Unidade"
      subtitulo="Consulte todas as turmas, horários, capacidade e atrasos registrados hoje."
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
              placeholder="Buscar por turma, curso ou sala..."
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
            <option value="Noturno">Noturno</option>
            <option value="Integral">Integral</option>
          </select>
        </div>

        <TabelaPainel
          cabecalhos={["Turma", "Curso", "Turno / Sala", "Alunos", "Atrasos hoje", "Ações"]}
          quantidade={exibidas.length}
        >
          {exibidas.map((t) => (
            <tr key={t.id}>
              <td><strong>{t.codigo}</strong></td>
              <td>{t.curso}</td>
              <td>{t.turno} · {t.sala}</td>
              <td>{t.totalAlunos}/{t.capacidade}</td>
              <td><span className="pd-pill-red">{t.atrasosHoje}</span></td>
              <td>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="pd-btn pd-btn-sec pd-btn-sm"
                    onClick={() => setDetalhe(t)}
                  >
                    <Eye size={14} /> Horários
                  </button>
                  <Link
                    className="pd-btn pd-btn-sm"
                    to={`/gestor/alunos?turma=${encodeURIComponent(t.codigo)}`}
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
        <form className="pd-form-grid" onSubmit={salvarTurma}>
          <div className="pd-field">
            <label htmlFor="gest-turma-cod">Código da turma</label>
            <input
              id="gest-turma-cod"
              className="pd-input"
              required
              placeholder="Ex.: MEC-02"
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
            />
          </div>
          <div className="pd-field">
            <label htmlFor="gest-turma-turno">Turno</label>
            <select
              id="gest-turma-turno"
              className="pd-select"
              value={form.turno}
              onChange={(e) => setForm({ ...form, turno: e.target.value })}
            >
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noturno</option>
              <option>Integral</option>
            </select>
          </div>
          <div className="pd-field full">
            <label htmlFor="gest-turma-curso">Curso</label>
            <input
              id="gest-turma-curso"
              className="pd-input"
              required
              value={form.curso}
              onChange={(e) => setForm({ ...form, curso: e.target.value })}
            />
          </div>
          <div className="pd-field">
            <label htmlFor="gest-turma-sala">Sala / Laboratório</label>
            <input
              id="gest-turma-sala"
              className="pd-input"
              value={form.sala}
              onChange={(e) => setForm({ ...form, sala: e.target.value })}
            />
          </div>
          <div className="pd-field">
            <label htmlFor="gest-turma-cap">Capacidade</label>
            <input
              id="gest-turma-cap"
              type="number"
              min="1"
              className="pd-input"
              value={form.capacidade}
              onChange={(e) => setForm({ ...form, capacidade: e.target.value })}
            />
          </div>
          <div className="pd-field full">
            <div className="pd-card-head" style={{ marginBottom: 8 }}>
              <label>Dias e horários de aula</label>
              <button
                type="button"
                className="pd-btn pd-btn-sec pd-btn-sm"
                onClick={() =>
                  setDiasAula((prev) => [
                    ...prev,
                    { id: Date.now(), dia: "Sexta-feira", inicio: "18:30", fim: "22:00" },
                  ])
                }
              >
                <Plus size={14} /> Adicionar dia
              </button>
            </div>
            {diasAula.map((item) => (
              <div
                key={item.id}
                style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr auto", gap: 8, marginBottom: 8 }}
              >
                <select
                  className="pd-select"
                  value={item.dia}
                  onChange={(e) =>
                    setDiasAula(
                      diasAula.map((d) => (d.id === item.id ? { ...d, dia: e.target.value } : d))
                    )
                  }
                >
                  {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"].map(
                    (dia) => (
                      <option key={dia}>{dia}</option>
                    )
                  )}
                </select>
                <input
                  type="time"
                  className="pd-input"
                  value={item.inicio}
                  onChange={(e) =>
                    setDiasAula(
                      diasAula.map((d) => (d.id === item.id ? { ...d, inicio: e.target.value } : d))
                    )
                  }
                />
                <input
                  type="time"
                  className="pd-input"
                  value={item.fim}
                  onChange={(e) =>
                    setDiasAula(
                      diasAula.map((d) => (d.id === item.id ? { ...d, fim: e.target.value } : d))
                    )
                  }
                />
                <button
                  type="button"
                  className="pd-btn pd-btn-sec pd-btn-sm"
                  aria-label="Remover dia"
                  disabled={diasAula.length <= 1}
                  onClick={() => setDiasAula(diasAula.filter((d) => d.id !== item.id))}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
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
        aberto={Boolean(detalhe)}
        titulo={detalhe ? `Turma ${detalhe.codigo}` : ""}
        aoFechar={() => setDetalhe(null)}
      >
        {detalhe && (
          <div>
            <p><strong>Curso:</strong> {detalhe.curso}</p>
            <p><strong>Período:</strong> {detalhe.periodo} · <strong>Turno:</strong> {detalhe.turno}</p>
            <p><strong>Sala:</strong> {detalhe.sala} · <strong>Ocupação:</strong> {detalhe.totalAlunos}/{detalhe.capacidade} alunos</p>
            <h3 style={{ marginBottom: 8 }}>Grade horária</h3>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {(detalhe.diasAula || []).map((d, idx) => (
                <li key={`${d.dia}-${idx}`} style={{ marginBottom: 4 }}>
                  <strong>{d.dia}:</strong> {d.inicio} às {d.fim}
                </li>
              ))}
            </ul>
          </div>
        )}
      </ModalPainel>
    </EstruturaGestor>
  );
}

export function AlunosGestor() {
  const { dados } = useMockSistema();
  const [searchParams] = useSearchParams();
  const turmaInicial = searchParams.get("turma") || "Todas";

  const [busca, setBusca] = useState("");
  const [turma, setTurma] = useState(turmaInicial);
  const [status, setStatus] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [selecionado, setSelecionado] = useState(null);

  const filtrados = dados.alunos.filter((a) => {
    const q = busca.toLowerCase();
    const matchTexto = a.nome.toLowerCase().includes(q) || a.ra.includes(q);
    const matchTurma = turma === "Todas" || a.turma === turma;
    const matchStatus = status === "Todos" || a.status === status;
    return matchTexto && matchTurma && matchStatus;
  });

  const porPagina = 5;
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const exibidos = filtrados.slice((paginaSegura - 1) * porPagina, paginaSegura * porPagina);

  return (
    <EstruturaGestor
      titulo="Alunos"
      subtitulo="Acompanhe os estudantes de toda a unidade, histórico de atrasos e acolhimentos."
      mostrarVoltar
    >
      <section className="pd-card">
        <div className="pd-toolbar">
          <div className="pd-search-wrap">
            <Search size={17} />
            <input
              type="text"
              className="pd-input"
              placeholder="Buscar aluno por nome ou RA..."
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
            {dados.turmas.map((t) => (
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
          cabecalhos={["Aluno", "RA", "Turma", "Ocorrências", "Último atraso", "Frequência", "Status", "Ações"]}
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
              <td>{a.ultimoAtraso}</td>
              <td>{a.frequencia}%</td>
              <td><StatusBadge valor={a.status} /></td>
              <td>
                <button
                  type="button"
                  className="pd-btn pd-btn-sec pd-btn-sm"
                  onClick={() => setSelecionado(a)}
                >
                  <Eye size={14} /> Ver histórico
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
        titulo={selecionado ? `Histórico · ${selecionado.nome}` : ""}
        aoFechar={() => setSelecionado(null)}
      >
        {selecionado && (
          <div>
            <p><strong>RA:</strong> {selecionado.ra} · <strong>Turma:</strong> {selecionado.turma}</p>
            <p><strong>E-mail:</strong> {selecionado.email} · <strong>Telefone:</strong> {selecionado.telefone}</p>
            <p><strong>Frequência:</strong> {selecionado.frequencia}% · <strong>Status:</strong> <StatusBadge valor={selecionado.status} /></p>
            <p style={{ background: "#f8fafc", padding: 12, borderRadius: 8, border: "1px solid #d4dde6" }}>
              {selecionado.observacao}
            </p>
            <h3 style={{ marginBottom: 8 }}>Ordens de Serviço do aluno</h3>
            {dados.ocorrencias
              .filter((o) => o.aluno === selecionado.nome)
              .map((o) => (
                <div className="pd-list-item" key={o.id}>
                  <div>
                    <strong>{o.id}</strong> · {o.motivo} ({o.data})
                  </div>
                  <StatusBadge valor={o.status} />
                </div>
              ))}
          </div>
        )}
      </ModalPainel>
    </EstruturaGestor>
  );
}

export function RelatoriosGestor() {
  const { dados } = useMockSistema();
  return (
    <EstruturaGestor
      titulo="Relatórios da Gestão"
      subtitulo="Visão consolidada de todas as turmas, ocorrências e indicadores da unidade."
      mostrarVoltar
    >
      <RelatoriosConteudo dados={dados} apenasMinhasTurmas={false} />
    </EstruturaGestor>
  );
}

export function GerarQrcodeGestor() {
  const [tempo, setTempo] = useState(900);
  const [codigo, setCodigo] = useState("");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!codigo) return undefined;
    const intervalo = setInterval(() => {
      setTempo((valor) => (valor <= 1 ? 0 : valor - 1));
    }, 1000);
    return () => clearInterval(intervalo);
  }, [codigo]);

  function gerarNovo() {
    setCodigo(`SENAI-DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`);
    setTempo(900);
    setCopiado(false);
  }

  async function copiarCodigo() {
    if (!codigo) return;
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  }

  const minutos = String(Math.floor(tempo / 60)).padStart(2, "0");
  const segundos = String(tempo % 60).padStart(2, "0");
  const ativo = Boolean(codigo && tempo > 0);

  return (
    <EstruturaGestor
      titulo="Gerar QR Code de Presença"
      subtitulo="Disponibilize o código temporário para os alunos registrarem chegada pela portaria."
      mostrarVoltar
    >
      <section className="pd-grid-2">
        <article className="pd-card" style={{ marginBottom: 0 }}>
          <div className="pd-card-head">
            <h2>Como funciona na unidade</h2>
          </div>
          <div className="pd-list-item">
            <div className="pd-list-left">
              <div className="pd-code-badge">01</div>
              <div className="pd-list-text">
                <strong>Um código para todos</strong>
                <span>O mesmo QR Code pode ser lido por todos os alunos na chegada.</span>
              </div>
            </div>
          </div>
          <div className="pd-list-item">
            <div className="pd-list-left">
              <div className="pd-code-badge">02</div>
              <div className="pd-list-text">
                <strong>Validade de 15 minutos</strong>
                <span>Após a expiração do contador, gere um novo código de acesso.</span>
              </div>
            </div>
          </div>
          <div className="pd-list-item">
            <div className="pd-list-left">
              <div className="pd-code-badge">03</div>
              <div className="pd-list-text">
                <strong>Registro individual no portal do aluno</strong>
                <span>O aluno lê o QR Code em “Registrar chegada” e informa o motivo do atraso.</span>
              </div>
            </div>
          </div>
        </article>

        <article className="pd-card" style={{ marginBottom: 0 }}>
          <div className="pd-card-head">
            <div>
              <h2>QR Code geral</h2>
              <span style={{ fontSize: 13, color: "#5a6b7d" }}>Disponível para todos os alunos</span>
            </div>
            <span className={`pd-status ${ativo ? "verde" : codigo ? "vermelho" : "cinza"}`}>
              {ativo ? "Ativo" : codigo ? "Expirado" : "Aguardando"}
            </span>
          </div>

          <div className="pd-qr-box">
            <div className="pd-qr-frame">
              {ativo ? (
                <QRCodeCanvas value={codigo} size={200} level="H" />
              ) : (
                <div style={{ color: "#64748b", padding: 16 }}>
                  <QrCode size={56} style={{ marginBottom: 8 }} />
                  <p style={{ margin: 0, fontWeight: 700 }}>
                    {codigo ? "QR Code expirado" : "Nenhum código gerado"}
                  </p>
                </div>
              )}
            </div>

            {codigo && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                <strong>Código: {codigo}</strong>
                <button type="button" className="pd-btn pd-btn-sec pd-btn-sm" onClick={copiarCodigo}>
                  <Copy size={14} /> {copiado ? "Copiado!" : "Copiar"}
                </button>
              </div>
            )}

            <div>
              <span style={{ fontSize: 13, color: "#5a6b7d", display: "block" }}>Tempo restante</span>
              <strong style={{ fontSize: 28 }}>
                {codigo ? `${minutos}:${segundos}` : "15:00"}
              </strong>
            </div>

            <button type="button" className="pd-btn" onClick={gerarNovo}>
              <RefreshCw size={16} /> {codigo ? "Gerar novo QR Code" : "Gerar QR Code"}
            </button>
          </div>
        </article>
      </section>
    </EstruturaGestor>
  );
}

export function PerfilGestor() {
  const { resetarDemo } = useMockSistema();
  const [aviso, setAviso] = useState("");

  return (
    <EstruturaGestor
      titulo="Meu Perfil"
      subtitulo="Confira seus dados pessoais e funcionais da gestão AQV."
      mostrarVoltar
      acoes={
        <button
          type="button"
          className="pd-btn pd-btn-sec"
          onClick={() => {
            resetarDemo();
            setAviso("Dados fictícios restaurados para o estado inicial.");
          }}
        >
          <RefreshCw size={15} /> Restaurar dados demo
        </button>
      }
    >
      {aviso && <div className="pd-feedback">{aviso}</div>}
      <PerfilConteudo
        perfil={perfilGestor}
        rotaContato="/gestor/contato"
        detalhesExtra={[
          ["Setor", perfilGestor.setor],
          ["Horário", perfilGestor.turno],
          ["Situação", "Ativa"],
          ["Unidade", perfilGestor.unidade],
        ]}
      />
    </EstruturaGestor>
  );
}

export function ContatoGestor() {
  return (
    <EstruturaGestor
      titulo="Contato da Unidade"
      subtitulo="Canais de atendimento institucional da Escola SENAI."
      mostrarVoltar
    >
      <ContatoConteudo rotaPerfil="/gestor/perfil" />
    </EstruturaGestor>
  );
}
