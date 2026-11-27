import "../../../css/aluno/variantes/PerfilAluno-perfilaluno.css";

export default function PerfilAluno() {
    return (
        <div className="pagina-perfil">

            {/* MENU LATERAL */}
            <aside className="menu-lateral">

                <img
                    src={new URL("../../../assets/logo.png", import.meta.url).href}
                    alt="Início"
                    className="logo-senai"
                />
                <div className="usuario-menu">
                    <div className="avatar-pequeno">
                        <img
                            src={new URL("../../../assets/person2.png", import.meta.url).href}
                            alt="Início"
                            className="icone-imagem"
                        />
                    </div>

                    <div>
                        <p>João Silva</p>
                        <small>Aluno</small>
                    </div>
                </div>

                <nav className="navegacao">

                    <a href="#" className="item-menu">
                        <img
                            src={new URL("../../../assets/home-jpg.png", import.meta.url).href}
                            alt="Início"
                            className="icone-imagem"
                        />
                        <span>Início</span>
                    </a>

                    <a href="#" className="item-menu">
                        <img
                            src={new URL("../../../assets/qrcode.png", import.meta.url).href}
                            alt="Início"
                            className="icone-imagem"
                        />
                        <span>Registrar atraso</span>
                    </a>

                    <a href="#" className="item-menu">
                        <img
                            src={new URL("../../../assets/frame.png", import.meta.url).href}
                            alt="Início"
                            className="icone-imagem"
                        />
                        <span>Meus Atrasos</span>
                    </a>

                    <a href="#" className="item-menu">
                        <img
                            src={new URL("../../../assets/clipboard.png", import.meta.url).href}
                            alt="Início"
                            className="icone-imagem"
                        />
                        <span>Ocorrências</span>
                    </a>

                    <a href="#" className="item-menu">
                        <img
                            src={new URL("../../../assets/file.png", import.meta.url).href}
                            alt="Início"
                            className="icone-imagem"
                        />
                        <span>Atestados</span>
                    </a>

                    <a href="#" className="item-menu ativo">
                        <img
                            src={new URL("../../../assets/person.png", import.meta.url).href}
                            alt="Início"
                            className="icone-imagem"
                        />
                        <span>Perfil</span>
                    </a>

                </nav>

                <a href="#" className="botao-sair">
                    <img
                        src={new URL("../../../assets/sair.png", import.meta.url).href}
                        alt="Início"
                        className="icone-imagem"
                    />
                    <span>Sair</span>
                </a>

            </aside>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="conteudo-principal">

                <header className="cabecalho">
                    <h1>
                        <img
                            src={new URL("../../../assets/seta.png", import.meta.url).href}
                            alt="Início"
                            className="icone-imagem"
                        />
                        Meu perfil
                    </h1>

                    <p>
                        Confira seus dados pessoais e personalize suas informações no
                        sistema.
                    </p>
                </header>

                <section className="cartao-perfil">

                    {/* INFORMAÇÕES DO ALUNO */}
                    <div className="identificacao-aluno">

                        <img
                            src={new URL("../../../assets/person2.png", import.meta.url).href}
                            alt="Início"
                            className="icone-imagem"
                        />

                        <div className="nome-aluno">
                            <h2>João Silva</h2>
                            <p>Aluno</p>
                        </div>
                        <button className="botao-editar">
                            <img
                                src={new URL("../../../assets/camera.png", import.meta.url).href}
                                alt="Início"
                                className="icone-imagem"
                            />
                            <span>Editar foto</span>
                        </button>

                    </div>

                    {/* QUADROS DE INFORMAÇÕES */}
                    <div className="informacoes">

                        <div className="quadro-informacao">

                            <h3>Dados pessoais</h3>

                            <div className="campo">
                                <strong>Nome completo</strong>
                                <p>João Silva</p>
                            </div>

                            <div className="campo">
                                <strong>Data de nascimento</strong>
                                <p>01/09/2008</p>
                            </div>

                            <div className="campo">
                                <strong>Email</strong>
                                <p>joao.silva@gmail.com</p>
                            </div>

                            <div className="campo">
                                <strong>Telefone</strong>
                                <p>12 99917-8195</p>
                            </div>

                        </div>

                        <div className="quadro-informacao">

                            <h3>Dados acadêmicos</h3>

                            <div className="campo">
                                <strong>Turma</strong>
                                <p>3 A - Desenvolvimento de Sistemas</p>
                            </div>

                            <div className="campo">
                                <strong>Turno</strong>
                                <p>Integral</p>
                            </div>

                            <div className="campo">
                                <strong>Período</strong>
                                <p>Ativo</p>
                            </div>

                            <div className="campo">
                                <strong>Modelo de ensino</strong>
                                <p>Técnico</p>
                            </div>

                        </div>

                    </div>

                    {/* AVISO NO RODAPÉ */}
                    <div className="aviso-dados">

                        <div className="icone-ajuda">?</div>

                        <div className="texto-aviso">
                            <strong>Precisa atualizar seus dados?</strong>
                            <p>
                                Entre em contato com a nossa secretaria da unidade.
                            </p>
                        </div>

                        <button className="botao-contato">
                            Ver contato
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}