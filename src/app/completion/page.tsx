import { BookOpen, CheckCircle, Heart, Users } from "lucide-react";
import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    PageContainer,
    PageContent,
    PageDescription,
    PageFooter,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

export const metadata: Metadata = {
    title: "Pesquisa Concluída",
};

const CompletionPage = async () => {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Pesquisa Concluída com Sucesso!</PageTitle>
                    <PageDescription>
                        Obrigado pela sua valiosa participação
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>

            <PageContent>
                <div className="flex flex-col items-center justify-center space-y-8">
                    {/* Ícone de sucesso */}
                    <div className="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>

                    {/* Card principal de agradecimento */}
                    <Card className="w-full max-w-2xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl text-green-700">
                                Muito Obrigado!
                            </CardTitle>
                            <CardDescription className="text-lg">
                                Sua participação foi fundamental para esta pesquisa
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 text-center">
                            <p className="text-gray-700 leading-relaxed">
                                Agradecemos profundamente por dedicar seu tempo e compartilhar suas experiências
                                conosco. Sua contribuição é essencial para o sucesso desta pesquisa sobre
                                desigualdade de gênero no ambiente acadêmico.
                            </p>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-blue-800 font-medium">
                                    Os dados coletados serão analisados com responsabilidade e utilizados
                                    exclusivamente para fins acadêmicos, contribuindo para a construção de
                                    um ambiente universitário mais justo e igualitário.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Cards informativos */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                <h3 className="font-semibold text-gray-800 mb-2">Sua Contribuição</h3>
                                <p className="text-sm text-gray-600">
                                    Cada resposta é valiosa para identificar e combater desigualdades
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <h3 className="font-semibold text-gray-800 mb-2">Impacto Coletivo</h3>
                                <p className="text-sm text-gray-600">
                                    Juntos podemos construir um ambiente mais inclusivo
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <h3 className="font-semibold text-gray-800 mb-2">Finalidade Acadêmica</h3>
                                <p className="text-sm text-gray-600">
                                    Pesquisa desenvolvida para estudo acadêmcio na matéria de Direito da Mulher
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Mensagem final */}
                    <div className="text-center space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Obrigado por fazer parte desta importante iniciativa!
                        </h3>
                        <p className="text-gray-600 max-w-2xl">
                            Suas respostas foram salvas com sucesso e serão utilizadas para promover
                            reflexões institucionais e melhorias no ambiente universitário.
                        </p>
                    </div>
                </div>
            </PageContent>

            <PageFooter>
                <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4">
                        Projeto: &quot;Diagnóstico de desigualdade de gênero no ambiente acadêmico do ILES/ULBRA&quot;
                    </p>
                </div>
            </PageFooter>
        </PageContainer>
    );
};

export default CompletionPage;
