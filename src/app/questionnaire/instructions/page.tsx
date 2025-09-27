import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    PageContainer,
    PageContent,
    PageFooter,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

export const metadata: Metadata = {
    title: "Instruções",
};

const InstructionsPage = async () => {

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Diagnóstico de desigualdade de gênero no ambiente acadêmico do ILES/ULBRA</PageTitle>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center text-lg font-semibold text-gray-900">
                            Instruções
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <p>
                            Prezado(a) Aluno(a)!
                        </p>
                        <p>
                            O objetivo da coleta de dados através do presente formulário consiste em identificar, compreender e mapear
                            percepções, experiências e desigualdades de gênero vivenciadas no cotidiano acadêmico por estudantes de
                            todos os cursos noturnos presenciais de graduação do ILES/ULBRA. Os dados obtidos servirão de base para
                            reflexões institucionais, propostas de conscientização e melhorias no ambiente universitário.
                        </p>
                        <p>
                            O formulário é anônimo e tem finalidade acadêmica. A sua contribuição é fundamental para dar visibilidade a
                            realidades muitas vezes invisibilizadas, e colaborar para a construção de um espaço acadêmico mais justo,
                            respeitoso e igualitário para todos(as).
                        </p>
                        <p>
                            Cada seção corresponde a um grupo de pesquisa. As respostas serão analisadas separadamente pelos
                            respectivos grupos. Ao responder de uma só vez, você contribui para todos os projetos sem a necessidade de
                            múltiplas aplicações de formulários.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <p>
                            Não há respostas certas ou erradas. Responda com sinceridade e atenção, conforme suas experiências e
                            percepções.
                        </p>
                    </CardFooter>
                </Card>
            </PageContent>
            <PageFooter>
                <Link href={"/questionnaire/volunteer-information"} className="mb-4">
                    <Button>Avançar</Button>
                </Link>
            </PageFooter>
        </PageContainer>
    );
};

export default InstructionsPage;
