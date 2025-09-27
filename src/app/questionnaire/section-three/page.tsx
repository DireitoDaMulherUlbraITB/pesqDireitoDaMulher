import type { Metadata } from "next";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

import { SectionThreeForm } from "./_components/section-three-form";

export const metadata: Metadata = {
    title: "Seção 3s - Questionário",
};

const SectionThreePage = async () => {

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Seção 3 - Violência de Gênero Online</PageTitle>
                    <PageDescription>
                        Subprojeto: Entre likes e abusos: a violência de gênero no ambiente digital universitário
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <SectionThreeForm />
            </PageContent>
        </PageContainer>
    );
};

export default SectionThreePage;
