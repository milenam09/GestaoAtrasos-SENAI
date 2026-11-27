// =====================================================================
// src/components/LogoSenai.jsx
// Logo oficial do SENAI.
// A imagem fica na pasta "public" com o nome logo-senai.png
// (tudo que está em "public" pode ser usado a partir da barra "/").
//
// "largura" = largura do logo em pixels (a altura se ajusta sozinha).
// O menu lateral usa 160; a barra do topo do celular usa o padrão (120).
// =====================================================================

export default function LogoSenai({ largura = 120 }) {
  return (
    <img
      src="/logo-senai.png"
      alt="SENAI"
      width={largura}
      style={{ width: largura, height: 'auto' }}
      className="shrink-0"
    />
  );
}
