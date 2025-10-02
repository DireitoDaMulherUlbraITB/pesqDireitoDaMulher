"use client";

import {
    Briefcase,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    FileText,
    GraduationCap,
    Transgender,
    TrendingUp,
    Users
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getSubprojectMetrics } from "@/actions/get-subproject-metrics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";

interface QuestionOption {
    text: string;
    count: number;
    topCourses?: Array<{ course: string, count: number }>;
    topAges?: Array<{ age: string, count: number }>;
    topProfessions?: Array<{ profession: string, count: number }>;
    topGenders?: Array<{ gender: string, count: number }>;
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
    subprojectName: string;
    groupName: string;
    totalQuestions: number;
    totalStudents: number;
    totalAnswers: number;
    completedStudents: number;
    activeSessions: number;
    completionRate: number;
    questionsData: QuestionData[];
}

export default function SubprojectResultsPage() {
    const params = useParams();
    const token = params.token as string;

    const [metrics, setMetrics] = useState<MetricsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

    const toggleQuestionExpansion = (questionId: string) => {
        setExpandedQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionId)) {
                newSet.delete(questionId);
            } else {
                newSet.add(questionId);
            }
            return newSet;
        });
    };

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setIsLoading(true);
                const result = await getSubprojectMetrics(token);

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

        if (token) {
            fetchMetrics();
        }
    }, [token]);

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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-red-600">Erro</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (!metrics) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                        <Image src="/LogoUlbra.png" alt="ULBRA" width={150} height={50} />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{metrics.groupName}</h1>
                            <p className="text-lg text-gray-600">{metrics.subprojectName}</p>
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
                            <p className="text-xs text-muted-foreground">
                                Perguntas cadastradas nesta seção
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Respostas Recebidas</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.totalAnswers}</div>
                            <p className="text-xs text-muted-foreground">
                                Respostas coletadas nesta seção
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Estudantes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.totalStudents}</div>
                            <p className="text-xs text-muted-foreground">
                                Estudantes cadastrados (Geral)
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Taxa de Conclusão da Seção</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {(() => {
                                // Calcula a taxa de conclusão da seção considerando perguntas
                                const totalPossiveisRespostas = metrics.totalStudents * metrics.totalQuestions;
                                const sectionCompletionRate = totalPossiveisRespostas > 0
                                    ? Math.round((metrics.totalAnswers / totalPossiveisRespostas) * 100)
                                    : 0;
                                return (
                                    <>
                                        <div className="text-2xl font-bold">{sectionCompletionRate}%</div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {metrics.totalAnswers} de {totalPossiveisRespostas} respostas esperadas nesta seção
                                        </p>
                                    </>
                                );
                            })()}
                        </CardContent>
                    </Card>
                </div>

                {/* Seções secundárias e "Respostas por Seção" foram movidas para página de resultados gerais */}

                {/* Análise por Pergunta */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Análise por Pergunta
                        </CardTitle>
                        <CardDescription>
                            Taxa de escolha e respostas detalhadas para cada pergunta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {metrics.questionsData.map((question) => (
                                <Card key={question.questionId} className="border-l-4 border-l-blue-500">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <CardTitle className="text-lg break-words">
                                                    Pergunta {question.questionNumber}
                                                </CardTitle>
                                                <CardDescription className="mt-2 break-words text-sm sm:text-base">
                                                    {question.questionText}
                                                </CardDescription>
                                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                                    <Badge variant="outline" className="text-xs">
                                                        {question.type === 'to-write' ? 'Pergunta Aberta' : 'Objetiva'}
                                                    </Badge>
                                                    <Badge variant="secondary" className="text-xs">
                                                        Seção {question.questionSection}
                                                    </Badge>
                                                    <Badge variant="default" className="text-xs">
                                                        {question.totalAnswers} respostas
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {question.type === 'input' || question.type === 'textarea' ? (
                                            // Para perguntas de input, mostrar card expansível
                                            <Collapsible
                                                open={expandedQuestions.has(question.questionId)}
                                                onOpenChange={() => toggleQuestionExpansion(question.questionId)}
                                            >
                                                <CollapsibleTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-between">
                                                        Ver respostas detalhadas
                                                        {expandedQuestions.has(question.questionId) ? (
                                                            <ChevronUp className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronDown className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="mt-4">
                                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                                        {question.options
                                                            .slice()
                                                            .sort((a, b) => b.count - a.count)
                                                            .map((option, index) => (
                                                                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                                                    <p className="text-sm text-gray-700 break-words">
                                                                        {option.text}
                                                                    </p>
                                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-2">
                                                                        <span className="text-xs text-gray-500">
                                                                            Resposta {index + 1}
                                                                        </span>
                                                                        <Badge variant="outline" className="text-xs w-fit">
                                                                            {option.count} vez{option.count !== 1 ? 'es' : ''}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ) : (
                                            // Para perguntas de múltipla escolha, mostrar apenas números
                                            <div className="space-y-3">
                                                {question.options
                                                    .slice()
                                                    .sort((a, b) => b.count - a.count)
                                                    .map((option, index) => {
                                                        return (
                                                            <div key={index} className="space-y-2 p-4 rounded-lg bg-gray-50 border border-gray-200">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <span className="text-base font-semibold text-gray-800 break-words">
                                                                        {option.text}
                                                                    </span>
                                                                    <Badge variant="outline" className="text-xs text-primary border-1 border-primary px-2 py-1 font-bold">
                                                                        {option.count}
                                                                    </Badge>
                                                                </div>
                                                                {/* Rankings */}
                                                                <p className="text-sm text-gray-800 font-light">Ranqueamento por características dos estudantes</p>
                                                                {(question.type === 'to-mark' || question.type === 'to-mark-several') && (
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                                                                        {option.topCourses && option.topCourses.length > 0 && (
                                                                            <div className="mb-2">
                                                                                <span className="flex gap-2 font-semibold text-gray-800 mb-1"><GraduationCap className="h-5 w-5" /> Cursos</span>
                                                                                <div className="flex flex-col gap-2">
                                                                                    {option.topCourses.map((c) => (
                                                                                        <Badge key={c.course} variant="secondary" className="text-xs px-2 py-1">{c.course} <span className="font-bold">- {c.count}</span></Badge>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {option.topAges && option.topAges.length > 0 && (
                                                                            <div className="mb-2">
                                                                                <span className="flex gap-2 font-semibold text-gray-800 mb-1"><Calendar className="h-5 w-5" />Idades</span>
                                                                                <div className="flex flex-col gap-2">
                                                                                    {option.topAges.map((a) => (
                                                                                        <Badge key={a.age} variant="secondary" className="text-xs px-2 py-1">{a.age} <span className="font-bold">({a.count})</span></Badge>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {option.topProfessions && option.topProfessions.length > 0 && (
                                                                            <div className="mb-2">
                                                                                <span className="flex gap-2 font-semibold text-gray-800 mb-1"><Briefcase className="h-5 w-5" />Profissões</span>
                                                                                <div className="flex flex-col gap-2">
                                                                                    {option.topProfessions.map((p) => (
                                                                                        <Badge key={p.profession} variant="secondary" className="text-xs px-2 py-1">{p.profession} <span className="font-bold">({p.count})</span></Badge>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {option.topGenders && option.topGenders.length > 0 && (
                                                                            <div className="mb-2">
                                                                                <span className="flex gap-2 font-semibold text-gray-800 mb-1"><Transgender className="h-5 w-5" />Gêneros</span>
                                                                                <div className="flex flex-col gap-2">
                                                                                    {option.topGenders.map((g) => {
                                                                                        let generoTraduzido = '';
                                                                                        if (g.gender === 'male') generoTraduzido = 'Masculino';
                                                                                        else if (g.gender === 'female') generoTraduzido = 'Feminino';
                                                                                        else if (g.gender === 'another') generoTraduzido = 'Outro';
                                                                                        else generoTraduzido = 'Não informado';
                                                                                        return (
                                                                                            <Badge key={g.gender} variant="secondary" className="text-xs px-2 py-1">{generoTraduzido} <span className="font-bold">({g.count})</span></Badge>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

