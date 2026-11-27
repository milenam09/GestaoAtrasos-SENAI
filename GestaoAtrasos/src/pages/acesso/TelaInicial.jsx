import React from "react";
import "../../css/acesso/TelaInicial.css";
import heroBg from "../../assets/hero.png";

function TelaInicial() {
  return (
    <main className="landing-container">
      {/* Imagem de fundo com escurecimento */}
      <div
        className="background-overlay"
        style={{
          backgroundImage: `linear-gradient(rgba(7, 17, 29, 0.15), rgba(7, 17, 29, 0.25)), url(${heroBg})`,
        }}
      />

      {/* Faixas vermelhas dos cantos */}
      <div className="diagonal-top-left"></div>
      <div className="diagonal-bottom-right"></div>

      {/* Conteúdo principal */}
      <section className="landing-content">
        <header className="landing-header">
          <h1>Conectando você</h1>

          <h2>ao seu futuro</h2>

          <p>Escolha o seu perfil para acessar o sistema</p>
        </header>

        {/* Cartões dos perfis */}
        <div className="cards-container">
          {/* ALUNO */}
          <article className="profile-card">
            <div className="card-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <path
                  d="M3 15L24 5L45 15L24 25L3 15Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 19V30C18 38 30 38 38 30V19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M45 15V29"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            <h3>Aluno</h3>

            <p>
              Acesse suas informações,
              <br />
              turmas e muito mais
            </p>

            <button type="button">
              Entrar
            </button>
          </article>

          {/* PROFESSOR */}
          <article className="profile-card">
            <div className="card-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <circle
                  cx="17"
                  cy="9"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M6 42V34C6 27 11 23 17 23C23 23 28 27 28 34V42"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M28 15H44V35H28"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M28 21H38"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            <h3>Professor</h3>

            <p>
              Gerencie suas turmas,
              <br />
              frequência e atividades.
            </p>

            <button type="button">
              Entrar
            </button>
          </article>

          {/* GESTOR */}
          <article className="profile-card">
            <div className="card-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <circle
                  cx="24"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M9 43V38C9 29 15 25 24 25C33 25 39 29 39 38V43"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3>Gestor</h3>

            <p>
              Acesse relatórios, indicadores
              <br />
              e gerencie a escola
            </p>

            <button type="button">
              Entrar
            </button>
          </article>
        </div>
      </section>
    </main>
  );
}

export default TelaInicial;
