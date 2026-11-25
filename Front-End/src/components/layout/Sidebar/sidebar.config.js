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
    { label: "Início", to: null, icon: House, exact: true },
    { label: "Registrar chegada", to: null, icon: QrCode },
    { label: "Meus Atrasos", to: null, icon: Clock },
    { label: "Ocorrências", to: null, icon: ClipboardList },
    { label: "Atestados", to: null, icon: FileText },
    { label: "Perfil", to: null, icon: UserRound, primary: true },
  ],
  professor: [
    { label: "Início", to: null, icon: House, exact: true },
    { label: "Acolhimentos", to: null, icon: ClipboardList, exact: true },
    { label: "Minhas Turmas", to: null, icon: Users, exact: true, primary: true },
    { label: "Alunos", to: null, icon: BookOpen },
    { label: "Relatórios", to: null, icon: ChartColumn },
    { label: "Perfil", to: null, icon: UserRound, exact: true, primary: true },
  ],
};

export const sidebarFooterItem = {
  label: "Sair",
  to: null,
  icon: LogOut,
};
