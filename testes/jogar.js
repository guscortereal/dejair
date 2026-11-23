/* Teste de ponta a ponta: abre o app num navegador em tamanho de celular e joga de verdade.
   Uso: node testes/jogar.js            (precisa do Playwright; sai com código 1 se algo falhar) */
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const PORTA = 8767, URL = `http://localhost:${PORTA}/`;
const falhas = [];
const confere = (ok, msg) => { console.log(`${ok ? 'ok  ' : 'FALHA'} ${msg}`); if (!ok) falhas.push(msg); };

/* Responde a questão que está na tela. acertar=true dá a resposta certa; false erra de propósito. */
async function responde(page, acertar) {
  const tipo = await page.evaluate(() => {
    const c = document.getElementById('corpo');
    if (c.querySelector('.pares')) return 'par'; if (c.querySelector('.vagas')) return 'ord';
    if (c.querySelector('.op.vf')) return 'vf'; return c.querySelector('.lacuna') ? 'lac' : 'mc';
  });
  if (tipo === 'mc' || tipo === 'lac') await page.click(`#corpo .op[data-i="${acertar ? 0 : 1}"]`);
  else if (tipo === 'vf') {
    const certa = await page.evaluate(() => { const m = document.querySelector('.pergunta').textContent; for (const mat of window.DEJAIR_CONTEUDO) for (const t of mat.topicos) for (const q of t.q) if (q.t === 'vf' && q.p.replace(/<[^>]+>/g, '') === m) return q.r; return null; });
    await page.click(`#corpo .op.vf[data-v="${(acertar ? certa : !certa) ? 1 : 0}"]`);
  } else if (tipo === 'ord') {
    const n = await page.locator('#corpo .vaga').count();
    const ordem = [...Array(n).keys()]; if (!acertar) ordem.reverse();
    for (const i of ordem) await page.click(`#corpo .solta[data-i="${i}"]`);
  } else {
    const n = await page.locator('#corpo .pares > div:first-child .op').count();
    for (let i = 0; i < n; i++) { await page.click(`#corpo [data-ac="par-e"][data-i="${i}"]`); await page.click(`#corpo [data-ac="par-d"][data-i="${acertar ? i : (i + 1) % n}"]`); }
  }
  await page.click('#verificar');
  const bom = await page.locator('.retorno.bom').count();
  confere(!!bom === acertar, `questão ${tipo}: resposta ${acertar ? 'certa aceita' : 'errada recusada'}`);
  return tipo;
}
async function jogaAteOFim(page, erros) {
  const tipos = new Set(); let n = 0;
  for (;;) {
    tipos.add(await responde(page, n >= (erros || 0))); n++;
    const ultimo = (await page.locator('[data-ac="continuar"]').textContent()).includes('nota');
    await page.click('[data-ac="continuar"]');
    if (ultimo) break;
  }
  await page.waitForSelector('.nota-final');
  return { n, tipos };
}

(async () => {
  const srv = spawn(process.execPath, [path.join(__dirname, 'servidor.js')], { env: Object.assign({}, process.env, { PORTA }), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 600));
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    const errosJs = []; page.on('pageerror', e => errosJs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errosJs.push(m.text()); });
    await page.goto(URL); await page.waitForSelector('.boas-vindas');
    confere(true, 'boas-vindas aparece na primeira vez');
    await page.fill('#nome', 'Teste <b>'); await page.click('.boas-vindas .btn');
    await page.waitForSelector('.materias');
    const nMat = await page.evaluate(() => window.DEJAIR_CONTEUDO.length);
    confere(nMat === 5 && await page.locator('.materia:not(.em-breve)').count() === nMat, `início mostra as ${nMat} matérias`);
    confere(await page.locator('.materia.em-breve').count() === 0, 'nenhuma matéria ficou como "em breve"');
    confere(!(await page.content()).includes('Teste <b>'), 'nome digitado é escapado');

    // todas as fases de todas as matérias abrem e mostram resumo
    const mapa = await page.evaluate(() => window.DEJAIR_CONTEUDO.map(m => ({ id: m.id, topicos: m.topicos.map(t => t.id) })));
    for (const m of mapa) for (const t of m.topicos) { await page.goto(`${URL}#/m/${m.id}/${t}`); await page.waitForSelector('.ficha'); }
    confere(true, `${mapa.reduce((s, m) => s + m.topicos.length, 0)} fases abrem com resumo`);

    // uma fase com 3 erros → nota 6,3 (5 de 8), 1 estrela
    const m0 = mapa[0];
    await page.goto(`${URL}#/m/${m0.id}`); await page.waitForSelector('.trilha');
    confere(await page.locator('.no.prova.trancado').count() === 1, 'Provão começa trancado');
    await page.click('.no.vez'); await page.click('.rodape .btn');
    await page.waitForSelector('#corpo');
    let r = await jogaAteOFim(page, 3);
    confere(r.n === 8, 'fase tem 8 questões');
    confere((await page.locator('.nota-final b').textContent()) === '6,3', 'nota 6,3 com 5 de 8');
    confere(await page.locator('.res-estrelas i.on').count() === 1, '1 estrela para nota entre 5 e 7');
    confere(await page.locator('.rev').count() === 3, 'lista "para rever" traz os 3 erros');
    confere((await page.locator('.destaque.conquista').count()) >= 1, 'conquista "Primeiro passo" liberada');

    // jogar de novo, tudo certo → nota 10, recorde
    await page.click('[data-ac="de-novo"]'); await page.waitForSelector('#corpo');
    r = await jogaAteOFim(page, 0);
    confere((await page.locator('.nota-final b').textContent()) === '10', 'nota 10 gabaritando');
    confere(await page.locator('.res-estrelas i.on').count() === 3, '3 estrelas com nota 10');
    confere((await page.content()).includes('Novo recorde'), 'aviso de recorde ao melhorar a nota');
    confere((await page.content()).includes('Missão do dia cumprida'), 'missão do dia paga na 2ª fase');

    // completa fases até liberar o Provão, cobrindo todos os tipos de questão
    const tipos = new Set(r.tipos); const metade = Math.ceil(m0.topicos.length / 2);
    for (let i = 1; i < metade; i++) { await page.goto(`${URL}#/jogar/${m0.id}/${m0.topicos[i]}`); await page.waitForSelector('#corpo'); (await jogaAteOFim(page, 0)).tipos.forEach(t => tipos.add(t)); }
    confere(['mc', 'vf', 'lac', 'ord', 'par'].every(t => tipos.has(t)), `os 5 tipos de questão foram jogados (${[...tipos].join(', ')})`);
    await page.goto(`${URL}#/m/${m0.id}`); await page.waitForSelector('.trilha');
    confere(await page.locator('.no.prova.trancado').count() === 0, `Provão liberado com ${metade} fases`);
    await page.click('.no.prova'); await page.waitForSelector('#corpo');
    r = await jogaAteOFim(page, 1);
    confere(r.n === 12, 'Provão tem 12 questões');
    confere((await page.locator('.nota-final small').textContent()) === 'Nota final', 'Provão mostra "Nota final"');
    confere((await page.locator('.nota-final b').textContent()) === '9,2', 'nota final 9,2 com 11 de 12');

    // texto de apoio (crônica, anúncio, tabela, figura) aparece na questão e na lista "para rever"
    await page.goto(`${URL}#/jogar/portugues/interpretacao`); await page.waitForSelector('#corpo .apoio');
    confere((await page.locator('#corpo .apoio').textContent()).length > 200, 'questão de interpretação mostra o texto de apoio');
    await jogaAteOFim(page, 8);
    confere(await page.locator('.rev .apoio').count() >= 1, 'texto de apoio aparece na lista "para rever"');
    await page.goto(`${URL}#/jogar/portugues/anuncio`); await page.waitForSelector('#corpo');
    for (let i = 0; i < 8 && !(await page.locator('#corpo .anuncio').count()); i++) { await responde(page, true); await page.click('[data-ac="continuar"]'); }
    confere(await page.locator('#corpo .anuncio').count() === 1, 'questão de anúncio mostra o anúncio');
    for (const [fase, sel] of [['graficos', '.apoio table'], ['graficos', '.apoio svg'], ['angulos', '.apoio svg'], ['fracoes', '.fr']]) {
      let achou = false;
      for (let k = 0; k < 6 && !achou; k++) {
        await page.goto(`${URL}#/`); await page.goto(`${URL}#/jogar/matematica/${fase}`); await page.waitForSelector('#corpo');
        for (let i = 0; i < 8 && !achou; i++) { achou = !!(await page.locator(`#corpo ${sel}`).count()); if (!achou && i < 7) { await responde(page, true); await page.click('[data-ac="continuar"]'); } }
        if (!achou) { await responde(page, true); await page.click('[data-ac="continuar"]'); await page.waitForSelector('.nota-final'); }
      }
      confere(achou, `Matemática/${fase}: questão com ${sel}`);
    }
    await page.goto(`${URL}#/`);

    // sair no meio pede confirmação e não registra
    await page.goto(`${URL}#/m/${mapa[1].id}/${mapa[1].topicos[0]}`); await page.click('.rodape .btn'); await page.waitForSelector('#corpo');
    await responde(page, true); await page.click('[data-ac="sair"]'); await page.waitForSelector('.caixa'); await page.click('.caixa [data-r="1"]');
    await page.waitForSelector('.ficha');
    confere(await page.evaluate(() => !window.Progresso.e.topicos['geografia.regioes']), 'sair no meio não grava a fase');

    // progresso persiste depois de recarregar
    const antes = await page.evaluate(() => JSON.stringify([window.Progresso.e.xp, window.Progresso.e.peixes, window.Progresso.totalEstrelas()]));
    await page.goto(URL); await page.reload(); await page.waitForSelector('.materias');
    confere(antes === await page.evaluate(() => JSON.stringify([window.Progresso.e.xp, window.Progresso.e.peixes, window.Progresso.totalEstrelas()])), `progresso persiste ao recarregar ${antes}`);

    // lojinha: compra e uso
    await page.evaluate(() => { window.Progresso.e.peixes = 60; window.Progresso.salvar(); });   // quantia conhecida: dá para a gravata, não para a coroa
    await page.click('.aba[data-ir="#/loja"]'); await page.waitForSelector('.itens');
    const peixes = await page.evaluate(() => window.Progresso.e.peixes);
    await page.click('[data-ac="comprar"][data-id="gravata"]'); await page.click('.caixa [data-r="1"]');
    confere(await page.evaluate(() => window.Progresso.e.itens.includes('gravata') && window.Progresso.e.usando.acessorio === 'gravata'), 'compra da gravata e uso automático');
    confere(await page.evaluate(() => window.Progresso.e.peixes) === peixes - 15, 'sardinhas descontadas');
    await page.click('[data-ac="comprar"][data-id="coroa"]');
    confere(await page.locator('.caixa').count() === 0 && await page.evaluate(() => !window.Progresso.e.itens.includes('coroa')), 'item caro demais não é vendido');

    // conquistas e evolução
    await page.click('.aba[data-ir="#/conquistas"]'); await page.waitForSelector('.medalhas');
    confere(await page.locator('.medalha.on').count() >= 5, `conquistas liberadas: ${await page.locator('.medalha.on').count()}`);
    await page.click('.aba[data-ir="#/evolucao"]'); await page.waitForSelector('.grafico');
    confere(await page.locator('.grafico .col').count() >= 5, 'gráfico de notas com as partidas');
    confere(await page.locator('.boletim').count() === nMat, `boletim das ${nMat} matérias`);

    // cópia nas Preferências do app nativo (simulada) repõe o progresso se o navegador interno for limpo
    const guardado = await page.evaluate(() => localStorage.getItem('dejair_trilhas_v1'));
    const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 } }); const p2 = await ctx2.newPage();
    await p2.addInitScript(v => { window.Capacitor = { Plugins: { Preferences: { get: async () => ({ value: v }), set: async () => {} } } }; }, guardado);
    await p2.goto(URL); await p2.waitForSelector('.materias');
    confere(await p2.evaluate(() => window.Progresso.e.xp) > 0, 'progresso reposto a partir das Preferências nativas');
    await ctx2.close();

    // apagar progresso
    await page.click('[data-ac="apagar"]'); await page.click('.caixa [data-r="1"]'); await page.waitForSelector('.boas-vindas');
    confere(await page.evaluate(() => window.Progresso.e.xp === 0), 'apagar progresso zera tudo');

    // nada transborda na largura em telas pequenas
    for (const w of [320, 390, 768]) {
      await page.setViewportSize({ width: w, height: 800 }); await page.fill('#nome', 'Ana'); await page.click('.boas-vindas .btn'); await page.waitForSelector('.materias');
      let larg = 0;
      for (const h of ['#/', '#/m/historia', '#/m/geografia/norte', '#/m/matematica', '#/m/portugues/cronica', '#/m/matematica/fracoes', '#/jogar/ciencias/digestorio', '#/loja', '#/conquistas', '#/evolucao']) { await page.goto(URL + h); await page.waitForTimeout(80); larg = Math.max(larg, await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)); }
      // fases com texto, anúncio, tabela, gráfico e figura: confere todas as questões, uma por uma
      for (const f of ['portugues/interpretacao', 'portugues/anuncio', 'portugues/discurso', 'matematica/graficos', 'matematica/area', 'matematica/fracoes', 'matematica/porcentagem']) {
        await page.goto(URL + '#/'); await page.goto(`${URL}#/jogar/${f}`); await page.waitForSelector('#corpo');
        for (let i = 0; i < 8; i++) {
          larg = Math.max(larg, await page.evaluate(() => Math.max(document.documentElement.scrollWidth - window.innerWidth, ...[...document.querySelectorAll('#corpo .op, #corpo .pergunta')].map(el => el.scrollWidth - el.clientWidth))));
          await responde(page, true); if (i < 7) await page.click('[data-ac="continuar"]');
        }
      }
      confere(larg <= 0, `sem rolagem lateral em ${w}px`);
      await page.goto(URL + '#/evolucao'); await page.waitForSelector('[data-ac="apagar"]'); await page.click('[data-ac="apagar"]'); await page.click('.caixa [data-r="1"]'); await page.waitForSelector('.boas-vindas');
    }
    confere(errosJs.length === 0, `sem erros de JavaScript${errosJs.length ? ': ' + errosJs.slice(0, 3).join(' | ') : ''}`);
  } catch (e) { confere(false, 'teste interrompido: ' + e.message.split('\n')[0]); }
  await browser.close(); srv.kill();
  console.log(falhas.length ? `\n${falhas.length} falha(s).` : '\nTudo passou.');
  process.exit(falhas.length ? 1 : 0);
})();
