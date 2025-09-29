"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createStudent } from "@/actions/create-student";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sessionManager } from "@/lib/session";
import { toTitleCase } from "@/lib/utils";

const createStudentSchema = z.object({
    gender: z.string().min(1, "Gênero é obrigatório"),
    otherGender: z.string().optional(),
    age: z.string().min(1, "Idade é obrigatória"),
    course: z.string().min(1, "Curso é obrigatório"),
    period: z.number().min(1, "Período é obrigatório"),
    profession: z.string().min(1, "Profissão é obrigatória"),
});

export function CreateStudentForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof createStudentSchema>>({
        resolver: zodResolver(createStudentSchema),
        defaultValues: {
            gender: "",
            otherGender: "",
            age: "",
            course: "",
            period: 1,
            profession: "",
        },
    });

    const { execute, isPending } = useAction(createStudent, {
        onSuccess: (data) => {
            // Salvar sessão no localStorage
            if (data.data?.token && data.data?.student?.id) {
                const expiresAt = data.data.session?.expiresAt;
                sessionManager.saveSession({
                    token: data.data.token,
                    studentId: data.data.student.id,
                    expiresAt: expiresAt instanceof Date ? expiresAt.toISOString() : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                });
            }

            toast.success("Informações inseridas com sucesso!");
            router.push("/questionnaire/section-one");
        },
        onError: ({ error }) => {
            toast.error(error.serverError || "Erro ao inserir informações");
        },
    });

    async function onSubmit(values: z.infer<typeof createStudentSchema>) {
        try {
            await execute(values);
        } catch (error) {
            console.error("Erro ao inserir informações:", error);
        }
    }


    return (
        <div className="min-h-screen bg-[#fcfcfc] p-6">
            <div className="max-w-2xl mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-[#760d11]">
                                Perfil Acadêmico
                            </h1>
                        </div>
                        <div className="space-y-6">
                            {/* Gênero */}
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#760d11] font-semibold">* Gênero:</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="female" id="female" />
                                                    <label htmlFor="female" className="text-gray-700">Mulher</label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="male" id="male" />
                                                    <label htmlFor="male" className="text-gray-700">Homem</label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="other" id="other" />
                                                    <label htmlFor="other" className="text-gray-700">Outro:</label>
                                                    {field.value === "other" && (
                                                        <Input
                                                            placeholder="Especifique..."
                                                            className="ml-2 flex-1 bg-white border-1 border-gray-200 text-gray-900 focus:border-accent focus:ring-accent"
                                                            {...form.register("otherGender")}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="prefer-not-to-inform" id="prefer-not-to-inform" />
                                                    <label htmlFor="prefer-not-to-inform" className="text-gray-700">Prefiro não informar</label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Idade */}
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#760d11]">* Idade:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Digite sua idade..."
                                                className="bg-white border-1 border-gray-200 text-gray-900 focus:border-accent focus:ring-accent"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Curso */}
                            <FormField
                                control={form.control}
                                name="course"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#760d11]">* Curso:</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white border-1 border-gray-200 text-gray-900 focus:border-accent focus:ring-accent">
                                                    <SelectValue placeholder="Selecione seu curso" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Administração">Administração</SelectItem>
                                                <SelectItem value="Agronomia">Agronomia</SelectItem>
                                                <SelectItem value="Biomedicina">Biomedicina</SelectItem>
                                                <SelectItem value="Direito">Direito</SelectItem>
                                                <SelectItem value="Engenharia Civil">Engenharia Civil</SelectItem>
                                                <SelectItem value="Medicina Veterinária">Medicina Veterinária</SelectItem>
                                                <SelectItem value="Psicologia">Psicologia</SelectItem>
                                                <SelectItem value="Sistemas de informação">Sistemas de informação</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Período */}
                            <FormField
                                control={form.control}
                                name="period"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#760d11]">* Período:</FormLabel>
                                        <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white border-1 border-gray-200 text-gray-900 focus:border-accent focus:ring-accent">
                                                    <SelectValue placeholder="Selecione o período" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((period) => (
                                                    <SelectItem key={period} value={period.toString()}>
                                                        {period}º período
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Profissão */}
                            <FormField
                                control={form.control}
                                name="profession"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#760d11]">* Profissão:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Digite sua profissão..."
                                                className="bg-white border-1 border-gray-200 text-gray-900 focus:border-accent focus:ring-accent"
                                                {...field}
                                                onBlur={(e) => {
                                                    const formatted = toTitleCase(e.target.value);
                                                    field.onChange(formatted);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full space-y-3 text-center mt-8">
                            <Button
                                type="submit"
                                className="w-full"
                                variant="default"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Avançar"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreateStudentForm;
