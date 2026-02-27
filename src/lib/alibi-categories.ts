/**
 * pSEO Data Layer — Álibi Corporativo 3000
 *
 * This module provides the data for pre-generated SEO pages.
 * Each "category" maps to a slug and gets its own landing page
 * targeting long-tail search queries.
 *
 * Future: Replace or extend this with DB queries (e.g. Prisma + Postgres)
 * to scale to thousands of routes via ISR/SSG.
 */

export interface AlibiCategory {
    slug: string;
    title: string;           // H1 / <title>
    metaDescription: string;
    headline: string;        // Hero headline variant
    description: string;     // Body copy for the page
    examples: string[];      // Prefill examples for the textarea
    keywords: string[];
    ogTitle?: string;
}

export const ALIBI_CATEGORIES: AlibiCategory[] = [
    {
        slug: "atraso-em-deploy-de-codigo",
        title: "Desculpa Pronta para Atraso em Deploy de Código",
        metaDescription:
            "Seu deploy atrasou? Gere automaticamente uma desculpa corporativa irrefutável para justificar atrasos em deploy para seu tech lead ou gerente.",
        headline: "Deploy atrasou?\nO algoritmo te salva.",
        description:
            "Deploys atrasam. É lei da natureza do desenvolvimento de software. O problema é quando o gerente ou o cliente começa a perguntar. Com o Álibi Corporativo 3000, transforme o atraso em um incidente técnico inevitável com linguagem profissional e irrefutável.",
        examples: [
            "O deploy atrasou porque encontrei um conflito de merge no último minuto",
            "O deploy de produção falhou por causa de variáveis de ambiente incorretas",
            "A pipeline de CI/CD travou na etapa de testes e o deploy não foi realizado",
        ],
        keywords: ["desculpa deploy atrasado", "justify deploy delay", "atraso entrega desenvolvimento"],
    },
    {
        slug: "esqueci-reuniao-com-cliente",
        title: "Desculpa Corporativa para Reunião Esquecida com Cliente",
        metaDescription:
            "Esqueceu uma reunião com o cliente? Gere uma justificativa profissional e irrefutável em segundos com IA. Salve sua conta agora.",
        headline: "Esqueceu a\nreunião com o cliente?\nO algoritmo te salva.",
        description:
            "Reuniões esquecidas acontecem com os melhores profissionais. A diferença está na recuperação estratégica. Transforme o esquecimento em um 'conflito de agendamento sistêmico' com nossa IA especializada em jargão corporativo.",
        examples: [
            "Esqueci completamente da reunião com o cliente às 14h de hoje",
            "Entrei na call errada e perdi a reunião com o cliente importante",
            "Misturei os horários e perdi uma reunião de demo com um cliente novo",
        ],
        keywords: ["desculpa reunião esquecida", "justify missed meeting", "esqueci call cliente"],
    },
    {
        slug: "prazo-estourado-projeto",
        title: "Desculpa Profissional para Prazo Estourado de Projeto",
        metaDescription:
            "Prazo do projeto estourou? Gere uma justificativa técnica e corporativa automaticamente. Impressione gestores com jargão profissional irrefutável.",
        headline: "Prazo estourado?\nO algoritmo constrói\nsua defesa.",
        description:
            "Prazos são frequentemente frutos de estimativas otimistas sobre sistemas complexos. Quando a realidade do projeto supera as premissas iniciais, você precisa de uma comunicação estratégica que proteja sua credibilidade.",
        examples: [
            "O prazo do projeto de 3 meses vai demorar mais 6 semanas",
            "Não vou conseguir entregar o MVP até sexta como prometido",
            "O projeto atrasou porque o escopo cresceu durante o desenvolvimento",
        ],
        keywords: ["desculpa prazo estourado", "projeto atrasado justificativa", "deadline miss excuse"],
    },
    {
        slug: "relatorio-financeiro-com-erro",
        title: "Como Justificar Erro em Planilha ou Relatório Financeiro",
        metaDescription:
            "Erro em relatório financeiro ou planilha? Gere com IA uma justificativa técnica corporativa profissional para apresentar ao seu gestor.",
        headline: "Erro no relatório\nfinanceiro?\nO algoritmo te absolve.",
        description:
            "Erros em planilhas financeiras podem ter impacto crítico, mas a forma como são comunicados determina as consequências. Transform o erro humano em uma 'inconsistência de sincronização de dados' com nossa IA.",
        examples: [
            "Enviei o relatório financeiro com os números errados para o diretor",
            "A planilha que apresentei na reunião tinha uma fórmula incorreta",
            "Calculei o ROI errado na proposta enviada para o cliente",
        ],
        keywords: ["erro relatório financeiro desculpa", "planilha errada justificativa", "explain financial error"],
    },
    {
        slug: "nao-entreguei-tarefa-no-prazo",
        title: "Desculpa para Tarefa Não Entregue no Prazo — Gerador IA",
        metaDescription:
            "Não entregou a tarefa no prazo? Use IA para gerar automaticamente uma desculpa corporativa técnica e irrefutável para seu gestor ou equipe.",
        headline: "Tarefa não entregue?\nO algoritmo constrói\nsua defesa técnica.",
        description:
            "No ambiente corporativo ágil de hoje, bloqueios são inevitáveis. A arte está em comunicá-los de forma que demonstre profissionalismo e conhecimento técnico, não falta de comprometimento.",
        examples: [
            "Não consegui terminar a task do sprint porque tive muitas reuniões",
            "A tarefa ficou bloqueada porque dependia de uma API que não estava disponível",
            "Não entreguei a feature porque encontrei um bug crítico em outra parte",
        ],
        keywords: ["tarefa não entregue justificativa", "task atrasada desculpa", "nao entregou prazo"],
    },
    {
        slug: "bug-em-producao",
        title: "Desculpa Técnica para Bug que Foi para Produção",
        metaDescription:
            "Deu bug em produção? Gere com IA uma explicação técnica irrefutável para apresentar ao time, gestores ou clientes. Salve sua carreira agora.",
        headline: "Bug em produção?\nO álibi técnico\njá está sendo compilado.",
        description:
            "Bugs em produção são a norma, não a exceção, no desenvolvimento de software moderno. A questão é como você os comunica. Transforme o incidente em um 'comportamento emergente não-determinístico do sistema distribuído'.",
        examples: [
            "Subi um código que derrubou o ambiente de produção por 2 horas",
            "O bug que passei para produção afetou todos os usuários do módulo de pagamento",
            "Fiz um push direto na main sem testar e quebramos o deploy",
        ],
        keywords: ["bug producao desculpa", "incidente tecnico justificativa", "explain production bug"],
    },
    {
        slug: "email-enviado-errado",
        title: "Desculpa Profissional para E-mail Enviado para Pessoa Errada",
        metaDescription:
            "Enviou um e-mail para a pessoa errada? Gere uma justificativa profissional e comedida para minimizar o dano com linguagem corporativa.",
        headline: "E-mail enviado\npara destinatário errado?\nO algoritmo te socorre.",
        description:
            "O envio de e-mails para destinatários incorretos é um dos incidentes corporativos mais comuns e potencialmente mais embarrassing. Uma resposta rápida, técnica e profissional é fundamental para a gestão do incidente.",
        examples: [
            "Enviei um e-mail interno criticando o cliente para o próprio cliente",
            "Mandei dados confidenciais para o e-mail errado por falta de atenção",
            "Respondi um e-mail em grupo com uma informação que era privada",
        ],
        keywords: ["email enviado errado desculpa", "wrong email sent excuse", "e-mail destinatario errado"],
    },
    {
        slug: "esqueci-de-responder-mensagem",
        title: "Desculpa para Não Responder Mensagem ou E-mail Importante",
        metaDescription:
            "Esqueceu de responder uma mensagem ou e-mail importante? Gere automaticamente um texto profissional de desculpa com IA corporativa.",
        headline: "Deixou na leitura?\nO algoritmo regenera\nsua credibilidade.",
        description:
            "Em um ambiente de trabalho hiperconectado com múltiplos canais de comunicação, é humanamente impossível não deixar mensagens importantes sem resposta eventualmente. O importante é a recuperação estratégica.",
        examples: [
            "Não respondi um e-mail importante do cliente por uma semana",
            "Deixei na leitura uma mensagem urgente do meu chefe no Slack",
            "Não dei retorno sobre uma proposta e o cliente foi para o concorrente",
        ],
        keywords: ["esqueci responder mensagem desculpa", "not reply email excuse", "deixou na leitura trabalho"],
    },
];

/** Get a category by slug */
export function getCategoryBySlug(slug: string): AlibiCategory | undefined {
    return ALIBI_CATEGORIES.find((c) => c.slug === slug);
}

/** Get all slugs for static generation */
export function getAllSlugs(): string[] {
    return ALIBI_CATEGORIES.map((c) => c.slug);
}
