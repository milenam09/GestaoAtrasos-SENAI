import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Users, 
  ClipboardList, 
  User, 
  LogOut,
  Presentation,
  Menu,
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleLogout = () => {
    setIsMobileOpen(false);
    if (window.confirm('Deseja realmente sair da sua conta?')) {
      alert('Sessão encerrada com sucesso.');
      navigate('/perfil');
    }
  };

  const closeMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Top Navbar for Mobile (Visible <= 425px) */}
      <header className="mobile-header">
        <div className="senai-logo-badge mobile-logo">
          <span>SENAI</span>
        </div>

        <button 
          className="mobile-hamburger-btn" 
          onClick={() => setIsMobileOpen(true)}
          aria-label="Abrir menu"
          title="Abrir menu"
        >
          <Menu size={26} />
        </button>
      </header>

      {/* Backdrop overlay for Mobile Drawer */}
      {isMobileOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Mobile-only drawer header with close button */}
        <div className="sidebar-mobile-close-header">
          <div className="senai-logo-badge">
            <span>SENAI</span>
          </div>
          <button 
            className="sidebar-close-btn" 
            onClick={closeMenu}
            aria-label="Fechar menu"
            title="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Desktop Logo Badge */}
        <div className="sidebar-logo-container">
          <div className="senai-logo-badge">
            <span>SENAI</span>
          </div>
        </div>

        {/* Professor Profile Card / Summary */}
        <div className="sidebar-user-section">
          <div className="sidebar-avatar-wrapper">
            <div className="sidebar-avatar-circle">
              <User size={24} className="avatar-icon" />
            </div>
          </div>
          <div className="sidebar-user-info">
            <h3 className="sidebar-user-name">Mariana</h3>
            <p className="sidebar-user-role">Professor</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li>
              <NavLink 
                to="/inicio" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <Home size={22} className="menu-icon" />
                <span>Início</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/acolhimentos" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <FileText size={22} className="menu-icon" />
                <span>Acolhimentos</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/turmas" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <Presentation size={22} className="menu-icon" />
                <span>Minhas Turmas</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/alunos" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <Users size={22} className="menu-icon" />
                <span>Alunos</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/relatorios" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <ClipboardList size={22} className="menu-icon" />
                <span>Relatórios</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/perfil" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <User size={22} className="menu-icon" />
                <span>Perfil</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout at bottom */}
        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={handleLogout} title="Sair do sistema">
            <LogOut size={20} className="logout-icon" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
