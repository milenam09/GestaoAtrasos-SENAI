import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Download,
  Mail,
  MapPin,
  Phone,
  Clock,
  Building2,
  UserRound,
  X,
} from "lucide-react";
import SidebarPadrao from "./SidebarPadrao.jsx";
import { unidadeContato } from "../../data/mockSistema.js";
import "../../css/global/PainelDemo.css";

export function PainelLayout({
  usuario,
  links,
  rotaInicio,
  titulo,
  subtitulo,
  acoes,
  mostrarVoltar = false,
  children,
}) {
  const navigate = useNavigate();

  return (
    <div className="painel-demo">
      <SidebarPadrao
        nome={usuario.nomeCurto}
        cargo={usuario.cargo}
        foto={usuario.foto}
        rotaInicio={rotaInicio}
        links={links}
      />

      <main className="pd-main">
        <div className="pd-demo-banner">Ambiente de demonstração · dados fictícios</div>

        {(titulo || acoes) && (
          <header className="pd-header">
            <div className="pd-header-left">
              {mostrarVoltar && (
                <button
                  type="button"
                  className="pd-back-btn"
                  aria-label="Voltar"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft size={19} />
                </button>
              )}
              <div>
                {titulo && <h1>{titulo}</h1>}
                {subtitulo && <p>{subtitulo}</p>}
              </div>
            </div>
            {acoes && <div className="pd-header-actions">{acoes}</div>}
          </header>
        )}

        {children}
      </main>
    </div>
  );
}

const MAPA_STATUS = {
  Concluída: "verde",
  Aprovado: "verde",
  "Em andamento": "amarelo",
  Andamento: "amarelo",
  "Em análise": "amarelo",
  "Aguardando retorno": "azul",
  Pendente: "vermelho",
  Recusado: "vermelho",
  Alta: "vermelho",
  Média: "amarelo",
  Baixa: "verde",
};

export function StatusBadge({ valor }) {
  const cor = MAPA_STATUS[valor] || "cinza";
  return <span className={`pd-status ${cor}`}>{valor}</span>;
}

export function CardKpi({ titulo, valor, descricao, cor = "vermelho", Icone }) {
  return (
    <article className={`pd-kpi ${cor}`}>
      <div className="pd-kpi-top">
        {Icone && <Icone size={19} strokeWidth={2.2} />}
        <span>{titulo}</span>
      </div>
      <strong>{valor}</strong>
      <span>{descricao}</span>
    </article>
  );
}

export function TabelaPainel({ cabecalhos, vazia = "Nenhum registro encontrado.", children, quantidade }) {
  return (
    <div className="pd-table-wrap">
      <table className="pd-table">
        <thead>
          <tr>
            {cabecalhos.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {quantidade > 0 ? (
            children
          ) : (
            <tr>
              <td colSpan={cabecalhos.length} style={{ textAlign: "center", color: "#64748b", padding: 28 }}>
                {vazia}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function PaginacaoPainel({ paginaAtual, totalPaginas, totalItens, porPagina, aoMudar }) {
  const inicio = totalItens === 0 ? 0 : (paginaAtual - 1) * porPagina + 1;
  const fim = Math.min(paginaAtual * porPagina, totalItens);

  return (
    <div className="pd-pagination">
      <span>
        Mostrando {inicio} – {fim} de {totalItens} registro(s)
      </span>
      <div className="pd-page-btns">
        <button
          type="button"
          className="pd-page-btn"
          disabled={paginaAtual <= 1}
          onClick={() => aoMudar(paginaAtual - 1)}
        >
          ‹
        </button>
        {Array.from({ length: totalPaginas }, (_, idx) => idx + 1).map((num) => (
          <button
            key={num}
            type="button"
            className={`pd-page-btn ${num === paginaAtual ? "active" : ""}`}
            onClick={() => aoMudar(num)}
          >
            {num}
          </button>
        ))}
        <button
          type="button"
          className="pd-page-btn"
          disabled={paginaAtual >= totalPaginas}
          onClick={() => aoMudar(paginaAtual + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export function ModalPainel({ aberto, titulo, aoFechar, children }) {
  if (!aberto) return null;
  return (
    <div
      className="pd-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
      onClick={(e) => {
        if (e.target === e.currentTarget) aoFechar();
      }}
    >
      <div className="pd-modal">
        <div className="pd-modal-head">
          <h2>{titulo}</h2>
          <button
            type="button"
            className="pd-btn pd-btn-sec pd-btn-sm"
            aria-label="Fechar modal"
            onClick={aoFechar}
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const CORES_GRAFICO = ["#e30613", "#0f4c81", "#f59e0b", "#10b981", "#7c3aed", "#64748b"];

export function GraficoBarrasPainel({ itens, corUnica }) {
  const maximo = Math.max(...itens.map((i) => i.total), 1);

  return (
    <div>
      <div className="pd-bar-chart">
        {itens.map((item, idx) => (
          <div className="pd-bar-col" key={item.rotulo}>
            <span className="pd-bar-val">{item.total}</span>
            <div
              className="pd-bar-fill"
              style={{
                height: `${Math.max(8, (item.total / maximo) * 82)}%`,
                backgroundColor: corUnica || CORES_GRAFICO[idx % CORES_GRAFICO.length],
              }}
            />
          </div>
        ))}
      </div>
      <div className="pd-bar-labels">
        {itens.map((item) => (
          <span key={item.rotulo}>{item.rotulo}</span>
        ))}
      </div>
    </div>
  );
}

export function GraficoRoscaPainel({ itens }) {
  const total = Math.max(
    itens.reduce((acc, i) => acc + i.quantidade, 0),
    1
  );
  const raio = 58;
  const circunferencia = 2 * Math.PI * raio;
  const segmentos = itens.reduce((acc, item, idx) => {
    const inicio = acc.length ? acc[acc.length - 1].fim : 0;
    const fracao = item.quantidade / total;
    acc.push({
      ...item,
      cor: CORES_GRAFICO[idx % CORES_GRAFICO.length],
      comprimento: fracao * circunferencia,
      offset: -inicio * circunferencia,
      fim: inicio + fracao,
    });
    return acc;
  }, []);

  return (
    <div className="pd-donut-wrap">
      <svg width="160" height="160" viewBox="0 0 160 160" aria-label="Gráfico de motivos">
        <circle cx="80" cy="80" r={raio} fill="none" stroke="#e2e8f0" strokeWidth="24" />
        {segmentos.map((seg) => (
          <circle
            key={seg.nome}
            cx="80"
            cy="80"
            r={raio}
            fill="none"
            stroke={seg.cor}
            strokeWidth="24"
            strokeDasharray={`${seg.comprimento} ${circunferencia}`}
            strokeDashoffset={seg.offset}
            transform="rotate(-90 80 80)"
          />
        ))}
        <text x="80" y="76" textAnchor="middle" fontSize="22" fontWeight="800" fill="#102033">
          {total}
        </text>
        <text x="80" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">
          registros
        </text>
      </svg>

      <div className="pd-legend">
        {segmentos.map((seg) => {
          const pct = Math.round((seg.quantidade / total) * 100);
          return (
            <div className="pd-legend-row" key={seg.nome}>
              <div className="pd-legend-left">
                <span className="pd-legend-dot" style={{ backgroundColor: seg.cor }} />
                <span>{seg.nome}</span>
              </div>
              <strong>
                {seg.quantidade} ({pct}%)
              </strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RelatoriosConteudo({ dados, apenasMinhasTurmas = false }) {
  const [inicio, setInicio] = useState("2026-11-01");
  const [fim, setFim] = useState("2026-11-27");
  const [turmaFiltro, setTurmaFiltro] = useState("Todas");
  const [mensagem, setMensagem] = useState("");

  const turmasBase = apenasMinhasTurmas
    ? dados.turmas.filter((t) => t.minhaTurma)
    : dados.turmas;
  const codigosBase = new Set(turmasBase.map((t) => t.codigo));

  const ocorrenciasBase = dados.ocorrencias.filter(
    (o) =>
      codigosBase.has(o.turma) &&
      (turmaFiltro === "Todas" || o.turma === turmaFiltro)
  );

  const totalOcorrencias = ocorrenciasBase.length;
  const recorrentes = ocorrenciasBase.filter((o) =>
    o.motivo.toLowerCase().includes("recorrente")
  ).length;
  const concluidas = ocorrenciasBase.filter((o) => o.status === "Concluída").length;
  const emAndamento = ocorrenciasBase.filter((o) => o.status !== "Concluída").length;

  const barrasTurmas = turmasBase.map((t) => ({
    rotulo: t.codigo,
    total: dados.ocorrencias.filter((o) => o.turma === t.codigo).length + t.atrasosHoje,
  }));

  const contagemMotivos = ocorrenciasBase.reduce((acc, o) => {
    acc[o.motivo] = (acc[o.motivo] || 0) + 1;
    return acc;
  }, {});

  const motivosLista = Object.entries(contagemMotivos).map(([nome, quantidade]) => ({
    nome,
    quantidade,
  }));

  const topAlunos = dados.alunos
    .filter((a) => codigosBase.has(a.turma) && (turmaFiltro === "Todas" || a.turma === turmaFiltro))
    .slice()
    .sort((a, b) => b.ocorrencias - a.ocorrencias)
    .slice(0, 5);

  function exportarResumo() {
    const conteudo = {
      geradoEm: new Date().toISOString(),
      periodo: { inicio, fim },
      turma: turmaFiltro,
      resumo: { totalOcorrencias, recorrentes, concluidas, emAndamento },
      ocorrencias: ocorrenciasBase,
    };
    const blob = new Blob([JSON.stringify(conteudo, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio-atrasos-${inicio}-a-${fim}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMensagem("Relatório exportado em JSON com os dados simulados do período.");
  }

  return (
    <>
      {mensagem && <div className="pd-feedback">{mensagem}</div>}

      <section className="pd-card">
        <div className="pd-toolbar" style={{ marginBottom: 0 }}>
          <div className="pd-field" style={{ minWidth: 160 }}>
            <label htmlFor="rel-inicio">Data inicial</label>
            <input
              id="rel-inicio"
              type="date"
              className="pd-input"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
            />
          </div>
          <div className="pd-field" style={{ minWidth: 160 }}>
            <label htmlFor="rel-fim">Data final</label>
            <input
              id="rel-fim"
              type="date"
              className="pd-input"
              value={fim}
              onChange={(e) => setFim(e.target.value)}
            />
          </div>
          <div className="pd-field" style={{ minWidth: 170 }}>
            <label htmlFor="rel-turma">Turma</label>
            <select
              id="rel-turma"
              className="pd-select"
              value={turmaFiltro}
              onChange={(e) => setTurmaFiltro(e.target.value)}
            >
              <option value="Todas">Todas</option>
              {turmasBase.map((t) => (
                <option key={t.id} value={t.codigo}>
                  {t.codigo} — {t.curso}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
            <button type="button" className="pd-btn" onClick={exportarResumo}>
              <Download size={16} /> Exportar relatório
            </button>
          </div>
        </div>
      </section>

      <section className="pd-kpi-grid">
        <CardKpi
          titulo="Total de ocorrências"
          valor={totalOcorrencias}
          descricao={`Período ${inicio.split("-").reverse().join("/")} a ${fim.split("-").reverse().join("/")}`}
          cor="vermelho"
        />
        <CardKpi
          titulo="Atrasos recorrentes"
          valor={recorrentes}
          descricao="Casos com reincidência"
          cor="laranja"
        />
        <CardKpi
          titulo="Em acompanhamento"
          valor={emAndamento}
          descricao="Pendentes ou em análise"
          cor="roxo"
        />
        <CardKpi
          titulo="Casos concluídos"
          valor={concluidas}
          descricao="Atendimentos finalizados"
          cor="verde"
        />
      </section>

      <section className="pd-grid-2">
        <article className="pd-card">
          <div className="pd-card-head">
            <h2>Ocorrências e atrasos por turma</h2>
          </div>
          <GraficoBarrasPainel itens={barrasTurmas} />
        </article>

        <article className="pd-card">
          <div className="pd-card-head">
            <h2>Motivos das ocorrências</h2>
          </div>
          {motivosLista.length > 0 ? (
            <GraficoRoscaPainel itens={motivosLista} />
          ) : (
            <p style={{ color: "#64748b" }}>Nenhuma ocorrência para o filtro selecionado.</p>
          )}
        </article>
      </section>

      <section className="pd-card">
        <div className="pd-card-head">
          <h2>Alunos com maior número de ocorrências</h2>
        </div>
        <TabelaPainel
          cabecalhos={["Posição", "Aluno", "Turma", "Ocorrências", "Frequência", "Status"]}
          quantidade={topAlunos.length}
        >
          {topAlunos.map((al, idx) => (
            <tr key={al.id}>
              <td>
                <strong>#{idx + 1}</strong>
              </td>
              <td>{al.nome}</td>
              <td>{al.turma}</td>
              <td>{al.ocorrencias}</td>
              <td>{al.frequencia}%</td>
              <td>
                <StatusBadge valor={al.status} />
              </td>
            </tr>
          ))}
        </TabelaPainel>
      </section>
    </>
  );
}

export function PerfilConteudo({ perfil, detalhesExtra, rotaContato }) {
  const inputRef = useRef(null);
  const [foto, setFoto] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function aoSelecionarFoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setErro("Selecione uma imagem JPG ou PNG de até 5 MB.");
      setSucesso("");
      return;
    }
    setErro("");
    const reader = new FileReader();
    reader.onload = () => {
      setFoto(reader.result);
      setSucesso("Foto de perfil atualizada nesta sessão.");
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      {sucesso && <div className="pd-feedback">{sucesso}</div>}
      {erro && (
        <div className="pd-feedback" style={{ background: "#fee2e2", borderColor: "#fecaca", color: "#991b1b" }}>
          {erro}
        </div>
      )}

      <section className="pd-card">
        <div className="pd-profile-head">
          <div className="pd-profile-avatar">
            {foto ? <img src={foto} alt={perfil.nome} /> : <UserRound size={42} />}
          </div>
          <div>
            <h2 style={{ margin: "0 0 4px" }}>{perfil.nome}</h2>
            <span style={{ color: "#5a6b7d", fontSize: 14 }}>{perfil.cargo}</span>
          </div>
          <button
            type="button"
            className="pd-btn"
            style={{ marginLeft: "auto" }}
            onClick={() => inputRef.current?.click()}
          >
            <Camera size={17} /> Editar foto
          </button>
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/png,image/jpeg"
            onChange={aoSelecionarFoto}
          />
        </div>

        <div className="pd-grid-2">
          <article className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }}>
            <div className="pd-card-head">
              <h2>Dados pessoais</h2>
            </div>
            <p>
              <strong>Nome completo</strong>
              <br />
              {perfil.nome}
            </p>
            <p>
              <strong>Data de nascimento</strong>
              <br />
              {perfil.nascimento}
            </p>
            <p>
              <strong>E-mail institucional</strong>
              <br />
              {perfil.email}
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Telefone</strong>
              <br />
              {perfil.telefone}
            </p>
          </article>

          <article className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }}>
            <div className="pd-card-head">
              <h2>Dados funcionais</h2>
            </div>
            {detalhesExtra.map(([chave, valor]) => (
              <p key={chave}>
                <strong>{chave}</strong>
                <br />
                {valor}
              </p>
            ))}
          </article>
        </div>
      </section>

      <section className="pd-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h3 style={{ margin: "0 0 4px" }}>Precisa atualizar seus dados?</h3>
          <p style={{ margin: 0, color: "#5a6b7d", fontSize: 14 }}>
            Entre em contato com a secretaria da unidade para solicitar alterações cadastrais.
          </p>
        </div>
        <Link className="pd-btn" to={rotaContato}>
          Ver contato da unidade
        </Link>
      </section>
    </>
  );
}

export function ContatoConteudo({ rotaPerfil }) {
  return (
    <section className="pd-card">
      <div className="pd-contact-banner">
        <h2>{unidadeContato.escola}</h2>
        <p>{unidadeContato.subtitulo}</p>
      </div>

      <div className="pd-grid-2">
        <div className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
            <MapPin size={18} color="#e30613" /> Endereço
          </h3>
          <p style={{ marginBottom: 0 }}>{unidadeContato.endereco}</p>
        </div>

        <div className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
            <Phone size={18} color="#e30613" /> Telefone e WhatsApp
          </h3>
          <p style={{ marginBottom: 4 }}>Telefone: {unidadeContato.telefone}</p>
          <p style={{ marginBottom: 0 }}>WhatsApp: {unidadeContato.whatsapp}</p>
        </div>

        <div className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
            <Mail size={18} color="#e30613" /> E-mail da Secretaria
          </h3>
          <p style={{ marginBottom: 0 }}>{unidadeContato.email}</p>
        </div>

        <div className="pd-card" style={{ marginBottom: 0, background: "#f8fafc" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
            <Clock size={18} color="#e30613" /> Horário de Atendimento
          </h3>
          <p style={{ marginBottom: 0 }}>{unidadeContato.horario}</p>
        </div>

        <div className="pd-card" style={{ marginBottom: 0, background: "#f8fafc", gridColumn: "1 / -1" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 0 }}>
            <Building2 size={18} color="#071d2b" /> Central de Relacionamento (SENAI-SP)
          </h3>
          <p style={{ marginBottom: 0 }}>{unidadeContato.central}</p>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Link className="pd-btn" to={rotaPerfil}>
          Voltar ao perfil
        </Link>
      </div>
    </section>
  );
}
