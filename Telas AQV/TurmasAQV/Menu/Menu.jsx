<<<<<<< HEAD

=======
>>>>>>> 92c8051d9b036c39f4bb830f9a8340fc64c2adc0
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
<<<<<<< HEAD
  faQrcode,
  faClock,
  faClipboardList,
  faFileLines,
  faUser,
  faRightFromBracket,
=======
  faFileLines,
  faChalkboardUser,
  faUserGroup,
  faClipboardList,
  faUser,
  faRightFromBracket,
  faBars,
  faXmark,
>>>>>>> 92c8051d9b036c39f4bb830f9a8340fc64c2adc0
} from "@fortawesome/free-solid-svg-icons";

import "./Menu.css";
import logo from "../assets/logo.png";

function Menu() {
  const [paginaAtiva, setPaginaAtiva] = useState("");
<<<<<<< HEAD

  const itensMenu = [
    { nome: "Início", icone: faHouse },
    { nome: "Registrar atraso", icone: faQrcode },
    { nome: "Meus Atrasos", icone: faClock },
    { nome: "Ocorrências", icone: faClipboardList },
    { nome: "Atestados", icone: faFileLines },
=======
  const [menuAberto, setMenuAberto] = useState(false);

  const itensMenu = [
    { nome: "Início", icone: faHouse },
    { nome: "Acolhimentos", icone: faFileLines },
    { nome: "Turmas", icone: faChalkboardUser },
    { nome: "Alunos", icone: faUserGroup },
    { nome: "Relatórios", icone: faClipboardList },
>>>>>>> 92c8051d9b036c39f4bb830f9a8340fc64c2adc0
    { nome: "Perfil", icone: faUser },
  ];

  return (
<<<<<<< HEAD
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
=======
    <>
      <button
        className="botao-hamburguer"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
      >
        <FontAwesomeIcon icon={menuAberto ? faXmark : faBars} />
      </button>

      {menuAberto && (
        <div
          className="fundo-menu"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <aside className={`menu ${menuAberto ? "menu-aberto" : ""}`}>
        <div className="menu-logo">
          <img src={logo} alt="Logo SENAI" />
        </div>

        <div className="menu-usuario">
          <div className="usuario-icone">
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div className="usuario-info">
            <p>Cris Costa</p>
            <span>Gestor</span>
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
>>>>>>> 92c8051d9b036c39f4bb830f9a8340fc64c2adc0
