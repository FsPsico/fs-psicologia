# FS Psicologia Clínica — site + blog (Astro)

Site institucional (landing) e blog de **FS Psicologia Clínica e Saúde Mental**
— Felipe Zecchin Salim, psicólogo clínico (CRP 06/216021), São Paulo.

Projeto único em **Astro**: a landing page (idêntica à original) e um blog em
`/blog`, com edição por um CMS gratuito (**Sveltia**) e deploy automático na
**Netlify**.

> Não é técnico e só quer publicar um texto? Vá direto para **[COMO-PUBLICAR.md](./COMO-PUBLICAR.md)**.

---

## Stack

- **Astro 5** — gera HTML estático (rápido e bom para SEO).
- **Content Collections** — posts em Markdown (`src/content/blog/`).
- **@astrojs/sitemap** + **@astrojs/rss** — sitemap e feed RSS automáticos.
- **Sveltia CMS** — painel de edição em `/admin` (login pelo GitHub, sem servidor).
- **Netlify** — hospedagem e build a cada commit.

## Rodar localmente

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # abre em http://localhost:4321
npm run build    # gera o site final na pasta dist/
npm run preview  # pré-visualiza o build de produção
```

> Em `npm run dev`, posts marcados como **rascunho** ficam visíveis para você revisar.
> No site publicado (`build`), rascunhos ficam ocultos.

## Estrutura

```
.
├─ public/                  # arquivos servidos como estão (na raiz do site)
│  ├─ assets/               # css, js, imagens, ícones, uploads do CMS
│  ├─ admin/                # painel Sveltia CMS (index.html + config.yml)
│  ├─ favicon.ico  robots.txt
├─ src/
│  ├─ consts.ts             # dados do site, autor (CRP) e JSON-LD do negócio
│  ├─ content.config.ts     # esquema dos posts (frontmatter)
│  ├─ content/blog/         # os posts em Markdown
│  ├─ components/           # Header, Footer, BaseHead, PostCard, AuthorBox
│  ├─ layouts/              # BaseLayout, BlogPost
│  └─ pages/
│     ├─ index.astro        # a landing (pixel a pixel igual à original)
│     ├─ rss.xml.js         # feed RSS
│     └─ blog/              # /blog, /blog/[slug], /blog/categoria/[category]
├─ astro.config.mjs         # site: https://fspsicologiaclinica.com.br
└─ netlify.toml             # build na Netlify
```

## SEO e dados estruturados

- `<html lang="pt-BR">` em todas as páginas.
- Por página: `<title>`, meta description, canonical, Open Graph e Twitter Card.
- **Landing:** JSON-LD `Psychologist` / `MedicalBusiness` (mantido da versão original).
- **Cada post:** JSON-LD `BlogPosting` com `author` (Felipe Zecchin Salim + CRP)
  e `publisher` (a clínica).
- `sitemap-index.xml` (inclui os posts) e `rss.xml` gerados no build.

## Categorias do blog (clusters de autoridade)

`carreira-e-trabalho` · `ansiedade-e-transicoes` · `relacoes-e-autoconhecimento`
(definidas em `src/consts.ts`).

## Editar o conteúdo

- **Posts:** pelo painel em `https://SEU-DOMINIO/admin` (veja COMO-PUBLICAR.md),
  ou criando arquivos `.md` em `src/content/blog/`.
- **Textos da landing:** em `src/pages/index.astro`.
- **Dados do negócio / autor / WhatsApp:** em `src/consts.ts`.

## Repositório

Já configurado para **`FsPsico/fs-psicologia`** em `public/admin/config.yml`
(linha `repo:`). Se um dia mudar de repositório, é só atualizar essa linha.
