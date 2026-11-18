import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../../index.css";
import TelaInicial from "../../pages/TelaInicial/TelaInicial";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TelaInicial />
    </BrowserRouter>
  </StrictMode>,
);
