import seta from "../../assets/seta.png";
import { useState } from "react";
import { UserRound } from "lucide-react";
import Menu from "../../components/navigation/gestor/Menu.jsx";

import "../../css/gestor/AcolhimentoGestor.css";

const alunosCadastrados = [
  { id: 1, nome: "João Silva", ra: "123456", turma: "1A - Informática" },
  { id: 2, nome: "Maria Oliveira", ra: "654321", turma: "2B - Mecânica" },
  { id: 3, nome: "Carlos Eduardo", ra: "789012", turma: "3A - Eletrónica" },
  { id: 4, nome: "Ana Beatriz", ra: "345678", turma: "1B - Informática" }
];

function Acolhimentos() {
  const [busca, setBusca] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const [tipo, setTipo] = useState("");
  const [motivo, setMotivo] = useState("");
  const [data, setData] = useState("");
  const [prioridade, setPrioridade] = useState("Alta");
  const [professor, setProfessor] = useState("");
  const [turma, setTurma] = useState("");
  const [observacoes, setObservacoes] = useState("");

  function handleBuscaChange(e) {
    const valor = e.target.value;
    setBusca(valor);

    if (valor.trim() === "") {
      setSugestoes([]);
      setAlunoSelecionado(null);
      return;
    }


    const filtrados = alunosCadastrados.filter(
      (a) =>
        a.nome.toLowerCase().includes(valor.toLowerCase()) ||
        a.ra.includes(valor) ||
        a.turma.toLowerCase().includes(valor.toLowerCase())
    );

    setSugestoes(filtrados);
  }


  function selecionarAluno(aluno) {
    setAlunoSelecionado(aluno);
    setBusca(aluno.nome);
    setSugestoes([]);
  }

  function salvarOS(e) {
    e.preventDefault();
    if (!alunoSelecionado) {
      alert("Por favor, selecione um aluno para registrar a ocorrência.");
      return;
    }
    alert(`Ordem de Serviço salva com sucesso para ${alunoSelecionado.nome}!`);
  }

  function cancelar() {
    setBusca("");
    setSugestoes([]);
    setAlunoSelecionado(null);
    setTipo("");
    setMotivo("");
    setData("");
    setPrioridade("Alta");
    setProfessor("");
    setTurma("");
    setObservacoes("");
  }

  return (
    <>
      <Menu />

      <main className="acolhimentos">
        <div className="acolhimentos-cabecalho">
          <button
            className="voltar-acolhimentos"
            type="button"
            onClick={() => window.history.back()}
          >
            <img src={seta} alt="Voltar" />
          </button>

          <div>
            <h1>Acolhimentos</h1>
            <p>
              Registre uma nova Ordem de Serviço para acompanhamento do aluno.
            </p>
          </div>
        </div>

        <form className="formulario-acolhimentos" onSubmit={salvarOS}>

          <div className="titulo-acolhimento">
            <span className="numero-acolhimento">1</span>

            <div className="titulo-acolhimento-conteudo">
              <h2>Dados do aluno</h2>
              <p>
                Busque e selecione o aluno para registrar o acolhimento.
              </p>
            </div>
          </div>


          <div className="campo-acolhimento campo-busca-container">
            <label>Buscar aluno</label>

            <input
              type="text"
              className="input-busca-aluno"
              placeholder="Digite o nome, RA ou turma do aluno..."
              value={busca}
              onChange={handleBuscaChange}
            />

            {sugestoes.length > 0 && (
              <ul className="lista-sugestoes-alunos">
                {sugestoes.map((aluno) => (
                  <li
                    key={aluno.id}
                    onClick={() => selecionarAluno(aluno)}
                  >
                    <strong>{aluno.nome}</strong> — RA: {aluno.ra} ({aluno.turma})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {alunoSelecionado && (
            <div className="aluno-selecionado">
              <div className="foto-aluno"><UserRound size={20} /></div>

              <div className="dados-aluno">
                <strong>Aluno Selecionado</strong>
                <p>{alunoSelecionado.nome}</p>
                <small>RA: {alunoSelecionado.ra}</small>
                <small>Turma: {alunoSelecionado.turma}</small>
              </div>
            </div>
          )}

          <hr />

          <div className="titulo-acolhimento">
            <span className="numero-acolhimento">2</span>

            <div className="titulo-acolhimento-conteudo">
              <h2>Motivo da OS</h2>
              <p>
                Selecione o tipo de ocorrência e informe o motivo do acolhimento.
              </p>
            </div>
          </div>

          <div className="campos-motivo">
            <div className="campo-acolhimento">
              <label>Tipo da ocorrência</label>

              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="Atrasos">Atrasos</option>
                <option value="Faltas">Faltas</option>
                <option value="Comportamento">Comportamento</option>
                <option value="Desempenho escolar">Desempenho escolar</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="campo-acolhimento">
              <label>Data da ocorrência</label>

              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>

            <div className="campo-acolhimento">
              <label>Prioridade</label>

              <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
              >
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>

            <div className="campo-acolhimento">
              <label>Motivo detalhado</label>

              <textarea
                placeholder="Digite aqui..."
                maxLength={500}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />

              <div className="contador-acolhimento">
                {motivo.length}/500
              </div>
            </div>
          </div>

          <hr />

          <div className="titulo-acolhimento">
            <span className="numero-acolhimento">3</span>

            <div className="titulo-acolhimento-conteudo">
              <h2>Informações adicionais</h2>
              <p>
                Preencha as informações complementares, se necessário.
              </p>
            </div>
          </div>

          <div className="campos-adicionais">
            <div className="campo-acolhimento">
              <label>Professor Responsável (Opcional)</label>

              <input
                type="text"
                placeholder="Buscar Professor..."
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
              />
            </div>

            <div className="campo-acolhimento">
              <label>Turma (Opcional)</label>

              <select
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
              >
                <option value="">Selecione a Turma</option>
                <option value="1A - Informática">1A - Informática</option>
                <option value="2A - Informática">2A - Informática</option>
                <option value="3A - Informática">3A - Informática</option>
              </select>
            </div>

            <div className="campo-acolhimento campo-observacoes">
              <label>Observações (Opcional)</label>

              <textarea
                placeholder="Digite aqui..."
                maxLength={500}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />

              <div className="contador-acolhimento">
                {observacoes.length}/500
              </div>
            </div>
          </div>


          <div className="botoes-acolhimentos">
            <button
              type="button"
              className="botao-cancelar-acolhimento"
              onClick={cancelar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="botao-salvar-acolhimento"
            >
              Salvar acolhimento
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Acolhimentos;