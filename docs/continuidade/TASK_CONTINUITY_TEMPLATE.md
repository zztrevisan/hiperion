# Modelo de continuidade de tarefa

Preencha isto ao fim de uma sessão longa (ou quando o contexto for resumido)
para que a próxima sessão — sua ou de outro agente — não precise rederivar
tudo lendo a conversa inteira de novo. Cole o resultado como a primeira
mensagem da próxima sessão, ou salve como `docs/sessoes/<data>-<assunto>.md`
se valer a pena guardar.

---

## Projeto e escopo

Qual submódulo (`HIPERION - Site/` ou `HIPERION - Sistema/`) e qual área dele. Se cruzou os dois,
diga isso também.

## O que foi pedido

A(s) frase(s) originais do usuário, o mais literal possível — não a sua
interpretação delas. Inclua respostas a perguntas de esclarecimento que
mudaram o escopo pelo caminho.

## O que foi feito

Lista objetiva, na ordem em que aconteceu. Para cada item: o quê, em que
arquivo(s), e se já foi testado/commitado/publicado ou ainda não. Não narre
o processo de debug a menos que a causa raiz importe para quem continuar
(ex.: "o `.env` local não tem credencial do Turso de propósito — ver
ADR-0005" é importante; "tentei três vezes até acertar a sintaxe do
PowerShell" não é).

## Decisões tomadas e por quê

Qualquer escolha que não era óbvia a partir do pedido — a opção descartada e
o motivo, não só a opção escolhida. Se virou ADR, aponte para ele em vez de
repetir o conteúdo.

## Pendente

O que falta para o pedido estar completo, em ordem de dependência (o que
precisa acontecer primeiro). Separe o que só falta *eu* fazer do que
depende de uma ação da pessoa (rodar um comando, confirmar algo, fornecer
uma credencial).

## Estado dos testes

`npm test` passou? Foi testado manualmente (navegador, visual)? Foi
publicado (commit, push, deploy)? Se não foi tudo isso, diga exatamente o
que falta — "testei localmente mas não fiz deploy" é uma frase válida e
necessária aqui.

## Pistas para quem continuar

Qualquer coisa que economize tempo de quem pegar isso: um arquivo-chave para
ler primeiro, um comando exato que já funcionou, um jeito de testar que já
se mostrou necessário (ex.: "sempre defina `SQLITE_DATABASE_PATH` explícito
antes de rodar scripts locais, nunca toque no banco operacional").
