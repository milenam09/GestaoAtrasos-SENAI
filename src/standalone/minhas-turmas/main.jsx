import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../../index.css";
import TelaMinhasTurmas from "../../pages/MinhasTurmas/TelaMinhasTurmas";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TelaMinhasTurmas />
    </BrowserRouter>
  </StrictMode>,
);
