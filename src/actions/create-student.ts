"use server";

import { randomBytes } from "crypto";
import { createSafeActionClient } from "next-safe-action";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { db } from "@/db";
import { studentSessionsTable, studentsTable } from "@/db/schema";

const action = createSafeActionClient();

const createStudentSchema = z.object({
    gender: z.string().min(1, "Gênero é obrigatório"),
    otherGender: z.string().optional(),
    age: z.string().min(1, "Idade é obrigatória"),
    course: z.string().min(1, "Curso é obrigatório"),
    period: z.number().min(1, "Período é obrigatório"),
    profession: z.string().min(1, "Profissão é obrigatória"),
});

export const createStudent = action
    .schema(createStudentSchema)
    .action(async ({ parsedInput }) => {
        try {
            const now = new Date();

            // Se for "other", usar o valor de otherGender, senão usar o gender selecionado
            const finalGender = parsedInput.gender === "other" && parsedInput.otherGender
                ? parsedInput.otherGender
                : parsedInput.gender;

            // Criar o estudante
            const newStudent = await db.insert(studentsTable).values({
                id: uuidv4(),
                gender: finalGender,
                age: parsedInput.age,
                course: parsedInput.course,
                period: parsedInput.period,
                profession: parsedInput.profession,
                createdAt: now,
                updatedAt: now,
            }).returning();

            // Gerar token de sessão
            const sessionToken = randomBytes(32).toString('hex');
            const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 horas

            // Criar sessão do estudante
            const newSession = await db.insert(studentSessionsTable).values({
                id: uuidv4(),
                studentId: newStudent[0].id,
                token: sessionToken,
                expiresAt: expiresAt,
                createdAt: now,
                updatedAt: now,
            }).returning();

            return {
                success: true,
                student: newStudent[0],
                session: newSession[0],
                token: sessionToken,
            };
        } catch (error) {
            console.error("Erro ao criar estudante:", error);
            throw new Error("Erro interno do servidor ao criar estudante");
        }
    });
