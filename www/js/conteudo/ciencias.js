/* Ciências — Unidade 5: Nutrição do corpo humano.
   Formato e regras em LEIA-ME.md. Em mc e lac, a opção certa é sempre a primeira. */
window.DEJAIR_CONTEUDO = window.DEJAIR_CONTEUDO || [];
window.DEJAIR_CONTEUDO.push({
  id: 'ciencias', nome: 'Ciências', icone: '🔬', cor: '#2E86AB',
  unidade: 'Unidade 5 — Nutrição do corpo humano',
  desc: 'Como o corpo transforma comida e ar em energia e elimina o que sobra.',
  topicos: [

    /* ------------------------------------------------------------ 1 */
    {
      id: 'nutricao', icone: '🍎', nome: 'Nutrição e energia do corpo',
      intro: 'Sabe por que eu corro para o pote de ração e depois saio pulando pelos telhados? Porque comida vira energia! Vem ver como isso acontece no seu corpo.',
      resumo: [
        { t: 'Por que comemos?', c: 'Os alimentos fornecem <b>nutrientes</b>. Eles dão <b>energia</b> para o corpo funcionar, servem de material para <b>crescer</b> e reparar o que se desgasta e ajudam a manter a saúde. Até dormindo o corpo gasta energia: o coração bate e você respira.' },
        { t: 'Os nutrientes', c: '<b>Carboidratos</b> (pão, arroz, frutas): principal fonte de energia.<br><b>Gorduras</b> (óleos, manteiga, castanhas): reserva de energia.<br><b>Proteínas</b> (carne, ovo, feijão, leite): constroem e reparam o corpo.<br><b>Vitaminas e sais minerais</b> (frutas, verduras, legumes): regulam o funcionamento do corpo.<br><b>Água</b>: indispensável para tudo.' },
        { t: 'Os quatro processos da nutrição', c: '<b>Digestão</b>: transforma os alimentos em nutrientes bem pequenos.<br><b>Respiração</b>: traz o gás oxigênio do ar.<br><b>Circulação</b>: o sangue leva nutrientes e gás oxigênio a todo o corpo.<br><b>Excreção</b>: elimina os resíduos que o corpo não usa.' },
        { t: 'Onde a energia é liberada', c: 'A energia é liberada dentro das <b>células</b>, as pequenas partes vivas que formam o corpo. Lá, os <b>nutrientes</b> se combinam com o <b>gás oxigênio</b> e liberam energia. Nesse processo sobram <b>gás carbônico</b> e outros resíduos, que precisam ser eliminados.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Para que o corpo usa os nutrientes dos alimentos?', o: ['Para ter energia, crescer e manter a saúde', 'Apenas para matar a fome e a sede', 'Somente para deixar os ossos mais duros', 'Para produzir o gás oxigênio do ar'], e: 'Os nutrientes dão energia, servem de material para crescer e reparar o corpo e ajudam a manter a saúde.' },
        { n: 1, t: 'mc', p: 'Qual destes nutrientes é a principal fonte de energia do corpo?', o: ['Carboidratos', 'Vitaminas', 'Sais minerais', 'Água'], e: 'Os carboidratos, presentes no pão, no arroz, nas massas e nas frutas, são a principal fonte de energia. As gorduras funcionam como reserva.' },
        { n: 1, t: 'vf', p: 'Mesmo quando estamos dormindo, o corpo continua gastando energia.', r: true, e: 'O coração continua batendo, a respiração não para e o corpo se mantém aquecido. Tudo isso gasta energia.' },
        { n: 1, t: 'mc', p: 'Qual processo transforma os alimentos em nutrientes bem pequenos?', o: ['Digestão', 'Respiração', 'Circulação', 'Excreção'], e: 'Na digestão, os alimentos são quebrados em partes cada vez menores, até virarem nutrientes que podem passar para o sangue.' },
        { n: 2, t: 'lac', p: 'Para liberar a energia dos nutrientes, o corpo precisa do gás ___, que vem do ar.', o: ['oxigênio', 'carbônico', 'nitrogênio'], e: 'É a combinação dos nutrientes com o gás oxigênio que libera a energia. O gás carbônico é o que sobra desse processo.' },
        { n: 2, t: 'mc', p: 'Qual nutriente é o principal responsável por construir e reparar partes do corpo, como músculos e pele?', o: ['Proteínas', 'Carboidratos', 'Vitaminas', 'Gorduras'], e: 'As proteínas, presentes em carnes, ovos, leite e feijão, são o material de construção do corpo: formam músculos e pele e ajudam a cicatrizar.' },
        { n: 2, t: 'par', p: 'Ligue cada processo da nutrição ao que ele faz.', o: [['Digestão', 'Quebra os alimentos'], ['Respiração', 'Obtém gás oxigênio'], ['Circulação', 'Transporta pelo sangue'], ['Excreção', 'Elimina resíduos, como a ureia']], e: 'A digestão quebra os alimentos, a respiração obtém o gás oxigênio, a circulação transporta tudo pelo sangue e a excreção elimina resíduos, como a ureia.' },
        { n: 2, t: 'vf', p: 'O corpo só precisa de alimentos sólidos; a água não é importante para a nutrição.', r: false, e: 'A água é indispensável: faz parte do sangue, ajuda na digestão e no transporte de substâncias pelo corpo.' },
        { n: 3, t: 'mc', p: 'Uma pessoa come bem, mas o corpo não consegue levar os nutrientes até as células. Qual processo está falhando?', o: ['Circulação', 'Digestão', 'Respiração', 'Excreção'], e: 'Quem transporta os nutrientes e o gás oxigênio até as células é o sangue. Esse transporte é a circulação.' },
        { n: 3, t: 'mc', p: 'Por que precisamos tanto comer quanto respirar para ter energia?', o: ['Porque o gás oxigênio ajuda a liberar a energia da comida', 'Porque o ar que respiramos já vem cheio de nutrientes', 'Porque a comida produz gás oxigênio dentro do estômago', 'Porque respirar serve para empurrar a comida engolida'], e: 'Comer fornece os nutrientes e respirar fornece o gás oxigênio. A energia só é liberada quando os dois se encontram dentro das células.' },
        { n: 3, t: 'ord', p: 'Coloque em ordem o que acontece com um pedaço de pão até virar energia.', o: ['O pão é digerido', 'Os nutrientes passam para o sangue', 'O sangue leva os nutrientes às células', 'As células liberam a energia'], e: 'Primeiro a digestão transforma o pão em nutrientes. Eles passam para o sangue, que os leva às células. Lá, com o gás oxigênio, a energia é liberada.' },
      ],
    },

    /* ------------------------------------------------------------ 2 */
    {
      id: 'digestorio', icone: '🍽️', nome: 'Sistema digestório',
      intro: 'Hmm, hora do lanche! Cada mordida faz uma viagem longa dentro de você, com várias paradas. Bora seguir a comida por esse caminho?',
      resumo: [
        { t: 'O caminho do alimento', c: 'O alimento percorre o <b>tubo digestório</b> nesta ordem: <b>boca → faringe → esôfago → estômago → intestino delgado → intestino grosso → ânus</b>. No caminho, ele é quebrado em partes cada vez menores, até virar nutrientes que o corpo consegue aproveitar.' },
        { t: 'Começa na boca', c: 'A digestão <b>começa na boca</b>. Os <b>dentes</b> cortam e trituram (mastigação) e a <b>saliva</b> umedece o alimento e inicia a sua transformação. A língua ajuda a misturar e a empurrar. Depois de engolido, o alimento desce pela faringe e pelo <b>esôfago</b> até o estômago.' },
        { t: 'Estômago e intestino delgado', c: 'No <b>estômago</b>, o alimento é misturado com o <b>suco gástrico</b> e vira uma pasta. No <b>intestino delgado</b>, a digestão termina com a ajuda da <b>bile</b> (produzida pelo fígado) e do <b>suco pancreático</b> (produzido pelo pâncreas). É ali que os <b>nutrientes passam para o sangue</b>.' },
        { t: 'Intestino grosso', c: 'O que não foi aproveitado segue para o <b>intestino grosso</b>. Ele <b>absorve água</b> e forma as <b>fezes</b>, que são eliminadas pelo <b>ânus</b>.' },
        { t: 'Dois tipos de digestão', c: '<b>Digestão mecânica</b>: quebra o alimento em pedaços menores, sem mudar do que ele é feito. Exemplos: a mastigação e os movimentos do estômago.<br><b>Digestão química</b>: os sucos digestivos, como a saliva e o suco gástrico, transformam o alimento em substâncias mais simples.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Onde começa a digestão dos alimentos?', o: ['Na boca', 'No estômago', 'No esôfago', 'No intestino delgado'], e: 'Na boca, os dentes trituram o alimento e a saliva começa a transformá-lo. O estômago só entra em ação depois.' },
        { n: 1, t: 'mc', p: 'Qual órgão leva o alimento engolido até o estômago?', o: ['Esôfago', 'Traqueia', 'Intestino grosso', 'Fígado'], e: 'O esôfago é um tubo que empurra o alimento engolido até o estômago. A traqueia é o tubo por onde passa o ar.' },
        { n: 1, t: 'vf', p: 'Mastigar bem os alimentos ajuda na digestão.', r: true, e: 'Pedaços menores se misturam melhor com a saliva e com os sucos digestivos, o que facilita o trabalho do estômago e do intestino.' },
        { n: 1, t: 'ord', p: 'Coloque em ordem o caminho do alimento no corpo.', o: ['Boca', 'Esôfago', 'Estômago', 'Intestino delgado', 'Intestino grosso'], e: 'O alimento entra pela boca, desce pelo esôfago, é misturado no estômago, passa pelo intestino delgado e termina no intestino grosso.' },
        { n: 2, t: 'mc', p: 'Em qual órgão a maior parte dos nutrientes passa para o sangue?', o: ['Intestino delgado', 'Intestino grosso', 'Estômago', 'Esôfago'], e: 'No intestino delgado a digestão termina e a maior parte dos nutrientes atravessa a parede do intestino e entra no sangue.' },
        { n: 2, t: 'mc', p: 'Qual é a principal função do intestino grosso?', o: ['Absorver água e formar as fezes', 'Triturar os alimentos em pedaços', 'Produzir a bile e a saliva', 'Absorver a maior parte dos nutrientes'], e: 'O intestino grosso absorve a água do que sobrou da digestão e forma as fezes, que saem pelo ânus.' },
        { n: 2, t: 'lac', p: 'No estômago, o alimento é misturado com o suco ___ e vira uma pasta.', o: ['gástrico', 'pancreático', 'intestinal'], e: 'O suco gástrico é produzido pelo próprio estômago. Os movimentos do estômago misturam o alimento com esse suco até formar uma pasta.' },
        { n: 2, t: 'par', p: 'Ligue cada órgão ao que ele faz ou produz.', o: [['Dentes', 'Trituram o alimento'], ['Fígado', 'Produz a bile'], ['Intestino delgado', 'Absorve os nutrientes'], ['Estômago', 'Produz o suco gástrico']], e: 'Os dentes fazem a mastigação. O fígado produz a bile, o estômago produz o suco gástrico e é no intestino delgado que os nutrientes passam para o sangue.' },
        { n: 3, t: 'vf', p: 'O fígado e o pâncreas fazem parte do caminho por onde o alimento passa.', r: false, e: 'O alimento não passa por dentro deles. O fígado produz a bile e o pâncreas produz o suco pancreático, que são lançados no intestino delgado.' },
        { n: 3, t: 'mc', p: 'Qual destes é um exemplo de digestão mecânica?', o: ['Os dentes triturando o alimento', 'O suco gástrico agindo no estômago', 'A saliva transformando o alimento', 'O suco pancreático agindo no intestino'], e: 'Na digestão mecânica o alimento só é quebrado em pedaços menores, como na mastigação. Os sucos digestivos fazem a digestão química.' },
        { n: 3, t: 'mc', p: 'Uma parte do alimento não foi digerida nem absorvida pelo corpo. O que acontece com ela?', o: ['Vai para o intestino grosso e sai nas fezes', 'É filtrada pelos rins e sai na urina', 'Volta ao estômago para nova digestão', 'Fica guardada no fígado como reserva'], e: 'O que não é digerido nem absorvido segue para o intestino grosso, que retira a água e forma as fezes. A urina vem da filtragem do sangue.' },
      ],
    },

    /* ------------------------------------------------------------ 3 */
    {
      id: 'respiratorio', icone: '💨', nome: 'Sistema respiratório',
      intro: 'Respira fundo comigo... e solta! Você faz isso milhares de vezes por dia sem nem pensar. Vamos descobrir por onde o ar passa?',
      resumo: [
        { t: 'O caminho do ar', c: 'O ar entra pelas <b>cavidades nasais</b> (nariz) e segue por: <b>faringe → laringe → traqueia → brônquios → bronquíolos → alvéolos</b>. Os brônquios se ramificam dentro dos <b>pulmões</b>, onde ficam os bronquíolos e os alvéolos. Na saída, o ar faz o caminho inverso.' },
        { t: 'O nariz prepara o ar', c: 'Dentro do nariz, os <b>pelos</b> e o <b>muco</b> seguram poeira e microrganismos. O ar também é <b>aquecido</b> e <b>umedecido</b>. Por isso é melhor respirar pelo nariz do que pela boca.' },
        { t: 'Pulmões e alvéolos', c: 'Temos <b>dois pulmões</b>, protegidos pelas costelas. Dentro deles, os brônquios se dividem em tubos cada vez mais finos, os <b>bronquíolos</b>, que terminam em saquinhos minúsculos chamados <b>alvéolos</b>. São milhões de alvéolos!' },
        { t: 'Inspirar e expirar', c: 'Os pulmões não têm músculos próprios. Quem os movimenta é o <b>diafragma</b>, um músculo que fica abaixo deles, com a ajuda dos músculos entre as costelas.<br><b>Inspiração</b>: o diafragma contrai e desce; os pulmões se enchem de ar.<br><b>Expiração</b>: o diafragma relaxa e sobe; o ar sai.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'O que protege os pulmões dentro do peito?', o: ['As costelas', 'O crânio', 'Os ossos da bacia', 'Os ossos do braço'], e: 'Os pulmões ficam dentro do peito. As costelas formam uma espécie de gaiola ao redor deles e do coração.' },
        { n: 1, t: 'mc', p: 'Qual é o principal músculo dos movimentos da respiração?', o: ['Diafragma', 'Coração', 'Estômago', 'Língua'], e: 'O diafragma fica abaixo dos pulmões. Quando ele contrai e desce, o ar entra; quando relaxa e sobe, o ar sai.' },
        { n: 1, t: 'vf', p: 'Os pelos e o muco do nariz ajudam a filtrar o ar que respiramos.', r: true, e: 'Eles seguram poeira e microrganismos, impedindo que boa parte dessa sujeira chegue aos pulmões.' },
        { n: 1, t: 'mc', p: 'Como se chamam os saquinhos minúsculos que ficam no fim dos bronquíolos?', o: ['Alvéolos', 'Brônquios', 'Ureteres', 'Capilares'], e: 'Os alvéolos são saquinhos muito pequenos no fim dos bronquíolos. Existem milhões deles dentro dos pulmões.' },
        { n: 2, t: 'ord', p: 'Coloque em ordem o caminho do ar na inspiração.', o: ['Cavidades nasais', 'Faringe', 'Laringe', 'Traqueia', 'Brônquios'], e: 'O ar entra pelas cavidades nasais e passa pela faringe, pela laringe e pela traqueia. Depois segue pelos brônquios para dentro dos pulmões.' },
        { n: 2, t: 'mc', p: 'O que acontece com o diafragma quando inspiramos?', o: ['Contrai e desce', 'Relaxa e sobe', 'Fica parado', 'Enche-se de ar'], e: 'Na inspiração o diafragma contrai e desce. Isso abre espaço no peito e os pulmões se enchem de ar.' },
        { n: 2, t: 'lac', p: 'Depois da laringe, o ar passa por um tubo chamado ___, que se divide em dois brônquios.', o: ['traqueia', 'esôfago', 'faringe'], e: 'A traqueia é o tubo que leva o ar da laringe até os brônquios. O esôfago fica atrás dela e leva o alimento, não o ar.' },
        { n: 2, t: 'vf', p: 'Os pulmões têm músculos próprios e se enchem de ar sozinhos.', r: false, e: 'Os pulmões não têm músculos próprios. Eles se enchem e se esvaziam por causa do diafragma e dos músculos que ficam entre as costelas.' },
        { n: 3, t: 'mc', p: 'Por que respirar pelo nariz é melhor do que respirar pela boca?', o: ['O nariz filtra, aquece e umedece o ar', 'O nariz leva o ar direto para o sangue', 'Pela boca o ar não chega aos pulmões', 'O nariz retira o gás carbônico do ar'], e: 'No nariz, os pelos e o muco seguram a poeira, e o ar é aquecido e umedecido. Pela boca, o ar chega aos pulmões sem esse preparo.' },
        { n: 3, t: 'par', p: 'Ligue cada parte do sistema respiratório à sua descrição.', o: [['Nariz', 'Filtra e aquece o ar'], ['Traqueia', 'Tubo que leva aos brônquios'], ['Alvéolos', 'Saquinhos no fim do caminho'], ['Diafragma', 'Músculo abaixo dos pulmões']], e: 'O nariz prepara o ar, a traqueia o conduz até os brônquios, os alvéolos ficam no fim do caminho e o diafragma é o músculo que move a respiração.' },
        { n: 3, t: 'mc', p: 'O que acontece durante a expiração?', o: ['O diafragma relaxa e sobe, e o ar sai', 'O diafragma contrai e desce, e o ar entra', 'Os pulmões contraem seus próprios músculos', 'A traqueia se fecha e o ar fica preso'], e: 'Na expiração o diafragma relaxa e sobe. O espaço no peito diminui e o ar é empurrado para fora dos pulmões.' },
      ],
    },

    /* ------------------------------------------------------------ 4 */
    {
      id: 'trocas-gasosas', icone: '🔄', nome: 'Como ocorre a respiração: trocas gasosas',
      intro: 'O ar entra, o ar sai... mas ele não sai igual! Lá no fundo dos pulmões acontece uma troca secreta. Eu fui farejar e descobri tudo.',
      resumo: [
        { t: 'Onde a troca acontece', c: 'As <b>trocas gasosas</b> acontecem nos <b>alvéolos</b>, os saquinhos minúsculos no fim dos bronquíolos. Cada alvéolo é envolvido por vasos sanguíneos muito finos, os <b>capilares</b>. As paredes dos alvéolos e dos capilares são tão finas que os gases conseguem atravessá-las.' },
        { t: 'O que é trocado', c: 'O <b>gás oxigênio</b> passa do ar dos alvéolos para o <b>sangue</b>. Ao mesmo tempo, o <b>gás carbônico</b> passa do sangue para o ar dos alvéolos e sai do corpo na expiração. Entra um, sai o outro: por isso se chama <b>troca</b>.' },
        { t: 'Para onde vai o gás oxigênio', c: 'O sangue leva o gás oxigênio até as <b>células</b> de todo o corpo. Nas células, ele é usado para liberar a <b>energia</b> dos nutrientes. Nesse processo forma-se <b>gás carbônico</b>, que o sangue leva de volta aos pulmões.' },
        { t: 'Ar que entra, ar que sai', c: 'O <b>ar expirado</b> tem <b>menos gás oxigênio</b>, <b>mais gás carbônico</b> e <b>mais vapor de água</b> que o ar inspirado. Mas atenção: ele ainda contém gás oxigênio, porque o corpo não usa todo o que entra. Sopre em um espelho: o embaçado é o vapor de água!' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Em que parte do sistema respiratório acontecem as trocas gasosas?', o: ['Nos alvéolos', 'Na traqueia', 'Na laringe', 'Nas cavidades nasais'], e: 'É nos alvéolos, dentro dos pulmões, que os gases passam entre o ar e o sangue. As outras partes conduzem e preparam o ar, mas nelas não há troca de gases.' },
        { n: 1, t: 'mc', p: 'Qual gás passa do ar para o sangue nos alvéolos?', o: ['Gás oxigênio', 'Gás carbônico', 'Gás nitrogênio', 'Vapor de água'], e: 'O gás oxigênio do ar atravessa a parede dos alvéolos e entra no sangue, que o leva para o corpo todo.' },
        { n: 1, t: 'vf', p: 'O gás carbônico produzido no corpo sai pelos pulmões quando expiramos.', r: true, e: 'O sangue traz o gás carbônico das células até os pulmões. Nos alvéolos ele passa para o ar e sai na expiração.' },
        { n: 1, t: 'mc', p: 'Depois de passar para o sangue, para onde o gás oxigênio é levado?', o: ['Para as células de todo o corpo', 'Apenas para o estômago e o intestino', 'De volta para as cavidades nasais', 'Para a bexiga, junto com a urina'], e: 'O sangue distribui o gás oxigênio para as células do corpo inteiro, que precisam dele para liberar energia.' },
        { n: 2, t: 'lac', p: 'Nas trocas gasosas, o gás ___ passa do sangue para o ar dos alvéolos.', o: ['carbônico', 'oxigênio', 'nitrogênio'], e: 'O gás carbônico faz o caminho contrário ao do gás oxigênio: sai do sangue, passa para o ar dos alvéolos e é eliminado na expiração.' },
        { n: 2, t: 'mc', p: 'Comparado com o ar que inspiramos, o ar que expiramos tem:', o: ['mais gás carbônico e mais vapor de água', 'mais gás oxigênio e menos vapor de água', 'a mesma quantidade de todos os gases', 'somente gás carbônico e nenhum outro gás'], e: 'O corpo retira parte do gás oxigênio do ar e devolve gás carbônico e vapor de água. Por isso o ar expirado é diferente do inspirado.' },
        { n: 2, t: 'vf', p: 'O ar que expiramos não tem mais nenhum gás oxigênio.', r: false, e: 'O corpo não usa todo o gás oxigênio que entra. O ar expirado tem menos gás oxigênio que o inspirado, mas ainda tem.' },
        { n: 2, t: 'par', p: 'Ligue cada estrutura ao que ela é ou faz.', o: [['Alvéolos', 'Saquinhos onde ocorre a troca'], ['Capilares', 'Vasos muito finos com sangue'], ['Células', 'Usam o gás oxigênio']], e: 'A troca acontece entre o ar dos alvéolos e o sangue dos capilares que os envolvem. Depois, o sangue leva o gás oxigênio para as células usarem.' },
        { n: 3, t: 'ord', p: 'Coloque em ordem a viagem do gás oxigênio pelo corpo.', o: ['Entra pelo nariz com o ar', 'Chega aos alvéolos', 'Passa para o sangue', 'É levado até as células', 'É usado para liberar energia'], e: 'O gás oxigênio entra com o ar, chega aos alvéolos, passa para o sangue e é levado às células, onde ajuda a liberar a energia dos nutrientes.' },
        { n: 3, t: 'mc', p: 'Por que os gases conseguem passar entre os alvéolos e o sangue?', o: ['Porque as paredes dos alvéolos e capilares são muito finas', 'Porque o diafragma empurra os gases para dentro das veias', 'Porque os alvéolos têm furos grandes e sempre abertos', 'Porque o sangue entra e enche os alvéolos por dentro'], e: 'As paredes dos alvéolos e dos capilares são finíssimas. Os gases atravessam essas paredes, mas o sangue continua dentro dos vasos.' },
        { n: 3, t: 'mc', p: 'Como está o sangue que sai dos pulmões, comparado com o sangue que chegou a eles?', o: ['Com mais gás oxigênio e menos gás carbônico', 'Com menos gás oxigênio e mais gás carbônico', 'Sem nenhum gás, pois todos ficaram no ar', 'Igual, pois nada muda dentro dos pulmões'], e: 'Nos pulmões o sangue recebe gás oxigênio e entrega gás carbônico. Por isso ele sai de lá com mais gás oxigênio e menos gás carbônico.' },
      ],
    },

    /* ------------------------------------------------------------ 5 */
    {
      id: 'circulatorio', icone: '❤️', nome: 'Sistema circulatório sanguíneo',
      intro: 'Coloca a mão no peito: tum-tum, tum-tum! É o seu coração trabalhando sem parar. O meu bate ainda mais rápido quando vejo um novelo de lã.',
      resumo: [
        { t: 'Coração, a bomba do corpo', c: 'O <b>coração</b> é um órgão formado por <b>músculo</b>, do tamanho aproximado de um punho fechado, que fica no peito, entre os pulmões. Ele funciona como uma <b>bomba</b>: contrai e relaxa sem parar, empurrando o sangue para o corpo todo.' },
        { t: 'Os vasos sanguíneos', c: '<b>Artérias</b>: levam o sangue que <b>sai do coração</b> para o corpo.<br><b>Veias</b>: trazem o sangue <b>de volta ao coração</b>.<br><b>Capilares</b>: vasos finíssimos que ligam artérias e veias; é neles que acontecem as <b>trocas</b> entre o sangue e as células.' },
        { t: 'O que o sangue transporta', c: 'O sangue leva <b>gás oxigênio</b> e <b>nutrientes</b> para as células. Na volta, recolhe <b>gás carbônico</b> e outros <b>resíduos</b>, que serão eliminados pelos pulmões e pelos rins.' },
        { t: 'Do que o sangue é feito', c: '<b>Plasma</b>: parte líquida, formada principalmente por água.<br><b>Glóbulos vermelhos</b>: transportam o gás oxigênio e dão a cor ao sangue.<br><b>Glóbulos brancos</b>: defendem o corpo contra microrganismos.<br><b>Plaquetas</b>: ajudam a estancar sangramentos (coagulação).' },
        { t: 'Batimentos e pulsação', c: 'Cada contração do coração é um <b>batimento</b>. Dá para sentir no pulso ou no pescoço: é a <b>pulsação</b>. No <b>exercício físico</b>, os músculos precisam de mais gás oxigênio e nutrientes, então o coração bate <b>mais rápido</b>.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Qual órgão bombeia o sangue para todo o corpo?', o: ['Coração', 'Pulmão', 'Rim', 'Fígado'], e: 'O coração funciona como uma bomba: a cada batimento, ele empurra o sangue pelos vasos sanguíneos.' },
        { n: 1, t: 'mc', p: 'O coração é formado principalmente por:', o: ['músculo', 'osso', 'gordura', 'cartilagem'], e: 'O coração é um músculo que contrai e relaxa sem parar, e sem que a gente precise pensar nisso.' },
        { n: 1, t: 'vf', p: 'Quando fazemos exercício físico, o coração bate mais rápido.', r: true, e: 'No exercício os músculos precisam de mais gás oxigênio e nutrientes. O coração acelera para o sangue entregar tudo mais depressa.' },
        { n: 1, t: 'mc', p: 'O que o sangue leva para as células do corpo?', o: ['Gás oxigênio e nutrientes', 'Gás carbônico e urina', 'Saliva e suco gástrico', 'Ar e alimentos inteiros'], e: 'O sangue entrega às células o gás oxigênio que veio dos pulmões e os nutrientes que vieram da digestão.' },
        { n: 2, t: 'mc', p: 'Qual é a diferença entre artérias e veias?', o: ['Artérias saem do coração; veias voltam a ele', 'Artérias voltam ao coração; veias saem dele', 'Artérias levam ar; veias levam sangue', 'Artérias ficam nas pernas; veias, nos braços'], e: 'As artérias levam o sangue do coração para o corpo. As veias fazem o caminho de volta, trazendo o sangue ao coração.' },
        { n: 2, t: 'lac', p: 'Os vasos sanguíneos mais finos, onde acontecem as trocas com as células, são os ___.', o: ['capilares', 'ureteres', 'brônquios'], e: 'Os capilares são tão finos que o gás oxigênio e os nutrientes passam do sangue para as células, e os resíduos passam das células para o sangue.' },
        { n: 2, t: 'par', p: 'Ligue cada componente do sangue ao seu papel.', o: [['Plasma', 'Parte líquida do sangue'], ['Glóbulos vermelhos', 'Transportam gás oxigênio'], ['Glóbulos brancos', 'Defendem o corpo'], ['Plaquetas', 'Ajudam na coagulação']], e: 'O plasma é a parte líquida. Os glóbulos vermelhos levam o gás oxigênio, os brancos fazem a defesa e as plaquetas ajudam a parar sangramentos.' },
        { n: 2, t: 'vf', p: 'O coração só bate quando estamos acordados; durante o sono ele para e descansa.', r: false, e: 'O coração bate o tempo todo, de dia e de noite. Durante o sono ele apenas bate um pouco mais devagar.' },
        { n: 3, t: 'mc', p: 'Por que o coração bate mais rápido durante uma corrida?', o: ['Os músculos precisam de mais gás oxigênio e nutrientes', 'O sangue fica mais grosso e difícil de bombear', 'Os pulmões param e o coração trabalha por eles', 'O coração precisa esfriar o corpo com o vento'], e: 'Músculos em atividade gastam mais energia. O coração acelera para o sangue levar mais gás oxigênio e nutrientes até eles.' },
        { n: 3, t: 'mc', p: 'O sangue que volta dos órgãos para o coração traz o que para ser eliminado?', o: ['Gás carbônico e outros resíduos', 'Gás oxigênio e nutrientes', 'Alimentos ainda não digeridos', 'Ar filtrado pelo nariz'], e: 'Depois de entregar gás oxigênio e nutrientes, o sangue recolhe o gás carbônico e outros resíduos das células para o corpo eliminar.' },
        { n: 3, t: 'ord', p: 'Coloque em ordem uma volta do sangue pelo corpo.', o: ['Sai do coração', 'Segue pelas artérias', 'Passa pelos capilares', 'Volta pelas veias', 'Chega de novo ao coração'], e: 'O coração empurra o sangue pelas artérias. Nos capilares acontecem as trocas com as células, e as veias trazem o sangue de volta.' },
      ],
    },

    /* ------------------------------------------------------------ 6 */
    {
      id: 'urinario', icone: '💧', nome: 'O corpo elimina substâncias: sistema urinário',
      intro: 'Depois de aproveitar o que é bom, o corpo precisa jogar fora o que sobra. Até eu tenho a minha caixinha de areia! Vamos ver como funciona a sua estação de limpeza?',
      resumo: [
        { t: 'O que é excreção', c: '<b>Excreção</b> é a eliminação dos <b>resíduos</b> que as células produzem e que fariam mal se ficassem no corpo. O sangue recolhe esses resíduos. O <b>gás carbônico</b> sai pelos pulmões; outros resíduos, como a <b>ureia</b>, saem na <b>urina</b>.' },
        { t: 'Os rins filtram o sangue', c: 'Temos <b>dois rins</b>, na parte de trás do abdome, um de cada lado da coluna, com formato de grão de feijão. Eles <b>filtram o sangue</b>: retiram os resíduos e o excesso de água e sais, e devolvem ao sangue o que o corpo ainda precisa. Assim se forma a <b>urina</b>.' },
        { t: 'O caminho da urina', c: '<b>Rins</b> (formam a urina) → <b>ureteres</b> (dois tubos que levam a urina) → <b>bexiga</b> (guarda a urina) → <b>uretra</b> (canal por onde a urina sai do corpo).' },
        { t: 'Urina, suor e fezes', c: 'A <b>urina</b> é formada por água e resíduos, como a ureia e sais. O <b>suor</b> também elimina água e sais, e ajuda a refrescar o corpo. Já as <b>fezes</b> são outra coisa: são restos de alimento <b>não digeridos</b>, que nunca passaram pelo sangue.' },
        { t: 'Beba água!', c: 'Beber <b>água</b> ajuda os rins a trabalhar e repõe o que perdemos na urina e no suor. Uma pista: urina bem <b>clara</b> costuma indicar boa hidratação; urina muito <b>escura</b> pode ser sinal de que falta água.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Quais órgãos filtram o sangue e formam a urina?', o: ['Rins', 'Pulmões', 'Intestinos', 'Ureteres'], e: 'Os dois rins filtram o sangue, retirando resíduos e o excesso de água. O que eles retiram forma a urina.' },
        { n: 1, t: 'mc', p: 'Onde a urina fica guardada antes de sair do corpo?', o: ['Na bexiga', 'Nos rins', 'No estômago', 'No intestino grosso'], e: 'A bexiga é como uma bolsa que vai se enchendo de urina. Quando está cheia, sentimos vontade de ir ao banheiro.' },
        { n: 1, t: 'vf', p: 'Beber água ajuda os rins a funcionar bem.', r: true, e: 'A água repõe o que o corpo perde na urina e no suor e ajuda os rins a eliminar os resíduos do sangue.' },
        { n: 1, t: 'ord', p: 'Coloque em ordem o caminho da urina.', o: ['Rins', 'Ureteres', 'Bexiga', 'Uretra'], e: 'A urina se forma nos rins, desce pelos ureteres, fica guardada na bexiga e sai do corpo pela uretra.' },
        { n: 2, t: 'mc', p: 'Do que a urina é formada, principalmente?', o: ['Água e resíduos, como a ureia', 'Restos de alimentos não digeridos', 'Gás carbônico e gás oxigênio', 'Sangue e suco gástrico'], e: 'A urina é quase toda água, com resíduos retirados do sangue, como a ureia, e sais minerais em excesso.' },
        { n: 2, t: 'lac', p: 'Os dois tubos que levam a urina dos rins até a bexiga são os ___.', o: ['ureteres', 'bronquíolos', 'capilares'], e: 'Cada rim tem um ureter, um tubo fino que leva a urina até a bexiga. Não confunda com a uretra, por onde a urina sai do corpo.' },
        { n: 2, t: 'mc', p: 'Qual destes também elimina água e sais minerais, só que pela pele?', o: ['Suor', 'Bile', 'Saliva', 'Plasma'], e: 'O suor sai pela pele, levando água e sais minerais. Ele também ajuda a refrescar o corpo quando está quente.' },
        { n: 2, t: 'vf', p: 'As fezes são formadas pelos rins a partir da filtragem do sangue.', r: false, e: 'O que vem da filtragem do sangue é a urina. As fezes são restos de alimentos não digeridos e se formam no intestino grosso.' },
        { n: 3, t: 'mc', p: 'Qual é a diferença entre os ureteres e a uretra?', o: ['Ureteres levam a urina à bexiga; a uretra leva para fora', 'Ureteres guardam a urina; a uretra filtra o sangue', 'A uretra leva a urina à bexiga; os ureteres levam para fora', 'Não há diferença: são dois nomes do mesmo tubo'], e: 'Os dois ureteres ligam os rins à bexiga. A uretra é um canal só, que leva a urina da bexiga para fora do corpo.' },
        { n: 3, t: 'mc', p: 'Em um dia quente, você suou muito e bebeu pouca água. Como a urina tende a ficar?', o: ['Mais escura e em menor quantidade', 'Mais clara e em maior quantidade', 'Igual à de qualquer outro dia', 'Sem nenhuma água em sua composição'], e: 'Com pouca água no corpo, os rins economizam: a urina sai em menor quantidade e mais concentrada, por isso mais escura. É um aviso para beber água.' },
        { n: 3, t: 'par', p: 'Ligue cada órgão do sistema urinário à sua função.', o: [['Rins', 'Filtram o sangue'], ['Ureteres', 'Levam a urina à bexiga'], ['Bexiga', 'Armazena a urina'], ['Uretra', 'Leva a urina para fora']], e: 'Os rins filtram o sangue e formam a urina, os ureteres a conduzem até a bexiga, que a armazena, e a uretra a leva para fora do corpo.' },
      ],
    },

    /* ------------------------------------------------------------ 7 */
    {
      id: 'integrados', icone: '🧩', nome: 'Sistemas integrados do corpo',
      intro: 'Sozinho, eu não alcanço o pote de biscoitos. Com a turma ajudando, alcanço! No seu corpo é igual: nenhum sistema trabalha sozinho. A Professora Clara me mostrou como eles formam um time.',
      resumo: [
        { t: 'Um time de sistemas', c: 'Nenhum sistema do corpo funciona sozinho. <b>Digestório</b>, <b>respiratório</b>, <b>circulatório</b> e <b>urinário</b> trabalham <b>juntos</b> para que cada célula receba o que precisa e se livre do que sobra. Esse trabalho em conjunto é a <b>nutrição</b> do corpo.' },
        { t: 'Quem entrega o quê', c: 'O <b>sistema digestório</b> fornece os <b>nutrientes</b>.<br>O <b>sistema respiratório</b> fornece o <b>gás oxigênio</b>.<br>O <b>sistema circulatório</b> transporta os dois, pelo sangue, até as <b>células</b>.<br>Nas células, nutrientes e gás oxigênio liberam <b>energia</b>.' },
        { t: 'Quem faz a limpeza', c: 'Ao liberar energia, as células produzem resíduos. O sangue recolhe tudo: o <b>gás carbônico</b> vai para os pulmões e sai na <b>expiração</b> (sistema respiratório); a <b>ureia</b> e outros resíduos vão para os rins e saem na <b>urina</b> (sistema urinário).' },
        { t: 'O time em ação: exercício', c: 'Quando você corre, os músculos gastam mais energia. Por isso a <b>respiração acelera</b> (entra mais gás oxigênio e sai mais gás carbônico) e o <b>coração bate mais rápido</b> (o sangue entrega tudo mais depressa). Depois vêm a <b>fome</b> e a <b>sede</b>: é hora de repor nutrientes e água.' },
        { t: 'Se um falha, todos sentem', c: 'Como os sistemas dependem uns dos outros, um problema em um deles afeta o corpo todo. Sem o sangue circulando, por exemplo, os nutrientes e o gás oxigênio não chegariam às células. Por isso cuidar da saúde é cuidar do <b>corpo inteiro</b>.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Qual sistema retira dos alimentos os nutrientes de que o corpo precisa?', o: ['Sistema digestório', 'Sistema respiratório', 'Sistema urinário', 'Sistema circulatório'], e: 'O sistema digestório transforma os alimentos em nutrientes. Depois, o sistema circulatório transporta esses nutrientes pelo corpo.' },
        { n: 1, t: 'vf', p: 'Cada sistema do corpo funciona sozinho, sem depender dos outros.', r: false, e: 'Os sistemas dependem uns dos outros. O digestório e o respiratório, por exemplo, precisam do circulatório para levar o que obtêm até as células.' },
        { n: 1, t: 'mc', p: 'Onde é liberada a energia que o corpo usa?', o: ['Nas células', 'No estômago', 'Na bexiga', 'Na traqueia'], e: 'Os nutrientes e o gás oxigênio chegam pelo sangue a cada célula. É dentro das células que a energia é liberada.' },
        { n: 1, t: 'mc', p: 'Durante uma corrida, o que acontece com a respiração e com os batimentos do coração?', o: ['Os dois ficam mais rápidos', 'Os dois ficam mais lentos', 'Só a respiração muda', 'Nenhum dos dois muda'], e: 'Os músculos precisam de mais energia. A respiração acelera para trazer mais gás oxigênio e o coração acelera para entregá-lo mais depressa.' },
        { n: 2, t: 'par', p: 'Ligue cada sistema à sua principal tarefa.', o: [['Digestório', 'Fornece nutrientes'], ['Respiratório', 'Fornece gás oxigênio'], ['Circulatório', 'Transporta pelo sangue'], ['Urinário', 'Elimina a ureia na urina']], e: 'O digestório fornece nutrientes, o respiratório fornece gás oxigênio, o circulatório transporta tudo e o urinário elimina resíduos na urina.' },
        { n: 2, t: 'lac', p: 'O gás carbônico produzido nas células é levado pelo ___ até os pulmões.', o: ['sangue', 'alimento', 'suor'], e: 'O sangue recolhe o gás carbônico das células e o leva aos pulmões, onde ele passa para o ar e sai na expiração.' },
        { n: 2, t: 'mc', p: 'Quais são os dois sistemas que eliminam resíduos produzidos pelas células?', o: ['Respiratório e urinário', 'Digestório e circulatório', 'Digestório e respiratório', 'Urinário e digestório'], e: 'O respiratório elimina o gás carbônico na expiração e o urinário elimina a ureia na urina. As fezes do digestório são restos de alimento, não resíduos das células.' },
        { n: 2, t: 'vf', p: 'O gás oxigênio que chega às células entrou pelo sistema respiratório e foi levado pelo sangue.', r: true, e: 'O sistema respiratório capta o gás oxigênio do ar e o sistema circulatório o transporta até as células. É um trabalho em equipe.' },
        { n: 3, t: 'ord', p: 'Coloque em ordem o caminho do gás carbônico até sair do corpo.', o: ['É produzido nas células', 'Passa para o sangue', 'É levado até os pulmões', 'Passa para o ar dos alvéolos', 'Sai do corpo na expiração'], e: 'O gás carbônico se forma nas células, é recolhido pelo sangue, levado aos pulmões, passa para o ar dos alvéolos e sai quando expiramos.' },
        { n: 3, t: 'mc', p: 'Depois de correr bastante, por que sentimos fome e sede?', o: ['O corpo gastou nutrientes e perdeu água', 'O estômago encolheu durante a corrida', 'Os rins pararam de formar urina', 'O ar frio secou todo o sangue'], e: 'O exercício gasta a energia dos nutrientes e faz o corpo perder água pelo suor e pela respiração. Fome e sede avisam que é hora de repor.' },
        { n: 3, t: 'mc', p: 'Se o sangue parasse de circular, o que aconteceria com as células?', o: ['Ficariam sem nutrientes e sem gás oxigênio', 'Passariam a produzir o próprio alimento', 'Receberiam o ar direto dos pulmões', 'Continuariam funcionando normalmente'], e: 'É o sangue que leva nutrientes e gás oxigênio até as células e recolhe os resíduos. Sem circulação, os outros sistemas não conseguem ajudar.' },
      ],
    },
  ],
});
