# Trilhas do Dejair

App de estudo em forma de jogo para alunos do 5º e do 6º ano. O gato **Dejair** conduz o aluno por trilhas de **História**, **Geografia** e **Ciências**: cada fase tem um resumo curto, um quiz de 8 questões com explicação a cada resposta e uma nota de 0 a 10. Cada matéria termina em um **Provão** de 12 questões, que dá a nota final.

Um único código serve aos três destinos: **iPhone/iPad** e **Android** (empacotado com Capacitor 8) e **navegador** (abre direto, sem instalar).

## O que tem na versão 1

| Matéria | Fases | Questões | Conteúdo |
| --- | --- | --- | --- |
| História | 9 | 99 | Cidadania; abolicionismo e fim da escravidão; pós-abolição; Proclamação da República; primeiros anos; República das Oligarquias; Vargas e o Estado Novo |
| Geografia | 6 | 66 | As grandes regiões; Norte; Nordeste; Centro-Oeste; Sudeste; Sul |
| Ciências | 7 | 77 | Nutrição e energia; sistemas digestório, respiratório, circulatório e urinário; trocas gasosas; integração dos sistemas |

Matemática e Português aparecem na tela inicial como "em breve".

- **Cinco tipos de questão:** múltipla escolha, verdadeiro ou falso, completar a frase, colocar em ordem e ligar os pares.
- **Gamificação:** estrelas por fase (nota 5, 7 e 9), XP e 8 níveis, sequência de dias, missão do dia, 16 conquistas e sardinhas para comprar acessórios e pelagens do Dejair.
- **Evolução do aluno:** gráfico das últimas notas, boletim por matéria, porcentagem de acertos. A fase seguinte prioriza as questões erradas da última vez.
- **Privacidade:** sem internet, sem cadastro, sem anúncios, sem compras e sem coleta de dados. Tudo fica no aparelho.

## De onde veio cada coisa

- **Tópicos:** a lista de conteúdos da avaliação da 3ª etapa do 5º ano (25/11 Geografia, 27/11 História, 30/11 Ciências). **As questões foram escritas a partir dos tópicos, não do livro nem do caderno**, que não estavam disponíveis. Elas cobrem o assunto no nível do 5º ano, mas a prova pode cobrar detalhes do livro que não estão aqui.
- **Método:** o da Professora Clara (repositório `profa-clara`): resumo curto, muita prática, do fácil ao desafio, explicação em toda resposta, sem cronômetro e sem punição por erro. O Dejair cita a Professora Clara nas falas.
- **Dejair:** desenhado do zero para este app (gato laranja rajado, em SVG), porque não havia registro dele nos repositórios acessíveis. A aparência padrão está em `www/js/dejair.js`, em `PELAGENS.laranja`; trocar as cores ali muda o mascote no app inteiro. Depois de mudar, rode `node testes/gerar-imagens.js` e `npx capacitor-assets generate` para refazer os ícones.
- **Revisão:** cada matéria passou por uma revisão factual independente. Nenhum erro de fato foi apontado; 16 questões ambíguas ou mal redigidas foram corrigidas.

## Usar hoje, sem loja

A pasta `www/` é um site estático completo. Para colocá-la no ar, ligue o GitHub Pages: no repositório, **Settings → Pages → Deploy from a branch**, ramo `main`, pasta `/ (root)`, **Save**. Em um ou dois minutos o app abre em <https://guscortereal.github.io/dejair/> e pode ir para a tela inicial do celular:

- **iPhone/iPad:** Safari → Compartilhar → **Adicionar à Tela de Início**.
- **Android:** Chrome → menu ⋮ → **Adicionar à tela inicial**.

Depois de aberta uma vez com internet, funciona offline. O progresso da versão web fica no navegador e **não passa** para o app da loja.

## Rodar no computador

```bash
npm install
```

```bash
npm run servir
```

Abra <http://localhost:8766>. Para ver como no celular, use o modo de dispositivo do navegador.

## Testes

```bash
npm run testar
```

Roda duas coisas:

- `testes/validar-conteudo.js`: confere a estrutura das 242 questões (tipos, níveis, tamanhos, opções repetidas).
- `testes/jogar.js`: abre o app num navegador em tamanho de celular e joga de verdade. Verifica os cinco tipos de questão, o cálculo da nota, estrelas, Provão, missão do dia, lojinha, conquistas, persistência do progresso e ausência de rolagem lateral em 320, 390 e 768 px. Precisa do Playwright.

**O que os testes não cobrem:** o app rodando em iPhone ou Android de verdade. Os projetos nativos foram gerados e configurados, mas não compilados (isso exige um Mac com Xcode e o Android Studio). Ver `PUBLICAR-NA-APP-STORE.md`, passo 4.

## Publicar

- **App Store:** passo a passo completo em [PUBLICAR-NA-APP-STORE.md](PUBLICAR-NA-APP-STORE.md).
- **Google Play:** resumo no fim do mesmo arquivo.

## Estrutura

| Caminho | Para que serve |
| --- | --- |
| `index.html` | Só redireciona para `www/`, para o endereço do GitHub Pages abrir o app |
| `www/index.html` | Página única do app |
| `www/js/app.js` | Telas, navegação e o jogo de perguntas |
| `www/js/progresso.js` | XP, níveis, estrelas, notas, conquistas, lojinha e gravação no aparelho |
| `www/js/dejair.js` | Desenho do mascote, humores, acessórios e falas |
| `www/js/conteudo/` | Uma matéria por arquivo; o formato está em `LEIA-ME.md` da pasta |
| `www/css/app.css` | Visual |
| `www/privacidade.html` | Política de privacidade (dentro do app e para a loja) |
| `www/sw.js`, `www/manifest.webmanifest` | Modo offline e instalação da versão web |
| `ios/`, `android/` | Projetos nativos gerados pelo Capacitor |
| `assets/` | Ícone e tela de abertura de origem |
| `loja/capturas/` | Capturas de tela nos tamanhos da App Store |
| `testes/` | Validador, teste de ponta a ponta, servidor local e geradores de imagens |

## Acrescentar ou corrigir conteúdo

1. Edite ou crie um arquivo em `www/js/conteudo/` seguindo o `LEIA-ME.md` de lá.
2. Matéria nova: inclua a linha `<script>` em `www/index.html`, o arquivo na lista de `www/sw.js` e tire a matéria de `EM_BREVE` em `www/js/app.js`.
3. Rode `npm run testar`.
4. Na versão web, troque o número de `VERSAO` em `www/sw.js`. Nos apps, rode `npx cap sync` e gere uma nova versão.

## Créditos

- Fontes Fredoka e Nunito, licença SIL Open Font License 1.1, incluídas em `www/fonts/`.
- Capacitor, licença MIT.
