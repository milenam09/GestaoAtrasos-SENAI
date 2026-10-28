

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
  ClipboardPlus,
  Headset,
  Menu,
  X,
} from 'lucide-react';
import {
  obterRelatorios,
  gerarRelatorio,
  atualizarPeriodoRelatorio,
  excluirRelatorio,
  contatarSecretaria,
} from '../services/relatoriosService';


const VERMELHO = '#E30613';


const CORES_BARRAS = ['#B76E6E', '#9B0A0A', '#FF0000', '#FF5F5F'];
const CORES_MOTIVOS = ['#F9475A', '#FF9933', '#7BA7FF', '#7ED67E', '#A67C2E'];


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


const PERIODO_INICIAL = { inicio: '2026-03-01', fim: '2026-03-10' };


const ITENS_MENU = [
  { texto: 'Início', Icone: Home, para: '/' },
  { texto: 'Acolhimentos', Icone: FileText },
  { texto: 'Minhas Turmas', Icone: Monitor },
  { texto: 'Alunos', Icone: Users },
  { texto: 'Relatórios', Icone: ClipboardList, para: '/relatorios', ativo: true },
  { texto: 'Perfil', Icone: User },
];




function formatarData(dataIso) {
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
}


function formatarNumero(numero) {
  return Number(numero).toLocaleString('pt-BR');
}


function LogoSenai({ tamanho = 'px-2 py-0.5 text-lg' }) {
  return (
    <span
      className={`inline-block bg-[#E30613] font-black italic leading-none tracking-tight text-white ${tamanho}`}
    >
      SENAI
    </span>
  );
}


function Sidebar({ aberto, aoFechar, nome, cargo, aoSair }) {
  return (
    <>
      
      {aberto && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={aoFechar} />}

      <aside
        className={
          'fixed inset-y-0 left-0 z-40 flex w-56 shrink-0 flex-col bg-[#0B192C] ' +
          'transition-transform duration-200 md:static md:w-52 md:translate-x-0 ' +
          (aberto ? 'translate-x-0' : '-translate-x-full')
        }
      >
       
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

        
        <div className="flex items-center gap-3 px-5 pb-6 pt-2">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0B192C]">
            <User size={26} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm text-white">{nome}</p>
            <p className="text-xs text-gray-400">{cargo}</p>
          </div>
        </div>

     
        <nav className="flex flex-col">
          {ITENS_MENU.map(({ texto, Icone, para, ativo }) => {
            const classe = 'flex items-center gap-3 px-5 py-3 text-sm text-white hover:bg-white/10';

           
            const conteudo = (
              <>
                <span className={ativo ? 'rounded-md bg-white p-1' : 'p-1'}>
                  <Icone size={24} color={ativo ? VERMELHO : 'currentColor'} />
                </span>
                <span className={ativo ? 'font-bold' : ''}>{texto}</span>
              </>
            );

            
            if (para) {
              return (
                <Link key={texto} to={para} onClick={aoFechar} className={classe}>
                  {conteudo}
                </Link>
              );
            }

            
            return (
              <a key={texto} href="#" className={classe}>
                {conteudo}
              </a>
            );
          })}
        </nav>

       
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


function CardIndicador({ titulo, valor, variacao }) {
  const subiu = variacao >= 0; 

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


function GraficoBarras({ turmas }) {
 
  const maior = Math.max(...turmas.map((t) => t.total), 1);

  return (
    <div className="mt-4 flex h-56 items-end justify-around gap-2 border-b border-gray-500 px-2">
      {turmas.map((item, indice) => (
        <div key={item.turma} className="flex h-full w-14 flex-col items-center justify-end">
          
          <span className="mb-1 text-base font-bold text-gray-500">{item.total}</span>
          
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


const RAIO = 40;
const CIRCUNFERENCIA = 2 * Math.PI * RAIO; 

function GraficoRosca({ motivos, total }) {
 
  const fatias = [];
  let acumulado = 0;
  for (const motivo of motivos) {
    const tamanho = (motivo.percentual / 100) * CIRCUNFERENCIA;
    fatias.push({ ...motivo, tamanho, inicio: acumulado });
    acumulado = acumulado + tamanho;
  }

  return (
    <div className="relative h-40 w-40 shrink-0">
     
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

      
      <div className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white shadow">
        <span className="text-3xl font-black leading-none">{total}</span>
        <span className="text-[10px] font-bold leading-tight">total</span>
      </div>
    </div>
  );
}


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

export default function RelatoriosPage() {
  
  const [menuAberto, setMenuAberto] = useState(false); 
  const [dados, setDados] = useState(DADOS_INICIAIS); 
  const [periodo, setPeriodo] = useState(PERIODO_INICIAL); 
  const [rascunho, setRascunho] = useState(PERIODO_INICIAL); 
  const [seletorAberto, setSeletorAberto] = useState(false); 
  const [carregando, setCarregando] = useState(false); 
  const [gerando, setGerando] = useState(false); 
  const [enviandoContato, setEnviandoContato] = useState(false); 
  const [aviso, setAviso] = useState(null); 

 
  function mostrarAviso(tipo, texto) {
    setAviso({ tipo, texto });
    setTimeout(() => setAviso(null), 4000);
  }

  
  useEffect(() => {
    async function carregarDados() {
      try {
       
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

 
  async function handleUpdatePeriodo() {
   
    if (rascunho.inicio > rascunho.fim) {
      mostrarAviso('erro', 'A data inicial não pode ser maior que a data final.');
      return;
    }

    setPeriodo(rascunho); 
    setSeletorAberto(false);

   
    if (!localStorage.getItem('token')) return;

    try {
      await atualizarPeriodoRelatorio(rascunho);
      mostrarAviso('sucesso', 'Período atualizado.');
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    }
  }

  
  async function handleDeleteRelatorio(id) {
    try {
      await excluirRelatorio(id);
      mostrarAviso('sucesso', 'Relatório excluído.');
    } catch (erro) {
      mostrarAviso('erro', erro.message);
    }
  }

  
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

      <div className="min-w-0 flex-1">
       
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
          
          <header>
            <div className="flex items-center gap-3">
              <ArrowLeftToLine size={26} strokeWidth={2.5} />
              <h1 className="text-lg font-semibold">Relatórios</h1>
            </div>
            <p className="mt-1 text-base font-medium leading-snug md:ml-9">
              Acompanhe os indicadores e gere relatório das suas salas.
            </p>

          
            <div className="mt-4 flex flex-wrap items-center gap-3 md:justify-end">
             
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

        
          <p className="mt-8 text-right text-sm font-semibold text-[#E30613]">{dados.status}</p>

         
          <section className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
            
            <div className="rounded-sm border border-gray-300 bg-white p-4">
              <h2 className="text-base font-bold">Ocorrências por turmas</h2>
              <GraficoBarras turmas={dados.ocorrenciasPorTurma} />
              <LegendaTurmas turmas={dados.ocorrenciasPorTurma} />
            </div>

           
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

      
      <Aviso aviso={aviso} aoFechar={() => setAviso(null)} />
    </div>
  );
}
