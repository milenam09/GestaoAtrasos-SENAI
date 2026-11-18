<<<<<<< HEAD
import PerfilAluno from "../components/PerfilAluno";

function App() {
  return (
    <div>
      <PerfilAluno />
    </div>
  );
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PerfilAluno from "../components/PerfilAluno";
import Contato from "../pages/Contato";

function App() {
    return (
        <BrowserRouter>
          <Routes>
    <Route path="/" element={<PerfilAluno />} />

    <Route path="/perfil" element={<PerfilAluno />} />

    <Route path="/contato" element={<Contato />} />
</Routes>
        </BrowserRouter>
    );
>>>>>>> 92c8051d9b036c39f4bb830f9a8340fc64c2adc0
}

export default App;