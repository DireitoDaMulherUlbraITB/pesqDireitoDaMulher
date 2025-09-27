"use server";

import { and, eq, gt } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

import { db } from "@/db";
import { studentSessionsTable, studentsTable } from "@/db/schema";

const action = createSafeActionClient();

const validateSessionSchema = z.object({
    token: z.string().min(1, "Token é obrigatório"),
});

export const validateSession = action
    .schema(validateSessionSchema)
    .action(async ({ parsedInput }) => {
        try {
            const now = new Date();

            // Buscar sessão válida
            const session = await db
                .select({
                    id: studentSessionsTable.id,
                    studentId: studentSessionsTable.studentId,
                    token: studentSessionsTable.token,
                    expiresAt: studentSessionsTable.expiresAt,
                })
                .from(studentSessionsTable)
                .where(
                    and(
                        eq(studentSessionsTable.token, parsedInput.token),
                        gt(studentSessionsTable.expiresAt, now)
                    )
                )
                .limit(1);

            if (!session.length) {
                return {
                    success: false,
                    error: "Sessão inválida ou expirada",
                };
            }

            // Buscar dados do estudante
            const student = await db
                .select({
                    id: studentsTable.id,
                    gender: studentsTable.gender,
                    age: studentsTable.age,
                    course: studentsTable.course,
                    period: studentsTable.period,
                    profession: studentsTable.profession,
                    responseStatus: studentsTable.responseStatus,
                })
                .from(studentsTable)
                .where(eq(studentsTable.id, session[0].studentId))
                .limit(1);

            if (!student.length) {
                return {
                    success: false,
                    error: "Estudante não encontrado",
                };
            }

            return {
                success: true,
                student: student[0],
                session: session[0],
            };
        } catch (error) {
            console.error("Erro ao validar sessão:", error);
            throw new Error("Erro interno do servidor ao validar sessão");
        }
    });
