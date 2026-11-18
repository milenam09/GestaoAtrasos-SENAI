import React, { useState } from "react";
import "./Menu.css";
import logoSenai from "../../public/senai-logo.svg";

import {
  IconeInicio,
  IconeAcolhimentos,
  IconeTurmas,
  IconeAlunos,
  IconeRelatorios,
  IconeQRCode,
  IconePerfil,
  IconeSair,
} from "./Icons";

const IconeMenuMobile = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconeFecharMobile = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M18 6 6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Menu({
  activeItem,
  onNavigate = () => {},
  userName = "Cris Costa",
  userRole = "Gestor",
}) {
  const [menuAberto, setMenuAberto] = useState(false);

  const itensMenu = [
    { nome: "Início", icone: IconeInicio, destino: "Inicio" },
    { nome: "Acolhimentos", icone: IconeAcolhimentos, destino: "Acolhimentos" },
    { nome: "Turmas", icone: IconeTurmas, destino: "Minhas Turmas" },
    { nome: "Alunos", icone: IconeAlunos, destino: "Alunos" },
    { nome: "Relatórios", icone: IconeRelatorios, destino: "Relatorios" },
    { nome: "Gerar QR Code", icone: IconeQRCode, destino: "Gerar QR Code" },
    { nome: "Perfil", icone: IconePerfil, destino: "Perfil" },
  ];

  const urlAtual = window.location.pathname.toLowerCase();

  const itemAtivoReal = activeItem || (
    urlAtual.includes("perfil") || urlAtual.includes("contato") ? "Perfil" :
    urlAtual.includes("inicio") ? "Inicio" :
    urlAtual.includes("acolhimentos") ? "Acolhimentos" :
    urlAtual.includes("turmas") ? "Minhas Turmas" :
    urlAtual.includes("relatorios") ? "Relatorios" :
    urlAtual.includes("qrcode") ? "Gerar QR Code" : "Alunos"
  );

  function selecionarPagina(e, nome) {
    e.preventDefault();
    onNavigate(nome);
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
        {menuAberto ? <IconeFecharMobile /> : <IconeMenuMobile />}
      </button>

      {menuAberto && (
        <div
          className="fundo-menu-overlay"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <aside className={`menu ${menuAberto ? "menu-aberto" : ""}`}>
        <div className="menu-logo">
          <img src={logoSenai} alt="Logo SENAI" />
        </div>

        <div className="menu-usuario">
          <div className="usuario-icone">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#0c2232">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <div className="usuario-info">
            <p>{userName}</p>
            <span>{userRole}</span>
          </div>
        </div>

        <nav className="menu-links">
          {itensMenu.map((item) => {
            const isAtivo =
              itemAtivoReal.toLowerCase() === item.destino.toLowerCase() ||
              itemAtivoReal.toLowerCase() === item.nome.toLowerCase();

            const Icone = item.icone;

            return (
              <a
                href={`#${item.destino.toLowerCase().replace(/\s+/g, "-")}`}
                key={item.nome}
                className={`link-menu ${isAtivo ? "ativo" : ""}`}
                onClick={(e) => selecionarPagina(e, item.destino)}
              >
                <span className="icone">
                  <Icone size={24} color={isAtivo ? "#e30613" : "#ffffff"} />
                </span>
                <span className="texto-item">{item.nome}</span>
              </a>
            );
          })}
        </nav>

        <div className="menu-rodape">
          <a
            href="#sair"
            className={`link-menu ${itemAtivoReal === "Sair" ? "ativo" : ""}`}
            onClick={(e) => selecionarPagina(e, "Sair")}
          >
            <span className="icone">
              <IconeSair size={24} color="#ffffff" />
            </span>
            <span className="texto-item">Sair</span>
          </a>
        </div>
      </aside>
    </>
  );
}