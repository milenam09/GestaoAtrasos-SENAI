
import { useNavigate } from "react-router-dom";

import iconeAluno from "../../assets/icone-aluno.png";
import iconeProfessor from "../../assets/icone-professor.png";
import iconeGestor from "../../assets/icone-gestor.png";

import "../../css/aluno/TelaInicial.css";

function TelaInicial() {
    const navigate = useNavigate();

    const perfis = [
        {
            nome: "Aluno",
            descricao: "Acesse suas informações, turmas e muito mais",
            icone: iconeAluno,
            rota: "/aluno",
        },
        {
            nome: "Professor",
            descricao: "Gerencie suas turmas, frequência e atividades.",
            icone: iconeProfessor,
            rota: "/professor",
        },
        {
            nome: "Gestor",
            descricao: "Acesse relatórios, indicadores e gerencie a escola",
            icone: iconeGestor,
            rota: "/gestor",
        },
    ];

    return (
        <main className="tela-inicial">
            <div className="fundo-escuro"></div>
            <div className="faixa faixa-superior"></div>
            <div className="faixa faixa-inferior"></div>

            <section className="conteudo-inicial">
                <header className="cabecalho-inicial">
                    <h1>Conectando você</h1>
                    <p className="subtitulo">ao seu futuro</p>

                    <span className="linha-vermelha"></span>

                    <p className="instrucao">
                        Escolha o seu perfil para acessar o sistema
                    </p>
                </header>

                <div className="perfis-container">
                    {perfis.map((perfil) => (
                        <article
                            className="cartao-perfil"
                            key={perfil.nome}
                        >
                            <div className="icone-perfil">
                                <img
                                    src={perfil.icone}
                                    alt={perfil.nome}
                                />
                            </div>

                            <h2>{perfil.nome}</h2>

                            <p className="descricao-perfil">
                                {perfil.descricao}
                            </p>

                            <button
                                className="botao-entrar"
                                onClick={() => navigate(perfil.rota)}
                            >
                                Entrar
                            </button>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default TelaInicial;
