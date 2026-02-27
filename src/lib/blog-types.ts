export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    faqs: { question: string; answer: string }[];
    keywords: string[];
}
