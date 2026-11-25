import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

// Ícones SVG exatos
const IconeSetaVoltar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
);
const IconeCamera = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
const IconeUserAvatar = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const IconePessoa = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const IconeCalendario = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const IconeEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const IconeTelefone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const IconeTurma = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const IconeRelogio = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const IconeChapeu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);
const IconeAjuda = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
);

export default function Perfil() {
  const navigate = useNavigate();
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const inputFotoRef = useRef(null);

  const handleEscolherFoto = () => {
    inputFotoRef.current.click();
  };

  const handleFotoAlterada = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoPerfil(URL.createObjectURL(file));
    }
  };

  return (
    <div className="perfil-pagina">
      <input
        type="file"
        ref={inputFotoRef}
        onChange={handleFotoAlterada}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Cabeçalho Reestruturado */}
      <div className="perfil-header">
        <div className="perfil-titulo-linha">
          <button className="btn-voltar-seta" onClick={() => navigate(-1)}>
            <IconeSetaVoltar />
          </button>
          <h2>Meu perfil</h2>
        </div>
        <p className="perfil-subtitulo">
          Confira seus dados pessoais e personalize suas informações no sistema.
        </p>
      </div>

      {/* Cartão de Perfil */}
      <div className="perfil-card-main">
        {/* Topo com Usuário e Botão */}
        <div className="perfil-topo-box">
          <div className="perfil-usuario-info">
            <div className="perfil-avatar-circle">
              {fotoPerfil ? (
                <img src={fotoPerfil} alt="Foto do perfil" />
              ) : (
                <IconeUserAvatar />
              )}
            </div>
            <div className="perfil-usuario-texto">
              <h3>Mariana Costa</h3>
              <span>Professor</span>
            </div>
          </div>

          <button className="btn-editar-foto" onClick={handleEscolherFoto}>
            <IconeCamera />
            <span>Editar foto</span>
          </button>
        </div>

        {/* Blocos de Dados Pessoais e Acadêmicos */}
        <div className="perfil-conteudo-grid">
          {/* Caixa 1: Dados pessoais */}
          <div className="card-bloco-dado">
            <h4>Dados pessoais</h4>
            <div className="bloco-lista">
              <div className="item-dado-linha">
                <IconePessoa />
                <div>
                  <strong>Nome completo</strong>
                  <p>Mariana Costa</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeCalendario />
                <div>
                  <strong>Data de nascimento</strong>
                  <p>10/08/1999</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeEmail />
                <div>
                  <strong>Email</strong>
                  <p>mariana.costa@gmail.com</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeTelefone />
                <div>
                  <strong>Telefone</strong>
                  <p>12 991779195</p>
                </div>
              </div>
            </div>
          </div>

          {/* Caixa 2: Dados acadêmicos */}
          <div className="card-bloco-dado">
            <h4>Dados acadêmicos</h4>
            <div className="bloco-lista">
              <div className="item-dado-linha">
                <IconeTurma />
                <div>
                  <strong>Turma</strong>
                  <p>3 A - Desenvolvimento de Sistemas</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeRelogio />
                <div>
                  <strong>Turno</strong>
                  <p>Integral</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeCalendario />
                <div>
                  <strong>período</strong>
                  <p>Ativo</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeChapeu />
                <div>
                  <strong>Modelo de ensino</strong>
                  <p>técnico</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé do Cartão */}
        <div className="perfil-rodape-box">
          <div className="rodape-ajuda-info">
            <IconeAjuda />
            <div>
              <h5>Precisa atualizar seus dados ?</h5>
              <p>Entre em contato com a nossa secretaria da unidade</p>
            </div>
          </div>

          <button className="btn-ver-contato" onClick={() => navigate("/contato")}>
            Ver contato
          </button>
        </div>
      </div>
    </div>
  );
}