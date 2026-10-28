import { createFileRoute } from "@tanstack/react-router";
// @ts-ignore - JS page
import AtestadosPage from "../pages/AtestadosPage.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atestados e Justificativas | SENAI" },
      { name: "description", content: "Envie atestados e acompanhe o andamento de cada um." },
      { property: "og:title", content: "Atestados e Justificativas | SENAI" },
      { property: "og:description", content: "Envie atestados e acompanhe o andamento de cada um." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AtestadosPage,
});
