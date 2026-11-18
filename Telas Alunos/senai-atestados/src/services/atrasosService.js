// =====================================================================
// src/services/atrasosService.js
// Funções que conversam com a API (back-end).
// Cada função usa "async/await" + "fetch" (já vem pronto no navegador).
// Quando a API real existir, só troque a URL base abaixo.
// =====================================================================

// URL base da API (troque pelo endereço real quando tiver)
const API_BASE_URL = 'https://sua-api-futura.com/api';

// Função auxiliar: monta os cabeçalhos (headers) de todas as requisições.
// Assim não repetimos o mesmo código 5 vezes.
function montarHeaders() {
  return {
    'Content-Type': 'application/json',
    // O token de login fica guardado no navegador (localStorage)
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}

// 1. GET - Métricas dos 4 cards superiores
// (Total de atrasos, Atrasos consecutivos, Turma, Status)
export async function obterMetricasAtrasos(alunoId) {
  const response = await fetch(`${API_BASE_URL}/aluno/${alunoId}/atrasos/metricas`, {
    method: 'GET',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao carregar métricas de atrasos.');
  return await response.json();
}

// 2. GET - Histórico de atrasos do aluno (preenche a tabela)
export async function listarHistoricoAtrasos(alunoId, limite = 10) {
  const response = await fetch(`${API_BASE_URL}/aluno/${alunoId}/atrasos?limit=${limite}`, {
    method: 'GET',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao listar histórico de atrasos.');
  return await response.json();
}

// 3. POST - Registrar um novo atraso manualmente
export async function registrarAtrasoManual(alunoId, dadosAtraso) {
  const response = await fetch(`${API_BASE_URL}/aluno/${alunoId}/atrasos`, {
    method: 'POST',
    headers: montarHeaders(),
    body: JSON.stringify(dadosAtraso),
  });
  if (!response.ok) throw new Error('Erro ao registrar atraso.');
  return await response.json();
}

// 4. PUT - Justificar ou atualizar o status de um atraso
export async function atualizarStatusAtraso(atrasoId, dadosAtualizacao) {
  const response = await fetch(`${API_BASE_URL}/atrasos/${atrasoId}`, {
    method: 'PUT',
    headers: montarHeaders(),
    body: JSON.stringify(dadosAtualizacao),
  });
  if (!response.ok) throw new Error('Erro ao atualizar registro de atraso.');
  return await response.json();
}

// 5. DELETE - Remover ou contestar um atraso
export async function contestarAtraso(atrasoId) {
  const response = await fetch(`${API_BASE_URL}/atrasos/${atrasoId}`, {
    method: 'DELETE',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao remover ou contestar atraso.');
  return await response.json();
}
