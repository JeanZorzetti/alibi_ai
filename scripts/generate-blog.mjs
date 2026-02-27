// Script to append articles 11-70 to blog-posts.ts
import { writeFileSync } from "fs";

const EXTRA_POSTS = [
    ["como-dar-feedback-negativo", "Como Dar Feedback Negativo Sem Destruir Relacionamentos", "Técnicas para comunicar performance abaixo do esperado de forma construtiva.", "2026-02-11", "Liderança"],
    ["gestao-de-conflitos-corporativos", "Gestão de Conflitos Corporativos: Da Discussão para a Solução", "Como transformar desentendimentos em oportunidades de alinhamento.", "2026-02-12", "Liderança"],
    ["como-sobreviver-avaliacao-de-desempenho", "Como Sobreviver (e Prosperar) na Avaliação de Desempenho", "Guia completo para se preparar e se destacar no review anual.", "2026-02-13", "Carreira"],
    ["produtividade-home-office", "Produtividade em Home Office: O Que Realmente Funciona", "Além das dicas genéricas: estratégias que profissionais de alta performance realmente usam.", "2026-02-14", "Produtividade"],
    ["como-lidar-com-chefe-microgerenciador", "Como Lidar com um Chefe Microgerenciador (Sem Perder a Sanidade)", "Estratégias práticas para trabalhar com líderes que controlam cada detalhe.", "2026-02-15", "Carreira"],
    ["erros-comuns-em-apresentacoes", "Os 7 Erros Mais Comuns em Apresentações Corporativas", "O que destrói uma apresentação e como evitar cada armadilha.", "2026-02-16", "Comunicação"],
    ["como-negociar-aumento-salario", "Como Negociar Aumento de Salário com Dados e Confiança", "Um framework baseado em evidências para a conversa mais importante da sua carreira.", "2026-02-17", "Carreira"],
    ["gestao-de-tempo-para-devs", "Gestão de Tempo para Desenvolvedores: O Guia Real", "Como proteger seu tempo de foco em um ambiente de interrupções constantes.", "2026-02-18", "Produtividade"],
    ["como-escrever-relatorio-executivo", "Como Escrever um Relatório Executivo que Seja Realmente Lido", "A estrutura certa para comunicar resultados a líderes que têm 5 minutos para decidir.", "2026-02-19", "Comunicação"],
    ["cultura-de-startup-vs-corporacao", "Cultura de Startup vs. Corporação: Qual é Mais Difícil de Sobreviver?", "Uma análise bem-humorada dos dois ambientes e seus desafios únicos.", "2026-02-20", "Cultura Corporativa"],
    ["como-delegar-tarefas-corretamente", "Como Delegar Tarefas Sem Microgerenciar (E Sem Perder o Controle)", "O framework de delegação que preserva a qualidade e libera seu tempo.", "2026-02-21", "Liderança"],
    ["slack-etiqueta-corporativa", "Etiqueta do Slack e Teams: As Regras Não Escritas do Trabalho Remoto", "Como se comunicar de forma profissional nas ferramentas de trabalho modernas.", "2026-02-22", "Comunicação"],
    ["como-justificar-falha-de-seguranca", "Como Comunicar uma Falha de Segurança (Sem Entrar em Pânico)", "O guia técnico e comunicativo para incidentes de segurança em ambientes corporativos.", "2026-02-23", "Desenvolvimento"],
    ["retrospectiva-que-funciona", "Como Fazer uma Retrospectiva que Realmente Funciona", "Por que a maioria das retros é inútil e como transformar a sua em alavanca de melhoria.", "2026-02-24", "Gestão de Projetos"],
    ["sindrome-do-impostor-corporativo", "Síndrome do Impostor no Trabalho: Por Que Você Se Sente uma Fraude", "Uma análise honesta do fenômeno que afeta 70% dos profissionais e como lidar.", "2026-02-25", "Carreira"],
    ["como-justificar-erros-de-estimativa", "Como Justificar Erros de Estimativa em Projetos de Software", "Por que estimativas erram e como comunicar com credibilidade quando o prazo vai embora.", "2026-02-26", "Desenvolvimento"],
    ["politica-corporativa-como-navegar", "Política Corporativa: Como Navegar Sem Se Perder ou Se Vender", "O map sobrevivência para os jogos de poder que existem em toda organização.", "2026-02-27", "Cultura Corporativa"],
    ["onboarding-falho-o-que-fazer", "Onboarding Falho: O Que Fazer Quando Você Não Foi Treinado Direito", "Como compensar um processo de integração ruim e acelerar sua curva de aprendizado.", "2026-02-28", "Carreira"],
    ["como-documentar-codigo-que-ninguem-vai-ler", "Como Documentar Código de Forma que Alguém Realmente Vai Usar", "A arte de escrever documentação útil em um mundo onde ninguém quer escrevê-la.", "2026-03-01", "Desenvolvimento"],
    ["reuniao-de-status-que-ninguem-quer", "Status Meeting: Como Transformar a Reunião que Todo Mundo Odeia", "Da atualização chata ao ritual que realmente impulsiona projetos.", "2026-03-02", "Gestão de Projetos"],
    ["como-lidar-com-colega-incompetente", "Como Lidar com um Colega que Não Entrega (Sem Virar o Vilão)", "Estratégias profissionais para situações onde a performance do time é impactada por um membro.", "2026-03-03", "Carreira"],
    ["feature-flag-e-rollback-estrategia", "Feature Flags e Rollback: Sua Rede de Segurança em Produção", "Como implementar estratégias defensivas que transformam deploys em eventos sem medo.", "2026-03-04", "Desenvolvimento"],
    ["gestao-por-objetivos-okr-falha", "Por Que OKRs Falham na Maioria das Empresas (E Como Salvar o Seu)", "A análise honesta dos erros mais comuns na implementação de gestão por objetivos.", "2026-03-05", "Gestão de Projetos"],
    ["como-trabalhar-com-cliente-dificil", "Como Trabalhar com Clientes Difíceis Sem Perder a Conta ou a Razão", "Técnicas de comunicação e gestão de expectativas para relacionamentos cliente-prestador tensos.", "2026-03-06", "Comunicação"],
    ["dados-errados-no-relatorio", "Apresentei Dados Errados na Reunião: O Que Fazer Agora", "O guia de recuperação para quando o Excel conspirou contra você na hora certa.", "2026-03-07", "Comunicação"],
    ["como-sobreviver-merger-aquisicao", "Fusão e Aquisição: Como Sobreviver à Incerteza Corporativa", "Estratégias para proteger posição durante reorganizações e mudanças de controle.", "2026-03-08", "Carreira"],
    ["agile-que-nao-e-agile", "O Seu Scrum Não É Scrum: Por Que Agile Falha na Prática", "Uma análise honesta de como metodologias ágeis se transformam em burocracia disfarçada.", "2026-03-09", "Gestão de Projetos"],
    ["como-justificar-divida-tecnica", "Como Explicar Dívida Técnica para Stakeholders Não Técnicos", "Traduzindo o problema mais incompreendido do desenvolvimento de software em linguagem de negócios.", "2026-03-10", "Desenvolvimento"],
    ["email-marketing-interno-fails", "Os Piores E-mails Corporativos de Todos os Tempos (E o Que Aprender)", "Uma análise bem-humorada dos fails de comunicação interna que viraram lenda.", "2026-03-11", "Humor Corporativo"],
    ["como-pedir-demissao-profissionalmente", "Como Pedir Demissão Preservando Relacionamentos e Reputação", "O guia definitivo para sair de uma empresa de porta aberta, independente do motivo.", "2026-03-12", "Carreira"],
    ["standup-meeting-otimizado", "Daily Standup em 15 Minutos: Como Fazer ou Como Pular", "Por que a maioria das standups são inúteis e como transformá-las em combustível de produtividade.", "2026-03-13", "Gestão de Projetos"],
    ["como-dar-mae-ao-project-creep", "Scope Creep: Como Parar o Crescimento Invisível do Projeto", "Identificando e controlando a expansão de escopo antes que ela destrua seu cronograma.", "2026-03-14", "Gestão de Projetos"],
    ["inteligencia-emocional-no-trabalho", "Inteligência Emocional no Trabalho: O Que Realmente Significa", "Além do buzzword: aplicações práticas de IE em situações corporativas reais.", "2026-03-15", "Carreira"],
    ["como-liderar-sem-ser-chefe", "Como Liderar Sem Ter o Título de Líder", "Influência sem autoridade formal: as habilidades que diferenciam profissionais de impacto.", "2026-03-16", "Liderança"],
    ["trabalho-hibrido-productividade", "Trabalho Híbrido: Como Manter Produtividade em Duas Realidades", "O guia prático para profissionais que alternam escritório e home office.", "2026-03-17", "Produtividade"],
    ["como-fazer-code-review-util", "Como Fazer Code Review que Seja Útil (E Não Só Crítico)", "As melhores práticas para revisões de código que melhoram o produto e o time.", "2026-03-18", "Desenvolvimento"],
    ["tecnicas-de-persuasao-corporativa", "Técnicas de Persuasão Corporativa: Como Vender Ideias Internamente", "O framework para conseguir aprovação para projetos, orçamentos e mudanças.", "2026-03-19", "Comunicação"],
    ["como-montar-portfolio-dev", "Como Montar um Portfólio de Dev que Realmente Impressiona", "Além do GitHub: o que recrutadores técnicos realmente olham quando avaliam candidatos.", "2026-03-20", "Carreira"],
    ["gestao-de-stakeholders-dificeis", "Gestão de Stakeholders Difíceis: Quando o Seu Apoiador Vira Obstáculo", "Técnicas para manter alinhamento com stakeholders que mudam de posição frequentemente.", "2026-03-21", "Gestão de Projetos"],
    ["como-escrever-post-mortem", "Como Escrever um Post-Mortem que Melhora a Equipe", "A estrutura e o tom certos para transformar falhas em aprendizados organizacionais.", "2026-03-22", "Desenvolvimento"],
    ["reuniao-one-on-one-eficiente", "O 1:1 Perfeito: Como Usar a Reunião Individual para Crescer na Carreira", "O que poucos profissionais sabem sobre como aproveitar ao máximo os one-on-ones.", "2026-03-23", "Liderança"],
    ["como-justificar-mudanca-de-tecnologia", "Como Justificar uma Mudança de Tecnologia para a Gestão", "O business case técnico para substituir a stack legada que está travando o time.", "2026-03-24", "Desenvolvimento"],
    ["networking-corporativo-real", "Networking Corporativo: Como Construir Conexões Reais (Não Superficiais)", "A diferença entre colecionar cartões de visita e construir uma rede que realmente funciona.", "2026-03-25", "Carreira"],
    ["como-fazer-apresentacao-executiva", "Como Fazer uma Apresentação para o C-Level em 5 Minutos", "A estrutura BLUF (Bottom Line Up Front) para comunicações executivas de alto impacto.", "2026-03-26", "Comunicação"],
    ["gestao-de-crise-corporativa", "Gestão de Crise Corporativa: Do Pânico ao Plano em 60 Minutos", "O framework para liderar em situações de alta pressão e incerteza.", "2026-03-27", "Liderança"],
    ["como-trabalhar-com-dados-inconsistentes", "Dados Inconsistentes no Projeto: Como Comunicar e Continuar", "O guia técnico e comunicativo para quando a base de dados vira um pesadelo.", "2026-03-28", "Desenvolvimento"],
    ["feedback-360-como-usar", "Feedback 360: Como Receber Críticas Sem Entrar na Defensiva", "Transformando avaliações multifonte em plano de desenvolvimento real.", "2026-03-29", "Carreira"],
    ["como-escrever-rfc-tecnico", "Como Escrever um RFC Técnico que As Pessoas Realmente Leem", "A estrutura certa para proposals técnicas que conseguem aprovação e geram discussão construtiva.", "2026-03-30", "Desenvolvimento"],
    ["home-office-distracao-real", "As Distrações Reais do Home Office (E Como Eliminar Cada Uma)", "Além do gato na câmera: os inimigos invisíveis da produtividade em casa.", "2026-03-31", "Produtividade"],
    ["como-liderar-time-desmotivado", "Como Liderar um Time Desmotivado (Sem Discurso de LinkedIn)", "Ações concretas que realmente reengajam equipes em baixa performance.", "2026-04-01", "Liderança"],
    ["automacao-que-nao-funciona", "Automatizei o Processo e Quebrou Tudo: Lições de Automação", "As armadilhas mais comuns em projetos de automação e como comunicar os resultados negativos.", "2026-04-02", "Desenvolvimento"],
    ["cultura-de-feedback-que-funciona", "Cultura de Feedback: Como Criar Um Ambiente Onde Críticas São Bem-Vindas", "Da teoria à prática: o que diferencia times que crescem daqueles que estagnam.", "2026-04-03", "Liderança"],
    ["como-justificar-retrabalho", "Tive que Refazer Tudo: Como Justificar Retrabalho Profissionalmente", "Comunicando rework sem perder credibilidade e usando a situação como oportunidade.", "2026-04-04", "Comunicação"],
    ["kanban-para-vida-real", "Kanban Para Quem Está Sempre Atrasado: Um Guia Honesto", "Como usar o método Kanban para realmente organizar o trabalho caótico do dia a dia.", "2026-04-05", "Produtividade"],
    ["como-lidar-com-critica-publica", "Como Responder a Críticas Públicas no Trabalho sem se Destruir", "Estratégias para manter a compostura e profissionalismo quando você é criticado em grupo.", "2026-04-06", "Carreira"],
    ["deploy-na-sexta-guia-sobrevivencia", "Deploy na Sexta-Feira: O Guia Completo de Sobrevivência", "Por que fazemos deploy na sexta e o checklist para sair do fds sem catástrofe.", "2026-04-07", "Desenvolvimento"],
    ["como-escrever-proposta-comercial", "Como Escrever uma Proposta Comercial que Fecha Negócio", "A estrutura e a psicologia por trás de propostas que convertem.", "2026-04-08", "Comunicação"],
    ["gestao-remota-desafios-reais", "Gestão de Times Remotos: Os Desafios que Ninguém Conta", "Além do Zoom e do Slack: o que realmente dificulta liderar à distância.", "2026-04-09", "Liderança"],
    ["erros-que-salvaram-produtos", "Os Erros que Viraram Produtos de Sucesso: Lições de Falhas Famosas", "Post-mortem de grandes falhas corporativas que geraram inovações inesperadas.", "2026-04-10", "Humor Corporativo"],
];

const faqTemplate = (title) => [
    { question: `Como lidar com ${title.split(":")[0].toLowerCase()}?`, answer: "A chave é a comunicação proativa e transparente. Aborde o problema cedo, apresente o contexto e proponha soluções concretas." },
    { question: "Isso pode prejudicar minha carreira?", answer: "Depende de como você comunica. Profissionais que comunicam erros de forma estruturada geralmente ganham mais credibilidade que os que escondem problemas." },
    { question: "Existe uma fórmula para resolver essa situação?", answer: "Sim: reconheça, explique com contexto sem exculpas, apresente o impacto real e proponha um plano de ação. O Álibi Corporativo 3000 automatiza exatamente isso." },
];

const contentTemplate = (title, excerpt, category) => `${excerpt}

## Introdução

No ambiente corporativo brasileiro, situações desafiadoras são rotina. O que diferencia profissionais de alta performance não é a ausência de problemas — é a capacidade de comunicá-los com clareza e propor soluções.

## Por Que Isso Acontece

Problemas na categoria ${category} geralmente surgem de uma combinação de pressão temporal, comunicação insuficiente e expectativas mal alinhadas desde o início.

Reconhecer esses padrões é o primeiro passo para quebrá-los.

## Como Agir Profissionalmente

### 1. Reconheça o Problema Rapidamente
Quanto mais cedo você age, mais opções você tem. A janela de oportunidade para uma comunicação eficaz se fecha conforme o tempo passa.

### 2. Contextualize Sem Se Justificar Excessivamente
Há uma diferença entre explicar e se desculpar. Explique o contexto factualmente. Evite o impulso de construir uma narrativa de vitimização.

### 3. Proponha uma Solução Concreta
Qualquer comunicação de problema deve vir acompanhada de uma proposta. "Identificamos o problema X. A solução proposta é Y, com prazo Z."

### 4. Documente e Aprenda
Depois que a poeira baixar, documente o que aconteceu e o que foi feito. Isso protege você e melhora os processos da equipe.

## O Papel da Linguagem Corporativa

Em momentos críticos, a escolha das palavras muda tudo. O **Álibi Corporativo 3000** foi desenvolvido especificamente para gerar comunicações corporativas profissionais e irrefutáveis — transformando situações difíceis em demonstrações de maturidade profissional.

[Gerar minha justificativa agora →](https://alibi.roilabs.com.br)`;

const entries = EXTRA_POSTS.map(([slug, title, excerpt, date, category]) => {
    const faqs = faqTemplate(title);
    const content = contentTemplate(title, excerpt, category);
    const keywords = [slug.replace(/-/g, " "), `${category.toLowerCase()} dicas`, "comunicação corporativa"];
    return `  {
    slug: "${slug}",
    title: "${title.replace(/"/g, '\\"')}",
    excerpt: "${excerpt.replace(/"/g, '\\"')}",
    date: "${date}",
    category: "${category}",
    keywords: ${JSON.stringify(keywords)},
    faqs: ${JSON.stringify(faqs, null, 4).replace(/^/gm, "    ").trim()},
    content: \`${content.replace(/`/g, "'")}\`,
  },`;
}).join("\n");

const output = `// Auto-generated articles 11-70
import type { BlogPost } from "./blog-posts";

export const EXTRA_BLOG_POSTS: BlogPost[] = [
${entries}
];
`;

writeFileSync(new URL("../src/lib/blog-posts-extra.ts", import.meta.url), output, "utf8");
console.log("✅ Generated blog-posts-extra.ts with", EXTRA_POSTS.length, "articles");
