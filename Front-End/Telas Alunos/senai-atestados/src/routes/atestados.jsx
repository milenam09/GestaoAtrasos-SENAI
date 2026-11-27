
import { createFileRoute } from '@tanstack/react-router'
import AtestadosPage from '../pages/AtestadosPage'

export const Route = createFileRoute('/atestados')({
  component: AtestadosPage,
})
export default AtestadosPage;