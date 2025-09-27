"use client";

import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

import { getQuestionsBySection } from "@/actions/get-questions";
import { saveAnswers } from "@/actions/save-answers";
import { Button } from "@/components/ui/button";
import { useStudentSession } from "@/hooks/useStudentSession";

import { QuestionFormItem } from "./question-form-item";

interface Question {
    id: string;
    questionText: string;
    type: string;
    questionNumber: string;
}

export function SectionFourForm() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [otherAnswers, setOtherAnswers] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { getStudentId, isLoading: sessionLoading } = useStudentSession();

    const { execute: saveAnswersAction, isPending: isSaving } = useAction(saveAnswers, {
        onSuccess: () => {
            router.push("/questionnaire/section-five");
        },
        onError: (error) => {
            console.error("Erro ao salvar respostas:", error);
        },
    });

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const result = await getQuestionsBySection(4);
                if (result.success && result.data) {
                    // Ordenar perguntas pelo questionNumber (convertendo para número para ordenação correta)
                    const sortedQuestions = result.data.sort((a, b) => {
                        const numA = parseInt(a.questionNumber, 10);
                        const numB = parseInt(b.questionNumber, 10);
                        return numA - numB;
                    });
                    setQuestions(sortedQuestions);
                }
            } catch (error) {
                console.error("Erro ao buscar perguntas:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerChange = (questionId: string, value: string | string[]) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleOtherChange = (questionId: string, value: string) => {
        setOtherAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const studentId = getStudentId();
        if (!studentId) {
            console.error("ID do estudante não encontrado");
            return;
        }

        const answersData = questions.flatMap(question => {
            const answer = answers[question.id];
            const otherAnswer = otherAnswers[question.id] || "";

            if (!answer) return [];

            // Se é uma pergunta de múltipla seleção
            if (Array.isArray(answer)) {
                return answer.map(selectedOption => {
                    // Se a opção selecionada é "Outros" e há texto no campo other, usar o texto do other
                    if (selectedOption === "Outros" && otherAnswer) {
                        return {
                            questionId: question.id,
                            answerText: otherAnswer
                        };
                    }
                    return {
                        questionId: question.id,
                        answerText: selectedOption
                    };
                });
            }

            // Se é uma pergunta de seleção única
            // Se a resposta é "Outros" e há texto no campo other, usar o texto do other
            if (answer === "Outros" && otherAnswer) {
                return [{
                    questionId: question.id,
                    answerText: otherAnswer
                }];
            }

            return [{
                questionId: question.id,
                answerText: answer
            }];
        });

        saveAnswersAction({
            studentId,
            answers: answersData
        });
    };

    if (sessionLoading || isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2">Carregando perguntas...</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((question) => (
                <QuestionFormItem
                    key={question.id}
                    question={question}
                    value={answers[question.id] || ""}
                    onChange={(value) => handleAnswerChange(question.id, value)}
                    otherValue={otherAnswers[question.id] || ""}
                    onOtherChange={(value) => handleOtherChange(question.id, value)}
                />
            ))}

            <div className="flex py-4">
                <Button
                    type="submit"
                    disabled={isSaving || questions.length === 0}
                    className="w-full"
                >
                    {isSaving ? "Salvando..." : "Avançar"}
                </Button>
            </div>
        </form>
    );
}
