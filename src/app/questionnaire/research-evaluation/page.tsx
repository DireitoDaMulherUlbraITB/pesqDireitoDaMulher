import type { Metadata } from "next";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

import { SectionEightnForm } from "./_components/section-eight-form";

export const metadata: Metadata = {
    title: "Avaliação",
};

const SectionFourPage = async () => {

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Avaliação da pesquisa</PageTitle>
                    <PageDescription>
                        Deixe sua opnião sobre esta pesquisa!
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <SectionEightnForm />
            </PageContent>
        </PageContainer>
    );
};

export default SectionFourPage;
