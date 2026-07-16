# SteamFind - Documentação Oficial

Bem-vindo à documentação oficial do **SteamFind**, um aplicativo web moderno no estilo Tinder (Single Page Application) projetado para revolucionar a descoberta de novos jogos.

---

## 🎮 O que é o SteamFind?

O **SteamFind** é uma SPA (Single Page Application) desenvolvida com **React** que permite aos usuários explorar recomendações de jogos de forma interativa e visual através de um feed de cards no estilo Tinder. 

O aplicativo consome dados em tempo real da API pública do **RAWG** e implementa um sistema de **paginação dinâmica (auto-load)**. Conforme o usuário realiza ações de *Like* (Amei) ou *Dislike* (Não curti) nos cards e a fila local se aproxima do fim, o sistema faz requisições em segundo plano automaticamente para carregar novas páginas, garantindo uma experiência de navegação contínua e sem interrupções.

### Principais Funcionalidades:
- **Navegação por Cards (Swipe)**: Interface fluida e animada para gostar ou descartar jogos.
- **Histórico de Matches**: Uma aba lateral para gerenciar e rever todos os jogos que receberam um voto positivo.
- **Filtros Avançados**: Refinamento de recomendações por Gênero, Plataforma ou jogos *Free-to-Play*.
- **Pivotagem de Busca**: Possibilidade de usar qualquer jogo como semente para recomeçar o algoritmo de recomendação com títulos parecidos.
- **Acessibilidade**: Navegação e controle de swipe totalmente suportados via teclado (Setas Esquerda e Direita).

---

## 🛠️ Metodologia de Desenvolvimento (SDD & SpecKit)

Este projeto foi construído seguindo rigorosamente a metodologia **Specification-Driven Development (SDD)** (Desenvolvimento Guiado por Especificações). 

Todo o fluxo de desenvolvimento foi gerenciado através da ferramenta **SpecKit**. Sob este modelo, o desenvolvimento ocorre em fases estritamente ordenadas e validadas:
1. **Specify (Especificação)**: Escrita de especificações claras, testáveis e focadas na experiência do usuário (`spec.md`).
2. **Plan (Planejamento)**: Elaboração de um plano de arquitetura técnica e análise de aderência à constituição do projeto (`plan.md`).
3. **Tasks (Tarefas)**: Quebra de requisitos em uma lista ordenada e rastreável de tarefas (`tasks.md`).
4. **Implement (Implementação)**: Execução incremental e testada de cada tarefa.

Graças ao uso do **SpecKit**, a arquitetura do **SteamFind** mantém uma separação rígida de responsabilidades (Separation of Concerns), isolando os hooks de estado e a camada de integração de API de qualquer acoplamento com a camada visual de componentes.

---

## 💻 Stack Tecnológica

O ecossistema do **SteamFind** utiliza as seguintes tecnologias:

- **React 18**: Biblioteca base para construção da interface baseada em componentes reativos.
- **Vite**: Ferramenta de build rápida e moderna para empacotamento e servidor de desenvolvimento.
- **Tailwind CSS**: Framework de estilização utilitário para design moderno, responsivo e suporte nativo a temas (Dark/Light).
- **MkDocs**: Gerador de sites estáticos rápido e simples voltado para documentação de projetos em Markdown.
- **GitHub Actions (CI/CD)**: Automação completa para integrar código, realizar builds e publicar a aplicação e a documentação estática diretamente no GitHub Pages.
