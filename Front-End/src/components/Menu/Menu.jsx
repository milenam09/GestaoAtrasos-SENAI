import {
  BookOpen,
  ChartColumn,
  ClipboardList,
  Clock,
  FileText,
  House,
  LogOut,
  QrCode,
  UserRound,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/senai-logo.png";
import "./Menu.css";

const alunoItems = [
  { label: "Início", to: "/", icon: House, exact: true },
  { label: "Registrar chegada", to: "/aluno", icon: QrCode },
  { label: "Meus Atrasos", to: "/aluno", icon: Clock },
  { label: "Ocorrências", to: "/aluno", icon: ClipboardList },
  { label: "Atestados", to: "/aluno", icon: FileText },
  { label: "Perfil", to: "/aluno", icon: UserRound, primary: true },
];

const professorItems = [
  { label: "Início", to: "/", icon: House, exact: true },
  { label: "Acolhimentos", to: "/acolhimento", icon: ClipboardList, exact: true },
  { label: "Minhas Turmas", to: "/minhas-turmas", icon: Users, exact: true, primary: true },
  { label: "Alunos", to: "/minhas-turmas", icon: BookOpen },
  { label: "Relatórios", to: "/minhas-turmas", icon: ChartColumn },
  { label: "Perfil", to: "/aluno", icon: UserRound, exact: true, primary: true },
];

function Menu({ role = "aluno" }) {
  const location = useLocation();
  const items = role === "professor" ? professorItems : alunoItems;

  return (
    <aside
      className={`app-menu ${
        role === "professor" ? "menu-professor" : "menu-aluno"
      }`}
    >
      <div className="menu-logo">
        <img src={logo} alt="Logo SENAI" />
      </div>

      <div className="menu-perfil">
        <div className="perfil-foto">
          <UserRound size={26} />
        </div>

        <div className="perfil-texto">
          <p>{role === "professor" ? "Mariana" : "João Silva"}</p>
          <span>{role === "professor" ? "Professor" : "Aluno"}</span>
        </div>
      </div>

      <nav className="menu-links" aria-label="Menu principal">
        {items.map(({ label, to, icon: Icon, exact, primary }) => {
          const active =
            (exact && location.pathname === to) ||
            (primary && location.pathname === to && !exact)
              ? "active"
              : "";

          return (
            <Link key={label} to={to} className={`menu-link ${active}`}>
              <span className="menu-icon">
                <Icon size={18} />
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="menu-footer">
        <Link to="/" className="menu-link menu-sair">
          <span className="menu-icon">
            <LogOut size={18} />
          </span>
          <span>Sair</span>
        </Link>
      </div>
    </aside>
  );
}

export default Menu;
