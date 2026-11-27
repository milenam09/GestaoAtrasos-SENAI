
import { createFileRoute } from '@tanstack/react-router'
import RelatoriosGestorPage from '../pages/RelatoriosGestorPage'

export const Route = createFileRoute('/relatorios-gestor')({
  component: RelatoriosGestorPage,
})
