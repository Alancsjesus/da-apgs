# Portal DA APGS / UFBA

Portal institucional do Diretório Acadêmico de Administração Pública e Gestão Social — UFBA.

## Como rodar localmente

### Pré-requisitos
- Node.js 20+
- Go 1.22+ (opcional, para o backend de formulários)

### Frontend (Next.js)

```bash
npm install
npm run dev
# Acesse http://localhost:3000
```

### Backend Go (opcional — só necessário para o formulário DA Escuta)

```bash
cd api
go mod tidy
go run ./cmd/server
# API disponível em http://localhost:8080
```

## Estrutura

```
DA_APGS/
├── api/              ← Backend Go (API REST de formulários)
├── content/          ← Conteúdo editável (JSON)
│   ├── noticias/
│   ├── eventos/
│   ├── transparencia/
│   ├── revista/
│   ├── acervo/
│   └── escuta/
├── src/
│   ├── app/          ← Páginas Next.js
│   ├── components/   ← Componentes React
│   ├── lib/          ← Utilitários e leitura de conteúdo
│   └── types/        ← Tipos TypeScript
├── public/           ← Arquivos estáticos
└── .github/workflows ← Deploy automático
```

## Como publicar conteúdo

1. Edite o arquivo JSON correspondente em `content/`
2. Faça `git commit` + `git push` para o branch `main`
3. O GitHub Actions faz o build e deploy automaticamente (~2 min)

## Custo

| Item | Custo |
|------|-------|
| Hospedagem do site | R$ 0,00 (GitHub Pages) |
| PDFs e arquivos | R$ 0,00 (Google Drive) |
| Domínio `.org.br` | ~R$ 40,00/ano |
| **Total** | **~R$ 40,00/ano** |
