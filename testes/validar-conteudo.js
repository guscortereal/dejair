/* Confere o conteúdo das matérias: estrutura, tipos de questão e tamanhos.
   Uso: node testes/validar-conteudo.js            (sai com código 1 se houver erro) */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'www', 'js', 'conteudo');
global.window = { DEJAIR_CONTEUDO: [] };
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) require(path.join(dir, f));

const erros = [], avisos = [];
const semTags = s => String(s).replace(/<[^>]+>/g, '');
const TIPOS = ['mc', 'vf', 'lac', 'ord', 'par'];
let totalQ = 0;

for (const m of window.DEJAIR_CONTEUDO) {
  const onde = m.id;
  for (const k of ['id', 'nome', 'icone', 'cor', 'unidade', 'desc']) if (!m[k]) erros.push(`${onde}: falta "${k}"`);
  if (!Array.isArray(m.topicos) || !m.topicos.length) { erros.push(`${onde}: sem tópicos`); continue; }
  const ids = new Set();
  for (const t of m.topicos) {
    const o = `${m.id}.${t.id}`;
    if (ids.has(t.id)) erros.push(`${o}: id repetido`); ids.add(t.id);
    for (const k of ['id', 'nome', 'icone', 'intro']) if (!t[k]) erros.push(`${o}: falta "${k}"`);
    if (!/^[a-z0-9-]+$/.test(t.id || '')) erros.push(`${o}: id deve ter só letras minúsculas, números e hífen`);
    if (!Array.isArray(t.resumo) || t.resumo.length < 3 || t.resumo.length > 5) erros.push(`${o}: resumo deve ter de 3 a 5 cartões`);
    else t.resumo.forEach((c, i) => {
      if (!c.t || !c.c) erros.push(`${o}: cartão ${i + 1} do resumo sem título (t) ou conteúdo (c)`);
      else if (semTags(c.c).length > 420) avisos.push(`${o}: cartão ${i + 1} do resumo está longo (${semTags(c.c).length} caracteres)`);
    });
    if (!Array.isArray(t.q) || t.q.length < 10) erros.push(`${o}: precisa de pelo menos 10 questões (tem ${t.q ? t.q.length : 0})`);
    const cont = {};
    (t.q || []).forEach((q, i) => {
      const oq = `${o} q${i + 1}`; totalQ++;
      cont[q.t] = (cont[q.t] || 0) + 1;
      if (!TIPOS.includes(q.t)) return erros.push(`${oq}: tipo "${q.t}" desconhecido`);
      if (![1, 2, 3].includes(q.n)) erros.push(`${oq}: nível (n) deve ser 1, 2 ou 3`);
      if (!q.p) erros.push(`${oq}: falta a pergunta (p)`);
      if (!q.e) erros.push(`${oq}: falta a explicação (e)`);
      if (q.p && semTags(q.p).length > 190) avisos.push(`${oq}: pergunta longa (${semTags(q.p).length})`);
      if (q.e && semTags(q.e).length > 240) avisos.push(`${oq}: explicação longa (${semTags(q.e).length})`);
      if ('r' in q && q.t !== 'vf') erros.push(`${oq}: só "vf" usa o campo r`);
      if (q.t === 'vf') {
        if (typeof q.r !== 'boolean') erros.push(`${oq}: vf precisa de r: true ou false`);
        if (q.o) erros.push(`${oq}: vf não usa opções`);
        return;
      }
      if (!Array.isArray(q.o)) return erros.push(`${oq}: faltam as opções (o)`);
      if (q.t === 'mc' || q.t === 'lac') {
        if (q.t === 'mc' && q.o.length !== 4) erros.push(`${oq}: mc precisa de 4 opções (tem ${q.o.length})`);
        if (q.t === 'lac' && (q.o.length < 3 || q.o.length > 4)) erros.push(`${oq}: lac precisa de 3 ou 4 opções`);
        if (q.t === 'lac' && (String(q.p).match(/___/g) || []).length !== 1) erros.push(`${oq}: lac precisa de exatamente uma lacuna ___ na frase`);
        if (new Set(q.o.map(x => semTags(x).trim().toLowerCase())).size !== q.o.length) erros.push(`${oq}: opções repetidas`);
        q.o.forEach(x => { if (typeof x !== 'string') erros.push(`${oq}: opção não é texto`); else if (semTags(x).length > 70) avisos.push(`${oq}: opção longa (${semTags(x).length}): ${x}`); });
        const tam = q.o.map(x => semTags(x).length), outras = tam.slice(1);
        if (tam[0] > Math.max(...outras) * 1.6 + 6) avisos.push(`${oq}: a opção certa é bem mais longa que as outras (entrega a resposta)`);
        if (/todas as (alternativas|anteriores)|nenhuma das/i.test(q.o.join(' '))) erros.push(`${oq}: não use "todas/nenhuma das anteriores" (as opções são embaralhadas)`);
      }
      if (q.t === 'ord') {
        if (q.o.length < 3 || q.o.length > 5) erros.push(`${oq}: ord precisa de 3 a 5 itens`);
        if (new Set(q.o).size !== q.o.length) erros.push(`${oq}: itens repetidos`);
        q.o.forEach(x => { if (semTags(x).length > 48) avisos.push(`${oq}: item longo (${semTags(x).length}): ${x}`); });
      }
      if (q.t === 'par') {
        if (q.o.length < 3 || q.o.length > 4) erros.push(`${oq}: par precisa de 3 ou 4 pares`);
        if (!q.o.every(x => Array.isArray(x) && x.length === 2)) return erros.push(`${oq}: cada par é [esquerda, direita]`);
        if (new Set(q.o.map(x => x[0])).size !== q.o.length || new Set(q.o.map(x => x[1])).size !== q.o.length) erros.push(`${oq}: par com lado repetido`);
        q.o.flat().forEach(x => { if (semTags(x).length > 34) avisos.push(`${oq}: lado do par longo (${semTags(x).length}): ${x}`); });
      }
    });
    if ((cont.mc || 0) < 4) erros.push(`${o}: precisa de pelo menos 4 questões mc`);
    if (!(cont.vf)) erros.push(`${o}: precisa de pelo menos 1 questão vf`);
    if (!(cont.ord || cont.par)) erros.push(`${o}: precisa de pelo menos 1 questão ord ou par`);
    const niveis = new Set((t.q || []).map(q => q.n));
    if (niveis.size < 3) erros.push(`${o}: precisa ter questões dos 3 níveis`);
  }
}
console.log(`${window.DEJAIR_CONTEUDO.length} matérias · ${window.DEJAIR_CONTEUDO.reduce((s, m) => s + m.topicos.length, 0)} tópicos · ${totalQ} questões`);
avisos.forEach(a => console.log('aviso  ' + a));
erros.forEach(e => console.log('ERRO   ' + e));
console.log(erros.length ? `\n${erros.length} erro(s).` : '\nConteúdo válido.');
process.exit(erros.length ? 1 : 0);
