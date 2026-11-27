import "../../css/professor/AlunosDoProfessorBase.css";
import React, { useState } from 'react';
import '../../css/professor/AlunosDoProfessor.css';
import Menu from '../../components/navigation/professor/MenuAlunos.jsx';
import Alunos from './Alunos.jsx';
import Perfil from './variantes/PerfilSimplificado.jsx';
import Contato from './variantes/ContatoSuporte.jsx';
import PlaceholderPage from '../../components/layout/PaginaEmConstrucao.jsx';

export default function App() {
  const [activePage, setActivePage] = useState('Alunos');


  // Professor Mariana conforme Imagem 2
  const userName = 'Mariana';
  const userRole = 'Professor';

  const handleNavigate = (pageId) => {
    if (pageId === 'Sair') {
      if (window.confirm('Deseja realmente sair do sistema?')) {
        alert('Sessão encerrada com sucesso.');
      }
      return;
    }
    setActivePage(pageId);

  };

  const renderContent = () => {
    switch (activePage) {
      case 'Alunos':
        return <Alunos />;
      case 'Perfil':
        return <Perfil userName={userName} userRole={userRole} />;
      case 'Contato':
        return <Contato />;
      default:
        return (
          <PlaceholderPage
            title={activePage}
            onBack={() => setActivePage('Alunos')}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Menu Lateral Estilizado com Layout da Imagem 3 e Ícones da Imagem 2 */}
      <Menu
        activeItem={activePage}
        onNavigate={handleNavigate}
        userName={userName}
        userRole={userRole}
      />

      {/* Conteúdo Principal (Tela 2 - Alunos) */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}