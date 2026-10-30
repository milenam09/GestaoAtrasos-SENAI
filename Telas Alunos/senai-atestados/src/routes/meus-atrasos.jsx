// Rota da tela "Meus Atrasos": o endereço será /meus-atrasos
import { createFileRoute } from '@tanstack/react-router'
import MeusAtrasosPage from '../pages/MeusAtrasosPage'

export const Route = createFileRoute('/meus-atrasos')({
  component: MeusAtrasosPage,
})