const API_BASE_URL = 'https://sua-api-futura.com/api';

function authHeaders(json = true) {
  const h = { Authorization: `Bearer ${localStorage.getItem('token')}` };
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

// 1. GET - Métricas dos cards superiores
export async function obterMetricasAtestados(alunoId) {
  const response = await fetch(`${API_BASE_URL}/aluno/${alunoId}/atestados/metricas`, {
    method: 'GET',
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao carregar métricas.');
  return await response.json();
}

// 2. GET - Lista de atestados
export async function listarAtestados(alunoId) {
  const response = await fetch(`${API_BASE_URL}/aluno/${alunoId}/atestados`, {
    method: 'GET',
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao listar atestados.');
  return await response.json();
}

// 3. POST - Enviar novo documento/atestado
export async function enviarNovoAtestado(alunoId, formData) {
  const response = await fetch(`${API_BASE_URL}/aluno/${alunoId}/atestados`, {
    method: 'POST',
    headers: authHeaders(false),
    body: formData,
  });
  if (!response.ok) throw new Error('Erro ao enviar o documento.');
  return await response.json();
}

// 4. GET - Detalhes de um atestado
export async function obterDetalhesAtestado(atestadoId) {
  const response = await fetch(`${API_BASE_URL}/atestados/${atestadoId}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao carregar detalhes do atestado.');
  return await response.json();
}

// 5. DELETE - Cancelar envio de atestado
export async function cancelarAtestado(atestadoId) {
  const response = await fetch(`${API_BASE_URL}/atestados/${atestadoId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao cancelar atestado.');
  return await response.json();
}
