"use client";

import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

import { validateSession } from "@/actions/validate-session";
import { sessionManager, StudentSession } from "@/lib/session";

export function useStudentSession() {
    const [session, setSession] = useState<StudentSession | null>(null);
    const [studentId, setStudentId] = useState<string | null>(null);
    const [responseStatus, setResponseStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { execute: validateSessionAction, isPending: isValidating } = useAction(validateSession, {
        onSuccess: (data) => {
            if (data.data?.success && data.data.student?.id) {
                setStudentId(data.data.student.id);
                setResponseStatus(data.data.student.responseStatus);
            } else {
                // Sessão inválida, limpar localStorage
                sessionManager.clearSession();
                setSession(null);
                setStudentId(null);
                setResponseStatus(null);
            }
            setIsLoading(false);
        },
        onError: () => {
            // Erro na validação, limpar sessão
            sessionManager.clearSession();
            setSession(null);
            setStudentId(null);
            setResponseStatus(null);
            setIsLoading(false);
        },
    });

    useEffect(() => {
        const currentSession = sessionManager.getSession();

        if (currentSession) {
            setSession(currentSession);
            // Validar sessão no servidor
            validateSessionAction({ token: currentSession.token });
        } else {
            setStudentId(null);
            setResponseStatus(null);
            setIsLoading(false);
        }
    }, [validateSessionAction]);

    const clearSession = () => {
        sessionManager.clearSession();
        setSession(null);
        setStudentId(null);
        setResponseStatus(null);
    };

    const hasValidSession = () => {
        return sessionManager.hasValidSession() && studentId !== null;
    };

    const getToken = () => {
        return sessionManager.getToken();
    };

    const getStudentId = () => {
        return studentId || sessionManager.getStudentId();
    };

    return {
        session,
        studentId,
        responseStatus,
        isLoading: isLoading || isValidating,
        hasValidSession: hasValidSession(),
        getToken,
        getStudentId,
        clearSession,
    };
}
