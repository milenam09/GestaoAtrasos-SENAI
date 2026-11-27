
const API_BASE_URL = 'https://sua-api-futura.com/api';


function montarHeaders() {
  return {
    'Content-Type': 'application/json',
   
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}


export async function fetchDashboardData(periodo) {
 
  const url = `${API_BASE_URL}/dashboard?inicio=${periodo.inicio}&fim=${periodo.fim}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao carregar os dados do dashboard.');
  return await response.json();
}


export async function gerarRelatorio(dataInicio, dataFim) {
  
  const response = await fetch(`${API_BASE_URL}/relatorios/gerar`, {
    method: 'POST',
    headers: montarHeaders(),
    body: JSON.stringify({ inicio: dataInicio, fim: dataFim }),
  });
  if (!response.ok) throw new Error('Erro ao gerar o relatório.');
  return await response.json();
}


export async function filtrarPorPeriodo(periodo) {
  
  const response = await fetch(`${API_BASE_URL}/dashboard/periodo`, {
    method: 'PUT',
    headers: montarHeaders(),
    body: JSON.stringify(periodo),
  });
  if (!response.ok) throw new Error('Erro ao filtrar pelo período.');
  return await response.json();
}


export async function adicionarOcorrencia(dadosOcorrencia) {
  
  const response = await fetch(`${API_BASE_URL}/ocorrencias`, {
    method: 'POST',
    headers: montarHeaders(),
    body: JSON.stringify(dadosOcorrencia),
  });
  if (!response.ok) throw new Error('Erro ao adicionar a ocorrência.');
  return await response.json();
}


export async function excluirOcorrencia(id) {
  
  const response = await fetch(`${API_BASE_URL}/ocorrencias/${id}`, {
    method: 'DELETE',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao remover a ocorrência.');
  return await response.json();
}
