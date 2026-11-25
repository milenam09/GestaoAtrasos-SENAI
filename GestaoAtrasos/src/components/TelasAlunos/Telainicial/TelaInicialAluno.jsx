import React from "react";
import { Clock, ClipboardList, FileText, BookOpen, Bell, CalendarDays, QrCode } from "lucide-react";
import Sidebar from "../Menu/Menu";
import banner from "../../../assets/banner.png.jpeg";
import "./TelaInicialAluno.css";

function TelaInicialAluno() {
  return (
    <div className="aluno-container">
      <Sidebar role="aluno" />

      <main className="aluno-main">
        <header className="boas-vindas">
          <h2>Olá, João!</h2>
          <p>Que bom ter você por aqui!</p>
        </header>

        <section className="topo-dashboard">
          <div className="banner">
            <img src={banner} alt="Prédio do SENAI" className="icone-imagem" />
            <div className="linha-vermelha"></div>
          </div>

          <div className="ocorrencias">
            <h4>Últimas ocorrências!</h4>
            <CalendarDays size={29} fill="black" color="black" />
            <p>ocorrências em aberto!</p>
            <strong>3</strong>
          </div>
        </section>

        <section className="informacoes">
          <div className="card-info">
            <h3>
              <BookOpen size={24} />
              Turma
            </h3>
            <p>TIA - Técnico em automação</p>
            <p>TURNO - Integral</p>
            <p>Período - Amanhã</p>
          </div>

          <div className="card-info presenca">
            <h2>
              <Clock size={29} />
              Presença
            </h2>

            <div className="presenca-dados">
              <div className="circulo">100%</div>
              <strong>- 0 Atrasos</strong>
            </div>
          </div>

          <div className="card-info aviso">
            <Bell size={30} fill="black" color="black" />
            <strong>
              Mantenha seu cadastro<br />
              Sempre Atualizado!
            </strong>
            <p>
              Assim, conseguimos te avisar sobre eventuais
              comunicados importantes!
            </p>
          </div>
        </section>

        <h2 className="titulo-rapido">Acesso Rápido!</h2>

        <section className="acessos">
          <div className="card-acesso">
            <QrCode />
            <strong>Registrar chegada</strong>
            <small>Escaneie o QR code...</small>
          </div>

          <div className="card-acesso">
            <Clock />
            <strong>Meus atrasos</strong>
            <small>Veja seu histórico...</small>
          </div>

          <div className="card-acesso">
            <ClipboardList />
            <strong>Minhas ocorrências</strong>
            <small>Acompanhe o status</small>
          </div>

          <div className="card-acesso">
            <FileText />
            <strong>Atestados/Justificativas</strong>
            <small>Envie seus documentos</small>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TelaInicialAluno;
