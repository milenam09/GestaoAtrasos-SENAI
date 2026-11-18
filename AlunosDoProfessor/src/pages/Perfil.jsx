import React from 'react';
import './Perfil.css';

export default function Perfil({ userName = 'Mariana', userRole = 'Professor' }) {
  return (
    <div className="perfil-page">
      <div className="perfil-card">
        <div className="perfil-header">
          <div className="perfil-avatar-big">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <h2 className="perfil-name-title">{userName}</h2>
            <span className="perfil-role-badge">{userRole}</span>
          </div>
        </div>

        <div className="perfil-info-grid">
          <div className="perfil-field">
            <label>Nome Completo</label>
            <input type="text" value={userName} readOnly />
          </div>
          <div className="perfil-field">
            <label>Cargo / Função</label>
            <input type="text" value={userRole} readOnly />
          </div>
          <div className="perfil-field">
            <label>Unidade SENAI</label>
            <input type="text" value="SENAI - Unidade Central" readOnly />
          </div>
          <div className="perfil-field">
            <label>Turmas Atribuídas</label>
            <input type="text" value="T1A, T2A, T2B, T3A" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}
