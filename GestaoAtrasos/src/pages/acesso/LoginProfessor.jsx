import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../css/acesso/LoginGestor.css";

import edificio from "../../assets/fundo.jpg";
import senai from "../../assets/logosenai.jpg";
import iconeProfessor from "../../assets/icone-professor.png";

function TelaInicialProfessor() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  function entrar(event) {
    event.preventDefault();

    if (!email.trim() || !senha.trim()) {
      alert("Preencha o usuário e a senha!");
      return;
    }

    navigate("/professor/inicio");
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
          src={iconeProfessor}
          alt="Ícone do professor"
          className="icone-login"
        />

        <h1>Professor</h1>

        <p className="subtitulo">
          Demonstração: use qualquer e-mail e senha fictícios.
        </p>

        <form onSubmit={entrar}>
          <label htmlFor="email">Usuário</label>

          <input
            id="email"
            type="text"
            placeholder="Digite seu e-mail ou matrícula"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <Link to="/professor/contato" className="esqueceu-senha">
            Precisa de ajuda? Contato da unidade
          </Link>

          <button type="submit" className="botao-login">
            Entrar
          </button>

          <p className="ou">ou</p>

          <button
            type="button"
            className="botao-google"
            onClick={() => navigate("/professor/inicio")}
          >
            Entrar na demonstração
          </button>
        </form>
      </section>
    </main>
  );
}

export default TelaInicialProfessor;
