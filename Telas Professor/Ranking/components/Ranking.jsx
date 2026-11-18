import { useState } from "react";
import Menu from "../Menu/Menu";
import "./Ranking.css";

function Ranking() {
  return (
    <div className="ranking-pagina">
      <Menu />

      <main className="ranking-conteudo">
        <header className="ranking-cabecalho">
          <div className="ranking-titulo">
            <img
              src="/assets/seta.png"
              alt="Início"
              className="icone-imagem"
            />

            <div>
              <h1>Alunos</h1>
              <p>
                Acompanhe o engajamento e a frequência dos alunos.
              </p>
            </div>
          </div>
        </header>

        <section className="ranking-filtros">
          <div className="ranking-filtro">
            <label htmlFor="turma">Turma</label>
            <select id="turma">
              <option>Todas as turmas</option>
              <option>1º Ano A</option>
              <option>1º Ano B</option>
              <option>2º Ano A</option>
              <option>2º Ano B</option>
            </select>
          </div>

          <div className="ranking-filtro">
            <label htmlFor="ordenar">Ordenar por</label>
            <select id="ordenar">
              <option>Melhores alunos</option>
              <option>Piores alunos</option>
              <option>Nome (A-Z)</option>
              <option>Nome (Z-A)</option>
            </select>
          </div>

          <div className="ranking-filtro">
            <label htmlFor="periodo">Período</label>
            <select id="periodo">
              <option>Últimos 30 dias</option>
              <option>Últimos 7 dias</option>
              <option>Últimos 90 dias</option>
            </select>
          </div>

          <button className="ranking-botao-filtro">
            ⚲ Aplicar filtros
          </button>
        </section>

        <section className="ranking-tabela-container">
          <table className="ranking-tabela">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Aluno</th>
                <th>Turma</th>
                <th>Engajamento</th>
                <th>Frequência</th>
                <th>Atividades</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["Julia Costa", "0023", "1º Ano A", 100, 100, 100, "Excelente", 5],
                ["Pedro Lima", "0045", "2º Ano B", 98, 95, 100, "Excelente", 5],
                ["Carla Santos", "0072", "2º Ano A", 95, 92, 95, "Bom", 4],
                ["Mariana Oliveira", "0061", "1º Ano A", 93, 88, 90, "Bom", 4],
                ["Rafael Souza", "0090", "2º Ano B", 90, 85, 88, "Bom", 4],
                ["Gabriela Alves", "0112", "1º Ano B", 75, 68, 70, "Atenção", 3],
                ["Lucas Ferreira", "0136", "1º Ano B", 62, 55, 60, "Risco", 3],
                ["Beatriz Rodrigues", "0148", "2º Ano A", 58, 50, 55, "Risco", 2],
                ["Matheus Pereira", "0173", "2º Ano B", 45, 40, 48, "Crítico", 1],
                ["Larissa Martins", "0189", "1º Ano A", 38, 32, 40, "Crítico", 1],
              ].map((aluno, index) => (
                <tr key={aluno[1]}>
                  <td>
                    <span
                      className={`ranking-posicao ${index >= 5 ? "ranking-posicao-baixa" : ""
                        }`}
                    >
                      {index + 1}
                    </span>
                  </td>

                  <td>
                    <div className="ranking-aluno">
                          <img
                            src="/assets/person2.png"
                            alt="Início"
                            className="icone-imagem"
                        />
                      <div>
                        <strong>{aluno[0]}</strong>
                        <small>#{aluno[1]}</small>
                      </div>
                    </div>
                  </td>

                  <td>{aluno[2]}</td>

                  <td>
                    <span className="ranking-estrelas">
                      {"★".repeat(aluno[7])}
                      <span>{"★".repeat(5 - aluno[7])}</span>
                    </span>
                  </td>

                  <td>{aluno[3]}%</td>
                  <td>{aluno[4]}%</td>
                  <td>{aluno[5]}%</td>

                  <td>
                    <span
                      className={`ranking-status ranking-status-${aluno[6]
                        .toLowerCase()
                        .replace("í", "i").replace("ê", "e")}`}
                    >
                      {aluno[6]}
                    </span>
                  </td>

                  <td>
                    <button
                      className="ranking-botao-acoes"
                      onClick={() => alert(`Aluno: ${aluno[0]}\nTurma: ${aluno[2]}`)}
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>      </main>
    </div>
  );
}

export default Ranking;