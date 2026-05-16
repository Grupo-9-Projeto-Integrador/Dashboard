

Universidade Federal de Goiás  
Instituto de Informática  
Engenharia de Software

**Componente Curricular:** INF0442 \- Introdução à Engenharia de Software  
**Turma A:** 2026/1  
**Professora:** Dra. Renata Dutra Braga  
**Data**: 02/04/2026  
**Discentes:** Paulo Vitor V. C. M. de Lima, Rafael Pereira Debner, Renan Teixeira Mendes, Samuel Mariano Pires, Yan Nicolas Cardoso dos Santos  
**Matrículas: 202604083, 202605513, 202605514, 202602996, 202603248**

# **Pacote 1 – Estudo de Caso**

## **Área de Requisitos de Software**

## **1\. Identificação do Projeto**

* **Nome do Projeto: JPMALL**  
* **Equipe / Grupo: Grupo 9**   
* **Data: 02/04/2026**  
* **Stakeholders principais:**   
* **Jéssica Pedrosa \<**[jessicaalmeida.adm@gmail.com](mailto:jessicaalmeida.adm@gmail.com)**\>**  
* **Administradores do shopping (usuários principais)**  
* **Equipe de marketing (usuários operacionais)**  
* **Equipe comercial (usuários operacionais)**  
* **Equipe de relacionamento (usuários operacionais)**  
* **Gestores/diretoria do shopping (tomadores de decisão)**  
* **Equipe de TI (suporte técnico e integração)**  
* **Sistemas externos: CRMALL e Intranet Mall (fontes de dados)**  
* **Lojistas (stakeholders indiretos – sem acesso ao sistema)**  
    
* **Título do email: \<UFG \- BES- GRUPO x \- Dúvida sobre xxx\>**

##  **2\. Necessidades**

### 

### **2.1 Descrição das Necessidades**

### **N1 — Centralização e integração de dados**

**Problema:** Os dados dos lojistas estão distribuídos entre diferentes sistemas e setores, dificultando o acesso e a consolidação das informações.  
 **Objetivo:** Centralizar e integrar os dados dos lojistas em uma única plataforma.

### **N2 — Falta de visão gerencial consolidada**

**Problema:** Os gestores não possuem uma visão unificada e atualizada das informações dos lojistas.  
 **Objetivo:** Disponibilizar visualizações consolidadas para análise gerencial.

### **N3 — Ausência de histórico do lojista**

**Problema:** As interações e eventos relacionados aos lojistas não são registrados de forma estruturada ao longo do tempo.  
 **Objetivo:** Manter um histórico completo e organizado de cada lojista.

.

### **N4 — Dificuldade de análise comparativa**

**Problema:** Não existem mecanismos para comparar o desempenho entre lojistas de forma eficiente.  
 **Objetivo:** Permitir comparação entre lojistas com base em indicadores definidos.

### **N5 — Baixo apoio à decisão estratégica**

**Problema:** A ausência de dados organizados e consolidados dificulta a tomada de decisão.  
 **Objetivo:** Fornecer informações estruturadas para suporte à decisão estratégica.

**2.2 Problemas Identificados**

* Falta de centralização dos dados  
* Ausência de histórico completo  
* Fragmentação entre áreas  
* Baixa rastreabilidade  
* Dificuldade de análise estratégica


### **2.3 Objetivos do Sistema**

* Consolidar dados dos lojistas  
* Garantir rastreabilidade completa  
* Apoiar decisões estratégicas  
* Permitir análise integrada 

## **3\. Fontes de Requisitos**

| Tipo de Fonte | Descrição | Método de Coleta |
| ----- | ----- | ----- |
| **Stakeholders – Operacionais** | Equipes de marketing, comercial, relacionamento, engenharia e demais áreas que registram dados dos lojistas | Entrevistas estruturadas e workshops para entendimento dos dados gerados e necessidades de visualização |
| **Stakeholders – Estratégicos** | Gestores e diretoria do shopping responsáveis por tomada de decisão | Entrevistas focadas em indicadores (KPIs), relatórios e necessidades analíticas |
| **Equipe de TI** | Responsável pela integração entre sistemas e viabilidade técnica | Reuniões técnicas e análise de arquitetura |
| **Grupos do Projeto Integrador** | Grupos 1 a 8 responsáveis pelos módulos de origem dos dados (cadastro, histórico, marketing, sinistros, etc.) | Workshops de integração e definição de contratos de dados |
| **Sistemas existentes** | CRMALL e Intranet Mall como fontes de dados operacionais e históricos | Análise técnica, documentação de APIs e inspeção de dados |
| **Documentos internos** | Planilhas de controle, relatórios gerenciais, registros operacionais e históricos de atendimento | Análise documental estruturada |
| **Relatórios gerenciais existentes** | Relatórios atualmente utilizados pela gestão para tomada de decisão | Entrevistas e análise comparativa |
| **Observação do processo** | Acompanhamento do uso atual de dados e geração de relatórios nas áreas | Observação direta e shadowing |

## **4\. Escopo do Produto**

### **4.1 Dentro do Escopo**

* Desenvolvimento de **dashboards gerenciais interativos**, permitindo a visualização consolidada dos dados dos lojistas.  
* Criação de **relatórios dinâmicos e personalizáveis**, onde o usuário poderá selecionar quais campos deseja visualizar.  
* Implementação de **filtros avançados**, incluindo:  
  * Loja  
  * Período (dia, mês, ano)  
  * Tipo de ocorrência  
  * Tipo de interação  
* Definição e acompanhamento de **indicadores de desempenho (KPIs)**, como:  
  * Quantidade de ocorrências por lojista  
  * Tempo médio de resolução  
  * Volume de interações  
  * Evolução do lojista ao longo do tempo  
* Construção da **jornada completa do lojista**, permitindo visualizar toda sua trajetória desde a proposta comercial até o encerramento.  
* **Consolidação e integração de dados** provenientes dos diferentes módulos do sistema (grupos 1 a 8), garantindo uma visão unificada.  
* Definição da **integração entre sistemas (APIs)** em nível conceitual, permitindo comunicação entre plataformas existentes.  
* Implementação de **padronização dos dados**, garantindo consistência e qualidade para análise.  
* Inclusão de **sistema de notificações e logs**, permitindo:  
  * Registro de eventos relevantes  
  * Rastreabilidade de ações (auditoria)  
  * Uso dessas informações em análises e relatórios  
* Desenvolvimento de uma **interface intuitiva e de fácil utilização**, com foco na experiência do usuário.

---

### **4.2 Fora do Escopo**

* Cadastro e manutenção de dados dos lojistas (responsabilidade do Grupo 1\)  
* Gestão operacional de áreas como:  
  * Marketing  
  * Comercial  
  * Sinistros  
  * Manutenção  
  * Relacionamento  
* Inserção manual de dados pelos lojistas  
* Acesso direto dos lojistas ao sistema  
* Desenvolvimento técnico detalhado de APIs (somente definição conceitual)  
* Execução de processos operacionais (o sistema será apenas analítico)

---

### **4.3 Descrição Geral do Produto**

O produto consiste em uma **plataforma de análise e inteligência de dados** voltada para a gestão de lojistas em shopping centers.

A solução tem como objetivo **consolidar, padronizar e integrar dados** provenientes de diferentes áreas do shopping, permitindo a criação de dashboards e relatórios estratégicos.

O sistema possibilita a visualização completa da **jornada do lojista**, desde sua entrada até o encerramento de suas atividades, além de fornecer indicadores de desempenho que auxiliam na tomada de decisão.

Dessa forma, o produto transforma dados operacionais em **informações estratégicas**, promovendo maior eficiência na gestão, melhor rastreabilidade e suporte à análise gerencial.

## **5\. Histórias de Usuário**

## **HU01 — Filtrar dados do dashboard (RF-01)**

COMO: administradora do shopping  
QUERO: aplicar filtros por loja, segmento, período (dia, mês, ano) e tipo de ocorrência nos dashboards  
PARA: analisar dados específicos e obter insights mais precisos para tomada de decisão

**Critérios de Aceitação** 

**Cenário 1 — Aplicação de filtros**

* DADO que a administradora está autenticada no sistema  
* QUANDO selecionar filtros de loja, segmento, período e tipo de ocorrência  
* ENTÃO o sistema deve atualizar o dashboard exibindo apenas os dados correspondentes aos filtros aplicados

**Cenário 2 — Filtro sem resultados**

* DADO que os filtros selecionados não possuem registros relacionados  
* QUANDO a administradora aplicar os filtros  
* ENTÃO o sistema deve informar que não existem dados para os critérios selecionados

## **HU02 — Visualizar jornada do lojista (RF-02)**

COMO: administradora do shopping  
QUERO: visualizar a linha do tempo completa do lojista, desde a proposta até a operação  
PARA: compreender o histórico completo e identificar eventos relevantes ao longo do tempo

**Critérios de Aceitação**

**Cenário 1 — Exibição da linha do tempo**

* DADO que existe um lojista cadastrado com histórico registrado  
* QUANDO a administradora acessar o perfil do lojista  
* ENTÃO o sistema deve exibir a linha do tempo completa contendo proposta comercial, contrato, reformas, ocorrências e operação

**Cenário 2 — Ordenação cronológica**

* DADO que existem múltiplos eventos associados ao lojista  
* QUANDO a linha do tempo for exibida  
* ENTÃO os eventos devem aparecer em ordem cronológica

## **HU03 — Visualizar notificações (RF-03)**

COMO: membro da equipe de relacionamento  
QUERO: ter acesso às notificações associadas a um lojista, incluindo data, tipo e descrição  
PARA: manter um histórico estruturado de interações e ocorrências

**Critérios de Aceitação**

DADO que o lojista possui notificações registradas

QUANDO o membro da equipe de relacionamento acessar as notificações do lojista

ENTÃO o sistema deve exibir data, tipo e descrição de cada notificação

**Cenário 1 — Consulta de notificações**

* DADO que o lojista possui notificações registradas  
* QUANDO o membro da equipe de relacionamento acessar as notificações do lojista  
* ENTÃO o sistema deve exibir data, tipo e descrição de cada notificação

**Cenário 2 — Lojista sem notificações**

* DADO que não existem notificações vinculadas ao lojista  
* QUANDO o usuário acessar a área de notificações  
* ENTÃO o sistema deve informar que não existem registros disponíveis

**HU04 — Comparar desempenho entre lojistas (RF-04)**

COMO: administradora do shopping  
QUERO: comparar o desempenho entre diferentes lojistas utilizando dashboards com métricas selecionadas  
PARA: identificar padrões, oportunidades e apoiar decisões comerciais

**Critérios de Aceitação**

**Cenário 1 — Comparação entre lojistas**

* DADO que existem dados consolidados de múltiplos lojistas  
* QUANDO a administradora selecionar os lojistas e métricas para comparação  
* ENTÃO o sistema deve exibir dashboards comparativos com os indicadores selecionados

**Cenário 2 — Métrica inválida**

* DADO que nenhuma métrica foi selecionada  
* QUANDO a administradora solicitar a comparação  
* ENTÃO o sistema deve impedir a operação e informar a necessidade de selecionar ao menos uma métrica

## **HU05 — Visualizar indicadores de desempenho (RF-05)**

COMO: administradora do shopping  
QUERO: visualizar KPIs dos lojistas, como volume de interações, ocorrências e desempenho geral  
PARA: monitorar resultados e apoiar decisões estratégicas

#### **Critérios de Aceitação**

**Cenário 1 — Exibição de KPIs**

* DADO que existem dados integrados dos lojistas  
* QUANDO a administradora acessar o painel de indicadores  
* ENTÃO o sistema deve exibir KPIs de interações, ocorrências e desempenho geral

**Cenário 2 — Atualização dos indicadores**

* DADO que novos dados foram importados para o sistema  
* QUANDO o dashboard for atualizado  
* ENTÃO os KPIs devem refletir os dados mais recentes disponíveis

**HU06 — Importar dados do CRMALL (RF-06)**

COMO: administradora do shopping   
QUERO: que o sistema importe automaticamente os dados do CRMALL  
PARA: consolidar as informações de diferentes fontes

**Critérios de Aceitação**

**Cenário 1 — Importação automática realizada com sucesso**

* DADO que existe conexão válida com o CRMALL  
* QUANDO o processo automático de importação for executado  
* ENTÃO o sistema deve importar e consolidar os dados recebidos

**Cenário 2 — Falha na importação**

* DADO que ocorreu erro de comunicação com o CRMALL  
* QUANDO o sistema tentar realizar a importação  
* ENTÃO o sistema deve registrar o erro em log e informar falha no processo

## **HU07 — Importar dados da Intranet (RF-07)**

COMO : administradora do shopping   
QUERO: que importe automaticamente os dados provenientes da Intranet Mall  
PARA: consolidar informações de diferentes fontes em uma única plataforma

**Critérios de Aceitação**

**Cenário 1 — Importação de dados da Intranet**

* DADO que existe integração ativa com a Intranet Mall  
* QUANDO o sistema executar a sincronização automática  
* ENTÃO os dados devem ser importados e padronizados corretamente

**Cenário 2 — Dados inconsistentes**

* DADO que a Intranet Mall enviou dados inconsistentes  
* QUANDO o sistema processar a importação  
* ENTÃO o sistema deve registrar a inconsistência e impedir a exibição de dados inválidos

## **HU08 — Gerar relatórios (RF-08)**

COMO: administradora do shopping  
QUERO: gerar relatórios com base nos filtros aplicados no dashboard  
PARA: compartilhar informações consolidadas e apoiar análises gerenciais

**Critérios de Aceitação**

**Cenário 1 — Geração de relatório**

* DADO que a administradora aplicou filtros no dashboard  
* QUANDO solicitar a geração do relatório  
* ENTÃO o sistema deve gerar um relatório contendo apenas os dados filtrados

**Cenário 2 — Exportação do relatório**

* DADO que o relatório foi gerado com sucesso  
* QUANDO a administradora solicitar exportação  
* ENTÃO o sistema deve disponibilizar o relatório para download em formato compatível

## **HU09 — Visualizar logs de atualização (RF-09)**

COMO: administradora do shopping  
QUERO: visualizar o histórico de atualizações dos dados, incluindo data, hora e responsável  
PARA: garantir a rastreabilidade e confiabilidade das informações exibidas

**Critérios de Aceitação**

**Cenário 1 — Consulta de logs**

* DADO que existem atualizações registradas no sistema  
* QUANDO a administradora acessar os logs  
* ENTÃO o sistema deve exibir data, hora, usuário responsável e ação realizada

**Cenário 2 — Filtro de logs**

* DADO que existem múltiplos registros de log  
* QUANDO a administradora aplicar filtros por usuário ou período  
* ENTÃO o sistema deve exibir apenas os logs correspondentes aos filtros selecionados

## **HU10 — Visualizar histórico de ocorrências (RF-10)**

COMO: administradora do shopping  
QUERO: visualizar o histórico de ocorrências de cada lojista, incluindo status e resolução  
PARA: acompanhar problemas e avaliar a eficiência na resolução

**Critérios de Aceitação**

**Cenário 1 — Exibição do histórico**

* DADO que o lojista possui ocorrências registradas  
* QUANDO a administradora acessar o histórico de ocorrências  
* ENTÃO o sistema deve exibir descrição, status e resolução de cada ocorrência

**Cenário 2 — Atualização de status**

* DADO que uma ocorrência teve seu status alterado  
* QUANDO o histórico for consultado  
* ENTÃO o sistema deve apresentar o status atualizado da ocorrência

## **6\. Requisitos Funcionais**

## 

| ID | Descrição |
| ----- | ----- |
| RF-01 | O sistema deve permitir filtrar os dados do dashboard por loja, segmento, período (dia, mês, ano) e tipo de ocorrência. |
| RF-02 | O sistema deve exibir a linha do tempo completa do lojista, incluindo etapas desde a proposta, negociação, reformas até a operação.   |
| RF-03 | O sistema deve registrar notificações associadas a um lojista, incluindo data, tipo e descrição da ocorrência. |
| RF-04 | O sistema deve permitir a comparação de desempenho entre lojistas, exibindo dashboards conjuntos com métricas selecionadas. |
| RF-05 | O sistema deve exibir KPIs de desempenho dos lojistas, incluindo métricas de vendas, ocorrências e interações.  |
| RF-06 | O sistema deve importar automaticamente dados do sistema CRMALL.   |
| RF-07 | O sistema deve importar automaticamente dados do sistema Intranet Mall. |
| RF-08 | O sistema deve permitir a geração de relatórios com base nos filtros aplicados no dashboard.  |
| RF-09 | O sistema deve exibir o histórico de atualizações dos dados (logs), incluindo data, hora e usuário responsável.   |
| RF-10 | O sistema deve permitir visualizar o histórico de ocorrências por lojista, incluindo status e resolução.  |

## **7\. Requisitos Não Funcionais**

## 

| ID | Categoria | Descrição |
| ----- | ----- | ----- |
| RNF-01 | Desempenho | O sistema deve apresentar os dashboards em até 3 segundos após a solicitação do usuário. |
| RNF-02 | Segurança | O sistema deve exigir autenticação por login e senha para acesso às funcionalidades.   |
| RNF-03 | Segurança | Os dados trafegados devem ser protegidos por criptografia utilizando protocolo HTTPS.   |
| RNF-04 | Segurança | O sistema deve realizar backup automático dos dados a cada 24 horas. |
| RNF-05 | Usabilidade |  O usuário deve conseguir aplicar filtros no dashboard em no máximo 3 interações.   |
| RNF-06 | Disponibilidade | O sistema deve estar disponível 24 horas por dia, com no máximo 1 hora de indisponibilidade mensal.   |
| RNF-07 | Auditoria | O sistema deve registrar logs de acesso e alterações, incluindo data, hora e usuário responsável.   |
| RNF-08 | Responsividade  | O sistema deve ser compatível com dispositivos desktop, tablet e mobile, com layout responsivo.   |
| RNF-09 |  Interoperabilidade  | O sistema deve integrar com os sistemas CRMALL e Intranet Mall por meio de APIs.    |
| RNF-10 | Escalabilidade   | O sistema deve suportar pelo menos 200 usuários simultâneos mantendo tempo de resposta inferior a 3 segundos.  |
| RNF-11 | Manutenibilidade  | O sistema deve permitir atualizações e correções sem impactar o funcionamento das funcionalidades existentes.  |

## **8\. Regras de Negócio**

| ID | Regra |
| ----- | ----- |
| RN-01 | Somente usuários com perfil de administrador podem acessar todas as funcionalidades e dados do sistema.   |
| RN-02 | Usuários com perfis operacionais (marketing, comercial e relacionamento) devem acessar apenas as funcionalidades relacionadas ao seu setor.   |
| RN-03 | Cada lojista deve possuir um identificador único no sistema, não podendo haver duplicidade de cadastro.  |
| RN-04 | Toda notificação registrada deve estar obrigatoriamente associada a um lojista.  |
| RN-05 | As ocorrências devem possuir status definidos (ex: em aberto, em andamento, resolvido).  |
| RN-06 | Os dados importados dos sistemas CRMALL e Intranet Mall devem ser consolidados e padronizados antes de serem exibidos no dashboard. |
| RN-07 | A atualização dos dados provenientes dos sistemas externos deve ocorrer de forma automática e periódica.   |
| RN-08 | Os relatórios gerados devem refletir exatamente os filtros aplicados no momento da sua geração.   |
| RN-09 | Todas as ações realizadas pelos usuários devem ser registradas em logs para fins de auditoria.  |
| RN-10 | Apenas usuários autorizados podem visualizar dados sensíveis ou estratégicos do shopping.   |
| RN-11 | Não é permitido o acesso direto dos lojistas ao sistema. |

## **9\. Fluxos de Estados (Faremos depois)**

### **9.1 Descrição do Fluxo**

* 

### **9.2 Estados Identificados**

* 

### **9.3 Transições**

* 

**10\. Rastreabilidade**

| Necessidade | História de Usuário | RF | RNF | RN |
| ----- | ----- | ----- | ----- | ----- |
| **N1 – Centralização e integração de dados** | HU06 – Importar dados do CRMALL | RF-06 | RNF-09 (Interoperabilidade), RNF-11 (Confiabilidade) | RN-06, RN-07 |
| **N1 – Centralização e integração de dados** | HU07 – Importar dados da Intranet | RF-07 | RNF-09 (Interoperabilidade), RNF-11 (Confiabilidade) | RN-06, RN-07 |
| **N1 – Centralização e integração de dados** | HU09 – Visualizar logs de atualização | RF-09 | RNF-07 (Auditoria) | RN-09 |
| **N2 – Visão gerencial consolidada** | HU01 – Filtrar dados do dashboard | RF-01 | RNF-01 (Desempenho), RNF-05 (Usabilidade) | RN-08 |
| **N2 – Visão gerencial consolidada** | HU05 – Visualizar KPIs | RF-05 | RNF-01 (Desempenho) | RN-10 |
| **N2 – Visão gerencial consolidada** | HU08 – Gerar relatórios | RF-08 | RNF-01 (Desempenho) | RN-08 |
| **N3 – Histórico do lojista** | HU02 – Visualizar jornada do lojista | RF-02 | RNF-07 (Auditoria) | RN-03 |
| **N3 – Histórico do lojista** | HU10 – Histórico de ocorrências | RF-10 | RNF-07 (Auditoria) | RN-05 |
| **N3 – Histórico do lojista** | HU03 – Visualizar notificações | RF-03 | RNF-07 (Auditoria)  | RN-04 |
| **N4 – Análise comparativa** | HU04 – Comparar desempenho entre lojistas | RF-04 | RNF-01 (Desempenho) | RN-06 |
| **N5 – Apoio à decisão estratégica** | HU05 – Visualizar KPIs | RF-05 | RNF-01 (Desempenho) | RN-10 |
| **N5 – Apoio à decisão estratégica** | HU01 – Filtrar dados | RF-01 | RNF-05 (Usabilidade) | RN-08 |
| **N5 – Apoio à decisão estratégica** | HU08 – Gerar relatórios | RF-08 | RNF-01 (Desempenho) | RN-08 |

