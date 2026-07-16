# Steam Find React - Documentação do Projeto

Bem-vindo à documentação oficial do **Steam Find React**, um aplicativo web estilo Tinder (Single Page Application) projetado para ajudar os usuários a descobrirem novos jogos utilizando dados reais da API do **RAWG**.

## Stack Tecnológica
- **Core**: React 18 (com JSX) e Vite
- **Estilização**: Tailwind CSS com suporte nativo a Tema Claro e Escuro
- **Ícones**: Lucide React
- **Fonte de Dados**: RAWG API (rawg.io)

## Funcionalidades principais
1. **Swipe de Jogos**: Exibição de cards centrais e interatividade através dos botões Like (Amei) e Dislike (Não curti) com transições de tela instantâneas.
2. **Acessibilidade por Teclado**: Atalhos de teclado (Seta Direita para dar Like e Seta Esquerda para dar Dislike) e foco visual visível em todos os botões e seletores.
3. **Filtros Personalizados**: Busca personalizada por Gêneros (carregados dinamicamente via API), Plataformas e categoria "Free-to-Play".
4. **Pivotagem de Recomendação**: Recomece instantaneamente uma nova fila de sugestões baseada em um jogo específico (por tags/gêneros semelhantes) clicando em "Recomeçar Busca".
5. **Histórico de Matches**: Uma aba lateral (matches) para acessar e gerenciar a lista de todos os jogos curtidos na sessão.

## Configuração do Ambiente
Para rodar a aplicação localmente:

1. Clone o repositório.
2. Crie um arquivo `.env` na raiz baseado no [.env.example](file:///home/rafael/steam_find_react/.env.example):
   ```env
   VITE_RAWG_API_KEY=sua_api_key_aqui
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
