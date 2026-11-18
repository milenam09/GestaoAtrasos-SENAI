import {
  BookOpen,
  ChartColumn,
  ClipboardList,
  Clock,
  FileText,
  House,
  LogOut,
  QrCode,
  UserRound,
  Users,
} from "lucide-react";

export const sidebarItems = {
  aluno: [
    { label: "Início", to: "/", icon: House, exact: true },
    { label: "Registrar chegada", to: "/aluno", icon: QrCode },
    { label: "Meus Atrasos", to: "/aluno", icon: Clock },
    { label: "Ocorrências", to: "/aluno", icon: ClipboardList },
    { label: "Atestados", to: "/aluno", icon: FileText },
    { label: "Perfil", to: "/aluno", icon: UserRound, primary: true },
  ],
  professor: [
    { label: "Início", to: "/", icon: House, exact: true },
    { label: "Acolhimentos", to: "/acolhimento", icon: ClipboardList, exact: true },
    { label: "Minhas Turmas", to: "/minhas-turmas", icon: Users, exact: true, primary: true },
    { label: "Alunos", to: "/minhas-turmas", icon: BookOpen },
    { label: "Relatórios", to: "/minhas-turmas", icon: ChartColumn },
    { label: "Perfil", to: "/aluno", icon: UserRound, exact: true, primary: true },
  ],
};

export const sidebarFooterItem = {
  label: "Sair",
  to: "/",
  icon: LogOut,
};
