
import { useState } from "react";
import MinhasTurmas from "../../MinhasTurmas/MinhasTurmas";
import {
  GraduationCap,
  Presentation,
  UserRound,
} from "lucide-react";
import "./App.css";

import AlunoInicial from "../../AlunoInicial/AlunoInicial";
import Acolhimentos from "../../Acolhimentos/Acolhimentos";

const perfis = [
  {
    id: "aluno",
    nome: "Aluno",
    descricao: "Acesse suas informações, turmas e muito mais",
    Icone: GraduationCap,
  },
  {
    id: "professor",
    nome: "Professor",
    descricao: "Gerencie suas turmas, frequência e atividades.",
    Icone: Presentation,
  },
  {
    id: "gestor",
    nome: "Gestor",
    descricao: "Acesse relatórios, indicadores e gerencie a escola",
    Icone: UserRound,
  },
];

export default function App() {
  const [perfilSelecionado, setPerfilSelecionado] =
    useState("aluno");
  const [tela, setTela] = useState("perfis");

  if (tela === "aluno") {
    return <AlunoInicial />;
  }

  if (tela === "professor") {
  return (
    <Acolhimentos
      telaAtiva={tela}
      onNavegar={(destino) => setTela(destino)}
    />
  );
}

if (tela === "Minhas Turmas") {
  return (
    <MinhasTurmas
      telaAtiva={tela}
      onNavegar={(destino) => setTela(destino)}
    />
  );
}

  return (
    <main className="tela-inicial">
      <div className="fundo-escuro" />
      <div className="faixa faixa-superior" />
      <div className="faixa faixa-inferior" />

      <section className="conteudo">
        <header className="cabecalho">
          <h1>
            Conectando você
            <span>ao seu futuro</span>
          </h1>

          <div className="detalhe-titulo" />

          <p>Escolha o seu perfil para acessar o sistema</p>
        </header>

        <section className="lista-perfis">
          {perfis.map(({ id, nome, descricao, Icone }) => (
            <article
              key={id}
              className={`cartao ${
                perfilSelecionado === id ? "selecionado" : ""
              }`}
              onClick={() => setPerfilSelecionado(id)}
            >
              <Icone className="icone-perfil" />

              <h2>{nome}</h2>
              <p>{descricao}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (id === "aluno") {
                    setTela("aluno");
                  } else if (id === "professor") {
                    setTela("professor");
                  } else {
                    alert(`Perfil selecionado: ${nome}`);
                  }
                }}
              >
                Entrar
              </button>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
