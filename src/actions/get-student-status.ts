"use server";

import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

import { db } from "@/db";
import { studentsTable } from "@/db/schema";

const action = createSafeActionClient();

const getStudentStatusSchema = z.object({
    studentId: z.string().uuid(),
});

export const getStudentStatus = action
    .schema(getStudentStatusSchema)
    .action(async ({ parsedInput }) => {
        try {
            const { studentId } = parsedInput;

            const student = await db
                .select({
                    id: studentsTable.id,
                    responseStatus: studentsTable.responseStatus,
                })
                .from(studentsTable)
                .where(eq(studentsTable.id, studentId))
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
            };
        } catch (error) {
            console.error("Erro ao buscar status do estudante:", error);
            throw new Error("Erro interno do servidor");
        }
    });
