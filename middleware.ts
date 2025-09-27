import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { groupAccessTokensTable } from "@/db/schema";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Verifica se está acessando a rota dinâmica [token]
    const tokenMatch = pathname.match(/^\/([^\/]+)$/);

    if (tokenMatch) {
        const token = tokenMatch[1];

        try {
            // Verifica se o token existe no banco de dados
            const accessToken = await db.query.groupAccessTokensTable.findFirst({
                where: eq(groupAccessTokensTable.token, token),
            });

            // Se o token não existe, redireciona para página de erro
            if (!accessToken) {
                return NextResponse.redirect(new URL("/access-not-found", req.url));
            }

            // Token válido, permite o acesso
            return NextResponse.next();
        } catch (error) {
            console.error("Erro ao verificar token:", error);
            return NextResponse.redirect(new URL("/acess-not-found", req.url));
        }
    }

    // Para outras rotas, verifica se há token na query string
    const token = req.nextUrl.searchParams.get("token");
    if (token) {
        try {
            const accessToken = await db.query.groupAccessTokensTable.findFirst({
                where: eq(groupAccessTokensTable.token, token),
            });

            if (!accessToken) {
                return NextResponse.redirect(new URL("/access-not-found", req.url));
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Erro ao verificar token:", error);
            return NextResponse.redirect(new URL("/acess-not-found", req.url));
        }
    }

    // Se não há token em nenhum formato, redireciona para página de erro
    return NextResponse.redirect(new URL("/access-not-found", req.url));
}

// Configuração do middleware para aplicar apenas em rotas específicas
export const config = {
    matcher: [
        // Aplica em todas as rotas exceto as de API, arquivos estáticos e páginas de erro
        "/((?!api|_next/static|_next/image|favicon.ico|access-not-found).*)",
    ],
};
