# Publicar o Trilhas do Dejair na App Store

Passo a passo para levar o app deste repositório até a App Store, escrito para quem tem um Mac e nunca publicou um app. As regras da Apple citadas aqui foram conferidas nas páginas oficiais em 18/11/2026; os links estão no fim.

**Leia antes:** o projeto iOS desta pasta foi gerado e configurado em Linux. Ele **nunca foi compilado no Xcode**, porque isso só é possível em um Mac. O passo 4 é onde isso se resolve, e é ali que podem aparecer ajustes.

## Quanto tempo leva

| Etapa | Tempo |
| --- | --- |
| Inscrição no Apple Developer Program | de alguns minutos a 2 dias (a Apple pede contato se passar de 24 h sem confirmação) |
| Preparar o Mac, compilar e testar no iPhone | 2 a 4 horas na primeira vez |
| Preencher a página do app no App Store Connect | 1 a 2 horas |
| Revisão da Apple | a Apple informa 50% em menos de 24 h e 90% em menos de 48 h; primeira versão e categoria Kids costumam ir e voltar uma vez |

Conte com **uma a duas semanas** do início até o app aparecer na loja. Para usar o app antes disso, veja "Usar hoje, sem loja" no `README.md`.

## 0. O que você precisa

- Um **Mac com macOS Tahoe 26.2 ou mais novo** e **Xcode 26** (versão 26.4 ou mais nova). A Apple só aceita apps compilados com Xcode 26 ou posterior. O Xcode 27 já existe, mas o Capacitor 8, usado aqui, é documentado para o Xcode 26, e não encontrei confirmação de que funcione com o 27. Se a App Store do Mac só oferecer o 27, baixe o 26 em <https://developer.apple.com/download/all/>.
- Uma **Conta Apple** com autenticação de dois fatores, em nome de um adulto. O nome legal dessa pessoa aparece na loja como vendedor do app.
- **US$ 99 por ano** do Apple Developer Program, cobrados em reais no cartão. A Apple só mostra o valor em reais durante a inscrição.
- **Node.js 22 ou mais novo** (<https://nodejs.org>).
- Um **iPhone** com cabo, para testar de verdade antes de enviar.

## 1. Três decisões antes de começar

### 1.1 Nome do app

O nome na loja tem até 30 caracteres e precisa estar livre. Sugestão: **Trilhas do Dejair**. Se estiver ocupado, **Dejair: Trilhas do Saber**. Só dá para saber ao criar o app no passo 6. O nome embaixo do ícone no iPhone é só **Dejair** (já configurado).

### 1.2 Identificador do app (Bundle ID)

Está definido como `org.cortereal.dejair`. Ele é **permanente**: depois do primeiro envio não pode mais mudar. Se quiser outro, troque **antes do passo 4**, nos três lugares:

- `capacitor.config.json`, campo `appId`
- `ios/App/App.xcodeproj` (no Xcode: alvo App → Signing & Capabilities → Bundle Identifier)
- `android/app/build.gradle`, campos `namespace` e `applicationId`

### 1.3 Categoria Kids: sim ou não

Esta é a decisão que mais pesa, e ela **não tem volta**.

- A regra 5.1.4 da Apple diz que um app **fora** da categoria Kids não pode usar, no nome, subtítulo, ícone, capturas ou descrição, termos que indiquem que o público principal são crianças. Este app é para alunos de 10 a 12 anos, e a descrição honesta dele diz isso.
- A categoria Kids exige: nada de links para fora do app, nada de compras, nada de anúncios nem de análise de uso de terceiros, e política de privacidade. O app já cumpre tudo isso.
- Depois de aprovado na categoria Kids, o app **fica nela para sempre**. Toda versão futura terá de seguir essas regras, mesmo que um dia você queira login, links ou estatísticas de uso.

**Recomendação:** entrar na categoria Kids, faixa **9 a 11 anos**. É a opção coerente com o que o app é, e a outra obriga a esconder o público na descrição. O custo é o compromisso permanente descrito acima. A faixa é uma prateleira da loja; ela não impede alunos de 12 anos de baixar.

## 2. Inscrever-se no Apple Developer Program

1. No iPhone, instale o app **Apple Developer** (da própria Apple) e entre com a sua Conta Apple.
2. Toque em **Conta → Inscrever-se agora** e escolha **Pessoa física** (Individual).
3. Confirme os seus dados e faça a verificação de identidade com um documento com foto. A Apple aceita passaporte na maioria dos países; se o app recusar o seu documento, faça a inscrição pelo site <https://developer.apple.com/programs/enroll/>, pagando com cartão de crédito **no seu próprio nome**.
4. Pague a anuidade. Use o mesmo aparelho do começo ao fim.
5. Aguarde o e-mail de confirmação. Sem ele em 24 horas, fale com o suporte em <https://developer.apple.com/contact/>.

## 3. Preparar o projeto no Mac

No Terminal:

```bash
git clone https://github.com/guscortereal/dejair.git
```

```bash
cd dejair
```

```bash
npm install
```

```bash
npx cap sync ios
```

```bash
npx cap open ios
```

O último comando abre o projeto no Xcode. Na primeira abertura o Xcode baixa os pacotes do Capacitor; espere a barra de progresso do topo terminar.

## 4. Compilar e testar no Xcode

1. No painel da esquerda, clique no projeto **App** (ícone azul) e, em **TARGETS**, em **App**.
2. Aba **Signing & Capabilities**: marque **Automatically manage signing** e escolha o seu nome em **Team**. Se o Xcode pedir, entre com a Conta Apple em **Xcode → Settings → Accounts**.
3. Aba **General**: confira **Display Name** = Dejair, **Bundle Identifier** = `org.cortereal.dejair`, **Version** = 1.0, **Build** = 1. Em **Supported Destinations** devem estar iPhone e iPad.
4. No painel da esquerda, dentro da pasta **App**, confira se existe o arquivo **PrivacyInfo.xcprivacy**. Clique nele e, no painel da direita (File Inspector), confira se **Target Membership → App** está marcado. Sem esse arquivo a Apple recusa o envio.
5. No topo, escolha um simulador (por exemplo, iPhone 17) e aperte **▶**. O app deve abrir na tela de boas-vindas do Dejair.
6. Ligue o seu iPhone no cabo, escolha-o no topo e aperte **▶** de novo. Na primeira vez, o iPhone pede para ativar o **Modo de Desenvolvedor** (Ajustes → Privacidade e Segurança) e confiar no computador.

### O que testar no iPhone antes de enviar

- [ ] A tela de boas-vindas aparece e aceita o nome.
- [ ] Nada fica escondido atrás do relógio, da ilha dinâmica ou da barra de baixo.
- [ ] Jogar uma fase inteira de cada matéria: os cinco tipos de questão respondem ao toque.
- [ ] A nota aparece no fim, com estrelas e confete.
- [ ] Fechar o app pelo multitarefa e abrir de novo: o progresso continua lá.
- [ ] Ligar o **modo avião** e jogar: tudo funciona sem internet.
- [ ] Os sons tocam (com o botão lateral de silêncio desligado) e dá para desligá-los em Evolução → Ajustes.
- [ ] No iPad (simulador basta): girar a tela não quebra o desenho.

Se algo falhar aqui, é agora que se conserta. Anote o que viu e a mensagem de erro do Xcode.

## 5. Colocar a política de privacidade no ar

A Apple exige uma **URL pública** da política de privacidade para todo app, além do link dentro do app (que já existe em Evolução). A página está pronta em `www/privacidade.html`.

1. Ligue o GitHub Pages no repositório: em <https://github.com/guscortereal/dejair>, **Settings → Pages → Build and deployment → Deploy from a branch**, escolha `main` e a pasta `/ (root)` e clique em **Save**. Em um ou dois minutos a política fica em <https://guscortereal.github.io/dejair/www/privacidade.html>.
2. Abra o endereço no navegador e confirme que a página carrega.
3. Antes de publicar, edite a última linha da página ("Contato") e ponha um e-mail de contato seu. A Apple também pede uma **URL de suporte**; pode ser essa mesma página, desde que tenha o contato.

Com o Pages ligado, <https://guscortereal.github.io/dejair/> é o app completo rodando no navegador.

## 6. Criar o app no App Store Connect

1. Entre em <https://appstoreconnect.apple.com> com a mesma conta.
2. Na primeira vez, aceite os contratos pendentes em **Negócios** (Business). Para app gratuito basta o contrato de apps gratuitos; não precisa cadastrar banco nem impostos.
3. **Apps → + → Novo app**:
   - Plataforma: **iOS**
   - Nome: **Trilhas do Dejair**
   - Idioma principal: **Português (Brasil)**
   - ID do pacote: `org.cortereal.dejair` (aparece na lista depois do passo 4)
   - SKU: `dejair-trilhas-001` (um código seu, qualquer)
   - Acesso do usuário: Acesso total
4. Ao criar, o site pergunta sobre o **status de comerciante** da lei europeia (DSA). A declaração é pedida a todos. Para um app gratuito, sem fins comerciais e distribuído só no Brasil, a opção é **não sou comerciante** ("This is not a trader account").

## 7. Preencher as informações do app

### 7.1 Informações do app

- **Subtítulo:** `Quiz de estudo com um gato` (até 30 caracteres)
- **Categoria principal:** Educação. **Secundária:** Jogos → Curiosidades (opcional).
- **Direitos de conteúdo:** o app não usa conteúdo de terceiros.
- **Classificação etária:** responda ao questionário. O app não tem violência, linguagem imprópria, apostas, compras, bate-papo, redes sociais, acesso livre à internet, localização compartilhada nem relacionamentos: marque **Nenhum / Não** em tudo. O resultado é **4+** (no Brasil, **AL**, livre).
- **Categoria Kids:** se seguiu a recomendação do item 1.3, marque **Feito para crianças** e escolha **9 a 11 anos**. Lembre: não dá para desfazer depois da aprovação.

### 7.2 Preço e disponibilidade

- **Preço:** Gratuito.
- **Disponibilidade:** selecione **somente Brasil**. O app está em português e isso evita as exigências de outros países.

### 7.3 Privacidade do app

- **URL da política de privacidade:** o endereço do passo 5.
- **Coleta de dados:** escolha **"Não, não coletamos dados deste app"** e salve. O nome e o progresso ficam só no aparelho, o que para a Apple não é coleta.

## 8. Preencher a página da versão 1.0

### 8.1 Capturas de tela

Já estão prontas em `loja/capturas/`, nos tamanhos aceitos:

- `loja/capturas/iphone/` — 1290 × 2796 (iPhone, tela grande)
- `loja/capturas/ipad/` — 2064 × 2752 (iPad de 13 polegadas; obrigatório porque o app roda em iPad)

Arraste de 3 a 7 imagens para cada grupo. Ordem sugerida: início, trilha, pergunta respondida, ligar pares, resultado, lojinha, evolução. Para refazê-las depois de mudar o app, veja o cabeçalho de `testes/capturas-loja.js`.

A página de especificações da Apple hoje se contradiz sobre qual tamanho de iPhone é o obrigatório. Se o site reclamar do tamanho, ele diz qual aceita; gere de novo com o tamanho pedido.

### 8.2 Textos (prontos para colar)

**Texto promocional** (até 170 caracteres):

```
Estude Matemática, Português, História, Geografia e Ciências do 5º ano jogando com o gato Dejair. Fases curtas, nota no fim, estrelas, medalhas e sardinhas.
```

**Descrição:**

```
O Dejair é um gato curioso que transforma a matéria da escola em trilhas de jogo.

Escolha a matéria, siga a trilha e jogue fases curtas de perguntas. Antes de cada fase, o Dejair mostra um resumo rápido do assunto. Depois de cada resposta, ele explica o porquê. No fim, você recebe a sua nota de 0 a 10 e até três estrelas.

O QUE TEM NESTA VERSÃO
• História: cidadania, abolição da escravidão, Proclamação da República, República das Oligarquias e Era Vargas.
• Geografia: as cinco regiões do Brasil, com estados, capitais, clima, vegetação e economia.
• Ciências: nutrição do corpo humano e os sistemas digestório, respiratório, circulatório e urinário.
• Matemática: numeração, as quatro operações, problemas, expressões, frações, decimais, porcentagem, tempo, gráficos, área, ângulos e figuras geométricas.
• Português: crônica, anúncio publicitário, interpretação de texto, vocabulário, tempos verbais, narrativa e discurso direto e indireto.
• 43 fases e 551 questões de cinco tipos: múltipla escolha, verdadeiro ou falso, completar a frase, colocar em ordem e ligar os pares. Várias trazem textos, tabelas, gráficos e figuras.
• Um Provão em cada matéria, com a nota final.

PARA NÃO PARAR DE JOGAR
• Estrelas, níveis e medalhas de conquista.
• Sequência de dias e missão do dia.
• Sardinhas para comprar acessórios e pelagens para o Dejair. Elas são pontos do jogo e não custam dinheiro.
• Tela de evolução com as notas, o boletim de cada matéria e a porcentagem de acertos.

FEITO COM CUIDADO
• Funciona sem internet.
• Sem cadastro, sem anúncios e sem compras.
• Não coleta nenhum dado: o nome e o progresso ficam só no aparelho.
• Errar faz parte: não há cronômetro nem vidas, e toda resposta vem com explicação.

Conteúdo alinhado ao 5º ano do Ensino Fundamental.
```

**Palavras-chave** (até 100 caracteres, separadas por vírgula, sem espaço):

```
quiz,estudar,escola,5 ano,matemática,português,história,geografia,ciências,prova,revisão,gato
```

**URL de suporte:** o endereço do passo 5. **URL de marketing:** deixe em branco.

**Copyright:** `2026 Seu Nome Completo`

**Novidades da versão:** não se preenche na primeira versão.

### 8.3 Informações para a revisão

- **Login necessário:** desmarque. O app não tem login.
- **Contato:** seu nome, telefone e e-mail.
- **Notas** (em inglês ajuda, porque a revisão é feita fora do Brasil):

```
Trilhas do Dejair is an offline educational quiz game for Brazilian elementary school students (ages 9-11), in Portuguese.
- No account or login is needed. Type any nickname (or leave it blank) on the first screen and tap "Vamos lá!".
- All content (43 lessons, 551 questions) is bundled in the app. It makes no network requests.
- No ads, no in-app purchases, no third-party SDKs or analytics, no external links.
- "Sardinhas" (fish) are in-game points earned by answering questions. They cannot be purchased.
- No data is collected. The nickname and progress are stored only on the device (UserDefaults, declared in the privacy manifest).
- The privacy policy is available in the app: tab "Evolução" > "Política de privacidade".
```

## 9. Enviar o app do Xcode para a Apple

1. No Xcode, no seletor de aparelho do topo, escolha **Any iOS Device (arm64)**.
2. Menu **Product → Archive**. Espere compilar; a janela **Organizer** abre sozinha.
3. Selecione o arquivo recém-criado e clique em **Distribute App → App Store Connect → Upload**. Aceite as opções padrão e confirme.
4. Aguarde o e-mail da Apple dizendo que o processamento terminou (de 10 a 30 minutos). Se vier um e-mail de erro, ele diz o que falta.

A pergunta sobre **criptografia** (conformidade de exportação) não aparece, porque o projeto já declara `ITSAppUsesNonExemptEncryption = NO`: o app não usa criptografia.

## 10. Testar pelo TestFlight (recomendado)

1. No App Store Connect, aba **TestFlight**, o build enviado aparece após o processamento.
2. Em **Testes internos**, crie um grupo e adicione a si mesmo. Testadores internos precisam ser pessoas da sua conta de desenvolvedor (até 100).
3. No iPhone, instale o app **TestFlight** e aceite o convite. O build vale por 90 dias.

**Atenção:** não consegui confirmar em página oficial se uma conta Apple de criança consegue usar o TestFlight; os termos de uso indicam idade mínima de 13 anos. Para a criança testar antes da publicação, o caminho seguro é instalar pelo cabo, como no passo 4.6.

## 11. Enviar para revisão

1. Na página da versão 1.0, em **Build**, clique em **+** e escolha o build enviado.
2. Confira se não há nenhum aviso amarelo nas seções (capturas, descrição, privacidade, classificação etária, preço).
3. Em **Lançamento da versão**, escolha **Lançar manualmente** se quiser decidir o dia, ou automático.
4. Clique em **Adicionar para revisão** e depois em **Enviar para revisão**.

### Se a Apple recusar

A recusa chega por e-mail e no **Centro de Resoluções** do App Store Connect, com o número da regra. Responda por lá; é normal ir e voltar uma vez. As recusas mais prováveis para este app:

| Regra | O que a Apple pode dizer | O que responder ou fazer |
| --- | --- | --- |
| 4.2 Funcionalidade mínima | "O app é um site empacotado." | O app não carrega site algum: todo o conteúdo vai dentro do pacote e funciona offline, com progresso, conquistas e sons. Repita os pontos das notas de revisão. |
| 1.3 / 5.1.4 Kids | Pedem portão para adultos em algum link. | O único link é a política de privacidade, que abre dentro do app. Se insistirem, a correção é pôr uma confirmação simples (uma conta de multiplicar) antes de abrir essa página. |
| 2.1 Desempenho | Travou ou tela em branco no aparelho deles. | Peça o modelo e a versão do iOS, reproduza no simulador e reenvie com o **Build** aumentado. |
| 2.3 Metadados | Captura ou texto não corresponde ao app. | Ajuste o texto ou refaça as capturas. |

Não dou a aprovação como certa. O risco real está na 4.2, que depende do julgamento de quem revisa; apps offline feitos com Capacitor são aprovados com frequência, mas não há garantia.

## 12. Depois de aprovado

- Com lançamento manual, clique em **Lançar esta versão**. O app aparece na loja em algumas horas.
- **Para atualizar** (por exemplo, com as matérias da próxima etapa): edite os arquivos em `www/`, rode `npm run testar`, depois `npx cap sync ios`, aumente **Version** (1.1) e **Build** no Xcode, refaça os passos 9 a 11 e preencha "Novidades da versão".
- A anuidade de US$ 99 precisa estar em dia. Se vencer, o app sai da loja.
- A Apple sobe o Xcode mínimo todo ano. Em **abril de 2027** passará a exigir o SDK do iOS 27; atualizações enviadas depois disso precisarão do Xcode 27 e, provavelmente, do Capacitor 9.

## 13. Android, em resumo

O projeto Android também está pronto em `android/` (mesmo identificador, ícones e tela de abertura), e também **não foi compilado aqui**. O caminho, sem o detalhe deste guia e **sem conferência das regras do Google nesta data** (os itens 2 e 4 vêm do que eu sabia até meados de 2026):

1. Instale o **Android Studio** (Otter 2025.2.1 ou mais novo) e rode `npx cap sync android` e `npx cap open android`.
2. Crie a conta no **Google Play Console** (taxa única de US$ 25). Contas pessoais novas precisam de um teste fechado com 12 testadores por 14 dias antes de publicar.
3. Gere o pacote assinado em **Build → Generate Signed App Bundle** e envie.
4. Na seção de público-alvo, ao declarar menores de 13 anos, o app entra nas regras de **Famílias** do Google, que ele cumpre pelos mesmos motivos da categoria Kids.

## Fontes conferidas em 18/11/2026

- Inscrição e preço: <https://developer.apple.com/programs/enroll/>
- Xcode e SDK mínimos: <https://developer.apple.com/news/upcoming-requirements/> e <https://developer.apple.com/support/xcode/>
- Capturas de tela: <https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/>
- Classificação etária e categoria Kids: <https://developer.apple.com/help/app-store-connect/manage-app-information/set-an-app-age-rating/> e <https://developer.apple.com/kids/>
- Diretrizes de revisão (1.3, 2.3.8, 4.2, 5.1.1, 5.1.4): <https://developer.apple.com/app-store/review/guidelines/>
- Privacidade do app: <https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/>
- Manifesto de privacidade: <https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api>
- Criptografia: <https://developer.apple.com/documentation/bundleresources/information-property-list/itsappusesnonexemptencryption>
- TestFlight: <https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/>
- Status de comerciante (DSA): <https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/>
- Prazo de revisão: <https://developer.apple.com/distribute/app-review/>

Não confirmados em fonte oficial: o valor da anuidade em reais, os documentos brasileiros aceitos na verificação de identidade, o uso do TestFlight por conta de criança e o funcionamento do Capacitor 8 com o Xcode 27.
