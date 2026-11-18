// =====================================================================
// src/pages/MeusAtrasosPage.jsx
// Tela "Meus Atrasos" do SENAI.
// - Só JavaScript (sem TypeScript) + Tailwind CSS
// - Ícones da biblioteca lucide-react  (instale com: npm install lucide-react)
// - Só useState e useEffect (os dois hooks mais simples do React)
// =====================================================================

import { useState, useEffect } from 'react';
// Link = componente do TanStack Router que troca de tela com um clique
import { Link } from '@tanstack/react-router';
import {
  Home,
  QrCode,
  Clock,
  ClipboardList,
  FileText,
  User,
  LogOut,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Copy,
  Monitor,
  BarChart2,
  AlertTriangle,
  Menu,
  X,
} from 'lucide-react';
import { obterMetricasAtrasos, listarHistoricoAtrasos } from '../services/atrasosService';

// ---------------------------------------------------------------------
// VALORES INICIAIS DA TELA (iguais ao print)
// Servem para a tela já aparecer completa. Quando a API real responder,
// estes valores são trocados pelos que vierem do servidor.
//
// A API deve devolver exatamente estes nomes de campos:
//   métricas  -> { nomeAluno, totalAtrasosMes, atrasosConsecutivos,
//                  limiteTurma, turma, statusAtual }
//   histórico -> [ { id, data, horarioPrevisto, horarioChegada, status } ]
// ---------------------------------------------------------------------
const METRICAS_INICIAIS = {
  nomeAluno: 'Joao Silva',
  totalAtrasosMes: 5,
  atrasosConsecutivos: 2,
  limiteTurma: 2,
  turma: 'DEV-desenvolvimento de Sistema',
  statusAtual: 'Em Alerta',
};

const HISTORICO_INICIAL = [
  { id: 1, data: '09/10', horarioPrevisto: '08:00', horarioChegada: '08:07', status: 'Atrasado' },
  { id: 2, data: '19/08', horarioPrevisto: '08:00', horarioChegada: '08:12', status: 'Atrasado' },
  { id: 3, data: '05/08', horarioPrevisto: '08:00', horarioChegada: '08:19', status: 'Atrasado' },
  { id: 4, data: '12/06', horarioPrevisto: '08:00', horarioChegada: '08:04', status: 'Atrasado' },
  { id: 5, data: '15/05', horarioPrevisto: '08:00', horarioChegada: '08:25', status: 'Atrasado' },
  { id: 6, data: '30/05', horarioPrevisto: '08:00', horarioChegada: '08:09', status: 'Atrasado' },
  { id: 7, data: '09/04', horarioPrevisto: '08:00', horarioChegada: '08:16', status: 'Atrasado' },
  { id: 8, data: '26/03', horarioPrevisto: '08:00', horarioChegada: '08:31', status: 'Atrasado' },
  { id: 9, data: '11/02', horarioPrevisto: '08:00', horarioChegada: '09:00', status: 'Atrasado' },
];

// ---------------------------------------------------------------------
// Lista do menu lateral. "ativo: true" deixa o item em destaque.
// "para" = endereço da tela. Itens SEM "para" ainda não têm rota criada;
// quando criar a rota de cada um, é só acrescentar o "para" (ex.: para: '/atestados').
// ---------------------------------------------------------------------
const ITENS_MENU = [
  { texto: 'Inicio', Icone: Home, para: '/' },
  { texto: 'Registrar atraso', Icone: QrCode },
  { texto: 'Meus Atrasos', Icone: Clock, ativo: true, para: '/meus-atrasos' },
  { texto: 'Ocorrencias', Icone: ClipboardList },
  { texto: 'Atestados', Icone: FileText, para: '/atestados' },
  { texto: 'Perfil', Icone: User },
];

// =====================================================================
// COMPONENTE: logo do SENAI (caixa vermelha com letras brancas)
// =====================================================================
function LogoSenai({ tamanho = 'px-2 py-0.5 text-lg' }) {
  return (
    <span className={`inline-block bg-[#E50914] font-black italic leading-none tracking-tight text-white ${tamanho}`}>
      SENAI
    </span>
  );
}

// =====================================================================
// COMPONENTE: menu lateral
// No desktop fica fixo. No celular vira uma "gaveta" (drawer) que abre
// pelo botão hambúrguer e fecha pelo X ou clicando no fundo escuro.
// =====================================================================
function Sidebar({ aberto, aoFechar, nomeAluno, aoSair }) {
  return (
    <>
      {/* Fundo escuro atrás da gaveta (só existe no celular, com o menu aberto) */}
      {aberto && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={aoFechar} />}

      <aside
        className={
          // fixed = preso na tela | md:static = no desktop faz parte do layout
          'fixed inset-y-0 left-0 z-40 flex w-56 shrink-0 flex-col bg-[#0B192C] ' +
          'transition-transform duration-200 md:static md:w-52 md:translate-x-0 ' +
          (aberto ? 'translate-x-0' : '-translate-x-full')
        }
      >
        {/* Topo: logo + botão X (o X só aparece no celular) */}
        <div className="flex items-center justify-between px-5 pb-4 pt-5">
          <LogoSenai />
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar menu"
            className="rounded p-1 text-white hover:bg-white/10 md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Bloco do usuário: avatar branco + nome + "Aluno" */}
        <div className="flex items-center gap-3 px-5 pb-6 pt-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0B192C]">
            <User size={24} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm text-white">{nomeAluno}</p>
            <p className="text-xs text-gray-400">Aluno</p>
          </div>
        </div>

        {/* Links do menu (o .map cria um link para cada item da lista ITENS_MENU) */}
        <nav className="flex flex-col">
          {ITENS_MENU.map(({ texto, Icone, ativo, para }) => {
            // Visual do item (igual para todos)
            const classe =
              'flex items-center gap-3 px-5 py-3 text-sm hover:bg-white/10 ' +
              (ativo ? 'bg-white/5 text-white' : 'text-gray-200');

            // Ícone + texto. O item ativo tem o ícone vermelho
            const conteudo = (
              <>
                <Icone size={24} color={ativo ? '#E50914' : 'currentColor'} />
                <span>{texto}</span>
              </>
            );

            // Se o item tem "para", vira um Link que troca de tela com um clique.
            // O onClick fecha o menu no celular depois de clicar.
            if (para) {
              return (
                <Link key={texto} to={para} onClick={aoFechar} className={classe}>
                  {conteudo}
                </Link>
              );
            }

            // Itens sem rota ainda ficam como link vazio
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
          onClick={aoSair}
          className="mt-auto flex items-center gap-3 px-5 py-5 text-sm text-gray-200 hover:bg-white/10"
        >
          <LogOut size={24} />
          <span>Sair</span>
        </button>
      </aside>
    </>
  );
}

// =====================================================================
// PÁGINA PRINCIPAL
// =====================================================================
export default function MeusAtrasosPage() {
  // ---- Estados (a "memória" da tela) ----
  const [menuAberto, setMenuAberto] = useState(false); // menu do celular aberto?
  const [metricas, setMetricas] = useState(METRICAS_INICIAIS); // dados dos 4 cards
  const [atrasos, setAtrasos] = useState(HISTORICO_INICIAL); // linhas da tabela
  const [limite, setLimite] = useState(10); // quantas linhas pedir à API

  // ---- Buscar dados na API ----
  // O useEffect roda quando a tela abre e de novo sempre que "limite" muda.
  useEffect(() => {
    async function carregarDados() {
      try {
        // O id do aluno deve ser salvo no navegador quando ele faz login
        const alunoId = localStorage.getItem('alunoId');

        // Sem id = ainda não há login/API. Mantemos os valores iniciais.
        if (!alunoId) return;

        // Chama as duas funções do arquivo atrasosService.js
        const dadosMetricas = await obterMetricasAtrasos(alunoId);
        const dadosHistorico = await listarHistoricoAtrasos(alunoId, limite);

        // Troca os valores iniciais pelos que vieram da API
        setMetricas(dadosMetricas);
        setAtrasos(dadosHistorico);
      } catch (erro) {
        // Se a API falhar, a tela continua mostrando os valores atuais.
        console.error(erro.message);
      }
    }

    carregarDados();
  }, [limite]);

  // ---- Sair: apaga o login guardado e vai para a tela de login ----
  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('alunoId');
    window.location.href = '/login';
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-gray-900">
      <Sidebar
        aberto={menuAberto}
        aoFechar={() => setMenuAberto(false)}
        nomeAluno={metricas.nomeAluno}
        aoSair={sair}
      />

      {/* min-w-0 evita que a tabela estique a página para os lados */}
      <div className="min-w-0 flex-1">
        {/* Barra do topo com o hambúrguer (só aparece no celular) */}
        <div className="flex items-center justify-between bg-[#0B192C] px-4 py-3 md:hidden">
          {/* Logo grande à esquerda */}
          <LogoSenai tamanho="px-2.5 py-1 text-2xl" />
          {/* Hambúrguer branco à direita */}
          <button
            type="button"
            onClick={() => setMenuAberto(true)}
            aria-label="Abrir menu"
            className="rounded p-1 text-white hover:bg-white/10"
          >
            <Menu size={34} strokeWidth={2} />
          </button>
        </div>

        <main className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-8">
          {/* ---------- Cabeçalho da página ---------- */}
          <header>
            <div className="flex items-center gap-3">
              <ArrowLeft size={24} strokeWidth={2} />
              <h1 className="text-lg font-semibold">Meus Atrasos</h1>
            </div>
            <p className="mt-1 text-base leading-snug text-slate-500">
              Acompanhe seus atrasos e consulte os registros realizados.
            </p>
          </header>

          {/* ---------- Container branco com os 4 cards ---------- */}
          <section className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
            {/* 1 coluna no celular, 2 no tablet, 4 no desktop */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card 1: Total de atrasos (rosa) */}
              <div className="rounded-md border border-red-300 bg-[#FEE2E2] p-4">
                <p className="text-center text-sm font-semibold text-red-700">Total de atrasos</p>
                <div className="mt-4 flex items-center gap-3">
                  <Calendar size={32} />
                  <div>
                    <p className="text-3xl font-bold leading-none">{metricas.totalAtrasosMes}</p>
                    <p className="mt-1 text-sm font-semibold text-red-600">Neste mês</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Atrasos consecutivos (amarelo) */}
              <div className="rounded-md border border-amber-300 bg-[#FEF3C7] p-4">
                <p className="text-center text-sm font-semibold text-amber-800">Atrasos consecutivo</p>
                <div className="mt-4 flex items-center gap-3">
                  <Copy size={32} />
                  <div>
                    <p className="text-3xl font-bold leading-none">{metricas.atrasosConsecutivos}</p>
                    <p className="mt-1 text-sm font-semibold">(Limite da turma {metricas.limiteTurma})</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Turma (roxo) */}
              <div className="rounded-md border border-purple-300 bg-[#F3E8FF] p-4">
                <p className="text-center text-sm font-semibold text-purple-700">Turma</p>
                <div className="mt-4 flex items-center gap-3">
                  <Monitor size={32} className="shrink-0" />
                  <p className="break-words text-sm font-bold">{metricas.turma}</p>
                </div>
              </div>

              {/* Card 4: Status atual (azul) */}
              <div className="rounded-md border border-sky-300 bg-[#E0F2FE] p-4">
                <p className="text-center text-sm font-semibold text-sky-700">Turma</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart2 size={20} />
                    <p className="text-sm font-semibold">Status Atual</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={20} />
                    <p className="text-sm font-bold text-[#E50914]">{metricas.statusAtual}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- Cartão branco do histórico ---------- */}
          <section className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <h2 className="px-5 pb-5 pt-5 text-2xl font-bold">Histórico de atrasos</h2>

            {/* overflow-x-auto: no celular a tabela rola para o lado em vez de quebrar */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-center">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="px-3 py-3 font-semibold">Data</th>
                    <th className="px-3 py-3 font-semibold">Horário Previsto</th>
                    <th className="px-3 py-3 font-semibold">Horário Chegada</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="text-sm font-semibold">
                  {/* Uma linha <tr> para cada atraso da lista */}
                  {atrasos.map((atraso) => (
                    <tr key={atraso.id} className="border-b border-gray-200">
                      <td className="px-3 py-2">{atraso.data}</td>
                      <td className="px-3 py-2">{atraso.horarioPrevisto}</td>
                      <td className="px-3 py-2">{atraso.horarioChegada}</td>
                      <td className="px-3 py-2">
                        {/* Badge arredondada em vermelho fraco */}
                        <span className="inline-block rounded-full bg-red-100 px-3 py-0.5 text-xs font-medium text-[#E50914]">
                          {atraso.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Rodapé: "Ver todo histórico" pede mais registros à API */}
            <div className="px-5 py-3">
              <button
                type="button"
                onClick={() => setLimite(100)}
                className="flex items-center gap-2 text-sm font-medium text-[#E50914] hover:underline"
              >
                Ver todo histórico
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
