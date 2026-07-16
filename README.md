# SteamFind

O **SteamFind** é um aplicativo web interativo no estilo Tinder para recomendação de jogos eletrônicos, integrando dados em tempo real da API pública do **RAWG**.

---

## 🚀 Sobre o Projeto

O aplicativo apresenta cards dinâmicos contendo informações detalhadas de jogos (título, classificação, plataforma, gêneros e descrição). Os usuários podem curtir (*Like*) ou descartar (*Dislike*) os jogos através de botões na interface ou de atalhos no teclado. 

O SteamFind implementa **paginação dinâmica automática** (auto-load) e **pivotagem de recomendações**, permitindo reiniciar o feed de sugestões tendo como semente qualquer jogo favoritado.

---

## ⚙️ Metodologia SDD & SpecKit

Este projeto foi construído utilizando a metodologia **Specification-Driven Development (SDD)**, com o apoio da ferramenta **SpecKit**. 

Esse processo garante que cada funcionalidade desenvolvida seja rastreável e validada a partir de especificações formais de requisitos e planos de design arquitetural robustos, mantendo um alto padrão de qualidade de código e uma separação estrita de responsabilidades entre lógica de negócios (hooks) e renderização visual.

---

## 🛠️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar a aplicação e visualizar a documentação em sua máquina.

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **Python 3** (para servir a documentação via MkDocs)

### 1. Clonar e Configurar Chaves de API
Crie um arquivo `.env` na raiz do projeto copiando o modelo de `.env.example`:
```bash
cp .env.example .env
```
Abra o arquivo `.env` e insira sua chave da API do RAWG:
```env
VITE_RAWG_API_KEY=sua_chave_aqui
```

### 2. Executar o Aplicativo React (Vite)
Instale as dependências de pacotes e inicie o servidor local de desenvolvimento:
```bash
npm install
npm run dev
```
O aplicativo estará rodando por padrão em `http://localhost:5173`.

### 3. Executar o Servidor de Documentação (MkDocs)
Instale a dependência do MkDocs e sirva os arquivos de documentação localmente com recarregamento em tempo real:
```bash
pip install mkdocs
mkdocs serve
```
A documentação interativa estará acessível em `http://127.0.0.1:8000`.

---

## 📦 Documentação do Build de Produção

Quando a aplicação passa pelo processo de build e publicação (`npm run build` e `mkdocs build`), o fluxo do CI/CD integra o site gerado pelo MkDocs diretamente na pasta de distribuição estática. 

A documentação completa estará disponível na rota **/docs** (ou no caminho físico `./docs/index.html`) dentro da estrutura final de publicação do build.
