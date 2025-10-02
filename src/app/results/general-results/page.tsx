"use client";

import { BarChart3, Briefcase, Calendar, CheckCircle, ChevronDown, ChevronUp, FileText, GraduationCap, TrendingUp, User, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { getGeneralMetrics } from "@/actions/get-general-metrics";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface QuestionOption {
  text: string;
  count: number;
}

interface QuestionData {
  questionId: string;
  questionNumber: string | null;
  questionText: string | null;
  questionSection: string | null;
  type: string | null;
  totalAnswers: number;
  options: QuestionOption[];
}

interface MetricsData {
  totalQuestions: number;
  totalStudents: number;
  totalAnswers: number;
  completedStudents: number;
  activeSessions: number;
  completionRate: number;
  studentsByGender: Array<{ gender: string; count: number }>;
  studentsByCourse: Array<{ course: string; count: number }>;
  studentsByPeriod: Array<{ period: number; count: number }>;
  studentsByAge: Array<{ age: string; count: number }>;
  studentsByProfession: Array<{ profession: string; count: number }>;
  answersBySection: Array<{ section: number; count: number }>;
  questionsData: QuestionData[];
}

export default function GeneralResultsPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllAges, setShowAllAges] = useState(false);
  const [showAllProfessions, setShowAllProfessions] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const result = await getGeneralMetrics();
        if (result.success && result.data) {
          setMetrics(result.data as MetricsData);
        } else {
          setError(result.message || "Erro ao carregar métricas");
        }
      } catch {
        setError("Erro interno do servidor");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <Image src="/LogoUlbra.png" alt="ULBRA" width={150} height={50} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resultados Gerais</h1>
              <p className="text-lg text-gray-600">Amostragem sem filtro de subprojeto</p>
            </div>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Perguntas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalQuestions}</div>
              <p className="text-xs text-muted-foreground">Perguntas cadastradas</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Estudantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Estudantes com respostas</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Respostas Recebidas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalAnswers}</div>
              <p className="text-xs text-muted-foreground">Respostas coletadas</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.completionRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.completedStudents} de {metrics.totalStudents} concluíram
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Métricas Secundárias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Distribuição por Gênero
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...metrics.studentsByGender].sort((a, b) => b.count - a.count).map((item) => (
                  <div key={item.gender} className="flex items-center justify-between min-w-0">
                    <span className="capitalize truncate max-w-[60%]">{item.gender === 'male' ? 'Masculino' : item.gender === 'female' ? 'Feminino' : item.gender === 'another' ? 'Outro' : 'Não informado'}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Distribuição por Curso
              </CardTitle>
              <button
                className="ml-auto text-sm text-primary hover:underline flex items-center gap-1"
                onClick={() => setShowAllCourses((v) => !v)}
              >
                {showAllCourses ? (<>
                  Recolher <ChevronUp className="h-4 w-4" />
                </>) : (<>
                  Ver todos <ChevronDown className="h-4 w-4" />
                </>)}
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(showAllCourses ? [...metrics.studentsByCourse].sort((a, b) => b.count - a.count) : [...metrics.studentsByCourse].sort((a, b) => b.count - a.count).slice(0, 5)).map((item) => (
                  <div key={item.course} className="flex items-center justify-between min-w-0">
                    <span className="truncate max-w-[60%]">{item.course}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                  </div>
                ))}
                {!showAllCourses && metrics.studentsByCourse.length > 5 && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{metrics.studentsByCourse.length - 5} outros cursos
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Distribuição por Idade
              </CardTitle>
              <button
                className="ml-auto text-sm text-primary hover:underline flex items-center gap-1"
                onClick={() => setShowAllAges((v) => !v)}
              >
                {showAllAges ? (<>
                  Recolher <ChevronUp className="h-4 w-4" />
                </>) : (<>
                  Ver todas <ChevronDown className="h-4 w-4" />
                </>)}
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(showAllAges ? [...metrics.studentsByAge].sort((a, b) => b.count - a.count) : [...metrics.studentsByAge].sort((a, b) => b.count - a.count).slice(0, 5)).map((item) => (
                  <div key={item.age} className="flex items-center justify-between min-w-0">
                    <span className="truncate max-w-[60%]">{item.age} anos</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                  </div>
                ))}
                {!showAllAges && metrics.studentsByAge.length > 5 && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{metrics.studentsByAge.length - 5} outras idades
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Distribuição por Profissão
              </CardTitle>
              <button
                className="ml-auto text-sm text-primary hover:underline flex items-center gap-1"
                onClick={() => setShowAllProfessions((v) => !v)}
              >
                {showAllProfessions ? (<>
                  Recolher <ChevronUp className="h-4 w-4" />
                </>) : (<>
                  Ver todas <ChevronDown className="h-4 w-4" />
                </>)}
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(showAllProfessions ? [...metrics.studentsByProfession].sort((a, b) => b.count - a.count) : [...metrics.studentsByProfession].sort((a, b) => b.count - a.count).slice(0, 5)).map((item) => (
                  <div key={item.profession} className="flex items-center justify-between min-w-0">
                    <span className="truncate max-w-[60%]">{item.profession}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                  </div>
                ))}
                {!showAllProfessions && metrics.studentsByProfession.length > 5 && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{metrics.studentsByProfession.length - 5} outras profissões
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Respostas por Seção */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Respostas por Seção
            </CardTitle>
            <CardDescription>
              Distribuição das respostas por seção do questionário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.answersBySection.map((item) => (
                <div key={item.section} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Seção {item.section}</h4>
                    <Badge variant="outline">{item.count}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
