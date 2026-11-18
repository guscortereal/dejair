/* Trilhas do Dejair — telas, navegação e o jogo de perguntas. */
(function () {
  'use strict';
  const P = window.Progresso, D = window.Dejair;
  const app = document.getElementById('app'), nav = document.getElementById('nav');
  const VERSAO = '1.0.0';
  const EM_BREVE = [{ nome: 'Matemática', icone: '🧮' }, { nome: 'Português', icone: '📚' }];
  const QUESTOES_FASE = 8, QUESTOES_PROVA = 12;

  /* ---------- utilidades ---------- */
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const fmt = n => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.', ','));
  const materias = () => window.DEJAIR_CONTEUDO || [];
  const acha = id => materias().find(m => m.id === id);
  const gato = (humor, classe) => D.svg({ humor, classe, acessorio: P.e.usando.acessorio, pelo: P.e.usando.pelo });
  const fala = (tipo, d) => D.fala(tipo, Object.assign({ n: P.e.nome }, d));
  const estrelas = n => `<span class="estrelas" aria-label="${n} de 3 estrelas">${[0, 1, 2].map(i => `<i class="${i < n ? 'on' : ''}">★</i>`).join('')}</span>`;
  const vibra = ms => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* sem vibração */ } };
  /* A rota fica guardada aqui; o endereço (#/...) acompanha quando o ambiente permite, para o botão Voltar funcionar. */
  let ATUAL = location.hash || '#/';
  const ir = (h, trocar) => {
    ATUAL = h;
    try { if (trocar) location.replace(h); else location.hash = h; } catch (e) { /* endereço bloqueado: segue só com a rota interna */ }
    if (location.hash !== h) { limpaConfete(); rota(); window.scrollTo(0, 0); }
  };

  /* ---------- som ---------- */
  const Som = (() => {
    let ctx;
    const NOTAS = {
      toque: [[520, 0, .05]], certo: [[660, 0, .1], [880, .09, .18]], erro: [[220, 0, .16, 'triangle'], [175, .13, .24, 'triangle']],
      festa: [[523, 0, .12], [659, .1, .12], [784, .2, .12], [1047, .3, .32]], compra: [[784, 0, .08], [1175, .07, .22]],
    };
    function toca(nome) {
      if (!P.e.som) return;
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        const t = ctx.currentTime;
        (NOTAS[nome] || []).forEach(([f, d, dur, tipo]) => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.type = tipo || 'sine'; o.frequency.value = f;
          g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(.16, t + d + .015); g.gain.exponentialRampToValueAtTime(0.0001, t + d + dur);
          o.connect(g); g.connect(ctx.destination); o.start(t + d); o.stop(t + d + dur + .03);
        });
      } catch (e) { /* aparelho sem áudio: segue em silêncio */ }
    }
    return { toca };
  })();

  /* ---------- confete ---------- */
  function confete(n) {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.getElementById('confete'); const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = innerWidth * dpr; c.height = innerHeight * dpr; const x = c.getContext('2d'); x.scale(dpr, dpr);
    const CORES = ['#7B68EE', '#F6A23C', '#44BBA4', '#E8638B', '#F4D35E', '#2E86AB'];
    const ps = Array.from({ length: n || 120 }, () => ({ x: Math.random() * innerWidth, y: -20 - Math.random() * 220, r: 4 + Math.random() * 6, vy: 2.5 + Math.random() * 4, vx: -1.5 + Math.random() * 3, cor: CORES[Math.floor(Math.random() * CORES.length)], g: Math.random() * 6 }));
    const t0 = Date.now(); const minha = confete.vez = (confete.vez || 0) + 1;
    (function quadro() {
      x.clearRect(0, 0, innerWidth, innerHeight);
      if (Date.now() - t0 > 2800 || confete.vez !== minha) return;
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.g += .12; x.save(); x.translate(p.x, p.y); x.rotate(p.g); x.fillStyle = p.cor; x.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); x.restore(); });
      requestAnimationFrame(quadro);
    })();
  }

  function limpaConfete() { confete.vez = (confete.vez || 0) + 1; const c = document.getElementById('confete'); c.getContext('2d').clearRect(0, 0, c.width, c.height); }

  /* ---------- avisos e caixas de pergunta ---------- */
  function aviso(html) {
    const d = document.createElement('div'); d.className = 'aviso'; d.innerHTML = html;
    document.getElementById('avisos').appendChild(d); setTimeout(() => d.classList.add('sai'), 2800); setTimeout(() => d.remove(), 3300);
  }
  function perguntar(o) {
    return new Promise(res => {
      const d = document.createElement('div'); d.className = 'veu';
      d.innerHTML = `<div class="caixa" role="dialog" aria-modal="true"><div class="caixa-gato">${gato(o.humor || 'pensa')}</div><h3>${o.titulo}</h3><p>${o.texto || ''}</p>
        <div class="caixa-botoes"><button class="btn fantasma" data-r="0">${o.nao || 'Cancelar'}</button><button class="btn ${o.perigo ? 'perigo' : ''}" data-r="1">${o.sim || 'Sim'}</button></div></div>`;
      d.addEventListener('click', ev => { const b = ev.target.closest('[data-r]'); if (!b && ev.target !== d) return; d.remove(); res(!!b && b.dataset.r === '1'); });
      document.body.appendChild(d);
    });
  }

  /* ---------- barra de baixo ---------- */
  const ABAS = [['#/', '🏠', 'Início'], ['#/conquistas', '🏅', 'Conquistas'], ['#/loja', '🎩', 'Lojinha'], ['#/evolucao', '📈', 'Evolução']];
  function barra(ativa) {
    nav.hidden = !ativa;
    document.body.classList.toggle('sem-barra', !ativa);
    if (ativa) nav.innerHTML = ABAS.map(a => `<button class="aba ${a[0] === ativa ? 'ativa' : ''}" data-ir="${a[0]}" ${a[0] === ativa ? 'aria-current="page"' : ''}><span>${a[1]}</span>${a[2]}</button>`).join('');
  }
  const topo = titulo => `<header class="topo"><h1 class="marca">${titulo}</h1><div class="chips"><span class="chip" title="Dias seguidos">🔥 ${P.sequenciaAtual()}</span><span class="chip" title="Sardinhas">🐟 ${P.e.peixes}</span></div></header>`;
  const cab = (voltar, titulo, sub, cor) => `<header class="cab" style="--cor:${cor}"><button class="voltar" data-ir="${voltar}" aria-label="Voltar">‹</button><div><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></header>`;

  /* ================= TELAS ================= */

  /* ---------- boas-vindas ---------- */
  function telaBoasVindas() {
    barra(null);
    app.innerHTML = `<section class="boas-vindas">
      <div class="bv-gato">${gato('oi', 'flutua')}</div>
      <h1>Oi! Eu sou o <b>Dejair</b> 🐾</h1>
      <p>Sou um gato curioso e vou trilhar com você por <b>História</b>, <b>Geografia</b> e <b>Ciências</b>. A cada fase você ganha estrelas, sardinhas e medalhas!</p>
      <form id="form-nome" autocomplete="off">
        <label for="nome">Como eu posso te chamar?</label>
        <input id="nome" name="nome" type="text" maxlength="16" placeholder="Seu nome ou apelido" autocapitalize="words" enterkeyhint="go">
        <small>Fica guardado só neste aparelho. Se preferir, deixe em branco.</small>
        <button class="btn grande" type="submit">Vamos lá! 🚀</button>
      </form></section>`;
    document.getElementById('form-nome').addEventListener('submit', ev => {
      ev.preventDefault(); P.e.nome = document.getElementById('nome').value.trim().slice(0, 16); P.e.apresentado = true; P.salvar(); Som.toca('certo'); rota();
    });
  }

  /* ---------- início ---------- */
  function cartaoMateria(m) {
    const r = P.resumoMateria(m);
    return `<button class="materia" style="--cor:${m.cor}" data-ir="#/m/${m.id}">
      <span class="m-icone">${m.icone}</span><span class="m-txt"><b>${m.nome}</b><small>${m.unidade}</small>
      <span class="barra"><i style="width:${r.pct}%"></i></span><small>${r.feitos} de ${r.total} fases · ⭐ ${r.estrelas}/${r.maxEstrelas}${r.prova ? ` · Provão ${fmt(r.prova.melhor)}` : ''}</small></span><span class="m-seta">›</span></button>`;
  }
  function telaInicio() {
    barra('#/');
    const e = P.e, nv = P.nivel(), seq = P.sequenciaAtual(), mi = P.missao();
    const novato = !Object.keys(e.topicos).length && !Object.keys(e.provas).length;
    const msg = novato ? fala('inicio_novo') : (seq >= 3 && Math.random() < .4 ? fala('sequencia', { d: seq }) : fala('inicio'));
    app.innerHTML = `${topo('Trilhas do <b>Dejair</b>')}
      <section class="ola">${gato(novato ? 'oi' : 'feliz', 'flutua')}<div class="balao">${msg}</div></section>
      <button class="cartao nivel" data-ir="#/evolucao"><span class="nv-num">${nv.num}</span><span class="nv-txt"><b>${nv.nome}</b>
        <span class="barra xp"><i style="width:${nv.pct}%"></i></span><small>${nv.prox ? `${e.xp} XP · faltam ${nv.falta} para ${nv.proxNome}` : `${e.xp} XP · nível máximo!`}</small></span></button>
      <div class="cartao missao ${mi.paga ? 'feita' : ''}"><span class="mi-icone">${mi.paga ? '✅' : '🎯'}</span><span class="mi-txt"><b>Missão do dia</b><small>${mi.paga ? 'Missão cumprida! Volte amanhã para outra.' : `Complete ${mi.meta} fases hoje (${mi.feitas}/${mi.meta})`}</small></span><span class="mi-premio">+${mi.premio} 🐟</span></div>
      <h2 class="titulo">Escolha a matéria</h2>
      <div class="materias">${materias().map(cartaoMateria).join('')}
        ${EM_BREVE.map(m => `<div class="materia em-breve"><span class="m-icone">${m.icone}</span><span class="m-txt"><b>${m.nome}</b><small>Em breve nas trilhas do Dejair</small></span><span class="m-seta">🔒</span></div>`).join('')}</div>`;
  }

  /* ---------- trilha da matéria ---------- */
  const DESVIO = [0, 62, 86, 34, -40, -84, -48];
  function telaTrilha(m) {
    barra(null);
    const r = P.resumoMateria(m);
    const vez = m.topicos.findIndex(t => !((P.e.topicos[P.chaveT(m.id, t.id)] || {}).estrelas >= 1));
    const passos = m.topicos.map((t, i) => {
      const reg = P.e.topicos[P.chaveT(m.id, t.id)]; const dx = DESVIO[i % DESVIO.length];
      return `<div class="passo" style="--dx:${dx}px">${i ? '<span class="pegadas" aria-hidden="true">🐾</span>' : ''}
        <button class="no ${reg && reg.estrelas ? 'feito' : ''} ${i === vez ? 'vez' : ''}" data-ir="#/m/${m.id}/${t.id}">
          <span class="bola">${t.icone}${i === vez ? `<span class="guia ${dx > 0 ? 'esq' : 'dir'}">${gato('oi')}</span>` : ''}</span>
          <span class="rotulo">${t.nome}</span><span class="no-linha">${estrelas(reg ? reg.estrelas : 0)}${reg ? `<span class="notinha">${fmt(reg.melhor)}</span>` : ''}</span></button></div>`;
    }).join('');
    const dxP = DESVIO[m.topicos.length % DESVIO.length];
    app.innerHTML = `${cab('#/', `${m.icone} ${m.nome}`, m.unidade, m.cor)}
      <div class="placar" style="--cor:${m.cor}"><span><b>${r.feitos}/${r.total}</b>fases</span><span><b>⭐ ${r.estrelas}</b>de ${r.maxEstrelas}</span><span><b>${r.prova ? fmt(r.prova.melhor) : r.media != null ? fmt(r.media) : '–'}</b>${r.prova ? 'nota final' : 'média das fases'}</span></div>
      <div class="trilha" style="--cor:${m.cor}">${passos}
        <div class="passo" style="--dx:${dxP}px"><span class="pegadas" aria-hidden="true">🐾</span>
          <button class="no prova ${r.provaLiberada ? '' : 'trancado'} ${r.prova ? 'feito' : ''}" data-ac="prova" data-m="${m.id}">
            <span class="bola">${r.provaLiberada ? '🏆' : '🔒'}</span><span class="rotulo">Provão de ${m.nome}</span>
            <span class="notinha">${r.prova ? `nota final ${fmt(r.prova.melhor)}` : r.provaLiberada ? `${QUESTOES_PROVA} questões de toda a trilha` : `faltam ${r.faltamParaProva} ${r.faltamParaProva === 1 ? 'fase' : 'fases'} para liberar`}</span></button></div></div>`;
  }

  /* ---------- tópico: resumo antes do jogo ---------- */
  function telaTopico(m, t) {
    barra(null);
    const reg = P.e.topicos[P.chaveT(m.id, t.id)];
    app.innerHTML = `${cab(`#/m/${m.id}`, `${t.icone} ${t.nome}`, m.nome, m.cor)}
      <section class="ola">${gato('pensa')}<div class="balao">${t.intro}</div></section>
      ${reg ? `<div class="placar" style="--cor:${m.cor}"><span><b>${fmt(reg.melhor)}</b>melhor nota</span><span>${estrelas(reg.estrelas)}estrelas</span><span><b>${reg.vezes}</b>${reg.vezes === 1 ? 'vez jogada' : 'vezes jogadas'}</span></div>` : ''}
      <h2 class="titulo">📖 Resumo do Dejair</h2>
      <div class="resumo" style="--cor:${m.cor}">${t.resumo.map((c, i) => `<article class="ficha"><span class="ficha-n">${i + 1}</span><h3>${c.t}</h3><p>${c.c}</p></article>`).join('')}</div>
      <div class="rodape"><button class="btn grande" style="--cor:${m.cor}" data-ir="#/jogar/${m.id}/${t.id}">▶ ${reg ? 'Jogar de novo' : 'Começar o quiz'}</button></div>`;
  }

  /* ---------- jogo ---------- */
  let J = null;      // partida em andamento
  let FIM = null;    // resultado da última partida

  function novaPartida(m, t) {
    const itens = t ? P.sortearFase(m, t, QUESTOES_FASE) : P.sortearProva(m, QUESTOES_PROVA);
    J = { m, t, itens, pos: 0, respostas: [], combo: 0, comboMax: 0 };
    prepara();
  }
  function prepara() {
    const q = J.itens[J.pos].q; J.fase = 'pergunta'; J.sel = null; J.certo = null;
    if (q.t === 'mc' || q.t === 'lac') J.ops = P.embaralha(q.o.map((_, i) => i));
    if (q.t === 'ord') { do { J.ops = P.embaralha(q.o.map((_, i) => i)); } while (J.ops.every((v, i) => v === i)); J.seq = []; }
    if (q.t === 'par') { J.esq = P.embaralha(q.o.map((_, i) => i)); J.dir = P.embaralha(q.o.map((_, i) => i)); J.pares = {}; J.mao = null; }
  }
  function pronta() {
    const q = J.itens[J.pos].q;
    if (q.t === 'ord') return J.seq.length === q.o.length;
    if (q.t === 'par') return Object.keys(J.pares).length === q.o.length;
    return J.sel !== null;
  }
  const NIVEL = ['', 'fácil', 'médio', 'desafio'];
  const INSTRUCAO = { mc: 'Escolha a resposta certa', vf: 'Verdadeiro ou falso?', lac: 'Complete a frase', ord: 'Toque nos itens na ordem certa', par: 'Toque em um item de cada lado para ligar' };

  function corpoQuestao() {
    const q = J.itens[J.pos].q, fim = J.fase === 'resposta';
    if (q.t === 'mc' || q.t === 'lac') {
      const frase = q.t === 'lac' ? q.p.replace('___', `<span class="lacuna ${J.sel !== null ? 'cheia' : ''} ${fim ? (J.certo ? 'ok' : 'ruim') : ''}">${J.sel !== null ? q.o[J.sel] : '&nbsp;'}</span>`) : q.p;
      return `<p class="pergunta">${frase}</p><div class="opcoes ${q.t === 'lac' ? 'fichas' : ''}">${J.ops.map((i, k) => {
        const cls = fim ? (i === 0 ? 'certa' : i === J.sel ? 'errada' : 'apagada') : (i === J.sel ? 'sel' : '');
        return `<button class="op ${cls}" data-ac="op" data-i="${i}" ${fim ? 'disabled' : ''}>${q.t === 'mc' ? `<span class="letra">${'ABCD'[k]}</span>` : ''}<span>${q.o[i]}</span></button>`;
      }).join('')}</div>`;
    }
    if (q.t === 'vf') {
      const b = (v, txt, ic) => { const cls = fim ? (v === q.r ? 'certa' : v === J.sel ? 'errada' : 'apagada') : (v === J.sel ? 'sel' : ''); return `<button class="op vf ${cls}" data-ac="vf" data-v="${v ? 1 : 0}" ${fim ? 'disabled' : ''}><span class="vf-ic">${ic}</span><span>${txt}</span></button>`; };
      return `<p class="pergunta afirma">${q.p}</p><div class="opcoes duas">${b(true, 'Verdadeiro', '👍')}${b(false, 'Falso', '👎')}</div>`;
    }
    if (q.t === 'ord') {
      const vagas = q.o.map((_, k) => { const i = J.seq[k]; const cls = i == null ? 'vazia' : fim ? (i === k ? 'certa' : 'errada') : 'posta'; return `<button class="vaga ${cls}" data-ac="ord-tira" data-k="${k}" ${fim || i == null ? 'disabled' : ''}><span class="letra">${k + 1}</span><span>${i == null ? '' : q.o[i]}</span></button>`; }).join('');
      const soltas = J.ops.filter(i => !J.seq.includes(i)).map(i => `<button class="op solta" data-ac="ord-poe" data-i="${i}">${q.o[i]}</button>`).join('');
      return `<p class="pergunta">${q.p}</p><div class="vagas">${vagas}</div>${fim ? '' : `<div class="opcoes fichas soltas">${soltas}</div>`}${fim && !J.certo ? `<div class="gabarito"><b>Ordem certa:</b><ol>${q.o.map(x => `<li>${x}</li>`).join('')}</ol></div>` : ''}`;
    }
    /* par */
    const cor = i => (J.pares[i] == null ? '' : `par${J.esq.indexOf(i) % 4}`);
    const corD = d => { const e = Object.keys(J.pares).map(Number).find(x => J.pares[x] === d); return e == null ? '' : cor(e); };
    const esq = J.esq.map(i => { const cls = fim ? (J.pares[i] === i ? 'certa' : 'errada') : `${cor(i)} ${J.mao === i ? 'sel' : ''}`; return `<button class="op lado ${cls}" data-ac="par-e" data-i="${i}" ${fim ? 'disabled' : ''}>${q.o[i][0]}</button>`; }).join('');
    const dir = J.dir.map(i => { const dono = Object.keys(J.pares).map(Number).find(x => J.pares[x] === i); const cls = fim ? (dono === i ? 'certa' : 'errada') : corD(i); return `<button class="op lado ${cls}" data-ac="par-d" data-i="${i}" ${fim ? 'disabled' : ''}>${q.o[i][1]}</button>`; }).join('');
    return `<p class="pergunta">${q.p}</p><div class="pares"><div>${esq}</div><div>${dir}</div></div>${fim && !J.certo ? `<div class="gabarito"><b>Pares certos:</b><ul>${q.o.map(x => `<li>${x[0]} → ${x[1]}</li>`).join('')}</ul></div>` : ''}`;
  }

  function telaJogo() {
    barra(null);
    const it = J.itens[J.pos], q = it.q, total = J.itens.length;
    const titulo = J.t ? J.t.nome : `Provão de ${J.m.nome}`;
    app.innerHTML = `<div class="jogo" style="--cor:${J.m.cor}">
      <header class="jogo-topo"><button class="fechar" data-ac="sair" aria-label="Sair da fase">✕</button>
        <div class="progresso" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${J.pos}"><i style="width:${(J.pos + (J.fase === 'resposta' ? 1 : 0)) / total * 100}%"></i></div>
        <span class="combo ${J.combo >= 2 ? 'on' : ''}" id="combo">🔥 ${J.combo}</span></header>
      <div class="jogo-meta"><span>${titulo}</span><span>${J.pos + 1} de ${total}</span></div>
      <section class="questao entra"><div class="etiquetas"><span class="grau n${q.n}">${'★'.repeat(q.n)} ${NIVEL[q.n]}</span><span class="instr">${INSTRUCAO[q.t]}</span></div><div id="corpo">${corpoQuestao()}</div></section>
      <div class="rodape" id="rodape"><button class="btn grande" id="verificar" data-ac="verificar" disabled>Verificar</button></div></div>`;
  }
  function atualiza() {
    document.getElementById('corpo').innerHTML = corpoQuestao();
    const v = document.getElementById('verificar'); if (v) v.disabled = !pronta();
  }
  function verificar() {
    if (!J || J.fase !== 'pergunta' || !pronta()) return;
    const it = J.itens[J.pos], q = it.q;
    let certo;
    if (q.t === 'mc' || q.t === 'lac') certo = J.sel === 0;
    else if (q.t === 'vf') certo = J.sel === q.r;
    else if (q.t === 'ord') certo = J.seq.every((v, i) => v === i);
    else certo = q.o.every((_, i) => J.pares[i] === i);
    J.certo = certo; J.fase = 'resposta';
    J.respostas.push({ i: it.i, topico: it.topico, certo, q });
    J.combo = certo ? J.combo + 1 : 0; J.comboMax = Math.max(J.comboMax, J.combo);
    Som.toca(certo ? 'certo' : 'erro'); vibra(certo ? 15 : [30, 40, 30]);
    document.getElementById('corpo').innerHTML = corpoQuestao();
    const c = document.getElementById('combo'); c.textContent = `🔥 ${J.combo}`; c.classList.toggle('on', J.combo >= 2); if (certo && J.combo >= 2) { c.classList.remove('pulo'); void c.offsetWidth; c.classList.add('pulo'); }
    document.querySelector('.progresso i').style.width = `${(J.pos + 1) / J.itens.length * 100}%`;
    const ultima = J.pos === J.itens.length - 1;
    const certaTxt = q.t === 'mc' || q.t === 'lac' ? q.o[0] : q.t === 'vf' ? (q.r ? 'Verdadeiro' : 'Falso') : '';
    const titulo = certo ? (J.combo >= 3 ? fala('combo', { c: J.combo }) : fala('acerto')) : fala('erro');
    document.getElementById('rodape').outerHTML = `<div class="retorno ${certo ? 'bom' : 'ruim'}" id="rodape" role="status" aria-live="polite">
      <div class="retorno-topo">${gato(certo ? (J.combo >= 3 ? 'festa' : 'feliz') : 'ops')}<div><b>${titulo}</b>${!certo && certaTxt ? `<span class="certa-era">Resposta certa: <b>${certaTxt}</b></span>` : ''}</div></div>
      <p class="explica">${q.e}</p><button class="btn grande" data-ac="continuar">${ultima ? 'Ver minha nota 🏁' : 'Continuar'}</button></div>`;
    const sec = document.querySelector('.questao'); sec.classList.remove('entra'); sec.classList.add(certo ? 'acertou' : 'errou');
  }
  function continuar() {
    if (!J || J.fase !== 'resposta') return;
    if (J.pos < J.itens.length - 1) { J.pos++; prepara(); telaJogo(); window.scrollTo(0, 0); return; }
    const r = P.registrar({ materia: J.m.id, topico: J.t ? J.t.id : null, respostas: J.respostas, comboMax: J.comboMax });
    FIM = { r, m: J.m, t: J.t, erros: J.respostas.filter(x => !x.certo).map(x => x.q) }; J = null;
    ir('#/resultado', true);
  }
  function respostaCerta(q) {
    if (q.t === 'mc' || q.t === 'lac') return q.o[0];
    if (q.t === 'vf') return q.r ? 'Verdadeiro' : 'Falso';
    if (q.t === 'ord') return q.o.join(' → ');
    return q.o.map(x => `${x[0]} → ${x[1]}`).join(' · ');
  }

  /* ---------- resultado ---------- */
  function telaResultado() {
    barra(null);
    const { r, m, t, erros } = FIM;
    const faixa = r.nota >= 9 ? 'alta' : r.nota >= 6 ? 'media' : 'baixa';
    const destaques = [];
    if (r.subiuNivel) destaques.push(`<div class="destaque nivel-up">🎉 <b>Subiu de nível!</b> Agora você é <b>${r.subiuNivel.nome}</b>.</div>`);
    if (r.recorde && r.melhorou) destaques.push('<div class="destaque">📈 <b>Novo recorde!</b> Você melhorou a sua nota.</div>');
    if (r.missaoPaga) destaques.push('<div class="destaque">🎯 <b>Missão do dia cumprida!</b> +10 🐟</div>');
    r.novas.forEach(c => destaques.push(`<div class="destaque conquista">${c.icone} <b>Conquista: ${c.nome}</b><br><small>${c.desc}</small></div>`));
    app.innerHTML = `<section class="resultado" style="--cor:${m.cor}">
      <p class="res-onde">${m.icone} ${t ? t.nome : `Provão de ${m.nome}`}</p>
      <div class="res-gato">${gato(faixa === 'alta' ? 'festa' : faixa === 'media' ? 'feliz' : 'normal', 'flutua')}</div>
      <div class="balao centro">${fala('nota_' + faixa)}</div>
      <div class="nota-final ${faixa}"><small>${r.prova ? 'Nota final' : 'Sua nota'}</small><b>${fmt(r.nota)}</b><span>${r.acertos} de ${r.total} certas</span></div>
      <div class="res-estrelas">${[0, 1, 2].map(i => `<i class="${i < r.estrelas ? 'on' : ''}" style="animation-delay:${.25 + i * .22}s">★</i>`).join('')}</div>
      <div class="ganhos"><span>+${r.xp} XP</span><span>+${r.peixes} 🐟</span></div>
      ${destaques.join('')}
      ${erros.length ? `<h2 class="titulo">🔍 Para rever</h2><div class="rever">${erros.map(q => `<details class="rev"><summary>${q.p.replace('___', '_____')}</summary><p><b>Resposta:</b> ${respostaCerta(q)}</p><p>${q.e}</p></details>`).join('')}</div>` : '<p class="tudo-certo">Nenhum erro nesta rodada. Gabaritou! 😻</p>'}
      <div class="res-botoes"><button class="btn grande" data-ir="#/m/${m.id}">Voltar para a trilha</button>
        <button class="btn grande fantasma" data-ac="de-novo">🔄 Jogar de novo</button></div></section>`;
    Som.toca(faixa === 'baixa' ? 'toque' : 'festa');
    if (r.estrelas >= 2 || r.novas.length || r.subiuNivel) confete(r.estrelas === 3 ? 180 : 90);
  }

  /* ---------- conquistas ---------- */
  function telaConquistas() {
    barra('#/conquistas');
    const tem = P.e.conquistas; const n = Object.keys(tem).length;
    app.innerHTML = `${topo('Conquistas')}
      <section class="ola">${gato('feliz')}<div class="balao">${fala('conquistas')}</div></section>
      <div class="cartao contagem"><b>${n} de ${P.CONQUISTAS.length}</b> medalhas<span class="barra"><i style="width:${n / P.CONQUISTAS.length * 100}%"></i></span></div>
      <div class="medalhas">${P.CONQUISTAS.map(c => `<div class="medalha ${tem[c.id] ? 'on' : ''}"><span class="md-ic">${tem[c.id] ? c.icone : '🔒'}</span><b>${c.nome}</b><small>${c.desc}</small></div>`).join('')}</div>`;
  }

  /* ---------- lojinha ---------- */
  function telaLoja() {
    barra('#/loja');
    const e = P.e;
    const item = it => {
      const meu = e.itens.includes(it.id), emUso = it.tipo === 'pelo' ? e.usando.pelo === it.id : e.usando.acessorio === it.id;
      const mini = D.svg({ humor: 'feliz', acessorio: it.tipo === 'acessorio' ? it.id : e.usando.acessorio, pelo: it.tipo === 'pelo' ? it.id : e.usando.pelo });
      const acao = meu ? `<button class="btn mini ${emUso ? 'fantasma' : ''}" data-ac="usar" data-id="${it.id}">${emUso ? (it.tipo === 'pelo' ? 'Em uso' : 'Tirar') : 'Usar'}</button>`
        : `<button class="btn mini ${e.peixes >= it.preco ? '' : 'falta'}" data-ac="comprar" data-id="${it.id}">${it.preco} 🐟</button>`;
      return `<div class="item ${emUso ? 'em-uso' : ''}">${mini}<b>${it.nome}</b>${acao}</div>`;
    };
    const ac = P.LOJA.filter(x => x.tipo === 'acessorio'), pl = P.LOJA.filter(x => x.tipo === 'pelo');
    app.innerHTML = `${topo('Lojinha')}
      <section class="ola">${gato('feliz', 'flutua')}<div class="balao">${fala('loja')}<br><small>Você tem <b>${e.peixes} 🐟</b>. Sardinhas se ganham acertando questões.</small></div></section>
      <h2 class="titulo">Acessórios</h2><div class="itens">${ac.map(item).join('')}</div>
      <h2 class="titulo">Pelagens</h2><div class="itens">
        <div class="item ${e.usando.pelo === 'laranja' ? 'em-uso' : ''}">${D.svg({ humor: 'feliz', acessorio: e.usando.acessorio, pelo: 'laranja' })}<b>Pelagem original</b><button class="btn mini ${e.usando.pelo === 'laranja' ? 'fantasma' : ''}" data-ac="usar" data-id="laranja">${e.usando.pelo === 'laranja' ? 'Em uso' : 'Usar'}</button></div>
        ${pl.map(item).join('')}</div>`;
  }

  /* ---------- evolução ---------- */
  function telaEvolucao() {
    barra('#/evolucao');
    const e = P.e, nv = P.nivel(), pct = e.stats.respostas ? Math.round(e.stats.acertos / e.stats.respostas * 100) : 0;
    const ult = e.hist.slice(-10);
    const grafico = ult.length ? `<div class="grafico">${ult.map(h => { const m = acha(h.m) || { cor: '#999', icone: '?' }; return `<div class="col"><span>${fmt(h.nota)}</span><i style="height:${Math.max(4, h.nota * 10)}%;background:${m.cor}"></i><small>${h.t === '#prova' ? '🏆' : m.icone}</small></div>`; }).join('')}</div><p class="legenda">Suas últimas ${ult.length === 1 ? 'nota' : ult.length + ' notas'}, da mais antiga para a mais nova. 🏆 marca um Provão.</p>` : '<p class="legenda">Jogue a primeira fase e as suas notas aparecem aqui.</p>';
    const boletim = materias().map(m => {
      const r = P.resumoMateria(m);
      return `<details class="boletim" style="--cor:${m.cor}"><summary><span>${m.icone} <b>${m.nome}</b></span><span>${r.prova ? `nota final ${fmt(r.prova.melhor)}` : r.media != null ? `média ${fmt(r.media)}` : 'ainda não jogou'}</span></summary>
        <table><tbody>${m.topicos.map(t => { const g = e.topicos[P.chaveT(m.id, t.id)]; return `<tr><td>${t.icone} ${t.nome}</td><td>${estrelas(g ? g.estrelas : 0)}</td><td>${g ? fmt(g.melhor) : '–'}</td></tr>`; }).join('')}
        <tr class="linha-prova"><td>🏆 Provão</td><td></td><td>${r.prova ? fmt(r.prova.melhor) : '–'}</td></tr></tbody></table></details>`;
    }).join('');
    app.innerHTML = `${topo('Evolução')}
      <section class="ola">${gato('feliz')}<div class="balao">${fala('evolucao')}</div></section>
      <div class="numeros"><div><b>${nv.num}</b><small>nível<br>${nv.nome}</small></div><div><b>${e.xp}</b><small>pontos<br>de XP</small></div><div><b>${P.totalEstrelas()}</b><small>estrelas<br>⭐</small></div>
        <div><b>${P.sequenciaAtual()}</b><small>dias<br>seguidos 🔥</small></div><div><b>${e.dias.melhor}</b><small>maior<br>sequência</small></div><div><b>${pct}%</b><small>de acertos<br>(${e.stats.acertos}/${e.stats.respostas})</small></div></div>
      <h2 class="titulo">Minhas notas</h2><div class="cartao">${grafico}</div>
      <h2 class="titulo">Boletim</h2>${boletim}
      <h2 class="titulo">Ajustes</h2>
      <div class="cartao ajustes">
        <button class="linha" data-ac="nome"><span>✏️ Meu nome</span><b>${e.nome ? esc(e.nome) : 'sem nome'}</b></button>
        <button class="linha" data-ac="som"><span>${e.som ? '🔊' : '🔇'} Sons</span><b>${e.som ? 'ligados' : 'desligados'}</b></button>
        <button class="linha perigo" data-ac="apagar"><span>🗑️ Apagar todo o progresso</span><b>›</b></button></div>
      <div class="cartao pais"><b>Para pais e responsáveis</b><p>O app funciona sem internet e sem cadastro. O nome e o progresso ficam guardados somente neste aparelho. Não há anúncios, compras nem coleta de dados. As sardinhas são pontos do jogo e não podem ser compradas.</p><p><a href="privacidade.html">Política de privacidade</a> · versão ${VERSAO}</p></div>`;
  }

  /* ================= NAVEGAÇÃO ================= */
  function rota() {
    const partes = ATUAL.slice(2).split('/').filter(Boolean);
    if (!P.e.apresentado) return telaBoasVindas();
    if (partes[0] !== 'jogar') J = null;
    if (partes[0] === 'm') {
      const m = acha(partes[1]); if (!m) return ir('#/', true);
      const t = partes[2] && m.topicos.find(x => x.id === partes[2]);
      return t ? telaTopico(m, t) : telaTrilha(m);
    }
    if (partes[0] === 'jogar') {
      const m = acha(partes[1]); if (!m) return ir('#/', true);
      const prova = partes[2] === 'provao'; const t = prova ? null : m.topicos.find(x => x.id === partes[2]);
      if (!prova && !t) return ir(`#/m/${m.id}`, true);
      if (prova && !P.resumoMateria(m).provaLiberada) return ir(`#/m/${m.id}`, true);
      if (!J || J.m !== m || J.t !== t) novaPartida(m, t);
      return telaJogo();
    }
    if (partes[0] === 'resultado') return FIM ? telaResultado() : ir('#/', true);
    if (partes[0] === 'conquistas') return telaConquistas();
    if (partes[0] === 'loja') return telaLoja();
    if (partes[0] === 'evolucao') return telaEvolucao();
    telaInicio();
  }
  window.addEventListener('hashchange', () => { ATUAL = location.hash || '#/'; limpaConfete(); rota(); window.scrollTo(0, 0); });

  const ACOES = {
    op(b) { if (J.fase !== 'pergunta') return; J.sel = +b.dataset.i; Som.toca('toque'); atualiza(); },
    vf(b) { if (J.fase !== 'pergunta') return; J.sel = b.dataset.v === '1'; Som.toca('toque'); atualiza(); },
    'ord-poe'(b) { if (J.fase !== 'pergunta') return; J.seq.push(+b.dataset.i); Som.toca('toque'); atualiza(); },
    'ord-tira'(b) { if (J.fase !== 'pergunta') return; J.seq.splice(+b.dataset.k, 1); atualiza(); },
    'par-e'(b) { if (J.fase !== 'pergunta') return; const i = +b.dataset.i; delete J.pares[i]; J.mao = J.mao === i ? null : i; Som.toca('toque'); atualiza(); },
    'par-d'(b) {
      if (J.fase !== 'pergunta') return; const d = +b.dataset.i;
      const dono = Object.keys(J.pares).map(Number).find(x => J.pares[x] === d);
      if (J.mao === null) { if (dono != null) { delete J.pares[dono]; atualiza(); } else aviso('Toque primeiro em um item da esquerda. 👈'); return; }
      if (dono != null) delete J.pares[dono];
      J.pares[J.mao] = d; J.mao = null; Som.toca('toque'); atualiza();
    },
    verificar, continuar,
    async sair() {
      if (!J || !J.respostas.length || await perguntar({ titulo: 'Sair da fase?', texto: 'As respostas desta rodada não serão guardadas.', sim: 'Sair', nao: 'Continuar' })) { if (location.hash === ATUAL && history.length > 1) history.back(); else ir(`#/m/${J.m.id}${J.t ? '/' + J.t.id : ''}`, true); }
    },
    prova(b) {
      const m = acha(b.dataset.m); const r = P.resumoMateria(m);
      if (!r.provaLiberada) { aviso(`🔒 ${fala('prova_trancada')}`); Som.toca('erro'); return; }
      ir(`#/jogar/${m.id}/provao`);
    },
    'de-novo'() { const f = FIM; ir(`#/jogar/${f.m.id}/${f.t ? f.t.id : 'provao'}`, true); },
    async comprar(b) {
      const it = P.LOJA.find(x => x.id === b.dataset.id);
      if (P.e.peixes < it.preco) { aviso(`Faltam ${it.preco - P.e.peixes} 🐟 para o item “${it.nome}”. Acerte mais questões!`); Som.toca('erro'); return; }
      if (!await perguntar({ titulo: `Comprar “${it.nome}”?`, texto: `Custa ${it.preco} 🐟. Você tem ${P.e.peixes} 🐟.`, sim: 'Comprar', humor: 'feliz' })) return;
      const r = P.comprar(it.id); if (!r) return;
      Som.toca('compra'); confete(60); telaLoja(); aviso(`🎉 ${it.nome}: agora é seu!`);
      r.novas.forEach(c => aviso(`${c.icone} Conquista: <b>${c.nome}</b>`));
    },
    usar(b) { P.usar(b.dataset.id); Som.toca('toque'); telaLoja(); },
    som() { P.e.som = !P.e.som; P.salvar(); Som.toca('certo'); telaEvolucao(); },
    async nome() {
      const d = document.createElement('div'); d.className = 'veu';
      d.innerHTML = `<form class="caixa"><h3>Como eu posso te chamar?</h3><input type="text" maxlength="16" value="${esc(P.e.nome)}" placeholder="Seu nome ou apelido" autocapitalize="words"><div class="caixa-botoes"><button type="button" class="btn fantasma" data-r="0">Cancelar</button><button class="btn" type="submit">Guardar</button></div></form>`;
      d.addEventListener('click', ev => { if (ev.target === d || ev.target.closest('[data-r]')) d.remove(); });
      d.querySelector('form').addEventListener('submit', ev => { ev.preventDefault(); P.e.nome = d.querySelector('input').value.trim().slice(0, 16); P.salvar(); d.remove(); telaEvolucao(); });
      document.body.appendChild(d); d.querySelector('input').focus();
    },
    async apagar() {
      if (!await perguntar({ titulo: 'Apagar todo o progresso?', texto: 'Estrelas, notas, sardinhas e medalhas serão apagadas deste aparelho. Não dá para desfazer.', sim: 'Apagar tudo', perigo: true, humor: 'ops' })) return;
      P.apagar(); FIM = null; ir('#/'); rota();
    },
  };
  document.addEventListener('click', ev => {
    const a = ev.target.closest('[data-ac]');
    if (a && !a.disabled) { const f = ACOES[a.dataset.ac]; if (f) f(a); return; }
    const d = ev.target.closest('[data-ir]');
    if (d) { Som.toca('toque'); ir(d.dataset.ir); }
  });

  /* ---------- início do app ---------- */
  P.carregar().then(() => {
    rota();
    document.body.classList.add('pronto');
    if ('serviceWorker' in navigator && location.protocol === 'https:' && !window.Capacitor) navigator.serviceWorker.register('sw.js').catch(() => { /* sem modo offline no navegador */ });
  });
})();
