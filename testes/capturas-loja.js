/* Tira as capturas de tela do app, já com progresso de exemplo, nos tamanhos pedidos pela App Store.
   Uso: node testes/capturas-loja.js <pasta> <escala> <largura> <altura> [jpg|png]
   iPhone: node testes/capturas-loja.js loja/capturas/iphone 3 430 932 jpg     (1290 × 2796)
   iPad:   node testes/capturas-loja.js loja/capturas/ipad 2 1032 1376 jpg     (2064 × 2752) */
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const out = process.argv[2], ext = process.argv[6] || 'png', escala = Number(process.argv[3] || 1), W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
(async () => {
  require('fs').mkdirSync(out, { recursive: true });
  const srv = spawn(process.execPath, [require('path').join(__dirname, 'servidor.js')], { env: Object.assign({}, process.env, { PORTA: 8768 }), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 500));
  const b = await chromium.launch(); const c = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: escala, isMobile: true, hasTouch: true });
  const p = await c.newPage(); const U = 'http://localhost:8768/';
  await p.addInitScript(() => { const s = document.createElement('style'); s.textContent = '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important}'; document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s)); });
  const foto = async n => { await p.waitForTimeout(250); await p.screenshot(ext === 'jpg' ? { path: `${out}/${n}.jpg`, type: 'jpeg', quality: 92 } : { path: `${out}/${n}.png` }); };
  await p.goto(U); await p.waitForSelector('.boas-vindas'); await foto('01-boas-vindas');
  // estado de quem já jogou um pouco
  await p.evaluate(() => {
    const P = window.Progresso, e = P.e; e.nome = 'Lia'; e.apresentado = true; e.xp = 430; e.peixes = 64; e.dias = { ultimo: P.hoje(), seq: 4, melhor: 4 };
    const t = (k, n, s, v) => { e.topicos[k] = { melhor: n, estrelas: s, vezes: v, ultima: n }; };
    t('historia.cidadao', 10, 3, 2); t('historia.cidadania-brasil', 8.8, 2, 1); t('historia.abolicionismo', 7.5, 2, 1); t('historia.fim-escravidao', 6.3, 1, 1); t('historia.pos-abolicao', 8.8, 2, 1);
    t('geografia.regioes', 10, 3, 1); t('geografia.norte', 7.5, 2, 2); t('ciencias.nutricao', 8.8, 2, 1); t('ciencias.digestorio', 10, 3, 1); t('ciencias.respiratorio', 6.3, 1, 1);
    e.provas.historia = { melhor: 8.3, vezes: 1 };
    e.hist = [['historia', 'cidadao', 7.5], ['historia', 'cidadao', 10], ['geografia', 'regioes', 10], ['ciencias', 'nutricao', 8.8], ['historia', 'fim-escravidao', 6.3], ['geografia', 'norte', 5], ['geografia', 'norte', 7.5], ['ciencias', 'digestorio', 10], ['historia', '#prova', 8.3], ['ciencias', 'respiratorio', 6.3]].map(x => ({ d: P.hoje(), m: x[0], t: x[1], nota: x[2] }));
    e.stats = { acertos: 86, respostas: 104, comboMax: 8 }; e.missao = { dia: P.hoje(), feitas: 1, paga: false };
    ['primeira', 'nota10', 'combo5', 'seq3', 'estrelas10', 'tres', 'melhorou', 'prova', 'estilo'].forEach(k => e.conquistas[k] = P.hoje());
    e.itens = ['gravata', 'oculos']; e.usando = { acessorio: 'oculos', pelo: 'laranja' }; P.salvar();
  });
  await p.goto(U + '#/'); await p.reload(); await p.waitForSelector('.materias'); await foto('02-inicio');
  await p.goto(U + '#/m/historia'); await foto('03-trilha');
  await p.evaluate(() => window.scrollTo(0, 99999)); await foto('03b-trilha-fim');
  await p.goto(U + '#/m/ciencias/digestorio'); await foto('04-resumo');
  const ate = async (m, t, tipo) => { for (let k = 0; k < 40; k++) { await p.goto(U + '#/'); await p.goto(U + `#/jogar/${m}/${t}`); await p.waitForSelector('#corpo'); const sel = { mc: '.opcoes:not(.fichas) > .op > .letra', vf: '.op.vf', lac: '.lacuna', ord: '.vagas', par: '.pares' }[tipo];
    for (let i = 0; i < 8; i++) { if (await p.locator('#corpo ' + sel).count()) return true; const tp = await p.evaluate(() => { const c = document.getElementById('corpo'); return c.querySelector('.pares') ? 'par' : c.querySelector('.vagas') ? 'ord' : c.querySelector('.op.vf') ? 'vf' : 'mc'; });
      if (tp === 'mc') await p.click('#corpo .op[data-i="0"]'); else if (tp === 'vf') await p.click('#corpo .op.vf'); else if (tp === 'ord') { const n = await p.locator('#corpo .vaga').count(); for (let j = 0; j < n; j++) await p.click(`#corpo .solta[data-i="${j}"]`); } else { const n = await p.locator('#corpo [data-ac="par-e"]').count(); for (let j = 0; j < n; j++) { await p.click(`#corpo [data-ac="par-e"][data-i="${j}"]`); await p.click(`#corpo [data-ac="par-d"][data-i="${j}"]`); } }
      await p.click('#verificar'); if (i < 7) await p.click('[data-ac="continuar"]'); } } return false; };
  await ate('ciencias', 'digestorio', 'mc'); await p.click('#corpo .op[data-i="0"]'); await foto('05-quiz-mc'); await p.click('#verificar'); await foto('06-quiz-certo');
  await ate('ciencias', 'digestorio', 'ord'); await p.click('#corpo .solta[data-i="0"]'); await p.click('#corpo .solta[data-i="1"]'); await foto('07-quiz-ordenar');
  await ate('geografia', 'sudeste', 'par'); await p.click('#corpo [data-ac="par-e"][data-i="0"]'); await p.click('#corpo [data-ac="par-d"][data-i="0"]'); await p.click('#corpo [data-ac="par-e"][data-i="1"]'); await p.click('#corpo [data-ac="par-d"][data-i="1"]'); await p.click('#corpo [data-ac="par-e"][data-i="2"]'); await foto('08-quiz-pares');
  await ate('historia', 'oligarquias', 'vf'); await p.click('#corpo .op.vf[data-v="1"]'); await p.click('#verificar'); await foto('09-quiz-vf');
  await ate('historia', 'vargas', 'lac'); await p.click('#corpo .op[data-i="1"]'); await p.click('#verificar'); await foto('10-quiz-erro');
  // resultado: joga uma fase inteira acertando
  await p.goto(U + '#/'); await p.goto(U + '#/jogar/geografia/sul'); await p.waitForSelector('#corpo');
  for (let i = 0; i < 8; i++) { const tp = await p.evaluate(() => { const c = document.getElementById('corpo'); return c.querySelector('.pares') ? 'par' : c.querySelector('.vagas') ? 'ord' : c.querySelector('.op.vf') ? 'vf' : 'mc'; });
    if (tp === 'mc') await p.click(`#corpo .op[data-i="${i === 3 ? 1 : 0}"]`); else if (tp === 'vf') { const r = await p.evaluate(() => { const m = document.querySelector('.pergunta').textContent; for (const mat of window.DEJAIR_CONTEUDO) for (const t of mat.topicos) for (const q of t.q) if (q.t === 'vf' && q.p.replace(/<[^>]+>/g, '') === m) return q.r; }); await p.click(`#corpo .op.vf[data-v="${r ? 1 : 0}"]`); }
    else if (tp === 'ord') { const n = await p.locator('#corpo .vaga').count(); for (let j = 0; j < n; j++) await p.click(`#corpo .solta[data-i="${j}"]`); } else { const n = await p.locator('#corpo [data-ac="par-e"]').count(); for (let j = 0; j < n; j++) { await p.click(`#corpo [data-ac="par-e"][data-i="${j}"]`); await p.click(`#corpo [data-ac="par-d"][data-i="${j}"]`); } }
    await p.click('#verificar'); await p.click('[data-ac="continuar"]'); }
  await p.waitForSelector('.nota-final'); await foto('11-resultado');
  await p.goto(U + '#/conquistas'); await foto('12-conquistas');
  await p.goto(U + '#/loja'); await foto('13-loja');
  await p.goto(U + '#/evolucao'); await foto('14-evolucao');
  await b.close(); srv.kill();
})().catch(e => { console.error(e); process.exit(1); });
