# Hiperion

[![Site institucional](https://img.shields.io/badge/site-Next.js%2016-black?logo=nextdotjs)](https://www.hiperionassessoria.com.br)
[![Hiperion Protocolos](https://img.shields.io/badge/protocolos-Express%205-black?logo=express)](https://hiperion-protocolos-teste.vercel.app)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![Banco](https://img.shields.io/badge/banco-Turso%20%2F%20SQLite-4ff8d2?logo=sqlite)](https://turso.tech)

Hiperion Assessoria Contábil é um escritório de contabilidade fundado em 1969
em São Paulo. Este repositório é o ponto de montagem dos dois produtos
digitais do escritório — não tem código-fonte próprio, só reúne os dois no
mesmo lugar para facilitar o trabalho do dia a dia.

| Produto | O que é | Stack | Repositório |
|---|---|---|---|
| **[HIPERION - Site](HIPERION%20-%20Site/)** | Site institucional: apresentação do escritório, serviços, história e Insights, em três idiomas | Next.js 16, React 19, Three.js, GSAP | [`hiperion-site`](https://github.com/zztrevisan/hiperion-site) |
| **[HIPERION - Sistema](HIPERION%20-%20Sistema/)** | Hiperion Protocolos: emissão, transporte, retirada e conferência de documentos, com QR Code e assinatura | Express 5, Turso, PWA offline | [`PROTOCOLOS-SERVER`](https://github.com/zztrevisan/PROTOCOLOS-SERVER) |

## Arquitetura

Os dois produtos são **repositórios git independentes**, montados aqui via
`git submodule`, cada um com seu próprio histórico, remoto e deploy Vercel —
eles não compartilham domínio nem roteamento, só são servidos lado a lado.
O porquê dessa escolha (em vez de um monorepo de verdade, ou de um proxy
compartilhado) está documentado em
[`docs/adr/0001-monorepo-via-submodulos-com-deploy-independente.md`](docs/adr/0001-monorepo-via-submodulos-com-deploy-independente.md).

```text
                      ┌─────────────────────────┐
  www.hiperionassessoria.com.br
                      │   HIPERION - Site/       │   projeto Vercel "hiperion"
                      │   (Next.js)               │   buildado por este repo
                      └────────────┬──────────────┘
                                   │ link direto (sem proxy, sem prefixo)
                                   ▼
                      ┌─────────────────────────┐
  hiperion-protocolos-*.vercel.app
                      │   HIPERION - Sistema/     │   projeto Vercel próprio
                      │   (Express + Turso)        │   build independente
                      └─────────────────────────┘
```

## Primeiros passos

```bash
git clone --recurse-submodules https://github.com/zztrevisan/hiperion.git
# ou, se já clonou sem --recurse-submodules:
git submodule update --init --recursive
```

Cada produto tem seu próprio `README.md` com instruções de execução local,
variáveis de ambiente e documentação de domínio — comece por lá:

- [`HIPERION - Site/README.md`](HIPERION%20-%20Site/README.md)
- [`HIPERION - Sistema/README.md`](HIPERION%20-%20Sistema/README.md)

## Trabalhando nos submódulos

Commit e push acontecem **dentro** do submódulo, nunca aqui na raiz:

```bash
cd "HIPERION - Site"    && git push origin main
cd "HIPERION - Sistema" && git push origin main
```

A raiz só precisa de um commit novo quando o deploy do site precisa apontar
para uma revisão mais recente (`git add "HIPERION - Site"`) — o deploy do
sistema é independente deste repositório.

## Continuidade e documentação

Este repositório segue um sistema de continuidade pensado para trabalho
assistido por IA, replicado nos dois submódulos:

- [`AGENTS.md`](AGENTS.md) — ponto de entrada: onde cada tipo de pedido deve
  ser trabalhado.
- [`docs/adr/`](docs/adr/) — decisões de arquitetura deste nível raiz.
- [`docs/continuidade/`](docs/continuidade/) — modelos para pedir uma tarefa
  grande (`TASK_PROMPT_TEMPLATE.md`) e para resumir uma sessão longa antes de
  encerrar (`TASK_CONTINUITY_TEMPLATE.md`).

## Variáveis de ambiente

As duas apps usam `RESEND_API_KEY` com nomes iguais; se forem contas Resend
diferentes, configure cada uma no seu próprio projeto Vercel. As demais
variáveis (`CONTACT_FROM_EMAIL`, `EMAIL_FROM`, `TURSO_*`, `CRON_SECRET`, etc.)
não colidem. Veja `HIPERION - Site/.env.example` e
`HIPERION - Sistema/.env.example`.
