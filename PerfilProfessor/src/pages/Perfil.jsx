import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  User,
  X,
  Check,
  Building,
  Upload,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import {
  SolidUser,
  SolidCalendar,
  SolidMail,
  SolidPhone,
  SolidTurma,
  SolidClock,
  SolidPeriodo,
  SolidModeloEnsino,
  SolidHelpCircle,
  SolidWhatsApp
} from '../components/Icons';
import './Perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Profile state for interactive features
  const [profileImage, setProfileImage] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showEditPhotoModal, setShowEditPhotoModal] = useState(false);
  const [notification, setNotification] = useState('');

  // Personal data matching screen
  const personalData = {
    nomeCompleto: 'Mariana Costa',
    dataNascimento: '18/06/1988',
    email: 'mariana.costa@gmail.com',
    telefone: '11 981775155'
  };

  // Academic data matching screen
  const academicData = {
    turma: '2 A - Desenvolvimento de Sistemas',
    turno: 'Integral',
    periodo: 'Ativo',
    modeloEnsino: 'Técnico'
  };

  // Handle Photo Upload
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setShowEditPhotoModal(false);
      showToast('Foto de perfil atualizada com sucesso!');
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    setShowEditPhotoModal(false);
    showToast('Foto removida.');
  };

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3500);
  };

  return (
    <div className="perfil-container">
      {/* Toast Notification */}
      {notification && (
        <div className="toast-notification">
          <Check size={18} />
          <span>{notification}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="perfil-header">
        <button 
          className="back-btn" 
          onClick={() => navigate(-1)} 
          title="Voltar"
          aria-label="Voltar"
        >
          <ArrowLeft size={22} className="back-arrow" />
          <h1 className="header-title">Meu perfil</h1>
        </button>
        <p className="header-subtitle">
          Confira seus dados pessoais e personalize suas informações no sistema.
        </p>
      </header>

      {/* Main Profile Card Container */}
      <section className="profile-main-card">
        {/* Top Header Section: Avatar, Name, Role & Edit Photo Button */}
        <div className="profile-card-top">
          <div className="profile-user-info-group">
            <div className="profile-avatar-large">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Foto de Mariana Costa" 
                  className="profile-uploaded-img" 
                />
              ) : (
                <div className="profile-avatar-placeholder">
                  <User size={38} className="profile-placeholder-icon" />
                </div>
              )}
            </div>

            <div className="profile-titles">
              <h2 className="profile-name">{personalData.nomeCompleto}</h2>
              <span className="profile-role">Professor</span>
            </div>
          </div>

          <button 
            className="btn-edit-photo" 
            onClick={() => setShowEditPhotoModal(true)}
          >
            <Camera size={18} className="btn-camera-icon" />
            <span>Editar foto</span>
          </button>
        </div>

        {/* Divider */}
        <div className="profile-divider" />

        {/* Info Grid (Dados Pessoais & Dados Acadêmicos) */}
        <div className="profile-cards-grid">
          {/* Card 1: Dados pessoais */}
          <div className="info-subcard">
            <h3 className="subcard-title">Dados pessoais</h3>
            <div className="info-rows-list">
              {/* Row 1: Nome completo */}
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <SolidUser size={22} />
                </div>
                <div className="info-texts">
                  <span className="info-label">Nome completo</span>
                  <span className="info-value">{personalData.nomeCompleto}</span>
                </div>
              </div>

              {/* Row 2: Data de nascimento */}
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <SolidCalendar size={22} />
                </div>
                <div className="info-texts">
                  <span className="info-label">Data de nascimento</span>
                  <span className="info-value">{personalData.dataNascimento}</span>
                </div>
              </div>

              {/* Row 3: Email */}
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <SolidMail size={22} />
                </div>
                <div className="info-texts">
                  <span className="info-label">Email</span>
                  <span className="info-value">{personalData.email}</span>
                </div>
              </div>

              {/* Row 4: Telefone */}
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <SolidPhone size={22} />
                </div>
                <div className="info-texts">
                  <span className="info-label">Telefone</span>
                  <span className="info-value">{personalData.telefone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Dados acadêmicos */}
          <div className="info-subcard">
            <h3 className="subcard-title">Dados acadêmicos</h3>
            <div className="info-rows-list">
              {/* Row 1: Turma */}
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <SolidTurma size={22} />
                </div>
                <div className="info-texts">
                  <span className="info-label">Turma</span>
                  <span className="info-value">{academicData.turma}</span>
                </div>
              </div>

              {/* Row 2: Turno */}
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <SolidClock size={22} />
                </div>
                <div className="info-texts">
                  <span className="info-label">Turno</span>
                  <span className="info-value">{academicData.turno}</span>
                </div>
              </div>

              {/* Row 3: Período */}
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <SolidPeriodo size={22} />
                </div>
                <div className="info-texts">
                  <span className="info-label">período</span>
                  <span className="info-value">{academicData.periodo}</span>
                </div>
              </div>

              {/* Row 4: Modelo de ensino */}
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <SolidModeloEnsino size={22} />
                </div>
                <div className="info-texts">
                  <span className="info-label">Modelo de ensino</span>
                  <span className="info-value">{academicData.modeloEnsino}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Space area in card matching original design */}
        <div className="card-spacer" />

        {/* Card Footer: Update Help & Ver Contato */}
        <div className="profile-card-footer">
          <div className="footer-help-info">
            <div className="help-icon-wrapper">
              <SolidHelpCircle size={26} />
            </div>
            <div className="help-text-block">
              <span className="help-title">Precisa atualizar seus dados ?</span>
              <span className="help-subtitle">Entre em contato com a nossa secretaria da unidade</span>
            </div>
          </div>

          <button 
            className="btn-ver-contato"
            onClick={() => setShowContactModal(true)}
          >
            Ver contato
          </button>
        </div>
      </section>

      {/* Hidden File Input for Image upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoSelect} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      {/* Modal: Editar Foto */}
      {showEditPhotoModal && (
        <div className="modal-overlay" onClick={() => setShowEditPhotoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Personalizar Foto de Perfil</h3>
              <button 
                className="modal-close-btn" 
                onClick={() => setShowEditPhotoModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body photo-modal-body">
              <div className="modal-avatar-preview">
                {profileImage ? (
                  <img src={profileImage} alt="Preview" className="preview-img" />
                ) : (
                  <User size={48} color="#475569" />
                )}
              </div>
              <p className="photo-modal-instruction">
                Escolha uma nova foto de perfil em formato PNG, JPG ou WEBP.
              </p>
              <div className="photo-modal-actions">
                <button 
                  className="btn-modal-upload" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={18} />
                  <span>Selecionar arquivo</span>
                </button>
                {profileImage && (
                  <button 
                    className="btn-modal-remove" 
                    onClick={handleRemovePhoto}
                  >
                    Remover foto
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Secretaria / Contato */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-with-icon">
                <Building size={20} className="modal-title-icon" />
                <h3>Secretaria da Unidade SENAI</h3>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => setShowContactModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body contact-modal-body">
              <p className="contact-info-desc">
                Para solicitar alterações em seu cadastro oficial, entre em contato através dos canais de atendimento da unidade:
              </p>

              <div className="contact-list">
                {/* WhatsApp */}
                <div className="contact-card-item">
                  <SolidWhatsApp size={20} className="contact-item-icon whatsapp-icon" />
                  <div className="contact-item-details">
                    <strong>WhatsApp</strong>
                    <a 
                      href="https://wa.me/551142252001" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-link"
                    >
                      (11) 4225-2001
                    </a>
                  </div>
                </div>

                {/* Telefone */}
                <div className="contact-card-item">
                  <Phone size={19} className="contact-item-icon" />
                  <div className="contact-item-details">
                    <strong>Telefone</strong>
                    <a href="tel:1142252000" className="contact-link">
                      (11) 4225-2000
                    </a>
                  </div>
                </div>

                {/* E-mail */}
                <div className="contact-card-item">
                  <Mail size={19} className="contact-item-icon" />
                  <div className="contact-item-details">
                    <strong>E-mail</strong>
                    <a href="mailto:informatica@sp.senai.br" className="contact-link">
                      informatica@sp.senai.br
                    </a>
                  </div>
                </div>

                {/* Horários de Funcionamento */}
                <div className="contact-card-item">
                  <Clock size={19} className="contact-item-icon" />
                  <div className="contact-item-details">
                    <strong>Horários de Funcionamento</strong>
                    <div className="schedule-list">
                      <div className="schedule-row">
                        <span className="schedule-day">Segunda-feira:</span>
                        <span className="schedule-time">das 8h às 18h</span>
                      </div>
                      <div className="schedule-row">
                        <span className="schedule-day">Terça a sexta-feira:</span>
                        <span className="schedule-time">das 8h às 19h</span>
                      </div>
                      <div className="schedule-row">
                        <span className="schedule-day">Sábados:</span>
                        <span className="schedule-time">das 9h às 16h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-modal-primary" 
                onClick={() => setShowContactModal(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
