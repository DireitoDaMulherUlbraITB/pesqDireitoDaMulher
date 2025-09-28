// Configuração de opções personalizadas para cada questão
// Você pode adicionar as opções específicas para cada pergunta aqui

export const questionOptions: Record<string, string[]> = {
    // Exemplo: substitua "question-id-1" pelo ID real da pergunta
    //1 Você tem filhos?
    "0276fe0d-21a5-4fd8-b8a4-f94f6f0519e0": [
        "Sim",
        "Não",
    ],
    //3 Você já esteve grávida durante o curso?
    "a5aee08d-3454-4b52-8915-e58cbe4a62d9": [
        "Sim",
        "Não",
        "Não se aplica"
    ],
    //4 Você se tornou pai durante o curso?
    "7d54ddd6-61b3-480c-88a9-7f752a269b65": [
        "Sim",
        "Não",
        "Não se aplica"
    ],
    //5 Durante a gestação, a universidade ofereceu apoio (ex.: exercícios domiciliares, flexibilização)?
    "b9bcf6b7-894e-43a4-b58c-6c6f4e8351f4": [
        "Sim",
        "Parcialmente",
        "Não",
        "Não se aplica"
    ],
    // 6 Após o nascimento do(s) filho(s) (ou se for o caso de adoção), como você conciliou maternidade (ou paternidade) e estudos?
    "e0a0899f-b767-401d-acc2-7c8e69f42b4c": [
        "Você pretende ter filhos durante a faculdade?",
        "Apoio da família",
        "Apoio de colegas/professores",
        "Apoio institucional (bolsa, auxílio, etc.)",
        "Sem apoio significativo",
        "Outro",
        "Não se aplica",
    ],
    // 7 Você já pensou em trancar ou desistir do curso devido à maternidade/paternidade?
    "f8ab1c24-90b0-4f59-8e51-a40df31d4351": [
        "Sim",
        "Não",
        "Não se aplica",
    ],
    // 8 Quais os principais impactos da maternidade/paternidade em sua vida acadêmica?
    "5578fd81-11bb-4d6f-aafa-94da68f095c1": [
        "Faltas às aulas",
        "Dificuldade em participar de atividades extracurriculares",
        "Queda no rendimento acadêmico",
        "Dificuldade em cumprir prazos/trabalhos",
        "Cansaço/saúde mental abalada",
        "Outros",
    ],
    // 9 Você já sofreu discriminação ou comentários negativos por ser mãe/pai universitária(o)?
    "c669a3b8-e52b-4918-9b72-6364810f20dd": [
        "Sim",
        "Não",
    ],
    // 10 Se sim anteriormente, de quem partiu?
    "ca89b9ec-9484-4237-b5d9-1e7a2c7964b0": [
        "Colegas",
        "Professores(as)",
        "Instituição",
        "Outro",
        "Não se aplica",
    ],
    // 11 Quem mais contribui para que você consiga continuar os estudos?
    "e4b2dc61-6489-4836-89d4-4f416b299169": [
        "Família",
        "Parceiro(a)",
        "Amigos(as)",
        "Professores(as)",
        "Instituição",
        "Ninguém",
        "Não se aplica",
    ],
    // 12 Você conhece políticas institucionais voltadas a mães universitárias (auxílio, bolsas, flexibilização)?
    "bdeffa02-ceab-4d64-bcac-aff97c3dc659": [
        "Sim",
        "Não",
        "Não se aplica",
    ],
    // 13 Você pretende ter filhos durante a faculdade?
    "3a845455-dc56-46db-af0c-9da068fc1157": [
        "Sim",
        "Não",
        "Não sei",
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
