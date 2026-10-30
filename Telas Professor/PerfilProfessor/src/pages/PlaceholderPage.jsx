import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import './PlaceholderPage.css';

const PlaceholderPage = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="placeholder-container">
      <button 
        onClick={() => navigate('/perfil')}
        className="placeholder-back-btn"
      >
        <ArrowLeft size={20} />
        <span>Voltar para o Perfil</span>
      </button>

      <div className="placeholder-card">
        <Construction size={48} color="#e30613" className="placeholder-icon" />
        <h2 className="placeholder-title">
          Módulo de {title}
        </h2>
        <p className="placeholder-desc">
          Você está navegando pela rota: <code>{location.pathname}</code>.
          O foco atual desta demonstração é a tela de Perfil do Professor.
        </p>
        <button
          onClick={() => navigate('/perfil')}
          className="placeholder-btn-primary"
        >
          Acessar Perfil do Professor
        </button>
      </div>
    </div>
  );
};

export default PlaceholderPage;
