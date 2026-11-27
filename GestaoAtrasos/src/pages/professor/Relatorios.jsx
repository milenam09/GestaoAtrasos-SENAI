// =====================================================================
// src/pages/RelatoriosPage.jsx
// Tela "Relatórios" do SENAI (visão do professor).
// - Só JavaScript (sem TypeScript) + Tailwind CSS
// - Ícones da biblioteca lucide-react (já instalada)
// - Gráficos feitos com SVG e divs: NÃO precisa instalar nada novo
// - Só useState e useEffect (os dois hooks mais simples do React)
// =====================================================================

import { useState, useEffect } from 'react';
import {
  ArrowLeftToLine,
  Calendar,
  ClipboardPlus,
  Headset,
  Menu,
  X,
} from 'lucide-react';
import LogoSenai from "../../components/layout/LogoSenai.jsx";
import MenuLateral from "../../components/navigation/gestor/MenuLateralRelatorios.jsx";
import {
  obterRelatorios,
  gerarRelatorio,
  atualizarPeriodoRelatorio,
  excluirRelatorio,
  contatarSecretaria,
} from '../../services/relatoriosService.js';

// Vermelho oficial usado nos botões, no logo e nos destaques
const VERMELHO = '#E30613';

// Cores dos gráficos (na ordem em que os dados chegam)
const CORES_BARRAS = ['#B76E6E', '#9B0A0A', '#FF0000', '#FF5F5F'];
const CORES_MOTIVOS = ['#F9475A', '#FF9933', '#7BA7FF', '#7ED67E', '#A67C2E'];

// ---------------------------------------------------------------------
// VALORES INICIAIS DA TELA (iguais ao print)
// Servem para a tela já aparecer completa. Quando a API real responder,
// estes valores são trocados pelos que vierem do servidor.
//
// A API deve devolver exatamente estes nomes de campos:
// {
//   nomeUsuario, cargo, status, total,
//   cards: { tempoAtendimento: {valor, variacao}, atrasosRecorrentes: {...},
//            casosConcluidos: {...}, tempoMedio: {...} },
//   ocorrenciasPorTurma: [ { turma, total } ],
//   motivos: [ { nome, percentual } ]
// }
// ---------------------------------------------------------------------
const DADOS_INICIAIS = {
  nomeUsuario: 'Mariana',
  cargo: 'Professor',
  status: 'Em Análise',
  total: 68,
  cards: {
    tempoAtendimento: { valor: 68, variacao: 12 },
    atrasosRecorrentes: { valor: 22, variacao: 8 },
    casosConcluidos: { valor: 45, variacao: 15 },
    tempoMedio: { valor: 2.5, variacao: 20 },
  },
  ocorrenciasPorTurma: [
    { turma: 'T1A', total: 12 },
    { turma: 'T2B', total: 8 },
    { turma: 'T3C', total: 14 },
    { turma: 'T4D', total: 11 },
  ],
  motivos: [
    { nome: 'Atraso recorrente', percentual: 45 },
    { nome: 'Justificativa', percentual: 20 },
    { nome: 'Questão pessoal', percentual: 15 },
    { nome: 'Atestado médico', percentual: 10 },
    { nome: 'Outros', percentual: 10 },
  ],
};

// Período inicial (formato AAAA-MM-DD, o mesmo do campo de data do navegador)
const PERIODO_INICIAL = { inicio: '2026-03-01', fim: '2026-03-10' };

// ---------------------------------------------------------------------
// Funções auxiliares pequenas
// ---------------------------------------------------------------------

// Transforma '2026-03-01' em '01/03/2026'
function formatarData(dataIso) {
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Transforma 2.5 em '2,5' (jeito brasileiro)
function formatarNumero(numero) {
  return Number(numero).toLocaleString('pt-BR');
}

// =====================================================================
// COMPONENTE: card de indicador (número grande + variação)
// =====================================================================
function CardIndicador({ titulo, valor, variacao }) {
  const subiu = variacao >= 0; // seta para cima (verde) ou para baixo (vermelho)

  return (
    <div className="flex min-h-[112px] flex-col items-center justify-between rounded-sm border border-gray-300 bg-white px-2 py-3 text-center">
      <p className="text-[11px] font-bold leading-tight">{titulo}</p>

      <div className="flex items-end gap-1">
        <span className="text-5xl font-black leading-none">{formatarNumero(valor)}</span>
        <span className={`mb-1 text-[10px] font-bold ${subiu ? 'text-green-700' : 'text-red-600'}`}>
          {subiu ? '↑' : '↓'} {Math.abs(variacao)}%
        </span>
      </div>

      <p className="text-[10px] font-bold">vs. período anterior</p>
    </div>
  );
}

// =====================================================================
// COMPONENTE: gráfico de barras ("Ocorrências por turmas")
// Cada barra é uma div. A altura é proporcional ao valor.
// =====================================================================
function GraficoBarras({ turmas }) {
  // A maior barra ocupa a altura máxima; as outras ficam proporcionais
  const maior = Math.max(...turmas.map((t) => t.total), 1);

  return (
    <div className="mt-4 flex h-56 items-end justify-around gap-2 border-b border-gray-500 px-2">
      {turmas.map((item, indice) => (
        <div key={item.turma} className="flex h-full w-14 flex-col items-center justify-end">
          {/* Valor em cima da barra */}
          <span className="mb-1 text-base font-bold text-gray-500">{item.total}</span>
          {/* A barra: altura em % do espaço disponível */}
          <div
            className="w-full rounded-md"
            style={{
              height: `${(item.total / maior) * 78}%`,
              backgroundColor: CORES_BARRAS[indice % CORES_BARRAS.length],
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Nomes das turmas embaixo do gráfico (separado para alinhar com as barras)
function LegendaTurmas({ turmas }) {
  return (
    <div className="flex justify-around gap-2 px-2 pt-2">
      {turmas.map((item) => (
        <span key={item.turma} className="w-14 text-center text-xs font-bold text-gray-500">
          {item.turma}
        </span>
      ))}
    </div>
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
export default function RelatoriosPage() {
  // ---- Estados (a "memória" da tela) ----
  const [menuAberto, setMenuAberto] = useState(false); // menu do celular
  const [dados, setDados] = useState(DADOS_INICIAIS); // cards, gráficos, usuário
  const [periodo, setPeriodo] = useState(PERIODO_INICIAL); // datas aplicadas
  const [rascunho, setRascunho] = useState(PERIODO_INICIAL); // datas sendo escolhidas
  const [seletorAberto, setSeletorAberto] = useState(false); // janelinha das datas
  const [carregando, setCarregando] = useState(false); // buscando dados (GET)
  const [gerando, setGerando] = useState(false); // gerando relatório (POST)
  const [enviandoContato, setEnviandoContato] = useState(false); // contato (POST)
  const [aviso, setAviso] = useState(null); // mensagem de sucesso/erro

  // ---- Mostra um aviso por 4 segundos ----
  function mostrarAviso(tipo, texto) {
    setAviso({ tipo, texto });
    setTimeout(() => setAviso(null), 4000);
  }

  // ---- 1) GET: buscar os dados quando a tela abre e quando o período muda ----
  useEffect(() => {
    async function carregarDados() {
      try {
        // Sem token = ainda não há login/API. Mantemos os valores iniciais.
        if (!localStorage.getItem('token')) return;

        setCarregando(true);
        const resposta = await obterRelatorios(periodo);
        setDados(resposta);
      } catch (erro) {
        mostrarAviso('erro', erro.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [periodo]);

  // ---- 2) POST: botão "Gerar relatório" ----
  async function handleGerarRelatorio() {
    try {
      setGerando(true);
      await gerarRelatorio(periodo);
      mostrarAviso('sucesso', 'Relatório gerado com sucesso.');
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    } finally {
      setGerando(false);
    }
  }

  // ---- 3) PUT: aplicar as datas escolhidas ----
  async function handleUpdatePeriodo() {
    // Data inicial não pode ser depois da final
    if (rascunho.inicio > rascunho.fim) {
      mostrarAviso('erro', 'A data inicial não pode ser maior que a data final.');
      return;
    }

    setPeriodo(rascunho); // isso também faz o useEffect buscar os dados novos
    setSeletorAberto(false);

    // Sem token = ainda não há API. Só atualiza na tela.
    if (!localStorage.getItem('token')) return;

    try {
      await atualizarPeriodoRelatorio(rascunho);
      mostrarAviso('sucesso', 'Período atualizado.');
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    }
  }

  // ---- 4) DELETE: excluir um relatório salvo ----
  // Esta tela ainda não tem uma lista de relatórios salvos. Quando tiver,
  // ligue esta função a um botão: onClick={() => handleDeleteRelatorio(relatorio.id)}
  async function handleDeleteRelatorio(id) {
    try {
      await excluirRelatorio(id);
      mostrarAviso('sucesso', 'Relatório excluído.');
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    }
  }

  // ---- 5) POST: botão "Ver contato" ----
  async function handleContactSecretaria() {
    try {
      setEnviandoContato(true);
      await contatarSecretaria({ assunto: 'Atualização de dados' });
      mostrarAviso('sucesso', 'Pedido enviado para a secretaria da unidade.');
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    } finally {
      setEnviandoContato(false);
    }
  }

  const { cards } = dados;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-gray-900">
      <MenuLateral aberto={menuAberto} aoFechar={() => setMenuAberto(false)} />

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
          {/* ---------- Cabeçalho da página ---------- */}
          <header>
            <div className="flex items-center gap-3">
              <ArrowLeftToLine size={26} strokeWidth={2.5} />
              <h1 className="text-lg font-semibold">Relatórios</h1>
            </div>
            <p className="mt-1 text-base font-medium leading-snug md:ml-9">
              Acompanhe os indicadores e gere relatório das suas salas.
            </p>

            {/* Período + botão Gerar relatório (à direita no desktop) */}
            <div className="mt-4 flex flex-wrap items-center gap-3 md:justify-end">
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
                  <Calendar size={18} />
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
                      onClick={handleUpdatePeriodo}
                      className="mt-4 w-full rounded-md bg-[#E30613] py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>

              {/* Botão Gerar relatório */}
              <button
                type="button"
                onClick={handleGerarRelatorio}
                disabled={gerando}
                className="flex items-center gap-2 rounded-md bg-[#E30613] px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                <ClipboardPlus size={22} />
                {gerando ? 'Gerando...' : 'Gerar relatório'}
              </button>
            </div>
          </header>

          {/* ---------- Os 4 cards de indicadores ---------- */}
          {/* 2 colunas no celular, 4 no desktop */}
          <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <CardIndicador
              titulo="tempo médio de atendimento"
              valor={cards.tempoAtendimento.valor}
              variacao={cards.tempoAtendimento.variacao}
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
              titulo="Tempos médio de atendimento"
              valor={cards.tempoMedio.valor}
              variacao={cards.tempoMedio.variacao}
            />
          </section>

          {/* Status "Em Análise" (vermelho, à direita) */}
          <p className="mt-8 text-right text-sm font-semibold text-[#E30613]">{dados.status}</p>

          {/* ---------- Gráficos ---------- */}
          <section className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Gráfico de barras */}
            <div className="rounded-sm border border-gray-300 bg-white p-4">
              <h2 className="text-base font-bold">Ocorrências por turmas</h2>
              <GraficoBarras turmas={dados.ocorrenciasPorTurma} />
              <LegendaTurmas turmas={dados.ocorrenciasPorTurma} />
            </div>

            {/* Gráfico de rosca + legenda */}
            <div className="rounded-sm border border-gray-300 bg-white p-4">
              <h2 className="text-base font-bold">Motivos das ocorrências</h2>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                <GraficoRosca motivos={dados.motivos} total={dados.total} />

                <ul className="min-w-[180px] flex-1 space-y-3">
                  {dados.motivos.map((motivo, indice) => (
                    <li key={motivo.nome} className="flex items-center gap-3 text-[11px] font-semibold text-gray-500">
                      <span
                        className="h-3.5 w-3.5 shrink-0 rounded-full"
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

          {/* ---------- Banner de suporte ---------- */}
          <section className="mt-6 flex flex-col items-center gap-4 rounded-sm border border-gray-300 bg-white p-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-5">
              <Headset size={44} strokeWidth={1.5} color={VERMELHO} className="shrink-0" />
              <p className="text-xs font-bold leading-snug sm:text-sm">
                Precisa atualizar seus dados?
                <br />
                Entre em contato com a secretaria da unidade
              </p>
            </div>

            <button
              type="button"
              onClick={handleContactSecretaria}
              disabled={enviandoContato}
              className="w-full rounded-lg bg-[#E30613] px-10 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60 sm:w-auto"
            >
              {enviandoContato ? 'Enviando...' : 'Ver contato'}
            </button>
          </section>
        </main>
      </div>

      {/* Aviso de sucesso ou erro */}
      <Aviso aviso={aviso} aoFechar={() => setAviso(null)} />
    </div>
  );
}
