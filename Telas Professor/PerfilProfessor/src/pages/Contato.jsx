import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contato.css";

// Seta exatamente igual à da página de Perfil (estilo linha reta de voltar)
const IconeSetaVoltar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
);

const IconeEndereco = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconeTelefone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const IconeWhatsapp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);
const IconeEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const IconeRelogio = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const IconeCentral = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c2232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 18.72a9 9 0 1 0-12 0"/><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
);

export default function Contato() {
  const navigate = useNavigate();

  return (
    <div className="contato-container">
      {/* Cabeçalho Reestruturado */}
      <div className="contato-header">
        <div className="contato-titulo-linha">
          <button className="btn-voltar-topo" onClick={() => navigate(-1)}>
            <IconeSetaVoltar />
          </button>
          <h2>Contato da Unidade</h2>
        </div>
        <p className="contato-subtitulo">
          Entre em contato com a nossa secretaria para atualizar seus dados ou tirar dúvidas.
        </p>
      </div>

      {/* Cartão principal */}
      <div className="contato-card">
        {/* Banner do SENAI */}
        <div className="contato-banner">
          <h3>Escola SENAI "Paulo Antonio Skaf"</h3>
          <span>SENAI São Caetano do Sul - Cyber e IA</span>
        </div>

        {/* Grelha de conteúdos */}
        <div className="contato-grid">
          <div className="info-box">
            <div className="info-header">
              <IconeEndereco />
              <h4>Endereço</h4>
            </div>
            <p>Rua Niterói, 180 – Centro, São Caetano do Sul - SP, CEP: 09510-200</p>
          </div>

          <div className="info-box">
            <div className="info-header">
              <IconeTelefone />
              <h4>Telefone</h4>
            </div>
            <p className="destaque-contato">(11) 4225-2000</p>
          </div>

          <div className="info-box">
            <div className="info-header">
              <IconeWhatsapp />
              <h4>WhatsApp</h4>
            </div>
            <p className="destaque-contato">(11) 4225-2001</p>
          </div>

          <div className="info-box">
            <div className="info-header">
              <IconeEmail />
              <h4>E-mail</h4>
            </div>
            <p className="destaque-contato">informatica@sp.senai.br</p>
          </div>

          <div className="info-box largura-total">
            <div className="info-header">
              <IconeRelogio />
              <h4>Horário de Atendimento</h4>
            </div>
            <p>De segunda a sexta-feira, das 08h00 às 17h00 (sujeito a alterações conforme calendário institucional).</p>
          </div>

          <div className="info-box largura-total central-atendimento">
            <div className="info-header">
              <IconeCentral />
              <h4>Central de Relacionamento (Geral SENAI-SP)</h4>
            </div>
            <p className="destaque-contato">(11) 4210-4455 (Telefone/WhatsApp)</p>
          </div>
        </div>

        {/* Rodapé com botão */}
        <div className="contato-rodape">
          <button className="btn-voltar-perfil" onClick={() => navigate("/perfil")}>
            Voltar ao perfil
          </button>
        </div>
      </div>
    </div>
  );
}