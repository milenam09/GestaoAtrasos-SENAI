import React from 'react';
import '../../css/professor/PaginaEmConstrucao.css';

export default function PlaceholderPage({ title = 'Página', onBack = () => {} }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="placeholder-title">{title}</h2>
        <p className="placeholder-text">
          Esta tela ({title}) está integrada ao sistema SENAI e pode ser expandida conforme a necessidade do fluxo.
        </p>
        <button className="btn-voltar-alunos" onClick={onBack}>
          Voltar para Alunos
        </button>
      </div>
    </div>
  );
}