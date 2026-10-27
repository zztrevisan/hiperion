# Monorepo via submódulos git, com cada projeto em um deploy Vercel independente

`HIPERION - Site` (institucional, Next.js) e `HIPERION - Sistema` (Hiperion
Protocolos, Express) são dois produtos com públicos, ritmos de mudança e
históricos de commit completamente diferentes. Juntar os dois código-fonte
num monorepo de verdade (um único `package.json`, um único histórico git)
misturaria o commit de um ajuste de copy do site com o de uma regra de
permissão do sistema interno, e obrigaria os dois a compartilhar versão de
dependências que não têm por que ser as mesmas.

A saída foi manter cada um como repositório independente, com remoto
próprio, montados aqui via `git submodule`. Esse repositório raiz é só o
ponto de encontro dos dois no disco — ele não representa como os dois são
servidos.

Uma versão anterior desta decisão (commit `b2cd346`, 2026-10-09) tentou unir
os dois sob um projeto Vercel só, com uma ponte (`api/sistema-entry.js`) que
removia o prefixo `/sistema` do `req.url` antes de delegar pro Express. Essa
ponte foi revertida no commit `7ba6c17` (2026-10-15, "volta /sistema a ser
link direto, nao mais path-proxy") — manter dois apps heterogêneos atrás de
um `vercel.json` só trazia mais acoplamento de deploy do que valia a pena
pelo domínio compartilhado.

A arquitetura atual: cada submódulo é seu próprio projeto Vercel,
independente, com seu próprio `vercel.json` e seu próprio `.vercel/project.json`.
`HIPERION - Site/` builda sob o projeto `hiperion` (referenciado pelo
`vercel.json` raiz, que só conhece o caminho de
`HIPERION - Site/package.json`).
`HIPERION - Sistema/` builda sozinho sob o projeto
`hiperion-protocolos-teste` (ou o de produção), a partir do próprio
repositório `PROTOCOLOS-SERVER` — o deploy dele não depende em nada deste
repositório raiz. O site institucional só linka direto para a URL do sistema
(`HIPERION - Site/components/portal/portalLinks.ts`), sem proxy, sem prefixo
compartilhado.

## Consequências

Trabalhar em qualquer um dos dois projetos significa commitar e dar push
dentro do submódulo (`cd "HIPERION - Site" && git push` / `cd "HIPERION - Sistema" && git push`);
o repositório raiz só precisa de um commit novo quando alguém quiser que o
deploy do projeto `hiperion` (o site) aponte para uma revisão mais recente de
`HIPERION - Site` (`git add "HIPERION - Site"`, aqui na raiz) — o sistema
não precisa disso, porque seu deploy nem olha para este repositório.

Cada submódulo mantém seu próprio `AGENTS.md`/`CLAUDE.md` e sua própria
documentação de domínio — este `AGENTS.md` raiz só descreve a montagem, não
duplica regra de negócio de nenhum dos dois. Mudar a URL pública do sistema
(`portalLinks.ts`) é a única forma de "religar" os dois produtos — não existe
mais um roteamento compartilhado para manter sincronizado.
