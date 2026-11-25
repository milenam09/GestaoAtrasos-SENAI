
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faFileLines,
  faChalkboardUser,
  faUserGroup,
  faClipboardList,
  faUser,
  faRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import "./Menu.css";
import logo from "../../assets/image 8.svg";

function Menu() {
  const [paginaAtiva, setPaginaAtiva] = useState("Início");
  const [menuAberto, setMenuAberto] = useState(false);

  const itensMenu = [
    { nome: "Início", icone: faHouse },
    { nome: "Acolhimentos", icone: faFileLines },
    { nome: "Turmas", icone: faChalkboardUser },
    { nome: "Alunos", icone: faUserGroup },
    { nome: "Relatórios", icone: faClipboardList },
    { nome: "Perfil", icone: faUser },
  ];

  function selecionarPagina(nome) {
    setPaginaAtiva(nome);
    setMenuAberto(false);
  }

  return (
    <>

      <header className="mobile-menu-bar">
        <button
          type="button"
          className="botao-hamburguer"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
        >
          <FontAwesomeIcon icon={menuAberto ? faXmark : faBars} />
        </button>
      </header>

  
      {menuAberto && (
        <button
          type="button"
          className="fundo-menu"
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* MENU LATERAL */}
      <aside className={`menu ${menuAberto ? "menu-aberto" : ""}`}>
        <div className="menu-logo">
          <img src={logo} alt="Logo SENAI" />
        </div>

        {/* FOTO DO PERFIL */}
        <div className="menu-usuario">
          <img
            src="/imagens/perfil.png"
            alt="Foto de perfil de Cris Costa"
            className="usuario-foto"
          />

          <div className="usuario-info">
            <p>Cris Costa</p>
            <span>Gestor</span>
          </div>
        </div>

        <nav className="menu-links" aria-label="Menu principal">
          {itensMenu.map((item) => (
            <button
              key={item.nome}
              type="button"
              className={`link-menu ${
                paginaAtiva === item.nome ? "ativo" : ""
              }`}
              onClick={() => selecionarPagina(item.nome)}
            >
              <span className="icone">
                <FontAwesomeIcon icon={item.icone} />
              </span>

              <span>{item.nome}</span>
            </button>
          ))}
        </nav>

        {/* SAIR */}
        <div className="menu-rodape">
          <button
            type="button"
            className="link-menu"
            onClick={() => window.alert("Sair do sistema")}
          >
            <span className="icone">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>

            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Menu;
