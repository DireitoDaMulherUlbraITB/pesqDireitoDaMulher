"use server";

import { count, eq, sql } from "drizzle-orm";

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
type GenderCount = { gender: string | null; count: number };
type CourseCount = { course: string | null; count: number };
type PeriodCount = { period: number | null; count: number };
type SectionCount = { section: string | null; count: number };

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

        // Busca métricas do subprojeto
        const [
            totalQuestions,
            studentsByGender,
            studentsByCourse,
            studentsByPeriod,
            studentsByAge,
            studentsByProfession,
            answersBySection,
        ] = await Promise.all([
            // Total de perguntas para este grupo
            db
                .select({ count: count() })
                .from(questionsTable)
                .where(eq(questionsTable.groupId, group.id)),

            // Distribuição por gênero
            db
                .select({
                    gender: studentsTable.gender,
                    count: count(),
                })
                .from(studentsTable)
                .groupBy(studentsTable.gender) as Promise<GenderCount[]>,

            // Distribuição por curso
            db
                .select({
                    course: studentsTable.course,
                    count: count(),
                })
                .from(studentsTable)
                .groupBy(studentsTable.course) as Promise<CourseCount[]>,

            // Distribuição por período
            db
                .select({
                    period: studentsTable.period,
                    count: count(),
                })
                .from(studentsTable)
                .groupBy(studentsTable.period) as Promise<PeriodCount[]>,

            // Distribuição por idade
            db
                .select({
                    age: studentsTable.age,
                    count: count(),
                })
                .from(studentsTable)
                .groupBy(studentsTable.age) as Promise<{ age: string | null; count: number }[]>,

            // Distribuição por profissão
            db
                .select({
                    profession: studentsTable.profession,
                    count: count(),
                })
                .from(studentsTable)
                .groupBy(studentsTable.profession) as Promise<{ profession: string | null; count: number }[]>,

            // Respostas por seção (apenas para este grupo)
            db
                .select({
                    section: questionsTable.questionSection,
                    count: count(answersTable.id),
                })
                .from(questionsTable)
                .leftJoin(
                    answersTable,
                    eq(questionsTable.id, answersTable.questionId),
                )
                .where(eq(questionsTable.groupId, group.id))
                .groupBy(questionsTable.questionSection)
                .orderBy(questionsTable.questionSection) as Promise<SectionCount[]>,
        ]);

        // Busca estudantes que responderam todas as perguntas deste grupo
        const studentsWithAllAnswers = await db
            .select({
                studentId: answersTable.studentId,
                answerCount: count(answersTable.id),
            })
            .from(answersTable)
            .innerJoin(questionsTable, eq(answersTable.questionId, questionsTable.id))
            .where(eq(questionsTable.groupId, group.id))
            .groupBy(answersTable.studentId)
            .having(sql`count(${answersTable.id}) = ${totalQuestions[0]?.count || 0}`);

        // Total de estudantes que responderam todas as perguntas
        const completedStudents = studentsWithAllAnswers.length;

        // Total de estudantes únicos que responderam pelo menos uma pergunta deste grupo
        const studentsWithAnswers = await db
            .select({
                studentId: answersTable.studentId,
            })
            .from(answersTable)
            .innerJoin(questionsTable, eq(answersTable.questionId, questionsTable.id))
            .where(eq(questionsTable.groupId, group.id))
            .groupBy(answersTable.studentId);

        const totalStudents = studentsWithAnswers.length;

        // Busca dados das perguntas com suas opções de resposta
        const questionsWithAnswers = await db
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
            .orderBy(questionsTable.questionNumber, answersTable.answerText);

        // Agrupa respostas por pergunta
        const questionsData = questionsWithAnswers.reduce((acc, row) => {
            const questionId = row.questionId;
            if (!acc[questionId]) {
                acc[questionId] = {
                    questionId,
                    questionNumber: row.questionNumber,
                    questionText: row.questionText,
                    questionSection: row.questionSection,
                    type: row.type,
                    totalAnswers: 0,
                    options: [],
                };
            }

            if (row.answerText) {
                const existingOption = acc[questionId].options.find(opt => opt.text === row.answerText);
                if (existingOption) {
                    existingOption.count += row.answerCount || 0;
                } else {
                    acc[questionId].options.push({
                        text: row.answerText,
                        count: row.answerCount || 0,
                    });
                }
                acc[questionId].totalAnswers += row.answerCount || 0;
            }

            return acc;
        }, {} as Record<string, any>);

        // Busca estudantes com sessões ativas
        const activeSessions = await db
            .select({ count: count() })
            .from(studentSessionsTable)
            .where(sql`${studentSessionsTable.expiresAt} > NOW()`);

        // Calcula métricas específicas do grupo
        const groupAnswers = await db
            .select({ count: count() })
            .from(answersTable)
            .innerJoin(questionsTable, eq(answersTable.questionId, questionsTable.id))
            .where(eq(questionsTable.groupId, group.id));

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
                studentsByGender: studentsByGender.map((item) => ({
                    gender: item.gender as string,
                    count: item.count,
                })),
                studentsByCourse: studentsByCourse.map((item) => ({
                    course: item.course as string,
                    count: item.count,
                })),
                studentsByPeriod: studentsByPeriod.map((item) => ({
                    period: item.period as number,
                    count: item.count,
                })),
                studentsByAge: studentsByAge.map((item) => ({
                    age: item.age as string,
                    count: item.count,
                })),
                studentsByProfession: studentsByProfession.map((item) => ({
                    profession: item.profession as string,
                    count: item.count,
                })),
                answersBySection: answersBySection.map((item) => ({
                    section: item.section as string,
                    count: item.count,
                })),
                questionsData: Object.values(questionsData).sort((a, b) => {
                    // Converte questionNumber para número para ordenação correta
                    const numA = parseInt(a.questionNumber) || 0;
                    const numB = parseInt(b.questionNumber) || 0;
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
