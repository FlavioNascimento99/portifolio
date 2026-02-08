# 👨‍💻 NASCIMENTO.DEV - Portfólio

Um portfólio web em estilo **neobrutal** showcaseando meus projetos e habilidades como desenvolvedor fullstack.

## 🎨 Visual

![Neobrutal Design](https://img.shields.io/badge/Style-Neobrutal-black?style=flat-square&logo=react)
![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)

## 🚀 Características

- ⚡ **React 19** com TypeScript
- 🎯 **Design Responsivo** otimizado para mobile
- 🎨 **Estilo Neobrutal** com cores vibrantes e borders espessos
- 💬 **Chat IA** integrado (Gemini) **[EM DESENVOLVIMENTO]**
- 📧 **Formulário de Contato** com Formspree
- 🔗 **Links diretos** para repositórios GitHub
- ✨ **Animações suaves** e interações polidas

## 📋 Seções

### About
Introdução com informações sobre quem sou e minhas principais tecnologias.

### Projects (Deployed_Modules)
4 projetos principais showcaseando experiência em:
- **VERITAS** - Aplicação Java/Spring Boot para gestão de processos universitários
- **Czar Management** - Sistema de gerenciamento em Ruby on Rails
- **ST Diagnósticos** - Simulação de sistema com Design Patterns
- **Shoepee** - App mobile Kotlin com Firebase

Cada projeto é **clicável** e leva diretamente ao repositório GitHub.

### Skills (O QUE SEI)
- Com o que escrevo (linguagens)
- O que acelera meus projetos (frameworks)
- Como guardo meus dados (databases)
- Ferramentas que domino

### Contact (Execute_Contact)
Formulário de contato funcional com feedback visual.

## 🛠️ Stack Técnico

```
Frontend:
├── React 19.2.1
├── TypeScript 5.8.2
├── Tailwind CSS
├── Vite 6.2.0
└── Lucide React (ícones)

Extras:
├── @google/genai (Chat IA)
└── Formspree (Email)
```

## 📦 Como Usar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone ou baixe o projeto
cd java.dev_brutal_portfolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

### Build para Produção

```bash
npm run build
npm run preview
```

## ⚙️ Configuração

### Formspree (Email)
1. Vá em [formspree.io](https://formspree.io/)
2. Crie uma conta e um formulário
3. Pegue o ID do formulário
4. Atualize a URL em [App.tsx](App.tsx#L35):
```typescript
const response = await fetch('https://formspree.io/f/SEU_ID_AQUI', {
```

### Gemini API (Chat)
1. Gere uma API Key em [ai.google.dev](https://ai.google.dev/)
2. Adicione em [geminiService.ts](services/geminiService.ts)

## 📁 Estrutura

```
src/
├── App.tsx              # Componente principal
├── constants.ts         # Dados estáticos (projetos, skills)
├── types.ts             # TypeScript interfaces
├── index.tsx            # Entry point
├── components/
│   ├── NeoComponents.tsx # Componentes reutilizáveis
│   ├── TerminalChat.tsx  # Chat IA flutuante
│   └── ...
├── services/
│   └── geminiService.ts  # Integração Gemini
└── ...
```

## 🎯 Contato

- **GitHub**: [@FlavioNascimento99](https://github.com/FlavioNascimento99)
- **LinkedIn**: [@0xnascimento](https://www.linkedin.com/in/0xnascimento/)
- **Email**: contato.nascimento.dev@gmail.com

## 📄 Licença

Este projeto é de código aberto e disponível sob a MIT License.

---

**Feito com ❤️ e muito café** ☕
