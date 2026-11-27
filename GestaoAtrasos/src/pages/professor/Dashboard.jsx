import React, { useState } from "react";

import {
  Users,
  ClipboardList,
  Hexagon,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Menu as MenuIcon,
  X,
} from "lucide-react";

import Menu from "../../components/navigation/professor/variantes/Menu-menu.jsx";

import "../../css/professor/DashboardProfessor.css";

/* INDICADORES */

const indicadores = [
  {
    titulo: "Total de alunos",
    numero: "85",
    descricao: "Nas suas turmas.",
    cor: "vermelho",
    Icone: Users,
  },
  {
    titulo: "Atrasos hoje",
    numero: "12",
    descricao: "3 em relação aos dias anteriores.",
    cor: "laranja",
    Icone: ClipboardList,
  },
  {
    titulo: "Em atendimento",
    numero: "4",
    descricao: "Aguardando retorno.",
    cor: "roxo",
    Icone: Hexagon,
  },
  {
    titulo: "Concluídos hoje",
    numero: "6",
    descricao: "Finalizados.",
    cor: "verde",
    Icone: CheckCircle2,
  },
];

/* TURMAS */

const turmas = [
  {
    codigo: "T1A",
    nome: "Técnico em automação",
    info: "28 alunos · 7h45 - 11h15",
    atrasos: "3 atrasos hoje",
  },
  {
    codigo: "T2B",
    nome: "Técnico em Mecatrônica",
    info: "26 alunos · 13h30 - 17h00",
    atrasos: "2 atrasos hoje",
  },
  {
    codigo: "T3A",
    nome: "Técnico em Eletrotécnica",
    info: "31 alunos · 18h30 - 22h00",
    atrasos: "1 atraso hoje",
  },
];

/* ALUNOS COM MAIS OCORRÊNCIAS */

const alunos = [
  {
    nome: "João Silva",
    turma: "T1A",
    atrasos: 8,
  },
  {
    nome: "Lucas Ferreira",
    turma: "T2B",
    atrasos: 6,
  },
  {
    nome: "Beatriz Souza",
    turma: "T3A",
    atrasos: 4,
  },
  {
    nome: "Rafael Costa",
    turma: "T2B",
    atrasos: 4,
  },
  {
    nome: "Juliana Alves",
    turma: "T3A",
    atrasos: 3,
  },
];

/* DASHBOARD */

export default function Dashboard() {
  const [paginaAtiva, setPaginaAtiva] = useState("Início");

  const [menuAberto, setMenuAberto] = useState(false);

  /* NAVEGAÇÃO */

  function navegar(nome) {
    if (nome === "Sair") {
      window.alert("Você selecionou sair do sistema.");
      return;
    }

    setPaginaAtiva(nome);
  }

  return (
    <div className="dashboard-app">

      {/* MENU LATERAL */}

      <Menu
        paginaAtiva={paginaAtiva}
        onNavigate={navegar}
        aberto={menuAberto}
        onClose={() => setMenuAberto(false)}
      />

      {/* CONTEÚDO */}

      <main className="dashboard-conteudo">

        {/* BOTÃO MOBILE */}

        <button
          type="button"
          className="dashboard-mobile-toggle"
          onClick={() =>
            setMenuAberto((atual) => !atual)
          }
          aria-label={
            menuAberto
              ? "Fechar menu"
              : "Abrir menu"
          }
        >
          {menuAberto ? (
            <X size={23} />
          ) : (
            <MenuIcon size={23} />
          )}
        </button>

        {paginaAtiva === "Início" ? (
          <>

            {/* BOAS-VINDAS */}

            <header className="dashboard-boas-vindas">

              <h1>
                Olá, Mariana!
              </h1>

              <p>
                Veja o resumo das suas turmas e acompanhe
                os atrasos dos alunos.
              </p>

            </header>

            {/* CARDS DE INDICADORES */}

            <section className="dashboard-indicadores">

              {indicadores.map(
                ({
                  titulo,
                  numero,
                  descricao,
                  cor,
                  Icone,
                }) => (

                  <article
                    className={`indicador-card ${cor}`}
                    key={titulo}
                  >

                    <div className="indicador-titulo">

                      <Icone
                        size={22}
                        strokeWidth={2.2}
                      />

                      <strong>{titulo}</strong>

                    </div>

                    <strong className="indicador-numero">
                      {numero}
                    </strong>

                    <span className="indicador-descricao">
                      {descricao}
                    </span>

                  </article>

                )
              )}

            </section>

            {/* PAINÉIS */}

            <section className="dashboard-paineis">

              {/* MINHAS TURMAS */}

              <article className="dashboard-painel">

                <div className="painel-cabecalho">

                  <h2>Minhas turmas</h2>

                  <button
                    type="button"
                    onClick={() =>
                      navegar("Minhas Turmas")
                    }
                  >
                    Ver todas
                    <ArrowRight size={15} />
                  </button>

                </div>

                <div className="turmas-lista">

                  {turmas.map((turma) => (

                    <div
                      className="turma-linha"
                      key={turma.codigo}
                    >

                      <div className="turma-codigo">
                        {turma.codigo}
                      </div>

                      <div className="turma-dados">

                        <strong>{turma.nome}</strong>

                        <span>{turma.info}</span>

                      </div>

                      <span className="turma-atrasos">
                        {turma.atrasos}
                      </span>

                    </div>

                  ))}

                </div>

              </article>

              {/* ALUNOS COM MAIS OCORRÊNCIAS */}

              <article className="dashboard-painel">

                <div className="painel-cabecalho">

                  <h2>Alunos com mais ocorrências</h2>

                  <button
                    type="button"
                    onClick={() => navegar("Alunos")}
                  >
                    Ver todos
                    <ArrowRight size={15} />
                  </button>

                </div>

                <div className="alunos-lista">

                  {alunos.map((aluno, index) => (

                    <div
                      className="aluno-linha"
                      key={aluno.nome}
                    >

                      <span className="aluno-posicao">
                        {index + 1}
                      </span>

                      <strong>{aluno.nome}</strong>

                      <span className="aluno-turma">
                        {aluno.turma}
                      </span>

                      <span className="aluno-ocorrencias">
                        {aluno.atrasos} atrasos
                      </span>

                    </div>

                  ))}

                </div>

              </article>

            </section>

            {/* ALERTA INFERIOR */}

            <section className="dashboard-alerta">

              <div className="alerta-icone">
                <AlertCircle size={21} />
              </div>

              <div className="alerta-texto">

                <strong>
                  Alertas importantes!
                </strong>

                <p>
                  3 alunos da T2B estão com atrasos
                  consecutivos (mais de 3).
                </p>

              </div>

              <button
                type="button"
                onClick={() => navegar("Alunos")}
              >
                Ver detalhes
                <ArrowRight size={15} />
              </button>

            </section>

          </>

        ) : (

          /* OUTRAS PÁGINAS */

          <section className="dashboard-pagina-em-construcao">

            <h1>{paginaAtiva}</h1>

            <p>
              Esta área está pronta para receber o conteúdo
              da página {paginaAtiva.toLowerCase()}.
            </p>

            <button
              type="button"
              onClick={() => setPaginaAtiva("Início")}
            >
              Voltar ao início
            </button>

          </section>

        )}

      </main>

    </div>
  );
}