<p align="center">
  <img src="./docs/img/SunCine.png" width="500" alt="SunCine Logo" />
</p>
</br>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Vite-%23646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Fastify-%23FFFFFF?style=for-the-badge&logo=fastify&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/TMDB-%23006DBF?style=for-the-badge&logo=themoviedatabase&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=black" />
</div>

---

[🔙 Volta para documentação principal](./README.md)

# 🎯 Desafio (Fullstack Pleno)
O desafio consiste em `5 partes`:

#### 💅 Frontend
Desenvolver `2 páginas` web a partir do material de referência fornecido no email, utilizando as seguintes tecnologias:
- `Node.js`
- `Vite`
- `React.js`
- `TailwindCSS` *(obrigatório para a estilização dos componentes)*
- Outras bibliotecas que julgar necessárias.

#### 👾 API 
Implementar `2 novas funcioalidades`:
1. **GET** - `/user/list` *(Autenticada)*: Deve retornar as informações não sensíveis dos usuários mais a quantidade de *likes* de cada usuário. 
1. **GET** - `/user/:id/:page` *(Autenticada)*: Deve retornar as informações não sensíveis do usuário solicitado, além quantidade de *likes* e a lista paginada de 3 em 3 dos filmes com *likes*, ordenados descendente por data do *like*.

#### 📝 Documentação
Documentar os endpoints implementados no arquivo `projects/back/openapi.yaml`, seguindo o padrão já estabelecido nele.

#### 🧐 Análise de Código
Criar uma **Issue** no seu repositório descrevendo sua análise sobre o projeto Backend, indicando pontos de melhoria que poderiam ser implementados.

#### 🧪 Testes Automatizados
Desenvolver testes automatizados para qualquer função que considerar necessária, utilizando a biblioteca [Vitest](https://vitest.dev/) já instalada no projeto.

## ✅ Avaliação 
O desafio consiste em testar suas habilidades como desenvolvedor Fullstack, avaliando sua capacidade de desenvolver funcionalidades completas, criar interfaces responsivas, implementar testes e documentar o código.

### 👀 Pontos que Serão Avaliados

#### **1. Funcionalidades Implementadas**
- A aplicação cumpre os requisitos funcionais descritos no desafio.
- As telas desenvolvidas correspondem ao esperado no material de referência.

#### **2. Qualidade do Código**
- Organização e estrutura dos arquivos e componentes.
- Legibilidade e clareza do código.
- Adoção de boas práticas de programação.

#### **3. Uso de Tecnologias**
- Utilização correta das ferramentas e bibliotecas obrigatórias, como **React**, **TailwindCSS**, e outras mencionadas no desafio.
- Configuração e integração adequadas com o backend e a API.

#### **4. Fluxo de Navegação**
- Implementação de um sistema de rotas funcional e eficiente.
- Transições e navegações entre telas sem erros.

#### **5. Autenticação**
- Uso correto do token JWT para acessar endpoints protegidos.
- Implementação de fluxos de login, logout e persistência de sessão.

#### **6. Estilo e Interface**
- Fidelidade ao design proposto no material de referência.
- Responsividade e atenção à experiência do usuário (UX/UI).

#### **7. Testes**
- Presença de testes unitários ou de integração utilizando **Vitest**.

#### **8. Comunicação com a API**
- Requisições HTTP realizadas corretamente.
- Tratamento de erros e respostas da API.

#### **9. Atenção aos Detalhes**
- Precisão na reprodução do design fornecido, mesmo que sejam pequenos detalhes.
- Consistência em elementos visuais, como alinhamento, espaçamento, e fontes.
- Uso de feedbacks visuais claros.

#### **10. Análise Crítica:**  
  A análise do código backend enviada como uma **Issue** será avaliada com base nos seguintes pontos:  
  - **Clareza:** A Issue está bem escrita e organizada, com descrições claras e compreensíveis.  
  - **Relevância:** Os pontos de melhoria indicados são pertinentes e podem gerar impacto positivo na qualidade do código ou arquitetura do backend.  
  - **Profundidade:** A análise demonstra um entendimento sólido do projeto, identificando problemas estruturais ou de lógica, além de sugerir melhorias.  
  - **Propostas de Solução:** Sugestões de como os problemas levantados poderiam ser resolvidos ou melhorados.

#### **11. Documentação**
- DOCUMENTACAO.md bem estruturado, explicando claramente como configurar e rodar o projeto.
- Detalhes adicionais sobre decisões técnicas, se necessário.

#### **12. Outras Observações**
- Capacidade de explicar e justificar as escolhas feitas durante o desenvolvimento.
- Organização geral do projeto, incluindo como as dependências são gerenciadas e configuradas.
- Criatividade e soluções além do esperado, sem fugir dos requisitos principais.
- Habilidades de depuração e resolução de problemas caso seja necessário durante a apresentação.
- Qualquer outro ponto relevante para o desafio.

## 📝 Páginas a Desenvolver
1. **Login:** Tela inicial para autenticação do usuário. Deve permitir o envio de e-mail e senha para o backend, armazenando o token JWT retornado e exibindo mensagens de erro em caso de falha.
2. **Filmes em Alta:** Página que exibe os _Top 10 filmes mais populares do dia do TMDB_, incluindo informações como imagem, título, popularidade e data de lançamento, conforme fornecido pela API.

> **Nota:** O material de referência contém versões para mobile e tablet, mas apenas a versão web precisa ser reproduzida.

### 👽️ Integração: Frontend <> Backend

A aplicação deverá consumir a `API pré-desenvolvida` fornecida para o desafio. Basta iniciar o backend utilizando os comandos descritos posteriormente e realizar as requisições seguindo a documentação da API.

#### 🔐 Autenticação:
- Você deverá implementar a autenticação no frontend utilizando o `token JWT` retornado pelo backend.
- O único `usuário` cadastrado é o `Dev`, que será automaticamente criado na primeira execução do backend.
- Nas requisições que exigem autorização, inclua o token no cabeçalho **Authorization** no formato: `Authorization: Bearer <seu-token>`

## 🏗️ Estrutura do Projeto
Este projeto utiliza a arquitetura **monorepo** com o gerenciador de pacotes `pnpm`. O seu código deve ser desenvolvido dentro dos subprojetos: `projects/front/` `projects/back/`

---

[🔙 Volta para documentação principal](./README.md)
