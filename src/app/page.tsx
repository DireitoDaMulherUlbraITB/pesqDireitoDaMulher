"use client";

import { CheckCircle, Heart, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PageContainer,
  PageContent,
  PageDescription,
  PageFooter,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { useStudentSession } from "@/hooks/useStudentSession";

const HomePage = () => {
  const { responseStatus, isLoading } = useStudentSession();

  const hasAnswered = responseStatus === "answered";

  return (
    <PageContainer>
      <Image
        src="/LogoUlbra.png"
        alt="Logo ULBRA"
        width={150}
        height={50}
        className="mx-auto mb-4"
      />
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>
            Bem-vindo(a) à Pesquisa da turma de Direito da Mulher
          </PageTitle>
          <PageDescription>
            Uma pesquisa acadêmica para identificar e compreender percepções e experiências de gênero no ambiente universitário
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>

      <PageContent>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-lg font-semibold text-gray-900">
              Diagnóstico de Desigualdade de Gênero no Ambiente Acadêmico do
              ILES/ULBRA
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-center flex flex-col gap-4">
              <p className="text-sm text-gray-700 text-center">
                <LinkIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                Esta pesquisa integra sete subprojetos desenvolvidos por alunos(as) da disciplina
                <strong> Direito da Mulher</strong> do curso de Direito do ILES/ULBRA.
              </p>
              <p className="text-sm text-gray-700 text-center">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                Sua participação é fundamental para a construção de um ambiente acadêmico mais justo e igualitário
              </p>
              <p className="text-sm text-gray-700 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                Não há respostas certas ou erradas. Responda com sinceridade conforme suas experiências e percepções.
              </p>
            </div>

          </CardContent>
        </Card>
      </PageContent>

      <PageFooter>
        <div className="flex justify-cente">
          {isLoading ? (
            <Button size="lg" className="px-8 py-3 text-lg" disabled>
              Carregando...
            </Button>
          ) : hasAnswered ? (
            <div className="text-center space-y-4 mb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  ✅ Você já respondeu esta pesquisa!
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Obrigado pela sua participação. Suas respostas foram salvas com sucesso.
                </p>
              </div>
            </div>
          ) : (
            <Link href="/questionnaire/instructions">
              <Button size="lg" className="px-8 py-3 text-lg mb-4">
                Iniciar Pesquisa
              </Button>
            </Link>
          )}
        </div>
      </PageFooter>
    </PageContainer>
  );
};

export default HomePage;
