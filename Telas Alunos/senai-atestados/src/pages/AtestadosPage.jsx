import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import {
  House, QrCode, Clock, ClipboardList, FileText, User, LogOut,
  ArrowLeft, CirclePlus, CalendarDays, FileText as Doc, TriangleAlert, ArrowRight, X, UploadCloud, Menu,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '../components/ui/dialog';
import {
  obterMetricasAtestados, listarAtestados, enviarNovoAtestado, obterDetalhesAtestado,
} from '../services/atestadosService';

const ALUNO_ID = 1;

const menu = [
  { label: 'Início', icon: House, to: '/' },
  { label: 'Registrar atraso', icon: QrCode },
  { label: 'Meus Atrasos', icon: Clock, to: '/meus-atrasos' },
  { label: 'Ocorrencias', icon: ClipboardList },
  { label: 'Atestados', icon: FileText, active: true, to: '/atestados' },
  { label: 'Perfil', icon: User },
];
function StatusBadge({ status }) {
  const s = (status || '').toLowerCase();
  const cls = s.includes('aprov')
    ? 'bg-status-ok text-status-ok-foreground'
    : 'bg-status-wait text-status-wait-foreground';
  return <span className={`inline-block rounded-md px-3 py-1.5 text-[9px] font-medium ${cls}`}>{status}</span>;
}

export default function AtestadosPage() {
  const [metricas, setMetricas] = useState({ total: 3, emAnalise: 1, aprovados: 2 });
  const [atestados, setAtestados] = useState([
    { id: 1, dataEnvio: '10/10/2026', tipo: 'Atestado médico', arquivo: 'atestado_10-03.pdf', status: 'Em análise' },
    { id: 2, dataEnvio: '28/02/2026', tipo: 'justificativa', arquivo: 'justificativa.pdf', status: 'Aprovado' },
    { id: 3, dataEnvio: '15/02/2026', tipo: 'Atestado médico', arquivo: 'atestado_15-02.pdf', status: 'Aprovado' },
  ]);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoDoc, setTipoDoc] = useState('Atestado médico');
  const [arquivo, setArquivo] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [erroModal, setErroModal] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);

  async function carregar() {
    try {
      const [m, l] = await Promise.all([obterMetricasAtestados(ALUNO_ID), listarAtestados(ALUNO_ID)]);
      setMetricas(m);
      setAtestados(Array.isArray(l) ? l : []);
      setErro('');
    } catch (e) {
      // Mantém os valores exibidos até a API responder
      console.warn(e.message);
    }
  }

  useEffect(() => { carregar(); }, []);

  function abrirModal() {
    setTipoDoc('Atestado médico');
    setArquivo(null);
    setErroModal('');
    setModalAberto(true);
  }

  async function submeter(e) {
    e.preventDefault();
    setErroModal('');
    if (!arquivo) { setErroModal('Escolha um arquivo para enviar.'); return; }
    setEnviando(true);
    const fd = new FormData();
    fd.append('tipo', tipoDoc);
    fd.append('arquivo', arquivo);
    try {
      await enviarNovoAtestado(ALUNO_ID, fd);
      setModalAberto(false);
      carregar();
    } catch (err) {
      setErroModal(err.message);
    } finally {
      setEnviando(false);
    }
  }

  async function detalhes(id) {
    try { const d = await obterDetalhesAtestado(id); alert(JSON.stringify(d, null, 2)); }
    catch (err) { setErro(err.message); }
  }

  return (
    <div className="flex min-h-screen flex-col bg-page font-sans text-foreground md:flex-row">
      <header className="flex items-center justify-between bg-sidebar px-4 py-3 text-sidebar-foreground md:hidden">
        <div className="bg-brand px-1 text-lg font-black italic text-brand-foreground">SENAI</div>
        <button onClick={() => setMenuAberto(true)} aria-label="Abrir menu"><Menu className="h-7 w-7" /></button>
      </header>
      {menuAberto && <div className="fixed inset-0 z-40 bg-foreground/50 md:hidden" onClick={() => setMenuAberto(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-56 shrink-0 flex-col bg-sidebar px-6 py-3 text-sidebar-foreground transition-transform md:static md:w-40 md:translate-x-0 ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setMenuAberto(false)} aria-label="Fechar menu" className="mb-2 self-end md:hidden"><X className="h-6 w-6" /></button>
        <div className="mb-5 w-fit bg-brand px-1 text-lg font-black italic leading-tight tracking-tight text-brand-foreground">SENAI</div>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sidebar-foreground">
            <User className="h-6 w-6 text-sidebar" fill="currentColor" />
          </div>
          <div><p className="text-[10px]">Joao Silva</p><p className="text-[7px] text-muted-foreground">Aluno</p></div>
        </div>
        <nav className="flex flex-col gap-6">
         {menu.map(({ label, icon: Icon, active, to }) => (
  <Link key={label} to={to || '/atestados'} className="flex items-center gap-6 text-sm md:text-[9px]">
    <Icon className={`h-6 w-6 ${active ? 'text-brand' : ''}`} />
    {label}
  </Link>
))}
        </nav>
        <a href="#" className="mt-auto flex items-center gap-6 pb-4 text-sm md:text-[9px]"><LogOut className="h-6 w-6" />Sair</a>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-4 md:px-12">
        <h1 className="flex items-center gap-1 text-base font-semibold">
          <ArrowLeft className="h-6 w-6" /> Atestados e Justificativas
        </h1>
        <p className="mb-4 text-[13px] md:ml-6 font-medium text-muted-foreground">Envie atestados e acompanhe o andamento de cada um.</p>

        <section className="rounded-lg border border-panel-border bg-card px-3 pb-10 pt-3">
          <div className="flex justify-end">
            <button onClick={abrirModal} className="flex items-center gap-1 rounded-sm bg-brand px-3 py-2 text-xs font-medium text-brand-foreground md:px-1.5 md:text-[9px]">
              <CirclePlus className="h-3.5 w-3.5" /> Enviar novo documento
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:flex sm:justify-between">
            <div className="rounded sm:w-34 border border-m1-border bg-m1 py-1 text-center text-m1-foreground">
              <p className="text-sm font-medium">Total enviados</p>
              <p className="flex items-center justify-center gap-1 text-2xl text-foreground"><CalendarDays className="h-6 w-6" fill="currentColor" stroke="var(--m1)" />{metricas.total}</p>
              <p className="text-sm font-medium">neste mês</p>
            </div>
            <div className="rounded sm:w-34 border border-m2-border bg-m2 pb-6 pt-1 text-center text-m2-foreground">
              <p className="text-sm font-medium">Em Análise</p>
              <p className="flex items-center justify-center gap-2 text-2xl text-foreground"><Doc className="h-5 w-5" />{metricas.emAnalise}</p>
            </div>
            <div className="rounded sm:w-34 border border-m3-border bg-m3 pb-6 pt-1 text-center text-m3-foreground">
              <p className="text-sm font-medium">Aprovados</p>
              <p className="flex items-center justify-center gap-3 text-2xl text-foreground"><TriangleAlert className="h-6 w-6" fill="currentColor" stroke="var(--m3)" />{metricas.aprovados}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 md:hidden">
            {atestados.length === 0 && <p className="py-6 text-center text-xs text-muted-foreground">{erro || 'Nenhum atestado enviado.'}</p>}
            {atestados.map((a) => (
              <div key={a.id} className="rounded-lg border border-panel-border p-3">
                <div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold">{a.dataEnvio}</span><StatusBadge status={a.status} /></div>
                <p className="mt-2 text-xs font-medium">{a.tipo}</p>
                <p className="truncate text-xs text-muted-foreground">{a.arquivo}</p>
                <button onClick={() => detalhes(a.id)} className="mt-3 w-full rounded-md bg-brand py-2 text-xs font-medium text-brand-foreground">Detalhes...</button>
              </div>
            ))}
          </div>

          <div className="mt-12 hidden overflow-hidden rounded-lg border border-panel-border md:block">
            <table className="w-full text-center">
              <thead>
                <tr className="text-sm font-semibold">
                  {['Data de envio', 'Tipo', 'Arquivo', 'Status', 'Ações'].map((h) => <th key={h} className="py-3 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {atestados.length === 0 && (
                  <tr className="border-t border-panel-border"><td colSpan={5} className="py-6 text-xs text-muted-foreground">{erro || 'Nenhum atestado enviado.'}</td></tr>
                )}
                {atestados.map((a, i) => (
                  <tr key={a.id} className={`border-t border-panel-border ${i % 2 === 0 ? 'bg-row' : ''}`}>
                    <td className="py-4 text-sm font-semibold">{a.dataEnvio}</td>
                    <td className="text-xs font-medium">{a.tipo}</td>
                    <td className="text-xs font-medium">{a.arquivo}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td><button onClick={() => detalhes(a.id)} className="rounded-md bg-brand px-2 py-1.5 text-[9px] font-medium text-brand-foreground">Detalhes...</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <a href="#" className="mt-8 flex md:mt-14 items-center gap-2 text-sm font-medium text-brand">Ver todo o historico <ArrowRight className="h-4 w-4" /></a>
        </section>
      </main>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-lg border-panel-border p-0 sm:rounded-lg">
          <DialogHeader className="flex flex-row items-center justify-between border-b border-panel-border px-5 py-3">
            <DialogTitle className="text-sm font-semibold">Enviar novo documento</DialogTitle>
            <button onClick={() => setModalAberto(false)} aria-label="Fechar" className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>

          <form onSubmit={submeter} className="px-5 py-4">
            <label className="mb-1 block text-xs font-semibold" htmlFor="tipo-doc">Tipo de documento</label>
            <select
              id="tipo-doc"
              value={tipoDoc}
              onChange={(e) => setTipoDoc(e.target.value)}
              className="w-full rounded-md border border-panel-border bg-card px-3 py-2 text-xs text-foreground outline-none focus:border-brand"
            >
              <option>Atestado médico</option>
              <option>Justificativa</option>
            </select>

            <label className="mb-1 mt-4 block text-xs font-semibold" htmlFor="arquivo-doc">Arquivo (PDF ou imagem)</label>
            <label
              htmlFor="arquivo-doc"
              className="flex cursor-pointer flex-col items-center gap-1 rounded-md border border-dashed border-m1-border bg-m1 px-3 py-5 text-center text-m1-foreground"
            >
              <UploadCloud className="h-6 w-6" />
              <span className="text-xs font-medium">{arquivo ? arquivo.name : 'Clique para escolher o arquivo'}</span>
              <input
                id="arquivo-doc"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => { setArquivo(e.target.files?.[0] || null); setErroModal(''); }}
              />
            </label>

            {erroModal && <p className="mt-3 text-xs font-medium text-brand">{erroModal}</p>}

            <DialogFooter className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="rounded-sm border border-panel-border px-3 py-2 text-[9px] font-medium text-foreground"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="flex items-center gap-1 rounded-sm bg-brand px-3 py-2 text-[9px] font-medium text-brand-foreground disabled:opacity-60"
              >
                <CirclePlus className="h-3.5 w-3.5" /> {enviando ? 'Enviando...' : 'Enviar documento'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
