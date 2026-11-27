
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faQrcode,
  faClock,
  faClipboardList,
  faFileLines,
  faUser,
  faRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import "../../../css/aluno/MenuAluno.css";
import logo from "../../../assets/logosenai.jpg";

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuAberto, setMenuAberto] = useState(false);

  const itensMenu = [
    {
      nome: "Início",
      icone: faHouse,
      rota: "/aluno/inicio",
    },
    {
      nome: "Registrar Chegada",
      icone: faQrcode,
      rota: "/aluno/registrar-chegada",
    },
    {
      nome: "Meus Atrasos",
      icone: faClock,
      rota: null,
    },
    {
      nome: "Ocorrências",
      icone: faClipboardList,
      rota: "/aluno/ocorrencias",
    },
    {
      nome: "Atestados",
      icone: faFileLines,
      rota: null,
    },
    {
      nome: "Perfil",
      icone: faUser,
      rota: "/aluno/perfil",
    },
  ];

  function navegar(item) {
    if (item.rota) {
      navigate(item.rota);
    }

    setMenuAberto(false);
  }

  const paginaAtiva = itensMenu.find(
    (item) => item.rota === location.pathname
  )?.nome;

  return (
    <>
      {/* BOTÃO DO MENU MOBILE */}
      <button
        className="botao-hamburguer"
        type="button"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
      >
        <FontAwesomeIcon icon={menuAberto ? faXmark : faBars} />
      </button>

      {/* FUNDO DO MENU MOBILE */}
      {menuAberto && (
        <div
          className="fundo-menu"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* MENU LATERAL */}
      <aside className={`menu ${menuAberto ? "menu-aberto" : ""}`}>

        <div className="menu-logo">
          <img src={logo} alt="Logo SENAI" />
        </div>

        {/* USUÁRIO */}
        <div className="menu-usuario">
          <div className="usuario-icone">
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div className="usuario-info">
            <p>Joao Silva</p>
            <span>Aluno</span>
          </div>
        </div>

        {/* OPÇÕES DO MENU */}
        <nav className="menu-links">
          {itensMenu.map((item) => (
            <a
              href={item.rota || "#"}
              key={item.nome}
              className={`link-menu ${
                paginaAtiva === item.nome ? "ativo" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                navegar(item);
              }}
            >
              <span className="icone">
                <FontAwesomeIcon icon={item.icone} />
              </span>

              <span>{item.nome}</span>
            </a>
          ))}
        </nav>

        {/* SAIR */}
        <div className="menu-rodape">
          <a
            href="/"
            className="link-menu"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
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
