import type { Metadata } from "next";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

import { SectionFiveForm } from "./_components/section-five-form";

export const metadata: Metadata = {
    title: "Seção 5 - Questionário",
};

const SectionFourPage = async () => {

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Seção 5 - Consciência de Gênero</PageTitle>
                    <PageDescription>
                        Subprojeto: Percepção ou negação? Um índice de consciência de gênero entre universitários(as)
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <SectionFiveForm />
            </PageContent>
        </PageContainer>
    );
};

export default SectionFourPage;
