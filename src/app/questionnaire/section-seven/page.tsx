import type { Metadata } from "next";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

import { SectionSevenForm } from "./_components/section-seven-form";

export const metadata: Metadata = {
    title: "Seção 7 - Questionário",
};

const SectionFourPage = async () => {

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Seção 7 - Rede de Proteção à Mulher em Itumbiara</PageTitle>
                    <PageDescription>
                        Subprojeto: Mapeamento Institucional: Análise da rede de proteção à mulher em Itumbiara
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <SectionSevenForm />
            </PageContent>
        </PageContainer>
    );
};

export default SectionFourPage;
