# Modelo de pedido de tarefa

Não é obrigatório — pedido direto e curto continua funcionando igual. Isto é
para quando o pedido é grande ou tem partes que, se não ditas, o agente vai
ter que adivinhar (e pode adivinhar errado).

---

## O que eu quero

Em uma ou duas frases, o resultado que você quer ver, não os passos para
chegar lá.

## Onde isso vive

Site institucional, sistema de protocolos, ou os dois? Se souber a tela ou
arquivo, diga — economiza uma rodada de exploração.

## Como isso deveria se parecer / se comportar

Se tiver uma referência visual (print, outro sistema, outra tela já
existente deste projeto), diga. "Igual à tela X, mas com Y" é mais rápido de
atender do que descrever do zero.

## O que NÃO é para mudar

Qualquer coisa que pareça relacionada mas deve ficar como está. Isso evita o
agente "aproveitar" para mexer em algo que você não pediu.

## Dados reais envolvidos?

Se a tarefa grava em banco de produção/teste real, mexe em credencial, ou
lê/importa dado real de empresa — diga explicitamente. Por padrão, qualquer
teste deve usar dado fictício isolado (ver `CLAUDE.md` de `HIPERION - Sistema/`), então
"isso aqui precisa ir para o banco de verdade" é informação que muda como o
agente trabalha, não só o que ele entrega no final.

## Confirmação antes de publicar?

Padrão deste projeto: testar local, pedir confirmação, só então commit/push/
deploy. Se quiser pular alguma etapa dessa vez, diga aqui.
