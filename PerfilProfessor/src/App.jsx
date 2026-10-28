import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Menu'; // Ajuste o caminho do Sidebar se necessário
import Perfil from './pages/Perfil';
import Contato from './pages/Contato';
import PlaceholderPage from './pages/PlaceholderPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Fixed / Left Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Route Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/perfil" replace />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/inicio" element={<PlaceholderPage title="Início" />} />
            <Route path="/acolhimentos" element={<PlaceholderPage title="Acolhimentos" />} />
            <Route path="/turmas" element={<PlaceholderPage title="Minhas Turmas" />} />
            <Route path="/alunos" element={<PlaceholderPage title="Alunos" />} />
            <Route path="/relatorios" element={<PlaceholderPage title="Relatórios" />} />
            <Route path="*" element={<Navigate to="/perfil" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;