import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import logo from "../../assets/logosenai.jpg";
import "../../css/global/SidebarPadrao.css";

export default function SidebarPadrao({
  nome,
  cargo,
  foto = null,
  rotaInicio,
  links,
  ariaLabel = "Menu principal",
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button
        type="button"
        className="sd-menu-toggle"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={aberto}
        onClick={() => setAberto((atual) => !atual)}
      >
        {aberto ? <X /> : <Menu />}
      </button>

      {aberto && (
        <button
          type="button"
          className="sd-overlay"
          aria-label="Fechar menu"
          onClick={() => setAberto(false)}
        />
      )}

      <aside className={`sd-sidebar ${aberto ? "aberto" : ""}`}>
        <Link to={rotaInicio} onClick={() => setAberto(false)}>
          <img src={logo} alt="SENAI" />
        </Link>

        <div className="sd-usuario">
          <span>
            {foto ? <img src={foto} alt={nome} /> : <UserRound size={36} />}
          </span>
          <div>
            {nome}
            <small>{cargo}</small>
          </div>
        </div>

        <nav aria-label={ariaLabel}>
          {links.map(({ para, rotulo, Icone }) => (
            <NavLink
              key={para}
              to={para}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setAberto(false)}
            >
              <Icone size={30} />
              <span>{rotulo}</span>
            </NavLink>
          ))}
        </nav>

        <Link className="sd-sair" to="/" onClick={() => setAberto(false)}>
          <LogOut /> Sair
        </Link>
      </aside>
    </>
  );
}
