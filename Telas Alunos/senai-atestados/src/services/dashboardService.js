// =====================================================================
// src/services/dashboardService.js
// Funções que conversam com a API (back-end) da tela
// "Relatórios (Visão do Gestor)".
// Mesmo padrão dos outros serviços: async/await + fetch.
//
// COMO CONECTAR A API REAL:
// 1) Troque API_BASE_URL pelo endereço do seu back-end.
// 2) Se o caminho (rota) de algum endpoint for diferente, troque só o
//    texto marcado com "COLOCAR A URL REAL" dentro de cada função.
// =====================================================================

// COLOCAR A URL REAL DO BACK-END AQUI
const API_BASE_URL = 'https://sua-api-futura.com/api';

// Monta os cabeçalhos (headers) usados em todas as requisições
function montarHeaders() {
  return {
    'Content-Type': 'application/json',
    // O token de login fica guardado no navegador (localStorage)
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}

// 1. GET - Buscar dados gerais (cards, gráficos e tabela de alunos)
// "periodo" tem o formato { inicio: '2025-03-01', fim: '2025-03-10' }
export async function fetchDashboardData(periodo) {
  // COLOCAR A URL REAL: GET {API_BASE_URL}/dashboard
  const url = `${API_BASE_URL}/dashboard?inicio=${periodo.inicio}&fim=${periodo.fim}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao carregar os dados do dashboard.');
  return await response.json();
}

// 2. POST - Gerar relatório do período
export async function gerarRelatorio(dataInicio, dataFim) {
  // COLOCAR A URL REAL: POST {API_BASE_URL}/relatorios/gerar
  const response = await fetch(`${API_BASE_URL}/relatorios/gerar`, {
    method: 'POST',
    headers: montarHeaders(),
    body: JSON.stringify({ inicio: dataInicio, fim: dataFim }),
  });
  if (!response.ok) throw new Error('Erro ao gerar o relatório.');
  return await response.json();
}

// 3. PUT - Filtrar por período (atualiza o período escolhido)
export async function filtrarPorPeriodo(periodo) {
  // COLOCAR A URL REAL: PUT {API_BASE_URL}/dashboard/periodo
  const response = await fetch(`${API_BASE_URL}/dashboard/periodo`, {
    method: 'PUT',
    headers: montarHeaders(),
    body: JSON.stringify(periodo),
  });
  if (!response.ok) throw new Error('Erro ao filtrar pelo período.');
  return await response.json();
}

// 4. POST - Adicionar uma nova ocorrência
export async function adicionarOcorrencia(dadosOcorrencia) {
  // COLOCAR A URL REAL: POST {API_BASE_URL}/ocorrencias
  const response = await fetch(`${API_BASE_URL}/ocorrencias`, {
    method: 'POST',
    headers: montarHeaders(),
    body: JSON.stringify(dadosOcorrencia),
  });
  if (!response.ok) throw new Error('Erro ao adicionar a ocorrência.');
  return await response.json();
}

// 5. DELETE - Remover ou arquivar uma ocorrência
export async function excluirOcorrencia(id) {
  // COLOCAR A URL REAL: DELETE {API_BASE_URL}/ocorrencias/:id
  const response = await fetch(`${API_BASE_URL}/ocorrencias/${id}`, {
    method: 'DELETE',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao remover a ocorrência.');
  return await response.json();
}
