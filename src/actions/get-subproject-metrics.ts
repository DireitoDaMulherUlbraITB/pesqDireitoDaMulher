"use server";

import { and, count, desc, eq, inArray, sql } from "drizzle-orm";

import { db } from "@/db";
import {
    answersTable,
    groupAccessTokensTable,
    questionsTable,
    studentSessionsTable,
    studentsTable,
} from "@/db/schema";

// ---------------------------
// Tipos auxiliares
// ---------------------------
type QuestionData = {
    questionId: string;
    questionNumber: string | null;
    questionText: string | null;
    questionSection: string | null;
    type: string | null;
    totalAnswers: number;
    options: Array<{
        text: string;
        count: number;
        topCourses?: Array<{ course: string; count: number }>;
        topAges?: Array<{ age: string; count: number }>;
        topProfessions?: Array<{ profession: string; count: number }>;
        topGenders?: Array<{ gender: string; count: number }>;
    }>;
};

export async function getSubprojectMetrics(token: string) {
    try {
        // Busca o grupo pelo token
        const group = await db.query.groupAccessTokensTable.findFirst({
            where: eq(groupAccessTokensTable.token, token),
        });

        if (!group) {
            return {
                success: false,
                message: "Subprojeto não encontrado",
            };
        }

        // Executa todas as consultas básicas em paralelo
        const [
            totalQuestions,
            totalStudentsRow,
            completedRows,
            activeSessions,
            groupAnswers,
            questionsWithAnswers,
        ] = await Promise.all([
            // Total de perguntas para este grupo
            db
                .select({ count: count() })
                .from(questionsTable)
                .where(eq(questionsTable.groupId, group.id)),

            // Total de estudantes cadastrados
            db.select({ count: count() }).from(studentsTable),

            // Estudantes com status 'answered'
            db
                .select({ count: count() })
                .from(studentsTable)
                .where(eq(studentsTable.responseStatus, 'answered')),

            // Busca estudantes com sessões ativas
            db
                .select({ count: count() })
                .from(studentSessionsTable)
                .where(sql`${studentSessionsTable.expiresAt} > NOW()`),

            // Calcula métricas específicas do grupo
            db
                .select({ count: count() })
                .from(answersTable)
                .innerJoin(questionsTable, eq(answersTable.questionId, questionsTable.id))
                .where(eq(questionsTable.groupId, group.id)),

            // Busca dados das perguntas com suas opções de resposta
            db
                .select({
                    questionId: questionsTable.id,
                    questionNumber: questionsTable.questionNumber,
                    questionText: questionsTable.questionText,
                    questionSection: questionsTable.questionSection,
                    type: questionsTable.type,
                    answerText: answersTable.answerText,
                    answerCount: count(answersTable.id),
                })
                .from(questionsTable)
                .leftJoin(answersTable, eq(questionsTable.id, answersTable.questionId))
                .where(eq(questionsTable.groupId, group.id))
                .groupBy(
                    questionsTable.id,
                    questionsTable.questionNumber,
                    questionsTable.questionText,
                    questionsTable.questionSection,
                    questionsTable.type,
                    answersTable.answerText
                )
                .orderBy(questionsTable.questionNumber, answersTable.answerText),
        ]);

        const totalStudents = totalStudentsRow[0]?.count || 0;
        const completedStudents = completedRows[0]?.count || 0;

        // Agrupa respostas por pergunta
        const questionsData: Record<string, QuestionData> = {};
        const markQuestions: Array<{ questionId: string; answerText: string; type: string }> = [];

        for (const row of questionsWithAnswers) {
            const questionId = row.questionId;
            if (!questionsData[questionId]) {
                questionsData[questionId] = {
                    questionId,
                    questionNumber: row.questionNumber,
                    questionText: row.questionText,
                    questionSection: row.questionSection as string | null,
                    type: row.type,
                    totalAnswers: 0,
                    options: [],
                };
            }

            if (row.answerText) {
                const existingOption = questionsData[questionId].options.find((opt: { text: string }) => opt.text === row.answerText);
                if (existingOption) {
                    existingOption.count += row.answerCount || 0;
                } else {
                    questionsData[questionId].options.push({
                        text: row.answerText,
                        count: row.answerCount || 0,
                    });
                }
                questionsData[questionId].totalAnswers += row.answerCount || 0;

                // Coleta perguntas que precisam de rankings
                if (row.type === 'to-mark' || row.type === 'to-mark-several') {
                    markQuestions.push({
                        questionId,
                        answerText: row.answerText,
                        type: row.type,
                    });
                }
            }
        }

        // Busca todos os rankings em uma única consulta otimizada
        let allRankings: {
            courses?: Record<string, Array<{ course: string; count: number }>>;
            ages?: Record<string, Array<{ age: string; count: number }>>;
            professions?: Record<string, Array<{ profession: string; count: number }>>;
            genders?: Record<string, Array<{ gender: string; count: number }>>;
        } = {};
        if (markQuestions.length > 0) {
            const questionIds = [...new Set(markQuestions.map(q => q.questionId))];
            const answerTexts = [...new Set(markQuestions.map(q => q.answerText))];

            // Busca todos os rankings em paralelo
            const [coursesRankings, agesRankings, professionsRankings, gendersRankings] = await Promise.all([
                // Rankings por curso
                db
                    .select({
                        questionId: answersTable.questionId,
                        answerText: answersTable.answerText,
                        course: studentsTable.course,
                        count: count(),
                    })
                    .from(answersTable)
                    .innerJoin(studentsTable, eq(answersTable.studentId, studentsTable.id))
                    .where(
                        and(
                            inArray(answersTable.questionId, questionIds),
                            inArray(answersTable.answerText, answerTexts)
                        )
                    )
                    .groupBy(answersTable.questionId, answersTable.answerText, studentsTable.course)
                    .orderBy(answersTable.questionId, answersTable.answerText, desc(count())),

                // Rankings por idade
                db
                    .select({
                        questionId: answersTable.questionId,
                        answerText: answersTable.answerText,
                        age: studentsTable.age,
                        count: count(),
                    })
                    .from(answersTable)
                    .innerJoin(studentsTable, eq(answersTable.studentId, studentsTable.id))
                    .where(
                        and(
                            inArray(answersTable.questionId, questionIds),
                            inArray(answersTable.answerText, answerTexts)
                        )
                    )
                    .groupBy(answersTable.questionId, answersTable.answerText, studentsTable.age)
                    .orderBy(answersTable.questionId, answersTable.answerText, desc(count())),

                // Rankings por profissão
                db
                    .select({
                        questionId: answersTable.questionId,
                        answerText: answersTable.answerText,
                        profession: studentsTable.profession,
                        count: count(),
                    })
                    .from(answersTable)
                    .innerJoin(studentsTable, eq(answersTable.studentId, studentsTable.id))
                    .where(
                        and(
                            inArray(answersTable.questionId, questionIds),
                            inArray(answersTable.answerText, answerTexts)
                        )
                    )
                    .groupBy(answersTable.questionId, answersTable.answerText, studentsTable.profession)
                    .orderBy(answersTable.questionId, answersTable.answerText, desc(count())),

                // Rankings por gênero
                db
                    .select({
                        questionId: answersTable.questionId,
                        answerText: answersTable.answerText,
                        gender: studentsTable.gender,
                        count: count(),
                    })
                    .from(answersTable)
                    .innerJoin(studentsTable, eq(answersTable.studentId, studentsTable.id))
                    .where(
                        and(
                            inArray(answersTable.questionId, questionIds),
                            inArray(answersTable.answerText, answerTexts)
                        )
                    )
                    .groupBy(answersTable.questionId, answersTable.answerText, studentsTable.gender)
                    .orderBy(answersTable.questionId, answersTable.answerText, desc(count())),
            ]);

            // Processa os rankings
            const processRankings = <T extends { questionId: string; answerText: string; count: number }>(
                rankings: T[],
                key: keyof Omit<T, 'questionId' | 'answerText' | 'count'>
            ): Record<string, Array<{ [K in keyof T]: T[K] } & { count: number }>> => {
                const grouped: Record<string, Array<{ [K in keyof T]: T[K] } & { count: number }>> = {};
                for (const ranking of rankings) {
                    const groupKey = `${ranking.questionId}-${ranking.answerText}`;
                    if (!grouped[groupKey]) {
                        grouped[groupKey] = [];
                    }
                    grouped[groupKey].push({ [key]: ranking[key], count: ranking.count } as { [K in keyof T]: T[K] } & { count: number });
                }

                // Limita a 3 itens por grupo e ordena por count
                for (const groupKey in grouped) {
                    grouped[groupKey] = grouped[groupKey]
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 3);
                }
                return grouped;
            };

            allRankings = {
                courses: processRankings(coursesRankings, 'course'),
                ages: processRankings(agesRankings, 'age'),
                professions: processRankings(professionsRankings, 'profession'),
                genders: processRankings(gendersRankings, 'gender'),
            };
        }

        // Aplica os rankings às opções
        for (const questionId in questionsData) {
            for (const option of questionsData[questionId].options) {
                const groupKey = `${questionId}-${option.text}`;

                if (allRankings.courses?.[groupKey]) {
                    option.topCourses = allRankings.courses[groupKey];
                }
                if (allRankings.ages?.[groupKey]) {
                    option.topAges = allRankings.ages[groupKey];
                }
                if (allRankings.professions?.[groupKey]) {
                    option.topProfessions = allRankings.professions[groupKey];
                }
                if (allRankings.genders?.[groupKey]) {
                    option.topGenders = allRankings.genders[groupKey];
                }
            }
        }

        return {
            success: true,
            data: {
                subprojectName: group.subproject_name,
                groupName: group.group_name,
                totalQuestions: totalQuestions[0]?.count || 0,
                totalStudents: totalStudents,
                totalAnswers: groupAnswers[0]?.count || 0,
                completedStudents: completedStudents,
                activeSessions: activeSessions[0]?.count || 0,
                completionRate:
                    totalStudents > 0
                        ? Math.round((completedStudents / totalStudents) * 100)
                        : 0,
                questionsData: Object.values(questionsData).sort((a, b) => {
                    // Converte questionNumber para número para ordenação correta
                    const numA = parseInt(a.questionNumber as string) || 0;
                    const numB = parseInt(b.questionNumber as string) || 0;
                    return numA - numB;
                }),
            },
        };
    } catch (error) {
        console.error("Erro ao buscar métricas do subprojeto:", error);
        return {
            success: false,
            message: "Erro interno do servidor. Tente novamente.",
        };
    }
}
