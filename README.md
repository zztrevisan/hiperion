# Hiperion — site + sistema

Repositório de deploy que une dois projetos independentes em um único domínio e
projeto Vercel. Cada projeto mantém seu próprio histórico, repositório remoto e
fluxo de trabalho — aqui eles só são combinados na hora de servir.

```text
site/      site institucional (Next.js) — submódulo git, remoto próprio
sistema/   Hiperion Protocolos (Express) — submódulo git, remoto próprio
api/       ponte de deploy que expõe o `sistema` sob o prefixo "/sistema"
vercel.json  roteamento: "/sistema*" vai para o Express, o resto cai no Next.js
```

## Como funciona o roteamento

- Qualquer caminho fora de `/sistema` é servido pelo site em Next.js (`site/`).
- `/sistema` e `/sistema/*` são servidos pela app Express de `sistema/server-turso.js`,
  através de `api/sistema-entry.js`, que só remove o prefixo `/sistema` do `req.url`
  antes de delegar — o código do submódulo `sistema` não é alterado.
- Arquivos estáticos da PWA de protocolos (`sistema/public/**`) são servidos
  diretamente pela Vercel sob `/sistema/<arquivo>`.

## Submódulos

Este repositório usa `git submodule`. Depois de clonar:

```bash
git submodule update --init --recursive
```

Cada submódulo é commitado e enviado para seu próprio remoto, como antes:

```bash
cd site    && git push origin main   # ou cd sistema && git push origin main
```

O repositório raiz só precisa de um novo commit quando você quiser apontar para
uma revisão mais recente de `site` ou `sistema` (`git add site` / `git add sistema`).

## Variáveis de ambiente

As duas apps usam `RESEND_API_KEY` com nomes iguais; se forem contas Resend
diferentes, configure qual valor vale no projeto Vercel único. As demais
variáveis (`CONTACT_FROM_EMAIL`, `EMAIL_FROM`, `TURSO_*`, `CRON_SECRET`, etc.)
não colidem. Veja `site/.env.example` e `sistema/.env.example`.
