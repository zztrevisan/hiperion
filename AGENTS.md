# HIPER SITEPRO — ponto de montagem

Este repositório não tem código-fonte próprio além da ponte de deploy. É só
onde `site/` e `sistema/` (dois submódulos git, cada um com repositório,
remoto e histórico independentes) se juntam para sair sob um domínio e um
projeto Vercel só. Ver `docs/adr/0001-monorepo-via-submodulos-com-roteamento-por-prefixo.md`
para o porquê, e `README.md` para os detalhes de roteamento.

**Antes de mexer em qualquer coisa, descubra em qual dos dois projetos o
pedido realmente vive** — quase nunca é este nível raiz:

- Pedido sobre o site institucional (marketing, três idiomas, Insights,
  contato): trabalhe dentro de `site/`, leia `site/AGENTS.md` primeiro.
- Pedido sobre protocolos, retiradas, calendário, entregadores, Empresas, ou
  qualquer coisa do sistema interno: trabalhe dentro de `sistema/`, leia
  `sistema/AGENTS.md` primeiro (que aponta para `sistema/CLAUDE.md`, onde
  ficam as autorizações permanentes do usuário).

## Language

Português do Brasil, em tudo que for prosa — commits, documentação,
comentários, texto de interface. Cada submódulo detalha suas próprias
convenções de identificador de código no próprio `AGENTS.md`.

## Regra de ouro dos submódulos

Commit e push acontecem **dentro** do submódulo (`cd site && git push` ou
`cd sistema && git push`), nunca aqui na raiz tentando versionar o conteúdo
deles diretamente. O commit aqui na raiz só é necessário quando o deploy
precisa apontar para uma revisão mais nova de um dos dois — ver o ADR acima.

## Domain docs

Este nível raiz não tem domínio de negócio próprio (é só roteamento), então
não tem `CONTEXT.md`. Tem `docs/adr/` para as decisões que são, de fato,
sobre a montagem dos dois projetos e não sobre nenhum deles especificamente.

## Continuidade entre sessões

Conversas longas (uma só sessão cobrindo várias tarefas, ou uma tarefa que
atravessa várias sessões) usam dois modelos, nesta raiz:

- `TASK_PROMPT_TEMPLATE.md` — para pedir uma tarefa grande sem deixar
  premissa importante por dizer.
- `TASK_CONTINUITY_TEMPLATE.md` — para o agente preencher ao fim de uma
  sessão longa, resumindo o que foi feito e o que falta, para a próxima
  sessão não precisar reler a conversa inteira.

Nenhum dos dois é obrigatório para pedidos curtos e diretos.
