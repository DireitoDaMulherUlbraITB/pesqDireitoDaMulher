"use server";

import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

import { db } from "@/db";
import { studentsTable } from "@/db/schema";

const action = createSafeActionClient();

const updateStudentStatusSchema = z.object({
    studentId: z.string().uuid(),
    responseStatus: z.string(),
});

export const updateStudentStatus = action
    .schema(updateStudentStatusSchema)
    .action(async ({ parsedInput }) => {
        try {
            const { studentId, responseStatus } = parsedInput;

            await db
                .update(studentsTable)
                .set({
                    responseStatus,
                    updatedAt: new Date()
                })
                .where(eq(studentsTable.id, studentId));

            return {
                success: true,
                message: "Status do estudante atualizado com sucesso",
            };
        } catch (error) {
            console.error("Erro ao atualizar status do estudante:", error);
            throw new Error("Erro interno do servidor");
        }
    });
