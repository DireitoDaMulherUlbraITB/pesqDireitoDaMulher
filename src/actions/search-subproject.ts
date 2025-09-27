"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { groupAccessTokensTable } from "@/db/schema";

export async function searchTokenBySubproject(subprojectName: string) {
    try {
        // Busca o token pelo nome do subprojeto
        const tokenRecord = await db.query.groupAccessTokensTable.findFirst({
            where: eq(groupAccessTokensTable.subproject_name, subprojectName),
        });

        if (!tokenRecord) {
            return {
                success: false,
                message: "Nenhum token encontrado para este subprojeto",
            };
        }

        return {
            success: true,
            token: tokenRecord.token,
            groupName: tokenRecord.group_name,
            subprojectName: tokenRecord.subproject_name,
        };
    } catch (error) {
        console.error("Erro ao buscar token:", error);
        return {
            success: false,
            message: "Erro interno do servidor. Tente novamente.",
        };
    }
}

export async function searchTokenByToken(token: string) {
    try {
        // Busca o token pelo valor do token
        const tokenRecord = await db.query.groupAccessTokensTable.findFirst({
            where: eq(groupAccessTokensTable.token, token),
        });

        if (!tokenRecord) {
            return {
                success: false,
                message: "Token não encontrado",
            };
        }

        return {
            success: true,
            token: tokenRecord.token,
            groupName: tokenRecord.group_name,
            subprojectName: tokenRecord.subproject_name,
        };
    } catch (error) {
        console.error("Erro ao buscar token:", error);
        return {
            success: false,
            message: "Erro interno do servidor. Tente novamente.",
        };
    }
}

export async function searchUserByToken(token: string) {
    try {
        const user = await db.query.groupAccessTokensTable.findFirst({
            where: eq(groupAccessTokensTable.token, token),
        });

        if (!user) {
            return {
                success: false,
                message: "Usuário não encontrado",
            };
        }

        return {
            success: true,
            groupName: user.group_name,
            subprojectName: user.subproject_name,
        };
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return {
            success: false,
            message: "Erro interno do servidor. Tente novamente.",
        };
    }
}