/* Dejair, o gato mascote: desenho (SVG), humores, acessórios e falas.
   Para mudar a aparência padrão do Dejair, edite PELAGENS.laranja logo abaixo. */
(function () {
  const PELAGENS = {
    laranja: { nome: 'Laranja', pelo: '#F6A23C', listra: '#D97B1C', barriga: '#FFE9C9', orelha: '#F9B8A6' },
    cinza: { nome: 'Cinza', pelo: '#9AA3B5', listra: '#6F7890', barriga: '#EEF1F6', orelha: '#F4B9C3' },
    preto: { nome: 'Pantera', pelo: '#3B3F52', listra: '#2A2D3D', barriga: '#5A6078', orelha: '#E79AA9' },
    branco: { nome: 'Floco', pelo: '#FBFAF7', listra: '#E4DED2', barriga: '#FFFFFF', orelha: '#F8C3CC' },
    caramelo: { nome: 'Caramelo', pelo: '#C98A52', listra: '#9C6233', barriga: '#F6E3CC', orelha: '#F2B3A5' },
  };

  const TINTA = '#2D3142';

  /* Cada acessório é desenhado por cima do gato, no mesmo sistema de coordenadas (200 × 220). */
  const ACESSORIOS = {
    oculos: '<g fill="#fff" fill-opacity=".35" stroke="#2D3142" stroke-width="5"><circle cx="74" cy="84" r="19"/><circle cx="126" cy="84" r="19"/></g><path d="M93 84h14M55 82l-12-6M145 82l12-6" stroke="#2D3142" stroke-width="5" stroke-linecap="round" fill="none"/>',
    gravata: '<path d="M100 137 72 124v28zM100 137l28-13v28z" fill="#E8638B" stroke="#B53E65" stroke-width="3" stroke-linejoin="round"/><circle cx="100" cy="138" r="8" fill="#B53E65"/>',
    capelo: '<path d="M100 8 34 32l66 24 66-24z" fill="#2D3142"/><path d="M62 44v18c18 12 58 12 76 0V44l-38 14z" fill="#3D4259"/><path d="M158 34v28" stroke="#F4D35E" stroke-width="4" stroke-linecap="round"/><circle cx="158" cy="66" r="6" fill="#F4D35E"/>',
    coroa: '<path d="M58 44 52 8l24 18L100 2l24 24 24-18-6 36z" fill="#F4D35E" stroke="#C9A227" stroke-width="4" stroke-linejoin="round"/><circle cx="100" cy="30" r="6" fill="#E8638B"/><circle cx="74" cy="34" r="4" fill="#44BBA4"/><circle cx="126" cy="34" r="4" fill="#7B68EE"/>',
    bone: '<path d="M46 50c2-34 30-46 54-46s52 12 54 46z" fill="#2E86AB"/><path d="M46 50c-14 2-30 8-36 18 22-4 52-6 78-6z" fill="#1F6A8A"/><circle cx="100" cy="6" r="6" fill="#1F6A8A"/>',
    cachecol: '<path d="M54 126c28 16 64 16 92 0l6 16c-32 18-72 18-104 0z" fill="#44BBA4"/><path d="M122 138l14 40-22 4-10-38z" fill="#2F9C87"/><path d="M118 158l20-4M121 170l19-4" stroke="#fff" stroke-width="4" stroke-linecap="round"/>',
    laco: '<path d="M138 28 108 12v32zM138 28l30-16v32z" fill="#7B68EE" stroke="#5B4BC4" stroke-width="3" stroke-linejoin="round"/><circle cx="138" cy="28" r="8" fill="#5B4BC4"/>',
    mago: '<path d="M100 0 62 54h76z" fill="#5B4BC4"/><path d="M48 56c30-12 74-12 104 0-30 10-74 10-104 0z" fill="#7B68EE"/><path d="m100 22 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#F4D35E"/>',
  };

  const OLHOS = {
    normal: `<ellipse cx="74" cy="84" rx="11" ry="13" fill="${TINTA}"/><ellipse cx="126" cy="84" rx="11" ry="13" fill="${TINTA}"/><circle cx="78" cy="79" r="4.5" fill="#fff"/><circle cx="130" cy="79" r="4.5" fill="#fff"/>`,
    feliz: `<path d="M62 88q12-16 24 0M114 88q12-16 24 0" fill="none" stroke="${TINTA}" stroke-width="6" stroke-linecap="round"/>`,
    pensa: `<ellipse cx="74" cy="84" rx="11" ry="13" fill="${TINTA}"/><ellipse cx="126" cy="84" rx="11" ry="13" fill="${TINTA}"/><circle cx="79" cy="77" r="4.5" fill="#fff"/><circle cx="131" cy="77" r="4.5" fill="#fff"/><path d="M112 62q14-8 26 0" fill="none" stroke="${TINTA}" stroke-width="5" stroke-linecap="round"/>`,
    ops: `<ellipse cx="74" cy="86" rx="10" ry="11" fill="${TINTA}"/><ellipse cx="126" cy="86" rx="10" ry="11" fill="${TINTA}"/><circle cx="77" cy="82" r="4" fill="#fff"/><circle cx="129" cy="82" r="4" fill="#fff"/><path d="M60 68l22 6M140 68l-22 6" fill="none" stroke="${TINTA}" stroke-width="5" stroke-linecap="round"/><path d="M160 54c6 9 8 14 0 16-8-2-6-7 0-16z" fill="#7CC7F0"/>`,
  };
  const BOCAS = {
    normal: `<path d="M100 108v5M100 113q-8 9-16 2M100 113q8 9 16 2" fill="none" stroke="${TINTA}" stroke-width="4" stroke-linecap="round"/>`,
    feliz: `<path d="M84 111q16 22 32 0z" fill="#8A2D45" stroke="${TINTA}" stroke-width="4" stroke-linejoin="round"/><path d="M92 120q8 6 16 0-8-6-16 0z" fill="#F58CA5"/>`,
    pensa: `<path d="M92 116q8-5 16 0" fill="none" stroke="${TINTA}" stroke-width="4" stroke-linecap="round"/>`,
    ops: `<path d="M86 118q7-8 14 0t14 0" fill="none" stroke="${TINTA}" stroke-width="4" stroke-linecap="round"/>`,
  };
  /* Patas dianteiras: [esquerda, direita] por humor */
  const PATAS = {
    normal: '<ellipse cx="82" cy="176" rx="12" ry="16"/><ellipse cx="118" cy="176" rx="12" ry="16"/>',
    oi: '<ellipse cx="82" cy="176" rx="12" ry="16"/><g class="dj-aceno"><path d="M140 150q22-16 20-48" fill="none" stroke-width="18" stroke-linecap="round"/></g>',
    festa: '<path d="M56 150Q32 136 28 108" fill="none" stroke-width="18" stroke-linecap="round"/><path d="M144 150q24-14 28-42" fill="none" stroke-width="18" stroke-linecap="round"/>',
    pensa: '<ellipse cx="82" cy="176" rx="12" ry="16"/><path d="M134 158q14-14 4-34" fill="none" stroke-width="16" stroke-linecap="round"/>',
  };
  const HUMORES = {
    normal: ['normal', 'normal', 'normal'],
    oi: ['normal', 'feliz', 'oi'],
    feliz: ['feliz', 'feliz', 'normal'],
    festa: ['feliz', 'feliz', 'festa'],
    pensa: ['pensa', 'pensa', 'pensa'],
    ops: ['ops', 'ops', 'normal'],
  };

  /** Desenha o Dejair. opts: { humor, acessorio, pelo, classe } */
  function svg(opts) {
    const o = opts || {};
    const [olho, boca, pata] = HUMORES[o.humor] || HUMORES.normal;
    const p = PELAGENS[o.pelo] || PELAGENS.laranja;
    const ac = ACESSORIOS[o.acessorio] || '';
    return `<svg class="dejair ${o.classe || ''}" viewBox="0 0 200 220" role="img" aria-label="Dejair, o gato" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="212" rx="62" ry="7" fill="#2D3142" opacity=".12"/>
<path class="dj-rabo" d="M142 190c48 4 56-28 40-42" fill="none" stroke="${p.pelo}" stroke-width="16" stroke-linecap="round"/>
<ellipse cx="100" cy="168" rx="48" ry="42" fill="${p.pelo}"/>
<ellipse cx="100" cy="176" rx="28" ry="30" fill="${p.barriga}"/>
<ellipse cx="74" cy="206" rx="19" ry="10" fill="${p.pelo}"/><ellipse cx="126" cy="206" rx="19" ry="10" fill="${p.pelo}"/>
<g fill="${p.pelo}" stroke="${p.pelo}">${PATAS[pata]}</g>
<path d="M44 70 40 16l46 28z" fill="${p.pelo}"/><path d="M52 58l-3-26 24 15z" fill="${p.orelha}"/>
<path d="M156 70l4-54-46 28z" fill="${p.pelo}"/><path d="M148 58l3-26-24 15z" fill="${p.orelha}"/>
<ellipse cx="100" cy="88" rx="64" ry="55" fill="${p.pelo}"/>
<path d="M100 35v15M85 38l3 13M115 38l-3 13M38 86h13M40 99h11M162 86h-13M160 99h-11" fill="none" stroke="${p.listra}" stroke-width="6" stroke-linecap="round"/>
<ellipse cx="100" cy="110" rx="31" ry="23" fill="${p.barriga}"/>
${OLHOS[olho]}
<path d="M93 100h14l-7 8z" fill="#E8638B" stroke="#E8638B" stroke-width="3" stroke-linejoin="round"/>
${BOCAS[boca]}
<path d="M66 108 34 102M66 115l-30 6M134 108l32-6M134 115l30 6" fill="none" stroke="${TINTA}" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>
${ac}</svg>`;
  }

  const sorteia = a => a[Math.floor(Math.random() * a.length)];

  /* Falas. {n} vira o nome de quem joga (ou some, se não houver nome). */
  const FALAS = {
    acerto: [
      'Miau-ravilha, {n}! 🎉', 'Acertou em cheio, {n}! 🎯', 'Ronronei de orgulho! 😻', 'Isso aí, {n}! Certíssimo! ⭐',
      'Que salto de gato, {n}! 🐾', 'Gatástico! 🌟', 'Você é fera, {n}! 👏', 'Boa, {n}! Essa foi no bigode! 😸',
    ],
    combo: ['{c} seguidas, {n}! Tá pegando fogo! 🔥', 'Sequência de {c}! Ninguém te segura! 🔥', '{c} na sequência! Meus bigodes tremeram! 🔥'],
    erro: [
      'Quase, {n}! Errar é o cérebro aprendendo. 🧠', 'Calma, essa confunde muita gente. Olha só: 💡', 'Tudo bem, {n}! Até gato escorrega do telhado. 🐾',
      'Sem estresse, {n}. Lê a explicação que clareia. 🔍', 'Ainda não, mas você está chegando lá! 💪',
    ],
    inicio_novo: [
      'Oi, {n}! Eu sou o <b>Dejair</b>. Escolha uma matéria e vem trilhar comigo! 🐾',
    ],
    inicio: [
      'Que bom te ver, {n}! Qual trilha a gente segue hoje? 🐾', 'Voltou! Eu já estava afiando as garras, {n}. 😼',
      '{n}, a Professora Clara sempre diz: a regra de ouro é praticar! ✏️', 'Bora ganhar umas sardinhas, {n}? 🐟',
      'Um pouquinho por dia e você chega longe, {n}. 🚀',
    ],
    sequencia: ['{d} dias seguidos, {n}! Sua sequência está pegando fogo! 🔥'],
    nota_alta: ['Que nota linda, {n}! Você domina esse assunto! 🏆', 'Arrasou, {n}! Meus bigodes estão de pé! 😻', 'Miau! Isso é nota de quem estudou de verdade, {n}! 🌟'],
    nota_media: ['Mandou bem, {n}! Mais uma rodada e vira nota 10. 💪', 'Bom trabalho, {n}! Dá uma olhada no que errou e tenta de novo. 😸'],
    nota_baixa: ['Tudo bem, {n}. Ninguém nasce sabendo, nem gato! Leia o resumo e tente outra vez. 💜', 'Essa fase é difícil mesmo, {n}. Vamos rever juntos e tentar de novo? 🐾'],
    loja: ['Gostou de algum, {n}? Eu fico um charme com qualquer um. 😼', 'Sardinhas na pata, {n}! O que vamos escolher? 🐟'],
    conquistas: ['Olha quanta coisa você já conquistou, {n}! 🏅', 'Cada medalha aqui tem o seu esforço, {n}. 😻'],
    evolucao: ['Aqui dá para ver o quanto você cresceu, {n}. 📈', 'Devagar e sempre, {n}. Olha só o seu caminho! 🐾'],
    prova_trancada: ['Complete mais algumas fases e eu libero o Provão, {n}! 🔒'],
  };

  function fala(tipo, dados) {
    const d = dados || {};
    let s = sorteia(FALAS[tipo] || ['...']);
    const nome = d.n ? String(d.n).replace(/&/g, '&amp;').replace(/</g, '&lt;') : '';
    s = nome ? s.replace(/\{n\}/g, nome) : s.replace(/,\s*\{n\}/g, '').replace(/\{n\},\s*/g, '').replace(/\s*\{n\}/g, '');
    s = s.replace(/^./, c => c.toUpperCase());
    return s.replace(/\{c\}/g, d.c || '').replace(/\{d\}/g, d.d || '');
  }

  window.Dejair = { svg, fala, PELAGENS, ACESSORIOS };
})();
