
import { createFileRoute } from '@tanstack/react-router'
import RelatoriosPage from '../pages/RelatoriosPage'

export const Route = createFileRoute('/relatorios')({
  component: RelatoriosPage,
})
