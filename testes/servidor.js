/* Servidor local para experimentar o app no navegador:  node testes/servidor.js  →  http://localhost:8766 */
const http = require('http'), fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..', 'www'), porta = Number(process.env.PORTA) || 8766;
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const arq = path.join(raiz, path.normalize(p));
  if (!arq.startsWith(raiz)) { res.writeHead(403); return res.end(); }
  fs.readFile(arq, (e, dados) => {
    if (e) { res.writeHead(404); return res.end('não encontrado'); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(dados);
  });
}).listen(porta, () => console.log(`Trilhas do Dejair em http://localhost:${porta}`));
