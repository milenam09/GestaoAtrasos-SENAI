
import React from "react";
import "./Menu.css";

import {
  IconeInicio,
  IconeAcolhimentos,
  IconeMinhasTurmas,
  IconeAlunos,
  IconeRelatorios,
  IconePerfil,
  IconeSair,
} from "./Icons";

import { Menu as IconeMenu, X } from "lucide-react";

const itensMenu = [
  { nome: "Início", Icone: IconeInicio },
  { nome: "Acolhimentos", Icone: IconeAcolhimentos },
  { nome: "Minhas Turmas", Icone: IconeMinhasTurmas },
  { nome: "Alunos", Icone: IconeAlunos },
  { nome: "Relatórios", Icone: IconeRelatorios },
  { nome: "Perfil", Icone: IconePerfil },
];

export default function Menu({
  paginaAtiva = "Início",
  onNavigate = () => {},
  aberto = false,
  onClose = () => {},
  onOpen = () => {},
}) {
  function selecionar(nome) {
    onNavigate(nome);
    onClose();
  }

  return (
    <>
      {/* BOTÃO HAMBÚRGUER */}

      <button
        type="button"
        className="botao-hamburguer"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={aberto}
        onClick={aberto ? onClose : onOpen}
      >
        {aberto ? (
          <X size={23} />
        ) : (
          <IconeMenu size={23} />
        )}
      </button>

      {/* FUNDO ESCURO */}

      {aberto && (
        <button
          type="button"
          className="menu-overlay"
          aria-label="Fechar menu"
          onClick={onClose}
        />
      )}

      {/* MENU LATERAL */}

      <aside
        className={`menu-lateral ${
          aberto ? "menu-lateral-aberto" : ""
        }`}
      >
        {/* LOGO */}

        <div className="menu-marca">
          <img
            src="/images/SENAI.jpeg"
            alt="SENAI"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.nextElementSibling.style.display =
                "block";
            }}
          />

          <strong className="menu-logo-fallback">
            SENAI
          </strong>
        </div>

        {/* PERFIL */}

        <div className="menu-perfil">
          <div className="menu-avatar">
            <img
              src="/images/mariana.png"
              alt=""
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="menu-dados-perfil">
            <strong>Mariana</strong>
            <small>Professora</small>
          </div>
        </div>

        {/* NAVEGAÇÃO */}

        <nav
          className="menu-links"
          aria-label="Navegação principal"
        >
          {itensMenu.map(({ nome, Icone }) => (
            <button
              key={nome}
              type="button"
              className={`menu-link ${
                paginaAtiva === nome
                  ? "menu-link-ativo"
                  : ""
              }`}
              onClick={() => selecionar(nome)}
            >
              <Icone className="menu-link-icone" />

              <span>{nome}</span>
            </button>
          ))}
        </nav>

        {/* SAIR */}

        <button
          type="button"
          className="menu-link menu-sair"
          onClick={() => selecionar("Sair")}
        >
          <IconeSair className="menu-link-icone" />

          <span>Sair</span>
        </button>
      </aside>
    </>
  );
}
