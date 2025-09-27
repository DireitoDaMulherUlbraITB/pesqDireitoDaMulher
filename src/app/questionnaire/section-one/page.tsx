import type { Metadata } from "next";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

import { SectionOneForm } from "./_components/section-one-form";

export const metadata: Metadata = {
    title: "Seção 1 - Questionário",
};

const SectionOnePage = async () => {

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Seção 1 - Escuta Universitária e Discursos Machistas</PageTitle>
                    <PageDescription>
                        Subprojeto: Escuta e Vozes Silenciadas: discursos que atravessam o cotidiano acadêmico
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <SectionOneForm />
            </PageContent>
        </PageContainer>
    );
};

export default SectionOnePage;
