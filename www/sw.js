/* Modo offline da versão web (no app das lojas os arquivos já vão dentro do pacote).
   Ao mudar qualquer arquivo do app, troque o número de VERSAO para os aparelhos buscarem a versão nova. */
const VERSAO = 'dejair-1.0.0';
const ARQUIVOS = [
  './', 'index.html', 'privacidade.html', 'manifest.webmanifest', 'css/app.css',
  'js/app.js', 'js/dejair.js', 'js/progresso.js',
  'js/conteudo/historia.js', 'js/conteudo/geografia.js', 'js/conteudo/ciencias.js',
  'fonts/fredoka-500.woff2', 'fonts/fredoka-600.woff2', 'fonts/fredoka-700.woff2',
  'fonts/nunito-400.woff2', 'fonts/nunito-700.woff2', 'fonts/nunito-800.woff2',
  'icons/icone-192.png', 'icons/icone-512.png', 'icons/icone-180.png',
];
self.addEventListener('install', e => e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
