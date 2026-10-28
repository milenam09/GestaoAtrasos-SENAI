
import React, { useState } from "react";
import "./Menu.css";

// Ícones SVG
const IconeInicio = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const IconeQrCode = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13-2h3v2h-3zm-5 0h3v3h-3zm2 3h3v2h-3zm-2 2h2v3h-2zm3 0h3v3h-3z" />
  </svg>
);

const IconeRelogio = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);

const IconeOcorrencias = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const IconeAtestados = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

const IconePerfil = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const IconeSair = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
);

// Ícone do menu hambúrguer
const IconeMenu = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Ícone para fechar
const IconeFechar = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6 6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function Menu() {
  const [paginaAtiva, setPaginaAtiva] = useState("Perfil");
  const [menuAberto, setMenuAberto] = useState(false);

  const itensMenu = [
    { nome: "Início", icone: <IconeInicio /> },
    { nome: "Registrar atraso", icone: <IconeQrCode /> },
    { nome: "Meus Atrasos", icone: <IconeRelogio /> },
    { nome: "Ocorrências", icone: <IconeOcorrencias /> },
    { nome: "Atestados", icone: <IconeAtestados /> },
    { nome: "Perfil", icone: <IconePerfil /> },
  ];

  function selecionarPagina(e, nome) {
    e.preventDefault();
    setPaginaAtiva(nome);
    setMenuAberto(false);
  }

  return (
    <>
      <button
        type="button"
        className="botao-hamburguer"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
      >
        {menuAberto ? <IconeFechar /> : <IconeMenu />}
      </button>

      {menuAberto && (
        <button
          type="button"
          className="fundo-menu"
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <aside className={`menu ${menuAberto ? "menu-aberto" : ""}`}>
        <div className="menu-logo">
          <img src="/senai-logo.svg" alt="Logo SENAI" />
        </div>

        <div className="menu-usuario">
          <div className="usuario-icone">
            <IconePerfil />
          </div>

          <div className="usuario-info">
            <p>Joao Silva</p>
            <span>Professor</span>
          </div>
        </div>

        <nav className="menu-links">
          {itensMenu.map((item) => (
            <a
              href="#"
              key={item.nome}
              className={`link-menu ${
                paginaAtiva === item.nome ? "ativo" : ""
              }`}
              onClick={(e) => selecionarPagina(e, item.nome)}
            >
              <span className="icone">{item.icone}</span>
              <span>{item.nome}</span>
            </a>
          ))}
        </nav>

        <div className="menu-rodape">
          <a
            href="#"
            className={`link-menu ${
              paginaAtiva === "Sair" ? "ativo" : ""
            }`}
            onClick={(e) => selecionarPagina(e, "Sair")}
          >
            <span className="icone">
              <IconeSair />
            </span>
            <span>Sair</span>
          </a>
        </div>
      </aside>
    </>
  );
}
