import type { Metadata } from "next";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

import { SectionFourForm } from "./_components/section-four-form";

export const metadata: Metadata = {
    title: "Seção 4 - Questionário",
};

const SectionFourPage = async () => {

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Seção 4 - Diários de Opressão e Assédio</PageTitle>
                    <PageDescription>
                        Subprojeto: Diários da resistência: relatos de opressão e assédio (moral e sexual) entre alunas
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <SectionFourForm />
            </PageContent>
        </PageContainer>
    );
};

export default SectionFourPage;
