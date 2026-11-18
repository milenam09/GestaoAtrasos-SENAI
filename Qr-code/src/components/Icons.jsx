
import React from 'react';

// LOGO DO SENAI
export function SenaiLogo({ className = '', width = 160, height = 44 }) {
  return (
    <div
      className={`senai-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#e30613',
        padding: '6px 14px',
        position: 'relative',
        borderRadius: '2px',
        userSelect: 'none',
        width,
        height,
        boxSizing: 'border-box',
      }}
    >
      <svg width="14" height="24" viewBox="0 0 14 24" fill="none" style={{ marginRight: '6px' }}>
        {[2, 6, 10, 14, 18, 22].map(y => (
          <line key={y} x1="0" y1={y} x2="14" y2={y} stroke="white" strokeWidth="2.5" />
        ))}
      </svg>

      <span style={{
        color: '#ffffff',
        fontWeight: 900,
        fontSize: '24px',
        letterSpacing: '1px',
        fontStyle: 'italic',
        fontFamily: "'Arial Black', 'Inter', sans-serif",
        lineHeight: 1,
      }}>
        SENAI
      </span>

      <svg width="14" height="24" viewBox="0 0 14 24" fill="none" style={{ marginLeft: '6px' }}>
        {[2, 6, 10, 14, 18, 22].map(y => (
          <line key={y} x1="0" y1={y} x2="14" y2={y} stroke="white" strokeWidth="2.5" />
        ))}
      </svg>
    </div>
  );
}

// 1. INÍCIO
export function IconeInicio({ size = 26, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19 9.3V4h-3v2.7L12 2 1 12h3v10h6v-6h4v6h6V12h3L19 9.3z" />
    </svg>
  );
}

// 2. ACOLHIMENTOS
export function IconeAcolhimentos({ size = 26, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2.5 2.5 0 0 0-2.5 2.5v15A2.5 2.5 0 0 0 6 22h12a2.5 2.5 0 0 0 2.5-2.5V8.5L14 2z" />
      <path d="M14 2v6.5h6.5" />
    </svg>
  );
}

// 3. TURMAS
export function IconeTurmas({ size = 26, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="7.5" y="3.5" width="14" height="13" rx="2.5"
        stroke={color} strokeWidth="2.2" />
      <line x1="12" y1="16.5" x2="17" y2="16.5"
        stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="6.5" cy="11" r="4.2" fill="#0c2232" />
      <path d="M0 22c0-4 2.8-6.2 6.5-6.2s6.5 2.2 6.5 6.2" fill="#0c2232" />
      <circle cx="6.5" cy="11" r="3.2" fill={color} />
      <path d="M1 21.5c0-3.3 2.5-5.2 5.5-5.2s5.5 1.9 5.5 5.2" fill={color} />
    </svg>
  );
}

// COMPATIBILIDADE COM O NOME ANTIGO
export const IconeMinhasTurmas = IconeTurmas;

// 4. ALUNOS
export function IconeAlunos({ size = 26, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="7.5" r="3.2" />
      <path d="M7.5 21v-1.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5V21z" />
      <circle cx="5.5" cy="9.5" r="2.6" />
      <path d="M1 21v-1c0-2 1.6-3.7 3.8-4.2.3.8.7 1.6 1.3 2.2V21z" />
      <circle cx="18.5" cy="9.5" r="2.6" />
      <path d="M23 21v-1c0-2-1.6-3.7-3.8-4.2-.3.8-.7 1.6-1.3 2.2V21z" />
    </svg>
  );
}

// 5. RELATÓRIOS
export function IconeRelatorios({ size = 26, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="18" rx="3.5"
        stroke={color} strokeWidth="2.4" />
      <rect x="8.5" y="1.5" width="7" height="4" rx="2"
        stroke={color} strokeWidth="2.2" fill="#0c2232" />
      <line x1="8" y1="9.5" x2="16" y2="9.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="13" x2="16" y2="13" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="16.5" x2="16" y2="16.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="20" x2="16" y2="20" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// 6. QR CODE
export function IconeQRCode({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2.2" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2.2" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2.2" />
      <path d="M14 14h3v3h-3zM19 14h2v2h-2zM19 19h2v2h-2zM14 19h2v2h-2z"
        stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// 7. PERFIL
export function IconePerfil({ size = 26, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="7.5" r="4.8" />
      <path d="M3.5 21.5c0-4.5 3.8-7 8.5-7s8.5 2.5 8.5 7z" />
    </svg>
  );
}

// 8. SAIR
export function IconeSair({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ÍCONES AUXILIARES
export function SearchIcon({ size = 18, color = '#64748b' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function FilterIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="10" y1="12" x2="20" y2="12" />
      <line x1="4" y1="12" x2="7" y2="12" />
      <line x1="16" y1="18" x2="20" y2="18" />
      <line x1="4" y1="18" x2="13" y2="18" />
      <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="14.5" cy="18" r="1.5" fill="currentColor" />
      <circle cx="7" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function EyeIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ChevronLeft({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ChevronRight({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function ChevronDown({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ArrowBackIcon({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function CloseIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
