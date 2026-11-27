import React from 'react';

// Logo do SENAI estilizado com as listras clássicas nas laterais
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
      }}
    >
      


      {/* Listras brancas à direita */}
      
    </div>
  );
}

// 1. Inicio (Casa sólida com chaminé e recorte de porta)
export function IconeInicio({ size = 26, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19 9.3V4h-3v2.7L12 2 1 12h3v10h6v-6h4v6h6V12h3L19 9.3z" />
    </svg>
  );
}

// 2. Acolhimentos (Folha/Documento com dobra no canto superior direito)
export function IconeAcolhimentos({ size = 26, color = '#ffffff' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2.5 2.5 0 0 0-2.5 2.5v15A2.5 2.5 0 0 0 6 22h12a2.5 2.5 0 0 0 2.5-2.5V8.5L14 2z" />
      <path d="M14 2v6.5h6.5" />
    </svg>
  );
}

// 3. Turmas (Silhueta de pessoa à frente e lousa/quadro com suporte ao fundo)
export function IconeTurmas({ size = 26, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Quadro ao fundo */}
      <rect
        x="7.5"
        y="3.5"
        width="14"
        height="13"
        rx="2.5"
        stroke={color}
        strokeWidth="2.2"
      />
      {/* Bandeja de giz / linha de apoio */}
      <line
        x1="12"
        y1="16.5"
        x2="17"
        y2="16.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Recorte de fundo para separar a cabeça do quadro */}
      <circle cx="6.5" cy="11" r="4.2" fill="#0c2232" />
      <path d="M0 22c0-4 2.8-6.2 6.5-6.2s6.5 2.2 6.5 6.2" fill="#0c2232" />
      {/* Pessoa em primeiro plano */}
      <circle cx="6.5" cy="11" r="3.2" fill={color} />
      <path
        d="M1 21.5c0-3.3 2.5-5.2 5.5-5.2s5.5 1.9 5.5 2"
        fill={color}
      />
    </svg>
  );
}

// 4. Alunos (Grupo de 3 pessoas em silhueta sólida)
export function IconeAlunos({ size = 26, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      {/* Figura central */}
      <circle cx="12" cy="7.5" r="3.2" />
      <path d="M7.5 21v-1.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5V21z" />

      {/* Figura esquerda */}
      <circle cx="5.5" cy="9.5" r="2.6" />
      <path d="M1 21v-1c0-2 1.6-3.7 3.8-4.2.3.8.7 1.6 1.3 2.2V21z" />

      {/* Figura direita */}
      <circle cx="18.5" cy="9.5" r="2.6" />
      <path d="M23 21v-1c0-2-1.6-3.7-3.8-4.2-.3.8-.7 1.6-1.3 2.2V21z" />
    </svg>
  );
}

// 5. Relatorios (Prancheta com bordas grossas e 4 barras horizontais)
export function IconeRelatorios({ size = 26, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="4"
        width="16"
        height="18"
        rx="3.5"
        stroke={color}
        strokeWidth="2.4"
      />
      <rect
        x="8.5"
        y="1.5"
        width="7"
        height="4"
        rx="2"
        stroke={color}
        strokeWidth="2.2"
        fill="#0c2232"
      />
      <line x1="8" y1="9.5" x2="16" y2="9.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="13" x2="16" y2="13" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="16.5" x2="16" y2="16.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="20" x2="16" y2="20" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// 6. Gerar QR Code (4 blocos como na imagem 1)
export function IconeQRCode({ size = 24, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.2" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.2" />
      <path
        d="M14 14h3v3h-3zM19 14h2v2h-2zM19 19h2v2h-2zM14 19h2v2h-2z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 7. Perfil (Silhueta sólida com cabeça circular e corpo arqueado)
export function IconePerfil({ size = 26, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="7.5" r="4.8" />
      <path d="M3.5 21.5c0-4.5 3.8-7 8.5-7s8.5 2.5 8.5 7z" />
    </svg>
  );
}

// 8. Sair (Porta com seta de saída)
export function IconeSair({ size = 24, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}