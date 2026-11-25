
const API_BASE_URL = 'https://sua-api-futura.com/api';


function montarHeaders() {
  return {
    'Content-Type': 'application/json',
   
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}


export async function obterRelatorios(periodo) {
  const url = `${API_BASE_URL}/relatorios?inicio=${periodo.inicio}&fim=${periodo.fim}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao carregar os dados dos relatórios.');
  return await response.json();
}


export async function gerarRelatorio(periodo) {
  const response = await fetch(`${API_BASE_URL}/relatorios/gerar`, {
    method: 'POST',
    headers: montarHeaders(),
    body: JSON.stringify(periodo),
  });
  if (!response.ok) throw new Error('Erro ao gerar o relatório.');
  return await response.json();
}


export async function atualizarPeriodoRelatorio(periodo) {
  const response = await fetch(`${API_BASE_URL}/relatorios/periodo`, {
    method: 'PUT',
    headers: montarHeaders(),
    body: JSON.stringify(periodo),
  });
  if (!response.ok) throw new Error('Erro ao atualizar o período.');
  return await response.json();
}


export async function excluirRelatorio(id) {
  const response = await fetch(`${API_BASE_URL}/relatorios/${id}`, {
    method: 'DELETE',
    headers: montarHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao excluir o relatório.');
  return await response.json();
}


export async function contatarSecretaria(dadosContato) {
  const response = await fetch(`${API_BASE_URL}/contato/secretaria`, {
    method: 'POST',
    headers: montarHeaders(),
    body: JSON.stringify(dadosContato),
  });
  if (!response.ok) throw new Error('Erro ao enviar o contato para a secretaria.');
  return await response.json();
}
