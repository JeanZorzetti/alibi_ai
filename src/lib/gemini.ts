import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `Você é o "Algoritmo de Sobrevivência Corporativa v3.0", um advogado corporativo extremamente cínico, verboso e técnico. Sua missão é transformar confissões simples de funcionários em desculpas corporativas altamente técnicas, prolixas e absolutamente irrefutáveis.

REGRAS:
1. NUNCA admita culpa direta do funcionário. Sempre transforme o erro humano em uma "circunstância técnica inevitável".
2. Use jargões como: "gargalo logístico", "assincronicidade no pipeline de entregas", "entropia reversa no servidor de redundância", "kernel panic isolado", "ajuste técnico involuntário no cronograma", "desalinhamento de stakeholders multifuncionais", "latência cognitiva decorrente de sobrecarga de sprint", "debt técnico acumulado no backlog", "refatoração emergencial de dependências críticas".
3. Sempre comece com "Prezado(a) [Gestor/Equipe/Stakeholders]," de forma formal.
4. Inclua pelo menos uma referência a um problema técnico fictício muito específico (ex: "o load balancer do cluster de staging sofreu um timeout não-determinístico de 847ms").
5. Termine com uma frase de comprometimento vaga tipo "estamos mitigando os riscos residuais para garantir o deliverable dentro da nova janela de oportunidade".
6. Responda SEMPRE em pt-BR.
7. Limite: máximo 3 parágrafos curtos.
8. O tom deve ser SÉRIO — a graça vem da formalidade absurda, não de piadas explícitas.
9. Não use markdown, retorne APENAS texto puro.`;

const FALLBACK_EXCUSE = `Prezado(a) Gestor(a), devido a uma inconsistência imprevista na sincronização dos pacotes de dados durante a última compilação do ambiente de homologação, somada a um "kernel panic" isolado no servidor de redundância (cluster node-7b, setor 4F), o cronograma sofreu um ajuste técnico involuntário. A root cause analysis preliminar aponta para uma race condition no pipeline de CI/CD que gerou um deadlock assimétrico no serviço de orquestração de containers.

Vale ressaltar que o time de infraestrutura já implementou um hotfix emergencial e está conduzindo um post-mortem detalhado para mapear os vetores de falha. O debt técnico acumulado no último trimestre, combinado com a refatoração necessária das dependências legadas, criou uma janela de vulnerabilidade que infelizmente coincidiu com o período de entrega.

Estamos mitigando os riscos residuais e realinhando os milestones para garantir o deliverable dentro da nova janela de oportunidade. Um relatório de impacto será compartilhado com todos os stakeholders até o final do próximo sprint.`;

export async function generateExcuse(confession: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.warn("[Álibi] GEMINI_API_KEY not set — using fallback excuse");
        return FALLBACK_EXCUSE;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: SYSTEM_PROMPT,
        });

        const result = await model.generateContent(
            `O funcionário confessa: "${confession}"\n\nGere a desculpa corporativa irrefutável:`
        );

        const text = result.response.text();
        if (!text || text.trim().length === 0) {
            return FALLBACK_EXCUSE;
        }

        return text.trim();
    } catch (error) {
        console.error("[Álibi] Gemini API error:", error);
        return FALLBACK_EXCUSE;
    }
}
