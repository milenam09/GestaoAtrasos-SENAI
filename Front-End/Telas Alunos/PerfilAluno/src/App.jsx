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
}

export default App;