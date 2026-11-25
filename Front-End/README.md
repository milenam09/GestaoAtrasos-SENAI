# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

# Gestão de Atrasos SENAI

## Visão geral

Este projeto foi reorganizado para separar o menu lateral em um componente próprio, reutilizável e profissional: `Sidebar`.

A estrutura mantém a identidade visual original do menu, com:
- fundo azul escuro
- logo do SENAI
- perfil do usuário
- itens do menu com destaque ativo em vermelho
- layout fixo em desktop
- drawer em mobile

## Estrutura de arquivos

```text
src/
├── components/
│   └── layout/
│       └── Sidebar/
│           ├── Sidebar.jsx
│           ├── SidebarItem.jsx
│           ├── Sidebar.module.css
│           ├── sidebar.config.js
│           ├── useSidebar.js
│           └── index.js
├── pages/
│   ├── Acolhimento/
│   ├── MinhasTurmas/
│   ├── TelaInicial/
│   └── TelaInicialAluno/
├── App.jsx
└── main.jsx
```

## Como adicionar, remover ou editar itens do menu

Os itens do menu ficam em `src/components/layout/Sidebar/sidebar.config.js`.

Exemplo:

```js
export const sidebarItems = {
  aluno: [
    { label: "Início", to: "/", icon: House, exact: true },
    { label: "Perfil", to: "/aluno", icon: UserRound },
  ],
  professor: [
    { label: "Acolhimentos", to: "/acolhimento", icon: ClipboardList },
  ],
};
```

Para adicionar um item:
1. importe o ícone desejado do `lucide-react`
2. adicione o objeto no array correspondente
3. defina `to` com a rota da página
4. `label` define o texto exibido
5. `exact: true` pode ser usado para rota inicial

Para remover ou editar: basta alterar o array relevante.

## Props e comportamento

O componente principal é `Sidebar` e aceita:

```jsx
<Sidebar role="aluno" />
<Sidebar role="professor" />
```

### Desktop
- menu fixo lateral
- largura padrão de 270px
- recolhimento com botão de ícone no topo
- estado persistido via `localStorage`
- item ativo detectado pela rota atual

### Mobile
- o menu passa a funcionar como drawer
- overlay escuro aparece ao abrir o menu
- clique fora fecha o painel
- `Esc` fecha o painel
- navegação em tela menor continua acessível

## Como customizar estilos

Os estilos estão em `src/components/layout/Sidebar/Sidebar.module.css`.

Tokens disponíveis em `:root`:

```css
:root {
  --sidebar-bg: #071b2b;
  --sidebar-bg-strong: #0c2232;
  --sidebar-text: #ffffff;
  --sidebar-muted: #dbe5ee;
  --sidebar-accent: #ff2d2d;
  --sidebar-border: rgba(255, 255, 255, 0.08);
}
```

Esses valores preservam a identidade do visual original e permitem ajuste sem quebrar o layout.

## Changelog

### Separação do sidebar
- O menu lateral foi extraído de `Menu.jsx` e transformado em um módulo independente em `src/components/layout/Sidebar`.
- A lógica de dados do menu foi movida para `sidebar.config.js`.
- A estrutura de apresentação foi isolada em `Sidebar.jsx`/`SidebarItem.jsx`.

### Bugs corrigidos
- ausência de arquivo de composição reutilizável e acoplamento com as páginas
- item ativo inflexível e menos robusto
- mobile sem overlay e sem teclado `Esc`
- ausência de persistência de recolhimento
- riscos de conflito de CSS resolvidos com módulos CSS

### Melhorias aplicadas
- acessibilidade via `aria-label`, `aria-expanded`, `aria-current`
- suporte a drawer mobile
- controle de foco e estado visível
- ajuste do componente para manter fidelidade visual ao original

## Pontos de atenção
- Para telas muito pequenas, o menu continua como drawer, preservando o layout principal.
- O projeto usa `lucide-react` para ícones, então alterações de ícones devem ser feitas no `sidebar.config.js`.
- A rota inicial e os links de role devem continuar alinhados com as páginas existentes.

## Próximos passos
- acrescentar submenus reais, caso a área administrativa cresça
- criar layout global (`Layout`) para centralizar sidebar e conteúdo
- migrar para TypeScript se o projeto evoluir em complexidade

## Validação

O projeto foi validado com build do Vite:

```bash
npm run build
```

Resultado: build concluído com sucesso.
