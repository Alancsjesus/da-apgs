# PLANO DE DESENVOLVIMENTO — PORTAL WEB DA APGS/UFBA
**Versão:** 1.0  
**Data:** Maio de 2026  
**Gestão:** Diretório Acadêmico de Administração Pública e Gestão Social — UFBA

---

## SUMÁRIO

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Stack Tecnológica](#2-stack-tecnológica)
3. [Arquitetura do Sistema](#3-arquitetura-do-sistema)
4. [Módulos e Funcionalidades](#4-módulos-e-funcionalidades)
5. [Estrutura de Diretórios do Projeto](#5-estrutura-de-diretórios-do-projeto)
6. [Painel Administrativo (CMS Headless)](#6-painel-administrativo-cms-headless)
7. [Integrações Externas](#7-integrações-externas)
8. [Cronograma de Desenvolvimento](#8-cronograma-de-desenvolvimento)
9. [Estratégia de Hospedagem Custo Zero](#9-estratégia-de-hospedagem-custo-zero)
10. [Estrutura de Responsabilidades](#10-estrutura-de-responsabilidades)
11. [Critérios de Aceite por Módulo](#11-critérios-de-aceite-por-módulo)

---

## 1. VISÃO GERAL DO SISTEMA

O **Portal DA APGS** será um site institucional moderno, leve e totalmente autogerenciável pela própria diretoria, **sem dependência de WordPress ou qualquer CMS proprietário**. A estratégia adotada é a de **site estático gerado por código** (Static Site Generation — SSG), com um painel de administração visual integrado ao GitHub, permitindo que qualquer membro autorizado publique conteúdo diretamente pelo navegador, sem escrever uma linha de código.

### Princípios Norteadores

| Princípio | Descrição |
|-----------|-----------|
| **Custo Zero** | Hospedagem, CMS e formulários 100% gratuitos |
| **Autonomia** | Qualquer diretoria publica conteúdo sem saber programar |
| **Transparência** | Documentos públicos acessíveis e rastreáveis |
| **Segurança** | Sem banco de dados exposto; superfície de ataque mínima |
| **Longevidade** | Código aberto; a gestão seguinte herda tudo sem custo de migração |

---

## 2. STACK TECNOLÓGICA

### 2.1 Frontend (Interface do Usuário)

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | **Next.js 14** (modo estático) | Geração de páginas estáticas; excelente SEO; amplamente documentado |
| Linguagem | **TypeScript** | Reduz erros; facilita manutenção por futuros colaboradores |
| Estilização | **Tailwind CSS** | Classes utilitárias; design responsivo rápido; sem CSS customizado complexo |
| Ícones | **Lucide React** | Biblioteca leve e open source |
| Fontes | **Google Fonts** (Inter + Merriweather) | Gratuito; identidade visual acadêmica |

### 2.2 Gerenciamento de Conteúdo (CMS)

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| CMS Headless | **Decap CMS** (ex-Netlify CMS) | Open source; painel visual no navegador; salva direto no GitHub |
| Repositório de Conteúdo | **GitHub** | Controle de versão de todo conteúdo; histórico de alterações |
| Formato de Conteúdo | **Markdown (.md) + YAML front-matter** | Legível por humanos; editável pelo painel ou direto no arquivo |

### 2.3 Hospedagem e Deploy

| Serviço | Uso | Custo |
|---------|-----|-------|
| **GitHub Pages** | Hospedagem do site | R$ 0,00 |
| **GitHub Actions** | CI/CD automático (build + deploy a cada publicação) | R$ 0,00 |
| **Cloudflare** | CDN, HTTPS gratuito e apontamento de domínio | R$ 0,00 |
| **Registro.br** | Domínio `daapgs.org.br` | ~R$ 40,00/ano |

### 2.4 Serviços de Apoio

| Serviço | Uso | Custo |
|---------|-----|-------|
| **Google Drive** | Armazenamento de PDFs (atas, artigos, TCCs) | R$ 0,00 |
| **Tally.so** | Formulário "DA Escuta" (ouvidoria) | R$ 0,00 |
| **Google Analytics 4** | Métricas de acesso ao portal | R$ 0,00 |

---

## 3. ARQUITETURA DO SISTEMA

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUÁRIO FINAL                           │
│              (Aluno, Professor, Visitante)                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CLOUDFLARE CDN                              │
│              (Cache global + proteção DDoS)                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB PAGES                                 │
│         (Hospedagem dos arquivos HTML/CSS/JS gerados)          │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Build automático via
                           │ GitHub Actions
┌─────────────────────────────────────────────────────────────────┐
│                   REPOSITÓRIO GITHUB                            │
│    ┌──────────────────┐    ┌──────────────────────────────┐    │
│    │   Código-fonte   │    │   Conteúdo (.md / YAML)      │    │
│    │   (Next.js)      │    │   Atas, Notícias, Artigos    │    │
│    └──────────────────┘    └──────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Interface visual (navegador)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PAINEL DECAP CMS                              │
│         daapgs.org.br/admin  (acesso restrito por senha)        │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────────┐  │
│   │ Notícias │ │  Atas    │ │ Artigos  │ │   Disciplinas   │  │
│   └──────────┘ └──────────┘ └──────────┘ └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                           │ PDFs grandes
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                  GOOGLE DRIVE INSTITUCIONAL                     │
│         (Armazenamento de PDFs linkados no site)               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. MÓDULOS E FUNCIONALIDADES

### 4.1 Home — Página Inicial

**Objetivo:** Apresentação institucional e comunicados rápidos.

**Componentes:**
- Header com logotipo, nome do DA e menu de navegação responsivo
- Banner hero com chamada institucional e botão de acesso ao Estatuto
- Seção "Últimas Notícias" (cards com as 3 publicações mais recentes)
- Seção "Próximos Eventos" (calendário simplificado)
- Seção "Aviso em Destaque" (editável pelo painel; ex: edital de assembleia)
- Footer com redes sociais, e-mail institucional e links rápidos

**Administração:** A diretoria cria notícias e eventos pelo painel Decap CMS, e o site atualiza automaticamente em até 2 minutos via GitHub Actions.

---

### 4.2 Transparência — Arquivo Institucional

**Objetivo:** Cumprir a obrigação estatutária de publicação em até 10 dias úteis.

**Subseções:**
- **Atas de Reuniões** — listagem cronológica com download em PDF
- **Estatuto Consolidado** — versão vigente sempre atualizada
- **Relatórios Mensais** — balanço de atividades por gestão
- **Prestações de Contas** — documentos financeiros por período

**Funcionalidades técnicas:**
- Filtro por ano/mês
- Badge de "Novo" para documentos publicados nos últimos 10 dias
- Metadados visíveis: data de publicação, tipo de documento, responsável pela assinatura
- PDFs armazenados no Google Drive Institucional (link público gerado pela pasta compartilhada)

**Administração:** Upload do PDF no Google Drive → cópia do link → preenchimento do formulário no Decap CMS → publicação automática.

---

### 4.3 DA Escuta — Ouvidoria Digital

**Objetivo:** Canal seguro, acessível e rastreável para demandas acadêmicas e de assistência estudantil.

**Funcionalidades:**
- Formulário integrado via **Tally.so** com os campos:
  - Tipo de demanda (Acadêmica / Assistência Estudantil / Sugestão / Denúncia / Outro)
  - Descrição da demanda
  - Opção de identificação ou anonimato
  - Contato para retorno (opcional)
- Confirmação automática por e-mail ao solicitante
- Respostas centralizadas em planilha do Google Sheets (acesso restrito à diretoria)
- Prazo público de resposta exibido na página (ex: "Respondemos em até 7 dias úteis")

**Segurança:** O formulário Tally.so possui proteção anti-spam nativa. Nenhum dado é armazenado no próprio site.

---

### 4.4 Revista Estudantil — "Saber em Movimento"

**Objetivo:** Publicação semestral em modelo Open Access.

**Funcionalidades:**
- Página de apresentação da revista (ISSN, missão, escopo)
- Listagem de edições publicadas (cards por volume/número)
- Página interna de cada edição com:
  - Sumário clicável
  - Ficha técnica (editores, pareceristas)
  - Download do número completo em PDF
  - Download individual de cada artigo em PDF
- Seção de chamada para submissões (quando aberta)
- Normas para autores (PDF ou página dedicada)

**Administração:** A Diretoria Acadêmica cadastra cada edição no painel com título, resumo, PDF do número completo e lista de artigos.

---

### 4.5 Acervo Acadêmico

**Objetivo:** Repositório de conhecimento produzido pelos estudantes de APGS.

#### 4.5.1 Repositório de Trabalhos

**Funcionalidades:**
- Cadastro de TCCs, artigos e resumos por estudantes (com moderação pela diretoria antes de publicar)
- Campos: título, autor(es), ano, orientador, palavras-chave, resumo, link para PDF
- Busca por palavra-chave e filtro por ano/tipo
- Licença Creative Commons exibida em cada trabalho

#### 4.5.2 Central de Disciplinas

**Funcionalidades:**
- Organização por semestre letivo (1º ao 8º período)
- Cada disciplina contém:
  - Ementa oficial
  - Indicações bibliográficas (com links para versões digitais gratuitas quando disponíveis)
  - Materiais de apoio enviados voluntariamente por estudantes (PDFs linkados no Drive)
- Filtro por semestre e por área temática (Administração / Gestão Social / Direito / etc.)

**Administração:** Diretoria Acadêmica gerencia pelo painel; materiais de alunos passam por aprovação antes de aparecer publicamente.

---

## 5. ESTRUTURA DE DIRETÓRIOS DO PROJETO

```
da-apgs/
├── public/                    # Arquivos estáticos públicos
│   ├── images/                # Logotipos, fotos institucionais
│   └── favicon.ico
│
├── content/                   # Todo o conteúdo gerenciado pelo CMS
│   ├── noticias/              # Arquivos .md de cada notícia
│   ├── eventos/               # Arquivos .md de cada evento
│   ├── atas/                  # Metadados das atas (link para Drive)
│   ├── relatorios/            # Metadados dos relatórios
│   ├── revista/               # Edições da revista
│   │   └── edicao-01/
│   │       ├── index.md       # Metadados da edição
│   │       └── artigos/       # Um .md por artigo
│   ├── acervo/
│   │   ├── trabalhos/         # TCCs e artigos cadastrados
│   │   └── disciplinas/       # Uma pasta por semestre
│   └── config/
│       └── site.yaml          # Configurações gerais (nome, redes sociais)
│
├── src/
│   ├── app/                   # Rotas Next.js (App Router)
│   │   ├── page.tsx           # Home
│   │   ├── transparencia/
│   │   ├── da-escuta/
│   │   ├── revista/
│   │   ├── acervo/
│   │   └── admin/             # Painel Decap CMS
│   │
│   ├── components/            # Componentes React reutilizáveis
│   │   ├── layout/            # Header, Footer, Nav
│   │   ├── ui/                # Botões, Cards, Badges, Modais
│   │   └── sections/          # Seções específicas de cada página
│   │
│   └── lib/                   # Funções utilitárias
│       ├── content.ts         # Leitura e parsing dos arquivos Markdown
│       └── utils.ts           # Helpers gerais
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # Pipeline de build e deploy automático
│
├── public/admin/
│   └── config.yml             # Configuração do Decap CMS
│
├── next.config.js             # Configuração do Next.js (modo estático)
├── tailwind.config.ts         # Configuração do Tailwind CSS
├── tsconfig.json
└── package.json
```

---

## 6. PAINEL ADMINISTRATIVO (CMS HEADLESS)

O **Decap CMS** disponibiliza uma interface visual acessível em `daapgs.org.br/admin`. Não exige instalação; funciona direto no navegador.

### 6.1 Fluxo de Publicação de Conteúdo

```
Membro da Diretoria
       │
       ▼
Acessa daapgs.org.br/admin
       │
       ▼
Faz login com conta GitHub (autorizada pelo administrador)
       │
       ▼
Escolhe a coleção: Notícias / Atas / Revista / Acervo
       │
       ▼
Preenche o formulário visual (campos, texto, imagem, link do PDF)
       │
       ▼
Clica em "Publicar"
       │
       ▼
Decap CMS cria/edita o arquivo .md no GitHub automaticamente
       │
       ▼
GitHub Actions detecta a alteração e reconstrói o site (~90 segundos)
       │
       ▼
Conteúdo publicado em produção
```

### 6.2 Permissões por Cargo

| Cargo | Permissão no CMS |
|-------|-----------------|
| Presidente / Vice | Acesso total (todas as coleções) |
| Dir. de Comunicação | Notícias, Eventos, Banner de Destaque |
| Dir. Acadêmica | Revista, Acervo, Disciplinas |
| Dir. de Finanças | Prestações de Contas, Relatórios |
| Dir. de Assuntos Gerais | Atas, Documentos da DA Escuta |

---

## 7. INTEGRAÇÕES EXTERNAS

### 7.1 Google Drive — Armazenamento de PDFs

- Criação de uma conta Google institucional (`da.apgs.ufba@gmail.com`)
- Estrutura de pastas espelhando as seções do site
- Todos os PDFs recebem link público de visualização/download
- Esses links são inseridos nos formulários do CMS; o arquivo em si **não sobe para o GitHub** (evita ultrapassar o limite de 1 GB do repositório gratuito)

### 7.2 Tally.so — Formulário DA Escuta

- Formulário criado e hospedado no Tally.so
- Incorporado ao site via `<iframe>` na página DA Escuta
- Respostas enviadas automaticamente para uma planilha Google Sheets
- Notificações de novas respostas via e-mail para a diretoria responsável

### 7.3 GitHub Actions — Pipeline de Deploy

A cada `git push` (seja pelo CMS ou por um desenvolvedor), o seguinte pipeline é executado automaticamente:

```yaml
1. Checkout do repositório
2. Instalação das dependências (npm install)
3. Build estático (next build && next export)
4. Deploy dos arquivos gerados para o branch gh-pages
5. Cloudflare invalida o cache automaticamente
```

Tempo médio de deploy: **60 a 120 segundos**.

---

## 8. CRONOGRAMA DE DESENVOLVIMENTO

### FASE 1 — Fundação e Identidade (Semanas 1–2)

| Tarefa | Responsável | Entrega |
|--------|-------------|---------|
| Criar repositório GitHub `da-apgs` | Dev / Dir. Comunicação | Dia 1 |
| Configurar GitHub Pages + domínio daapgs.org.br | Dev | Dia 2 |
| Apontar domínio no Registro.br para o Cloudflare | Dir. Finanças + Dev | Dia 3 |
| Criar conta Google institucional | Dir. Comunicação | Dia 3 |
| Definir paleta de cores e tipografia | Dir. Comunicação | Dia 5 |
| Criar logotipo (Canva ou Figma) | Dir. Comunicação | Dia 7 |
| Configurar projeto Next.js + Tailwind CSS | Dev | Dia 7 |
| Configurar Decap CMS com autenticação GitHub | Dev | Dia 10 |

**Marco da Fase 1:** Site no ar com página de "Em breve" e identidade visual definida.

---

### FASE 2 — Estruturação das Páginas (Semanas 3–5)

| Tarefa | Responsável | Entrega |
|--------|-------------|---------|
| Desenvolvimento do layout base (Header + Footer) | Dev | Semana 3 |
| Página Home com seção de notícias e eventos | Dev | Semana 3 |
| Página Transparência com listagem de documentos | Dev | Semana 4 |
| Página DA Escuta com formulário Tally incorporado | Dev | Semana 4 |
| Página Revista Estudantil | Dev | Semana 5 |
| Páginas do Acervo Acadêmico (trabalhos + disciplinas) | Dev | Semana 5 |

**Marco da Fase 2:** Todas as páginas navegáveis, ainda sem conteúdo real.

---

### FASE 3 — Alimentação de Conteúdo (Semana 6)

| Tarefa | Responsável | Entrega |
|--------|-------------|---------|
| Upload das atas vigentes no Google Drive | Dir. Assuntos Gerais | Dia 1 |
| Cadastro das atas no painel CMS | Dir. Assuntos Gerais | Dia 2 |
| Upload e cadastro do Estatuto Consolidado | Vice-Presidência | Dia 2 |
| Cadastro das disciplinas por semestre | Dir. Acadêmica | Dias 3–5 |
| Publicação das primeiras notícias | Dir. Comunicação | Dia 5 |
| Teste completo de todos os formulários | Toda a diretoria | Dia 7 |

**Marco da Fase 3:** Site com conteúdo real, pronto para lançamento.

---

### FASE 4 — Lançamento (Semana 7)

| Tarefa | Responsável | Entrega |
|--------|-------------|---------|
| Teste de usabilidade com 3 alunos externos | Dir. Comunicação | Dia 1–2 |
| Correções finais de ajuste | Dev | Dia 3 |
| Divulgação nas salas de aula | Toda a diretoria | Dia 4 |
| Divulgação nas redes sociais (Instagram, WhatsApp) | Dir. Comunicação | Dia 4 |
| Divulgação por e-mail para professores e coordenação | Presidência | Dia 5 |

**Marco da Fase 4:** Lançamento oficial no início das aulas.

---

### FASE 5 — Manutenção Contínua (Pós-lançamento)

| Atividade | Frequência | Responsável |
|-----------|-----------|-------------|
| Publicação de notícias e eventos | Sob demanda | Dir. Comunicação |
| Upload de atas (prazo: 10 dias úteis) | Após cada reunião | Dir. Assuntos Gerais |
| Atualização das disciplinas | A cada semestre | Dir. Acadêmica |
| Publicação da Revista | Semestral | Dir. Acadêmica |
| Renovação do domínio | Anual | Dir. Finanças |
| Atualização de dependências do projeto | Semestral | Dev (ou novo colaborador) |

---

## 9. ESTRATÉGIA DE HOSPEDAGEM CUSTO ZERO

| Item | Ferramenta | Custo Anual |
|------|-----------|-------------|
| Domínio `.org.br` | Registro.br | ~R$ 40,00 |
| Hospedagem do site | GitHub Pages | R$ 0,00 |
| CDN + HTTPS | Cloudflare (Free) | R$ 0,00 |
| Build e deploy automático | GitHub Actions | R$ 0,00 |
| Painel de administração | Decap CMS | R$ 0,00 |
| Armazenamento de PDFs | Google Drive | R$ 0,00 |
| Formulário de ouvidoria | Tally.so | R$ 0,00 |
| E-mails de notificação | Gmail institucional | R$ 0,00 |
| Métricas de acesso | Google Analytics 4 | R$ 0,00 |
| **TOTAL** | | **~R$ 40,00/ano** |

---

## 10. ESTRUTURA DE RESPONSABILIDADES

```
PRESIDÊNCIA
└── Aprovação final do conteúdo sensível (notas oficiais, comunicados formais)

VICE-PRESIDÊNCIA
└── Supervisão do repositório de documentos oficiais (Estatuto, Atas)
    └── Validação de conformidade estatutária

DIRETORIA DE COMUNICAÇÃO E RELAÇÕES INSTITUCIONAIS
├── Gestão do painel CMS (notícias, eventos, banner)
├── Identidade visual do site
└── Divulgação do portal nas redes sociais

DIRETORIA DE ASSUNTOS ACADÊMICOS E EVENTOS
├── Gestão da Revista Estudantil
├── Curadoria do Acervo (TCCs, artigos)
└── Manutenção da Central de Disciplinas

DIRETORIA DE ASSUNTOS GERAIS / OUVIDORIA
├── Monitoramento e respostas da DA Escuta
└── Upload e cadastro das atas no prazo estatutário

DIRETORIA DE FINANÇAS
├── Pagamento anual do domínio (Registro.br)
└── Upload das prestações de contas

DEV / COLABORADOR TÉCNICO (voluntário ou calouro)
├── Desenvolvimento inicial das fases 1 e 2
├── Treinamento da diretoria no uso do painel CMS
└── Suporte técnico semestral (atualizações de dependências)
```

---

## 11. CRITÉRIOS DE ACEITE POR MÓDULO

### Home
- [ ] Página carrega em menos de 3 segundos em conexão 4G
- [ ] Menu responsivo funciona em telas de celular (320px até 1920px)
- [ ] Notícias e eventos publicados no CMS aparecem em até 2 minutos
- [ ] Banner de destaque editável pelo painel sem precisar de código

### Transparência
- [ ] Todos os documentos possuem link funcional para download no Drive
- [ ] Filtro por ano/mês funciona corretamente
- [ ] Badge "Novo" aparece nos documentos publicados nos últimos 10 dias
- [ ] Página acessível diretamente por URL canônica (`/transparencia`)

### DA Escuta
- [ ] Formulário Tally carrega dentro da página sem redirecionamento
- [ ] Submissão cria linha na planilha Google Sheets da diretoria
- [ ] Mensagem de confirmação aparece após envio
- [ ] Funciona com JavaScript desabilitado (fallback para link direto do Tally)

### Revista Estudantil
- [ ] Cada edição possui página própria com sumário e artigos listados
- [ ] Download de artigo individual funciona corretamente
- [ ] Seção de "Chamada Aberta" pode ser ativada/desativada pelo painel

### Acervo Acadêmico
- [ ] Busca por palavra-chave retorna resultados corretos
- [ ] Filtro por semestre na Central de Disciplinas funciona
- [ ] Trabalho submetido por aluno só aparece após aprovação da diretoria
- [ ] Licença Creative Commons exibida em cada trabalho

### Painel CMS
- [ ] Login com conta GitHub autorizada funciona sem erros
- [ ] Publicação de notícia reflete no site em até 2 minutos
- [ ] Upload de imagem pelo painel funciona corretamente
- [ ] Cada cargo de diretoria acessa apenas as coleções de sua competência

---

*Documento elaborado para a Gestão 2026 do Diretório Acadêmico de Administração Pública e Gestão Social — EAUFBA/UFBA.*  
*Revisão técnica pendente de aprovação na próxima reunião da Diretoria Executiva.*
