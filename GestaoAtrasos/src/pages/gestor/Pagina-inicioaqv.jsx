
import { useState } from "react";
import {
  Bell,
  ChevronRight,
  GraduationCap,
  Info,
} from "lucide-react";

import Total from "../../assets/eeee.svg";
import andamento from "../../assets/andamento.svg";
import Aguardando from "../../assets/aguardando.svg";
import Concluidos from "../../assets/concluidos.svg";

import Menu from "../../components/navigation/gestor/MenuInicioAqv.jsx";
import "../../css/gestor/variantes/App-src.css";


const estatisticas = [
  {
    titulo: "Total de casos",
    numero: 25,
    descricao: "casos ativos",
    cor: "vermelho",
    icone: Total,
  },
  {
    titulo: "Em andamento",
    numero: 12,
    descricao: "Em andamento",
    cor: "amarelo",
    icone: andamento,
  },
  {
    titulo: "Aguardando retorno",
    numero: 6,
    descricao: "Aguardando retorno",
    cor: "rosa",
    icone: Aguardando,
  },
  {
    titulo: "Concluídos hoje",
    numero: 7,
    descricao: "Finalizações",
    cor: "verde",
    icone: Concluidos,
  },
];

// Casos prioritários
const casos = [
  {
    id: 1,
    nome: "João Silva",
    turma: "Turma T1A - Técnico em redes",
    atualizacao: "Última atualização: hoje",
  },
  {
    id: 2,
    nome: "Beatriz Souza",
    turma: "Turma T1B - Técnico em desenvolvimento",
    atualizacao: "Última atualização: ontem",
  },
  {
    id: 3,
    nome: "Lucas Ferreira",
    turma: "Turma T2A - Técnico em Informática",
    atualizacao: "Última atualização: ontem",
  },
];

// Notificações
const notificacoes = [
  {
    id: 1,
    titulo: "Novo caso atribuído",
    descricao: "Lucas Ferreira - T2A",
    horario: "há 5 horas",
  },
  {
    id: 2,
    titulo: "Justificativa enviada",
    descricao: "Maria Eduardo - T1B",
    horario: "há 6 horas",
  },
  {
    id: 3,
    titulo: "Caso concluído",
    descricao: "Rafael Santos - T3B",
    horario: "há 3 horas",
  },
  {
    id: 4,
    titulo: "Lembrete de prazo",
    descricao: "Caso aguardando retorno",
    horario: "há 6 horas",
  },
];

function App() {
  const [notificacoesAbertas, setNotificacoesAbertas] =
    useState(false);

  return (
    <div className="app-container">
      <Menu />

      <main className="conteudo-principal">

        {/* CABEÇALHO */}
        <header className="cabecalho">
          <div className="boas-vindas">
            <h1>Olá, Cris!</h1>
            <p>
              Aqui está um resumo das suas atividades de hoje.
            </p>
          </div>

          <div className="area-notificacao">
            <button
              type="button"
              className="icone-notificacao"
              aria-label="Abrir notificações"
              aria-expanded={notificacoesAbertas}
              onClick={() =>
                setNotificacoesAbertas((aberta) => !aberta)
              }
            >
              <Bell size={23} />
              <span className="bolinha-notificacao" />
            </button>

            {notificacoesAbertas && (
              <div className="notificacoes-popup">
                <h3>Notificações recentes</h3>

                {notificacoes.map((item) => (
                  <div className="popup-item" key={item.id}>
                    <strong>{item.titulo}</strong>
                    <span>{item.descricao}</span>
                    <small>{item.horario}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

       
        <section
          className="cards-estatisticas"
          aria-label="Estatísticas dos acolhimentos"
        >
          {estatisticas.map((card) => {
            const Icone = card.icone;

            return (
              <article
                className={`card-stat ${card.cor}`}
                key={card.titulo}
              >
                <div className="card-stat-topo">

                  <span className="card-icone">
                    <img
                      src={Icone}
                      alt=""
                      width="22"
                      height="22"
                    />
                  </span>

                  <span className="card-titulo">
                    {card.titulo}
                  </span>

                </div>

                <div className="card-stat-info">
                  <strong>{card.numero}</strong>
                  <span>{card.descricao}</span>
                </div>
              </article>
            );
          })}
        </section>

   
        <section className="painel-grid">

       
          <article className="painel casos-prioritarios">
            <header className="painel-cabecalho">
              <h2>Casos prioritários</h2>

              <button
                type="button"
                onClick={() =>
                  window.alert("Lista completa de casos")
                }
              >
                Ver todos <ChevronRight size={16} />
              </button>
            </header>

            <div className="lista-casos">
              {casos.map((caso) => (
                <article
                  className="caso-item"
                  key={caso.id}
                >
                  <span className="etiqueta-alta">
                    Alta
                  </span>

                  <div className="caso-texto">
                    <strong>{caso.nome}</strong>
                    <p>{caso.turma}</p>
                    <small>{caso.atualizacao}</small>
                  </div>

                  <button
                    type="button"
                    className="botao-caso"
                    aria-label={`Ver caso de ${caso.nome}`}
                    onClick={() =>
                      window.alert(`Caso de ${caso.nome}`)
                    }
                  >
                    <ChevronRight size={19} />
                  </button>
                </article>
              ))}
            </div>
          </article>

      
          <article className="painel painel-notificacoes">
            <header className="painel-cabecalho">
              <h2>Notificações recentes</h2>

              <button
                type="button"
                onClick={() => setNotificacoesAbertas(true)}
              >
                Ver todas <ChevronRight size={16} />
              </button>
            </header>

            <div className="lista-notificacoes">
              {notificacoes.map((item) => (
                <article
                  className="notificacao-item"
                  key={item.id}
                >
                  <div className="notificacao-texto">
                    <strong>{item.titulo}</strong>
                    <p>
                      {item.descricao} · {item.horario}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </article>

       
          <article className="card-mensagem">
            <div className="icone-mensagem">
              <GraduationCap size={42} />
            </div>

            <div className="mensagem-texto">
              <h3>
                Mantenha seus cadastros sempre atualizados!
              </h3>

              <p>
                Assim conseguimos te enviar sobre eventos e
                comunicados importantes.
              </p>
            </div>
          </article>

        </section>

        {/* AVISO INFERIOR */}
        <section className="aviso-inferior">
          <div className="aviso-conteudo">
            <Info size={27} className="aviso-icone" />

            <div>
              <strong>Não se esqueça!</strong>
              <p>
                3 alunos de 128 estão com atrasos contínuos
                (mais de 3).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              window.alert("Detalhes dos alertas importantes")
            }
          >
            Ver detalhes <ChevronRight size={16} />
          </button>
        </section>

      </main>
    </div>
  );
}

export default App;
