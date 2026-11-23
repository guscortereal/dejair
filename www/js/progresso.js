/* Progresso de quem joga: XP, níveis, sardinhas, estrelas, notas, sequência de dias e conquistas.
   Tudo fica guardado só no aparelho. Nada é enviado para fora. */
(function () {
  const CHAVE = 'dejair_trilhas_v1';

  const NIVEIS = [
    [0, 'Filhote Curioso'], [120, 'Gato Aprendiz'], [300, 'Gato Explorador'], [600, 'Gato Sabido'],
    [1000, 'Mestre dos Telhados'], [1500, 'Gênio de Bigodes'], [2200, 'Sábio Felino'], [3000, 'Lenda dos Telhados'],
  ];

  const LOJA = [
    { id: 'gravata', tipo: 'acessorio', nome: 'Gravata-borboleta', preco: 15 },
    { id: 'oculos', tipo: 'acessorio', nome: 'Óculos de estudo', preco: 25 },
    { id: 'laco', tipo: 'acessorio', nome: 'Laço roxo', preco: 25 },
    { id: 'bone', tipo: 'acessorio', nome: 'Boné', preco: 35 },
    { id: 'cachecol', tipo: 'acessorio', nome: 'Cachecol', preco: 45 },
    { id: 'capelo', tipo: 'acessorio', nome: 'Capelo de formatura', preco: 70 },
    { id: 'mago', tipo: 'acessorio', nome: 'Chapéu de mago', preco: 90 },
    { id: 'coroa', tipo: 'acessorio', nome: 'Coroa', preco: 150 },
    { id: 'cinza', tipo: 'pelo', nome: 'Pelagem cinza', preco: 40 },
    { id: 'caramelo', tipo: 'pelo', nome: 'Pelagem caramelo', preco: 40 },
    { id: 'branco', tipo: 'pelo', nome: 'Pelagem floco', preco: 60 },
    { id: 'preto', tipo: 'pelo', nome: 'Pelagem pantera', preco: 60 },
  ];

  /* Cada conquista: quando `ok(e, ctx)` é verdadeiro, ela é liberada. ctx traz dados da partida que acabou. */
  const CONQUISTAS = [
    { id: 'primeira', icone: '🐾', nome: 'Primeiro passo', desc: 'Complete a sua primeira fase.', ok: e => totalPartidas(e) >= 1 },
    { id: 'nota10', icone: '💯', nome: 'Nota 10!', desc: 'Tire 10 em uma fase.', ok: (e, c) => !!c && c.nota === 10 },
    { id: 'combo5', icone: '🔥', nome: 'Em chamas', desc: 'Acerte 5 seguidas.', ok: e => e.stats.comboMax >= 5 },
    { id: 'combo10', icone: '☄️', nome: 'Imparável', desc: 'Acerte 10 seguidas.', ok: e => e.stats.comboMax >= 10 },
    { id: 'seq3', icone: '📅', nome: 'Três dias de trilha', desc: 'Jogue 3 dias seguidos.', ok: e => e.dias.melhor >= 3 },
    { id: 'seq7', icone: '🗓️', nome: 'Semana inteira', desc: 'Jogue 7 dias seguidos.', ok: e => e.dias.melhor >= 7 },
    { id: 'estrelas10', icone: '⭐', nome: 'Caçador de estrelas', desc: 'Junte 10 estrelas.', ok: e => totalEstrelas(e) >= 10 },
    { id: 'estrelas30', icone: '🌟', nome: 'Céu estrelado', desc: 'Junte 30 estrelas.', ok: e => totalEstrelas(e) >= 30 },
    { id: 'cem', icone: '🎯', nome: 'Cem acertos', desc: 'Acerte 100 questões.', ok: e => e.stats.acertos >= 100 },
    { id: 'tres', icone: '🧭', nome: 'Explorador completo', desc: 'Jogue três matérias diferentes.', ok: e => materiasJogadas(e) >= 3 },
    { id: 'melhorou', icone: '💪', nome: 'Persistente', desc: 'Refaça uma fase e melhore a nota.', ok: (e, c) => !!c && c.melhorou },
    { id: 'trilha', icone: '🏁', nome: 'Trilha completa', desc: 'Ganhe estrela em todas as fases de uma matéria.', ok: e => trilhasCompletas(e) >= 1 },
    { id: 'tudo', icone: '🗺️', nome: 'Todas as trilhas', desc: 'Complete as trilhas de todas as matérias.', ok: e => trilhasCompletas(e) >= conteudo().length },
    { id: 'prova', icone: '📝', nome: 'Encarou o Provão', desc: 'Faça um Provão até o fim.', ok: e => Object.keys(e.provas).length >= 1 },
    { id: 'prova9', icone: '🏆', nome: 'Fera do Provão', desc: 'Tire 9 ou mais em um Provão.', ok: e => Object.values(e.provas).some(p => p.melhor >= 9) },
    { id: 'estilo', icone: '🎩', nome: 'Gato de estilo', desc: 'Compre um item na lojinha.', ok: e => e.itens.length >= 1 },
  ];

  const novo = () => ({
    v: 1, nome: '', apresentado: false, criado: hoje(), xp: 0, peixes: 0,
    dias: { ultimo: '', seq: 0, melhor: 0 },
    topicos: {}, provas: {}, questoes: {}, hist: [], conquistas: {},
    itens: [], usando: { acessorio: '', pelo: 'laranja' }, som: true,
    stats: { acertos: 0, respostas: 0, comboMax: 0 },
    missao: { dia: '', feitas: 0, paga: false },
  });

  let E = novo();
  const conteudo = () => window.DEJAIR_CONTEUDO || [];

  function hoje(d) { const x = d || new Date(); const p = n => String(n).padStart(2, '0'); return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`; }
  function diasEntre(a, b) { const f = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); }; return Math.round((f(b) - f(a)) / 86400000); }

  /* ---------- guardar e carregar ---------- */
  const nativo = () => (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Preferences) || null;

  function salvar() {
    const txt = JSON.stringify(E);
    try { localStorage.setItem(CHAVE, txt); } catch (e) { /* armazenamento indisponível: segue só na memória */ }
    const n = nativo(); if (n) { try { n.set({ key: CHAVE, value: txt }); } catch (e) { /* idem */ } }
  }
  function aplicar(txt) {
    try { const o = JSON.parse(txt); if (o && o.v === 1) { const b = novo(); E = Object.assign(b, o, { dias: Object.assign(b.dias, o.dias), usando: Object.assign(b.usando, o.usando), stats: Object.assign(b.stats, o.stats), missao: Object.assign(b.missao, o.missao) }); return true; } } catch (e) { /* dado corrompido: começa do zero */ }
    return false;
  }
  /** Carrega o progresso. No app nativo, a cópia das Preferências repõe o que o sistema possa ter limpado do navegador interno. */
  async function carregar() {
    let achou = false;
    try { const t = localStorage.getItem(CHAVE); if (t) achou = aplicar(t); } catch (e) { /* segue */ }
    const n = nativo();
    if (n) {
      try {
        const r = await n.get({ key: CHAVE });
        if (r && r.value) {
          const local = E; const tinha = achou;
          if (aplicar(r.value)) { if (tinha && local.xp > E.xp) E = local; achou = true; }
        }
      } catch (e) { /* segue com o que houver */ }
    }
    return achou;
  }
  function apagar() { E = novo(); salvar(); }

  /* ---------- contas ---------- */
  const chaveT = (m, t) => `${m}.${t}`;
  function totalEstrelas(e) { let s = 0; for (const k in e.topicos) s += e.topicos[k].estrelas || 0; return s; }
  function totalPartidas(e) { let s = 0; for (const k in e.topicos) s += e.topicos[k].vezes || 0; for (const k in e.provas) s += e.provas[k].vezes || 0; return s; }
  function materiasJogadas(e) { const s = new Set(); for (const k in e.topicos) s.add(k.split('.')[0]); for (const k in e.provas) s.add(k); return s.size; }
  function trilhasCompletas(e) { return conteudo().filter(m => m.topicos.every(t => (e.topicos[chaveT(m.id, t.id)] || {}).estrelas >= 1)).length; }

  function nivel(xp) {
    const x = xp == null ? E.xp : xp; let i = 0;
    NIVEIS.forEach((n, k) => { if (x >= n[0]) i = k; });
    const prox = NIVEIS[i + 1] || null; const base = NIVEIS[i][0];
    return { num: i + 1, nome: NIVEIS[i][1], prox: prox ? prox[0] : null, proxNome: prox ? prox[1] : null, pct: prox ? Math.round((x - base) / (prox[0] - base) * 100) : 100, falta: prox ? prox[0] - x : 0 };
  }
  const estrelasDaNota = n => (n >= 9 ? 3 : n >= 7 ? 2 : n >= 5 ? 1 : 0);
  const notaDe = (acertos, total) => Math.round(acertos / total * 100) / 10;

  function resumoMateria(m) {
    let estrelas = 0, feitos = 0, soma = 0;
    m.topicos.forEach(t => { const r = E.topicos[chaveT(m.id, t.id)]; if (r) { estrelas += r.estrelas || 0; if (r.estrelas >= 1) feitos++; soma += r.melhor || 0; } });
    const jogados = m.topicos.filter(t => E.topicos[chaveT(m.id, t.id)]).length;
    const precisa = Math.ceil(m.topicos.length / 2);
    return {
      estrelas, maxEstrelas: m.topicos.length * 3, feitos, total: m.topicos.length,
      pct: Math.round(estrelas / (m.topicos.length * 3) * 100),
      media: jogados ? Math.round(soma / jogados * 10) / 10 : null,
      prova: E.provas[m.id] || null, provaLiberada: feitos >= precisa, faltamParaProva: Math.max(0, precisa - feitos),
    };
  }

  /* ---------- sequência de dias e missão do dia ---------- */
  const META_DIA = 2;
  function sequenciaAtual() {
    if (!E.dias.ultimo) return 0;
    return diasEntre(E.dias.ultimo, hoje()) <= 1 ? E.dias.seq : 0;
  }
  function marcarDia() {
    const h = hoje();
    if (E.dias.ultimo !== h) {
      E.dias.seq = E.dias.ultimo && diasEntre(E.dias.ultimo, h) === 1 ? E.dias.seq + 1 : 1;
      E.dias.ultimo = h; E.dias.melhor = Math.max(E.dias.melhor, E.dias.seq);
    }
    if (E.missao.dia !== h) E.missao = { dia: h, feitas: 0, paga: false };
  }
  function missao() {
    const m = E.missao.dia === hoje() ? E.missao : { feitas: 0, paga: false };
    return { feitas: Math.min(m.feitas, META_DIA), meta: META_DIA, paga: !!m.paga, premio: 10 };
  }

  /* ---------- escolha das questões ---------- */
  const embaralha = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  /** Fase: prioriza o que foi errado na última vez e o que foi menos visto; mostra do fácil ao desafio. */
  function sortearFase(m, t, quantas) {
    const reg = E.questoes[chaveT(m.id, t.id)] || { v: [], e: [] };
    const idx = embaralha(t.q.map((_, i) => i));
    idx.sort((a, b) => ((reg.e[b] ? 1 : 0) - (reg.e[a] ? 1 : 0)) || ((reg.v[a] || 0) - (reg.v[b] || 0)));
    const pegos = idx.slice(0, Math.min(quantas || 8, t.q.length));
    pegos.sort((a, b) => t.q[a].n - t.q[b].n);
    return pegos.map(i => ({ q: t.q[i], i, topico: t.id }));
  }
  /** Provão: questões de todos os tópicos da matéria, com preferência para médias e desafios. */
  function sortearProva(m, quantas) {
    const n = quantas || 12; const porTopico = m.topicos.map(t => embaralha(t.q.map((q, i) => ({ q, i, topico: t.id }))).sort((a, b) => (b.q.n >= 2) - (a.q.n >= 2)));
    const saida = []; let rodada = 0;
    while (saida.length < n && porTopico.some(l => l[rodada])) {
      for (const l of embaralha(porTopico)) { if (l[rodada] && saida.length < n) saida.push(l[rodada]); }
      rodada++;
    }
    return embaralha(saida);
  }

  /* ---------- fim de partida ---------- */
  /** Registra o resultado e devolve o que foi ganho. r: { materia, topico|null (null = Provão), respostas:[{i, topico, certo}], comboMax } */
  function registrar(r) {
    const total = r.respostas.length; const acertos = r.respostas.filter(x => x.certo).length;
    const nota = notaDe(acertos, total); const estrelas = estrelasDaNota(nota); const prova = !r.topico;
    const nivelAntes = nivel().num; const antesConq = Object.assign({}, E.conquistas);
    marcarDia();

    r.respostas.forEach(x => {
      const k = chaveT(r.materia, x.topico); const reg = E.questoes[k] = E.questoes[k] || { v: [], e: [] };
      reg.v[x.i] = (reg.v[x.i] || 0) + 1; reg.e[x.i] = x.certo ? 0 : 1;
    });
    E.stats.acertos += acertos; E.stats.respostas += total; E.stats.comboMax = Math.max(E.stats.comboMax, r.comboMax || 0);

    let melhorou = false, recorde = false, estrelasNovas = 0;
    if (prova) {
      const p = E.provas[r.materia] = E.provas[r.materia] || { melhor: 0, vezes: 0 };
      recorde = nota > p.melhor; melhorou = p.vezes > 0 && recorde;
      p.vezes++; p.melhor = Math.max(p.melhor, nota); p.ultima = nota; p.quando = hoje();
    } else {
      const k = chaveT(r.materia, r.topico); const t = E.topicos[k] = E.topicos[k] || { melhor: 0, estrelas: 0, vezes: 0 };
      recorde = nota > t.melhor; melhorou = t.vezes > 0 && recorde;
      estrelasNovas = Math.max(0, estrelas - t.estrelas);
      t.vezes++; t.melhor = Math.max(t.melhor, nota); t.estrelas = Math.max(t.estrelas, estrelas); t.ultima = nota; t.quando = hoje();
    }
    E.hist.push({ d: hoje(), m: r.materia, t: r.topico || '#prova', nota }); if (E.hist.length > 120) E.hist = E.hist.slice(-120);

    let xp = acertos * 10 + Math.min(30, Math.max(0, (r.comboMax || 0) - 2) * 3) + (prova ? 30 : 15) + (nota === 10 ? 25 : 0);
    let peixes = acertos + estrelas * 2 + estrelasNovas * 3 + (prova && nota >= 7 ? 10 : 0);
    let missaoPaga = false;
    E.missao.feitas++;
    if (!E.missao.paga && E.missao.feitas >= META_DIA) { E.missao.paga = true; peixes += 10; missaoPaga = true; }
    E.xp += xp; E.peixes += peixes;

    const novas = conferirConquistas({ nota, melhorou });
    const nv = nivel();
    salvar();
    return { nota, acertos, total, estrelas, estrelasNovas, xp, peixes, recorde, melhorou, missaoPaga, novas: novas.filter(c => !antesConq[c.id]), subiuNivel: nv.num > nivelAntes ? nv : null, prova };
  }
  function conferirConquistas(ctx) {
    const novas = [];
    CONQUISTAS.forEach(c => { if (!E.conquistas[c.id] && c.ok(E, ctx)) { E.conquistas[c.id] = hoje(); novas.push(c); } });
    return novas;
  }

  /* ---------- lojinha ---------- */
  function comprar(id) {
    const it = LOJA.find(x => x.id === id); if (!it || E.itens.includes(id) || E.peixes < it.preco) return null;
    E.peixes -= it.preco; E.itens.push(id); usar(id, true);
    const novas = conferirConquistas(null); salvar(); return { item: it, novas };
  }
  function usar(id, semSalvar) {
    const it = LOJA.find(x => x.id === id);
    if (id === 'laranja') E.usando.pelo = 'laranja';
    else if (!it || !E.itens.includes(id)) return;
    else if (it.tipo === 'pelo') E.usando.pelo = id;
    else E.usando.acessorio = E.usando.acessorio === id && !semSalvar ? '' : id;
    if (!semSalvar) salvar();
  }

  window.Progresso = {
    get e() { return E; }, carregar, salvar, apagar, nivel, resumoMateria, missao, sequenciaAtual,
    sortearFase, sortearProva, registrar, comprar, usar, totalEstrelas: () => totalEstrelas(E),
    NIVEIS, LOJA, CONQUISTAS, embaralha, hoje, chaveT, notaDe, estrelasDaNota,
  };
})();
