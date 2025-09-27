// Configuração de opções personalizadas para cada questão
// Você pode adicionar as opções específicas para cada pergunta aqui

export const questionOptions: Record<string, string[]> = {
    //1 Na sua opinião, como você avalia a relevância desta pesquisa para o ambiente acadêmico do ILES/ULBRA?
    "fe00cf80-4e55-4db1-9958-ff0adfc754ae": [
        "Extremamente necessária",
        "Necessária",
        "Pouco necessária",
        "Inútil",
        "Ultrapassada",
        "Atual",
        "Não sei opinar",
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
