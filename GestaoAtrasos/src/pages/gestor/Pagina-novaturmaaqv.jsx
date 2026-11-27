import React, { useState } from "react";
import Menu from "../../components/navigation/gestor/MenuAqv.jsx";
import "../../css/global/App.css";

export default function App() {
  const [curso, setCurso] = useState("Mecatrônica");
  const [nomeTurma, setNomeTurma] = useState("MEC-2026-02");
  const [turno, setTurno] = useState("Noturno");
  const [periodo, setPeriodo] = useState("2º semestre de 2026");
  const [sala, setSala] = useState("");
  const [capacidade, setCapacidade] = useState("24");

  const [modalSucesso, setModalSucesso] = useState({
    aberto: false,
    turma: "",
  });

  const [modalAcao, setModalAcao] = useState({
    aberto: false,
    tipo: "",
  });

  const [diasAula, setDiasAula] = useState([
    { id: 1, dia: "Segunda-feira", inicio: "18:30", fim: "22:00" },
    { id: 2, dia: "Terça-feira", inicio: "18:30", fim: "22:00" },
  ]);

  const adicionarDia = () => {
    setDiasAula((diasAtuais) => [
      ...diasAtuais,
      {
        id: Date.now(),
        dia: "Quarta-feira",
        inicio: "18:30",
        fim: "22:00",
      },
    ]);

    setModalAcao({
      aberto: true,
      tipo: "adicionar",
    });
  };

  const removerDia = (id) => {
    if (diasAula.length === 1) {
      setModalAcao({
        aberto: true,
        tipo: "ultimoDia",
      });
      return;
    }

    setDiasAula(diasAula.filter((item) => item.id !== id));
  };

  const atualizarDiaAula = (id, campo, valor) => {
    setDiasAula(
      diasAula.map((item) =>
        item.id === id ? { ...item, [campo]: valor } : item
      )
    );
  };

  const handleCancelar = () => {
    setModalAcao({
      aberto: true,
      tipo: "cancelar",
    });
  };

  const confirmarCancelamento = () => {
    setNomeTurma("");
    setCapacidade("");
    setSala("");

    setModalAcao({
      aberto: false,
      tipo: "",
    });
  };

  const fecharModalAcao = () => {
    setModalAcao({
      aberto: false,
      tipo: "",
    });
  };

  const handleSalvar = (e) => {
    e.preventDefault();

    // VALIDAÇÃO DA CAPACIDADE DE ALUNOS
    const capacidadeNumerica = Number(capacidade);

    if (
      capacidade.trim() === "" ||
      !Number.isInteger(capacidadeNumerica) ||
      capacidadeNumerica <= 0
    ) {
      setModalAcao({
        aberto: true,
        tipo: "capacidadeInvalida",
      });
      return;
    }

    if (!nomeTurma.trim()) {
      setModalAcao({
        aberto: true,
        tipo: "nomeVazio",
      });
      return;
    }

    setModalSucesso({ aberto: true, turma: nomeTurma });
  };

  const fecharModal = () => {
    setModalSucesso({ aberto: false, turma: "" });
  };

  return (
    <div className="app-container">
      <Menu activeItem="Minhas Turmas" userName="Cris Costa" userRole="Gestor" />

      <main className="main-content">
        <header className="criar-turma-header">
          <div className="header-linha-titulo">
            <button
              className="btn-voltar-perfil"
              type="button"
              onClick={handleCancelar}
              title="Voltar"
              aria-label="Voltar"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3V21" />
                <path d="M20 12H8" />
                <path d="M13 7L8 12L13 17" />
              </svg>
            </button>

            <h2>Nova turma</h2>
          </div>

          <p className="subtitulo-pagina">
            Defina o curso e os horários das aulas.
          </p>
        </header>

        <form onSubmit={handleSalvar} className="criar-turma-card">
          <section className="secao-form">
            <div className="secao-titulo">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e30613"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <h3>Informações da turma</h3>
            </div>

            <div className="grid-inputs">
              <div className="campo-group">
                <label>Curso</label>
                <select
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                >
                  <option value="Mecatrônica">Técnico em Mecatrônica</option>
                  <option value="DS">Desenvolvimento de Sistemas</option>
                  <option value="Eletrotécnica">Técnico em Eletrotécnica</option>
                </select>
              </div>

              <div className="campo-group">
                <label>Nome da turma</label>
                <input
                  type="text"
                  value={nomeTurma}
                  onChange={(e) => setNomeTurma(e.target.value)}
                  placeholder="Ex: MEC-2026-02"
                />
              </div>

              <div className="campo-group">
                <label>Turno</label>
                <select
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                >
                  <option value="Noturno">Noturno</option>
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                  <option value="Integral">Integral</option>
                </select>
              </div>

              <div className="campo-group">
                <label>Período</label>
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                >
                  <option value="1º semestre de 2026">1º semestre de 2026</option>
                  <option value="2º semestre de 2026">2º semestre de 2026</option>
                </select>
              </div>

              <div className="campo-group">
                <label>Sala (opcional)</label>
                <select
                  value={sala}
                  onChange={(e) => setSala(e.target.value)}
                >
                  <option value="">Selecione uma sala</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={`Sala ${i + 1}`}>
                      Sala {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo-group">
                <label>Capacidade de alunos</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={capacidade}
                  onChange={(e) => setCapacidade(e.target.value)}
                  placeholder="Vagas disponíveis"
                />
              </div>
            </div>
          </section>

          <section className="secao-form">
            <div className="secao-titulo">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e30613"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <h3>Agenda de aulas</h3>
            </div>

            {diasAula.map((item, index) => (
              <div key={item.id} className="linha-agenda">
                <div className="campo-group">
                  <label>Dia da semana</label>
                  <select
                    value={item.dia}
                    onChange={(e) =>
                      atualizarDiaAula(item.id, "dia", e.target.value)
                    }
                  >
                    <option value="Segunda-feira">Segunda-feira</option>
                    <option value="Terça-feira">Terça-feira</option>
                    <option value="Quarta-feira">Quarta-feira</option>
                    <option value="Quinta-feira">Quinta-feira</option>
                    <option value="Sexta-feira">Sexta-feira</option>
                    <option value="Sábado">Sábado</option>
                  </select>
                </div>

                <div className="campo-group">
                  <label>Horário de início</label>
                  <div className="input-icone-box">
                    <input
                      type="text"
                      value={item.inicio}
                      onChange={(e) =>
                        atualizarDiaAula(item.id, "inicio", e.target.value)
                      }
                    />
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                </div>

                <div className="campo-group">
                  <label>Horário de fim</label>
                  <div className="input-icone-box">
                    <input
                      type="text"
                      value={item.fim}
                      onChange={(e) =>
                        atualizarDiaAula(item.id, "fim", e.target.value)
                      }
                    />
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                </div>

                {diasAula.length > 1 ? (
                  <button
                    type="button"
                    className="btn-remover-dia"
                    onClick={() => removerDia(item.id)}
                    title="Remover este dia"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e30613"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                ) : (
                  <div />
                )}

                {index === diasAula.length - 1 ? (
                  <button
                    type="button"
                    className="btn-adicionar-dia"
                    onClick={adicionarDia}
                  >
                    Adicionar dia
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}

            <div className="alerta-dica">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e30613"
                strokeWidth="2"
              >
                <path d="M9 18h6m-3 3v-3m-4-6a5 5 0 1 1 8 0c0 2.5-2 3.5-2 5H9c0-1.5-2-2.5-2-5z" />
              </svg>
              <span>Inclua os dias de aula antes de salvar a turma.</span>
            </div>
          </section>

          <div className="acoes-form-rodape">
            <button
              type="button"
              className="btn-cancelar"
              onClick={handleCancelar}
            >
              Cancelar
            </button>

            <button type="submit" className="btn-salvar">
              Salvar turma
            </button>
          </div>
        </form>
      </main>

      {/* MODAL DE SUCESSO AO SALVAR */}
      {modalSucesso.aberto && (
        <div className="modal-backdrop">
          <div className="modal-sucesso-card">
            <div className="modal-icone-container">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="modal-titulo">Turma salva com sucesso!</h3>

            <p className="modal-mensagem">
              A turma <strong>"{modalSucesso.turma}"</strong> foi cadastrada no sistema.
            </p>

            <button
              type="button"
              className="btn-modal-confirmar"
              onClick={fecharModal}
            >
              Concluir
            </button>
          </div>
        </div>
      )}

      {/* MODAL DAS OUTRAS AÇÕES */}
      {modalAcao.aberto && (
        <div className="modal-backdrop">
          <div className="modal-sucesso-card">
            <div
              className={`modal-icone-container ${
                modalAcao.tipo === "cancelar" ? "icone-cancelamento" : ""
              }`}
            >
              {modalAcao.tipo === "adicionar" ? (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e30613"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
            </div>

            <h3 className="modal-titulo">
              {modalAcao.tipo === "adicionar"
                ? "Dia adicionado com sucesso!"
                : modalAcao.tipo === "ultimoDia"
                ? "Não é possível remover!"
                : modalAcao.tipo === "nomeVazio"
                ? "Nome da turma obrigatório!"
                : modalAcao.tipo === "capacidadeInvalida"
                ? "Capacidade de alunos obrigatória!"
                : "Deseja cancelar?"}
            </h3>

            <p className="modal-mensagem">
              {modalAcao.tipo === "adicionar"
                ? "O novo dia foi adicionado à agenda de aulas."
                : modalAcao.tipo === "ultimoDia"
                ? "A turma precisa ter pelo menos um dia de aula cadastrado."
                : modalAcao.tipo === "nomeVazio"
                ? "Por favor, informe o nome da turma antes de salvar."
                : modalAcao.tipo === "capacidadeInvalida"
                ? "Por favor, informe a quantidade de alunos permitida para esta turma. O campo não pode ficar vazio ou ser igual a zero."
                : "As alterações não salvas serão perdidas. Deseja realmente cancelar?"}
            </p>

            {modalAcao.tipo === "cancelar" ? (
              <div className="botoes-modal-acoes">
                <button
                  type="button"
                  className="btn-modal-voltar"
                  onClick={fecharModalAcao}
                >
                  Continuar editando
                </button>

                <button
                  type="button"
                  className="btn-modal-cancelar"
                  onClick={confirmarCancelamento}
                >
                  Sim, cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-modal-confirmar"
                onClick={fecharModalAcao}
              >
                Concluir
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
