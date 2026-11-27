import { useState } from "react";
import "../../css/acesso/Gestor.css";
import edificio from "../../assets/fundo.jpg";
import senai from "../../assets/logosenai.jpg";
import iconeGestor from "../../assets/icone-gestor-e488924a.png";

function Gestor() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar(event) {
    event.preventDefault();

    if (!usuario || !senha) {
      alert("Preencha o usuário e a senha!");
      return;
    }

    alert("Login enviado!");
  }

  return (
    <main
      className="login-pagina"
      style={{ "--imagem-fundo": `url("${edificio}")` }}
    >
      <div className="faixa faixa-superior" />
      <div className="faixa faixa-inferior" />

      <section className="login-cartao">
        <img className="login-logo" src={senai} alt="SENAI" />

        <img
          className="login-icone"
          src={iconeGestor}
          alt="Ícone de professor"
        />

        <h1>GESTOR</h1>
        <p className="login-subtitulo">
          Faça login para acessar o seu painel
        </p>

        <form onSubmit={entrar}>
          <label htmlFor="usuario">Usuário</label>

          <input
            id="usuario"
            type="text"
            placeholder="Digite seu CPF"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <label htmlFor="senha">Senha</label>

          <div className="campo-senha">
            <input
              id="senha"
              type={senhaVisivel ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button
              type="button"
              className="mostrar-senha"
              onClick={() => setSenhaVisivel(!senhaVisivel)}
              aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
            >
              {senhaVisivel ? "🙈" : "👁"}
            </button>
          </div>

          <a className="esqueci-senha" href="#recuperar-senha">
            Esqueci minha senha
          </a>

          <button className="botao-entrar" type="submit">
            Entrar <span>→</span>
          </button>

          <div className="separador">
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <button
            className="botao-google"
            type="button"
            onClick={() =>
              alert("O acesso com Google precisa ser configurado.")
            }
          >
            <strong>G</strong>
            Acessar com o Google
          </button>
        </form>
      </section>
    </main>
  );
}

export default Gestor;