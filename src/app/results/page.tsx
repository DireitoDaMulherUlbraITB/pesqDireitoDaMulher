"use client";


import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { searchTokenBySubproject } from "@/actions/search-subproject";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export default function Home() {
  const [subprojectName, setSubprojectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subprojectName.trim()) {
      toast.error("Por favor, digite o nome do subprojeto");
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
            Digite o nome do subprojeto para acessar os resultados
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="subproject"
                type="text"
                placeholder="Informe o nome do subprojeto..."
                value={subprojectName}
                onChange={(e) => setSubprojectName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full text-white"
              disabled={isLoading}
            >
              {isLoading ? "Buscando..." : "Acessar resultados"}
            </Button>
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
