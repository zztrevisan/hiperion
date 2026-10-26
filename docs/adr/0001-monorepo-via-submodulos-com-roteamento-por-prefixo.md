# Monorepo via submódulos git, com roteamento por prefixo na Vercel

`site` (institucional, Next.js) e `sistema` (Hiperion Protocolos, Express)
são dois produtos com públicos, ritmos de mudança e históricos de commit
completamente diferentes, mas precisam sair sob o mesmo domínio e o mesmo
projeto Vercel. Juntar os dois código-fonte num monorepo de verdade (um
único `package.json`, um único histórico git) misturaria o commit de um
ajuste de copy do site com o de uma regra de permissão do sistema interno, e
obrigaria os dois a compartilhar versão de dependências que não têm por que
ser as mesmas.

A saída foi manter cada um como repositório independente, com remoto
próprio, e usar este repositório raiz só como ponto de montagem: `git
submodule` aponta para uma revisão de cada um, e `vercel.json` decide o
roteamento por prefixo — tudo fora de `/sistema` cai no Next.js, `/sistema` e
`/sistema/*` são servidos pela app Express através de `api/sistema-entry.js`,
que só remove o prefixo do `req.url` antes de delegar. O código do submódulo
`sistema` não sabe que está atrás de um prefixo.

## Consequências

Trabalhar em qualquer um dos dois projetos significa commitar e dar push
dentro do submódulo (`cd site && git push` / `cd sistema && git push`); o
repositório raiz só precisa de um commit novo quando alguém quiser que o
deploy aponte para uma revisão mais recente de um dos dois (`git add site`
ou `git add sistema`, aqui na raiz). Esquecer esse segundo commit não quebra
nada de imediato — o deploy continua servindo a revisão antiga apontada —
mas é a causa mais provável de "falei que mudei e não aparece no ar".

Cada submódulo mantém seu próprio `AGENTS.md`/`CLAUDE.md` e sua própria
documentação de domínio — este `AGENTS.md` raiz só descreve a montagem, não
duplica regra de negócio de nenhum dos dois.
