# Hiperion

[![Site institucional](https://img.shields.io/badge/site-Next.js%2016-black?logo=nextdotjs)](https://www.hiperionassessoria.com.br)
[![Hiperion Protocolos](https://img.shields.io/badge/protocolos-Express%205-black?logo=express)](https://hiperion-protocolos-teste.vercel.app)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![Banco](https://img.shields.io/badge/banco-Turso%20%2F%20SQLite-4ff8d2?logo=sqlite)](https://turso.tech)

Ponto de montagem dos dois produtos digitais da Hiperion Assessoria Contábil,
escritório de contabilidade fundado em 1969 em São Paulo. Este repositório
não tem código-fonte próprio — só reúne os dois no mesmo lugar para facilitar
o trabalho do dia a dia.

## Produtos

| Produto | O que é | Stack |
| --- | --- | --- |
| [HIPERION - Site](HIPERION%20-%20Site/) | Site institucional: apresentação do escritório, serviços, história e Insights, em três idiomas | Next.js, React, Three.js |
| [HIPERION - Sistema](HIPERION%20-%20Sistema/) | Hiperion Protocolos: emissão, transporte, retirada e conferência de documentos, com QR Code e assinatura | Express, Turso, PWA offline |

## Arquitetura

```mermaid
flowchart LR
    V[Visitante] --> S[HIPERION - Site\nprojeto Vercel hiperion]
    S -- link direto, sem proxy --> P[HIPERION - Sistema\nprojeto Vercel próprio]
```

Os dois produtos são repositórios git independentes, montados aqui via `git
submodule`, cada um com seu próprio histórico, remoto e deploy Vercel. Eles
não compartilham domínio nem roteamento. O porquê dessa escolha está em
[Monorepo via submódulos com deploy independente](docs/adr/0001-monorepo-via-submodulos-com-deploy-independente.md).

## Primeiros passos

```bash
git clone --recurse-submodules https://github.com/zztrevisan/hiperion.git
```

Já clonou sem `--recurse-submodules`? Rode:

```bash
git submodule update --init --recursive
```

Cada produto tem seu próprio `README.md` com instruções de execução local,
variáveis de ambiente e documentação de domínio:

- [HIPERION - Site/README.md](HIPERION%20-%20Site/README.md)
- [HIPERION - Sistema/README.md](HIPERION%20-%20Sistema/README.md)

## Trabalhando nos submódulos

Commit e push acontecem **dentro** do submódulo, nunca aqui na raiz:

```bash
cd "HIPERION - Site"    && git push origin main
cd "HIPERION - Sistema" && git push origin main
```

A raiz só precisa de um commit novo quando o deploy do site precisa apontar
para uma revisão mais recente (`git add "HIPERION - Site"`) — o deploy do
sistema é independente deste repositório.

## Variáveis de ambiente

As duas apps usam `RESEND_API_KEY` com nomes iguais; se forem contas Resend
diferentes, configure cada uma no seu próprio projeto Vercel. As demais
variáveis (`CONTACT_FROM_EMAIL`, `EMAIL_FROM`, `TURSO_*`, `CRON_SECRET`, etc.)
não colidem. Veja `HIPERION - Site/.env.example` e
`HIPERION - Sistema/.env.example`.

## Documentação

**HIPERION - Site**
[Arquitetura](HIPERION%20-%20Site/docs/arquitetura/ARQUITETURA.md) ·
[Design system](HIPERION%20-%20Site/docs/arquitetura/DESIGN-SYSTEM.md) ·
[Glossário de domínio](HIPERION%20-%20Site/docs/CONTEXT.md) ·
[Decisões de arquitetura](HIPERION%20-%20Site/docs/adr/)

**HIPERION - Sistema**
[Arquitetura](HIPERION%20-%20Sistema/docs/arquitetura/ARQUITETURA.md) ·
[Design system](HIPERION%20-%20Sistema/docs/arquitetura/DESIGN-SYSTEM.md) ·
[Fluxos operacionais](HIPERION%20-%20Sistema/docs/arquitetura/FLUXOS.md) ·
[Segurança](HIPERION%20-%20Sistema/docs/operacao/SEGURANCA.md) ·
[Glossário de domínio](HIPERION%20-%20Sistema/docs/CONTEXT.md) ·
[Decisões de arquitetura](HIPERION%20-%20Sistema/docs/adr/)

**Desta raiz**
[Decisões de arquitetura](docs/adr/) ·
[`AGENTS.md`](AGENTS.md) (onde cada pedido deve ser trabalhado)

## Licença

Software proprietário de **Guilherme Andrade dos Santos Trevisan**. A
presença do código nestes repositórios não concede permissão de uso, cópia,
modificação, redistribuição ou exploração comercial.

**Copyright © 2026 Guilherme Andrade dos Santos Trevisan. Todos os direitos reservados.**
