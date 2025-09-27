import type { Metadata } from "next";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

import { SectionTwoForm } from "./_components/section-two-form";

export const metadata: Metadata = {
    title: "Seção 2 - Questionário",
};

const SectionOnePage = async () => {

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Seção 2 - Experiência das Mães Universitárias</PageTitle>
                    <PageDescription>
                        Subprojeto: Ser mãe e ser aluna: os desafios ocultos da permanência
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <SectionTwoForm />
            </PageContent>
        </PageContainer>
    );
};

export default SectionOnePage;
