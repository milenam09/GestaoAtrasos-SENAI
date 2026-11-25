
import { useState } from "react";

import Menu from "./components/Menu/Menu";
import RegistrarAtraso from "./components/RegistrarChegada/RegistrarAtraso";
import GerarQrcode from "./components/GerarQrcode/GerarQrcode";

import "./App.css";

function App() {

  const [paginaAtiva, setPaginaAtiva] = useState("Início");

  return (
    <div className="App">

      <Menu
        paginaAtiva={paginaAtiva}
        setPaginaAtiva={setPaginaAtiva}
      />

      <div className="conteudo-principal">

        {paginaAtiva === "Registrar Chegada" && (
          <RegistrarAtraso />
        )}

        {paginaAtiva === "Gerar QR Code" && (
          <GerarQrcode />
        )}

        {paginaAtiva === "Início" && (
          <h2>Bem-vindo ao sistema!</h2>
        )}

        {paginaAtiva !== "Início" &&
          paginaAtiva !== "Registrar Chegada" &&
          paginaAtiva !== "Gerar QR Code" &&
          paginaAtiva !== "Sair" && (
            <h2>{paginaAtiva}</h2>
        )}

      </div>

    </div>
  );
}

export default App;
