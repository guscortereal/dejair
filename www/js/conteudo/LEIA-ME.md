# Conteúdo das matérias

Cada arquivo desta pasta acrescenta uma matéria a `window.DEJAIR_CONTEUDO`. Para criar ou editar questões, basta mexer aqui; o app não precisa de outra alteração. Depois de editar, rode `node testes/validar-conteudo.js`.

```js
window.DEJAIR_CONTEUDO = window.DEJAIR_CONTEUDO || [];
window.DEJAIR_CONTEUDO.push({
  id: 'historia', nome: 'História', icone: '🏛️', cor: '#C8553D',
  unidade: 'Unidade 4 — Cidadania, cultura e diversidade',
  desc: 'Uma linha sobre o que a trilha cobre.',
  topicos: [{
    id: 'abolicionismo', icone: '✊', nome: 'O movimento abolicionista',
    intro: 'Fala curta do Dejair abrindo a fase (1 a 2 frases).',
    resumo: [                       // 3 a 5 cartões curtos, lidos antes do quiz
      { t: 'Título do cartão', c: 'Texto curto. Pode usar <b>negrito</b> e <br>.' },
    ],
    q: [                            // pelo menos 10 questões por tópico
      { n: 1, t: 'mc',  p: 'Pergunta?', o: ['certa', 'errada', 'errada', 'errada'], e: 'Explicação.' },
      { n: 1, t: 'vf',  p: 'Afirmação para julgar.', r: true, e: 'Explicação.' },
      { n: 2, t: 'lac', p: 'Frase com uma ___ para completar.', o: ['certa', 'errada', 'errada'], e: 'Explicação.' },
      { n: 2, t: 'ord', p: 'Coloque em ordem…', o: ['primeiro', 'segundo', 'terceiro'], e: 'Explicação.' },
      { n: 3, t: 'par', p: 'Ligue cada … ao seu …', o: [['esq. 1', 'dir. 1'], ['esq. 2', 'dir. 2'], ['esq. 3', 'dir. 3']], e: 'Explicação.' },
    ],
  }],
});
```

## Regras

- `n` é o nível: 1 fácil, 2 médio, 3 desafio.
- `mc` (múltipla escolha, 4 opções) e `lac` (completar a lacuna, 3 ou 4 opções): **a opção certa é sempre a primeira** de `o`. O app embaralha na hora de mostrar.
- `vf` (verdadeiro ou falso): `r: true` ou `r: false`, sem opções.
- `ord` (ordenar): `o` já vem **na ordem correta**, de 3 a 5 itens. O app embaralha.
- `par` (ligar pares): 3 ou 4 pares `[esquerda, direita]`.
- `e` é a explicação mostrada depois da resposta, certa ou errada. Ela ensina; não repete só "a resposta é X".
- Nada de "todas as anteriores" ou "nenhuma das anteriores": a ordem muda a cada partida.
