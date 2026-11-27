
import {
  Home,
  Users,
  Clock,
  ClipboardList,
  FileText,
  UserRound,
  LogOut,
  QrCode,
  X,
} from "lucide-react";

import logoSenai from "../assets/logosenai.jpg";
import "../css/MenuProfessor.css";

export default function Menu({
  paginaAtiva,
  onNavigate,
  aberto,
  onClose,
}) {
  const itensMenu = [
    { nome: "Início", Icone: Home },
    { nome: "Minhas Turmas", Icone: Users },
    { nome: "Alunos", Icone: UserRound },
    { nome: "Registrar Atraso", Icone: Clock },
    { nome: "Ocorrências", Icone: ClipboardList },
    { nome: "Relatórios", Icone: FileText },
    { nome: "Perfil", Icone: UserRound },
  ];

  function selecionarPagina(nome) {
    onNavigate(nome);

    if (onClose) {
      onClose();
    }
  }

  return (
    <>
      {aberto && (
        <div
          className="menu-fundo"
          onClick={onClose}
        />
      )}

      <aside className={`menu-lateral ${aberto ? "menu-aberto" : ""}`}>
        <div className="menu-topo">
          <img
            src={logoSenai}
            alt="Logo SENAI"
            className="menu-logo"
          />

          <button
            className="menu-fechar"
            onClick={onClose}
            type="button"
          >
            <X size={22} />
          </button>
        </div>

        <div className="menu-usuario">
          <div className="menu-avatar">
            <UserRound size={25} />
          </div>

          <div>
            <strong>Mariana</strong>
            <span>Professora</span>
          </div>
        </div>

        <nav className="menu-links">
          {itensMenu.map(({ nome, Icone }) => (
            <button
              type="button"
              key={nome}
              className={`menu-item ${
                paginaAtiva === nome ? "ativo" : ""
              }`}
              onClick={() => selecionarPagina(nome)}
            >
              <Icone size={20} />
              <span>{nome}</span>
            </button>
          ))}
        </nav>

        <div className="menu-rodape">
          <button
            type="button"
            className="menu-item menu-sair"
            onClick={() => selecionarPagina("Sair")}
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
