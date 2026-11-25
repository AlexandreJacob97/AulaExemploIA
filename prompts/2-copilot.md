# PROMPT — ANÁLISE E INTERPRETAÇÃO DO BACKEND

Atue como um Desenvolvedor Backend Sênior, especialista em arquitetura de sistemas, APIs REST, integração com Frontend e boas práticas de programação.

Quero que você analise detalhadamente o código do meu projeto Backend, utilizando o projeto-base como referência, para entender sua arquitetura, funcionamento, regras de negócio e comunicação com o Frontend.

## 1. Caminhos dos projetos

**Projeto Frontend:**
```text
C:\Users\alexandre62960546\Documents\lista-de-batatas
```

**Projeto BASE Backend:**
```text
C:\Users\alexandre62960546\Documents\aula-exemplo-backend-jp-2026
```

O projeto Backend deve ser analisado como foco principal. O Frontend deve ser consultado apenas para compreender quais funcionalidades precisam ser atendidas pela API.

## 2. Objetivo principal

Quero que você interprete o Backend existente e explique detalhadamente como ele funciona.

Preciso compreender a estrutura do projeto, as tecnologias utilizadas, as rotas, os métodos HTTP, as funções, as regras de negócio e como as informações são processadas e retornadas ao Frontend.

Não quero que você desenvolva um Backend novo. Quero primeiro entender o código existente.

## 3. Análise da estrutura do Backend

Analise todas as pastas e arquivos importantes do projeto e explique:

- Qual é a linguagem de programação utilizada.
- Qual framework está sendo utilizado.
- Qual é a arquitetura do projeto.
- Qual é a função de cada pasta.
- Qual é a responsabilidade de cada arquivo.
- Onde ficam as configurações do servidor.
- Onde ficam as rotas.
- Onde ficam os controllers.
- Onde ficam os services.
- Onde ficam os models.
- Onde ficam os middlewares.
- Onde ficam as configurações de banco de dados.

Não presuma que todas essas estruturas existem. Identifique a organização real do projeto.

## 4. Análise das rotas e endpoints

Identifique todas as rotas existentes no Backend.

Para cada rota, apresente:

- Nome do endpoint.
- Método HTTP utilizado.
- Finalidade da rota.
- Parâmetros recebidos.
- Dados esperados no corpo da requisição.
- Validações realizadas.
- Funções executadas.
- Resposta retornada.
- Possíveis códigos de status HTTP.

Explique especialmente os métodos:

- GET — consultar informações.
- POST — cadastrar informações.
- PUT — atualizar informações.
- PATCH — atualizar parcialmente.
- DELETE — excluir informações.

Apresente exemplos reais das rotas encontradas no código.

## 5. Análise das regras de negócio

Identifique todas as regras de negócio implementadas.

Explique:

- Como os dados são recebidos.
- Como são processados.
- Quais validações são realizadas.
- Como são tratados os dados inválidos.
- Como funciona a criação de registros.
- Como funciona a consulta de registros.
- Como funciona a atualização.
- Como funciona a exclusão.
- Como são tratadas exceções e erros.

Utilize exemplos do próprio projeto.

## 6. Banco de dados e armazenamento

Verifique se o projeto utiliza banco de dados ou outro mecanismo de armazenamento.

Identifique:

- Qual banco de dados é utilizado.
- Como acontece a conexão.
- Onde ficam as configurações.
- Como são estruturadas as tabelas ou coleções.
- Quais são os campos existentes.
- Quais são os relacionamentos.
- Como os dados são cadastrados e consultados.
- Se existem migrations, seeds ou scripts de inicialização.

Caso não exista banco de dados, explique como as informações são armazenadas atualmente.

Nunca exponha valores de senhas, tokens ou outras credenciais presentes nos arquivos de configuração.

## 7. Comunicação com o Frontend

Consulte o projeto Frontend `lista-de-batatas` para identificar as funcionalidades que precisam ser atendidas pelo Backend.

Verifique:

- Quais informações o Frontend precisa receber.
- Quais informações precisa enviar.
- Quais endpoints existentes podem atender essas necessidades.
- Quais endpoints ainda estão faltando.
- Se os formatos JSON são compatíveis.
- Se existem problemas de CORS.
- Quais portas e URLs são utilizadas.
- Se existe configuração de variáveis de ambiente.
- Se a comunicação entre os projetos está preparada corretamente.

Apresente uma comparação entre as necessidades do Frontend e as funcionalidades disponíveis no Backend-base.

## 8. Fluxo de funcionamento do Backend

Explique o caminho que uma requisição percorre dentro do servidor.

Exemplo:

1. O usuário realiza uma ação no Frontend.
2. O Frontend envia uma requisição HTTP.
3. O Backend recebe a requisição.
4. A rota identifica qual função deve executar.
5. O Controller processa a solicitação.
6. O Service executa as regras de negócio, caso exista essa camada.
7. O Model realiza a operação de armazenamento, caso exista.
8. O Backend retorna uma resposta JSON.
9. O Frontend recebe e apresenta o resultado.

Adapte esse fluxo à arquitetura real encontrada no projeto.

## 9. Segurança e tratamento de erros

Analise:

- Validação de dados recebidos.
- Tratamento de exceções.
- Configuração de CORS.
- Proteção de rotas, se existente.
- Gerenciamento de variáveis de ambiente.
- Exposição de informações sensíveis.
- Tratamento de erros HTTP.
- Possíveis vulnerabilidades.

Não execute testes destrutivos nem exponha credenciais.

## 10. Como executar o Backend

Identifique os procedimentos corretos para executar o servidor.

Explique:

- Quais ferramentas precisam estar instaladas.
- Quais dependências são utilizadas.
- Qual comando inicia o servidor.
- Qual arquivo é o ponto de entrada da aplicação.
- Qual porta o servidor utiliza.
- Como verificar se o servidor está funcionando.
- Como testar as rotas.
- Como identificar erros durante a inicialização.

Utilize os comandos reais encontrados nos arquivos de configuração do projeto.

## 11. Diagnóstico e melhorias

Identifique os problemas encontrados e classifique-os:

- Prioridade alta.
- Prioridade média.
- Prioridade baixa.

Considere arquitetura, organização, desempenho, segurança, manutenção e integração com o Frontend.

Para cada problema, apresente:
1. Arquivo relacionado.
2. Trecho ou função responsável.
3. Qual é o problema.
4. Por que precisa ser corrigido.
5. Qual seria a solução recomendada.

## 12. Relatório final

Ao terminar, apresente um relatório didático e organizado contendo:

1. Visão geral do Backend.
2. Tecnologias utilizadas.
3. Arquitetura do projeto.
4. Estrutura das pastas e arquivos.
5. Explicação dos principais códigos.
6. Lista de rotas e endpoints.
7. Regras de negócio.
8. Funcionamento do armazenamento de dados.
9. Comunicação com o Frontend.
10. Problemas identificados.
11. Melhorias recomendadas.
12. Instruções para executar e testar o Backend.

## 13. Restrições obrigatórias

- NÃO altere arquivos.
- NÃO exclua arquivos.
- NÃO crie novas funcionalidades.
- NÃO instale dependências.
- NÃO modifique o projeto-base.
- NÃO invente rotas ou funcionalidades.
- NÃO presuma que determinada tecnologia está sendo utilizada sem verificar.
- Utilize exemplos reais do código.
- Caso não consiga acessar algum arquivo, informe.
- Diferencie funcionalidades existentes de funcionalidades sugeridas.

**IMPORTANTE:** Trabalhe inicialmente somente em modo de análise e leitura. Não faça nenhuma alteração no código.

**Resultado esperado:** quero entender completamente como o Backend funciona, desde o recebimento de uma requisição até o processamento das regras de negócio e o retorno da resposta ao Frontend.
