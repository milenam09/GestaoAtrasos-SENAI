
import React from "react";
import "./AlunoInicial.css";
import { House, QrCode, Clock, ClipboardList, FileText, User, LogOut, Bell, CalendarDays, GraduationCap } from "lucide-react";

export default function AlunoInicial() {
  return (
    <div className="aluno-layout">
      <aside className="menu-lateral">
        <h2 className="logo-senai">SENAI</h2>

        <div className="usuario">
          <div className="avatar">
            <User size={30} />
          </div>
          <div>
            <strong>João Silva</strong>
            <span>Aluno</span>
          </div>
        </div>

        <nav className="menu">
          <a className="menu-ativo"><House /> Início</a>
          <a><QrCode /> Registrar atraso</a>
          <a><Clock /> Meus Atrasos</a>
          <a><ClipboardList /> Ocorrências</a>
          <a><FileText /> Atestados</a>
          <a><User /> Perfil</a>
        </nav>

        <a className="sair"><LogOut /> Sair</a>
      </aside>

      <main className="aluno-conteudo">
        <h1>Olá, João!</h1>
        <p className="boas-vindas">Que bom ter você por aqui!</p>

        <section className="banner-senai">
          <div className="banner-texto">
            <h2><br /><br /><br /></h2>
            <span></span>
          </div>
        </section>

        <section className="resumo">
          <div className="caixa turma">
            <h3><GraduationCap /> Turma</h3>
            <p><strong>TIA - Técnico em automação</strong></p>
            <p><strong>TURNO - Integral</strong></p>
            <p><strong>Período - Amanhã</strong></p>
          </div>

          <div className="caixa presenca">
            <h3><Clock /> Presença</h3>
            <div className="porcentagem">
              <span>100%</span>
              <strong>– 0 Atrasos</strong>
            </div>
          </div>

          <div className="caixa ocorrencias">
            <CalendarDays size={32} />
            <h4>Últimas ocorrências!</h4>
            <p>ocorrências em aberto!</p>
            <strong className="numero">3</strong>
          </div>

          <div className="caixa notificacao">
            <Bell size={32} />
            <h4>Mantenha seu cadastro sempre atualizado!</h4>
            <p>Assim, conseguimos te avisar sobre eventuais comunicações importantes!</p>
          </div>
        </section>

        <section className="atalhos">
          <h2>Acesso Rápido!</h2>
          <div className="atalhos-lista">
            <button><QrCode /><strong>Registrar chegada</strong><span>Escaneie o QR code...</span></button>
            <button><Clock /><strong>Meus atrasos</strong><span>Veja seu histórico...</span></button>
            <button><ClipboardList /><strong>Minhas ocorrências</strong><span>Acompanhe o status</span></button>
            <button><FileText /><strong>Atestados/Justificativas</strong><span>Envie seus documentos</span></button>
          </div>
        </section>
      </main>
    </div>
  );
}
