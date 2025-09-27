// Configuração de opções personalizadas para cada questão
// Você pode adicionar as opções específicas para cada pergunta aqui

export const questionOptions: Record<string, string[]> = {
    //1 Entendo o que significa igualdade de gênero no contexto acadêmico.
    "76fd52f9-1364-4eb2-a3b9-ba62f39f5651": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //2 Sei explicar o que é interseccionalidade (ex.: gênero, raça e classe).
    "c33b7e6f-01eb-4afa-ae46-28e85da26d3e": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //3 Conheço as principais políticas/leis de combate à violência de gênero.
    "67e93f6d-4511-41ee-8c39-c9cc5387deaa": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    // 4 No meu curso, homens e mulheres têm as mesmas oportunidades.
    "fb88cfa6-fe99-4688-a888-1500101bd3c9": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //5 Comentários machistas ainda acontecem no ambiente universitário.
    "f08b939e-b992-43ea-aea2-a8e145e3467a": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //6 Piadas sobre mulheres não trazem prejuízo quando são 'brincadeira'.
    "722ce5c9-e97c-4056-a508-2ee9869cacb6": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //7 Situações de assédio podem prejudicar o desempenho das alunas.
    "c1892d1d-78f2-4bc6-8321-2595e82837ce": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //8 O machismo está presente no ambiente universitário.
    "b33121c3-5d58-427d-97d8-6ec2b323a6d5": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //9 Já presenciei atitudes machistas em sala de aula ou em outros espaços acadêmicos.
    "ef1e586f-37c3-4c06-bb8f-f390f8e7109e": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //10 O machismo é algo superado e não influencia mais a vida universitária.
    "c51a9e4a-446c-41d1-b3a3-193a711e789e": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //11 A discussão sobre gênero é importante para a formação universitária.
    "66ad120c-3f2c-4ba7-8936-d45b03fc5538": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //12 Falar de gênero atrapalha o foco em conteúdos técnicos.
    "8e29f237-65f0-49f8-b5b1-984fcc4969f7": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //13 Eu me sinto confortável em contestar falas machistas em sala de aula
    "1a084b74-eb8c-4aa0-9680-5562f0f96806": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //14 Se eu presenciasse uma situação de assédio, eu apoiaria a vítima.
    "5c7f6515-611a-47c3-ae80-7392a447fa77": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //15 Já ajudei colegas a reportar casos de violência de gênero.
    "595b6a13-3e0a-4110-9ed7-c92531cac6a4": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //16 Prefiro não me envolver quando vejo desrespeito com mulheres.
    "998897f4-e1d3-4a76-b854-c0cfc94b3b95": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //17 Conheço os canais institucionais de denúncia da universidade.
    "f5feee8d-aa5f-4f7d-8dbd-c3cf03d356f7": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //18 Confio que a universidade acolheria adequadamente um caso de assédio
    "40e61b64-0c25-4fe2-9d04-cb81a5aba3eb": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //19 A universidade promove ações educativas sobre igualdade de gênero.
    "cd02104c-e0e0-4aba-8fdf-dc2783cfe820": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //20 Reconheço que a violência de gênero também ocorre online, nos grupos de turma.
    "d19e0117-e2f1-473c-8ead-db4bf582fa7e": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //21 Compartilhar memes/piadas de teor sexual sobre colegas é aceitável.
    "44c2943f-4afc-4f03-82ff-08df0fd456ca": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //22 Cada estudante é responsável por ajudar a criar um ambiente respeitoso.
    "37d0a659-3229-40fd-a0a3-aaf7a5098b19": [
        "Concordo",
        "Indiferente",
        "Discordo",
    ],
    //23 A igualdade de gênero já foi alcançada e não precisa mais ser discutida.
    "8e15fbd0-9afe-497a-9b09-955fb9b3dbec": [
        "Concordo",
        "Indiferente",
        "Discordo",
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
