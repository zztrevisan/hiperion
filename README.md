# Hiperion — site + sistema

Repositório de ponto de montagem: reúne dois projetos independentes no
mesmo disco. Cada um mantém seu próprio histórico, repositório remoto,
`vercel.json` e deploy Vercel — eles não compartilham domínio nem roteamento,
só são servidos lado a lado. Ver `docs/adr/0001-monorepo-via-submodulos-com-deploy-independente.md`.

```text
HIPERION - Site/      site institucional (Next.js) — submódulo git, remoto próprio
HIPERION - Sistema/   Hiperion Protocolos (Express) — submódulo git, remoto próprio
vercel.json              builda só HIPERION - Site/ (projeto Vercel "hiperion")
```

## Como os dois se conectam

- `HIPERION - Site/` é o que o `vercel.json` raiz builda, sob o projeto
  Vercel `hiperion`.
- `HIPERION - Sistema/` tem seu próprio `vercel.json` e seu próprio projeto
  Vercel (`hiperion-protocolos-teste` em teste), buildado a partir do
  repositório `PROTOCOLOS-SERVER` — não depende deste repositório raiz.
- O site institucional linka direto para a URL do sistema em
  `HIPERION - Site/components/portal/portalLinks.ts`, sem proxy e sem
  prefixo compartilhado.

## Submódulos

Este repositório usa `git submodule`. Depois de clonar:

```bash
git submodule update --init --recursive
```

Cada submódulo é commitado e enviado para seu próprio remoto, como antes:

```bash
cd "HIPERION - Site"    && git push origin main
cd "HIPERION - Sistema" && git push origin main
```

O repositório raiz só precisa de um novo commit quando você quiser apontar para
uma revisão mais recente de `HIPERION - Site` — o deploy do sistema não
depende deste repositório (`git add "HIPERION - Site"`).

## Variáveis de ambiente

As duas apps usam `RESEND_API_KEY` com nomes iguais; se forem contas Resend
diferentes, configure cada uma no seu próprio projeto Vercel. As demais
variáveis (`CONTACT_FROM_EMAIL`, `EMAIL_FROM`, `TURSO_*`, `CRON_SECRET`, etc.)
não colidem. Veja `HIPERION - Site/.env.example` e
`HIPERION - Sistema/.env.example`.
