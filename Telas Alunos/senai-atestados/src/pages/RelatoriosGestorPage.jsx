// =====================================================================
// src/pages/RelatoriosGestorPage.jsx
// Tela "Relatórios (Visão do Gestor)" do SENAI.
// - Só JavaScript (sem TypeScript) + Tailwind CSS
// - Ícones da biblioteca lucide-react (já instalada)
// - Gráficos feitos com SVG e divs: NÃO precisa instalar nada novo
// - Só useState e useEffect (os dois hooks mais simples do React)
// =====================================================================

import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Home,
  FileText,
  Monitor,
  Users,
  ClipboardList,
  User,
  LogOut,
  ArrowLeftToLine,
  Calendar,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import {
  fetchDashboardData,
  gerarRelatorio,
  filtrarPorPeriodo,
  adicionarOcorrencia,
  excluirOcorrencia,
} from '../services/dashboardService';

// Cores usadas na tela
const COR_BARRA = '#FF1A1A'; // vermelho sólido e uniforme das barras
const CORES_MOTIVOS = ['#0C2340', '#7C3AED', '#1D4ED8', '#F97316', '#EC4899'];

// ---------------------------------------------------------------------
// VALORES INICIAIS DA TELA (iguais ao print)
// Servem para a tela já aparecer completa. Quando a API real responder,
// estes valores são trocados pelos que vierem do servidor.
//
// A API deve devolver exatamente estes nomes de campos:
// {
//   nomeUsuario, cargo, total,
//   cards: { totalOcorrencias: {valor, variacao}, atrasosRecorrentes: {...},
//            casosConcluidos: {...}, tempoMedioDias: {...} },
//   ocorrenciasPorTurma: [ { turma, total } ],
//   motivos: [ { nome, percentual } ],
//   alunos: [ { id, posicao, nome, turma, total } ]
// }
// ---------------------------------------------------------------------
const DADOS_INICIAIS = {
  nomeUsuario: 'Cris Costa',
  cargo: 'Gestor',
  total: 68,
  cards: {
    totalOcorrencias: { valor: 68, variacao: 12 },
    atrasosRecorrentes: { valor: 22, variacao: 8 },
    casosConcluidos: { valor: 45, variacao: 15 },
    tempoMedioDias: { valor: 2.4, variacao: 15 },
  },
  ocorrenciasPorTurma: [
    { turma: 'T14', total: 12 },
    { turma: 'T28', total: 8 },
    { turma: 'T34', total: 14 },
    { turma: 'T36', total: 11 },
  ],
  motivos: [
    { nome: 'Atraso no semestre', percentual: 45 },
    { nome: 'Justificativa', percentual: 20 },
    { nome: 'Questão pessoal', percentual: 15 },
    { nome: 'Atestado médico', percentual: 10 },
    { nome: 'Outros', percentual: 10 },
  ],
  alunos: [
    { id: 1, posicao: 1, nome: 'João Silva', turma: 'T1A', total: 6 },
    { id: 2, posicao: 2, nome: 'Lucas Ferreira', turma: 'T1A', total: 6 },
    { id: 3, posicao: 3, nome: 'Beatriz Souza', turma: 'T1A', total: 5 },
  ],
};

// Período inicial (formato AAAA-MM-DD, o mesmo do campo de data do navegador)
const PERIODO_INICIAL = { inicio: '2025-03-01', fim: '2025-03-10' };

// Itens do menu lateral. "para" = endereço da tela (só quem já tem rota).
// "ativo: true" deixa o item em destaque (ícone vermelho + texto em negrito).
const ITENS_MENU = [
  { texto: 'Início', Icone: Home, para: '/', ativo: true },
  { texto: 'Acolhimentos', Icone: FileText },
  { texto: 'Turmas', Icone: Monitor },
  { texto: 'Alunos', Icone: Users },
  { texto: 'Relatórios', Icone: ClipboardList, para: '/relatorios-gestor' },
  { texto: 'Perfil', Icone: User },
];

// ---------------------------------------------------------------------
// Funções auxiliares pequenas
// ---------------------------------------------------------------------

// Transforma '2025-03-01' em '01/03/2025'
function formatarData(dataIso) {
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Transforma 2.4 em '2,4' (jeito brasileiro)
function formatarNumero(numero) {
  return Number(numero).toLocaleString('pt-BR');
}

// =====================================================================
// COMPONENTE: logo do SENAI (caixa vermelha com letras brancas)
// =====================================================================
function LogoSenai({ tamanho = 'px-2 py-0.5 text-lg' }) {
  return (
    <span
      className={`inline-block bg-[#E30613] font-black italic leading-none tracking-tight text-white ${tamanho}`}
    >
      SENAI
    </span>
  );
}

// =====================================================================
// COMPONENTE: menu lateral
// No desktop fica fixo. No celular vira uma gaveta (drawer) aberta
// pelo botão hambúrguer.
// =====================================================================
function Sidebar({ aberto, aoFechar, nome, cargo, aoSair }) {
  return (
    <>
      {/* Fundo escuro atrás da gaveta (só no celular, com o menu aberto) */}
      {aberto && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={aoFechar} />}

      <aside
        className={
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

        {/* Usuário: avatar + nome + cargo */}
        <div className="flex items-center gap-3 px-5 pb-6 pt-2">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0B192C]">
            <User size={26} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{nome}</p>
            <p className="text-xs text-gray-400">{cargo}</p>
          </div>
        </div>

        {/* Links do menu */}
        <nav className="flex flex-col">
          {ITENS_MENU.map(({ texto, Icone, para, ativo }) => {
            const classe = 'flex items-center gap-3 px-5 py-3 text-sm text-white hover:bg-white/10';

            // Ícone + texto. No item ativo o ícone fica vermelho e o texto em negrito
            const conteudo = (
              <>
                <span className="p-1">
                  <Icone size={24} color={ativo ? '#E30613' : 'currentColor'} />
                </span>
                <span className={ativo ? 'font-bold' : ''}>{texto}</span>
              </>
            );

            // Se o item tem rota, vira um Link que troca de tela com um clique
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

        {/* Rodapé: botão Sair */}
        <button
          type="button"
          onClick={aoSair}
          className="mt-auto flex items-center gap-3 px-5 py-5 text-sm text-white hover:bg-white/10"
        >
          <span className="p-1">
            <LogOut size={24} />
          </span>
          <span>Sair</span>
        </button>
      </aside>
    </>
  );
}

// =====================================================================
// COMPONENTE: card de indicador (número grande + variação)
// "unidade" = texto depois do número (ex.: "dias")
// "laranja" = variação em laranja em vez de verde
// =====================================================================
function CardIndicador({ titulo, valor, variacao, unidade, laranja }) {
  const subiu = variacao >= 0; // seta para cima ou para baixo

  // Cor da variação: laranja (se pedido), verde (subiu) ou vermelho (caiu)
  let corVariacao = subiu ? 'text-green-700' : 'text-red-600';
  if (laranja) corVariacao = 'text-orange-500';

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-3 shadow-sm">
      <p className="text-xs font-semibold">{titulo}</p>

      <div className="mt-2 flex flex-wrap items-start gap-1">
        <span className="text-4xl font-black leading-none">
          {formatarNumero(valor)}
          {unidade ? ` ${unidade}` : ''}
        </span>
        <span className={`text-[10px] font-bold ${corVariacao}`}>
          {subiu ? '↑' : '↓'} {Math.abs(variacao)}%
        </span>
      </div>

      <p className="mt-3 text-[10px] font-semibold text-gray-600">vs período anterior</p>
    </div>
  );
}

// =====================================================================
// COMPONENTE: gráfico de barras ("Ocorrências por turma")
// Cada barra é uma div. A altura é proporcional ao valor.
// =====================================================================
function GraficoBarras({ turmas }) {
  // A maior barra ocupa a altura máxima; as outras ficam proporcionais
  const maior = Math.max(...turmas.map((t) => t.total), 1);

  return (
    <>
      <div className="mt-4 flex h-56 items-end justify-around gap-2 border-b border-gray-400 px-2">
        {turmas.map((item) => (
          <div key={item.turma} className="flex h-full w-14 flex-col items-center justify-end">
            {/* Valor em cima da barra */}
            <span className="mb-1 text-base font-bold text-gray-700">{item.total}</span>
            {/* A barra: altura em % do espaço disponível */}
            <div
              className="w-full rounded-md"
              style={{ height: `${(item.total / maior) * 78}%`, backgroundColor: COR_BARRA }}
            />
          </div>
        ))}
      </div>

      {/* Siglas das turmas no eixo X */}
      <div className="flex justify-around gap-2 px-2 pt-2">
        {turmas.map((item) => (
          <span key={item.turma} className="w-14 text-center text-xs font-bold text-gray-600">
            {item.turma}
          </span>
        ))}
      </div>
    </>
  );
}

// =====================================================================
// COMPONENTE: gráfico de rosca ("Motivos das ocorrências")
// Cada fatia é um círculo SVG com "traço" (stroke) parcial.
// =====================================================================
const RAIO = 40;
const CIRCUNFERENCIA = 2 * Math.PI * RAIO; // tamanho da volta completa

function GraficoRosca({ motivos, total }) {
  // Calcula onde cada fatia começa e o tamanho dela
  const fatias = [];
  let acumulado = 0;
  for (const motivo of motivos) {
    const tamanho = (motivo.percentual / 100) * CIRCUNFERENCIA;
    fatias.push({ ...motivo, tamanho, inicio: acumulado });
    acumulado = acumulado + tamanho;
  }

  return (
    <div className="relative h-40 w-40 shrink-0">
      {/* -rotate-90 faz a primeira fatia começar no topo do círculo */}
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label="Motivos das ocorrências">
        {fatias.map((fatia, indice) => (
          <circle
            key={fatia.nome}
            cx="60"
            cy="60"
            r={RAIO}
            fill="none"
            stroke={CORES_MOTIVOS[indice % CORES_MOTIVOS.length]}
            strokeWidth="30"
            strokeDasharray={`${fatia.tamanho} ${CIRCUNFERENCIA - fatia.tamanho}`}
            strokeDashoffset={-fatia.inicio}
          />
        ))}
      </svg>

      {/* Círculo branco no centro com o total */}
      <div className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white shadow">
        <span className="text-3xl font-black leading-none">{total}</span>
        <span className="text-[10px] font-bold leading-tight">total</span>
      </div>
    </div>
  );
}

// =====================================================================
// COMPONENTE: aviso (toast) que aparece no canto da tela
// =====================================================================
function Aviso({ aviso, aoFechar }) {
  if (!aviso) return null;

  const cor = aviso.tipo === 'erro' ? 'bg-red-600' : 'bg-green-600';

  return (
    <div
      role="status"
      className={`fixed bottom-4 right-4 z-50 flex max-w-xs items-start gap-3 rounded-md px-4 py-3 text-sm text-white shadow-lg ${cor}`}
    >
      <span className="flex-1">{aviso.texto}</span>
      <button type="button" onClick={aoFechar} aria-label="Fechar aviso">
        <X size={16} />
      </button>
    </div>
  );
}

// =====================================================================
// PÁGINA PRINCIPAL
// =====================================================================
export default function RelatoriosGestorPage() {
  // ---- Estados (a "memória" da tela) ----
  const [menuAberto, setMenuAberto] = useState(false); // menu do celular
  const [dados, setDados] = useState(DADOS_INICIAIS); // cards, gráficos, tabela
  const [periodo, setPeriodo] = useState(PERIODO_INICIAL); // datas aplicadas
  const [rascunho, setRascunho] = useState(PERIODO_INICIAL); // datas sendo escolhidas
  const [seletorAberto, setSeletorAberto] = useState(false); // janelinha das datas
  const [recarga, setRecarga] = useState(0); // soma 1 para buscar os dados de novo
  const [carregando, setCarregando] = useState(false); // buscando dados (GET)
  const [gerando, setGerando] = useState(false); // gerando relatório (POST)
  const [aviso, setAviso] = useState(null); // mensagem de sucesso/erro

  // ---- Mostra um aviso por 4 segundos ----
  function mostrarAviso(tipo, texto) {
    setAviso({ tipo, texto });
    setTimeout(() => setAviso(null), 4000);
  }

  // ---- 1) GET: buscar os dados quando a tela abre, quando o período muda
  //          e quando "recarga" aumenta ----
  useEffect(() => {
    async function carregarDados() {
      try {
        // Sem token = ainda não há login/API. Mantemos os valores iniciais.
        if (!localStorage.getItem('token')) return;

        setCarregando(true);
        const resposta = await fetchDashboardData(periodo);
        setDados(resposta);
      } catch (erro) {
        mostrarAviso('erro', erro.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [periodo, recarga]);

  // ---- 2) POST: botão "Gerar relatório" ----
  async function handleGerarRelatorio(dataInicio, dataFim) {
    try {
      setGerando(true);
      await gerarRelatorio(dataInicio, dataFim);
      mostrarAviso('sucesso', 'Relatório gerado com sucesso.');
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    } finally {
      setGerando(false);
    }
  }

  // ---- 3) PUT: filtrar por período (botão "Aplicar" das datas) ----
  async function handleFilterByDate(novoPeriodo) {
    // Data inicial não pode ser depois da final
    if (novoPeriodo.inicio > novoPeriodo.fim) {
      mostrarAviso('erro', 'A data inicial não pode ser maior que a data final.');
      return;
    }

    setPeriodo(novoPeriodo); // isso também faz o useEffect buscar os dados novos
    setSeletorAberto(false);

    // Sem token = ainda não há API. Só atualiza na tela.
    if (!localStorage.getItem('token')) return;

    try {
      await filtrarPorPeriodo(novoPeriodo);
      mostrarAviso('sucesso', 'Período atualizado.');
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    }
  }

  // ---- 4) POST: adicionar uma ocorrência ----
  // Esta tela ainda não tem um formulário para isso. Quando tiver, chame:
  // handleAddOcorrencia({ alunoId: 1, motivo: 'Atraso', data: '2025-03-05' })
  async function handleAddOcorrencia(dadosOcorrencia) {
    try {
      await adicionarOcorrencia(dadosOcorrencia);
      mostrarAviso('sucesso', 'Ocorrência adicionada.');
      setRecarga(recarga + 1); // busca os números atualizados
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    }
  }

  // ---- 5) DELETE: remover uma ocorrência ----
  // Quando houver um botão de excluir, chame: handleDeleteOcorrencia(id)
  async function handleDeleteOcorrencia(id) {
    try {
      await excluirOcorrencia(id);
      mostrarAviso('sucesso', 'Ocorrência removida.');
      setRecarga(recarga + 1); // busca os números atualizados
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    }
  }

  // ---- Sair: apaga o login guardado e vai para a tela de login ----
  function sair() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  const { cards } = dados;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-gray-900">
      <Sidebar
        aberto={menuAberto}
        aoFechar={() => setMenuAberto(false)}
        nome={dados.nomeUsuario}
        cargo={dados.cargo}
        aoSair={sair}
      />

      {/* min-w-0 evita que o conteúdo estique a página para os lados */}
      <div className="min-w-0 flex-1">
        {/* Barra do topo no celular: logo à esquerda e hambúrguer à direita */}
        <div className="flex items-center justify-between bg-[#0B192C] px-4 py-3 md:hidden">
          <LogoSenai tamanho="px-2.5 py-1 text-2xl" />
          <button
            type="button"
            onClick={() => setMenuAberto(true)}
            aria-label="Abrir menu"
            className="rounded p-1 text-white hover:bg-white/10"
          >
            <Menu size={34} strokeWidth={2} />
          </button>
        </div>

        <main className={`mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-8 ${carregando ? 'opacity-60' : ''}`}>
          {/* ---------- Cabeçalho: título à esquerda, período e botão à direita ---------- */}
          <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ArrowLeftToLine size={28} strokeWidth={2.5} />
                <h1 className="text-2xl font-bold">Relatórios</h1>
              </div>
              <p className="mt-1 text-sm font-semibold md:ml-3">
                Acesse os relatórios e gere indicadores da sua área.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Seletor de período */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setRascunho(periodo);
                    setSeletorAberto(!seletorAberto);
                  }}
                  className="flex items-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs"
                >
                  <span>
                    {formatarData(periodo.inicio)} - {formatarData(periodo.fim)}
                  </span>
                  <Calendar size={16} />
                </button>

                {/* Janelinha com os dois campos de data */}
                {seletorAberto && (
                  <div className="absolute left-0 z-20 mt-2 w-64 rounded-md border border-gray-300 bg-white p-4 shadow-lg md:left-auto md:right-0">
                    <label className="block text-xs font-semibold">
                      Data inicial
                      <input
                        type="date"
                        value={rascunho.inicio}
                        onChange={(e) => setRascunho({ ...rascunho, inicio: e.target.value })}
                        className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-sm font-normal"
                      />
                    </label>
                    <label className="mt-3 block text-xs font-semibold">
                      Data final
                      <input
                        type="date"
                        value={rascunho.fim}
                        onChange={(e) => setRascunho({ ...rascunho, fim: e.target.value })}
                        className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-sm font-normal"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleFilterByDate(rascunho)}
                      className="mt-4 w-full rounded-md bg-[#E30613] py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>

              {/* Botão Gerar relatório (sem ícone) */}
              <button
                type="button"
                onClick={() => handleGerarRelatorio(periodo.inicio, periodo.fim)}
                disabled={gerando}
                className="rounded-md bg-[#E30613] px-5 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {gerando ? 'Gerando...' : 'Gerar relatório'}
              </button>
            </div>
          </header>

          {/* ---------- Os 4 cards de indicadores ---------- */}
          {/* 2 colunas no celular, 4 no desktop */}
          <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <CardIndicador
              titulo="Total de Ocorrências"
              valor={cards.totalOcorrencias.valor}
              variacao={cards.totalOcorrencias.variacao}
            />
            <CardIndicador
              titulo="Atrasos recorrentes"
              valor={cards.atrasosRecorrentes.valor}
              variacao={cards.atrasosRecorrentes.variacao}
            />
            <CardIndicador
              titulo="Casos concluídos"
              valor={cards.casosConcluidos.valor}
              variacao={cards.casosConcluidos.variacao}
            />
            <CardIndicador
              titulo="Casos concluídos"
              valor={cards.tempoMedioDias.valor}
              variacao={cards.tempoMedioDias.variacao}
              unidade="dias"
              laranja
            />
          </section>

          {/* ---------- Gráficos ---------- */}
          <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Gráfico de barras */}
            <div className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
              <h2 className="text-base font-bold">Ocorrências por turma</h2>
              <GraficoBarras turmas={dados.ocorrenciasPorTurma} />
            </div>

            {/* Gráfico de rosca + legenda */}
            <div className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
              <h2 className="text-base font-bold">Motivos das ocorrências</h2>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                <GraficoRosca motivos={dados.motivos} total={dados.total} />

                <ul className="min-w-[180px] flex-1 space-y-3">
                  {dados.motivos.map((motivo, indice) => (
                    <li key={motivo.nome} className="flex items-center gap-3 text-[11px] font-semibold">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: CORES_MOTIVOS[indice % CORES_MOTIVOS.length] }}
                      />
                      <span className="flex-1">{motivo.nome}</span>
                      <span>{motivo.percentual}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ---------- Tabela "Alunos com mais Ocorrências" ---------- */}
          <section className="mt-6">
            <div className="mb-1 flex items-center justify-between px-1">
              <h2 className="text-xs text-gray-600">Alunos com mais Ocorrências</h2>
              <a href="#" className="flex items-center gap-0.5 text-xs font-medium text-sky-500 hover:underline">
                Ver todos
                <ChevronRight size={14} />
              </a>
            </div>

            {/* overflow-x-auto: no celular a tabela rola para o lado em vez de quebrar */}
            <div className="overflow-x-auto rounded-sm border border-gray-300 bg-white">
              <table className="w-full min-w-[460px] border-collapse text-center">
                <thead>
                  <tr className="bg-sky-100 text-xs font-bold">
                    <th className="px-3 py-2">posição</th>
                    <th className="px-3 py-2">Aluno</th>
                    <th className="px-3 py-2">Turma</th>
                    <th className="px-3 py-2">Total de Ocorrências</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-bold">
                  {/* Uma linha <tr> para cada aluno da lista */}
                  {dados.alunos.map((aluno) => (
                    <tr key={aluno.id} className="border-b border-gray-200">
                      <td className="px-3 py-2">{aluno.posicao}</td>
                      <td className="px-3 py-2">{aluno.nome}</td>
                      <td className="px-3 py-2">{aluno.turma}</td>
                      <td className="px-3 py-2">{aluno.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Aviso de sucesso ou erro */}
      <Aviso aviso={aviso} aoFechar={() => setAviso(null)} />
    </div>
  );
}
