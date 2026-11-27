import {
  Home,
  FileText,
  Presentation,
  Users,
  ClipboardList,
  UserRound,
  LogOut,
} from "lucide-react";

const base = {
  size: 21,
  strokeWidth: 2.2,
};

export const IconeInicio = (props) => (
  <Home {...base} {...props} />
);

export const IconeAcolhimentos = (props) => (
  <FileText {...base} {...props} />
);

export const IconeMinhasTurmas = (props) => (
  <Presentation {...base} {...props} />
);

export const IconeAlunos = (props) => (
  <Users {...base} {...props} />
);

export const IconeRelatorios = (props) => (
  <ClipboardList {...base} {...props} />
);

export const IconePerfil = (props) => (
  <UserRound {...base} {...props} />
);

export const IconeSair = (props) => (
  <LogOut {...base} {...props} />
);