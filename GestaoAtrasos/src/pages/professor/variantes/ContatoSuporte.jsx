import React, { useState } from 'react';
import '../../../css/professor/variantes/ContatoSuporte.css';

export default function Contato() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="contato-page">
      <div className="contato-card">
        <h2 className="contato-title">Contato e Suporte</h2>
        <p className="contato-desc">
          Precisa de ajuda com o sistema ou deseja reportar uma inconsistência nas turmas? Envie uma mensagem.
        </p>

        {enviado ? (
          <div style={{ padding: '16px', background: '#dcfce7', color: '#15803d', borderRadius: '8px' }}>
            Mensagem enviada com sucesso! A coordenação entrará em contato.
          </div>
        ) : (
          <form className="contato-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Assunto</label>
              <input type="text" placeholder="Ex: Correção de chamada ou atraso" required />
            </div>
            <div className="form-group">
              <label>Mensagem</label>
              <textarea rows={4} placeholder="Descreva sua solicitação..." required></textarea>
            </div>
            <button type="submit" className="btn-submit-contato">
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </div>
  );
}