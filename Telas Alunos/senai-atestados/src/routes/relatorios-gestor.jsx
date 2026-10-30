// Rota da tela "Relatórios (Visão do Gestor)": o endereço será /relatorios-gestor
import { createFileRoute } from '@tanstack/react-router'
import RelatoriosGestorPage from '../pages/RelatoriosGestorPage'

export const Route = createFileRoute('/relatorios-gestor')({
  component: RelatoriosGestorPage,
})
