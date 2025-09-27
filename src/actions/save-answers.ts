"use server";

import { createSafeActionClient } from "next-safe-action";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { db } from "@/db";
import { answersTable } from "@/db/schema";

const action = createSafeActionClient();

interface AnswerData {
    questionId: string;
    answerText: string;
}

const saveAnswersSchema = z.object({
    studentId: z.string().uuid(),
    answers: z.array(z.object({
        questionId: z.string().uuid(),
        answerText: z.string(),
    })),
});

export const saveAnswers = action
    .schema(saveAnswersSchema)
    .action(async ({ parsedInput }) => {
        try {
            const { studentId, answers } = parsedInput;

            // Filtrar apenas respostas que não estão vazias
            const validAnswers = answers.filter(answer =>
                answer.answerText && answer.answerText.trim() !== ""
            );

            // Se não há respostas válidas, retornar sucesso sem inserir nada
            if (validAnswers.length === 0) {
                return {
                    success: true,
                    message: "Nenhuma resposta válida para salvar",
                };
            }

            const answersToInsert = validAnswers.map((answer: AnswerData) => ({
                id: uuidv4(),
                answerText: answer.answerText.trim(),
                studentId: studentId,
                questionId: answer.questionId,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

            await db.insert(answersTable).values(answersToInsert);

            return {
                success: true,
                message: `${validAnswers.length} resposta(s) salva(s) com sucesso`,
            };
        } catch (error) {
            console.error("Erro ao salvar respostas:", error);
            throw new Error("Erro interno do servidor");
        }
    });
