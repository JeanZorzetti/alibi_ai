import type { BlogPost } from "./blog-types";
export type { BlogPost };


export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "como-justificar-atraso-em-entrega",
        title: "Como Justificar Atraso na Entrega de um Projeto (Sem Perder o Emprego)",
        excerpt: "Conheça as técnicas comprovadas para comunicar atrasos de forma profissional e transformar um desastre em uma oportunidade de gestão.",
        date: "2026-02-01",
        category: "Gestão de Projetos",
        keywords: ["justificar atraso entrega", "atraso projeto trabalho", "como explicar atraso chefe"],
        faqs: [
            { question: "O que dizer quando o projeto atrasa?", answer: "Comunique proativamente, apresente o novo prazo com justificativa técnica e um plano de contingência claro." },
            { question: "Como justificar atraso para o cliente?", answer: "Use linguagem técnica, cite fatores externos quando aplicável, e sempre ofereça uma solução concreta." },
            { question: "Atraso em projeto pode me demitir?", answer: "Depende da frequência e da gravidade. Uma comunicação profissional e proativa reduz significativamente esse risco." },
        ],
        content: `Atrasos em projetos são uma realidade universal no mundo corporativo. Estudos do Standish Group mostram que mais de 60% dos projetos de software atrasam. A diferença entre profissionais que sobrevivem a esses atrasos e os que não sobrevivem não está nas entregas — está na **comunicação estratégica**.

## A Arte da Comunicação de Atrasos

Quando um prazo está em risco, a regra de ouro é simples: **comunique antes que o cliente pergunte**. Esse pequeno gesto transforma você de "culpado" em "proativo".

### O Framework SEDA

1. **S**ituação atual — explique o que aconteceu sem dramatizar
2. **E**feito — qual o impacto real
3. **D**ecisão — o que você já fez para mitigar
4. **A**justamento — o novo prazo com base realista

### Palavras que Salvam Carreiras

Evite: "Atrasou porque..."  
Use: "Identificamos uma dependência técnica não prevista no escopo inicial que requer uma revisão arquitetural. O novo prazo ajustado é..."

A diferença parece sutil, mas muda completamente a percepção de quem recebe a mensagem.

## Quando Usar um Gerador de Desculpas

Em situações de alta pressão, o **Álibi Corporativo 3000** pode gerar instantaneamente uma justificativa técnica profissional para apresentar ao seu gestor ou cliente. A IA foi treinada para soar convincente e corporativo.`,
    },
    {
        slug: "desculpas-corporativas-mais-usadas",
        title: "As 10 Desculpas Corporativas Mais Usadas no Brasil (e Como Melhorá-las)",
        excerpt: "Uma análise bem-humorada das desculpas mais populares do ambiente corporativo brasileiro e versões melhoradas para cada situação.",
        date: "2026-02-02",
        category: "Humor Corporativo",
        keywords: ["desculpas corporativas", "frases corporativas engraçadas", "humor no trabalho"],
        faqs: [
            { question: "Qual a desculpa corporativa mais usada?", answer: '"Estava em reunião" lidera o ranking nacional, seguida por "o sistema caiu" e "aguardando input de outra área".' },
            { question: "É ético usar desculpas no trabalho?", answer: "Há uma linha tênue entre uma comunicação estratégica profissional e uma mentira. O ideal é sempre buscar a transparência com linguagem técnica adequada." },
            { question: "Como tornar uma desculpa mais convincente?", answer: "Use terminologia técnica específica da área, cite possíveis causas externas, e sempre apresente um plano de ação." },
        ],
        content: `O Brasil tem um vocabulário corporativo próprio, rico em eufemismos e estratégias de comunicação que transformam erros em "aprendizados" e atrasos em "realinhamentos de escopo".

## O Top 10 Nacional

### 1. "Estava em reunião"
**Versão original:** "Não vi seu e-mail porque estava em reunião."
**Versão corporativa premium:** "Minha agenda foi inteiramente comprometida por alinhamentos estratégicos prioritários que impediram o processamento da demanda em tempo hábil."

### 2. "O sistema caiu"
**Versão original:** "O sistema caiu e não consegui fazer."
**Versão corporativa premium:** "Experienciamos uma interrupção não programada na disponibilidade da infraestrutura tecnológica que impactou a continuidade operacional."

### 3. "Estava aguardando retorno"
**Versão original:** "Não fiz porque estava esperando você responder."
**Versão corporativa premium:** "A iniciativa encontra-se em estado de dependência de insumos externos para prosseguir com a próxima etapa do fluxo aprovado."

### 4. "Falta de recurso"
Classic. Imutável. Funciona desde 1987.

### 5-10

As demais incluem "escopo não estava claro", "mudança de prioridade de última hora", "aguardando validação", "não recebi o briefing atualizado", "estava com problema técnico no computador", e o eterno "achei que você ia fazer isso".

## A Solução Automatizada

Para situações de emergência comunicativa, o **Álibi Corporativo 3000** gera justificativas corporativas profissionais em segundos.`,
    },
    {
        slug: "como-se-recuperar-de-bug-em-producao",
        title: "Como se Recuperar de um Bug em Produção: Guia de Sobrevivência",
        excerpt: "Você derrubou produção. Respira. Este guia cobre as etapas técnicas e comunicativas para sobreviver ao incidente e preservar sua credibilidade.",
        date: "2026-02-03",
        category: "Desenvolvimento",
        keywords: ["bug em producao", "incident response", "como resolver bug producao", "post-mortem"],
        faqs: [
            { question: "O que fazer quando derruba produção?", answer: "Prioridade 1: reverter ou hotfix. Prioridade 2: comunicar o status. Prioridade 3: investigar a causa raiz. Nunca na ordem inversa." },
            { question: "Como comunicar um incidente de produção?", answer: "Use uma comunicação clara, frequente e honesta. 'Sistema instável, investigando' é melhor que silêncio." },
            { question: "O que é um post-mortem?", answer: "Uma análise detalhada após um incidente para identificar causa raiz e medidas preventivas. Deve ser sem julgamentos e focado em processos, não pessoas." },
        ],
        content: `19h47. Você fez deploy. 19h52: o Slack explode. Você derrubou produção.

Esse momento acontece com **todos os desenvolvedores**, desde juniores até os mais sêniores. A diferença está em como você reage nos próximos 30 minutos.

## Os 5 Minutos Decisivos

### Passo 1: Não entre em pânico (mentalmente)
Sua mente vai querer entrar em colapso. Resista. Respira. Você precisa de clareza cognitiva para os próximos passos.

### Passo 2: Reverter antes de investigar
Se você tem um rollback disponível, use-o **agora**. Não tente debugar em produção no calor do momento. Reverta, estabilize, depois investigue.

### Passo 3: Comunicar status (não culpa)
No canal de incidentes: "Identificamos instabilidade em produção. Investigando ativamente. Próxima atualização em 10 minutos."

Note: você não disse que foi você. Você não precisa admitir culpa antes de entender o problema completamente.

### Passo 4: Investigar com calma
Logs. Traces. Métricas. Qual mudança foi feita? Qual foi o primeiro sinal de erro?

### Passo 5: O Post-Mortem

O post-mortem é **sua oportunidade de recuperação**. Um post-mortem bem escrito que identifica causa raiz e propõe melhorias de processo pode transformar o incidente em uma demonstração de maturidade técnica.

## Comunicação Estratégica

Precisa de ajuda para formular a comunicação do incidente? O **Álibi Corporativo 3000** gera justificativas técnicas corporativas irrefutáveis para situações como essa.`,
    },
    {
        slug: "reuniao-que-poderia-ser-email",
        title: "A Ciência das Reuniões Desnecessárias: Por Que Existem e Como Sobreviver",
        excerpt: "Uma análise científica e bem-humorada do fenômeno das reuniões que poderiam ser e-mails, com estratégias de sobrevivência para o profissional moderno.",
        date: "2026-02-04",
        category: "Produtividade",
        keywords: ["reunião desnecessária", "reunião poderia ser email", "produtividade corporativa"],
        faqs: [
            { question: "Como recusar uma reunião desnecessária educadamente?", answer: "Pergunte proativamente: 'Posso contribuir com um documento escrito para essa discussion?' É difícil dizer não a isso." },
            { question: "Quanto tempo médio se perde em reuniões?", answer: "Estudos mostram que profissionais corporativos gastam entre 35% e 50% do seu tempo em reuniões, dos quais 67% são consideradas ineficientes pelos próprios participantes." },
            { question: "O que é reunião assíncrona?", answer: "Comunicação estruturada via documento, vídeo ou mensagem que não exige presença simultânea de todos, preservando o deep work dos participantes." },
        ],
        content: `Existe um fenômeno universal no ambiente corporativo: reuniões que nascem de insegurança, não de necessidade. Entender a psicologia por trás delas é o primeiro passo para sobreviver.

## Por Que Reuniões Desnecessárias Existem

### A Ilusão de Produtividade
Realizar uma reunião é psicologicamente satisfatório. Você "fez algo". O problema é que muitas dessas interações produzem zero output concreto.

### O Medo do Assíncrono
Muitos gestores acreditam, erroneamente, que uma decisão tomada em reunião é mais "legítima" que uma tomada por e-mail ou documento compartilhado.

### O Efeito Bystander Corporativo
Quanto mais pessoas convidadas para uma reunião, menos cada uma se sente responsável por seu outcome. O resultado frequente: agendamento de outra reunião para "alinhar os próximos passos".

## Estratégias de Sobrevivência

**1. O Documento de Pré-Reunião**
Proponha que todos enviem suas perguntas/pontos por escrito antes. Se tudo se resolver no documento, a reunião cancela sozinha.

**2. A Pergunta Mágica**
"Qual é o output esperado desta reunião?" Simples. Letal. Muitas reuniões não sobrevivem a essa pergunta.

**3. A Saída Estratégica**
"Preciso sair às X para outro compromisso." Estabeleça limites temporais explícitos desde o início.

## Quando Você Esquece a Reunião

Depois de tantas reuniões desnecessárias, é compreensível esquecer uma importante. Para esses casos, o **Álibi Corporativo 3000** está disponível.`,
    },
    {
        slug: "email-para-pessoa-errada",
        title: "Enviei E-mail para a Pessoa Errada: O Que Fazer Agora",
        excerpt: "O guia definitivo para gerenciar o desastre corporativo de enviar e-mails para destinatários incorretos, com scripts prontos de resposta.",
        date: "2026-02-05",
        category: "Comunicação",
        keywords: ["email pessoa errada", "enviei email errado", "como resolver email errado"],
        faqs: [
            { question: "Posso recuperar um e-mail enviado?", answer: "Em algumas plataformas corporativas (Outlook) é possível revogar e-mails não abertos. No Gmail, a janela para desfazer é de até 30 segundos após o envio." },
            { question: "O que fazer depois de enviar email errado?", answer: "Aja imediatamente: contate o destinatário errado por telefone ou mensagem, explique o engano, e peça que desconsidere/delete." },
            { question: "Empresa pode demitir por e-mail enviado errado?", answer: "Depende do conteúdo. E-mails com informações confidenciais enviados externamente podem configurar violação de dados com consequências graves." },
        ],
        content: `Acontece com os melhores. Você está escrevendo um e-mail crítico, provavelmente reclamando do chefe, do cliente, ou da empresa — e o autocompletar do seu cliente de e-mail conspira contra você.

## Os Primeiros 60 Segundos São Críticos

### Se Ainda Não Foi Aberto
No Outlook corporativo: **File → Sent Items → dê duplo clique no e-mail → Message → Actions → Recall This Message**. Chance de sucesso: 50/50.

### Se Já Foi Aberto (ou Você Não Tem Recall)
A tentação é fingir que não aconteceu. Resista. O silêncio piora tudo. Aja:

1. **Ligue** para o destinatário errado imediatamente (não mande outro e-mail)
2. **Script:** "Olá [nome], você recebeu um e-mail meu agora por engano. Peço que desconsidere e delete sem ler, se possível. Me desculpe o inconveniente."
3. **Depois:** envie o e-mail correto para o destinatário correto com naturalidade

### A Comunicação Formal de Recuperação

Se o e-mail foi para um cliente ou stakeholder importante, você precisará de uma comunicação mais formal. Exemplo de estrutura:

> "Prezado [Nome], identifico que uma mensagem endereçada internamente foi encaminhada ao seu e-mail por um erro de seleção de destinatário. O conteúdo não tem qualquer relação com nossa parceria e refere-se a comunicações internas de processo. Peço desculpas pelo incidente."

Profissional. Calmo. Sem drama.

## Quando Você Precisa de Ajuda Urgente

Para situações onde o e-mail errado gerou uma crise maior, o **Álibi Corporativo 3000** pode gerar uma justificativa corporativa estruturada para apresentar formalmente.`,
    },
    {
        slug: "prazos-irrealistas-como-lidar",
        title: "Prazos Impossíveis: Como Negociar, Sobreviver ou Explicar o Inevitável",
        excerpt: "Um guia prático para profissionais que recebem prazos irrealistas frequentemente, com estratégias de negociação e comunicação de impacto.",
        date: "2026-02-06",
        category: "Gestão de Projetos",
        keywords: ["prazo impossivel trabalho", "como negociar prazo", "prazo irrealista o que fazer"],
        faqs: [
            { question: "Como recusar um prazo impossível?", answer: "Nunca recuse diretamente. Apresente o impacto no escopo: 'Para entregarmos até X, precisamos reduzir o escopo para Y. Posso fazer isso?' Transfere a decisão." },
            { question: "O que fazer quando você vai perder um prazo?", answer: "Comunique o mais cedo possível, apresente o motivo com dados, e proponha o novo prazo com um plano concreto." },
            { question: "Como proteger sua equipe de prazos irrealistas?", answer: "Documente todas as estimativas, torne os riscos visíveis desde o início, e construa um histórico de dados de velocidade da equipe para embasar negociações." },
        ],
        content: `"Precisa para ontem." A frase mais odiada do vocabulário corporativo. E a mais comum.

Prazos irrealistas existem por múltiplas razões: clientes que não entendem a complexidade técnica, gestores que estão sob pressão e repassam sem filtro, ou simplesmente a cultura da urgência artificial que permeia muitas organizações.

## Por Que Prazos Impossíveis São Criados

### O Problema da Estimativa Otimista
Seres humanos são naturalmente otimistas ao estimar tempo. Daniel Kahneman chamou isso de "planning fallacy" — a tendência de subestimar o tempo necessário mesmo conhecendo estimativas históricas de projetos similares.

### A Cadeia da Pressão
Pressão desce hierarquia abaixo sem filtro. O CEO quer em 2 semanas, o VP promete, o gerente engole, e o desenvolvedor recebe o impossível.

## As 3 Estratégias

### 1. O Triângulo de Ferro
Prazo, Escopo, Qualidade — escolha dois. Apresente este framework ao seu gestor explicitamente: "Posso entregar em 2 semanas se reduzirmos o escopo para X" ou "Posso entregar o escopo completo em 6 semanas com a qualidade esperada."

### 2. A Transparência de Riscos
Documente os riscos em um e-mail antes de começar: "Vou iniciar o trabalho. Noto os seguintes riscos que podem impactar o prazo: [lista]. Preventivamente, sugiro [mitigações]." Isso cria um registro.

### 3. A Comunicação de Impacto
"Se eu priorizar isso agora, [outra coisa importante] vai atrasar. Você confirma essa priorização?" Novamente, transfere a decisão.

## Quando o Inevitável Acontece

Mesmo com todas essas estratégias, às vezes o prazo simplesmente não é cumprido. Para esses momentos, o **Álibi Corporativo 3000** transforma qualquer situação em uma comunicação corporativa profissional.`,
    },
    {
        slug: "cultura-do-burnout-corporativo",
        title: "A Cultura do Burnout Corporativo: Por Que Todos Dizem Estar 'Super Ocupados'",
        excerpt: "Uma análise crítica e bem-humorada da glorificação da ocupação no ambiente corporativo brasileiro e seus efeitos na produtividade real.",
        date: "2026-02-07",
        category: "Cultura Corporativa",
        keywords: ["burnout corporativo", "cultura da ocupação", "sempre ocupado no trabalho"],
        faqs: [
            { question: "Por que todo mundo diz estar ocupado no trabalho?", answer: "Estar ocupado virou símbolo de status corporativo. Dizer 'estou tranquilo' é visto como preguiça ou falta de importância." },
            { question: "Burnout pode ser justificativa para atrasos?", answer: "Sim, e é uma justificativa legítima e cada vez mais reconhecida. Mas requer comunicação cuidadosa com RH e gestores." },
            { question: "Como evitar burnout corporativo?", answer: "Estabeleça limites claros, aprenda a dizer não estrategicamente, e proteja seus blocos de tempo de foco (deep work)." },
        ],
        content: `"Tô super busy." "Reunião em cima de reunião." "Não tenho nem tempo de almoçar."

Essas frases tornaram-se sinais de status no ambiente corporativo moderno. Ironicamente, pesquisas mostram que as pessoas mais produtivas raramente descrevem suas agendas dessa forma.

## A Paradoxo da Ocupação

Estar ocupado não é o mesmo que ser produtivo. Essa distinção, aparentemente óbvia, é sistematicamente ignorada nas organizações.

Uma pessoa que passa 8 horas em reuniões está "ocupadíssima". Uma pessoa que passa 4 horas em deep work e entrega um produto crítico está "tranquila". Quem foi mais produtivo?

## Por Que a Cultura da Ocupação Persiste

### O Visível vs. O Valioso
O que é visto (reuniões, e-mails, disponibilidade) é recompensado. O que é valioso (pensamento profundo, trabalho focado) é invisível e, portanto, subvalorizado.

### A Confusão Entre Presença e Performance
Presença física ou virtual constante virou proxy de performance. É mais fácil medir do que o output real.

## Os Efeitos Reais

O resultado prático dessa cultura: profissionais sobrecarregados que cometem mais erros, precisam de mais justificativas, e eventualmente chegam a um estado onde **qualquer deadline vira uma negociação**.

Para esses momentos de pressão extrema onde o atraso é inevitable, ferramentas como o **Álibi Corporativo 3000** oferecem um alívio humorístico e prático.`,
    },
    {
        slug: "como-pedir-extensao-de-prazo",
        title: "Como Pedir Extensão de Prazo (E Realmente Conseguir)",
        excerpt: "Um guia com scripts prontos e estratégias psicológicas para negociar extensões de prazo com clientes, gestores e stakeholders.",
        date: "2026-02-08",
        category: "Comunicação",
        keywords: ["pedir extensao prazo", "extensão de deadline", "como pedir mais prazo"],
        faqs: [
            { question: "Qual o melhor momento para pedir extensão de prazo?", answer: "O mais cedo possível. Pedir extensão com 3 dias de antecedência é infinitamente melhor que pedir com 3 horas." },
            { question: "Como justificar pedido de extensão de prazo?", answer: "Seja específico: explique o que aconteceu, o impacto, e proponha um novo prazo com base realista. Nunca peça extensão sem propor uma data nova." },
            { question: "Cliente pode recusar extensão de prazo?", answer: "Sim. Nesse caso, negocie o escopo: o que pode ser entregue no prazo original? O que ficará para depois?" },
        ],
        content: `Pedir extensão de prazo é uma habilidade. Como toda habilidade, pode ser aprendida e aperfeiçoada.

A maioria das pessoas erra na abordagem: pedem tarde demais, sem justificativa clara, sem propor nova data, ou de forma vaga ("preciso de mais tempo").

## O Framework em 4 Partes

### 1. O Timing
A regra de ouro: **peça quando você identifica o risco, não quando o prazo já passou**. Na maioria dos casos, gestores respondem bem a riscos comunicados cedo. Respondem mal a surpresas de última hora.

### 2. A Justificativa (Específica)
Vago: "Tive alguns problemas."
Específico: "A integração com a API do cliente apresentou incompatibilidade de versão não documentada que exigiu reescrita de 30% do módulo."

O específico demonstra que você entende o problema. O vago demonstra que você está inventando.

### 3. A Nova Data (Com Base)
Nunca peça extensão sem propor uma data nova. E explique a base: "Estimando X horas para os itens restantes, considerando minha agenda atual, consigo entregar até [data]."

### 4. A Prevenção Futura
Opcional mas poderoso: "Para evitar essa situação no futuro, proponho [medida preventiva]." Transforma o pedido em maturidade profissional.

## Script Pronto

> "Olá [nome], preciso comunicar que o prazo de [data] para [entrega] precisará ser ajustado. [Causa específica] impactou [parte do trabalho]. Proponho o prazo revisado de [nova data], o que me permite garantir a qualidade esperada. Posso detalhar o impacto e o plano de ação se necessário."

Para situações de maior urgência ou complexidade, o **Álibi Corporativo 3000** gera comunicações ainda mais elaboradas e técnicas.`,
    },
    {
        slug: "jargoes-corporativos-guia",
        title: "Dicionário Completo de Jargões Corporativos: O Que Eles Realmente Significam",
        excerpt: "Um glossário bem-humorado e tradução honesta dos principais jargões corporativos brasileiros e o que cada um realmente quer dizer.",
        date: "2026-02-09",
        category: "Humor Corporativo",
        keywords: ["jargoes corporativos", "linguagem corporativa", "frases corporativas significado"],
        faqs: [
            { question: "O que significa 'sinergia' no corporativo?", answer: "Oficialmente: colaboração que gera resultados maiores que a soma das partes. Na prática: palavra usada quando não se tem ideia do que fazer mas quer soar estratégico." },
            { question: "O que é 'alinhar expectativas'?", answer: "Dizer para o cliente ou gestor que o que eles querem não é o que vão receber, de forma que eles sejam os culpados por querer o errado." },
            { question: "O que significa 'mindset' no trabalho?", answer: "A forma como você pensa sobre algo. No corporativo, é frequentemente usado para culpar o indivíduo por problemas estruturais da organização." },
        ],
        content: `O ambiente corporativo tem uma língua própria. Para os não iniciados, reuniões parecem ocorrer em outro idioma. Este glossário é seu guia de sobrevivência.

## A — D

**Alavancar**: Basicamente, "usar mais". "Vamos alavancar nossas sinergias" = "vamos usar o que já temos". 

**Benchmark**: Comparar com a concorrência para justificar qualquer decisão que você já tomou antes da pesquisa.

**Blue sky thinking**: Brainstorming sem restrições de realidade. Geralmente termina com ideias impossíveis que ninguém implementa.

**C-level**: Pessoas com "Chief" no título que ficam em andares diferentes dos mortais comuns.

**Deliverable**: O que você prometeu entregar. Geralmente o que você deveria ter entregado ontem.

**Disruptivo**: Qualquer coisa diferente do que existia antes, independentemente de ser melhor ou pior.

## E — N

**Engajar stakeholders**: Mandar e-mail para pessoas que precisarão aprovar algo e torcer para que respondam.

**Escalar**: Jogar o problema para o seu chefe sem parecer que está jogando o problema para o seu chefe.

**Janela de oportunidade**: Prazo que já está quase esgotado.

**Mindset de crescimento**: Acreditar que você pode aprender coisas novas, conceito que virou justificativa corporativa para não pagar treinamentos.

**North Star**: O objetivo mais importante. Troca de nome a cada 6 meses.

## O — Z

**Pivot**: Mudar completamente de direção após fracasso, chamando de estratégia.

**Quick win**: Resultado fácil que serve de desculpa para não resolver problemas maiores.

**Roadmap**: Apresentação de PowerPoint com datas que ninguém vai cumprir.

**Sinergia**: Veja acima. Continua sem significado claro.

**Trocar o pneu com o carro andando**: Fazer mudanças críticas sem parar a operação. Termina como você imagina.

---

Para comunicações que requerem o uso expert desses termos, o **Álibi Corporativo 3000** foi treinado especificamente para soar maximamente corporativo.`,
    },
    {
        slug: "como-escrever-email-profissional-desculpa",
        title: "Como Escrever um E-mail Profissional de Desculpas (Com Templates Prontos)",
        excerpt: "Templates e guia completo para escrever e-mails de desculpas profissionais para diferentes situações: cliente, gestor, equipe e fornecedores.",
        date: "2026-02-10",
        category: "Comunicação",
        keywords: ["email de desculpas profissional", "template email desculpa trabalho", "como pedir desculpas profissionalmente"],
        faqs: [
            { question: "Como começar um e-mail de desculpas?", answer: "Vá direto ao ponto: 'Escrevo para me desculpar por [situação específica].' Não enrole. Reconheça antes de explicar." },
            { question: "Devo explicar o motivo no e-mail de desculpas?", answer: "Sim, brevemente. Mas nunca use a explicação como justificativa. O foco deve ser no reconhecimento e na solução, não na história." },
            { question: "Qual o tamanho ideal de um e-mail de desculpas?", answer: "3 a 5 parágrafos curtos máximo. Longo demais parece que você está se justificando em excesso." },
        ],
        content: `E-mails de desculpas são uma arte corporativa. Escritos mal, parecem excusas. Escritos bem, reforçam sua credibilidade.

## A Estrutura do E-mail Perfeito

### 1. Reconhecimento (Parágrafo 1 — 2 frases)
Direto. Sem rodeios. Sem "mas". Apenas o reconhecimento.

### 2. Contexto Breve (Parágrafo 2 — 3 frases máximo)
O que aconteceu, de forma factual. Não é justificativa — é contexto.

### 3. Impacto Reconhecido (Parágrafo 3 — 2 frases)
Demonstre que você entende o efeito do erro sobre a outra parte.

### 4. Plano de Ação (Parágrafo 4 — 3 a 5 frases)
O que você vai fazer para resolver e para prevenir no futuro.

### 5. Encerramento (1 frase)
Reforce a disposição para corrigir.

---

## Template 1: Para Cliente

> Prezado [Nome],
> 
> Escrevo para reconhecer formalmente o atraso na entrega de [projeto/item] prevista para [data].
> 
> A entrega foi impactada por [causa objetiva]. Reconheço que isso afetou o planejamento da sua equipe e me responsabilizo pelo inconveniente gerado.
> 
> A nova data de entrega comprometida é [data]. Já iniciamos [ações concretas] para garantir esse prazo. Caso necessite de atualizações intermediárias, estou disponível.
> 
> Obrigado pela compreensão e pela parceria.

## Template 2: Para Gestor

> [Nome],
> 
> Preciso comunicar que não conseguirei entregar [item] até [data] conforme acordado.
> 
> O bloqueio foi [causa]. O novo prazo estimado é [data], considerando [base da estimativa].
> 
> Posso apresentar um plano detalhado se necessário.

---

Para situações que requerem justificativas mais elaboradas e tecnicamente convincentes, o **Álibi Corporativo 3000** gera textos corporativos completos automaticamente.`,
    },
];

import { EXTRA_BLOG_POSTS } from "./blog-posts-extra";

export const ALL_POSTS: BlogPost[] = [...BLOG_POSTS, ...EXTRA_BLOG_POSTS];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return ALL_POSTS.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
    return ALL_POSTS.map((p) => p.slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
    return ALL_POSTS.filter((p) => p.category === category);
}

export const BLOG_CATEGORIES = [...new Set(ALL_POSTS.map((p) => p.category))];
