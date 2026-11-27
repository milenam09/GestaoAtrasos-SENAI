// =====================================================================
// src/services/atrasosService.js


const API_BASE_URL = 'https://sua-api-futura.com/api';


function montarHeaders() {
  return {
    'Content-Type': 'application/json',
    
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}


export async function obterMetricasAtrasos(alunoId) {
  const response = await fetch(`${API_BASE_URL}/aluno/${alunoId}/atrasos/metricas`, {
    method: 'GET',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao carregar métricas de atrasos.');
  return await response.json();
}


export async function listarHistoricoAtrasos(alunoId, limite = 10) {
  const response = await fetch(`${API_BASE_URL}/aluno/${alunoId}/atrasos?limit=${limite}`, {
    method: 'GET',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao listar histórico de atrasos.');
  return await response.json();
}


export async function registrarAtrasoManual(alunoId, dadosAtraso) {
  const response = await fetch(`${API_BASE_URL}/aluno/${alunoId}/atrasos`, {
    method: 'POST',
    headers: montarHeaders(),
    body: JSON.stringify(dadosAtraso),
  });
  if (!response.ok) throw new Error('Erro ao registrar atraso.');
  return await response.json();
}


export async function atualizarStatusAtraso(atrasoId, dadosAtualizacao) {
  const response = await fetch(`${API_BASE_URL}/atrasos/${atrasoId}`, {
    method: 'PUT',
    headers: montarHeaders(),
    body: JSON.stringify(dadosAtualizacao),
  });
  if (!response.ok) throw new Error('Erro ao atualizar registro de atraso.');
  return await response.json();
}


export async function contestarAtraso(atrasoId) {
  const response = await fetch(`${API_BASE_URL}/atrasos/${atrasoId}`, {
    method: 'DELETE',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao remover ou contestar atraso.');
  return await response.json();
}
