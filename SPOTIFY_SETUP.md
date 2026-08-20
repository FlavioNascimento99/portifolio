# Spotify Widget para Portfólio

Este componente mostra a música que você está ouvindo no Spotify em tempo real.

## Configuração

### 1. Criar App no Spotify Developer Dashboard

1. Acesse [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Clique em "Create App"
3. Preencha o nome e descrição
4. Adicione `http://localhost:3000` como Redirect URI
5. Copie o `Client ID` e `Client Secret`

### 2. Obter Refresh Token

1. Acesse esta URL substituindo `CLIENT_ID`:
```
https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-recently-played
```

2. Autorize o acesso
3. Copie o `code` da URL de redirecionamento
4. Troque o `code` por um `refresh_token` usando a API do Spotify

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

### 4. Deploy da Serverless Function

#### Opção 1: Vercel
1. Instale o Vercel CLI: `npm i -g vercel`
2. Execute `vercel` na raiz do projeto
3. Configure as variáveis de ambiente no painel do Vercel

#### Opção 2: Netlify
1. Crie um arquivo `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/spotify"
  to = "/.netlify/functions/spotify"
  status = 200
```

2. Deploy no Netlify
3. Configure as variáveis de ambiente no painel

### 5. Uso no Portfólio

O componente já está integrado ao `App.tsx`. Ele aparece como um widget flutuante no canto inferior direito.

## Funcionalidades

- Mostra a música atual tocando no Spotify
- Atualiza automaticamente a cada 30 segundos
- Exibe capa do álbum, nome da música e artista
- Permite abrir a música no Spotify
- Animação pulsante quando está tocando
- Tooltip com detalhes ao clicar

## Personalização

### Alterar Posição
Modifique as classes CSS no componente:
```tsx
className="fixed bottom-6 right-6 z-50"
```

### Alterar Intervalo de Atualização
Passe a prop `refreshInterval` em milissegundos:
```tsx
<SpotifyWidget refreshInterval={60000} /> // 1 minuto
```

### Alterar Estilos
O componente usa as classes do seu sistema de design neo-brutalism. Você pode personalizar as cores modificando as variáveis CSS.

## Estrutura de Arquivos

```
portifolio/
├── api/
│   └── spotify.ts          # Serverless function
├── components/
│   └── common/
│       └── SpotifyWidget.tsx # Componente React
├── hooks/
│   └── useSpotify.ts       # Hook personalizado
└── .env.example            # Exemplo de variáveis de ambiente
```

## Solução de Problemas

### Widget não aparece
1. Verifique se a serverless function está deployada
2. Verifique se as variáveis de ambiente estão configuradas
3. Verifique o console do navegador para erros

### Música não atualiza
1. Verifique se o refresh_token está válido
2. Verifique se as permissões do Spotify estão corretas
3. Verifique se a API está retornando dados

### Erro de CORS
1. Verifique se a serverless function está configurada corretamente
2. Verifique se o domínio está permitido no Spotify Dashboard
