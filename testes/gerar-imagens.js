/* Gera os ícones do app (web e lojas) e a tela de abertura a partir do desenho do Dejair.
   Uso: node testes/gerar-imagens.js      (precisa do Playwright) */
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
global.window = {}; require('../www/js/dejair.js');
const raiz = path.join(__dirname, '..');
const gato = window.Dejair.svg({ humor: 'feliz' });
const cabeca = gato.replace('viewBox="0 0 200 220"', 'viewBox="14 -6 172 172"').replace(/<path class="dj-rabo"[^>]*>/, '').replace(/<ellipse cx="100" cy="212"[^>]*>/, '');
const fontes = `@font-face{font-family:F;font-weight:700;src:url(file://${raiz}/www/fonts/fredoka-700.woff2)}`;
const pagina = (w, h, corpo, fundo) => `<html><style>${fontes}*{margin:0}body{width:${w}px;height:${h}px;overflow:hidden;background:${fundo};display:grid;place-items:center}svg{display:block}</style><body>${corpo}</body></html>`;
const FUNDO = 'radial-gradient(circle at 50% 38%, #8F7DFF, #5B48D6 78%)';
const icone = (tam, escala) => pagina(tam, tam, `<div style="width:${tam * escala}px;margin-top:${tam * .1}px">${cabeca}</div>`, FUNDO);
const abertura = (tam, fundo, cor) => pagina(tam, tam, `<div style="text-align:center"><div style="width:${tam * .2}px;margin:0 auto">${gato}</div><div style="font:700 ${tam * .034}px F;color:${cor};margin-top:${tam * .012}px">Trilhas do <span style="color:#F08A24">Dejair</span></div></div>`, fundo);
const lista = [
  ['www/icons/icone-512.png', 512, icone(512, .86)], ['www/icons/icone-192.png', 192, icone(192, .86)], ['www/icons/icone-180.png', 180, icone(180, .86)],
  ['www/icons/icone-mascara-512.png', 512, icone(512, .62)],
  ['assets/icon-only.png', 1024, icone(1024, .86)],
  ['assets/icon-foreground.png', 1024, pagina(1024, 1024, `<div style="width:${1024 * .5}px;margin-top:40px">${cabeca}</div>`, 'transparent')],
  ['assets/icon-background.png', 1024, pagina(1024, 1024, '', FUNDO)],
  ['assets/splash.png', 2732, abertura(2732, '#FFF6EA', '#2D3142')], ['assets/splash-dark.png', 2732, abertura(2732, '#2D3142', '#FFF6EA')],
];
(async () => {
  const b = await chromium.launch();
  for (const [arq, tam, html] of lista) {
    const p = await b.newPage({ viewport: { width: tam, height: tam } }); await p.setContent(html); await p.waitForTimeout(150);
    const destino = path.join(raiz, arq); fs.mkdirSync(path.dirname(destino), { recursive: true });
    await p.screenshot({ path: destino, omitBackground: arq.includes('foreground') }); await p.close(); console.log(arq);
  }
  await b.close();
})();
