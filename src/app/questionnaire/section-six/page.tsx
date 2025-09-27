import type { Metadata } from "next";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

import { SectionSixForm } from "./_components/section-six-form";

export const metadata: Metadata = {
    title: "Seção 6 - Questionário",
};

const SectionFourPage = async () => {

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Seção 6 - Motivos da Não Denúncia da Violência contra a Mulher </PageTitle>
                    <PageDescription>
                        Subprojeto: Silêncio e sobrevivência: os motivos da não denúncia
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <SectionSixForm />
            </PageContent>
        </PageContainer>
    );
};

export default SectionFourPage;
