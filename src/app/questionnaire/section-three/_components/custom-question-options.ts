// Configuração de opções personalizadas para cada questão
// Você pode adicionar as opções específicas para cada pergunta aqui

export const questionOptions: Record<string, string[]> = {
    //1 Com que frequência você utiliza redes sociais (Instagram, WhatsApp, TikTok etc.)?
    "e2762d97-d6b7-404a-a583-e95a173eee33": [
        "O tempo todo / diariamente ",
        "Algumas vezes por semana",
        "Raramente",
        "Nunca",
    ],
    //2 Você já presenciou ou foi alvo de comentários ofensivos em ambientes digitais relacionados a gênero? 
    "1e7eabcf-828c-4d30-bd8f-6a256616978c": [
        "Sim",
        "Não",
    ],
    //3 Que tipos de violência digital você já vivenciou ou presenciou no ambiente universitário?
    "8830c261-427f-4c74-9734-c7f5f913060f": [
        "Assédio sexual (mensagens, convites, conteúdo impróprio) ",
        "Discurso de ódio / ofensas misóginas",
        "Divulgação não autorizada de imagens íntimas",
        "Perseguição virtual (cyberstalking)",
        "Exposição de dados pessoais (doxxing)",
        "Nenhuma das anteriores",
    ],
    //4 Quem foram os(as) responsáveis por tais episódios?
    "cafbd04d-dbe3-43f2-a5ff-7212aab0cb86": [
        "Colegas de curso",
        "Pessoas de fora da universidade",
        "Professores(as)",
        "Outros",
        "Não se aplica",
    ],
    //5 Esses episódios tiveram algum impacto sobre você?
    "ca014eb2-8114-43ed-80d0-99fe9792297e": [
        "Abalo emocional (ansiedade, estresse, insegurança)",
        "Afetou desempenho acadêmico (notas, trabalhos, participação)",
        "Reduziu participação em grupos virtuais da faculdade",
        "Não percebi impacto relevante",
        "Não se aplica"
    ],
    //6 Você sabia que existem leis específicas que protegem contra crimes digitais (Lei nº 13.718/2018; Lei nº 14.132/2021)?
    "156bc64f-5409-4e32-a3fd-627a527326f3": [
        "Sim",
        "Não",
    ],
    //7  Você conhece algum canal de denúncia da própria universidade para casos de violência online?
    "d6290fd0-d825-4857-956e-1c270a2e5ad6": [
        "Sim",
        "Não",
    ],
    //8 Caso tenha sofrido violência, procurou ajuda ou denunciou?
    "057681d4-3d06-442c-8381-2d18964c076c": [
        "Sim, à universidade",
        "Sim, à polícia",
        "Sim, à familiares/amigos",
        "Não denunciei",
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
