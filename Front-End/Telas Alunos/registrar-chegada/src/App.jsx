
import { useState } from "react";

import Menu from "./components/Menu/Menu";
import RegistrarAtraso from "./components/RegistrarChegada/RegistrarAtraso";

import "./App.css";

function App() {

  const [paginaAtiva, setPaginaAtiva] = useState("Registrar Chegada");

  return (
    <div className="layout">

      <Menu
        paginaAtiva={paginaAtiva}
        setPaginaAtiva={setPaginaAtiva}
      />

      <div className="conteudo-principal">

        {paginaAtiva === "Registrar Chegada" && (
          <RegistrarAtraso />
        )}

        {paginaAtiva === "Início" && (
          <h2>Bem-vindo, João Silva!</h2>
        )}

        {paginaAtiva === "Meus Atrasos" && (
          <h2>Meus Atrasos</h2>
        )}

        {paginaAtiva === "Ocorrências" && (
          <h2>Ocorrências</h2>
        )}

        {paginaAtiva === "Atestados" && (
          <h2>Atestados</h2>
        )}

        {paginaAtiva === "Perfil" && (
          <h2>Meu Perfil</h2>
        )}

      </div>

    </div>
  );
}

export default App;
