/* Matemática — números, operações, medidas, tratamento da informação e geometria.
   Formato e regras em LEIA-ME.md. Em mc e lac, a opção certa é sempre a primeira.
   As tabelas, os gráficos e as figuras do campo x são montados pelas funções abaixo. */
(function () {
  window.DEJAIR_CONTEUDO = window.DEJAIR_CONTEUDO || [];

  /* ---------- fração, tabela e figuras ---------- */
  const n1 = v => Math.round(v * 10) / 10;
  /** Fração com o numerador sobre o denominador. */
  const fr = (a, b) => `<span class="fr"><span>${a}</span><span>${b}</span></span>`;
  const fig = (w, h, corpo, rotulo) => `<svg class="fig" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${rotulo}">${corpo}</svg>`;
  const tabela = (titulo, cab, linhas, nota) => `<h4>${titulo}</h4><table><thead><tr>${cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${linhas.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>${nota ? `<small>${nota}</small>` : ''}`;

  /** Gráfico de barras: dados = [[nome, valor], ...]; passo = intervalo da escala. Os valores não são escritos nas barras, para o aluno ler a escala. */
  function barras(titulo, dados, passo, nota) {
    const max = Math.ceil(Math.max(...dados.map(d => d[1])) / passo) * passo;
    const W = 300, H = 186, x0 = 34, y0 = 160, yT = 12, hP = y0 - yT, lb = (W - x0 - 8) / dados.length;
    let s = '';
    for (let v = 0; v <= max; v += passo) { const y = n1(y0 - v / max * hP); s += `<path class="gr" d="M${x0} ${y} H${W - 8}"/><text x="${x0 - 6}" y="${y + 4}" text-anchor="end">${v}</text>`; }
    dados.forEach(([nome, v], i) => { const h = n1(v / max * hP); s += `<rect class="ch" x="${n1(x0 + i * lb + lb * .2)}" y="${n1(y0 - h)}" width="${n1(lb * .6)}" height="${h}" rx="4"/><text x="${n1(x0 + i * lb + lb / 2)}" y="${y0 + 17}" text-anchor="middle">${nome}</text>`; });
    s += `<path class="ex" d="M${x0} ${yT - 6} V${y0} H${W - 8}"/>`;
    return `<h4>${titulo}</h4>${fig(W, H, s, 'Gráfico de barras: ' + titulo)}${nota ? `<small>${nota}</small>` : ''}`;
  }
  /** Ângulo de g graus (sem mostrar a medida). O ângulo reto ganha o quadradinho. */
  function angulo(g) {
    const cx = 120, cy = 116, R = 96, r = 26, a = g * Math.PI / 180;
    const marca = g === 90 ? `<path class="fi" d="M${cx + 16} ${cy} v-16 h-16"/>` : `<path class="fi" d="M${cx + r} ${cy} A${r} ${r} 0 0 0 ${n1(cx + r * Math.cos(a))} ${n1(cy - r * Math.sin(a))}"/>`;
    return fig(240, 130, `${marca}<path class="tr" d="M${cx + R} ${cy} L${cx} ${cy} L${n1(cx + R * Math.cos(a))} ${n1(cy - R * Math.sin(a))}"/>`, 'Figura de um ângulo');
  }
  /** Polígono regular de n lados. */
  function poligono(n) {
    const cx = 120, cy = 74, R = 62, ini = -Math.PI / 2 + (n % 2 ? 0 : Math.PI / n);
    const pts = Array.from({ length: n }, (_, i) => { const a = ini + i * 2 * Math.PI / n; return `${n1(cx + R * Math.cos(a))},${n1(cy + R * Math.sin(a))}`; }).join(' ');
    return fig(240, 148, `<polygon class="pl" points="${pts}"/>`, 'Figura de um polígono');
  }
  /** Malha quadriculada. cheias = [[coluna, linha], ...]; meias = [[coluna, linha, canto do ângulo reto: 'ie' | 'id'], ...]. */
  function malha(cols, lins, cheias, meias) {
    const L = 28, m = 3, W = cols * L + 2 * m, H = lins * L + 2 * m; let s = '';
    (cheias || []).forEach(([c, l]) => { s += `<rect class="ch" x="${m + c * L}" y="${m + l * L}" width="${L}" height="${L}"/>`; });
    (meias || []).forEach(([c, l, canto]) => { const x = m + c * L, y = m + l * L; const p = canto === 'ie' ? [[x, y], [x, y + L], [x + L, y + L]] : [[x + L, y], [x + L, y + L], [x, y + L]]; s += `<polygon class="ch" points="${p.map(q => q.join(',')).join(' ')}"/>`; });
    let d = ''; for (let i = 0; i <= cols; i++) d += `M${m + i * L} ${m}V${H - m}`; for (let j = 0; j <= lins; j++) d += `M${m} ${m + j * L}H${W - m}`;
    return fig(W, H, `${s}<path class="gr" d="${d}"/>`, 'Figura pintada em uma malha quadriculada');
  }
  const ret = (c0, l0, w, h) => { const r = []; for (let c = 0; c < w; c++) for (let l = 0; l < h; l++) r.push([c0 + c, l0 + l]); return r; };
  /** Barra dividida em den partes iguais, com num partes pintadas. */
  function barra(num, den) {
    const W = 244, H = 46, m = 3, w = (W - 2 * m) / den; let s = '';
    for (let i = 0; i < den; i++) s += `${i < num ? `<rect class="ch" x="${n1(m + i * w)}" y="${m}" width="${n1(w)}" height="${H - 2 * m}"/>` : ''}<rect class="ex" x="${n1(m + i * w)}" y="${m}" width="${n1(w)}" height="${H - 2 * m}"/>`;
    return fig(W, H, s, 'Barra dividida em partes iguais, com algumas partes pintadas');
  }

  /* ---------- dados das questões de tabelas e gráficos ---------- */
  const G = {
    animais: tabela('Animal de estimação preferido do 5º ano', ['Animal', 'Votos'], [['Cachorro', 14], ['Gato', 9], ['Peixe', 4], ['Pássaro', 3]], 'Fonte: pesquisa feita com os alunos da turma.'),
    livros: barras('Livros emprestados pela biblioteca', [['Março', 40], ['Abril', 60], ['Maio', 30], ['Junho', 80]], 10, 'Fonte: biblioteca da escola.'),
    sardinhas: tabela('Sardinhas que o Dejair comeu', ['Dia', 'Sardinhas'], [['Segunda', '🐟🐟'], ['Terça', '🐟🐟🐟🐟'], ['Quarta', '🐟'], ['Quinta', '🐟🐟🐟']], 'Legenda: cada 🐟 vale 5 sardinhas.'),
    turmas: tabela('Alunos do 5º ano', ['Turma', 'Meninas', 'Meninos'], [['5º A', 12, 15], ['5º B', 16, 11], ['5º C', 14, 14]]),
  };
  const M = {
    retangulo: malha(6, 5, ret(1, 1, 4, 3)),
    ele: malha(6, 5, ret(1, 0, 2, 4).concat([[3, 3], [4, 3]])),
    casa: malha(4, 4, ret(1, 1, 2, 2), [[1, 0, 'id'], [2, 0, 'ie']]),
  };

  window.DEJAIR_CONTEUDO.push({
    id: 'matematica', nome: 'Matemática', icone: '🧮', cor: '#7655D8',
    unidade: 'Números, operações, medidas e geometria',
    desc: 'Do sistema de numeração às frações, decimais e porcentagem, passando por tempo, gráficos, área, ângulos e figuras geométricas.',
    topicos: [

      /* ------------------------------------------------------------ 1 */
      {
        id: 'numeracao', icone: '🔢', nome: 'Sistema de numeração decimal',
        intro: 'Com só dez algarismos dá para escrever qualquer número, do zero até a quantidade de pelos que eu solto no sofá. O segredo está no lugar que cada algarismo ocupa!',
        resumo: [
          { t: 'Dez algarismos, infinitos números', c: 'Nosso sistema usa <b>dez algarismos</b>: 0, 1, 2, 3, 4, 5, 6, 7, 8 e 9. Ele é <b>decimal</b> porque agrupa de <b>10 em 10</b>: 10 unidades formam 1 dezena, 10 dezenas formam 1 centena, 10 centenas formam 1 unidade de milhar.' },
          { t: 'Ordens e classes', c: 'Cada algarismo ocupa uma <b>ordem</b>. De três em três, as ordens formam <b>classes</b>.<br>Em <b>345.728</b>: na classe dos <b>milhares</b>, 3 centenas de milhar, 4 dezenas de milhar e 5 unidades de milhar; na classe das <b>unidades simples</b>, 7 centenas, 2 dezenas e 8 unidades. Depois vem a classe dos <b>milhões</b>.' },
          { t: 'Valor posicional', c: 'O mesmo algarismo vale mais ou menos conforme a <b>posição</b>. Em <b>5.252</b>, o primeiro 5 vale <b>5.000</b> e o segundo vale <b>50</b>. O <b>zero</b> guarda o lugar de uma ordem vazia: em 3.047, o algarismo das centenas é 0.' },
          { t: 'Decompor e ler', c: '<b>Decompor</b> é escrever o número como a soma dos valores de cada algarismo:<br>46.309 = 40.000 + 6.000 + 300 + 9.<br>Lê-se: <b>quarenta e seis mil, trezentos e nove</b>.' },
          { t: 'Comparar e arredondar', c: 'Para <b>comparar</b>, veja primeiro quem tem <b>mais algarismos</b>: 23.410 é maior que 9.987. Se empatar, compare da esquerda para a direita: 23.410 é maior que 23.140.<br>Para <b>arredondar</b> à centena mais próxima, olhe o algarismo das dezenas: de 5 para cima, sobe. 3.4<b>8</b>0 vira 3.500; 3.4<b>2</b>0 vira 3.400.' },
        ],
        q: [
          { n: 1, t: 'mc', p: 'Quantos algarismos diferentes existem no sistema de numeração decimal?', o: ['10', '9', '100', '12'], e: 'São dez: 0, 1, 2, 3, 4, 5, 6, 7, 8 e 9. Com eles escrevemos todos os números, mudando só a posição de cada um.' },
          { n: 1, t: 'mc', p: 'Qual é o valor do algarismo 7 no número 4.735?', o: ['700', '7', '70', '7.000'], e: 'O 7 está na ordem das centenas, então vale 7 × 100 = 700. Decompondo: 4.000 + 700 + 30 + 5.' },
          { n: 1, t: 'vf', p: 'Dez dezenas formam uma centena.', r: true, e: 'O sistema agrupa de 10 em 10: 10 unidades formam 1 dezena, e 10 dezenas (10 × 10 = 100) formam 1 centena.' },
          { n: 1, t: 'mc', p: 'Como se escreve com algarismos o número "doze mil e quarenta e cinco"?', o: ['12.045', '12.450', '1.245', '120.045'], e: 'Doze mil = 12.000. Quarenta e cinco = 45. Como não sobra nenhuma centena, o zero guarda o lugar dela: 12.045.' },
          { n: 2, t: 'mc', p: 'Qual é a decomposição do número 58.206?', o: ['50.000 + 8.000 + 200 + 6', '50.000 + 800 + 20 + 6', '5.000 + 800 + 20 + 6', '58.000 + 2.000 + 6'], e: 'Cada algarismo vale conforme a posição: 5 dezenas de milhar, 8 unidades de milhar, 2 centenas, nenhuma dezena e 6 unidades.' },
          { n: 2, t: 'lac', p: 'No número 381.459, o algarismo 8 ocupa a ordem das ___ de milhar.', o: ['dezenas', 'unidades', 'centenas'], e: 'Na classe dos milhares de 381.459, o 3 é a centena de milhar, o 8 é a dezena de milhar e o 1 é a unidade de milhar.' },
          { n: 2, t: 'ord', p: 'Coloque os números em ordem crescente (do menor para o maior).', o: ['9.870', '10.099', '10.909', '19.009'], e: '9.870 tem só quatro algarismos, então é o menor. Entre os de cinco algarismos, compare da esquerda para a direita.' },
          { n: 2, t: 'vf', p: 'No número 6.060, os dois algarismos 6 têm o mesmo valor.', r: false, e: 'O primeiro 6 está na unidade de milhar e vale 6.000. O segundo está na dezena e vale 60. A posição muda o valor.' },
          { n: 2, t: 'mc', p: 'Qual é o maior destes números?', o: ['101.010', '99.999', '100.101', '100.999'], e: '99.999 tem cinco algarismos; os outros, seis. Entre eles, 101.010 é o maior, porque tem 1 na unidade de milhar e os outros têm 0.' },
          { n: 2, t: 'par', p: 'Ligue cada número ao valor que o algarismo 3 tem nele.', o: [['3.508', '3.000'], ['1.350', '300'], ['4.631', '30'], ['7.203', '3']], e: 'O valor do 3 depende de onde ele está: na unidade de milhar vale 3.000; na centena, 300; na dezena, 30; na unidade, 3.' },
          { n: 3, t: 'mc', p: 'Arredonde 47.862 para a unidade de milhar mais próxima.', o: ['48.000', '47.000', '47.900', '50.000'], e: 'Olhe o algarismo das centenas: é 8. De 5 para cima, arredonda-se para cima. Então 47.862 fica mais perto de 48.000.' },
          { n: 3, t: 'mc', p: 'Um número tem 3 unidades de milhar, 5 dezenas e 2 unidades. Que número é esse?', o: ['3.052', '3.502', '352', '3.520'], e: '3.000 + 50 + 2 = 3.052. Na ordem das centenas não há nada, então o zero ocupa esse lugar.' },
          { n: 3, t: 'mc', p: 'Quantas dezenas inteiras há, ao todo, no número 1.250?', o: ['125', '5', '25', '1.250'], e: '1.250 ÷ 10 = 125. O algarismo que está na ordem das dezenas é o 5, mas o número inteiro contém 125 dezenas.' },
        ],
      },

      /* ------------------------------------------------------------ 2 */
      {
        id: 'operacoes', icone: '➕', nome: 'As quatro operações',
        intro: 'Somar sardinhas, tirar sardinhas, multiplicar sardinhas e, a parte mais difícil para mim, dividir sardinhas. As quatro operações são as ferramentas de todo o resto!',
        resumo: [
          { t: 'Adição e subtração', c: 'A <b>adição</b> junta ou acrescenta: 1.250 + 375 = 1.625. Os números somados são as <b>parcelas</b>; o resultado é a <b>soma</b> (ou total).<br>A <b>subtração</b> tira, compara ou completa: 1.625 − 375 = 1.250. O resultado é a <b>diferença</b> (ou resto).' },
          { t: 'Multiplicação', c: 'A <b>multiplicação</b> é uma soma de parcelas iguais: 4 × 25 = 25 + 25 + 25 + 25 = 100. Os números multiplicados são os <b>fatores</b>; o resultado é o <b>produto</b>.<br>Truque para números sem vírgula: multiplicar por <b>10</b>, <b>100</b> ou <b>1.000</b> é acrescentar 1, 2 ou 3 zeros: 37 × 100 = 3.700.' },
          { t: 'Divisão', c: 'A <b>divisão</b> reparte em partes iguais ou descobre quantas vezes um número cabe em outro.<br>47 ÷ 5 = <b>9</b> e sobram <b>2</b>.<br>47 é o <b>dividendo</b>, 5 é o <b>divisor</b>, 9 é o <b>quociente</b> e 2 é o <b>resto</b>. O resto é sempre <b>menor que o divisor</b>. Com resto zero, a divisão é <b>exata</b>.' },
          { t: 'Operações inversas', c: 'Adição e subtração se desfazem: se 320 + 180 = 500, então 500 − 180 = 320.<br>Multiplicação e divisão também: se 12 × 8 = 96, então 96 ÷ 8 = 12.<br>Use a operação inversa para <b>conferir</b> a conta.' },
          { t: 'Conferindo a divisão', c: '<b>quociente × divisor + resto = dividendo</b><br>47 ÷ 5 = 9, resto 2.<br>Conferindo: 9 × 5 + 2 = 45 + 2 = 47. Deu certo!' },
        ],
        q: [
          { n: 1, t: 'mc', p: 'Quanto é 2.450 + 1.380?', o: ['3.830', '3.730', '3.380', '4.830'], e: 'Unidades: 0 + 0 = 0. Dezenas: 5 + 8 = 13, fica 3 e sobe 1. Centenas: 4 + 3 + 1 = 8. Milhares: 2 + 1 = 3. Resultado: 3.830.' },
          { n: 1, t: 'mc', p: 'Quanto é 7 × 8?', o: ['56', '54', '63', '48'], e: '7 × 8 = 56. Um truque para lembrar: 5, 6, 7, 8 (cinquenta e seis é sete vezes oito).' },
          { n: 1, t: 'vf', p: 'O resultado de uma multiplicação se chama produto.', r: true, e: 'Na multiplicação, os números multiplicados são os fatores e o resultado é o produto. Em 4 × 25 = 100, o produto é 100.' },
          { n: 1, t: 'mc', p: 'Quanto é 1.000 − 365?', o: ['635', '745', '645', '735'], e: 'Complete aos poucos: de 365 a 400 faltam 35; de 400 a 1.000 faltam 600. Então 35 + 600 = 635.' },
          { n: 1, t: 'mc', p: 'Quanto é 45 × 100?', o: ['4.500', '450', '45.000', '4.050'], e: 'Em um número sem vírgula, multiplicar por 100 é acrescentar dois zeros: 45 vira 4.500.' },
          { n: 2, t: 'mc', p: 'Quanto é 236 × 4?', o: ['944', '924', '844', '964'], e: 'Por partes: 200 × 4 = 800, 30 × 4 = 120 e 6 × 4 = 24. Somando: 800 + 120 + 24 = 944.' },
          { n: 2, t: 'mc', p: 'Na divisão 59 ÷ 6, quais são o quociente e o resto?', o: ['Quociente 9 e resto 5', 'Quociente 9 e resto 6', 'Quociente 8 e resto 11', 'Quociente 10 e resto 1'], e: '6 × 9 = 54, e de 54 até 59 faltam 5. O resto precisa ser menor que o divisor: resto 11 significa que ainda dá para dividir.' },
          { n: 2, t: 'lac', p: 'Em 84 ÷ 7 = 12, o número 84 é o ___.', o: ['dividendo', 'divisor', 'quociente'], e: 'O dividendo é o número que está sendo dividido (84). O divisor é o 7 e o quociente é o resultado, 12.' },
          { n: 2, t: 'par', p: 'Ligue cada operação ao nome do seu resultado.', o: [['Adição', 'Soma'], ['Subtração', 'Diferença'], ['Multiplicação', 'Produto'], ['Divisão', 'Quociente']], e: 'Adição dá soma, subtração dá diferença, multiplicação dá produto e divisão dá quociente (e, às vezes, resto).' },
          { n: 2, t: 'vf', p: 'Em uma divisão, o resto pode ser maior que o divisor.', r: false, e: 'O resto é sempre menor que o divisor. Se sobrar mais do que o divisor, ainda cabe mais uma vez e o quociente aumenta.' },
          { n: 2, t: 'mc', p: 'Quanto é 5.004 − 1.876?', o: ['3.128', '3.138', '4.128', '3.228'], e: 'Confira pela operação inversa: 3.128 + 1.876 = 5.004. Nas contas com zeros no meio, capriche nas trocas.' },
          { n: 3, t: 'mc', p: 'Quanto é 35 × 24?', o: ['840', '700', '820', '210'], e: 'Decomponha o 24: 35 × 20 = 700 e 35 × 4 = 140. Somando: 700 + 140 = 840.' },
          { n: 3, t: 'mc', p: 'Quanto é 1.536 ÷ 12?', o: ['128', '118', '138', '126'], e: 'Confira multiplicando: 128 × 12 = 1.280 + 256 = 1.536. A divisão é exata, com resto zero.' },
          { n: 3, t: 'mc', p: 'Qual conta serve para conferir se 96 ÷ 8 = 12 está certa?', o: ['12 × 8', '96 − 8', '96 + 12', '12 − 8'], e: 'Multiplicação e divisão são operações inversas. Se 12 × 8 der 96, a divisão está certa. E dá!' },
          { n: 3, t: 'mc', p: 'Em uma divisão, o divisor é 9, o quociente é 14 e o resto é 4. Qual é o dividendo?', o: ['130', '126', '122', '27'], e: 'Dividendo = quociente × divisor + resto. Então 14 × 9 = 126, e 126 + 4 = 130.' },
        ],
      },

      /* ------------------------------------------------------------ 3 */
      {
        id: 'problemas', icone: '🧩', nome: 'Situações-problema',
        intro: 'Problema de Matemática é uma historinha com uma pergunta escondida. O truque é ler com calma e descobrir qual conta a história está pedindo. Eu leio duas vezes, e olha que sou um gato!',
        resumo: [
          { t: 'Os quatro passos', c: '<b>1. Leia</b> o problema inteiro e descubra a pergunta.<br><b>2. Separe os dados</b>: o que o problema informa?<br><b>3. Escolha a operação</b> e faça a conta.<br><b>4. Confira</b>: a resposta faz sentido? Ela responde à pergunta?' },
          { t: 'Palavras que dão pista', c: '<b>Adição</b>: juntar, ganhar, ao todo, total.<br><b>Subtração</b>: gastar, perder, quanto falta, quanto a mais, diferença, troco.<br><b>Multiplicação</b>: vezes, o dobro, o triplo, tantos em cada.<br><b>Divisão</b>: repartir igualmente, quantos cabem, metade.' },
          { t: 'Problemas de duas etapas', c: 'Alguns problemas pedem <b>mais de uma conta</b>. Exemplo: comprei 3 cadernos de R$ 12 e paguei com R$ 50. Qual é o troco?<br>1ª conta: 3 × 12 = 36.<br>2ª conta: 50 − 36 = <b>14 reais</b>.' },
          { t: 'O que fazer com o resto', c: 'Na divisão, pense no que o <b>resto</b> significa. 26 alunos em carros de 4 lugares: 26 ÷ 4 = 6 e sobram 2. Esses 2 também precisam de carro, então são <b>7 carros</b>.' },
          { t: 'Cuidado com as armadilhas', c: 'Nem todo número do problema entra na conta: às vezes há <b>dados que sobram</b>. E a pista nem sempre é o que parece: em "João tem 12 figurinhas, <b>5 a mais</b> que Ana", para achar as de Ana a conta é de <b>subtração</b>: 12 − 5 = 7.' },
        ],
        q: [
          { n: 1, t: 'mc', p: 'Lia tinha 248 figurinhas e ganhou 75. Com quantas ficou?', o: ['323', '313', '173', '333'], e: 'Ganhar é acrescentar: 248 + 75. Somando por partes, 248 + 70 = 318 e 318 + 5 = 323.' },
          { n: 1, t: 'mc', p: 'Uma caixa tem 12 lápis. Quantos lápis há em 6 caixas iguais?', o: ['72', '18', '62', '66'], e: 'São 6 grupos de 12, então é multiplicação: 6 × 12 = 72. Somar 12 + 6 juntaria caixas com lápis, o que não faz sentido.' },
          { n: 1, t: 'mc', p: 'Pedro tinha R$ 50 e gastou R$ 32. Com quanto ficou?', o: ['R$ 18', 'R$ 28', 'R$ 82', 'R$ 22'], e: 'Gastar é tirar: 50 − 32 = 18. Para conferir, some de volta: 18 + 32 = 50.' },
          { n: 1, t: 'vf', p: 'Para repartir 40 balas igualmente entre 8 crianças, usamos a divisão.', r: true, e: 'Repartir em partes iguais é dividir: 40 ÷ 8 = 5. Cada criança recebe 5 balas.' },
          { n: 2, t: 'mc', p: 'Comprei 3 cadernos de R$ 14 cada e paguei com uma nota de R$ 50. Quanto recebi de troco?', o: ['R$ 8', 'R$ 36', 'R$ 42', 'R$ 18'], e: 'São duas etapas. Primeiro o gasto: 3 × 14 = 42. Depois o troco: 50 − 42 = 8 reais.' },
          { n: 2, t: 'mc', p: 'Um ônibus leva 42 passageiros por viagem. Quantos passageiros ele leva em 15 viagens?', o: ['630', '57', '420', '610'], e: '15 viagens de 42 passageiros: 42 × 15. Por partes, 42 × 10 = 420 e 42 × 5 = 210. Total: 630.' },
          { n: 2, t: 'mc', p: 'Dona Rosa repartiu 96 bombons igualmente em 8 saquinhos. Quantos bombons ficaram em cada saquinho?', o: ['12', '8', '88', '14'], e: 'Repartir igualmente é dividir: 96 ÷ 8 = 12. Conferindo: 12 × 8 = 96.' },
          { n: 2, t: 'lac', p: 'No problema "Quantos reais faltam para Ana comprar a bicicleta?", a operação usada é a ___.', o: ['subtração', 'adição', 'multiplicação'], e: '"Quanto falta" pede uma subtração: o preço da bicicleta menos o que Ana já tem.' },
          { n: 2, t: 'par', p: 'Ligue cada expressão à operação que ela costuma indicar.', o: [['Ao todo', 'Adição'], ['Troco', 'Subtração'], ['O triplo', 'Multiplicação'], ['Repartir igualmente', 'Divisão']], e: 'As palavras dão pistas, mas leia sempre a história inteira: o que decide a operação é o que acontece no problema.' },
          { n: 2, t: 'vf', p: 'Todos os números que aparecem no enunciado de um problema precisam entrar na conta.', r: false, e: 'Alguns problemas trazem dados que não servem para a pergunta. Por isso é importante separar só o que interessa.' },
          { n: 3, t: 'mc', p: 'Uma escola vai levar 130 alunos a um passeio em vans de 15 lugares. Quantas vans são necessárias, no mínimo?', o: ['9', '8', '10', '15'], e: '130 ÷ 15 = 8 e sobram 10 alunos. Esses 10 também precisam ir, então é preciso mais uma van: 9 ao todo.' },
          { n: 3, t: 'mc', p: 'João tem 36 anos, o triplo da idade de Bia. Quantos anos Bia tem?', o: ['12', '108', '33', '39'], e: 'Se a idade de João é 3 vezes a de Bia, para achar a de Bia fazemos o caminho inverso: 36 ÷ 3 = 12.' },
          { n: 3, t: 'mc', p: 'Um cinema tem 18 fileiras com 24 poltronas cada. Em uma sessão, 57 poltronas ficaram vazias. Quantas pessoas assistiram ao filme?', o: ['375', '432', '489', '385'], e: 'Total de poltronas: 18 × 24 = 432. Tirando as vazias: 432 − 57 = 375 pessoas.' },
          { n: 3, t: 'ord', p: 'Coloque em ordem os passos para resolver um problema.', o: ['Ler e achar a pergunta', 'Separar os dados', 'Escolher a operação e calcular', 'Conferir a resposta'], e: 'Sem entender a pergunta, não dá para escolher a conta. E conferir no final evita respostas que não fazem sentido.' },
          { n: 3, t: 'mc', p: 'Caio tem 45 bolinhas, 18 a mais que Léo. Quantas bolinhas os dois têm juntos?', o: ['72', '63', '27', '108'], e: 'Se Caio tem 18 a mais, Léo tem 45 − 18 = 27. Juntos: 45 + 27 = 72. Cuidado: "a mais" aqui levou a uma subtração!' },
        ],
      },

      /* ------------------------------------------------------------ 4 */
      {
        id: 'expressoes', icone: '🔣', nome: 'Expressões numéricas',
        intro: 'Em uma expressão numérica, quem resolve primeiro não é quem está na frente: tem ordem certa, igual à fila do pote de ração lá em casa. Aprendeu a ordem, acertou a conta!',
        resumo: [
          { t: 'O que é', c: 'Uma <b>expressão numérica</b> é uma sequência de números ligados por operações: 8 + 2 × 5. Para todo mundo chegar ao <b>mesmo resultado</b>, existe uma <b>ordem</b> para resolver.' },
          { t: 'A ordem das operações', c: '<b>1º</b> Multiplicações e divisões, na ordem em que aparecem (da esquerda para a direita).<br><b>2º</b> Adições e subtrações, na ordem em que aparecem.<br>8 + 2 × 5 = 8 + 10 = <b>18</b> (e não 50!).' },
          { t: 'Parênteses primeiro', c: 'Se houver <b>parênteses ( )</b>, resolva antes o que está dentro deles.<br>(8 + 2) × 5 = 10 × 5 = <b>50</b>.<br>Os parênteses mudam o resultado! Se aparecerem <b>colchetes [ ]</b> e <b>chaves { }</b>, a ordem é: primeiro ( ), depois [ ], por último { }.' },
          { t: 'Passo a passo', c: 'Resolva uma etapa por linha e copie o resto:<br>30 − (4 + 2) × 3<br>= 30 − 6 × 3<br>= 30 − 18<br>= <b>12</b>' },
          { t: 'Da história para a expressão', c: 'Um problema pode virar uma expressão. "Comprei 3 canetas de R$ 4 e 1 caderno de R$ 15":<br>3 × 4 + 15 = 12 + 15 = <b>27 reais</b>.' },
        ],
        q: [
          { n: 1, t: 'mc', p: 'Quanto é 5 + 3 × 2?', o: ['11', '16', '13', '10'], e: 'A multiplicação vem antes da adição: 3 × 2 = 6, e depois 5 + 6 = 11. Quem soma primeiro chega a 16, que está errado.' },
          { n: 1, t: 'mc', p: 'Na expressão 20 − 4 × 3, qual operação deve ser feita primeiro?', o: ['4 × 3', '20 − 4', '20 − 3', '3 − 20'], e: 'Sem parênteses, a multiplicação é resolvida antes da subtração: 4 × 3 = 12, e depois 20 − 12 = 8.' },
          { n: 1, t: 'vf', p: 'Em uma expressão numérica, o que está dentro dos parênteses é resolvido primeiro.', r: true, e: 'Os parênteses têm prioridade sobre tudo. Só depois vêm as multiplicações e divisões e, por fim, as adições e subtrações.' },
          { n: 1, t: 'mc', p: 'Quanto é (6 + 4) × 3?', o: ['30', '18', '22', '13'], e: 'Primeiro os parênteses: 6 + 4 = 10. Depois a multiplicação: 10 × 3 = 30.' },
          { n: 2, t: 'mc', p: 'Quanto é 40 − 12 ÷ 4 + 5?', o: ['42', '12', '32', '38'], e: 'Primeiro a divisão: 12 ÷ 4 = 3. Depois, da esquerda para a direita: 40 − 3 = 37 e 37 + 5 = 42.' },
          { n: 2, t: 'mc', p: 'Quanto é 18 ÷ 3 × 2?', o: ['12', '3', '9', '6'], e: 'Divisão e multiplicação têm a mesma prioridade: resolva na ordem em que aparecem. 18 ÷ 3 = 6, e 6 × 2 = 12.' },
          { n: 2, t: 'lac', p: 'Sem parênteses, as multiplicações e as ___ são resolvidas antes das adições e das subtrações.', o: ['divisões', 'somas', 'diferenças'], e: 'Multiplicações e divisões vêm primeiro, na ordem em que aparecem. Depois, as adições e as subtrações.' },
          { n: 2, t: 'ord', p: 'Coloque em ordem as etapas para resolver 50 − (3 + 2) × 4.', o: ['Resolver 3 + 2', 'Multiplicar 5 × 4', 'Subtrair 50 − 20', 'Chegar ao resultado 30'], e: 'Parênteses primeiro (3 + 2 = 5), depois a multiplicação (5 × 4 = 20) e, por último, a subtração (50 − 20 = 30).' },
          { n: 2, t: 'vf', p: 'As expressões 2 + 3 × 4 e (2 + 3) × 4 têm o mesmo resultado.', r: false, e: 'Sem parênteses: 2 + 12 = 14. Com parênteses: 5 × 4 = 20. Os parênteses mudam a ordem e, com ela, o resultado.' },
          { n: 2, t: 'mc', p: 'Quanto é 7 × 5 − 4 × 6?', o: ['11', '186', '31', '59'], e: 'Primeiro as duas multiplicações: 7 × 5 = 35 e 4 × 6 = 24. Depois a subtração: 35 − 24 = 11.' },
          { n: 3, t: 'mc', p: 'Quanto é 100 − (25 + 15) ÷ 8 × 3?', o: ['85', '15', '45', '22'], e: 'Parênteses: 25 + 15 = 40. Depois, na ordem: 40 ÷ 8 = 5 e 5 × 3 = 15. Por fim: 100 − 15 = 85.' },
          { n: 3, t: 'mc', p: 'Comprei 4 sucos de R$ 6 e 2 salgados de R$ 9. Qual expressão calcula o total gasto?', o: ['4 × 6 + 2 × 9', '(4 + 6) × (2 + 9)', '4 + 6 + 2 + 9', '4 × 6 × 2 × 9'], e: 'Os sucos custam 4 × 6 e os salgados, 2 × 9. O total é a soma dos dois: 24 + 18 = 42 reais.' },
          { n: 3, t: 'mc', p: 'Onde colocar parênteses em 6 + 2 × 5 − 1 para o resultado ser 39?', o: ['(6 + 2) × 5 − 1', '6 + (2 × 5) − 1', '6 + 2 × (5 − 1)', '6 + (2 × 5 − 1)'], e: 'Com (6 + 2) primeiro: 8 × 5 = 40, e 40 − 1 = 39. Nas outras opções o resultado é 15 ou 14.' },
          { n: 3, t: 'mc', p: 'Quanto é [20 − (2 + 4) × 3] × 5?', o: ['10', '210', '70', '90'], e: 'Parênteses: 2 + 4 = 6. Dentro dos colchetes: 6 × 3 = 18 e 20 − 18 = 2. Por fim: 2 × 5 = 10.' },
        ],
      },

      /* ------------------------------------------------------------ 5 */
      {
        id: 'fracoes', icone: '🍕', nome: 'Frações',
        intro: 'Dividir uma pizza em partes iguais e ficar com algumas delas: isso é fração! Eu sempre quero a pizza de sardinha inteira, mas a Professora Clara diz que tenho de repartir.',
        resumo: [
          { t: 'Partes de um inteiro', c: `Uma <b>fração</b> representa <b>partes iguais</b> de um inteiro. Em ${fr(3, 4)}, o <b>denominador</b> (4, embaixo) diz em quantas partes iguais o inteiro foi dividido, e o <b>numerador</b> (3, em cima) diz quantas dessas partes foram consideradas.` },
          { t: 'Como se lê', c: `${fr(1, 2)} um meio (metade) · ${fr(1, 3)} um terço · ${fr(1, 4)} um quarto · ${fr(2, 5)} dois quintos · ${fr(7, 10)} sete décimos · ${fr(3, 100)} três centésimos.<br>Com denominador maior que 10 (fora 100 e 1.000), usa-se <b>avos</b>: ${fr(5, 12)} é cinco doze avos.` },
          { t: 'Tipos de fração', c: `<b>Própria</b>: numerador menor que o denominador; vale menos que 1 inteiro (${fr(3, 4)}).<br><b>Imprópria</b>: numerador maior ou igual ao denominador; vale 1 inteiro ou mais (${fr(5, 4)}).<br><b>Aparente</b>: é um número inteiro disfarçado (${fr(8, 4)} = 2).<br><b>Número misto</b>: inteiro e fração juntos (${fr(5, 4)} = 1 ${fr(1, 4)}).` },
          { t: 'Frações equivalentes', c: `Frações <b>equivalentes</b> representam a <b>mesma quantidade</b>: ${fr(1, 2)} = ${fr(2, 4)} = ${fr(4, 8)}. Para achar uma, <b>multiplique ou divida</b> o numerador e o denominador pelo <b>mesmo número</b>. Dividir até não dar mais é <b>simplificar</b>: ${fr(6, 8)} = ${fr(3, 4)}.` },
          { t: 'Comparar, somar e fração de quantidade', c: `Com <b>denominadores iguais</b>, olhe só os numeradores: ${fr(3, 8)} é menor que ${fr(5, 8)}, e ${fr(3, 8)} + ${fr(2, 8)} = ${fr(5, 8)}.<br><b>Fração de uma quantidade</b>: divida pelo denominador e multiplique pelo numerador. ${fr(2, 3)} de 12: 12 ÷ 3 = 4, e 4 × 2 = <b>8</b>.<br>Denominadores diferentes? Troque por frações <b>equivalentes</b> de mesmo denominador.` },
        ],
        q: [
          { n: 1, t: 'mc', x: barra(3, 8), p: 'Que fração da figura está pintada?', o: [fr(3, 8), fr(5, 8), fr(3, 5), fr(8, 3)], e: 'A figura foi dividida em 8 partes iguais (denominador) e 3 delas estão pintadas (numerador): três oitavos.' },
          { n: 1, t: 'mc', p: `Na fração ${fr(2, 5)}, o número 5 é chamado de:`, o: ['denominador', 'numerador', 'quociente', 'inteiro'], e: 'O denominador fica embaixo e diz em quantas partes iguais o inteiro foi dividido. O numerador fica em cima.' },
          { n: 1, t: 'vf', p: `A fração ${fr(1, 2)} representa a metade de um inteiro.`, r: true, e: 'Um meio: o inteiro foi dividido em 2 partes iguais e consideramos 1 delas. É a metade.' },
          { n: 1, t: 'mc', p: `Como se lê a fração ${fr(3, 4)}?`, o: ['Três quartos', 'Três quatro avos', 'Quatro terços', 'Três e quatro'], e: 'Denominador 4 lê-se "quartos". A palavra "avos" só aparece com denominadores maiores que 10 (fora 100 e 1.000), como em cinco doze avos.' },
          { n: 1, t: 'mc', p: 'Uma pizza foi cortada em 8 fatias iguais e Lia comeu 3. Que fração da pizza ela comeu?', o: [fr(3, 8), fr(8, 3), fr(3, 5), fr(5, 8)], e: 'O total de fatias (8) é o denominador. As fatias comidas (3) são o numerador. Cinco oitavos é o que sobrou.' },
          { n: 2, t: 'mc', p: `Qual fração é equivalente a ${fr(1, 2)}?`, o: [fr(4, 8), fr(2, 3), fr(1, 4), fr(3, 5)], e: 'Multiplicando o numerador e o denominador de um meio por 4, chegamos a quatro oitavos. As duas representam a metade.' },
          { n: 2, t: 'mc', p: `Quanto é ${fr(2, 3)} de 18?`, o: ['12', '6', '9', '27'], e: 'Divida pelo denominador: 18 ÷ 3 = 6 (isso é um terço). Multiplique pelo numerador: 6 × 2 = 12.' },
          { n: 2, t: 'lac', p: `Uma fração com o numerador maior que o denominador, como ${fr(7, 4)}, é chamada de fração ___.`, o: ['imprópria', 'própria', 'aparente'], e: 'Na fração imprópria, o numerador é maior ou igual ao denominador. Ela vale 1 inteiro ou mais: sete quartos são 1 inteiro e três quartos.' },
          { n: 2, t: 'mc', p: 'Qual é a maior destas frações?', o: [fr(5, 8), fr(3, 8), fr(1, 8), fr(4, 8)], e: 'Todas têm denominador 8, ou seja, as partes são do mesmo tamanho. Ganha quem tem mais partes: cinco oitavos.' },
          { n: 2, t: 'vf', p: `Na fração ${fr(3, 7)}, o inteiro foi dividido em 3 partes iguais.`, r: false, e: 'Quem diz em quantas partes o inteiro foi dividido é o denominador: 7. O numerador 3 diz quantas partes foram consideradas.' },
          { n: 2, t: 'mc', p: `Quanto é ${fr(2, 7)} + ${fr(3, 7)}?`, o: [fr(5, 7), fr(5, 14), fr(6, 7), fr(1, 7)], e: 'Com denominadores iguais, some só os numeradores e mantenha o denominador: 2 + 3 = 5, então cinco sétimos.' },
          { n: 2, t: 'par', p: 'Ligue cada fração ao modo de ler.', o: [[fr(1, 3), 'Um terço'], [fr(2, 5), 'Dois quintos'], [fr(7, 10), 'Sete décimos'], [fr(5, 12), 'Cinco doze avos']], e: 'Denominador 3: terços. Denominador 5: quintos. Denominador 10: décimos. Acima de 10 (fora 100 e 1.000), usa-se o número seguido de "avos".' },
          { n: 3, t: 'mc', p: `Qual é a fração ${fr(12, 18)} simplificada até não dar mais para dividir?`, o: [fr(2, 3), fr(6, 9), fr(4, 6), fr(3, 4)], e: 'Dividindo 12 e 18 por 6, chegamos a dois terços. Seis nonos e quatro sextos são equivalentes, mas ainda dá para simplificar.' },
          { n: 3, t: 'mc', p: `A fração imprópria ${fr(7, 3)} corresponde a qual número misto?`, o: [`2 ${fr(1, 3)}`, `1 ${fr(1, 3)}`, `3 ${fr(1, 7)}`, `2 ${fr(2, 3)}`], e: '7 ÷ 3 = 2 e sobra 1. Então sete terços são 2 inteiros e mais um terço.' },
          { n: 3, t: 'mc', p: `Em uma turma de 30 alunos, ${fr(2, 5)} vão à escola a pé. Quantos alunos vão a pé?`, o: ['12', '6', '15', '18'], e: 'Um quinto de 30 é 30 ÷ 5 = 6. Dois quintos são 2 × 6 = 12 alunos.' },
          { n: 3, t: 'mc', p: `Quanto é ${fr(1, 2)} + ${fr(1, 4)}?`, o: [fr(3, 4), fr(2, 6), fr(2, 4), fr(1, 6)], e: 'Os denominadores são diferentes, então troque um meio pela equivalente dois quartos. Aí é só somar: dois quartos mais um quarto são três quartos.' },
        ],
      },

      /* ------------------------------------------------------------ 6 */
      {
        id: 'decimais', icone: '💰', nome: 'Números decimais',
        intro: 'R$ 3,50, 1,75 m, 0,5 kg... Tem vírgula em todo canto! Ela separa a parte inteira dos pedacinhos. Eu, por exemplo, peso 4,8 kg (boa parte é pelo).',
        resumo: [
          { t: 'Para que serve a vírgula', c: 'Nos <b>números decimais</b>, a <b>vírgula</b> separa a <b>parte inteira</b> (à esquerda) da <b>parte decimal</b> (à direita). Em <b>3,75</b>: 3 inteiros, 7 décimos e 5 centésimos.' },
          { t: 'Décimos, centésimos e milésimos', c: `<b>1 décimo</b> = 0,1 = ${fr(1, 10)} (o inteiro dividido em 10).<br><b>1 centésimo</b> = 0,01 = ${fr(1, 100)} (dividido em 100).<br><b>1 milésimo</b> = 0,001 = ${fr(1, '1.000')} (dividido em 1.000).<br>Lê-se: 0,7 = sete décimos; 2,35 = dois inteiros e trinta e cinco centésimos.` },
          { t: 'Comparar decimais', c: 'Compare primeiro a <b>parte inteira</b>. Se empatar, compare os <b>décimos</b>, depois os <b>centésimos</b>. Dica: iguale as casas com zeros. Como 0,5 = 0,50, então <b>0,5 é maior que 0,35</b>. Zeros no fim não mudam o valor: 2,4 = 2,40.' },
          { t: 'Somar e subtrair', c: 'Arme a conta com <b>vírgula embaixo de vírgula</b> e complete com zeros.<br>3,5 + 1,25 → 3,50 + 1,25 = <b>4,75</b>.<br>5 − 1,3 → 5,0 − 1,3 = <b>3,7</b>.' },
          { t: 'Vezes e dividido por 10, 100 e 1.000', c: '<b>Multiplicar</b>: a vírgula anda para a <b>direita</b> (1 casa para 10, 2 para 100, 3 para 1.000). 2,45 × 10 = 24,5.<br><b>Dividir</b>: a vírgula anda para a <b>esquerda</b>. 37 ÷ 10 = 3,7.<br>No dinheiro: R$ 0,25 são 25 centavos.' },
        ],
        q: [
          { n: 1, t: 'mc', p: 'No número 4,7, o algarismo 7 representa:', o: ['7 décimos', '7 inteiros', '7 centésimos', '7 dezenas'], e: 'A primeira casa depois da vírgula é a dos décimos. Então 4,7 são 4 inteiros e 7 décimos.' },
          { n: 1, t: 'mc', p: 'Como se escreve "dois inteiros e cinco décimos"?', o: ['2,5', '2,05', '25', '0,25'], e: 'A parte inteira (2) fica antes da vírgula e os décimos (5), logo depois dela: 2,5. Já 2,05 são dois inteiros e cinco centésimos.' },
          { n: 1, t: 'vf', p: 'Os números 3,2 e 3,20 têm o mesmo valor.', r: true, e: 'Zeros no fim da parte decimal não mudam o valor: 2 décimos são o mesmo que 20 centésimos.' },
          { n: 1, t: 'mc', p: `Qual número decimal corresponde à fração ${fr(1, 10)}?`, o: ['0,1', '0,01', '1,0', '10,0'], e: 'Um décimo é o inteiro dividido em 10 partes iguais. Escreve-se 0,1: zero inteiro e um décimo.' },
          { n: 1, t: 'mc', p: 'Quanto é 1,5 + 2,3?', o: ['3,8', '3,5', '4,8', '38'], e: 'Some décimos com décimos (5 + 3 = 8) e inteiros com inteiros (1 + 2 = 3). Resultado: 3,8.' },
          { n: 2, t: 'mc', p: 'Qual é o maior destes números?', o: ['0,5', '0,35', '0,09', '0,499'], e: 'Compare os décimos: 0,5 tem 5 décimos; 0,499 tem 4; 0,35 tem 3; 0,09 não tem nenhum. Ter mais casas depois da vírgula não quer dizer ser maior.' },
          { n: 2, t: 'mc', p: 'Quanto é 3,5 + 1,25?', o: ['4,75', '4,30', '1,60', '4,25'], e: 'Vírgula embaixo de vírgula, completando com zero: 3,50 + 1,25 = 4,75.' },
          { n: 2, t: 'lac', p: 'Para somar números decimais, armamos a conta com vírgula embaixo de ___.', o: ['vírgula', 'unidade', 'zero'], e: 'Alinhando as vírgulas, cada ordem fica na sua coluna: inteiros com inteiros, décimos com décimos, centésimos com centésimos.' },
          { n: 2, t: 'mc', p: 'Quanto é 2,45 × 10?', o: ['24,5', '245', '2,450', '0,245'], e: 'Ao multiplicar por 10, a vírgula anda uma casa para a direita: 2,45 vira 24,5.' },
          { n: 2, t: 'ord', p: 'Coloque os números em ordem crescente (do menor para o maior).', o: ['0,08', '0,3', '0,75', '1,2'], e: 'Igualando as casas: 0,08, 0,30, 0,75 e 1,20. O único com parte inteira diferente de zero é 1,2, o maior.' },
          { n: 2, t: 'vf', p: 'O número 0,25 é maior que 0,3, porque 25 é maior que 3.', r: false, e: 'Iguale as casas: 0,3 = 0,30. Como 30 centésimos é mais que 25 centésimos, 0,3 é o maior.' },
          { n: 2, t: 'par', p: 'Ligue cada fração ao número decimal correspondente.', o: [[fr(1, 2), '0,5'], [fr(1, 4), '0,25'], [fr(3, 10), '0,3'], [fr(7, 100), '0,07']], e: 'Um meio é 0,5 e um quarto é 0,25. Três décimos escrevem-se 0,3 e sete centésimos, 0,07 (o zero guarda a casa dos décimos).' },
          { n: 3, t: 'mc', p: 'Ana comprou um suco de R$ 4,75 e pagou com uma nota de R$ 10,00. Qual foi o troco?', o: ['R$ 5,25', 'R$ 6,25', 'R$ 5,75', 'R$ 14,75'], e: '10,00 − 4,75 = 5,25. Conferindo: de 4,75 a 5,00 faltam 0,25; de 5,00 a 10,00 faltam 5,00.' },
          { n: 3, t: 'mc', p: 'Quanto é 6 − 2,35?', o: ['3,65', '4,35', '4,65', '3,75'], e: 'Escreva 6 como 6,00 e arme a conta: 6,00 − 2,35 = 3,65. Conferindo: 3,65 + 2,35 = 6,00.' },
          { n: 3, t: 'mc', p: 'Quanto é 48,6 ÷ 100?', o: ['0,486', '4,86', '4.860', '0,0486'], e: 'Ao dividir por 100, a vírgula anda duas casas para a esquerda: 48,6 vira 0,486.' },
          { n: 3, t: 'mc', p: 'Qual destes números está entre 2,4 e 2,5?', o: ['2,47', '2,7', '2,39', '2,51'], e: 'Pense em 2,40 e 2,50. Entre eles ficam 2,41, 2,42... até 2,49. Então 2,47 está entre os dois.' },
        ],
      },

      /* ------------------------------------------------------------ 7 */
      {
        id: 'porcentagem', icone: '🏷️', nome: 'Porcentagem',
        intro: 'Viu aquela placa "50% de desconto"? É a porcentagem dando as caras! O sinal % quer dizer "de cada cem". Se a ração estiver com 100% de desconto, me avisa correndo.',
        resumo: [
          { t: 'Por cento: de cada cem', c: `<b>Porcentagem</b> é uma fração de <b>denominador 100</b>. O símbolo <b>%</b> lê-se "por cento". <b>25%</b> = ${fr(25, 100)} = 0,25: são 25 partes de cada 100.` },
          { t: 'As porcentagens campeãs', c: `<b>100%</b> = o todo.<br><b>50%</b> = metade (${fr(1, 2)}): divida por 2.<br><b>25%</b> = um quarto (${fr(1, 4)}): divida por 4.<br><b>10%</b> = um décimo (${fr(1, 10)}): divida por 10.<br><b>1%</b> = um centésimo: divida por 100.` },
          { t: 'Calculando', c: '<b>10% de 80</b> = 80 ÷ 10 = 8.<br><b>20% de 80</b> = duas vezes 10% = 16.<br><b>5% de 80</b> = metade de 10% = 4.<br><b>75% de 80</b> = 50% + 25% = 40 + 20 = 60.<br>Com 10%, 25% e 50% você monta quase todas!' },
          { t: 'Desconto e acréscimo', c: '<b>Desconto</b>: calcule a porcentagem e <b>subtraia</b>. Tênis de R$ 200 com 10% de desconto: 10% de 200 = 20, e 200 − 20 = <b>R$ 180</b>.<br><b>Acréscimo</b> (aumento): calcule e <b>some</b>. R$ 200 com 10% de aumento: 200 + 20 = <b>R$ 220</b>.' },
          { t: 'Porcentagem, fração e decimal', c: `Três jeitos de escrever a mesma coisa:<br>50% = ${fr(1, 2)} = 0,5<br>25% = ${fr(1, 4)} = 0,25<br>75% = ${fr(3, 4)} = 0,75<br>10% = ${fr(1, 10)} = 0,1` },
        ],
        q: [
          { n: 1, t: 'mc', p: 'O que significa 100% de uma quantidade?', o: ['A quantidade toda', 'A metade dela', 'Cem vezes a quantidade', 'Nada dela'], e: '100% são 100 partes de cada 100, ou seja, tudo. Se você fez 100% da lição, fez a lição inteira.' },
          { n: 1, t: 'mc', p: 'Quanto é 50% de 60?', o: ['30', '50', '10', '120'], e: '50% é a metade. A metade de 60 é 60 ÷ 2 = 30.' },
          { n: 1, t: 'vf', p: 'Calcular 50% de um valor é o mesmo que achar a metade dele.', r: true, e: '50% são 50 de cada 100, e 50 é a metade de 100. Por isso, para achar 50%, basta dividir por 2.' },
          { n: 1, t: 'mc', p: 'Quanto é 10% de 90?', o: ['9', '10', '80', '900'], e: '10% é um décimo. Para achar, divida por 10: 90 ÷ 10 = 9.' },
          { n: 1, t: 'mc', p: 'A porcentagem 25% corresponde a qual fração?', o: [fr(1, 4), fr(1, 2), fr(1, 25), fr(25, 10)], e: '25% são 25 de cada 100. Simplificando vinte e cinco centésimos, chegamos a um quarto.' },
          { n: 2, t: 'mc', p: 'Quanto é 25% de 200?', o: ['50', '25', '100', '175'], e: '25% é um quarto. Divida por 4: 200 ÷ 4 = 50.' },
          { n: 2, t: 'mc', p: 'Quanto é 20% de 150?', o: ['30', '15', '20', '130'], e: 'Ache 10% primeiro: 150 ÷ 10 = 15. Como 20% é o dobro de 10%, a resposta é 2 × 15 = 30.' },
          { n: 2, t: 'lac', p: 'Para calcular 10% de um número, basta dividi-lo por ___.', o: ['10', '100', '2'], e: '10% é um décimo do total, por isso divide-se por 10. Dividir por 100 dá 1%, e dividir por 2 dá 50%.' },
          { n: 2, t: 'par', p: 'Ligue cada porcentagem à fração correspondente.', o: [['50%', fr(1, 2)], ['25%', fr(1, 4)], ['10%', fr(1, 10)], ['75%', fr(3, 4)]], e: '50% é a metade, 25% é um quarto, 10% é um décimo e 75% são três quartos (50% + 25%).' },
          { n: 2, t: 'vf', p: 'Um desconto de 10% em um produto de R$ 80 é um desconto de R$ 10.', r: false, e: '10% de 80 é 80 ÷ 10 = 8 reais. O desconto só seria de R$ 10 se o produto custasse R$ 100.' },
          { n: 2, t: 'mc', p: 'Em uma turma de 40 alunos, 25% usam óculos. Quantos alunos usam óculos?', o: ['10', '25', '15', '4'], e: '25% é um quarto da turma: 40 ÷ 4 = 10 alunos.' },
          { n: 3, t: 'mc', p: 'Uma mochila custa R$ 120 e está com 20% de desconto. Qual é o preço com o desconto?', o: ['R$ 96', 'R$ 100', 'R$ 24', 'R$ 144'], e: '10% de 120 é 12, então 20% é 24. Esse é o desconto. O preço final é 120 − 24 = 96 reais.' },
          { n: 3, t: 'mc', p: 'Quanto é 75% de 80?', o: ['60', '75', '20', '65'], e: '75% = 50% + 25%. A metade de 80 é 40 e um quarto de 80 é 20. Somando: 40 + 20 = 60.' },
          { n: 3, t: 'mc', p: 'Em uma prova de 20 questões, Bia acertou 15. Qual foi a porcentagem de acertos?', o: ['75%', '15%', '50%', '80%'], e: '15 de 20 é o mesmo que 75 de 100 (multiplicando os dois por 5). Então Bia acertou 75% da prova.' },
          { n: 3, t: 'mc', p: 'O ingresso do cinema custava R$ 30 e teve um aumento de 10%. Qual é o novo preço?', o: ['R$ 33', 'R$ 40', 'R$ 27', 'R$ 31'], e: '10% de 30 é 3 reais. Como é aumento, soma-se: 30 + 3 = 33 reais. (R$ 27 seria com desconto.)' },
          { n: 3, t: 'mc', p: 'Quanto é 5% de 400?', o: ['20', '40', '5', '200'], e: '10% de 400 é 40. Como 5% é a metade de 10%, a resposta é 40 ÷ 2 = 20.' },
        ],
      },

      /* ------------------------------------------------------------ 8 */
      {
        id: 'tempo', icone: '⏰', nome: 'Medida de tempo: horas e minutos',
        intro: 'Eu durmo umas 14 horas por dia. Quantos minutos dá isso? E quanto sobra para brincar? Para saber, é preciso fazer contas com horas e minutos. Só não vale perder a hora!',
        resumo: [
          { t: 'As unidades de tempo', c: '<b>1 minuto</b> = 60 segundos.<br><b>1 hora</b> = 60 minutos.<br><b>1 dia</b> = 24 horas.<br><b>1 semana</b> = 7 dias.<br>Abreviações: hora (<b>h</b>), minuto (<b>min</b>), segundo (<b>s</b>). Escreve-se 2 h 30 min, sem ponto e sem plural.' },
          { t: 'Transformar', c: '<b>Horas em minutos</b>: multiplique por 60. 3 h = 3 × 60 = 180 min.<br><b>Minutos em horas</b>: veja quantos grupos de 60 cabem. 150 min = 2 h 30 min, porque 120 min são 2 h e sobram 30 min.<br>Meia hora = 30 min. Um quarto de hora = 15 min.' },
          { t: 'Relógio de 24 horas', c: 'Depois do meio-dia, as horas continuam: <b>13 h</b> é 1 da tarde, <b>18 h</b> é 6 da tarde, <b>23 h</b> é 11 da noite. Para converter, <b>some ou subtraia 12</b>: 3 da tarde = 3 + 12 = 15 h.' },
          { t: 'Somar horas e minutos', c: 'Some <b>minutos com minutos</b> e <b>horas com horas</b>. Se os minutos passarem de 60, <b>troque 60 min por 1 h</b>.<br>2 h 45 min + 1 h 30 min = 3 h 75 min = <b>4 h 15 min</b>.' },
          { t: 'Calcular a duração', c: 'Para saber <b>quanto tempo durou</b>, vá por etapas. Filme das 14 h 40 min às 16 h 10 min:<br>das 14 h 40 min às 15 h: 20 min;<br>das 15 h às 16 h: 1 h;<br>das 16 h às 16 h 10 min: 10 min.<br>Total: <b>1 h 30 min</b>.' },
        ],
        q: [
          { n: 1, t: 'mc', p: 'Quantos minutos tem 1 hora?', o: ['60', '100', '24', '30'], e: '1 hora tem 60 minutos. Cuidado: o tempo não é contado de 100 em 100, e sim de 60 em 60.' },
          { n: 1, t: 'mc', p: 'Quantas horas tem 1 dia?', o: ['24', '12', '60', '48'], e: 'O dia tem 24 horas: 12 da meia-noite ao meio-dia e mais 12 do meio-dia à meia-noite.' },
          { n: 1, t: 'vf', p: 'Meia hora é o mesmo que 30 minutos.', r: true, e: 'Uma hora tem 60 minutos. A metade de 60 é 30, então meia hora são 30 minutos.' },
          { n: 1, t: 'mc', p: 'No relógio de 24 horas, 3 horas da tarde é o mesmo que:', o: ['15 h', '13 h', '3 h', '21 h'], e: 'Depois do meio-dia, some 12 à hora: 3 + 12 = 15 h. Já 3 h é de madrugada, e 21 h são 9 da noite.' },
          { n: 1, t: 'mc', p: 'Quantos minutos há em 2 horas?', o: ['120', '200', '90', '60'], e: 'Cada hora tem 60 minutos: 2 × 60 = 120 minutos.' },
          { n: 2, t: 'mc', p: 'Quantos minutos há em 3 h 20 min?', o: ['200', '320', '180', '230'], e: '3 h = 3 × 60 = 180 min. Somando os 20 min que faltavam: 180 + 20 = 200 minutos.' },
          { n: 2, t: 'mc', p: '150 minutos é o mesmo que:', o: ['2 h 30 min', '1 h 50 min', '2 h 50 min', '1 h 30 min'], e: 'Em 150 min cabem 2 grupos de 60 (120 min = 2 h) e sobram 30 min. Então são 2 h 30 min.' },
          { n: 2, t: 'lac', p: 'Um quarto de hora corresponde a ___ minutos.', o: ['15', '25', '40'], e: 'Um quarto é dividir por 4: 60 ÷ 4 = 15 minutos. No relógio, é quando o ponteiro grande vai do 12 ao 3.' },
          { n: 2, t: 'mc', p: 'A aula começou às 7 h 30 min e durou 50 minutos. A que horas terminou?', o: ['8 h 20 min', '8 h 10 min', '7 h 50 min', '8 h 30 min'], e: 'Das 7 h 30 min às 8 h são 30 min. Ainda faltam 20 min dos 50. Então a aula terminou às 8 h 20 min.' },
          { n: 2, t: 'par', p: 'Ligue as medidas de tempo que são iguais.', o: [['1 h', '60 min'], ['1 dia', '24 h'], ['1 min', '60 s'], ['Meia hora', '30 min']], e: '1 hora tem 60 minutos, 1 dia tem 24 horas, 1 minuto tem 60 segundos e meia hora são 30 minutos.' },
          { n: 2, t: 'vf', p: 'O horário 20 h corresponde a 10 horas da noite.', r: false, e: 'Para converter, subtraia 12: 20 − 12 = 8. Então 20 h são 8 horas da noite. Dez da noite são 22 h.' },
          { n: 3, t: 'mc', p: 'Um filme começou às 14 h 40 min e terminou às 16 h 25 min. Quanto tempo durou?', o: ['1 h 45 min', '2 h 15 min', '1 h 15 min', '2 h 45 min'], e: 'Das 14 h 40 min às 15 h: 20 min. Das 15 h às 16 h: 1 h. Das 16 h às 16 h 25 min: 25 min. Total: 1 h 45 min.' },
          { n: 3, t: 'mc', p: 'Quanto é 2 h 45 min + 1 h 30 min?', o: ['4 h 15 min', '3 h 15 min', '3 h 45 min', '4 h 45 min'], e: 'Horas: 2 + 1 = 3 h. Minutos: 45 + 30 = 75 min, que são 1 h e 15 min. Total: 4 h 15 min.' },
          { n: 3, t: 'mc', p: 'Um ônibus saiu às 9 h 50 min e a viagem durou 2 h 25 min. A que horas ele chegou?', o: ['12 h 15 min', '11 h 15 min', '12 h 25 min', '11 h 45 min'], e: 'Some as horas: 9 h 50 min + 2 h = 11 h 50 min. Mais 25 min: 10 min levam às 12 h e sobram 15 min. Chegada: 12 h 15 min.' },
          { n: 3, t: 'mc', p: 'Dejair dorme 14 horas por dia. Quantas horas do dia ele passa acordado?', o: ['10', '14', '12', '8'], e: 'O dia tem 24 horas. Tirando as 14 de sono: 24 − 14 = 10 horas acordado (e aprontando).' },
          { n: 3, t: 'mc', p: 'Quanto é 3 h − 1 h 20 min?', o: ['1 h 40 min', '2 h 20 min', '1 h 20 min', '2 h 40 min'], e: 'Troque 1 hora por 60 minutos: 3 h = 2 h 60 min. Agora subtraia: 2 h 60 min − 1 h 20 min = 1 h 40 min.' },
        ],
      },

      /* ------------------------------------------------------------ 9 */
      {
        id: 'graficos', icone: '📊', nome: 'Tabelas e gráficos',
        intro: 'Fiz uma pesquisa séria: qual é o melhor lugar da casa para tirar uma soneca? Deu sofá na cabeça! Tabelas e gráficos servem para isso: organizar os dados para a gente entender rapidinho.',
        resumo: [
          { t: 'Tabelas', c: 'A <b>tabela</b> organiza os dados em <b>linhas</b> e <b>colunas</b>. Leia sempre o <b>título</b> (o assunto), os <b>cabeçalhos</b> (o que cada coluna mostra) e a <b>fonte</b> (de onde vieram os dados).' },
          { t: 'Gráfico de barras ou de colunas', c: 'Cada <b>barra</b> representa uma categoria. Quanto <b>mais alta</b> (ou mais comprida), <b>maior</b> o valor. Para saber o valor, siga do topo da barra até a <b>escala</b> de números do eixo.' },
          { t: 'Outros gráficos', c: '<b>Gráfico de linhas</b>: mostra como algo <b>muda com o tempo</b> (sobe, desce, fica igual).<br><b>Gráfico de setores</b> (pizza): mostra as <b>partes de um todo</b>, muitas vezes em porcentagem. O círculo inteiro vale 100%.<br><b>Pictograma</b>: usa desenhos; a <b>legenda</b> diz quanto vale cada um.' },
          { t: 'O que perguntar aos dados', c: 'Qual é o <b>maior</b> valor? E o <b>menor</b>?<br>Qual é o <b>total</b>? (some tudo)<br>Qual é a <b>diferença</b> entre dois valores? (subtraia)<br>Quantas <b>vezes</b> um é maior que o outro?' },
        ],
        q: [
          { n: 1, t: 'mc', x: G.animais, p: 'Qual animal recebeu mais votos?', o: ['Cachorro', 'Gato', 'Peixe', 'Pássaro'], e: 'Na coluna "Votos", o maior número é 14, na linha do cachorro. (Eu exijo recontagem.)' },
          { n: 1, t: 'mc', x: G.livros, p: 'Em que mês a biblioteca emprestou mais livros?', o: ['Junho', 'Abril', 'Março', 'Maio'], e: 'A barra mais alta é a de junho: ela chega até o 80 na escala.' },
          { n: 1, t: 'vf', p: 'Em um gráfico de barras, a barra mais alta representa o maior valor.', r: true, e: 'A altura da barra acompanha o valor: quanto maior o número, mais alta a barra.' },
          { n: 1, t: 'mc', x: G.livros, p: 'Quantos livros foram emprestados em abril?', o: ['60', '40', '80', '30'], e: 'Siga do topo da barra de abril até a escala da esquerda: ela para no 60.' },
          { n: 1, t: 'mc', p: 'O que o título de uma tabela ou de um gráfico informa?', o: ['O assunto dos dados', 'O maior valor', 'O nome de quem leu', 'A soma de tudo'], e: 'O título diz do que tratam os dados. É a primeira coisa a ler em qualquer tabela ou gráfico.' },
          { n: 2, t: 'mc', x: G.animais, p: 'Quantos alunos participaram da pesquisa?', o: ['30', '14', '27', '4'], e: 'Some todos os votos: 14 + 9 + 4 + 3 = 30 alunos.' },
          { n: 2, t: 'mc', x: G.animais, p: 'Quantos votos o cachorro teve a mais que o gato?', o: ['5', '23', '9', '10'], e: '"Quantos a mais" pede uma subtração: 14 − 9 = 5 votos de diferença.' },
          { n: 2, t: 'mc', x: G.sardinhas, p: 'Quantas sardinhas o Dejair comeu na terça-feira?', o: ['20', '4', '5', '15'], e: 'Na terça há 4 desenhos, e a legenda diz que cada um vale 5 sardinhas: 4 × 5 = 20.' },
          { n: 2, t: 'lac', p: 'No pictograma, a ___ informa quanto vale cada desenho.', o: ['legenda', 'barra', 'fonte'], e: 'Sem a legenda não dá para ler o pictograma: um desenho pode valer 1, 5, 10 ou qualquer outra quantidade.' },
          { n: 2, t: 'vf', x: G.animais, p: 'Peixe e pássaro, juntos, tiveram mais votos que gato.', r: false, e: 'Peixe e pássaro somam 4 + 3 = 7 votos. O gato teve 9. Então o gato ainda ganha dos dois juntos.' },
          { n: 2, t: 'mc', x: G.livros, p: 'Quantos livros foram emprestados a mais em junho do que em maio?', o: ['50', '110', '30', '20'], e: 'Junho: 80 livros. Maio: 30 livros. A diferença é 80 − 30 = 50.' },
          { n: 2, t: 'par', p: 'Ligue cada tipo de gráfico ao que ele mostra melhor.', o: [['Barras', 'Compara quantidades'], ['Linhas', 'Mudança ao longo do tempo'], ['Setores', 'Partes de um todo'], ['Pictograma', 'Dados com desenhos']], e: 'Barras comparam, linhas mostram a mudança no tempo, setores (pizza) mostram as partes do todo e pictogramas usam desenhos.' },
          { n: 3, t: 'mc', x: G.livros, p: 'Quantos livros foram emprestados nos quatro meses, ao todo?', o: ['210', '200', '180', '80'], e: 'Leia cada barra e some: 40 + 60 + 30 + 80 = 210 livros.' },
          { n: 3, t: 'mc', x: G.livros, p: 'Em qual mês foi emprestado o dobro dos livros de maio?', o: ['Abril', 'Junho', 'Março', 'Nenhum deles'], e: 'Em maio foram 30 livros. O dobro é 60, justamente o valor de abril.' },
          { n: 3, t: 'mc', x: G.turmas, p: 'Qual turma tem mais alunos?', o: ['5º C', '5º A', '5º B', 'As três têm o mesmo número'], e: 'Some cada linha: 5º A tem 12 + 15 = 27; 5º B tem 16 + 11 = 27; 5º C tem 14 + 14 = 28.' },
          { n: 3, t: 'mc', x: G.sardinhas, p: 'Quantas sardinhas o Dejair comeu nos quatro dias?', o: ['50', '10', '45', '55'], e: 'São 2 + 4 + 1 + 3 = 10 desenhos. Cada um vale 5 sardinhas: 10 × 5 = 50.' },
          { n: 3, t: 'mc', x: G.animais, p: 'O gato teve 9 dos 30 votos. Isso corresponde a que porcentagem dos votos?', o: ['30%', '9%', '39%', '3%'], e: '9 de 30 é o mesmo que 3 de 10 (dividindo os dois por 3), e 3 de 10 é o mesmo que 30 de 100: 30%.' },
        ],
      },

      /* ------------------------------------------------------------ 10 */
      {
        id: 'area', icone: '📐', nome: 'Área',
        intro: 'Área é o tamanho de uma superfície: o chão da sala, a tela do celular, o tapete onde eu me esparramo. Quanto maior a área do tapete, mais gato cabe!',
        resumo: [
          { t: 'O que é área', c: '<b>Área</b> é a medida de uma <b>superfície</b>. Para medir, contamos quantas vezes uma <b>unidade de área</b> cabe nela. Na malha quadriculada, é só <b>contar os quadradinhos</b>.' },
          { t: 'Unidades de área', c: '<b>cm²</b> (centímetro quadrado): um quadrado de 1 cm de lado. Bom para figuras no caderno.<br><b>m²</b> (metro quadrado): um quadrado de 1 m de lado. Bom para salas, quadras e terrenos.<br><b>km²</b>: para cidades, estados e países.' },
          { t: 'Retângulo e quadrado', c: 'Não precisa contar um por um: <b>multiplique</b>.<br><b>Retângulo</b>: comprimento × largura. Com 5 cm por 3 cm, a área é 5 × 3 = <b>15 cm²</b>.<br><b>Quadrado</b>: lado × lado. Com 4 m de lado, a área é 4 × 4 = <b>16 m²</b>.' },
          { t: 'Área não é perímetro', c: '<b>Perímetro</b> é a medida do <b>contorno</b> (a soma dos lados), em cm ou m. <b>Área</b> é a medida do que fica <b>dentro</b>, em cm² ou m².<br>Retângulo de 5 cm por 3 cm: perímetro = 5 + 3 + 5 + 3 = 16 cm; área = 15 cm².' },
          { t: 'Meios quadradinhos e figuras compostas', c: 'Dois <b>meios quadradinhos</b> formam <b>1 inteiro</b>. Em figuras formadas por retângulos, <b>divida</b> em partes, calcule cada área e <b>some</b>. Figuras <b>diferentes</b> podem ter a <b>mesma área</b>.' },
        ],
        q: [
          { n: 1, t: 'mc', x: M.retangulo, p: 'Cada quadradinho da malha mede 1 cm². Qual é a área da figura pintada?', o: ['12 cm²', '14 cm²', '7 cm²', '30 cm²'], e: 'São 3 fileiras de 4 quadradinhos: 3 × 4 = 12 cm². Já 14 cm é o perímetro, a medida do contorno.' },
          { n: 1, t: 'mc', p: 'Qual unidade é a mais adequada para medir a área de uma sala de aula?', o: ['m²', 'cm²', 'km²', 'm'], e: 'O metro quadrado (m²) serve para salas, quadras e terrenos. O metro (m), sem o "quadrado", mede comprimento, não área.' },
          { n: 1, t: 'vf', p: 'A área é a medida da superfície de uma figura.', r: true, e: 'Área é o "tamanho de dentro" da figura. A medida do contorno tem outro nome: perímetro.' },
          { n: 1, t: 'mc', p: 'Como se calcula a área de um retângulo?', o: ['Comprimento × largura', 'Comprimento + largura', 'Somando os quatro lados', 'Lado × 4'], e: 'Multiplica-se o comprimento pela largura. Somar os quatro lados dá o perímetro, que é o contorno.' },
          { n: 2, t: 'mc', p: 'Qual é a área de um retângulo de 8 cm de comprimento e 5 cm de largura?', o: ['40 cm²', '13 cm²', '26 cm²', '45 cm²'], e: 'Área do retângulo = comprimento × largura = 8 × 5 = 40 cm². Já 26 cm é o perímetro.' },
          { n: 2, t: 'mc', p: 'Qual é a área de um quadrado de 6 m de lado?', o: ['36 m²', '24 m²', '12 m²', '66 m²'], e: 'Área do quadrado = lado × lado = 6 × 6 = 36 m². Já 24 m é o perímetro (6 × 4).' },
          { n: 2, t: 'mc', x: M.ele, p: 'Cada quadradinho mede 1 cm². Qual é a área da figura em forma de L?', o: ['10 cm²', '8 cm²', '12 cm²', '16 cm²'], e: 'Divida em duas partes: a parte em pé tem 2 × 4 = 8 quadradinhos e o "pé" do L tem mais 2. Total: 10 cm².' },
          { n: 2, t: 'lac', p: 'A medida do contorno de uma figura é o ___.', o: ['perímetro', 'volume', 'ângulo'], e: 'Perímetro é a soma das medidas de todos os lados. Área é a medida da superfície, a parte de dentro.' },
          { n: 2, t: 'vf', p: 'Um retângulo de 4 cm por 3 cm tem área de 14 cm².', r: false, e: 'A área é 4 × 3 = 12 cm². O número 14 é o perímetro: 4 + 3 + 4 + 3 = 14 cm.' },
          { n: 2, t: 'par', p: 'Ligue cada retângulo à sua área.', o: [['2 cm por 9 cm', '18 cm²'], ['3 cm por 7 cm', '21 cm²'], ['4 cm por 6 cm', '24 cm²'], ['5 cm por 5 cm', '25 cm²']], e: 'Multiplique as duas medidas: 2 × 9 = 18, 3 × 7 = 21, 4 × 6 = 24 e 5 × 5 = 25. O de 5 por 5 é um quadrado.' },
          { n: 3, t: 'mc', p: 'O quarto de Bia é um retângulo de 4 m por 3 m. Quantos metros quadrados de piso são necessários para cobrir o chão?', o: ['12 m²', '14 m²', '7 m²', '24 m²'], e: 'Cobrir o chão é uma questão de área: 4 × 3 = 12 m². Para o rodapé, que acompanha o contorno, usaríamos o perímetro.' },
          { n: 3, t: 'mc', p: 'Um retângulo tem área de 48 cm² e comprimento de 8 cm. Qual é a sua largura?', o: ['6 cm', '40 cm', '56 cm', '8 cm'], e: 'Área = comprimento × largura. Se 8 × largura = 48, use a operação inversa: 48 ÷ 8 = 6 cm.' },
          { n: 3, t: 'mc', p: 'Um quadrado tem perímetro de 20 cm. Qual é a sua área?', o: ['25 cm²', '20 cm²', '100 cm²', '400 cm²'], e: 'O quadrado tem 4 lados iguais: 20 ÷ 4 = 5 cm cada lado. A área é 5 × 5 = 25 cm².' },
          { n: 3, t: 'mc', x: M.casa, p: 'Cada quadradinho mede 1 cm². Qual é a área da casinha? Atenção ao telhado!', o: ['5 cm²', '6 cm²', '4 cm²', '4,5 cm²'], e: 'A parede tem 4 quadradinhos inteiros. O telhado tem 2 meios quadradinhos, que juntos formam 1. Total: 4 + 1 = 5 cm².' },
          { n: 3, t: 'mc', p: 'Uma parede de 5 m por 3 m tem uma janela de 2 m por 1 m. Qual é a área que será pintada, sem a janela?', o: ['13 m²', '15 m²', '17 m²', '11 m²'], e: 'Parede inteira: 5 × 3 = 15 m². Janela: 2 × 1 = 2 m². Tirando a janela: 15 − 2 = 13 m².' },
        ],
      },

      /* ------------------------------------------------------------ 11 */
      {
        id: 'angulos', icone: '📏', nome: 'Ângulos',
        intro: 'Quando eu abro a boca para bocejar, formo um ângulo. Bocejo pequeno, ângulo agudo. Bocejão de segunda-feira, ângulo obtuso! Vem medir aberturas comigo.',
        resumo: [
          { t: 'O que é ângulo', c: '<b>Ângulo</b> é a <b>abertura</b> entre duas semirretas que partem do mesmo ponto. Esse ponto é o <b>vértice</b>; as semirretas são os <b>lados</b>. Também há ângulo nos <b>giros</b>: os ponteiros do relógio, uma porta abrindo, uma curva.' },
          { t: 'Medindo em graus', c: 'O ângulo é medido em <b>graus (°)</b>, com o <b>transferidor</b>. O que conta é a <b>abertura</b>, não o comprimento dos lados. Uma <b>volta completa</b> tem <b>360°</b>; <b>meia-volta</b>, <b>180°</b>; <b>um quarto de volta</b>, <b>90°</b>.' },
          { t: 'Tipos de ângulo', c: '<b>Reto</b>: mede exatamente <b>90°</b>. É o canto da folha do caderno.<br><b>Agudo</b>: mede <b>menos de 90°</b>. É mais fechado que o reto.<br><b>Obtuso</b>: mede <b>mais de 90° e menos de 180°</b>. É mais aberto que o reto.<br><b>Raso</b>: mede <b>180°</b>. Parece uma linha reta.' },
          { t: 'Onde tem ângulo reto', c: 'O ângulo reto é marcado com um <b>quadradinho</b> no vértice. Ele aparece nos cantos de portas, janelas, livros e telas. Retas que se cruzam formando ângulos retos são <b>perpendiculares</b>.' },
          { t: 'Ângulos no relógio', c: 'Às <b>3 horas</b>, os ponteiros formam um ângulo <b>reto</b> (90°). Às <b>6 horas</b>, um ângulo <b>raso</b> (180°). À <b>1 hora</b>, um ângulo <b>agudo</b> de 30°: cada espaço entre dois números do relógio vale 30°, porque 360° ÷ 12 = 30°.' },
        ],
        q: [
          { n: 1, t: 'mc', p: 'Quantos graus mede um ângulo reto?', o: ['90°', '45°', '180°', '360°'], e: 'O ângulo reto mede exatamente 90°. É um quarto de volta, como o canto de uma folha de caderno.' },
          { n: 1, t: 'mc', x: angulo(40), p: 'Que tipo de ângulo é este?', o: ['Agudo', 'Reto', 'Obtuso', 'Raso'], e: 'A abertura é menor que a de um ângulo reto (o canto de uma folha). Ângulos com menos de 90° são agudos.' },
          { n: 1, t: 'vf', p: 'Um ângulo agudo mede menos de 90°.', r: true, e: 'Agudo é o ângulo mais fechado que o reto: mede mais de 0° e menos de 90°.' },
          { n: 1, t: 'mc', p: 'Qual instrumento é usado para medir ângulos?', o: ['Transferidor', 'Régua', 'Balança', 'Termômetro'], e: 'O transferidor mede ângulos em graus. A régua mede comprimentos, a balança mede massa e o termômetro mede temperatura.' },
          { n: 1, t: 'mc', x: angulo(130), p: 'Que tipo de ângulo é este?', o: ['Obtuso', 'Agudo', 'Reto', 'Raso'], e: 'A abertura é maior que a de um ângulo reto, mas ainda não chega a formar uma linha reta. Entre 90° e 180°, o ângulo é obtuso.' },
          { n: 2, t: 'mc', x: angulo(90), p: 'O quadradinho desenhado no vértice indica que este ângulo é:', o: ['reto', 'agudo', 'obtuso', 'raso'], e: 'O quadradinho no vértice é o sinal do ângulo reto, que mede exatamente 90°.' },
          { n: 2, t: 'mc', p: 'Um ângulo de 120° é classificado como:', o: ['obtuso', 'agudo', 'reto', 'raso'], e: '120° é mais que 90° e menos que 180°. Nessa faixa, o ângulo é obtuso.' },
          { n: 2, t: 'lac', p: 'O ponto onde os dois lados do ângulo se encontram é o ___.', o: ['vértice', 'grau', 'centro'], e: 'Todo ângulo tem um vértice (o ponto de encontro) e dois lados (as semirretas que saem dele).' },
          { n: 2, t: 'par', p: 'Ligue cada tipo de ângulo à sua medida.', o: [['Agudo', 'Menos de 90°'], ['Reto', 'Exatamente 90°'], ['Obtuso', 'Entre 90° e 180°'], ['Raso', 'Exatamente 180°']], e: 'Do mais fechado para o mais aberto: agudo (menos de 90°), reto (90°), obtuso (entre 90° e 180°) e raso (180°).' },
          { n: 2, t: 'vf', p: 'Quanto mais compridos forem os lados de um ângulo, maior é a sua medida.', r: false, e: 'O tamanho do ângulo depende só da abertura. Esticar os lados não muda a medida em graus.' },
          { n: 2, t: 'mc', p: 'Uma volta completa tem quantos graus?', o: ['360°', '180°', '90°', '100°'], e: 'A volta completa tem 360°. Meia-volta tem 180° e um quarto de volta tem 90°.' },
          { n: 2, t: 'mc', p: 'Qual é o ângulo formado pelos ponteiros do relógio às 3 horas em ponto?', o: ['Reto', 'Agudo', 'Obtuso', 'Raso'], e: 'Às 3 horas, um ponteiro aponta para o 12 e o outro para o 3: um quarto de volta, ou seja, 90°.' },
          { n: 3, t: 'mc', p: 'Qual destes ângulos é agudo?', o: ['75°', '90°', '105°', '180°'], e: 'Agudo é o que mede menos de 90°: só o de 75°. O de 90° é reto, o de 105° é obtuso e o de 180° é raso.' },
          { n: 3, t: 'mc', p: 'Às 6 horas em ponto, os ponteiros do relógio formam um ângulo de:', o: ['180°', '90°', '60°', '360°'], e: 'Um ponteiro aponta para o 12 e o outro para o 6, formando uma linha reta: meia-volta, ou 180° (ângulo raso).' },
          { n: 3, t: 'mc', p: 'Um skatista deu meia-volta. Quantos graus ele girou?', o: ['180°', '90°', '360°', '45°'], e: 'A volta completa tem 360°. Meia-volta é a metade: 360° ÷ 2 = 180°.' },
          { n: 3, t: 'ord', p: 'Coloque os tipos de ângulo em ordem, do menor para o maior.', o: ['Agudo', 'Reto', 'Obtuso', 'Raso'], e: 'Agudo (menos de 90°), reto (90°), obtuso (entre 90° e 180°) e raso (180°).' },
          { n: 3, t: 'mc', p: 'Às 2 horas em ponto, quanto mede o ângulo entre os ponteiros do relógio?', o: ['60°', '30°', '90°', '20°'], e: 'Cada espaço entre dois números do relógio vale 30° (360° ÷ 12). Do 12 ao 2 são dois espaços: 2 × 30° = 60°.' },
        ],
      },

      /* ------------------------------------------------------------ 12 */
      {
        id: 'poligonos', icone: '🔷', nome: 'Polígonos',
        intro: 'Triângulo, quadrado, hexágono... Figuras fechadas feitas só de linhas retas se chamam polígonos. A minha caixa de papelão preferida é cheia deles!',
        resumo: [
          { t: 'O que é polígono', c: '<b>Polígono</b> é uma figura plana <b>fechada</b>, formada só por <b>segmentos de reta</b> que não se cruzam. O círculo <b>não</b> é polígono, pois o seu contorno é curvo. Figura aberta também não é.' },
          { t: 'Lados, vértices e ângulos', c: 'Os segmentos são os <b>lados</b>. Os pontos onde dois lados se encontram são os <b>vértices</b>. Em cada vértice há um <b>ângulo</b>. Em todo polígono, o número de lados, de vértices e de ângulos é <b>o mesmo</b>.' },
          { t: 'Nomes pelo número de lados', c: '<b>3</b> lados: triângulo.<br><b>4</b> lados: quadrilátero.<br><b>5</b> lados: pentágono.<br><b>6</b> lados: hexágono.<br><b>7</b> lados: heptágono.<br><b>8</b> lados: octógono.<br><b>9</b> lados: eneágono.<br><b>10</b> lados: decágono.' },
          { t: 'Triângulos', c: 'Pelos <b>lados</b>:<br><b>Equilátero</b>: 3 lados de mesma medida.<br><b>Isósceles</b>: 2 lados de mesma medida.<br><b>Escaleno</b>: 3 lados de medidas diferentes.<br>Pelos <b>ângulos</b>: <b>retângulo</b> (tem um ângulo reto), <b>acutângulo</b> (três ângulos agudos) e <b>obtusângulo</b> (tem um ângulo obtuso).' },
          { t: 'Quadriláteros', c: '<b>Quadrado</b>: 4 lados iguais e 4 ângulos retos.<br><b>Retângulo</b>: 4 ângulos retos e lados opostos iguais.<br><b>Losango</b>: 4 lados iguais.<br><b>Paralelogramo</b>: lados opostos paralelos.<br><b>Trapézio</b>: apenas um par de lados paralelos.' },
        ],
        q: [
          { n: 1, t: 'mc', p: 'Quantos lados tem um triângulo?', o: ['3', '4', '5', '6'], e: 'O nome já avisa: tri quer dizer três. O triângulo tem 3 lados, 3 vértices e 3 ângulos.' },
          { n: 1, t: 'mc', x: poligono(6), p: 'Qual é o nome deste polígono?', o: ['Hexágono', 'Pentágono', 'Octógono', 'Quadrilátero'], e: 'Conte os lados: são 6. O polígono de 6 lados é o hexágono, a forma dos favos de mel.' },
          { n: 1, t: 'vf', p: 'O círculo é um polígono.', r: false, e: 'Polígonos são formados só por segmentos de reta. O contorno do círculo é uma linha curva, então ele não é polígono.' },
          { n: 1, t: 'mc', p: 'Como se chama o polígono de 5 lados?', o: ['Pentágono', 'Hexágono', 'Heptágono', 'Decágono'], e: 'Penta quer dizer cinco. O hexágono tem 6 lados, o heptágono tem 7 e o decágono tem 10.' },
          { n: 1, t: 'mc', p: 'Como se chamam os pontos em que dois lados de um polígono se encontram?', o: ['Vértices', 'Arestas', 'Diagonais', 'Centros'], e: 'Os vértices são as "pontas" do polígono, onde dois lados se encontram e formam um ângulo.' },
          { n: 2, t: 'mc', x: poligono(5), p: 'Quantos vértices tem este polígono e qual é o seu nome?', o: ['5 vértices: pentágono', '5 vértices: hexágono', '6 vértices: hexágono', '4 vértices: quadrilátero'], e: 'Contando as pontas, são 5 vértices e 5 lados. O polígono de 5 lados é o pentágono.' },
          { n: 2, t: 'mc', p: 'Quantos vértices tem um octógono?', o: ['8', '6', '10', '18'], e: 'O octógono tem 8 lados. Como todo polígono tem tantos vértices quantos lados, são 8 vértices.' },
          { n: 2, t: 'lac', p: 'O triângulo que tem os três lados com a mesma medida é o triângulo ___.', o: ['equilátero', 'escaleno', 'isósceles'], e: 'Equilátero: três lados iguais. Isósceles: dois lados iguais. Escaleno: três lados diferentes.' },
          { n: 2, t: 'par', p: 'Ligue cada polígono ao seu número de lados.', o: [['Triângulo', '3 lados'], ['Pentágono', '5 lados'], ['Heptágono', '7 lados'], ['Decágono', '10 lados']], e: 'Os nomes vêm do grego: tri (3), penta (5), hepta (7) e deca (10).' },
          { n: 2, t: 'vf', p: 'Todo polígono tem o mesmo número de lados e de vértices.', r: true, e: 'Cada vértice liga dois lados vizinhos. Por isso a conta sempre fecha: 3 lados, 3 vértices; 8 lados, 8 vértices.' },
          { n: 2, t: 'mc', p: 'Qual quadrilátero tem 4 lados iguais e 4 ângulos retos?', o: ['Quadrado', 'Trapézio', 'Losango', 'Paralelogramo'], e: 'O quadrado junta as duas coisas: lados iguais e ângulos retos. O losango tem os lados iguais, mas os ângulos nem sempre são retos.' },
          { n: 2, t: 'mc', p: 'Por que uma figura fechada com contorno curvo não é um polígono?', o: ['Porque polígonos só têm lados retos', 'Porque polígonos precisam ser abertos', 'Porque polígonos têm no máximo 4 lados', 'Porque polígonos não têm vértices'], e: 'Para ser polígono, a figura precisa ser fechada e ter o contorno formado só por segmentos de reta.' },
          { n: 3, t: 'mc', p: 'Um triângulo tem lados de 5 cm, 5 cm e 8 cm. Como ele é classificado quanto aos lados?', o: ['Isósceles', 'Equilátero', 'Escaleno', 'Quadrilátero'], e: 'Dois lados têm a mesma medida (5 cm) e o terceiro é diferente. Esse é o triângulo isósceles.' },
          { n: 3, t: 'mc', p: 'Qual quadrilátero tem apenas um par de lados paralelos?', o: ['Trapézio', 'Quadrado', 'Retângulo', 'Losango'], e: 'No trapézio, só dois lados são paralelos entre si. No quadrado, no retângulo e no losango há dois pares de lados paralelos.' },
          { n: 3, t: 'mc', p: 'A placa de "PARE" tem a forma de um polígono de 8 lados. Qual é o nome dele?', o: ['Octógono', 'Hexágono', 'Decágono', 'Pentágono'], e: 'Octo quer dizer oito. A placa de "PARE" é um octógono: 8 lados e 8 vértices.' },
          { n: 3, t: 'mc', p: 'Um polígono tem 9 vértices. Quantos lados ele tem e como se chama?', o: ['9 lados: eneágono', '8 lados: octógono', '10 lados: decágono', '9 lados: heptágono'], e: 'O número de lados é igual ao de vértices: 9. O polígono de 9 lados é o eneágono.' },
          { n: 3, t: 'mc', p: 'O que um quadrado e um losango sempre têm em comum?', o: ['Os 4 lados com a mesma medida', 'Os 4 ângulos retos', 'Apenas um par de lados paralelos', 'Três lados e três vértices'], e: 'Os dois têm 4 lados iguais. A diferença está nos ângulos: no quadrado todos são retos; no losango, não precisam ser.' },
        ],
      },

      /* ------------------------------------------------------------ 13 */
      {
        id: 'solidos', icone: '🧊', nome: 'Poliedros e corpos redondos',
        intro: 'Uma caixa, uma lata, uma bola de lã... Essas figuras têm volume: dá para pegar, empilhar e, no meu caso, derrubar da mesa. Umas rolam, outras não. Vem ver por quê!',
        resumo: [
          { t: 'Figuras que ocupam espaço', c: 'As <b>figuras geométricas espaciais</b> (ou sólidos geométricos) têm <b>três dimensões</b>: comprimento, largura e altura. Elas se dividem em dois grupos: <b>poliedros</b> e <b>corpos redondos</b>.' },
          { t: 'Poliedros', c: 'Os <b>poliedros</b> têm só <b>superfícies planas</b> e <b>não rolam</b>. Suas partes:<br><b>Faces</b>: os polígonos que formam a superfície.<br><b>Arestas</b>: as linhas onde duas faces se encontram.<br><b>Vértices</b>: os pontos onde as arestas se encontram.<br>O <b>cubo</b> tem 6 faces, 12 arestas e 8 vértices.' },
          { t: 'Prismas e pirâmides', c: '<b>Prismas</b>: têm <b>duas bases</b> iguais e paralelas; as faces laterais são <b>retângulos</b>. Exemplos: cubo, bloco retangular (paralelepípedo) e prisma de base triangular.<br><b>Pirâmides</b>: têm <b>uma base</b> e faces laterais <b>triangulares</b>, que se encontram em um vértice. O nome vem da base: pirâmide de base quadrada.' },
          { t: 'Corpos redondos', c: 'Os <b>corpos redondos</b> têm <b>superfície curva</b> e <b>podem rolar</b>.<br><b>Esfera</b>: toda curva, como uma bola.<br><b>Cilindro</b>: duas bases circulares, como uma lata.<br><b>Cone</b>: uma base circular e um vértice, como um chapéu de festa.' },
          { t: 'Planificação', c: '<b>Planificar</b> é "abrir" o sólido e deixá-lo plano, como uma caixa desmontada. A planificação do <b>cubo</b> tem <b>6 quadrados</b>. A do <b>cilindro</b> tem <b>2 círculos e 1 retângulo</b>. A da <b>pirâmide de base quadrada</b> tem <b>1 quadrado e 4 triângulos</b>.' },
        ],
        q: [
          { n: 1, t: 'mc', p: 'Qual destes sólidos geométricos é um corpo redondo?', o: ['Esfera', 'Cubo', 'Pirâmide', 'Bloco retangular'], e: 'A esfera tem a superfície toda curva e rola para qualquer lado. Cubo, pirâmide e bloco retangular só têm faces planas: são poliedros.' },
          { n: 1, t: 'mc', p: 'Uma lata de milho lembra qual sólido geométrico?', o: ['Cilindro', 'Cone', 'Cubo', 'Pirâmide'], e: 'A lata tem duas bases circulares (a tampa e o fundo) e uma lateral curva: é um cilindro.' },
          { n: 1, t: 'vf', p: 'Os poliedros têm apenas superfícies planas e, por isso, não rolam.', r: true, e: 'Sem nenhuma parte curva, o poliedro fica parado sobre qualquer uma das faces. Quem rola são os corpos redondos.' },
          { n: 1, t: 'mc', p: 'Quantas faces tem um cubo?', o: ['6', '4', '8', '12'], e: 'O cubo tem 6 faces, todas quadradas. Pense em um dado: os números vão de 1 a 6, um em cada face.' },
          { n: 1, t: 'mc', p: 'Um chapéu de festa de aniversário lembra qual sólido?', o: ['Cone', 'Cilindro', 'Esfera', 'Prisma'], e: 'O cone tem uma base circular e vai afinando até terminar em um vértice, a pontinha do chapéu.' },
          { n: 2, t: 'mc', p: 'Quantos vértices tem um cubo?', o: ['8', '6', '12', '4'], e: 'São 4 vértices na face de cima e 4 na de baixo: 8 ao todo. Não confunda: 6 são as faces e 12 são as arestas.' },
          { n: 2, t: 'lac', p: 'A linha onde duas faces de um poliedro se encontram é chamada de ___.', o: ['aresta', 'vértice', 'base'], e: 'As arestas são as "quinas" do poliedro. Os vértices são as pontas, onde as arestas se encontram.' },
          { n: 2, t: 'par', p: 'Ligue cada objeto ao sólido que ele lembra.', o: [['Dado', 'Cubo'], ['Bola', 'Esfera'], ['Caixa de sapato', 'Bloco retangular'], ['Casquinha de sorvete', 'Cone']], e: 'O dado é um cubo e a caixa de sapato é um bloco retangular (poliedros). A bola é uma esfera e a casquinha é um cone (corpos redondos).' },
          { n: 2, t: 'vf', p: 'O cilindro é um poliedro, porque tem duas bases planas.', r: false, e: 'Para ser poliedro, todas as superfícies precisam ser planas. A lateral do cilindro é curva, então ele é um corpo redondo.' },
          { n: 2, t: 'mc', p: 'Como são as faces laterais de uma pirâmide?', o: ['Triângulos', 'Retângulos', 'Círculos', 'Quadrados'], e: 'Na pirâmide, as faces laterais são triângulos que se encontram em um único vértice, lá em cima.' },
          { n: 2, t: 'mc', p: 'Quantas arestas tem um cubo?', o: ['12', '6', '8', '10'], e: 'São 4 arestas em cima, 4 embaixo e 4 em pé, ligando as duas faces: 12 ao todo.' },
          { n: 3, t: 'mc', p: 'Uma pirâmide de base quadrada tem quantas faces, contando a base?', o: ['5', '4', '6', '8'], e: 'A base quadrada conta como 1 face, e cada lado do quadrado sustenta 1 face triangular: 1 + 4 = 5 faces.' },
          { n: 3, t: 'mc', p: 'A planificação de um sólido tem 2 círculos e 1 retângulo. Que sólido é esse?', o: ['Cilindro', 'Cone', 'Esfera', 'Cubo'], e: 'Os 2 círculos são as bases e o retângulo é a lateral "desenrolada". É o cilindro, como um rótulo tirado de uma lata.' },
          { n: 3, t: 'mc', p: 'Qual é a principal diferença entre um prisma e uma pirâmide?', o: ['O prisma tem duas bases; a pirâmide tem uma', 'O prisma rola; a pirâmide não rola', 'O prisma é redondo; a pirâmide é plana', 'O prisma tem uma base; a pirâmide tem duas'], e: 'O prisma tem duas bases iguais e faces laterais retangulares. A pirâmide tem uma base só e faces laterais triangulares.' },
          { n: 3, t: 'mc', p: 'Um prisma de base triangular tem quantos vértices?', o: ['6', '3', '5', '9'], e: 'Cada base triangular tem 3 vértices, e o prisma tem duas bases: 3 + 3 = 6 vértices. Ele tem 5 faces e 9 arestas.' },
          { n: 3, t: 'mc', p: 'Quantas arestas tem uma pirâmide de base quadrada?', o: ['8', '4', '5', '12'], e: 'São 4 arestas no quadrado da base e mais 4 que sobem até o vértice de cima: 8 arestas.' },
        ],
      },
    ],
  });
})();
