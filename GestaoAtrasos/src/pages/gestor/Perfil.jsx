
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/gestor/Perfil.css";

// Ícones
const IconeSetaVoltar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="4" x2="4" y2="20" />
    <polyline points="14 6 8 12 14 18" />
    <line x1="8" y1="12" x2="20" y2="12" />
  </svg>
);

const IconeCamara = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconeUsuario = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconeCalendario = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconeEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconeTelefone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconeTurma = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconeRelogio = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconeGraduacao = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const IconeAjuda = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function Perfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const handleEditarFotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFotoSelecionada = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFotoPerfil(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="perfil-pagina">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFotoSelecionada}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Cabeçalho */}
      <div className="perfil-header">
        <div className="perfil-titulo-linha">
          <button
            className="btn-voltar-seta"
            onClick={() => navigate(-1)}
            type="button"
          >
            <IconeSetaVoltar />
          </button>

          <h2>Meu perfil</h2>
        </div>

        <p className="perfil-subtitulo">
          Confira seus dados pessoais e personalize suas informações no sistema.
        </p>
      </div>

      {/* Cartão principal */}
      <div className="perfil-card-main">

        {/* Topo do perfil */}
        <div className="perfil-topo-box">
          <div className="perfil-usuario-info">
            <div className="perfil-avatar-circle">
              {fotoPerfil ? (
                <img src={fotoPerfil} alt="Foto de perfil" />
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>

            <div className="perfil-usuario-texto">
              <h3>Jucelino</h3>
              <span>Gestor</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-editar-foto"
            onClick={handleEditarFotoClick}
          >
            <IconeCamara />
            <span>Editar foto</span>
          </button>
        </div>

        {/* Informações */}
        <div className="perfil-conteudo-grid">

          {/* Dados pessoais */}
          <div className="card-bloco-dado">
            <h4>Dados pessoais</h4>

            <div className="bloco-lista">
              <div className="item-dado-linha">
                <IconeUsuario />
                <div>
                  <strong>Nome completo</strong>
                  <p>Jucelino Santos</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeCalendario />
                <div>
                  <strong>Data de nascimento</strong>
                  <p>05/03/1987</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeEmail />
                <div>
                  <strong>Email</strong>
                  <p>Jucelino.santos@gmail.com</p>
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

          {/* Dados da unidade e da gestão - um único card */}
          <div className="card-bloco-dado card-dados-gestor">

            <h4>Dados da unidade</h4>

            <div className="bloco-lista lista-dados-unidade">
              <div className="item-dado-linha">
                <IconeTurma />
                <div>
                  <strong>Unidade</strong>
                  <p>SENAI São Caetano do Sul - Cyber e IA</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeGraduacao />
                <div>
                  <strong>Cargo</strong>
                  <p>Gestor</p>
                </div>
              </div>

              <div className="item-dado-linha">
                <IconeUsuario />
                <div>
                  <strong>Setor</strong>
                  <p>Gestão Educacional</p>
                </div>
              </div>
            </div>

            <div className="divisor-dados-gestor"></div>

            <h4 className="titulo-dados-gestao">Dados da gestão</h4>

            <div className="resumo-dados-gestao">
              <div className="item-resumo-gestao">
                <strong>25</strong>
                <span>Professores</span>
              </div>

              <div className="item-resumo-gestao">
                <strong>12</strong>
                <span>Turmas</span>
              </div>

              <div className="item-resumo-gestao">
                <strong>320</strong>
                <span>Alunos</span>
              </div>
            </div>

          </div>
        </div>

        {/* Rodapé */}
        <div className="perfil-rodape-box">
          <div className="rodape-ajuda-info">
            <IconeAjuda />

            <div>
              <h5>Precisa atualizar seus dados?</h5>
              <p>Entre em contato com a nossa secretaria da unidade</p>
            </div>
          </div>

          <button
            type="button"
            className="btn-ver-contato"
            onClick={() => navigate("/contato")}
          >
            Ver contato
          </button>
        </div>

      </div>
    </div>
  );
}
