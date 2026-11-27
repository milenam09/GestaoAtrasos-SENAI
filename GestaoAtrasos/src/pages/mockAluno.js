import { useState } from 'react';

export const aluno = { nome: 'João Silva', turma: '3 A - Desenvolvimento de Sistemas', turno: 'Integral', email: 'joao.silva@example.com', telefone: '(12) 99917-8195' };
export const hoje = () => new Date().toLocaleDateString('pt-BR');
export const iniciais = {
  atrasos: ['27/11/2026', '26/11/2026', '19/11/2026', '12/11/2026', '05/11/2026', '09/10/2026', '19/08/2026', '05/08/2026', '12/06/2026'].map((data, i) => ({ id: `at-${i}`, data, previsto: '08:00', chegada: ['08:07', '08:12', '08:19', '08:04', '08:25'][i % 5], motivo: 'Transporte público', descricao: 'Atraso no trajeto até a unidade.', status: 'Atrasado' })),
  ocorrencias: [
    { id: 'OS-00125', data: '27/11/2026', motivo: 'Atraso recorrente', status: 'Em andamento', descricao: 'Conversa agendada com a equipe AQV para orientação.' },
    { id: 'OS-00126', data: '25/11/2026', motivo: 'Atraso recorrente', status: 'Pendente', descricao: 'Aguardando justificativa do aluno.' },
    { id: 'OS-00124', data: '20/11/2026', motivo: 'Justificativa', status: 'Concluído', descricao: 'Justificativa recebida e analisada pela equipe.' },
    { id: 'OS-00118', data: '12/11/2026', motivo: 'Atraso recorrente', status: 'Em andamento', descricao: 'Acompanhamento de frequência em andamento.' },
    { id: 'OS-00107', data: '03/11/2026', motivo: 'Questão pessoal', status: 'Encerrada', descricao: 'Atendimento encerrado após orientação.' },
    { id: 'OS-00098', data: '20/10/2026', motivo: 'Justificativa', status: 'Concluído', descricao: 'Documento validado pela secretaria.' },
  ],
  documentos: [
    { id: 'doc-1', data: '27/11/2026', tipo: 'Atestado médico', arquivo: 'atestado_27-11.pdf', status: 'Em análise' },
    { id: 'doc-2', data: '20/11/2026', tipo: 'Justificativa', arquivo: 'justificativa.pdf', status: 'Aprovado' },
    { id: 'doc-3', data: '15/11/2026', tipo: 'Atestado médico', arquivo: 'atestado_15-11.pdf', status: 'Aprovado' },
    { id: 'doc-4', data: '10/10/2026', tipo: 'Justificativa', arquivo: 'justificativa_outubro.pdf', status: 'Aprovado' },
  ],
};
let dadosDaSessao = iniciais;
export function useMockAluno() {
  const [dados, setDados] = useState(() => {
    try { const valor = JSON.parse(localStorage.getItem('senai-demo-v1')); if (valor && ['atrasos', 'ocorrencias', 'documentos'].every(chave => Array.isArray(valor[chave]))) return valor; } catch { /* Usa os dados iniciais se o armazenamento estiver indisponível. */ }
    return dadosDaSessao;
  });
  const [aviso, setAviso] = useState('');
  function adicionar(chave, registro, documento) {
    const novo = { ...dados, [chave]: [registro, ...dados[chave]] };
    if (documento) novo.documentos = [documento, ...dados.documentos];
    dadosDaSessao = novo;
    try { localStorage.setItem('senai-demo-v1', JSON.stringify(novo)); } catch { setAviso('O navegador não permitiu salvar os dados permanentemente. Os registros ficarão disponíveis durante esta sessão.'); }
    setDados(novo);
  }
  return { dados, adicionar, aviso };
}
