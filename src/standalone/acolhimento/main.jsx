import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../../index.css";
import TelaAcolhimentos from "../../pages/Acolhimento/TelaAcolhimentos";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TelaAcolhimentos />
    </BrowserRouter>
  </StrictMode>,
);
