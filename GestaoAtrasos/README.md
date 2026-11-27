# Gestão de Atrasos — SENAI

Frontend único em React e Vite. Execute os comandos nesta pasta (GestaoAtrasos).

## Executar

- npm install: instala as dependências.
- npm run dev: inicia a aplicação.
- npm run build: gera a versão de produção.
- npm run lint: verifica o código.
- npm run check:sources: confere os imports, as dependências e a compilação de todos os módulos, inclusive as telas ainda não utilizadas nas rotas.

## Organização

    src/
      App.jsx
      main.jsx
      pages/
        acesso/
        aluno/
        professor/
        gestor/
      components/
        layout/Sidebar/
        navigation/
        ui/
      css/
        global/
        acesso/
        aluno/
        professor/
        gestor/
      assets/
      data/
      services/
      hooks/
      lib/

As páginas estão separadas por perfil; os estilos ficam em css, os menus em components/navigation e as imagens em assets. Há somente um package.json, um ponto de entrada e uma configuração do Vite.

A consolidação reuniu as fontes antes espalhadas em Front-End, PerfilGestor, Telas Alunos, Telas AQV, Telas Iniciais, Telas Professor e AlunosDoProfessor. Cópias equivalentes foram unificadas e os imports foram atualizados. Versões com conteúdo diferente foram preservadas; nomes repetidos ficam em subpastas variantes. Essas versões não são adicionadas automaticamente às rotas da aplicação.

O relatório docs/consolidacao-frontend.json relaciona cada arquivo antigo ao destino atual e identifica a cópia de segurança das fontes. Projetos de exemplo do Vite, componentes de biblioteca não utilizados, configurações repetidas, builds e instalações de dependências dos projetos antigos foram removidos.

## Demonstração do aluno

Na tela de login do aluno, escolha Entrar na demonstração. Os registros fictícios ficam no armazenamento deste navegador (senai-demo-v1).

O fluxo inclui início, leitura real ou simulada de QR Code, cadastro e histórico de atrasos, ocorrências com filtros e detalhes, atestados, perfil e contato. O envio de documentos é simulado: apenas seus metadados são armazenados.

As telas e os serviços importados dos protótipos foram preservados para integração posterior. Alguns serviços ainda contêm endereços de API de exemplo; a consolidação não ativa nem configura essas integrações.
