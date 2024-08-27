# Desafio Desenvolvedor Back-End

### Servidor de jogos utilizando Nodem WebSocket e RPC

*Requisitos*
  1. Aplicação NodeJs, possibilitando login passando usuário e senha. Não precisa de banco de dados, porde armazenar em memoria os dados do usuário;
  2. A autenticação deverá ser realizada a partir de uma conexão WebSocket;
  3. Devera expor apenas comunicação através de uma conexão RPC.

*Implementação*
  - Versão do node utilizada: 20+
  - Projeto inicializado com `npm init -y`.
  - Foram instaladas a dependencias `express`, `Websocket` e `Json-RPC`.
  - Foram adicionados endpoint de login para dois usuários: renzo e fulano.
  - Foram adicionados endpoints de ação e logout como adicionais.
  - O sistema backend escrito em inglês para otimizar a utilização em multiplos idiomas atraves de internacionalização do cliente.

*Extras*
  - Adicionados alguns cenários para testes;
  - Adicionados recursos para buil e execução em Containers;
  - Adicionado descritor do serviço RPC em OpenAPI.

*Execução e testes*
  1. Clonagem do projeto;
  2. Instalação das dependencias do backend:

```
npm install
```
  
  3. Execução do projeto:

```
npm start
```

  4. Execução dos testes: 

```
npm test
```

  5. Build e execução do projeto em container: **Exige docker/docker desktop*
    
  **Build:**
```
npm run docker-build
```
  **Executar:**

```
npm run docker-run
```

### Cliente para acessar o servidor e poder testar o login

*!!! Sem requisitos*

*Implementação*
  - Associado diretamente ao projeto do servidor;
  - Foi utilizado Node acessando o serviço com  Websocket e Json-RPC;
  - Usando `readline-sync` para o usuário informar valores.

*Execução e testes*

```  
npm run client
```

  Utilize os dados de usuários a seguir para testes:

```
Usuário: 'renzo', senha: '123mudar'
Usuário: 'fulano', senha: 'senha'
```