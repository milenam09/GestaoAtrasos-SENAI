# SENAI - Gestão de Atrasos | Perfil do Professor

Implementação fiel da tela de **Perfil do Professor** com layout institucional do SENAI, desenvolvida com as melhores práticas de **React**, **JSX**, **CSS modular** e navegação com **React Router DOM**.

---

## 🛠️ Tecnologias Utilizadas

- **React 18** (Components, Hooks: `useState`, `useRef`, `useNavigate`, `useLocation`)
- **React Router DOM (v6)** (Navegação SPA entre páginas, `NavLink`, `Routes`, `Route`, `Navigate`)
- **CSS3** (Flexbox, CSS Grid, Variáveis CSS, Animações, Design Responsivo)
- **Vite** (Build tool ultrarrápido com Hot Module Replacement)
- **Lucide React & Custom SVG** (Ícones fiéis e estilizados no padrão SENAI vermelho `#e30613`)

---

## 📁 Estrutura de Pastas e Arquivos

```
PerfilProfessor/
├── index.html                 # Ponto de entrada HTML com fontes Inter e Montserrat
├── package.json               # Configurações e dependências do projeto
├── vite.config.js             # Configuração do Vite (porta 3000)
├── src/
│   ├── main.jsx               # Inicialização do React DOM
│   ├── App.jsx                # Configuração do React Router DOM e Layout Principal
│   ├── App.css                # Estilização global do layout da aplicação
│   ├── index.css              # Reset, variáveis globais de cor (SENAI) e tipografia
│   ├── components/
│   │   ├── Sidebar.jsx        # Barra lateral com logotipo SENAI, perfil e rotas ativas
│   │   ├── Sidebar.css        # Estilos da Sidebar (dark mode institucional #071526)
│   │   └── Icons.jsx          # Ícones vetoriais fiéis customizados em vermelho SENAI
│   └── pages/
│       ├── Perfil.jsx         # Tela principal de Perfil com dados pessoais e acadêmicos
│       ├── Perfil.css         # Estilização fiel do card de perfil, grid e rodapé
│       └── PlaceholderPage.jsx# Rotas secundárias para navegação completa do menu
```

---

## 🚀 Como Executar o Projeto

1. Certifique-se de estar na pasta do projeto:
   ```bash
   cd PerfilProfessor
   ```

2. As dependências já estão instaladas. Para iniciar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador em:
   ```
   http://localhost:3000
   ```

4. Para gerar o build de produção:
   ```bash
   npm run build
   ```

---

## ✨ Funcionalidades Implementadas

1. **Responsividade & Menu Hambúrguer (Breakpoint `<= 425px`):**
   - **Telas `<= 425px`:**
     - A barra lateral fixa é ocultada.
     - Uma barra superior móvel (*Top Header*) é exibida com o emblema **SENAI** e o botão de menu hambúrguer.
     - Ao clicar no hambúrguer, o menu lateral desliza suavemente em formato de gaveta (*Drawer*) com fundo escurecido (*Backdrop*).
     - O menu possui botão de fechar (`X`) e fecha automaticamente ao clicar em qualquer item de navegação ou no fundo.
     - Cards de dados pessoais, acadêmicos e modais se ajustam perfeitamente à largura da tela.
   - **Telas `> 425px`:**
     - Layout desktop original mantido com barra lateral fixa à esquerda e conteúdo espaçoso.
   - Emblema vermelho **SENAI** no topo com tipografia em itálico.
   - Resumo rápido do usuário (`Mariana`, `Professor`).
   - Links com `NavLink` para navegação dinâmica com indicador ativo em vermelho (`Início`, `Acolhimentos`, `Minhas Turmas`, `Alunos`, `Relatórios` e `Perfil`).
   - Botão **Sair** no rodapé com confirmação interativa.

2. **Cabeçalho da Página:**
   - Botão interativo de voltar (`←`) com texto em negrito `Meu perfil`.
   - Subtítulo explicativo: *"Confira seus dados pessoais e personalize suas informações no sistema."*

3. **Card Central de Perfil:**
   - Avatar com silhouette e botão **"Editar foto"** funcional (permite fazer upload de fotos reais com preview dinâmico).
   - Grade com **Dados Pessoais**:
     - Nome completo: `Mariana Costa`
     - Data de nascimento: `18/06/1988`
     - Email: `mariana.costa@gmail.com`
     - Telefone: `11 981775155`
   - Grade com **Dados Acadêmicos**:
     - Turma: `2 A - Desenvolvimento de Sistemas`
     - Turno: `Integral`
     - Período: `Ativo`
     - Modelo de ensino: `Técnico`
   - Rodapé com chamada: *"Precisa atualizar seus dados ? Entre em contato com a nossa secretaria da unidade"*.
   - Botão **"Ver contato"** com modal interativo detalhando:
     - WhatsApp: `(11) 4225-2001` (com link direto)
     - Telefone: `(11) 4225-2000` (com discagem direta)
     - E-mail: `informatica@sp.senai.br` (com link mailto)
     - Horários de funcionamento detalhados:
       - Segunda-feira: das 8h às 18h
       - Terça a sexta-feira: das 8h às 19h
       - Sábados: das 9h às 16h
