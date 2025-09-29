"use server";

import { count, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import {
    answersTable,
    questionsTable,
    studentSessionsTable,
    studentsTable,
} from "@/db/schema";

type QuestionData = {
    questionId: string;
    questionNumber: string | null;
    questionText: string | null;
    questionSection: string | null;
    type: string | null;
    totalAnswers: number;
    options: Array<{ text: string; count: number }>;
};

export async function getGeneralMetrics() {
    try {
        const [
            totalQuestions,
            studentsByGender,
            studentsByCourse,
            studentsByPeriod,
            studentsByAge,
            studentsByProfession,
            answersBySection,
            totalAnswers,
        ] = await Promise.all([
            db.select({ count: count() }).from(questionsTable),
            db
                .select({ gender: studentsTable.gender, count: count() })
                .from(studentsTable)
                .groupBy(studentsTable.gender),
            db
                .select({ course: studentsTable.course, count: count() })
                .from(studentsTable)
                .groupBy(studentsTable.course),
            db
                .select({ period: studentsTable.period, count: count() })
                .from(studentsTable)
                .groupBy(studentsTable.period),
            db
                .select({ age: studentsTable.age, count: count() })
                .from(studentsTable)
                .groupBy(studentsTable.age),
            db
                .select({ profession: studentsTable.profession, count: count() })
                .from(studentsTable)
                .groupBy(studentsTable.profession),
            db
                .select({ section: questionsTable.questionSection, count: count(answersTable.id) })
                .from(questionsTable)
                .leftJoin(answersTable, eq(questionsTable.id, answersTable.questionId))
                .groupBy(questionsTable.questionSection)
                .orderBy(questionsTable.questionSection),
            db.select({ count: count() }).from(answersTable),
        ]);

        // Total de estudantes cadastrados (geral)
        const totalStudentsRow = await db.select({ count: count() }).from(studentsTable);
        const totalStudents = totalStudentsRow[0]?.count || 0;

        // Dados por pergunta (geral)
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
            .groupBy(
                questionsTable.id,
                questionsTable.questionNumber,
                questionsTable.questionText,
                questionsTable.questionSection,
                questionsTable.type,
                answersTable.answerText,
            )
            .orderBy(questionsTable.questionNumber, answersTable.answerText);

        const questionsData = questionsWithAnswers.reduce((acc, row) => {
            const questionId = row.questionId;
            if (!acc[questionId]) {
                acc[questionId] = {
                    questionId,
                    questionNumber: row.questionNumber,
                    questionText: row.questionText,
                    questionSection: row.questionSection as string | null,
                    type: row.type,
                    totalAnswers: 0,
                    options: [],
                } as QuestionData;
            }
            if (row.answerText) {
                const existing = acc[questionId].options.find((o) => o.text === row.answerText);
                if (existing) existing.count += row.answerCount || 0;
                else acc[questionId].options.push({ text: row.answerText, count: row.answerCount || 0 });
                acc[questionId].totalAnswers += row.answerCount || 0;
            }
            return acc;
        }, {} as Record<string, QuestionData>);

        const activeSessions = await db
            .select({ count: count() })
            .from(studentSessionsTable)
            .where(sql`${studentSessionsTable.expiresAt} > NOW()`);

        // Estudantes com status 'answered'
        const completedRows = await db
            .select({ count: count() })
            .from(studentsTable)
            .where(eq(studentsTable.responseStatus, 'answered'));
        const completedStudents = completedRows[0]?.count || 0;

        return {
            success: true,
            data: {
                totalQuestions: totalQuestions[0]?.count || 0,
                totalStudents,
                totalAnswers: totalAnswers[0]?.count || 0,
                completedStudents,
                activeSessions: activeSessions[0]?.count || 0,
                completionRate: totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0,
                studentsByGender: studentsByGender.map((i) => ({ gender: i.gender as string, count: i.count })),
                studentsByCourse: studentsByCourse.map((i) => ({ course: i.course as string, count: i.count })),
                studentsByPeriod: studentsByPeriod.map((i) => ({ period: i.period as number, count: i.count })),
                studentsByAge: studentsByAge.map((i) => ({ age: i.age as string, count: i.count })),
                studentsByProfession: studentsByProfession.map((i) => ({ profession: i.profession as string, count: i.count })),
                answersBySection: answersBySection.map((i) => ({ section: i.section as number, count: i.count })),
                questionsData: Object.values(questionsData).sort((a, b) => (parseInt(a.questionNumber as string) || 0) - (parseInt(b.questionNumber as string) || 0)),
            },
        } as const;
    } catch (error) {
        console.error("Erro ao buscar métricas gerais:", error);
        return { success: false as const, message: "Erro interno do servidor. Tente novamente." };
    }
}


