
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

import "../../../../css/gestor/variantes/Menu-menu.css";

function Menu() {
  const [paginaAtiva, setPaginaAtiva] = useState("Alunos");
  const [menuAberto, setMenuAberto] = useState(false);

  const itensMenu = [
    { nome: "Início", icone: faHouse },
    { nome: "Acolhimentos", icone: faFileLines },
    { nome: "Turmas", icone: faChalkboardUser },
    { nome: "Alunos", icone: faUserGroup },
    { nome: "Relatórios", icone: faClipboardList },
    { nome: "Perfil", icone: faUser },
  ];

  return (
    <>
      {/* BOTÃO HAMBÚRGUER */}
      <button
        className="botao-hamburguer"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
      >
        <FontAwesomeIcon icon={menuAberto ? faXmark : faBars} />
      </button>

      {/* FUNDO ESCURO DO MENU MOBILE */}
      {menuAberto && (
        <div
          className="fundo-menu"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* MENU LATERAL */}
      <aside className={`menu ${menuAberto ? "menu-aberto" : ""}`}>

        {/* LOGO */}
        <div className="menu-logo">
          <img src={new URL("../../../../assets/senai.jpeg", import.meta.url).href} alt="Logo SENAI" />
        </div>

        {/* PERFIL DO USUÁRIO */}
        <div className="menu-usuario">

          <div className="usuario-icone">
            <img
              src={new URL("../../../../assets/retrato-profissional-no-escritorio-senai.png", import.meta.url).href}
              alt="Foto de Cris Costa"
            />
          </div>

          <div className="usuario-info">
            <p>Cris Costa</p>
            <span>Gestor</span>
          </div>

        </div>

        {/* LINKS DO MENU */}
        <nav className="menu-links">

          {itensMenu.map((item) => (
            <a
              href="#"
              key={item.nome}
              className={`link-menu ${
                paginaAtiva === item.nome ? "ativo" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPaginaAtiva(item.nome);
                setMenuAberto(false);
              }}
            >

              <span className="icone">
                <FontAwesomeIcon icon={item.icone} />
              </span>

              <span>{item.nome}</span>

            </a>
          ))}

        </nav>

        {/* RODAPÉ */}
        <div className="menu-rodape">

          <a
            href="#"
            className={`link-menu ${
              paginaAtiva === "Sair" ? "ativo" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setPaginaAtiva("Sair");
              setMenuAberto(false);
            }}
          >

            <span className="icone">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>

            <span>Sair</span>

          </a>

        </div>

      </aside>
    </>
  );
}

export default Menu;
