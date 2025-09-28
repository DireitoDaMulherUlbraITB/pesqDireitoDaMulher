// Configuração de opções personalizadas para cada questão
// Você pode adicionar as opções específicas para cada pergunta aqui

export const questionOptions: Record<string, string[]> = {
    //1 Você já presenciou ou sofreu alguma forma de assédio (moral ou sexual) no ambiente universitário?
    "3b3c32b0-7e28-47c1-976f-6ffcc7a3e4b8": [
        "Sim, presenciei",
        "Sim, sofri",
        "Ambos",
        "Não",
    ],
    //2 Se respondeu SIM, onde esses episódios ocorreram com maior frequência?
    "f07ebb66-d4d0-45dd-9a22-dc31e5951429": [
        "Sala de aula",
        "Corredores / áreas comuns",
        "Biblioteca / laboratórios",
        "Eventos acadêmicos / festas",
        "Espaços virtuais ligados à universidade",
        "Outros",
        "Não se aplica",
    ],
    //3 Quem esteve envolvido nesses episódios?
    "93f73b15-6aaf-4906-9112-de992799cd74": [
        "Colegas de turma",
        "Professores(as)",
        "Funcionários(as) da instituição",
        "Pessoas de fora da universidade",
        "Outros",
        "Não se aplica",
    ],
    //4 Quais formas de assédio (moral e/ou sexual) você identificou ou vivenciou?
    "6b67d5c5-9fad-4a20-b3bb-2e2bb83eb440": [
        "Comentários ofensivos ou constrangedores",
        "Piadas sexistas",
        "Toques indesejados",
        "Convites insistentes / perseguição",
        "Assédio virtual ligado ao contexto acadêmico",
        "Comentários depreciativos",
        "Tratamento desigual com base em gênero ou orientação sexual",
        "Isolamento de colegas",
        "Humilhações públicas ou privadas",
        "Difamação nas redes sociais",
        "Constrangimento por desempenho, aparência ou origem social",
        "Espalhar boatos maliciosos",
        "Indiferença institucional diante de denúncias de violência ou assédio no ambiente universitário",
        "Tolerância com práticas discriminatórias em sala ou nos corredores da universidade",
        "Outros",
        "Não se aplica",
    ],
    //5 Esses episódios tiveram algum impacto em sua vida acadêmica?
    "c4d7f025-d234-495b-8d04-a0bfe12f1a17": [
        "Não impactaram",
        "Reduziram minha participação em sala",
        "Afetaram meu rendimento (notas, trabalhos, frequência)",
        "Pensei em trancar ou desistir do curso",
        "Impactaram minha saúde mental (ansiedade, depressão, insegurança)",
        "Não se aplica",
    ],
    //6 Você conhece colegas que passaram por situações semelhantes?
    "79a07999-8f9d-4ebd-a846-f8fd02739736": [
        "Sim",
        "Não",
    ],
    //7  Você conhece os canais de denúncia da universidade para casos de assédio?
    "129f74f8-d6f2-4bee-9e55-b0f7dfec399a": [
        "Sim",
        "Não",
    ],
    //8 Caso tenha sofrido assédio, você procurou ajuda?
    "9ff2ccdf-778a-4f8e-81d7-c7eac5a1141f": [
        "Sim, à universidade",
        "Sim, à polícia",
        "Sim, à familiares/amigos",
        "Não denunciei",
        "Não se aplica",
    ],
    //9 Se não denunciou, qual o principal motivo?
    "631d1041-4efe-47de-86d3-793eab1ab70b": [
        "Medo de retaliação",
        "Vergonha / constrangimento",
        "Falta de confiança nos canais institucionais",
        "Não considerei importante",
        "Outros",
        "Não se aplica",
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
