"use client";

const SESSION_KEY = "student_session_token";
const STUDENT_ID_KEY = "student_id";

export interface StudentSession {
    token: string;
    studentId: string;
    expiresAt: string;
}

export const sessionManager = {
    // Salvar sessão no localStorage
    saveSession: (session: StudentSession): void => {
        if (typeof window !== "undefined") {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
            localStorage.setItem(STUDENT_ID_KEY, session.studentId);
        }
    },

    // Obter sessão do localStorage
    getSession: (): StudentSession | null => {
        if (typeof window === "undefined") return null;

        try {
            const sessionData = localStorage.getItem(SESSION_KEY);
            if (!sessionData) return null;

            const session: StudentSession = JSON.parse(sessionData);

            // Verificar se a sessão não expirou
            const now = new Date();
            const expiresAt = new Date(session.expiresAt);

            if (now > expiresAt) {
                sessionManager.clearSession();
                return null;
            }

            return session;
        } catch (error) {
            console.error("Erro ao obter sessão:", error);
            sessionManager.clearSession();
            return null;
        }
    },

    // Obter apenas o token
    getToken: (): string | null => {
        const session = sessionManager.getSession();
        return session?.token || null;
    },

    // Obter apenas o ID do estudante
    getStudentId: (): string | null => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(STUDENT_ID_KEY);
    },

    // Verificar se há uma sessão válida
    hasValidSession: (): boolean => {
        return sessionManager.getSession() !== null;
    },

    // Limpar sessão
    clearSession: (): void => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(SESSION_KEY);
            localStorage.removeItem(STUDENT_ID_KEY);
        }
    },

    // Verificar se a sessão está próxima do vencimento (últimas 2 horas)
    isSessionExpiringSoon: (): boolean => {
        const session = sessionManager.getSession();
        if (!session) return false;

        const now = new Date();
        const expiresAt = new Date(session.expiresAt);
        const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

        return expiresAt <= twoHoursFromNow;
    }
};
