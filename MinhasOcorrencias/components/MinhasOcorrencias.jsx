
import { useState } from 'react'
import './MinhasOcorrencias.css'
import Menu from '../Menu/Menu';
import '../Menu/Menu';

const ocorrencias = [
    { numero: 'Os-00125', data: '10/03/2026', motivo: 'Atraso recorrente', status: 'Em andamento' },
    { numero: 'Os-00126', data: '05/03/2026', motivo: 'Atraso recorrente', status: 'Pendente' },
    { numero: 'Os-00124', data: '20/02/2026', motivo: 'Justificativa', status: 'Concluído' },
    { numero: 'Os-00118', data: '12/02/2026', motivo: 'Atraso recorrente', status: 'Em andamento' },
    { numero: 'Os-00107', data: '03/02/2026', motivo: 'Questão Pessoal', status: 'Encerrada' },
]

const filtros = [
    'Todas',
    'Em andamento',
    'Aguardando retorno',
    'Concluídos',
    'Encerradas',
]

function MinhasOcorrencias() {
    const [filtro, setFiltro] = useState('Todas')

    const listaFiltrada = ocorrencias.filter((ocorrencia) => {
        if (filtro === 'Todas') return true
        if (filtro === 'Concluídos') return ocorrencia.status === 'Concluído'
        if (filtro === 'Aguardando retorno') return ocorrencia.status === 'Pendente'
        return ocorrencia.status === filtro
    })


    return (
        <div className="pagina-ocorrencias">
            <Menu />

            <main className="conteudo"></main>



            <main className="conteudo">
                <section className="painel">
                    <header className="cabecalho">
                        <img
                            src="/assets/seta.png"
                            alt="Início"
                            className="icone-imagem"
                        />
                        <div>
                            <h1>Minhas ocorrências</h1>
                            <p>Consulte suas ocorrências registradas.</p>
                        </div>
                    </header>

                    <div className="filtros">
                        {filtros.map((item) => (
                            <button
                                key={item}
                                className={`botao-filtro ${filtro === item ? 'selecionado' : ''}`}
                                onClick={() => setFiltro(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="tabela-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nº OS</th>
                                    <th>Data da ocorrência</th>
                                    <th>Motivo</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listaFiltrada.map((ocorrencia) => (
                                    <tr key={ocorrencia.numero}>
                                        <td>{ocorrencia.numero}</td>
                                        <td>{ocorrencia.data}</td>
                                        <td>{ocorrencia.motivo}</td>
                                        <td>
                                            <span
                                                className={`status ${ocorrencia.status === 'Em andamento'
                                                    ? 'em-andamento'
                                                    : ocorrencia.status === 'Pendente'
                                                        ? 'pendente'
                                                        : ocorrencia.status === 'Concluído'
                                                            ? 'concluido'
                                                            : 'encerrada'
                                                    }`}
                                            >
                                                {ocorrencia.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="botao-detalhes"
                                                onClick={() =>
                                                    window.alert(
                                                        `Ocorrência ${ocorrencia.numero}\n` +
                                                        `Data: ${ocorrencia.data}\n` +
                                                        `Motivo: ${ocorrencia.motivo}\n` +
                                                        `Status: ${ocorrencia.status}`
                                                    )
                                                }
                                            >
                                                Ver detalhes
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {listaFiltrada.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="sem-resultados">
                                            Nenhuma ocorrência encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <a href="#historico" className="historico">
                        Ver todo o histórico <span>→</span>
                    </a>
                </section>
            </main>
        </div>
    )

}

export default MinhasOcorrencias
