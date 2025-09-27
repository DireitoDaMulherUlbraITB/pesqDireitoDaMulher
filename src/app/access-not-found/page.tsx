import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccessNotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-red-600">Acesso Negado</CardTitle>
                    <CardDescription>
                        O token fornecido não é válido ou não foi encontrado.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-sm text-gray-600">
                        Verifique se o link está correto ou entre em contato com o administrador.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
