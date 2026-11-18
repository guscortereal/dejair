/* Geografia — As grandes regiões brasileiras.
   Formato e regras: ver LEIA-ME.md nesta pasta. Em mc e lac, a opção certa é sempre a primeira. */
window.DEJAIR_CONTEUDO = window.DEJAIR_CONTEUDO || [];
window.DEJAIR_CONTEUDO.push({
  id: 'geografia', nome: 'Geografia', icone: '🗺️', cor: '#1F8A7D',
  unidade: 'As grandes regiões brasileiras',
  desc: 'Do Norte ao Sul: os estados, as paisagens, o povo e o trabalho de cada uma das cinco regiões do Brasil.',
  topicos: [

    /* ------------------------------------------------------------------ 1 */
    {
      id: 'regioes', icone: '🧭', nome: 'As grandes regiões brasileiras',
      intro: 'O Brasil é tão grande que nem com sete vidas eu daria a volta nele! Para estudar melhor o país, o IBGE juntou os estados em cinco grandes regiões. Vem comigo abrir o mapa.',
      resumo: [
        { t: 'Por que dividir o Brasil?', c: 'O Brasil é um país enorme e cheio de diferenças. Para <b>estudar, planejar e cuidar melhor</b> de cada parte, o <b>IBGE</b> (Instituto Brasileiro de Geografia e Estatística) agrupou os estados em <b>cinco grandes regiões</b>. Dividir um espaço em regiões se chama <b>regionalizar</b>.' },
        { t: 'Como as regiões foram formadas', c: 'O IBGE reuniu estados <b>vizinhos</b> e com <b>características parecidas</b>:<br>• <b>naturais</b>: clima, relevo, vegetação e rios;<br>• <b>sociais</b>: a população e seu modo de vida;<br>• <b>econômicas</b>: o trabalho e a produção.<br>Cada estado fica inteiro em uma só região.' },
        { t: 'As cinco regiões', c: '<b>Norte</b>: 7 estados.<br><b>Nordeste</b>: 9 estados.<br><b>Centro-Oeste</b>: 3 estados e o Distrito Federal.<br><b>Sudeste</b>: 4 estados.<br><b>Sul</b>: 3 estados.<br>Somando tudo: <b>26 estados</b> e <b>1 Distrito Federal</b>, onde fica Brasília, a capital do país.' },
        { t: 'Os recordes das regiões', c: '• A <b>maior em área</b> é a <b>Norte</b>.<br>• A <b>menor em área</b> é a <b>Sul</b>.<br>• A <b>mais populosa</b>, onde mora mais gente, é a <b>Sudeste</b>.<br>• A que tem <b>mais estados</b> é a <b>Nordeste</b>.<br>Repare: ser grande no mapa não quer dizer ter mais moradores!' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Em quantas grandes regiões o IBGE divide o Brasil?', o: ['Cinco', 'Três', 'Sete', 'Vinte e seis'], e: 'São cinco grandes regiões: Norte, Nordeste, Centro-Oeste, Sudeste e Sul. Vinte e seis é o número de estados.' },
        { n: 1, t: 'mc', p: 'Qual órgão fez a divisão oficial do Brasil em grandes regiões?', o: ['IBGE', 'Correios', 'Banco Central', 'Senado Federal'], e: 'O IBGE, Instituto Brasileiro de Geografia e Estatística, estuda o território e a população do Brasil. Foi ele que definiu as cinco grandes regiões.' },
        { n: 1, t: 'vf', p: 'O Brasil tem 26 estados e um Distrito Federal.', r: true, e: 'São 26 estados mais o Distrito Federal, onde fica Brasília. O Distrito Federal não é um estado.' },
        { n: 1, t: 'mc', p: 'Qual é a maior região do Brasil em área?', o: ['Norte', 'Sudeste', 'Sul', 'Nordeste'], e: 'A Região Norte ocupa quase metade do território brasileiro. Nela fica a maior parte da Floresta Amazônica.' },
        { n: 2, t: 'mc', p: 'Em qual região fica o Distrito Federal?', o: ['Centro-Oeste', 'Sudeste', 'Norte', 'Nordeste'], e: 'O Distrito Federal, onde está Brasília, fica no Centro-Oeste, junto com Goiás, Mato Grosso e Mato Grosso do Sul.' },
        { n: 2, t: 'lac', p: 'A Região ___ é a que tem mais estados: são nove.', o: ['Nordeste', 'Norte', 'Sudeste', 'Sul'], e: 'O Nordeste tem nove estados. Depois vem o Norte, com sete.' },
        { n: 2, t: 'vf', p: 'Um mesmo estado pode ficar dividido entre duas grandes regiões.', r: false, e: 'Cada estado pertence inteiro a uma só região. Os limites das regiões acompanham os limites dos estados.' },
        { n: 2, t: 'par', p: 'Ligue cada região ao seu recorde.', o: [['Norte', 'Maior em área'], ['Sul', 'Menor em área'], ['Sudeste', 'Mais populosa'], ['Nordeste', 'Tem mais estados']], e: 'O Norte é a maior região e o Sul, a menor. O Sudeste é onde mora mais gente, e o Nordeste é a região com mais estados.' },
        { n: 3, t: 'mc', p: 'Que critério o IBGE usou para reunir os estados em grandes regiões?', o: ['Semelhanças naturais, sociais e econômicas', 'A ordem alfabética dos nomes dos estados', 'A data em que cada estado foi criado', 'O número de cidades de cada estado'], e: 'Os estados de uma região são vizinhos e se parecem na natureza (clima, vegetação), na população e nas atividades econômicas.' },
        { n: 3, t: 'ord', p: 'Ordene as regiões da que tem MAIS estados para a que tem MENOS.', o: ['Nordeste', 'Norte', 'Sudeste', 'Sul'], e: 'Nordeste tem 9 estados, Norte tem 7, Sudeste tem 4 e Sul tem 3.' },
        { n: 3, t: 'mc', p: 'Quais regiões têm o mesmo número de estados?', o: ['Centro-Oeste e Sul', 'Norte e Nordeste', 'Sudeste e Sul', 'Norte e Sudeste'], e: 'Centro-Oeste e Sul têm três estados cada. A diferença é que no Centro-Oeste também fica o Distrito Federal.' },
      ],
    },

    /* ------------------------------------------------------------------ 2 */
    {
      id: 'norte', icone: '🌳', nome: 'Região Norte',
      intro: 'Vamos entrar na maior floresta tropical do mundo! Confesso que tanta água me deixa de pelo em pé, mas a Região Norte é bonita demais para eu ficar de fora.',
      resumo: [
        { t: 'Estados e capitais', c: 'São <b>7 estados</b>:<br>Acre – <b>Rio Branco</b><br>Amapá – <b>Macapá</b><br>Amazonas – <b>Manaus</b><br>Pará – <b>Belém</b><br>Rondônia – <b>Porto Velho</b><br>Roraima – <b>Boa Vista</b><br>Tocantins – <b>Palmas</b><br>É a <b>maior região</b> do Brasil em área.' },
        { t: 'Floresta, clima e rios', c: 'A <b>Floresta Amazônica</b> cobre a maior parte da região. O clima é <b>equatorial</b>: <b>quente e úmido</b>, com muita chuva. O <b>rio Amazonas</b> é o maior do mundo em volume de água. Ele e os rios que deságuam nele formam a <b>bacia Amazônica</b>.' },
        { t: 'Quem vive no Norte', c: 'Para um território tão grande, o Norte tem <b>poucos habitantes</b>: sobra espaço entre uma cidade e outra. É a região com a maior população <b>indígena</b> do país. Os <b>ribeirinhos</b> vivem à beira dos rios. Em muitos lugares, os rios são os caminhos, e o barco é o principal meio de transporte.' },
        { t: 'Trabalho e economia', c: 'O <b>extrativismo</b> é a retirada de produtos da natureza, como o <b>açaí</b>, a <b>castanha-do-pará</b> e o <b>látex</b> da seringueira, usado para fazer borracha. Em Manaus fica a <b>Zona Franca</b>, uma área com muitas <b>indústrias</b>, que fabricam eletrônicos e motos.' },
        { t: 'Cuidar da floresta', c: 'O <b>desmatamento</b> e as <b>queimadas</b> são grandes problemas: a floresta é derrubada para dar lugar a pastos, plantações e garimpos. Com isso, animais e plantas perdem seu lugar de viver, e os povos da floresta são prejudicados. Proteger a Amazônia é importante para o Brasil e para o mundo.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Qual floresta cobre a maior parte da Região Norte?', o: ['Floresta Amazônica', 'Mata Atlântica', 'Mata de Araucárias', 'Mata dos Cocais'], e: 'A Floresta Amazônica é a maior floresta tropical do mundo e ocupa a maior parte da Região Norte.' },
        { n: 1, t: 'mc', p: 'Como é o clima na maior parte da Região Norte?', o: ['Quente e úmido, com muita chuva', 'Frio e seco, com geadas', 'Quente e seco, com pouca chuva', 'Frio e úmido, com neve'], e: 'O clima equatorial é quente e úmido o ano todo. O calor e a chuva ajudam a floresta a ficar sempre verde.' },
        { n: 1, t: 'vf', p: 'O rio Amazonas é o maior rio do mundo em volume de água.', r: true, e: 'Nenhum outro rio do planeta carrega tanta água. Ele recebe as águas de muitos outros rios, que formam a bacia Amazônica.' },
        { n: 1, t: 'par', p: 'Ligue cada estado à sua capital.', o: [['Amazonas', 'Manaus'], ['Pará', 'Belém'], ['Tocantins', 'Palmas'], ['Acre', 'Rio Branco']], e: 'Manaus é a capital do Amazonas; Belém, do Pará; Palmas, do Tocantins; e Rio Branco, do Acre.' },
        { n: 2, t: 'mc', p: 'Qual destes estados faz parte da Região Norte?', o: ['Tocantins', 'Maranhão', 'Mato Grosso', 'Goiás'], e: 'O Tocantins é da Região Norte. O Maranhão fica no Nordeste; Mato Grosso e Goiás ficam no Centro-Oeste.' },
        { n: 2, t: 'lac', p: 'Retirar produtos da natureza, como o açaí e a castanha, é uma atividade chamada ___.', o: ['extrativismo', 'indústria', 'pecuária', 'comércio'], e: 'No extrativismo, as pessoas coletam o que a natureza oferece. Pecuária é criar animais, e indústria é fabricar produtos.' },
        { n: 2, t: 'vf', p: 'A Região Norte é a mais populosa do Brasil, com muitos habitantes por todo o território.', r: false, e: 'É o contrário: o Norte é a maior região em área, mas tem poucos habitantes para tanto espaço. A mais populosa é a Sudeste.' },
        { n: 2, t: 'mc', p: 'Por que o barco é tão importante para muitas comunidades da Região Norte?', o: ['Porque os rios servem de caminho', 'Porque quase não chove na região', 'Porque a região não tem cidades', 'Porque os carros são proibidos lá'], e: 'A região tem muitos rios grandes e, em vários lugares, poucas estradas. Por isso, pessoas e mercadorias viajam de barco.' },
        { n: 3, t: 'mc', p: 'O que é a Zona Franca de Manaus?', o: ['Uma área com muitas indústrias', 'Uma reserva de povos indígenas', 'Um porto só para barcos de pesca', 'Um parque de proteção da floresta'], e: 'Na Zona Franca de Manaus funcionam muitas fábricas, que produzem eletrônicos e motos e dão emprego a milhares de pessoas.' },
        { n: 3, t: 'par', p: 'Estas capitais confundem muita gente! Ligue cada estado à sua capital.', o: [['Rondônia', 'Porto Velho'], ['Roraima', 'Boa Vista'], ['Amapá', 'Macapá']], e: 'Porto Velho é a capital de Rondônia; Boa Vista, de Roraima; e Macapá, do Amapá.' },
        { n: 3, t: 'mc', p: 'Qual destas é uma consequência do desmatamento na Amazônia?', o: ['Animais e plantas perdem seu lugar de viver', 'A floresta volta a crescer mais depressa', 'Os rios ficam mais limpos e mais cheios', 'Os povos da floresta ganham mais espaço'], e: 'Quando a floresta é derrubada, os animais e as plantas que dependem dela ficam sem abrigo e sem alimento. Os povos da floresta também são prejudicados.' },
      ],
    },

    /* ------------------------------------------------------------------ 3 */
    {
      id: 'nordeste', icone: '⛵', nome: 'Região Nordeste',
      intro: 'Chegamos ao Nordeste, a região com mais estados e com o maior litoral do Brasil! Foi aqui que o país teve sua primeira capital. E eu já estou de olho num peixinho fresco.',
      resumo: [
        { t: 'Estados e capitais', c: 'São <b>9 estados</b>:<br>Maranhão – <b>São Luís</b> · Piauí – <b>Teresina</b><br>Ceará – <b>Fortaleza</b> · Rio Grande do Norte – <b>Natal</b><br>Paraíba – <b>João Pessoa</b> · Pernambuco – <b>Recife</b><br>Alagoas – <b>Maceió</b> · Sergipe – <b>Aracaju</b><br>Bahia – <b>Salvador</b>' },
        { t: 'Quatro sub-regiões', c: 'De leste para oeste:<br>• <b>Zona da Mata</b>: faixa do litoral, chuvosa, onde ficam muitas das maiores cidades.<br>• <b>Agreste</b>: faixa entre a Zona da Mata e o Sertão.<br>• <b>Sertão</b>: interior de clima <b>semiárido</b>, com pouca chuva.<br>• <b>Meio-Norte</b>: Maranhão e parte do Piauí, mais chuvoso, já perto da Amazônia.' },
        { t: 'Sertão, Caatinga e Velho Chico', c: 'No Sertão, o clima é <b>semiárido</b>: quente, com chuvas poucas e irregulares. Podem ocorrer longos períodos de <b>seca</b>. A vegetação é a <b>Caatinga</b>, com plantas que guardam água e perdem as folhas na estiagem. O <b>rio São Francisco</b>, o Velho Chico, não seca e leva água a cidades e plantações.' },
        { t: 'Trabalho e economia', c: 'Na Zona da Mata, planta-se <b>cana-de-açúcar</b> desde o período colonial. No sul da Bahia, destaca-se o <b>cacau</b>. As praias recebem visitantes do mundo inteiro, e o <b>turismo</b> gera muitos empregos. A região também tem indústrias, comércio, pesca e criação de animais.' },
        { t: 'História e cultura', c: '<b>Salvador</b>, na Bahia, foi a <b>primeira capital do Brasil</b>. A cultura nordestina reúne heranças indígenas, africanas e europeias. Dela fazem parte o <b>frevo</b>, o <b>forró</b>, a literatura de cordel e as grandes <b>festas juninas</b>.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Qual cidade foi a primeira capital do Brasil?', o: ['Salvador', 'Recife', 'Fortaleza', 'São Luís'], e: 'Salvador, na Bahia, foi a primeira capital do Brasil, ainda no período colonial.' },
        { n: 1, t: 'mc', p: 'Qual é o clima do Sertão nordestino?', o: ['Semiárido', 'Equatorial', 'Subtropical', 'Temperado'], e: 'O clima semiárido é quente e tem chuvas poucas e irregulares. Por isso, o Sertão pode passar por longos períodos de seca.' },
        { n: 1, t: 'vf', p: 'A Caatinga é a vegetação típica do Sertão nordestino.', r: true, e: 'As plantas da Caatinga são adaptadas à pouca chuva: muitas guardam água e perdem as folhas nos meses mais secos.' },
        { n: 1, t: 'mc', p: 'Qual destes ritmos faz parte da cultura do Nordeste?', o: ['Frevo', 'Tango', 'Valsa', 'Rock'], e: 'O frevo nasceu em Pernambuco e anima o Carnaval. O forró e as festas juninas também são marcas da cultura nordestina.' },
        { n: 2, t: 'par', p: 'Ligue cada estado à sua capital.', o: [['Ceará', 'Fortaleza'], ['Pernambuco', 'Recife'], ['Maranhão', 'São Luís'], ['Bahia', 'Salvador']], e: 'Fortaleza é a capital do Ceará; Recife, de Pernambuco; São Luís, do Maranhão; e Salvador, da Bahia.' },
        { n: 2, t: 'lac', p: 'O rio ___, chamado de Velho Chico, atravessa o Sertão sem secar.', o: ['São Francisco', 'Amazonas', 'Paraná', 'Paraguai'], e: 'O rio São Francisco corre o ano inteiro, mesmo na seca. Suas águas abastecem cidades e irrigam plantações.' },
        { n: 2, t: 'vf', p: 'Em todo o Nordeste quase não chove, do litoral ao interior.', r: false, e: 'A pouca chuva é característica do Sertão. A Zona da Mata, no litoral, é chuvosa, e o Meio-Norte também recebe bastante chuva.' },
        { n: 2, t: 'ord', p: 'Ordene estas sub-regiões do litoral para o interior.', o: ['Zona da Mata', 'Agreste', 'Sertão'], e: 'A Zona da Mata fica junto ao mar. Depois vem o Agreste, uma faixa de passagem, e mais para dentro fica o Sertão.' },
        { n: 3, t: 'mc', p: 'Qual produto é cultivado na Zona da Mata desde o período colonial?', o: ['Cana-de-açúcar', 'Soja', 'Erva-mate', 'Trigo'], e: 'A cana-de-açúcar é plantada no litoral nordestino há séculos. O solo fértil e as chuvas da Zona da Mata favorecem esse cultivo.' },
        { n: 3, t: 'par', p: 'Ligue cada sub-região à sua característica.', o: [['Zona da Mata', 'Litoral chuvoso'], ['Agreste', 'Entre a Mata e o Sertão'], ['Sertão', 'Clima semiárido'], ['Meio-Norte', 'Maranhão e parte do Piauí']], e: 'A Zona da Mata é o litoral chuvoso; o Agreste fica entre ela e o Sertão semiárido; e o Meio-Norte fica no Maranhão e em parte do Piauí.' },
        { n: 3, t: 'mc', p: 'Como muitas plantas da Caatinga resistem aos períodos de seca?', o: ['Guardam água e perdem as folhas', 'Crescem só dentro dos rios', 'Ficam verdes o ano inteiro', 'Dependem do frio do inverno'], e: 'Sem folhas, a planta perde menos água. Outras, como os cactos, guardam água no caule. Quando a chuva volta, a Caatinga fica verde de novo.' },
      ],
    },

    /* ------------------------------------------------------------------ 4 */
    {
      id: 'centro-oeste', icone: '🌾', nome: 'Região Centro-Oeste',
      intro: 'Chegamos ao coração do Brasil! Aqui ficam Brasília, a capital do país, e o Pantanal, onde vive a onça-pintada, uma prima minha bem maior do que eu.',
      resumo: [
        { t: 'Estados e capitais', c: 'São <b>3 estados</b> e o <b>Distrito Federal</b>:<br>Goiás – <b>Goiânia</b><br>Mato Grosso – <b>Cuiabá</b><br>Mato Grosso do Sul – <b>Campo Grande</b><br>Distrito Federal – <b>Brasília</b><br>O Distrito Federal <b>não é um estado</b>. O Centro-Oeste é a única região brasileira <b>sem litoral</b>: nenhuma parte dela é banhada pelo mar.' },
        { t: 'Brasília, a capital', c: '<b>Brasília</b> é a <b>capital do Brasil</b>. É uma cidade <b>planejada</b>: foi desenhada antes de ser construída, no centro do país. Foi inaugurada em <b>1960</b>, no governo de Juscelino Kubitschek. Antes dela, a capital era o Rio de Janeiro. Em Brasília fica a sede do governo federal.' },
        { t: 'Cerrado e Pantanal', c: 'O <b>Cerrado</b> tem árvores baixas, de troncos tortos e casca grossa, e muitas nascentes de rios. O <b>Pantanal</b>, em Mato Grosso e Mato Grosso do Sul, é a <b>maior planície alagável do mundo</b>: na época das chuvas, os rios transbordam e cobrem grandes áreas. Lá vivem onças, jacarés, capivaras e tuiuiús.' },
        { t: 'Um clima, duas estações', c: 'O clima é <b>tropical</b>, com duas estações bem marcadas: o <b>verão chuvoso</b> e o <b>inverno seco</b>. Na estação seca, passam-se meses quase sem chuva, o ar fica com pouca umidade e aumenta o risco de <b>queimadas</b>.' },
        { t: 'Trabalho e economia', c: 'A <b>agropecuária</b> é a principal atividade: grandes plantações de <b>soja</b>, <b>milho</b> e algodão e enormes criações de <b>gado</b>. Boa parte dessa produção é vendida para outros países. Mas o avanço das plantações e dos pastos já derrubou boa parte do Cerrado.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Qual é a principal atividade econômica do Centro-Oeste?', o: ['Agropecuária', 'Pesca no mar', 'Extração de petróleo', 'Turismo de praia'], e: 'A agropecuária reúne a agricultura (soja, milho) e a pecuária (gado). Como a região não tem litoral, não há pesca no mar nem praias de oceano.' },
        { n: 1, t: 'mc', p: 'Quais estados formam a Região Centro-Oeste?', o: ['Goiás, Mato Grosso e Mato Grosso do Sul', 'Goiás, Tocantins e Mato Grosso', 'Mato Grosso, Rondônia e Goiás', 'Minas Gerais, Goiás e Mato Grosso do Sul'], e: 'O Centro-Oeste tem três estados: Goiás, Mato Grosso e Mato Grosso do Sul. Além deles, há o Distrito Federal.' },
        { n: 1, t: 'vf', p: 'O Pantanal é a maior planície alagável do mundo.', r: true, e: 'Na época das chuvas, os rios do Pantanal transbordam e cobrem grandes áreas. Na seca, a água baixa e os campos reaparecem.' },
        { n: 1, t: 'par', p: 'Ligue cada lugar à sua capital.', o: [['Goiás', 'Goiânia'], ['Mato Grosso', 'Cuiabá'], ['Mato Grosso do Sul', 'Campo Grande'], ['Distrito Federal', 'Brasília']], e: 'Goiânia é a capital de Goiás; Cuiabá, de Mato Grosso; Campo Grande, de Mato Grosso do Sul. Brasília fica no Distrito Federal.' },
        { n: 2, t: 'mc', p: 'Em que ano Brasília foi inaugurada?', o: ['1960', '1500', '1822', '1988'], e: 'Brasília foi inaugurada em 1960, no governo de Juscelino Kubitschek. Antes disso, a capital do Brasil era o Rio de Janeiro.' },
        { n: 2, t: 'lac', p: 'O Centro-Oeste é a única região brasileira que não tem ___.', o: ['litoral', 'rios', 'capitais', 'fazendas'], e: 'Nenhum estado do Centro-Oeste é banhado pelo mar. Todas as outras regiões têm pelo menos um estado com litoral.' },
        { n: 2, t: 'vf', p: 'No Centro-Oeste chove a mesma quantidade o ano inteiro, sem estação seca.', r: false, e: 'O clima tropical da região tem duas estações bem marcadas: verão chuvoso e inverno seco, com meses quase sem chuva.' },
        { n: 2, t: 'mc', p: 'Como é a vegetação do Cerrado?', o: ['Árvores baixas de troncos tortos', 'Floresta alta, fechada e sempre úmida', 'Pinheiros adaptados ao frio', 'Só cactos e plantas com espinhos'], e: 'As árvores do Cerrado são baixas, com troncos tortos e casca grossa, que ajuda a proteger a planta do fogo e da seca.' },
        { n: 3, t: 'mc', p: 'Qual frase sobre o Distrito Federal está correta?', o: ['Não é um estado e abriga Brasília', 'É o maior estado do Centro-Oeste', 'É a capital do estado de Goiás', 'Fica na Região Sudeste do Brasil'], e: 'O Distrito Federal não é estado: é uma área especial, no Centro-Oeste, criada para abrigar Brasília, a capital do país.' },
        { n: 3, t: 'par', p: 'Ligue cada nome à sua descrição.', o: [['Cerrado', 'Árvores de troncos tortos'], ['Pantanal', 'Planície que alaga'], ['Brasília', 'Cidade planejada'], ['Soja', 'Produto agrícola']], e: 'O Cerrado tem árvores tortas; o Pantanal alaga na época das chuvas; Brasília foi planejada antes de ser construída; e a soja é o grande cultivo da região.' },
        { n: 3, t: 'mc', p: 'Por que o risco de queimadas aumenta no inverno do Centro-Oeste?', o: ['Porque é a estação seca, com pouca chuva', 'Porque é a estação em que mais chove', 'Porque neva e a vegetação congela', 'Porque os rios transbordam e alagam tudo'], e: 'No inverno seco, passam-se meses quase sem chuva. A vegetação resseca e o fogo se espalha com facilidade.' },
      ],
    },

    /* ------------------------------------------------------------------ 5 */
    {
      id: 'sudeste', icone: '🏙️', nome: 'Região Sudeste',
      intro: 'Segura o rabo, que agora o movimento é grande! O Sudeste é a região onde mora mais gente no Brasil, com cidades enormes e muitas fábricas. Eu prefiro olhar tudo lá do alto do telhado.',
      resumo: [
        { t: 'Estados e capitais', c: 'São <b>4 estados</b>:<br>São Paulo – <b>São Paulo</b><br>Rio de Janeiro – <b>Rio de Janeiro</b><br>Minas Gerais – <b>Belo Horizonte</b><br>Espírito Santo – <b>Vitória</b><br>Só <b>Minas Gerais</b> não tem litoral. É a região <b>mais populosa</b> do Brasil. A cidade do Rio de Janeiro já foi a capital do país.' },
        { t: 'Cidades e indústrias', c: 'O Sudeste é a região <b>mais industrializada</b> do Brasil, com fábricas de carros, alimentos, roupas, máquinas e muito mais. Tem grandes <b>metrópoles</b>, como São Paulo (a maior cidade do país), Rio de Janeiro e Belo Horizonte. Quase toda a população vive em <b>cidades</b>.' },
        { t: 'Riquezas de ontem e de hoje', c: 'O <b>café</b> foi a grande riqueza da região no passado, e o dinheiro que ele rendeu ajudou a construir ferrovias e fábricas. <b>Minas Gerais</b> se destaca na <b>mineração</b>: ouro no período colonial, minério de ferro hoje. No litoral, o <b>petróleo</b> é retirado do fundo do mar.' },
        { t: 'Mata Atlântica', c: 'A vegetação original era a <b>Mata Atlântica</b>, uma floresta que acompanhava o litoral. Com as plantações e o crescimento das cidades, ela foi <b>muito desmatada</b>: hoje resta só uma pequena parte, protegida em parques e reservas. O clima que predomina na região é o <b>tropical</b>.' },
        { t: 'Desafios das grandes cidades', c: 'Cidades muito grandes enfrentam <b>problemas urbanos</b>: <b>trânsito</b> intenso, <b>poluição</b> do ar e dos rios, enchentes e falta de <b>moradia</b> adequada para muitas famílias. Transporte público de qualidade, saneamento e áreas verdes ajudam a melhorar a vida de todos.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Quantos estados formam a Região Sudeste?', o: ['Quatro', 'Três', 'Sete', 'Nove'], e: 'São quatro: São Paulo, Rio de Janeiro, Minas Gerais e Espírito Santo.' },
        { n: 1, t: 'vf', p: 'O Sudeste é a região mais industrializada do Brasil.', r: true, e: 'Nenhuma outra região tem tantas fábricas. Elas produzem de alimentos e roupas a carros e máquinas.' },
        { n: 1, t: 'mc', p: 'Qual floresta cobria grande parte do Sudeste antes do desmatamento?', o: ['Mata Atlântica', 'Floresta Amazônica', 'Caatinga', 'Mata dos Cocais'], e: 'A Mata Atlântica acompanhava o litoral brasileiro. No Sudeste, quase toda ela deu lugar a plantações e cidades.' },
        { n: 1, t: 'par', p: 'Ligue cada estado à sua capital.', o: [['Minas Gerais', 'Belo Horizonte'], ['Espírito Santo', 'Vitória'], ['São Paulo', 'São Paulo']], e: 'Belo Horizonte é a capital de Minas Gerais, e Vitória, a do Espírito Santo. Em São Paulo, a capital tem o mesmo nome do estado.' },
        { n: 2, t: 'mc', p: 'Qual produto enriqueceu o Sudeste no passado e ajudou a pagar ferrovias e fábricas?', o: ['Café', 'Soja', 'Cacau', 'Erva-mate'], e: 'O café foi por muito tempo o principal produto que o Brasil vendia a outros países. Com esse dinheiro, surgiram ferrovias e indústrias.' },
        { n: 2, t: 'lac', p: 'O único estado do Sudeste que não é banhado pelo mar é ___.', o: ['Minas Gerais', 'São Paulo', 'Espírito Santo', 'Rio de Janeiro'], e: 'Minas Gerais fica no interior. São Paulo, Rio de Janeiro e Espírito Santo têm litoral.' },
        { n: 2, t: 'vf', p: 'A maior parte da população do Sudeste vive no campo.', r: false, e: 'Quase toda a população do Sudeste vive em cidades, muitas delas bem grandes, como São Paulo, Rio de Janeiro e Belo Horizonte.' },
        { n: 2, t: 'mc', p: 'De onde é retirado o petróleo no Sudeste?', o: ['Do fundo do mar, perto do litoral', 'Das montanhas de Minas Gerais', 'Das margens dos rios das capitais', 'Das áreas de Mata Atlântica'], e: 'O petróleo do Sudeste fica em rochas abaixo do fundo do mar. Grandes plataformas, instaladas no oceano, fazem a retirada.' },
        { n: 3, t: 'par', p: 'Ligue cada estado a uma informação sobre ele.', o: [['São Paulo', 'Tem a maior cidade do país'], ['Minas Gerais', 'Destaque na mineração'], ['Rio de Janeiro', 'Já teve a capital do Brasil']], e: 'A cidade de São Paulo é a maior do Brasil; Minas Gerais é rica em minérios; e a cidade do Rio de Janeiro foi a capital do país antes de Brasília.' },
        { n: 3, t: 'mc', p: 'Qual destes é um problema comum nas grandes metrópoles?', o: ['Trânsito intenso e poluição do ar', 'Falta de moradores nas cidades', 'Longos períodos de geada e neve', 'Poucas opções de comércio'], e: 'Com muita gente e muitos veículos no mesmo lugar, surgem congestionamentos e poluição. Falta de moradia e enchentes também são desafios.' },
        { n: 3, t: 'mc', p: 'Por que restou tão pouco da Mata Atlântica no Sudeste?', o: ['Deu lugar a plantações e cidades', 'Foi coberta pela água do mar', 'Secou por falta de chuva', 'Foi destruída por geadas fortes'], e: 'Durante séculos, a mata foi derrubada para abrir espaço para plantações, pastos e cidades. O que sobrou é protegido em parques e reservas.' },
      ],
    },

    /* ------------------------------------------------------------------ 6 */
    {
      id: 'sul', icone: '🌲', nome: 'Região Sul',
      intro: 'Pega o casaco! No Sul, o inverno é tão frio que às vezes o chão amanhece branquinho de geada. A Professora Clara me ensinou que é a menor região do Brasil, mas tem assunto de sobra.',
      resumo: [
        { t: 'Estados e capitais', c: 'São <b>3 estados</b>, de norte para sul:<br>Paraná – <b>Curitiba</b><br>Santa Catarina – <b>Florianópolis</b><br>Rio Grande do Sul – <b>Porto Alegre</b><br>É a <b>menor região</b> do Brasil em área. Faz fronteira com três países: Paraguai, Argentina e Uruguai.' },
        { t: 'O clima mais frio do país', c: 'O clima é <b>subtropical</b>, com verão quente e inverno frio. É no Sul que acontecem as <b>temperaturas mais baixas</b> do Brasil. No inverno, são comuns as <b>geadas</b>: uma camada fina de gelo que cobre as plantas e o chão. Nas áreas mais altas, às vezes chega a <b>nevar</b>.' },
        { t: 'Araucárias e Pampa', c: 'A <b>Mata de Araucárias</b> é formada pelo pinheiro-do-paraná, a árvore que dá o <b>pinhão</b>. Ela foi muito derrubada para a retirada de madeira. No Rio Grande do Sul fica o <b>Pampa</b>: campos de vegetação rasteira, muito usados para a criação de gado.' },
        { t: 'Povos e cultura', c: 'A partir do século XIX, o Sul recebeu muitos <b>imigrantes europeus</b>, principalmente <b>alemães</b>, <b>italianos</b> e <b>poloneses</b>. Eles deixaram marcas nas construções, nas festas e na comida. Povos indígenas e africanos também fazem parte dessa história. Da tradição <b>gaúcha</b> vêm o <b>chimarrão</b> e o churrasco.' },
        { t: 'Economia e paisagens', c: 'A região une <b>agropecuária</b> forte (soja, trigo, arroz, uva, aves, porcos e gado) e muitas <b>indústrias</b>. No Paraná ficam as <b>Cataratas do Iguaçu</b>, na fronteira com a Argentina, e a usina hidrelétrica de <b>Itaipu</b>, no rio Paraná, construída em parceria com o Paraguai.' },
      ],
      q: [
        { n: 1, t: 'mc', p: 'Quais estados formam a Região Sul?', o: ['Paraná, Santa Catarina e Rio Grande do Sul', 'São Paulo, Paraná e Santa Catarina', 'Paraná, Rio Grande do Sul e Mato Grosso do Sul', 'Santa Catarina, Rio Grande do Sul e São Paulo'], e: 'O Sul tem três estados: Paraná, Santa Catarina e Rio Grande do Sul. São Paulo é do Sudeste, e Mato Grosso do Sul, do Centro-Oeste.' },
        { n: 1, t: 'par', p: 'Ligue cada estado à sua capital.', o: [['Paraná', 'Curitiba'], ['Santa Catarina', 'Florianópolis'], ['Rio Grande do Sul', 'Porto Alegre']], e: 'Curitiba é a capital do Paraná; Florianópolis, de Santa Catarina; e Porto Alegre, do Rio Grande do Sul.' },
        { n: 1, t: 'vf', p: 'É na Região Sul que acontecem as temperaturas mais baixas do Brasil.', r: true, e: 'O clima subtropical do Sul tem invernos frios, com geadas. Nas áreas mais altas, às vezes chega a nevar.' },
        { n: 1, t: 'mc', p: 'Qual é o clima que predomina na Região Sul?', o: ['Subtropical', 'Equatorial', 'Semiárido', 'Tropical'], e: 'O clima subtropical tem verão quente e inverno frio. O equatorial é o do Norte, e o semiárido, o do Sertão nordestino.' },
        { n: 2, t: 'ord', p: 'Ordene os estados do Sul, do que fica mais ao norte para o que fica mais ao sul.', o: ['Paraná', 'Santa Catarina', 'Rio Grande do Sul'], e: 'O Paraná fica mais ao norte, Santa Catarina está no meio, e o Rio Grande do Sul é o estado mais ao sul do Brasil.' },
        { n: 2, t: 'lac', p: 'O ___ é uma bebida quente feita com erva-mate, tradição da cultura gaúcha.', o: ['chimarrão', 'guaraná', 'açaí', 'café'], e: 'O chimarrão é preparado com erva-mate e água quente, servido em uma cuia e tomado com uma bomba, que é um canudo de metal.' },
        { n: 2, t: 'vf', p: 'A Região Sul é a maior região do Brasil em área.', r: false, e: 'É o contrário: o Sul é a menor região em área, com apenas três estados. A maior é a Região Norte.' },
        { n: 2, t: 'mc', p: 'Quais povos europeus imigraram em grande número para o Sul?', o: ['Alemães, italianos e poloneses', 'Franceses, ingleses e gregos', 'Russos, suecos e noruegueses', 'Espanhóis, belgas e suíços'], e: 'Alemães, italianos e poloneses vieram em grande número a partir do século XIX. Suas tradições aparecem nas construções, nas festas e na comida.' },
        { n: 3, t: 'par', p: 'Ligue cada nome à sua descrição.', o: [['Mata de Araucárias', 'Pinheiros que dão pinhão'], ['Pampa', 'Campos para criar gado'], ['Itaipu', 'Usina hidrelétrica'], ['Geada', 'Camada fina de gelo']], e: 'A araucária é o pinheiro do pinhão; o Pampa são os campos gaúchos; Itaipu produz energia elétrica; e a geada é o gelo fino que cobre o chão no frio.' },
        { n: 3, t: 'mc', p: 'A usina de Itaipu foi construída pelo Brasil em parceria com qual país?', o: ['Paraguai', 'Argentina', 'Uruguai', 'Bolívia'], e: 'Itaipu fica no rio Paraná, na fronteira entre o Brasil e o Paraguai. Os dois países dividem a energia que ela produz.' },
        { n: 3, t: 'mc', p: 'Em qual estado ficam as Cataratas do Iguaçu?', o: ['Paraná', 'Santa Catarina', 'Rio Grande do Sul', 'Mato Grosso do Sul'], e: 'As Cataratas do Iguaçu ficam no Paraná, na fronteira com a Argentina. São um conjunto de grandes quedas de água do rio Iguaçu.' },
      ],
    },
  ],
});
