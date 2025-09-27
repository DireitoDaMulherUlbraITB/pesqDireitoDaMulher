// Configuração de opções personalizadas para cada questão
// Você pode adicionar as opções específicas para cada pergunta aqui

export const questionOptions: Record<string, string[]> = {
    //1 Você já conheceu ou ouviu falar de mulheres que sofreram violência e não denunciaram?
    "af621509-8789-4654-bcfa-2ab56e2cade6": [
        "Sim",
        "Não",
    ],
    //2 Na sua opinião, quais são os principais motivos da não denúncia?
    "c71bac0e-163b-4974-b6d9-5684f24749bd": [
        "Medo de represálias do agressor",
        "Dependência econômica ",
        "Dependência emocional/afetiva",
        "Vergonha / estigma social",
        "Falta de confiança na polícia/justiça",
        "Falta de informação sobre direitos/canais de denúncia",
        "Falta de apoio da família ou comunidade",
        "Falta de motivo",
        "Outros",
    ],
    //3  Você acredita que denunciar aumenta a proteção da vítima?
    "f2ebe81c-7193-4c33-a6fa-95922b0afe36": [
        "Sim",
        "Não",
        "Depende",
    ],
    //4 Você acredita que o machismo influencia a decisão de não denunciar?
    "1d1e95e3-3448-4d04-8f21-c2e6ebe087bc": [
        "Sim",
        "Não",
        "Em parte",
    ],
    //5 Você conhece os canais de denúncia disponíveis no Brasil (ex.: 180, 190, Delegacia da Mulher)?
    "bbfc162f-18e3-41dd-9508-94cf041384c8": [
        "Sim",
        "Não",
    ],
    //6 Na sua opinião, a polícia acolhe bem as mulheres que denunciam?
    "17230595-e11c-4e28-b9da-36d5ed8a668a": [
        "Sim",
        "Não",
        "Depende",
    ],
    //7 Você confia que o sistema de justiça protege adequadamente as vítimas?
    "048cb631-3221-4c1c-b679-ab3a439ff9ff": [
        "Sim",
        "Não",
        "Parcialmente",
    ],
    //8 O que mais poderia incentivar a denúncia?
    "a25903b3-9e23-4180-8519-0ae2774519eb": [
        "Acolhimento humanizado pelas autoridades",
        "Garantia de proteção imediata contra o agressor",
        "Apoio psicológico",
        "Apoio financeiro e habitacional",
        "Rapidez na justiça",
        "Campanhas educativas permanentes",
        "Outro",
    ],

};

// Função para obter as opções de uma questão específica
export function getQuestionOptions(questionId: string): string[] {
    return questionOptions[questionId] || [
        "Opção 1",
        "Opção 2",
        "Opção 3",
        "Opção 4",
        "Opção 5"
    ];
}
