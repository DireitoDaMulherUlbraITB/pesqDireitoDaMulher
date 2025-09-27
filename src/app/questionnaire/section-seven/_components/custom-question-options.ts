// Configuração de opções personalizadas para cada questão
// Você pode adicionar as opções específicas para cada pergunta aqui

export const questionOptions: Record<string, string[]> = {
    //1 Você já ouviu falar na Lei Maria da Penha?
    "fd7feb6c-381a-4670-b584-6ac9234c533e": [
        "Sim",
        "Não",
    ],
    //2 Você conhece a Lei Municipal de Enfrentamento à Violência Doméstica e Familiar contra a Mulher, em vigor em  Itumbiara?
    "ed5ba36e-e94b-408a-be1a-1a66e9cf3b90": [
        "Sim",
        "Não",
    ],
    //3 Você já ouviu falar na Casa da Mulher de Itumbiara?
    "427ec6f8-8481-47fb-a71d-79b3db80923c": [
        "Sim",
        "Não",
    ],
    //4 Você tem conhecimento da existência de uma Rede de Proteção à Mulher em Itumbiara, com serviço integrado  de atendimento jurídico, psicológico, assistência social, inserção no mercado de trabalho, valorização da mulher, tudo em um único espaço e sem custos?
    "f5684ea1-607b-42b8-8303-57674d578702": [
        "Sim",
        "Não",
    ],
    //5 Você sabe onde fica a Delegacia Especializada de Atendimento à Mulher (DEAM) em Itumbiara?
    "d99429c7-cc06-4ba9-87ab-faa7c2c4fd5a": [
        "Sim",
        "Não",
    ],
    //6  Você conhece os canais de denúncia (ex.: 180, 190, aplicativos)?
    "e3c8dd33-83f3-4346-a949-51ae45933a99": [
        "Sim",
        "Não",
    ],
    //7 Você já ouviu falar nos Grupos Reflexivos (voltados à responsabilização e reeducação de agressores)?
    "034d0846-eec0-43b5-99ae-96a1bbcf63c8": [
        "Sim",
        "Não",
    ],
    //8 Você acredita que a rede de proteção em Itumbiara consegue proteger efetivamente as mulheres em situação de violência?
    "4b59bf50-8e1c-4e1f-8125-8d9c7aa2a323": [
        "Sim",
        "Não",
        "Parcialmente"
    ],
    //9 Você confia que a polícia, a justiça e os serviços de saúde acolheriam adequadamente um caso de violência?
    "60c1fedd-12ea-4d44-9e57-fbdb5c4a4dfe": [
        "Sim",
        "Não",
        "Parcialmente"
    ],
    //10 Você conhece alguém que buscou ajuda em algum desses serviços?
    "ffd3646e-f233-4cdf-9a41-5e5a259b558e": [
        "Sim",
        "Não",
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
