# Alunos do Professor - SENAI

Módulo de gestão e consulta de alunos das turmas e histórico de ocorrências e atrasos.

## Estrutura do Projeto

```
src/
  components/
    Icons.jsx       # Componentes de ícones SVG reutilizáveis
    Menu.jsx        # Menu lateral estilizado baseado no layout SENAI
    Menu.css        # Estilos específicos do menu lateral
  pages/
    Alunos.jsx      # Tela principal de consulta de alunos e histórico
    Alunos.css      # Estilização da tabela, filtros e paginação
    Perfil.jsx      # Página de Perfil
    Perfil.css      # Estilos do Perfil
    Contato.jsx     # Página de Contato
    Contato.css     # Estilos de Contato
    PlaceholderPage.jsx # Página de suporte para rotas/navegação
    PlaceholderPage.css # Estilos da página genérica
  App.jsx           # Layout principal e gerenciamento da visualização
  App.css           # Estilização do container da aplicação
  index.css         # Variáveis globais e reset CSS
  main.jsx          # Ponto de entrada React
```

## Como executar

1. `npm install`
2. `npm run dev`
