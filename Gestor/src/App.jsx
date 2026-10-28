
import { useState } from "react";
import "./style.css";
import logoSenai from "../assets/logosenai.jpg";
import iconePessoa from "../assets/person.jpg";

export default function App() {
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mensagem, setMensagem] = useState("");

    function formatarCPF(valor) {
        valor = valor.replace(/\D/g, "").slice(0, 11);
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return valor;
    }

    function entrar(event) {
        event.preventDefault();
        setMensagem("Tela funcionando! Falta conectar o sistema de login.");
    }

    return (
        <main className="pagina">


            <section className="fundo-login">


                <div className="cartao-login">


                    <div className="header-login">
                        <img src={logoSenai} alt="Logo SENAI" className="logo-senai" />

                        <div className="icone-usuario">
                            <img src={iconePessoa} alt="Ícone do Usuário" className="icone-pessoa" />
                     </div>

                        <h2>GESTOR</h2>
                        <p>Faça login para acessar o seu painel</p>
                    </div>

                    <form onSubmit={entrar}>
                        <label htmlFor="cpf">Usuário</label>
                        <input
                            id="cpf"
                            type="text"
                            placeholder="Digite seu CPF"
                            value={cpf}
                            onChange={(e) => setCpf(formatarCPF(e.target.value))}
                            required
                        />

                        <label htmlFor="senha">Senha</label>
                        <div className="campo-senha">
                            <input
                                id="senha"
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        
                        </div>

                        <button
                            type="button"
                            className="esqueci"
                            onClick={() =>
                                setMensagem("Procure o administrador para recuperar sua senha.")
                            }
                        >
                            Esqueci minha senha
                        </button>

                        <button type="submit" className="botao-entrar">
                            Entrar <span>➜</span>
                        </button>
                    </form>

                    <div className="separador">
                        <span></span> ou <span></span>
                    </div>

                    <button
                        type="button"
                        className="botao-google"
                        onClick={() =>
                            setMensagem("O acesso com Google ainda precisa ser configurado.")
                        }
                    >
                        <strong>G</strong> Acessar com a Google
                    </button>

                    <p className="mensagem" role="status">{mensagem}</p>
                </div>
            </section>
        </main>
    );
}
