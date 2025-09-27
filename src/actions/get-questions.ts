"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { questionsTable } from "@/db/schema";

export async function getQuestionsBySection(section: number) {
    try {
        const questions = await db
            .select()
            .from(questionsTable)
            .where(eq(questionsTable.questionSection, section))
            .orderBy(questionsTable.questionNumber);

        return {
            success: true,
            data: questions,
        };
    } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
        return {
            success: false,
            error: "Erro interno do servidor",
        };
    }
}
