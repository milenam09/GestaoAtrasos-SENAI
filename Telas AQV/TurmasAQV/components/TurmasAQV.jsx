import React from 'react';
import './TurmasAQV.css'; // Vamos criar este CSS a seguir para estilizar

function TurmasAQV() {
    return (
        <div className="turmas-container">
            {/* Cabeçalho */}
            <div className="turmas-header">
                <div className="title-area">
                     <img
                            src="/assets/seta.png"
                            alt="Início"
                            className="icone-imagem"
                        />
                    <h1>Turmas</h1>
                </div>
                <p>Consulte suas turmas e acompanhe os alunos.</p>
            </div>

            {/* Barra de Filtros e Ações */}
            <div className="turmas-filters">
                <div className="search-box">
                    <img
                        src="/assets/lupa.png"
                        alt="Início"
                        className="icone-imagem"
                    />          <input type="text" placeholder="Buscar por turmas ou cursos" />
                </div>
                <select className="filter-select">
                    <option>Todas as turmas</option>
                </select>
                <select className="filter-select">
                    <option>Todos os períodos</option>
                </select>
                <button className="btn-nova-turma">+ Nova turma</button>
            </div>

            {/* Tabela de Turmas */}
            <div className="table-wrapper">
                <table className="turmas-table">
                    <thead>
                        <tr>
                            <th>Turma</th>
                            <th>Curso</th>
                            <th>Turno</th>
                            <th>Total de alunos</th>
                            <th>Atrasos hoje</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1 A</strong></td>
                            <td>técnico em informática</td>
                            <td>Integral</td>
                            <td>33</td>
                            <td><span className="badge-atraso">3</span></td>
                            <td><button className="btn-ver-alunos">Ver alunos</button></td>
                        </tr>
                        <tr>
                            <td><strong>2 A</strong></td>
                            <td>técnico em informática</td>
                            <td>Integral</td>
                            <td>33</td>
                            <td><span className="badge-atraso">3</span></td>
                            <td><button className="btn-ver-alunos">Ver alunos</button></td>
                        </tr>
                        <tr>
                            <td><strong>3 A</strong></td>
                            <td>técnico em informática</td>
                            <td>Integral</td>
                            <td>33</td>
                            <td><span className="badge-atraso">3</span></td>
                            <td><button className="btn-ver-alunos">Ver alunos</button></td>
                        </tr>
                        <tr>
                            <td><strong>2 B</strong></td>
                            <td>técnico em informática</td>
                            <td>Integral</td>
                            <td>33</td>
                            <td><span className="badge-atraso">3</span></td>
                            <td><button className="btn-ver-alunos">Ver alunos</button></td>
                        </tr>
                        <tr>
                            <td><strong>2 C</strong></td>
                            <td>técnico em informática</td>
                            <td>Integral</td>
                            <td>33</td>
                            <td><span className="badge-atraso">3</span></td>
                            <td><button className="btn-ver-alunos">Ver alunos</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div className="turmas-footer">
                <span>Mostrando 1 - 4 de 4 turmas</span>
                <div className="pagination">
                    <button className="page-btn">&lt;</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="page-btn">4</button>
                    <button className="page-btn">5</button>
                    <button className="page-btn">&gt;</button>
                </div>
            </div>
        </div>
    );
}

export default TurmasAQV;