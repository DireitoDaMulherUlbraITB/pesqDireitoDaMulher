"use client";


import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { listSubprojects, searchTokenBySubproject } from "@/actions/search-subproject";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function Home() {
    const [subprojectName, setSubprojectName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<string[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);

    useEffect(() => {
        const load = async () => {
            setIsLoadingOptions(true);
            try {
                const res = await listSubprojects();
                if (res.success) {
                    setOptions(res.items);
                } else {
                    toast.error(res.message || "Não foi possível carregar os subprojetos");
                }
            } catch {
                toast.error("Erro ao carregar subprojetos");
            } finally {
                setIsLoadingOptions(false);
            }
        };
        load();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!subprojectName.trim()) {
            toast.error("Por favor, selecione o subprojeto");
            return;
        }

        setIsLoading(true);

        try {
            const result = await searchTokenBySubproject(subprojectName);

            if (result.success && result.token) {
                // Redireciona para a página dinâmica pelo token
                window.location.href = `/${result.token}`;
            } else {
                toast.error(result.message || "Token não encontrado para este subprojeto");
            }
        } catch {
            toast.error("Erro ao buscar token. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative">
            <Image
                src="/LogoUlbra.png"
                alt="Logo ULBRA"
                width={150}
                height={50}
                className="mx-auto mb-4"
            />
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Pesquisa - Direito da Mulher
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Selecione o subprojeto para acessar os resultados
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="space-y-2">
                            <Select
                                value={subprojectName}
                                onValueChange={(value) => setSubprojectName(value)}
                                disabled={isLoading || isLoadingOptions}
                            >
                                <SelectTrigger className="w-full" aria-invalid={!subprojectName}>
                                    <SelectValue placeholder={isLoadingOptions ? "Carregando..." : "Selecione um subprojeto"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((name) => (
                                        <SelectItem key={name} value={name}>
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full flex flex-col gap-4 items-center">
                            <Button
                                type="submit"
                                className="w-full text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Buscando..." : "Acessar resultados"}
                            </Button>

                            <div className="flex items-center w-full">
                                <div className="flex-1 h-px bg-slate-300" />
                                <span className="px-4 text-slate-300 text-sm">ou</span>
                                <div className="flex-1 h-px bg-slate-300" />
                            </div>

                            <Link href="/results/general-results" className="w-full">
                                <Button
                                    className="w-full h-12 text-primary hover:text-white hover:bg-primary"
                                    size="lg"
                                    variant="ghost"
                                >
                                    Resultados gerais
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-center absolute bottom-0 w-full mb-4">
                <p className="text-xs text-gray-500">
                    © 2025 ILES/ULBRA. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
}
