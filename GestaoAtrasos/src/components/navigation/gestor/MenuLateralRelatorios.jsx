// =====================================================================
// src/components/MenuLateral.jsx
// Menu lateral ÚNICO, usado em TODAS as telas.
// Se quiser mudar o menu, mude só este arquivo.
//
// - No computador: fica fixo à esquerda.
// - No celular: vira uma "gaveta" que abre pelo botão hambúrguer da tela.
//   Por isso cada tela guarda o estado "menuAberto" e passa para cá:
//   <MenuLateral aberto={menuAberto} aoFechar={() => setMenuAberto(false)} />
//
// Os ícones vêm da biblioteca react-icons (conjunto Material Design,
// versão preenchida). Instale com:  npm install react-icons
// =====================================================================

import { useState, useEffect } from 'react';
// Link = componente do TanStack Router que troca de tela com um clique
import { Link } from 'react-router-dom';
import {
  MdHome,
  MdDescription,
  MdCoPresent,
  MdGroup,
  MdAssignment,
  MdQrCode2,
  MdPerson,
  MdLogout,
  MdClose,
} from 'react-icons/md';
import LogoSenai from '../../layout/LogoSenai.jsx';

export default function MenuLateral({ aberto, aoFechar }) {
  // Nome e perfil começam com os valores do layout e, se a pessoa já fez
  // login, trocam pelos dados salvos no navegador (localStorage).
  const [nome, setNome] = useState('Cris Costa');
  const [perfil, setPerfil] = useState('Gestor');

  // useEffect só roda no navegador, por isso é seguro ler o localStorage aqui
  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeUsuario');
    const perfilSalvo = localStorage.getItem('perfil');
    if (nomeSalvo) setNome(nomeSalvo);
    if (perfilSalvo) setPerfil(perfilSalvo);
  }, []);

  // Professor tem a tela de relatórios dele; os demais usam a do gestor
  const rotaRelatorios = perfil === 'Professor' ? '/relatorios' : '/relatorios-gestor';

  // Itens do menu. "para" = endereço da tela.
  // Itens SEM "para" ainda não têm tela: quando criar a rota, acrescente o "para".
  const itens = [
    { texto: 'Início', Icone: MdHome, para: '/' },
    { texto: 'Acolhimentos', Icone: MdDescription },
    { texto: 'Turmas', Icone: MdCoPresent },
    { texto: 'Alunos', Icone: MdGroup },
    { texto: 'Relatórios', Icone: MdAssignment, para: rotaRelatorios },
    { texto: 'Gerar QR Code', Icone: MdQrCode2 },
    { texto: 'Perfil', Icone: MdPerson },
  ];

  // Sair: apaga o login guardado e vai para a tela de login
  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('alunoId');
    localStorage.removeItem('perfil');
    localStorage.removeItem('nomeUsuario');
    window.location.href = '/';
  }

  return (
    <>
      {/* Fundo escuro atrás da gaveta (só no celular, com o menu aberto) */}
      {aberto && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={aoFechar} />}

      <aside
        className={
          // fixed = preso na tela | md:static = no computador faz parte do layout
          'fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col bg-[#0B192C] ' +
          'transition-transform duration-200 md:static md:translate-x-0 md:rounded-l-xl ' +
          (aberto ? 'translate-x-0' : '-translate-x-full')
        }
      >
        {/* Topo: logo + botão X (o X só aparece no celular) */}
        <div className="flex items-start justify-between px-6 pb-6 pt-6">
          <LogoSenai largura={160} />
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar menu"
            className="rounded p-1 text-white hover:bg-white/10 md:hidden"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Usuário: avatar claro + nome em negrito + perfil */}
        <div className="flex items-center gap-4 px-6 pb-8">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#0B192C]">
            <MdPerson size={34} />
          </div>
          <div className="min-w-0 text-white">
            <p className="truncate text-base font-bold leading-tight">{nome}</p>
            <p className="text-sm leading-tight">{perfil}</p>
          </div>
        </div>

        {/* Links do menu */}
        <nav className="flex flex-col">
          {itens.map(({ texto, Icone, para }) => {
            const classe =
              'flex items-center gap-4 px-6 py-3.5 text-base text-white hover:bg-white/10';

            // Ícone branco preenchido (a cor vem do texto) + nome do item
            const conteudo = (
              <>
                <Icone size={24} />
                <span>{texto}</span>
              </>
            );

            // Se o item tem rota, vira um Link (troca de tela com um clique)
            if (para) {
              return (
                <Link key={texto} to={para} onClick={aoFechar} className={classe}>
                  {conteudo}
                </Link>
              );
            }

            // Sem rota ainda: link vazio
            return (
              <a key={texto} href="#" className={classe}>
                {conteudo}
              </a>
            );
          })}
        </nav>

        {/* Rodapé: botão Sair (mt-auto empurra para o final da barra) */}
        <button
          type="button"
          onClick={sair}
          className="mt-auto flex items-center gap-4 px-6 py-6 text-base text-white hover:bg-white/10"
        >
          <MdLogout size={24} />
          <span>Sair</span>
        </button>
      </aside>
    </>
  );
}
