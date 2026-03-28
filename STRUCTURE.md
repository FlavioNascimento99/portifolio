# Estrutura de Pastas - Portifolio Dev

Esta é a nova estrutura de organização do projeto, otimizada para escalabilidade e manutenção.

## 📁 Estrutura

```
portifolio/
├── src/
│   ├── components/
│   │   ├── common/              # Componentes reutilizáveis
│   │   │   ├── NeoComponents.tsx  # Componentes Neo (NeoCard, NeoButton, NeoBadge)
│   │   │   └── index.ts           # Exportações
│   │   ├── sections/            # Seções específicas
│   │   │   ├── TerminalChat.tsx   # Componente de chat (futura)
│   │   │   └── index.ts           # Exportações
│   │   ├── NeoComponents.tsx    # [LEGADO - remover após confirmação]
│   │   └── TerminalChat.tsx     # [LEGADO - remover após confirmação]
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useRandomPhoto.ts    # Hook para carregar foto aleatória
│   │   └── index.ts             # Exportações
│   │
│   ├── utils/                   # Funções utilitárias
│   │   └── [adicionar conforme necessário]
│   │
│   ├── services/                # Serviços e integrações
│   │   └── [adicionar conforme necessário]
│   │
│   ├── App.tsx                  # Componente raiz
│   ├── index.tsx                # Ponto de entrada
│   ├── constants.ts             # Constantes da aplicação
│   ├── types.ts                 # Tipos TypeScript
│   ├── vite.config.ts           # Configuração Vite
│   └── tsconfig.json            # Configuração TypeScript
│
├── public/
│   ├── assets/
│   │   └── person/              # Fotos aleatórias para o Hero Section
│   │       ├── foto_pessoal_espelho.jpg
│   │       ├── foto_selfie_banheiro.jpg
│   │       ├── foto_selfie_moletom.png
│   │       └── foto_selfie_servidor.jpg
│   └── [outros assets públicos]
│
└── [outros arquivos raiz]

```

## 🎯 Convenções

### Components
- **common/**: Componentes reutilizáveis em múltiplas seções (botões, cards, badges)
- **sections/**: Componentes que representam seções completas da página

### Hooks
- Prefix `use` obrigatório (ex: `useRandomPhoto`)
- Encapsulam lógica complexa reutilizável

### Utils
- Funções puras de apoio (formatting, parsing, etc.)
- Sem dependências do React

### Services
- Integrações com APIs externas
- Lógica de negócio complexa

## 🔄 Migrações Necessárias

1. **TerminalChat.tsx**: Mover de `components/` para `components/sections/`
2. **NeoComponents.tsx** (legado): Remover de `components/` após confirmação de que todos usam a versão em `components/common/`

## ✨ Recursos Implementados

### useRandomPhoto Hook
Carrega uma foto aleatória da pasta `public/assets/person` a cada reload da página.

**Uso:**
```typescript
import { useRandomPhoto } from './hooks';

const randomPhoto = useRandomPhoto();
// Retorna: '/assets/person/foto_selfie_moletom.png'
```

## 📝 Próximas Etapas

- [ ] Remover arquivos legados após confirmação
- [ ] Adicionar mais tipos em `types.ts` conforme necessário
- [ ] Expandir pasta `utils/` com funções auxiliares
- [ ] Documentar novos componentes conforme criados
