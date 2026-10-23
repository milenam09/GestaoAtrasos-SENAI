
import {
  House,
  FileText,
  Monitor,
  Users,
  ClipboardList,
  UserRound,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const itens = [
  { nome: "Início", Icone: House },
  { nome: "Acolhimentos", Icone: FileText },
  { nome: "Minhas Turmas", Icone: Monitor },
  { nome: "Alunos", Icone: Users },
  { nome: "Relatórios", Icone: ClipboardList },
  { nome: "Perfil", Icone: UserRound },
];

export default function Sidebar({ telaAtiva = "Acolhimentos", onNavegar }) {
  return (
    <aside className="sidebar">
      <div className="logo-senai">SENAI</div>

      <div className="usuario">
        <div className="avatar">
          <UserRound size={30} />
        </div>
        <div>
          <p>Mariana</p>
          <small>Professor</small>
        </div>
      </div>

      <nav className="menu">
        {itens.map(({ nome, Icone }) => (
          <button
            key={nome}
            className={`menu-item ${telaAtiva === nome ? "ativo" : ""}`}
            onClick={() => onNavegar?.(nome)}
          >
            <Icone size={24} />
            <span>{nome}</span>
          </button>
        ))}
      </nav>

      <button className="sair" onClick={() => alert("Até logo!")}>
        <LogOut size={23} />
        <span>Sair</span>
      </button>
    </aside>
  );
}
