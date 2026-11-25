# PROMPT — MVP DE LISTA DE TAREFAS

Atue como um desenvolvedor front-end experiente e crie uma aplicação web de gerenciamento de tarefas (To-Do List), seguindo rigorosamente os requisitos abaixo.

**IMPORTANTE:** Desenvolva exclusivamente o FRONT-END. Não implemente autenticação, backend, banco de dados, APIs ou integrações externas.

## 1. OBJETIVO

Criar um sistema simples de gerenciamento de tarefas para um estudante que deseja organizar suas atividades durante a semana.

O problema que o sistema deve resolver é a dificuldade de organizar, acompanhar e identificar quais atividades já foram concluídas e quais ainda estão pendentes.

O usuário deve conseguir:
- Visualizar suas tarefas.
- Cadastrar novas tarefas.
- Editar tarefas existentes.
- Marcar tarefas como concluídas.
- Remover tarefas da lista.
- Filtrar tarefas por status.
- Manter as tarefas salvas mesmo depois de fechar e reabrir o site.

Utilize exclusivamente dados simulados e armazenamento local do navegador (`localStorage`) para persistência.

Identifique claramente na interface que os dados são demonstrativos e armazenados localmente.

## 2. PÁGINAS

### Página principal — Gerenciador de tarefas

Criar uma única página principal, contendo os seguintes componentes:

**Cabeçalho:**
- Nome da aplicação: Minha Lista de Tarefas.
- Subtítulo: Organize suas atividades e acompanhe seu progresso.
- Indicador visual de armazenamento local.

**Resumo das tarefas:**
- Total de tarefas cadastradas.
- Quantidade de tarefas pendentes.
- Quantidade de tarefas concluídas.

Os números devem ser atualizados automaticamente conforme as ações do usuário.

**Cadastro de tarefas:**
- Campo de texto para inserir o título da tarefa.
- Botão "Adicionar tarefa".
- Impedir o cadastro de tarefas vazias.
- Limitar o título a 100 caracteres.

**Filtros:**
Disponibilizar três opções:
- Todas.
- Pendentes.
- Concluídas.

O filtro selecionado deve apresentar destaque visual.

**Lista de tarefas:**

Cada tarefa deve apresentar:
- Checkbox para marcar como concluída.
- Nome da tarefa.
- Identificação do status: Pendente ou Concluída.
- Botão para editar.
- Botão para excluir.

As tarefas concluídas devem apresentar diferenciação visual, como texto riscado e identificação de status.

**Edição:**
- Permitir editar o título da tarefa.
- Disponibilizar ações de salvar e cancelar.
- Atualizar a lista imediatamente após salvar.

**Exclusão:**
- Permitir remover uma tarefa.
- Solicitar confirmação antes da exclusão.
- Atualizar os indicadores e a lista após a remoção.

## 3. COMPORTAMENTOS E FLUXOS

### Fluxo principal

1. O usuário acessa a aplicação.
2. Visualiza o resumo e a lista de tarefas.
3. Digita uma nova atividade.
4. Clica em "Adicionar tarefa".
5. A tarefa aparece na lista com status "Pendente".
6. O usuário pode marcar a tarefa como concluída.
7. O status muda para "Concluída".
8. O usuário pode editar ou excluir a tarefa.
9. O usuário pode alternar entre os filtros disponíveis.
10. As alterações são salvas automaticamente no localStorage.

### Regras de negócio

- Cada tarefa deve possuir um identificador único.
- Cada tarefa deve possuir um título obrigatório.
- Toda tarefa nova começa com status "Pendente".
- O usuário pode alternar entre os status Pendente e Concluída.
- Não permitir tarefas sem título.
- A exclusão deve solicitar confirmação.
- A edição não deve salvar títulos vazios.
- Os filtros não devem alterar os dados originais.
- Os indicadores devem refletir os dados atuais.
- Os dados devem permanecer disponíveis após atualizar ou fechar e reabrir a página, no mesmo navegador.

### Estados da interface

Implementar os seguintes estados:

**Estado vazio:**
- Apresentar mensagem informando que nenhuma tarefa foi cadastrada.
- Mostrar orientação para adicionar a primeira tarefa.

**Estado carregando:**
- Apresentar indicador visual discreto durante a inicialização e leitura dos dados locais, quando aplicável.

**Estado de erro:**
- Exibir mensagem amigável caso ocorra falha na leitura ou gravação do armazenamento local.
- Disponibilizar orientação para tentar novamente.
- Não apresentar erros fictícios como se fossem falhas reais.

**Estado de sucesso:**
- Exibir feedback discreto após cadastrar, editar, concluir ou excluir uma tarefa.

**Estado sem resultados:**
- Quando um filtro não encontrar tarefas, apresentar uma mensagem específica, sem confundir com a lista totalmente vazia.

## 4. COMPONENTES E ESTRUTURA

Organizar a interface em componentes reutilizáveis:

- Header: cabeçalho da aplicação.
- TaskSummary: resumo e contadores.
- TaskForm: formulário de cadastro e edição.
- TaskFilters: filtros de status.
- TaskList: lista de tarefas.
- TaskItem: componente individual de tarefa.
- EmptyState: estado sem tarefas.
- NoResults: estado sem resultados no filtro.
- ConfirmDialog: confirmação de exclusão.
- FeedbackMessage: mensagens de sucesso e erro.

Utilizar uma estrutura de código organizada, separando componentes, estilos e lógica de gerenciamento das tarefas.

## 5. RESPONSIVIDADE

A aplicação deve funcionar corretamente em:

- Computadores.
- Tablets.
- Smartphones.

Requisitos:
- Layout adaptável a diferentes tamanhos de tela.
- Em dispositivos móveis, organizar os componentes verticalmente.
- Os botões devem permanecer acessíveis e fáceis de utilizar.
- Os campos de entrada devem ocupar adequadamente a largura disponível.
- Evitar rolagem horizontal.
- Manter boa legibilidade em telas pequenas.

## 6. ACESSIBILIDADE

Seguir boas práticas de acessibilidade:

- Utilizar HTML semântico.
- Associar rótulos aos campos de formulário.
- Permitir navegação por teclado.
- Apresentar indicadores visuais de foco.
- Garantir contraste adequado entre texto e fundo.
- Não utilizar somente cores para representar os status.
- Disponibilizar nomes acessíveis para os botões de editar e excluir.
- Utilizar mensagens acessíveis para informar alterações e erros.
- Garantir que os controles tenham áreas de interação adequadas.

## 7. LIMITES DO ESCOPO

O projeto deve permanecer um MVP simples.

NÃO implementar:

- Login ou cadastro de usuários.
- Autenticação.
- Banco de dados.
- Backend.
- APIs.
- Integrações externas.
- Firebase ou Supabase.
- Sincronização entre dispositivos.
- Compartilhamento de tarefas.
- Notificações.
- Calendário.
- Priorização de tarefas.
- Categorias.
- Relatórios avançados.
- Funcionalidades extras não solicitadas.

Utilizar somente:
- Front-end.
- Dados demonstrativos identificados.
- `localStorage` para persistência local.
- Componentes simples e reutilizáveis.

Não substituir o armazenamento local por serviços externos.

## 8. CRITÉRIOS DE ACEITAÇÃO VISUAL E FUNCIONAL

A aplicação será considerada adequada quando atender aos seguintes critérios:

**Interface:**
- Visual simples, organizado e intuitivo.
- Hierarquia visual clara.
- Cores discretas e consistentes.
- Botões identificáveis.
- Lista de tarefas fácil de visualizar.
- Status Pendente e Concluída visualmente diferenciados.

**Funcionalidades:**
- [ ] Cadastrar uma tarefa.
- [ ] Impedir cadastro vazio.
- [ ] Editar uma tarefa.
- [ ] Salvar alterações.
- [ ] Cancelar edição.
- [ ] Marcar tarefa como concluída.
- [ ] Retornar tarefa para pendente.
- [ ] Excluir tarefa com confirmação.
- [ ] Filtrar todas as tarefas.
- [ ] Filtrar tarefas pendentes.
- [ ] Filtrar tarefas concluídas.
- [ ] Atualizar os contadores automaticamente.
- [ ] Salvar alterações no localStorage.
- [ ] Recuperar tarefas após atualizar a página.
- [ ] Recuperar tarefas após fechar e reabrir o site.
- [ ] Exibir corretamente os estados vazio, carregando, erro e sucesso.
- [ ] Funcionar em computadores e dispositivos móveis.

**Testes de aceitação:**

1. Cadastrar uma tarefa chamada "Estudar Matemática" e verificar se aparece como Pendente.
2. Marcar a tarefa como concluída e verificar a atualização do status e dos contadores.
3. Editar o título da tarefa e verificar se a alteração foi salva.
4. Excluir uma tarefa e verificar se ela desaparece após a confirmação.
5. Criar duas tarefas pendentes e uma concluída e testar os três filtros.
6. Atualizar a página e verificar se as tarefas continuam disponíveis.
7. Fechar e reabrir o site no mesmo navegador e verificar a persistência.
8. Tentar cadastrar uma tarefa vazia e verificar se o sistema impede a operação.
9. Testar o layout em uma tela de smartphone e verificar se todos os controles continuam acessíveis.

**RESULTADO ESPERADO:**

Entregar uma aplicação front-end funcional, visualmente agradável, responsiva e acessível, que permita ao estudante cadastrar, editar, concluir, excluir e filtrar tarefas.

Priorize simplicidade, clareza e funcionamento correto das funcionalidades essenciais. Não acrescente recursos além dos especificados.