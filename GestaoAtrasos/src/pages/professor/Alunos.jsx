import React, { useState } from "react";
import "../../css/professor/Alunos.css";

export default function Alunos() {
  const todosAlunos = [
    { id: 1, avatar: "JS", classeAvatar: "avatar-js", nome: "Joao Silva", turma: "T1A", ocorrencias: 6, ultimoAtraso: "10/03/2026", status: "Em andamento", statusClasse: "status-andamento", mensagem: "O atendimento pedagógico relativo ao atraso do dia 10/03/2026 está em andamento com a coordenação." },
    { id: 2, avatar: "MM", classeAvatar: "avatar-mm", nome: "Milena Mares", turma: "T3A", ocorrencias: 3, ultimoAtraso: "05/03/2026", status: "Pendente", statusClasse: "status-pendente", mensagem: "O atestado que você (Milena Mares) apresentou no dia 05/03/2026 está pendente de validação." },
    { id: 3, avatar: "BP", classeAvatar: "avatar-bp", nome: "Beatryz Paz", turma: "T2B", ocorrencias: 2, ultimoAtraso: "20/02/2026", status: "Em andamento", statusClasse: "status-andamento", mensagem: "A justificativa enviada para o atraso do dia 20/02/2026 está em análise." },
    { id: 4, avatar: "AB", classeAvatar: "avatar-ab", nome: "Anna Beatriz", turma: "T2A", ocorrencias: 7, ultimoAtraso: "12/02/2026", status: "Pendente", statusClasse: "status-pendente", mensagem: "A documentação apresentada no dia 12/02/2026 está pendente de assinatura da secretaria." },
    { id: 5, avatar: "IG", classeAvatar: "avatar-ig", nome: "Isabela Garcia", turma: "T2B", ocorrencias: 4, ultimoAtraso: "03/02/2026", status: "Concluida", statusClasse: "status-concluida", mensagem: "O processo referente às ocorrências do início de fevereiro foi concluído." },
    { id: 6, avatar: "LC", classeAvatar: "avatar-js", nome: "Lucas Costa", turma: "T1A", ocorrencias: 1, ultimoAtraso: "28/01/2026", status: "Pendente", statusClasse: "status-pendente", mensagem: "O atestado entregue pelo aluno no dia 28/01/2026 está pendente de homologação médica." },
    { id: 7, avatar: "MA", classeAvatar: "avatar-mm", nome: "Mariana Alves", turma: "T3A", ocorrencias: 5, ultimoAtraso: "15/01/2026", status: "Em andamento", statusClasse: "status-andamento", mensagem: "Acompanhamento do histórico de atrasos em andamento com a diretoria." },
    { id: 8, avatar: "GR", classeAvatar: "avatar-ig", nome: "Gabriel Rocha", turma: "T1A", ocorrencias: 2, ultimoAtraso: "10/01/2026", status: "Concluida", statusClasse: "status-concluida", mensagem: "Justificativa aceita e processo finalizado." },
    { id: 9, avatar: "SF", classeAvatar: "avatar-bp", nome: "Sofia Fernandes", turma: "T2A", ocorrencias: 8, ultimoAtraso: "08/01/2026", status: "Pendente", statusClasse: "status-pendente", mensagem: "Comprovante de atendimento médico do dia 08/01/2026 pendente de envio presencial." },
    { id: 10, avatar: "PL", classeAvatar: "avatar-ab", nome: "Pedro Lima", turma: "T3A", ocorrencias: 3, ultimoAtraso: "05/01/2026", status: "Em andamento", statusClasse: "status-andamento", mensagem: "Agendada reunião de orientação pedagógica." },
    { id: 11, avatar: "CS", classeAvatar: "avatar-js", nome: "Clara Sousa", turma: "T2B", ocorrencias: 4, ultimoAtraso: "18/12/2025", status: "Pendente", statusClasse: "status-pendente", mensagem: "Declaração de trabalho enviada pendente de conferência dos horários." },
    { id: 12, avatar: "VR", classeAvatar: "avatar-ig", nome: "Vinicius Ribeiro", turma: "T2B", ocorrencias: 1, ultimoAtraso: "12/12/2025", status: "Concluida", statusClasse: "status-concluida", mensagem: "Ocorrência justificada e baixada do sistema." },
    { id: 13, avatar: "LM", classeAvatar: "avatar-bp", nome: "Lara Martins", turma: "T3A", ocorrencias: 6, ultimoAtraso: "01/12/2025", status: "Em andamento", statusClasse: "status-andamento", mensagem: "Plano de reposição de atividades em andamento." },
    { id: 14, avatar: "EN", classeAvatar: "avatar-mm", nome: "Enzo Nogueira", turma: "T1A", ocorrencias: 2, ultimoAtraso: "20/11/2025", status: "Pendente", statusClasse: "status-pendente", mensagem: "O atestado do dia 20/11/2025 possui rasura e está pendente de regularização." },
    { id: 15, avatar: "RF", classeAvatar: "avatar-ig", nome: "Rafaela Faria", turma: "T2A", ocorrencias: 5, ultimoAtraso: "15/11/2025", status: "Concluida", statusClasse: "status-concluida", mensagem: "Caso arquivado após alinhamento pedagógico." },
    { id: 16, avatar: "MO", classeAvatar: "avatar-ab", nome: "Mateus Oliveira", turma: "T3A", ocorrencias: 3, ultimoAtraso: "10/11/2025", status: "Pendente", statusClasse: "status-pendente", mensagem: "Pendência de assinatura dos responsáveis no formulário de justificativa." },
    { id: 17, avatar: "BC", classeAvatar: "avatar-js", nome: "Bianca Carvalho", turma: "T1A", ocorrencias: 1, ultimoAtraso: "02/11/2025", status: "Em andamento", statusClasse: "status-andamento", mensagem: "Análise de frequência em andamento pelo conselho de classe." },
    { id: 18, avatar: "DF", classeAvatar: "avatar-mm", nome: "Diego Ferreira", turma: "T2B", ocorrencias: 9, ultimoAtraso: "25/10/2025", status: "Pendente", statusClasse: "status-pendente", mensagem: "O atestado médico entregue em 25/10/2025 está pendente de confirmação." },
    { id: 19, avatar: "NM", classeAvatar: "avatar-ig", nome: "Nicole Mendes", turma: "T3A", ocorrencias: 2, ultimoAtraso: "18/10/2025", status: "Concluida", statusClasse: "status-concluida", mensagem: "Ocorrência sanada e encerrada." },
    { id: 20, avatar: "TB", classeAvatar: "avatar-bp", nome: "Thiago Barbosa", turma: "T1A", ocorrencias: 4, ultimoAtraso: "12/10/2025", status: "Em andamento", statusClasse: "status-andamento", mensagem: "Conversa de acompanhamento marcada para esta semana." },
    { id: 21, avatar: "LD", classeAvatar: "avatar-mm", nome: "Leticia Dias", turma: "T2A", ocorrencias: 2, ultimoAtraso: "05/10/2025", status: "Pendente", statusClasse: "status-pendente", mensagem: "O atestado que você apresentou no dia 05/10/2025 está pendente de validação." },
    { id: 22, avatar: "GC", classeAvatar: "avatar-js", nome: "Guilherme Castro", turma: "T3A", ocorrencias: 7, ultimoAtraso: "01/10/2025", status: "Em andamento", statusClasse: "status-andamento", mensagem: "Processo em andamento com a equipe de tutoria." },
    { id: 23, avatar: "VT", classeAvatar: "avatar-ig", nome: "Victoria Torres", turma: "T1A", ocorrencias: 1, ultimoAtraso: "20/09/2025", status: "Concluida", statusClasse: "status-concluida", mensagem: "Sem pendências registradas." },
    { id: 24, avatar: "FP", classeAvatar: "avatar-bp", nome: "Felipe Pereira", turma: "T2B", ocorrencias: 3, ultimoAtraso: "15/09/2025", status: "Pendente", statusClasse: "status-pendente", mensagem: "O atestado do dia 15/09/2025 está pendente de entrega do documento físico original." },
    { id: 25, avatar: "AM", classeAvatar: "avatar-ig", nome: "Amanda Machado", turma: "T3A", ocorrencias: 5, ultimoAtraso: "10/09/2025", status: "Concluida", statusClasse: "status-concluida", mensagem: "Concluída a justificativa do semestre." }
  ];

  const [busca, setBusca] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState("Todas as turmas");
  const [statusSelecionado, setStatusSelecionado] = useState("Todos os status");

  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [turmaTemporaria, setTurmaTemporaria] = useState("Todas as turmas");
  const [statusTemporario, setStatusTemporario] = useState("Todos os status");
  const [ocorrenciasMin, setOcorrenciasMin] = useState("");
  const [ocorrenciasMax, setOcorrenciasMax] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [filtrosAplicados, setFiltrosAplicados] = useState({
    ocorrenciasMin: "",
    ocorrenciasMax: "",
    dataInicio: "",
    dataFim: "",
  });

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [alunoSelecionadoModal, setAlunoSelecionadoModal] = useState(null);

  const converterData = (data) => {
    const [dia, mes, ano] = data.split("/");
    return new Date(`${ano}-${mes}-${dia}T00:00:00`);
  };

  const alunosFiltrados = todosAlunos.filter((aluno) => {
    const combinaBusca = aluno.nome.toLowerCase().includes(busca.toLowerCase());

    const combinaTurma =
      turmaSelecionada === "Todas as turmas" ||
      aluno.turma === turmaSelecionada;

    const combinaStatus =
      statusSelecionado === "Todos os status" ||
      aluno.status === statusSelecionado;

    const combinaMin =
      filtrosAplicados.ocorrenciasMin === "" ||
      aluno.ocorrencias >= Number(filtrosAplicados.ocorrenciasMin);

    const combinaMax =
      filtrosAplicados.ocorrenciasMax === "" ||
      aluno.ocorrencias <= Number(filtrosAplicados.ocorrenciasMax);

    const dataAluno = converterData(aluno.ultimoAtraso);

    const combinaDataInicio =
      filtrosAplicados.dataInicio === "" ||
      dataAluno >= new Date(`${filtrosAplicados.dataInicio}T00:00:00`);

    const combinaDataFim =
      filtrosAplicados.dataFim === "" ||
      dataAluno <= new Date(`${filtrosAplicados.dataFim}T23:59:59`);

    return (
      combinaBusca &&
      combinaTurma &&
      combinaStatus &&
      combinaMin &&
      combinaMax &&
      combinaDataInicio &&
      combinaDataFim
    );
  });

  const itensPorPagina = 5;
  const totalPaginas = Math.ceil(alunosFiltrados.length / itensPorPagina) || 1;
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;

  const alunosExibidos = alunosFiltrados.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  const handleVoltar = () => {
    window.history.back();
  };

  const handleVerDetalhes = (aluno) => {
    setAlunoSelecionadoModal(aluno);
  };

  const abrirFiltros = () => {
    setTurmaTemporaria(turmaSelecionada);
    setStatusTemporario(statusSelecionado);
    setFiltrosAbertos(!filtrosAbertos);
  };

  const aplicarFiltros = () => {
    setTurmaSelecionada(turmaTemporaria);
    setStatusSelecionado(statusTemporario);

    setFiltrosAplicados({
      ocorrenciasMin,
      ocorrenciasMax,
      dataInicio,
      dataFim,
    });

    setPaginaAtual(1);
    setFiltrosAbertos(false);
  };

  const limparFiltros = () => {
    setBusca("");
    setTurmaSelecionada("Todas as turmas");
    setStatusSelecionado("Todos os status");
    setTurmaTemporaria("Todas as turmas");
    setStatusTemporario("Todos os status");
    setOcorrenciasMin("");
    setOcorrenciasMax("");
    setDataInicio("");
    setDataFim("");

    setFiltrosAplicados({
      ocorrenciasMin: "",
      ocorrenciasMax: "",
      dataInicio: "",
      dataFim: "",
    });

    setPaginaAtual(1);
  };

  return (
    <div className="alunos-page-container">

      {/* CABEÇALHO */}
      <header className="alunos-header">
        <div className="alunos-header-title">
          <button
            className="btn-voltar"
            type="button"
            onClick={handleVoltar}
            aria-label="Voltar"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19L5 12L12 5" />
              <path d="M3 5V19" />
            </svg>
          </button>

          <h1>Alunos</h1>
        </div>

        <p className="alunos-subtitle">
          Consulte os alunos das suas turmas e acompanhe o histórico de ocorrências.
        </p>
      </header>

      {/* CARD PRINCIPAL */}
      <div className="alunos-card-box">

        {/* PESQUISA E FILTROS */}
        <div className="alunos-filtros-bar">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Buscar por aluno"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPaginaAtual(1);
              }}
            />

            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <button
            className="btn-filtros-red"
            type="button"
            onClick={abrirFiltros}
            aria-expanded={filtrosAbertos}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Filtros
          </button>

          <button
            className="btn-limpar-filtros"
            type="button"
            onClick={limparFiltros}
          >
            Limpar
          </button>
        </div>

        {/* PAINEL DE FILTROS */}
        {filtrosAbertos && (
          <div className="painel-filtros">
            <div className="painel-filtros-titulo">
              <h3>Filtrar alunos</h3>

              <button
                type="button"
                onClick={() => setFiltrosAbertos(false)}
                aria-label="Fechar filtros"
              >
                ×
              </button>
            </div>

            <div className="painel-filtros-grid">
              <label>
                Turma
                <select
                  value={turmaTemporaria}
                  onChange={(e) => setTurmaTemporaria(e.target.value)}
                >
                  <option>Todas as turmas</option>
                  <option>T1A</option>
                  <option>T2A</option>
                  <option>T2B</option>
                  <option>T3A</option>
                </select>
              </label>

              <label>
                Status
                <select
                  value={statusTemporario}
                  onChange={(e) => setStatusTemporario(e.target.value)}
                >
                  <option>Todos os status</option>
                  <option>Em andamento</option>
                  <option>Pendente</option>
                  <option>Concluida</option>
                </select>
              </label>

              <label>
                Mínimo de ocorrências
                <input
                  type="number"
                  min="0"
                  placeholder="Ex.: 2"
                  value={ocorrenciasMin}
                  onChange={(e) => setOcorrenciasMin(e.target.value)}
                />
              </label>

              <label>
                Máximo de ocorrências
                <input
                  type="number"
                  min="0"
                  placeholder="Ex.: 6"
                  value={ocorrenciasMax}
                  onChange={(e) => setOcorrenciasMax(e.target.value)}
                />
              </label>

              <label>
                Último atraso a partir de
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </label>

              <label>
                Último atraso até
                <input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </label>
            </div>

            <div className="painel-filtros-acoes">
              <button
                type="button"
                className="btn-cancelar-filtros"
                onClick={() => setFiltrosAbertos(false)}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn-aplicar-filtros"
                onClick={aplicarFiltros}
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        )}

        {/* TABELA DE ALUNOS */}
        <div className="tabela-wrapper">
          <table className="tabela-alunos">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Turmas</th>
                <th>Ocorrências</th>
                <th>Último Atrasos</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {alunosExibidos.length > 0 ? (
                alunosExibidos.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>
                      <div className="aluno-cell">
                        <div className={`avatar-circulo ${aluno.classeAvatar}`}>
                          {aluno.avatar}
                        </div>
                        <span>{aluno.nome}</span>
                      </div>
                    </td>

                    <td><strong>{aluno.turma}</strong></td>
                    <td><strong>{aluno.ocorrencias}</strong></td>
                    <td><strong>{aluno.ultimoAtraso}</strong></td>

                    <td>
                      <span className={`status-pill ${aluno.statusClasse}`}>
                        {aluno.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn-acao-olho"
                        type="button"
                        onClick={() => handleVerDetalhes(aluno)}
                        title="Ver detalhes da conta"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#64748b"
                    }}
                  >
                    Nenhum aluno encontrado com esses filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}
        <div className="paginacao-bar">
          <span className="paginacao-texto">
            Mostrando {alunosFiltrados.length > 0 ? indiceInicial + 1 : 0} - {Math.min(indiceInicial + itensPorPagina, alunosFiltrados.length)} de {alunosFiltrados.length}
          </span>

          <div className="paginacao-botoes">
            <button
              className="btn-pag"
              type="button"
              disabled={paginaAtual === 1}
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`btn-pag ${paginaAtual === num ? "ativo" : ""}`}
                type="button"
                onClick={() => setPaginaAtual(num)}
              >
                {num}
              </button>
            ))}

            <button
              className="btn-pag"
              type="button"
              disabled={paginaAtual === totalPaginas}
              onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE DETALHES */}
      {alunoSelecionadoModal && (
        <div
          className="modal-overlay"
          onClick={() => setAlunoSelecionadoModal(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-conteudo"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              width: "90%",
              maxWidth: "480px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "12px",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a" }}>
                Status da Conta - {alunoSelecionadoModal.nome}
              </h3>

              <button
                type="button"
                onClick={() => setAlunoSelecionadoModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: "14px", lineHeight: "1.6", color: "#334155" }}>
              <p><strong>Turma:</strong> {alunoSelecionadoModal.turma}</p>
              <p><strong>Ocorrências:</strong> {alunoSelecionadoModal.ocorrencias}</p>
              <p><strong>Último Atraso:</strong> {alunoSelecionadoModal.ultimoAtraso}</p>

              <p>
                <strong>Status Atual:</strong>{" "}
                <span className={`status-pill ${alunoSelecionadoModal.statusClasse}`}>
                  {alunoSelecionadoModal.status}
                </span>
              </p>

              <div
                style={{
                  marginTop: "16px",
                  padding: "14px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  borderLeft: "4px solid #ef4444",
                }}
              >
                <strong style={{ display: "block", marginBottom: "6px", color: "#0f172a" }}>
                  Problemática / Observação:
                </strong>

                <p style={{ margin: 0, color: "#475569" }}>
                  {alunoSelecionadoModal.mensagem}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                type="button"
                onClick={() => setAlunoSelecionadoModal(null)}
                style={{
                  backgroundColor: "#d90429",
                  color: "#fff",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}