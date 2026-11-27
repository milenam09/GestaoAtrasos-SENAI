import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../css/acesso/LoginGestor.css";

import edificio from "../../assets/fundo.jpg";
import senai from "../../assets/logosenai.jpg";
import iconeGestor from "../../assets/icone-gestor.png";

function Gestor() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  function entrar(event) {
    event.preventDefault();

    if (!usuario.trim() || !senha.trim()) {
      alert("Preencha o usuário e a senha!");
      return;
    }

    navigate("/gestor/inicio");
  }

  return (
    <main
      className="login-pagina"
      style={{ backgroundImage: `url(${edificio})` }}
    >
      <div className="faixa faixa1"></div>
      <div className="faixa faixa2"></div>

      <section className="cartao-login">
        <img src={senai} alt="Logo SENAI" className="logo-senai" />

        <img
          src={iconeGestor}
          alt="Ícone do gestor"
          className="icone-login"
        />

        <h1>Gestor</h1>

        <p className="subtitulo">
          Demonstração: use qualquer usuário e senha fictícios.
        </p>

        <form onSubmit={entrar}>
          <label htmlFor="usuario">Usuário</label>

          <input
            id="usuario"
            type="text"
            placeholder="Digite seu CPF ou e-mail"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoComplete="username"
          />

          <label htmlFor="senha">Senha</label>

          <div className="campo-senha">
            <input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
            />

            <button
              type="button"
              className="mostrar-senha"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
            >
              {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Link to="/gestor/contato" className="esqueceu-senha">
            Precisa de ajuda? Contato da unidade
          </Link>

          <button type="submit" className="botao-login">
            Entrar
          </button>

          <p className="ou">ou</p>

          <button
            type="button"
            className="botao-google"
            onClick={() => navigate("/gestor/inicio")}
          >
            Entrar na demonstração
          </button>
        </form>
      </section>
    </main>
  );
}

export default Gestor;
