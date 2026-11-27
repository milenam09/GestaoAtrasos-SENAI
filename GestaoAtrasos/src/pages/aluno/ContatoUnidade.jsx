export default function ContatoUnidade({ onVoltar }) {
    return (
        <div className="pagina-contato">

            <header className="cabecalho-contato">
                <h1>
                    <button onClick={onVoltar} className="botao-voltar">
                        <img src={new URL("../../assets/seta.png", import.meta.url).href} alt="Voltar" />
                    </button>
                    Contato da Unidade
                </h1>

                <p>
                    Confira os canais de atendimento da nossa secretaria.
                </p>
            </header>

            <section className="cartao-contato">

                <h2>Secretaria escolar</h2>

                <p className="descricao-contato">
                    Precisa atualizar seus dados ou tirar alguma dúvida?
                    Entre em contato com a nossa equipe.
                </p>

                <div className="item-contato">
                    <span>📞</span>
                    <div>
                        <strong>Telefone</strong>
                        <p>(12) 0000-0000</p>
                    </div>
                </div>

                <div className="item-contato">
                    <span>✉️</span>
                    <div>
                        <strong>E-mail</strong>
                        <p>secretaria@unidade134.com.br</p>
                    </div>
                </div>

                <div className="item-contato">
                    <span>📍</span>
                    <div>
                        <strong>Endereço</strong>
                        <p>Unidade 1.34</p>
                    </div>
                </div>

                <div className="item-contato">
                    <span>🕒</span>
                    <div>
                        <strong>Horário de atendimento</strong>
                        <p>Consulte a secretaria da unidade.</p>
                    </div>
                </div>

            </section>
        </div>
    );
}
