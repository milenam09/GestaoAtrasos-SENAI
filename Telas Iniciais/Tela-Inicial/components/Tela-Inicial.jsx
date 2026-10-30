import iconeAluno from "../assets/aluno.png";
import iconeProfessor from "../assets/frof.png";
import iconeGestor from "../assets/gestor.png";

import "./Tela-Inicial.css";
import "./Tela-Inicial.css";

function TelaInicial() {
    const perfis = [
        {
            nome: "Aluno",
            descricao: "Acesse suas informações, turmas e muito mais",
            icone: "aluno",
        },
        {
            nome: "Professor",
            descricao: "Gerencie suas turmas, frequência e atividades.",
            icone: "professor",
        },
        {
            nome: "Gestor",
            descricao: "Acesse relatórios, indicadores e gerencie a escola",
            icone: "gestor",
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
                        <article className="cartao-perfil" key={perfil.nome}>
                            <div className={`icone-perfil ${perfil.icone}`}>
                                {perfil.icone === "aluno" && (
                                    <img src={iconeAluno} alt="Aluno" />
                                )}


                                {perfil.icone === "professor" && (
                                      <img src={iconeProfessor} alt="Professor" />
  )}


                                {perfil.icone === "gestor" && (
                                    <img src={iconeGestor} alt="Gestor" />
                                )}
                            </div>

                            <h2>{perfil.nome}</h2>
                            <p className="descricao-perfil">{perfil.descricao}</p>

                            <button
                                className="botao-entrar"
                                onClick={() =>
                                    alert(`Você selecionou o perfil ${perfil.nome}.`)
                                }
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
