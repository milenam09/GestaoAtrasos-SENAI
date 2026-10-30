# Tela de Login do Professor - SENAI

Implementação fiel da tela de login do professor para o sistema SENAI utilizando **HTML**, **React** e **CSS**.

---

## 🚀 Como Executar o Projeto

1. Abra o terminal nesta pasta (`LoginProfessor`):
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador no endereço indicado (geralmente `http://localhost:5173`).

4. Para gerar a build de produção:
   ```bash
   npm run build
   ```

---

## 🎨 Características e Funcionalidades

- **Design Fiel à Imagem**:
  - Logo oficial do **SENAI** vetorizado em SVG com proporções e detalhes gráficos precisos.
  - Ícone de apresentação do **Professor** ministrando aula.
  - Tipografia institucional com títulos destacados e subtítulos informativos.
  - Fundo com prédio arquitetônico e as faixas geométricas diagonais vermelhas nos cantos.
  - Cartão centralizado com sombras suaves e cantos arredondados.
- **Interatividade & Usabilidade**:
  - **Máscara automática de CPF**: Formata dinamicamente enquanto digita no padrão `000.000.000-00`.
  - **Visualização de senha**: Botão de alternância (olho) para exibir ou ocultar a senha digitada.
  - **Validações amigáveis**: Alerta caso os campos estejam vazios ou o CPF incompleto.
  - **Feedback de carregamento**: Efeito de *spinner* e animação ao submeter o formulário.
  - **Modal de recuperação de senha**: Ao clicar em *"Esqueci minha senha"*, abre uma janela modal para redefinição de acesso.
  - **Botão institucional**: Opção de acesso rápido via Google institucional.
  - **Totalmente Responsivo**: Layout otimizado para celulares, tablets e monitores desktop.

---

## 📁 Estrutura de Arquivos

```
LoginProfessor/
├── index.html                     # Estrutura HTML base e fontes Google Fonts
├── package.json                   # Dependências e scripts do projeto (Vite, React, Lucide)
├── vite.config.js                 # Configuração do Vite com plugin React
├── src/
│   ├── main.jsx                   # Ponto de entrada da aplicação React
│   ├── App.jsx                    # Componente principal da tela de Login
│   ├── App.css                    # Estilização CSS completa da tela e do cartão
│   ├── index.css                  # Estilos globais e reset de CSS
│   ├── assets/
│   │   └── screen-reference.png   # Imagem de referência e textura do fundo
│   └── components/
│       ├── SenaiLogo.jsx          # Vetor SVG oficial do logo SENAI
│       ├── TeacherIcon.jsx        # Vetor SVG do ícone do professor
│       ├── GoogleIcon.jsx         # Vetor SVG do ícone da Google
│       └── LoginBackground.jsx    # Componente do plano de fundo e vinhetas
```
