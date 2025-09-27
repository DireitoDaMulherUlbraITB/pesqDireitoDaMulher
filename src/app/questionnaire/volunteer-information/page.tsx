import type { Metadata } from "next";
import Image from "next/image";

import CreateStudentForm from "./_components/create-student-form";

export const metadata: Metadata = {
    title: "Perfil Acadêmico",
};

const CreateStudentFormPage = async () => {

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 relative">
            <Image
                src="/LogoUlbra.png"
                alt="Logo ULBRA"
                width={150}
                height={50}
                className="mx-auto mb-4"
            />
            <div className="relative z-10 flex w-full max-w-md flex-col items-center">
                <div className="w-full">
                    <CreateStudentForm />
                </div>
            </div>

            <span className="text-xs text-gray-500 absolute bottom-4 left-1/2 -translate-x-1/2">
                Desenvolvido por <span className="text-[#246caa]">Synqia</span>
            </span>
        </div>
    );
};

export default CreateStudentFormPage;
