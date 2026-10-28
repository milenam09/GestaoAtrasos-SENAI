
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faQrcode,
  faClock,
  faClipboardList,
  faFileLines,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import "./Menu.css";
import logo from "../assets/logo.png";

function Menu() {
  const [paginaAtiva, setPaginaAtiva] = useState("");

  const itensMenu = [
    { nome: "Início", icone: faHouse },
    { nome: "Registrar atraso", icone: faQrcode },
    { nome: "Meus Atrasos", icone: faClock },
    { nome: "Ocorrências", icone: faClipboardList },
    { nome: "Atestados", icone: faFileLines },
    { nome: "Perfil", icone: faUser },
  ];

  return (
    <aside className="menu">
      <div className="menu-logo">
        <img src={logo} alt="Logo SENAI" />
      </div>

      <div className="menu-usuario">
        <div className="usuario-icone">
          <FontAwesomeIcon icon={faUser} />
        </div>

        <div className="usuario-info">
          <p>Joao Silva</p>
          <span>Aluno</span>
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
            onClick={(e) => {
              e.preventDefault();
              setPaginaAtiva(item.nome);
            }}
          >
            <span className="icone">
              <FontAwesomeIcon icon={item.icone} />
            </span>

            <span>{item.nome}</span>
          </a>
        ))}
      </nav>

    <div className="menu-rodape">
        <a
            href="#"
            className={`link-menu ${paginaAtiva === "Sair" ? "ativo" : ""}`}
            onClick={(e) => {
            e.preventDefault();
            setPaginaAtiva("Sair");
            }}
          >
            
          <span className="icone">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>

          <span>Sair</span>
        </a>
      </div>
    </aside>
  );
}

export default Menu;
