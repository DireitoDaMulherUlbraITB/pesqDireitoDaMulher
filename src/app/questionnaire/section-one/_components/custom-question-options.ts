// Configuração de opções personalizadas para cada questão
// Você pode adicionar as opções específicas para cada pergunta aqui

export const questionOptions: Record<string, string[]> = {
    // 1
    "a223ffcc-6db6-44f4-8671-c678eb3a4f5a": [
        "Sim, frequentemente",
        "Sim, às vezes",
        "Nunca",
    ],
    // 2
    "cd7a45dc-fe57-4b3a-a425-f348fa5dad67": [
        "Colegas homens",
        "Colegas mulheres ",
        "Professores(as) ",
        "Outros",
    ],
    // 3
    "547963ae-2251-4946-b3dc-1f0c3858dbe2": [
        "Piadas ou 'brincadeiras' de cunho machista",
        "Interrupções ou desqualificação da fala de mulheres ",
        "Uso de linguagem sexista ou diminutiva (ex.: 'menina', 'mulherzinha') ",
        "Comentários sobre aparência física das alunas",
        "Outros"
    ],
    // 4
    "f02afba6-4163-48d2-9e6b-40c98ac8bf5e": [
        "Indiferente",
        "Incomodado(a), mas não manifestei",
        "Constrangido(a) / silenciado(a)",
        "Reagi / denunciei",
        "Não se aplica",
    ],
    // 5
    "f41b68bc-0c13-45da-b00a-2f2b64b27420": [
        "Não impactaram ",
        "Sim, reduziram minha participação em sala",
        "Sim, afetaram minha motivação ou desempenho",
        "Sim, pensei em desistir/trancar disciplinas ",
        "Não se aplica",
    ],
    // 6
    "787b2b65-6412-4d7a-a11a-5546bdb4eca1": [
        "Sim",
        "Não",
        "Não sei informar",
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
