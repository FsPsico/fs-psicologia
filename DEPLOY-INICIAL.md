# Publicação inicial (uma única vez)

Passo a passo para colocar o site no ar com **deploy automático**: cada vez que
um texto for publicado (ou um arquivo mudar), a Netlify reconstrói o site sozinho.

Você vai fazer isto **uma vez**. Depois, é só usar o painel
([COMO-PUBLICAR.md](./COMO-PUBLICAR.md)).

> Ordem: **(1) GitHub → (2) Netlify → (3) login do painel → (4) domínio → (5) conferências.**

---

## 1. Enviar o projeto para o GitHub

O GitHub guarda o código; a Netlify lê de lá.

1. Crie uma conta em **https://github.com** (se ainda não tiver).
2. Clique em **+ (canto superior direito) → New repository**.
   - **Repository name:** digite exatamente `fs-psicologia`.
   - Deixe **Public** (ou Private, tanto faz).
   - **Não** marque “Add a README”. Clique em **Create repository**.
3. O caminho será `FsPsico/fs-psicologia` — que **já está configurado** no
   `public/admin/config.yml`. Nada a ajustar.
4. Envie os arquivos. Duas formas:
   - **Pela tela do GitHub (mais simples):** no repositório vazio, clique em
     **“uploading an existing file”** e arraste **todos os arquivos e pastas do
     projeto** (menos a pasta `node_modules`, se existir). Clique em
     **Commit changes**.
   - **Pelo computador (se souber usar Git):**
     ```bash
     git init
     git add .
     git commit -m "Site + blog em Astro"
     git branch -M main
     git remote add origin https://github.com/FsPsico/fs-psicologia.git
     git push -u origin main
     ```

---

## 2. Conectar na Netlify (deploy automático)

1. Crie conta em **https://app.netlify.com** — escolha **“Sign up with GitHub”**
   (entrar com o GitHub) para já ligar os dois.
2. Clique em **Add new site → Import an existing project**.
3. Escolha **GitHub** e autorize. Selecione o repositório `fs-psicologia`.
4. A Netlify detecta o Astro sozinho. Confirme:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   (já vêm prontos pelo arquivo `netlify.toml`.)
5. Clique em **Deploy site**. Em 1–2 minutos o site estará no ar num endereço
   provisório tipo `nome-aleatorio.netlify.app`. **Abra e confira** se a landing e
   o `/blog` aparecem certos.

> A partir daqui, **todo commit no GitHub** (inclusive os feitos pelo painel)
> dispara um novo deploy automático.

---

## 3. Ativar o login do painel (Sveltia)

Não precisa de servidor. O login usa um **token pessoal do GitHub**.

1. Acesse `https://nome-aleatorio.netlify.app/admin` (ou já no seu domínio, após o
   passo 4).
2. Clique em **Sign In with Token**.
3. Siga o link que o painel oferece para **gerar o token no GitHub** (ele já abre
   com as permissões certas). Em **Generate token**, copie o código e cole no painel.
4. Pronto — você está dentro do painel. Guarde o token em local seguro.

> Detalhes do uso diário do painel estão em **COMO-PUBLICAR.md**.

---

## 4. Apontar o domínio fspsicologiaclinica.com.br para a Netlify
### …**sem mexer no seu e-mail** (registros MX continuam no Hostinger)

A ideia: manter o domínio e o **DNS no Hostinger** (onde está o e-mail) e apenas
**trocar para onde o site aponta**. Assim os registros **MX (e-mail) ficam intactos**.

### 4a. Adicionar o domínio na Netlify
1. Na Netlify: **Site configuration → Domain management → Add a domain**.
2. Digite `fspsicologiaclinica.com.br` e confirme. A Netlify vai dizer que o
   domínio está em outro provedor e mostrar a opção **“Use external DNS / Set up
   the records manually”** — escolha essa (NÃO troque os nameservers, para não
   mexer no e-mail).
3. A Netlify mostra **quais registros criar**. Normalmente são:
   - **A** (domínio raiz `@`) → `75.2.60.5`
   - **CNAME** (`www`) → `nome-aleatorio.netlify.app`
   > **Use sempre os valores que a Netlify exibir na sua tela.** Os acima são os
   > padrões da Netlify e servem de referência caso a tela não apareça.

### 4b. Editar o DNS no Hostinger
1. No **hPanel** da Hostinger: **Domínios → fspsicologiaclinica.com.br → DNS / Nameservers**
   (ou **Zona DNS**).
2. **Não altere os nameservers.** Você vai só editar/adicionar registros:
   - Encontre o registro **A** do tipo `@` (host raiz) que hoje aponta para o
     Hostinger e **troque o valor (IP)** para o que a Netlify indicou (ex.: `75.2.60.5`).
   - No registro **CNAME** `www`, aponte para `nome-aleatorio.netlify.app`
     (crie se não existir; se houver um `www` antigo, edite-o).
   - **Não toque em nada que tenha tipo `MX`** nem nos registros de e-mail
     (SPF/DKIM, geralmente tipo `TXT`). É isso que mantém seu e-mail funcionando.
3. Salve.

### 4c. Esperar e ativar HTTPS
1. A propagação leva de alguns minutos até ~24h (normalmente rápido).
2. De volta à Netlify, em **Domain management**, quando o domínio for reconhecido,
   ela emite o **certificado HTTPS automaticamente** (Let’s Encrypt). Se houver um
   botão **“Verify DNS configuration”** ou **“Provision certificate”**, clique.
3. Em **Domain management**, defina `fspsicologiaclinica.com.br` como
   **Primary domain** e ative **“Force HTTPS”**.

> Depois que o domínio apontar para a Netlify, lembre que o **site antigo do
> Hostinger Horizons deixa de ser exibido** — quem acessar verá o site novo.
> Seu e-mail continua igual, pois os MX não foram tocados.

---

## 5. Conferências finais

1. **Site no ar com cadeado:** abra `https://fspsicologiaclinica.com.br` — deve
   aparecer o site novo, com HTTPS (cadeado).
2. **Idioma e título:** botão direito → **Exibir código-fonte** e confira
   `<html lang="pt-BR">` e o `<title>` no topo.
3. **Dados estruturados (JSON-LD):** abra o **Teste de Resultados Avançados**
   (**https://search.google.com/test/rich-results**), cole a URL da home e a de um
   post publicado. Deve reconhecer:
   - na home: o negócio (**Psychologist / MedicalBusiness**);
   - no post: um **Artigo (BlogPosting)** com autor e CRP.
4. **Compartilhamento (WhatsApp):** mande o link do site (e de um post) para você
   mesmo — deve aparecer a imagem e o título. Para forçar atualização do preview,
   use o **Facebook Sharing Debugger**
   (**https://developers.facebook.com/tools/debug/** → colar URL → Scrape Again).
5. **Google (recomendado):** cadastre o site no **Google Search Console**
   (**https://search.google.com/search-console**) e em **Sitemaps** envie
   `https://fspsicologiaclinica.com.br/sitemap-index.xml`.

---

## Quando precisar de ajuda

- **Esqueci de trocar o repositório no config.yml** → o painel `/admin` não conecta.
  Edite `public/admin/config.yml`, corrija a linha `repo:` e faça commit.
- **O e-mail parou** → algum registro MX foi alterado por engano. Restaure os MX
  originais do Hostinger (o suporte da Hostinger tem esses valores).
- **O site não atualiza** → veja em **Netlify → Deploys** se o último build passou
  (verde). Se falhou (vermelho), o log mostra o motivo.
