# C4 Model — JPMALL

## 1. Visão Geral do Sistema

O JPMALL é uma plataforma de análise e inteligência de dados para gestão estratégica de lojistas em shopping centers.

O sistema tem como objetivo centralizar, integrar e consolidar informações provenientes de diferentes áreas e sistemas do shopping, permitindo a criação de dashboards, relatórios, indicadores de desempenho (KPIs), histórico do lojista e suporte à tomada de decisão.

O sistema atua como uma camada analítica, não substituindo sistemas operacionais existentes como CRMALL e Intranet Mall.

---

# Nível 1 — Diagrama de Contexto (System Context)

## Sistema: JPMALL

### Usuários

### Administradora do Shopping
**Descrição:**
Usuário principal responsável pela análise estratégica dos dados dos lojistas.

**Interações:**
- Visualiza dashboards
- Consulta KPIs
- Analisa histórico dos lojistas
- Gera relatórios
- Compara desempenho entre lojistas
- Consulta logs e auditoria


### Equipe de Marketing

**Descrição:**
Usuários operacionais que utilizam informações consolidadas para ações de relacionamento e marketing.

**Interações:**
- Consulta informações dos lojistas
- Analisa dados segmentados


### Equipe Comercial

**Descrição:**
Utiliza dados para acompanhamento comercial e tomada de decisões.

**Interações:**
- Consulta jornada do lojista
- Analisa desempenho


### Equipe de Relacionamento

**Descrição:**
Responsável pelo acompanhamento das interações e ocorrências.

**Interações:**
- Consulta notificações
- Consulta histórico de ocorrências


### Gestores/Diretoria

**Descrição:**
Tomadores de decisão estratégica.

**Interações:**
- Analisa indicadores
- Avalia desempenho geral do shopping


### Equipe de TI

**Descrição:**
Responsável pelo suporte, integração e manutenção.

**Interações:**
- Gerencia integrações
- Monitora funcionamento


---

# Sistemas Externos

## CRMALL

Sistema externo responsável por fornecer dados operacionais e históricos dos lojistas.

**Integração:**
- Importação automática de dados
- Sincronização periódica via API


## Intranet Mall

Sistema externo utilizado como fonte complementar de informações.

**Integração:**
- Envio de dados
- Padronização e consolidação


---

# Nível 2 — Diagrama de Containers

## Sistema JPMALL

O sistema é composto pelos seguintes containers:

---

## Interface Web JPMALL

**Responsabilidade:**
Interface utilizada pelos usuários para acessar informações.

**Tecnologias sugeridas:**
- Aplicação Web
- Front-end responsivo


**Funcionalidades:**
- Dashboards interativos
- Filtros
- Relatórios
- Consulta de histórico
- Visualização de notificações
- Consulta de logs


---

## API JPMALL

**Responsabilidade:**
Camada responsável pela comunicação entre interface, banco e integrações externas.


**Funções:**

- Gerenciar autenticação
- Aplicar regras de negócio
- Disponibilizar dados
- Controlar permissões
- Processar consultas


---

## Serviço de Integração

**Responsabilidade:**
Realizar comunicação com sistemas externos.


**Integrações:**

CRMALL:
- Importação automática
- Tratamento dos dados


Intranet Mall:
- Sincronização
- Padronização das informações


---

## Banco de Dados JPMALL

**Responsabilidade:**
Armazenar dados consolidados do sistema.


**Armazena:**

- Dados dos lojistas
- Histórico da jornada
- Ocorrências
- Notificações
- Indicadores
- Logs
- Relatórios


---

## Serviço de Processamento Analítico

**Responsabilidade:**
Transformar dados brutos em informações estratégicas.


**Funções:**

- Cálculo de KPIs
- Consolidação de indicadores
- Comparação entre lojistas
- Geração de métricas


---

# Nível 3 — Diagrama de Componentes

## Container: API JPMALL

### Componente: Autenticação e Autorização

Responsável por:

- Login
- Controle de acesso
- Perfis de usuário


Perfis:

- Administrador
- Marketing
- Comercial
- Relacionamento
- TI


---

### Componente: Dashboard Controller

Responsável por:

- Receber filtros
- Consultar indicadores
- Retornar dados consolidados


Atende:

- RF01
- RF05


---

### Componente: Relatórios

Responsável por:

- Gerar relatórios personalizados
- Exportar informações


Atende:

- RF08


---

### Componente: Jornada do Lojista

Responsável por:

- Exibir linha do tempo
- Consolidar eventos históricos


Atende:

- RF02


---

### Componente: Gestão de Ocorrências

Responsável por:

- Registrar consultas
- Exibir status
- Acompanhar resolução


Atende:

- RF10


---

### Componente: Gestão de Notificações

Responsável por:

- Consultar notificações
- Manter histórico de interações


Atende:

- RF03


---

### Componente: Comparação de Desempenho

Responsável por:

- Comparar lojistas
- Gerar análises comparativas


Atende:

- RF04


---

### Componente: Integração Externa

Responsável por:

- Comunicação com CRMALL
- Comunicação com Intranet Mall
- Tratamento de inconsistências


Atende:

- RF06
- RF07


---

### Componente: Auditoria e Logs

Responsável por:

- Registrar alterações
- Registrar acessos
- Garantir rastreabilidade


Atende:

- RF09


---

# Fluxo Geral do Sistema

Usuário
↓
Interface Web JPMALL
↓
API JPMALL
↓
┌─────────────────────┐
│ Regras de Negócio   │
└─────────────────────┘
↓
Banco de Dados JPMALL

Banco recebe dados de:

CRMALL → Serviço de Integração
Intranet Mall → Serviço de Integração


Dados consolidados são processados:

Banco de Dados
↓
Serviço Analítico
↓
Dashboards / Relatórios / KPIs


---

# Requisitos Não Funcionais relacionados à arquitetura

## Segurança

- Autenticação obrigatória
- HTTPS
- Controle de permissões
- Auditoria de ações


## Desempenho

- Dashboards carregados em até 3 segundos
- Suporte a múltiplos usuários simultâneos


## Disponibilidade

- Funcionamento contínuo
- Backup automático


## Escalabilidade

- Arquitetura preparada para crescimento de usuários e dados


## Interoperabilidade

- Integração via APIs com CRMALL e Intranet Mall


---

# Resumo Arquitetural

O JPMALL funciona como uma plataforma analítica centralizadora.

Ele recebe dados de sistemas externos, realiza tratamento e consolidação, armazena informações históricas e fornece visualizações estratégicas para apoiar decisões dos gestores do shopping.
