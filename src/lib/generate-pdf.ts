import jsPDF from "jspdf";

interface QuestionOption {
    text: string;
    count: number;
    topCourses?: Array<{ course: string; count: number }>;
    topAges?: Array<{ age: string; count: number }>;
    topProfessions?: Array<{ profession: string; count: number }>;
    topGenders?: Array<{ gender: string; count: number }>;
    studentInfo?: Array<{ gender: string; course: string; profession: string; age: string }>;
}

interface QuestionData {
    questionId: string;
    questionNumber: string | null;
    questionText: string | null;
    questionSection: string | null;
    type: string | null;
    totalAnswers: number;
    options: QuestionOption[];
}

interface MetricsData {
    subprojectName: string;
    groupName: string;
    totalQuestions: number;
    totalStudents: number;
    totalAnswers: number;
    completedStudents: number;
    activeSessions: number;
    completionRate: number;
    questionsData: QuestionData[];
}

export function generateResultsPDF(data: MetricsData): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Função auxiliar para adicionar texto com quebra de linha automática
    const addTextWithWrap = (text: string, x: number, y: number, maxWidth: number, fontSize: number, fontStyle: "normal" | "bold" | "italic" = "normal"): number => {
        doc.setFontSize(fontSize);
        doc.setFont(undefined, fontStyle);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return lines.length * (fontSize * 0.4); // Retorna altura usada
    };

    // Função para verificar se precisa de nova página
    const checkNewPage = (requiredHeight: number): void => {
        if (yPosition + requiredHeight > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
        }
    };

    // Função para traduzir gênero
    const translateGender = (gender: string): string => {
        if (gender === 'male') return 'Masculino';
        if (gender === 'female') return 'Feminino';
        if (gender === 'another') return 'Outro';
        if (gender === 'prefer-not-to-inform' || gender === 'prefere-not-to-inform') return 'Não informado';
        return gender;
    };

    // Título do grupo (fonte 18pt, negrito, centralizado)
    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    const titleLines = doc.splitTextToSize(data.groupName, maxWidth);
    const titleY = yPosition + 10;
    doc.text(titleLines, pageWidth / 2, titleY, { align: "center" });
    yPosition = titleY + titleLines.length * 7 + 10;

    // Subtítulo com nome do subprojeto (fonte 12pt, normal)
    if (data.subprojectName) {
        checkNewPage(10);
        doc.setFontSize(12);
        doc.setFont(undefined, "normal");
        const subtitleLines = doc.splitTextToSize(data.subprojectName, maxWidth);
        doc.text(subtitleLines, pageWidth / 2, yPosition, { align: "center" });
        yPosition += subtitleLines.length * 5 + 15;
    }

    // Processar cada questão
    data.questionsData.forEach((question, index) => {
        checkNewPage(30);

        // Número da pergunta (fonte 14pt, negrito)
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        const questionNumberText = `Pergunta ${question.questionNumber || index + 1}`;
        doc.text(questionNumberText, margin, yPosition);
        yPosition += 8;

        // Texto da questão (fonte 12pt, normal)
        checkNewPage(20);
        if (question.questionText) {
            const questionHeight = addTextWithWrap(
                question.questionText,
                margin,
                yPosition,
                maxWidth,
                12,
                "normal"
            );
            yPosition += questionHeight + 5;
        }

        // Total de respostas (fonte 10pt, itálico)
        checkNewPage(10);
        doc.setFontSize(10);
        doc.setFont(undefined, "italic");
        const totalAnswersText = `Total de respostas: ${question.totalAnswers}`;
        doc.text(totalAnswersText, margin, yPosition);
        yPosition += 8;

        // Lista de respostas
        if (question.options && question.options.length > 0) {
            // Ordenar opções por contagem (maior para menor)
            const sortedOptions = [...question.options].sort((a, b) => b.count - a.count);

            sortedOptions.forEach((option) => {
                checkNewPage(15);

                // Texto da resposta (fonte 11pt, normal)
                doc.setFontSize(11);
                doc.setFont(undefined, "normal");
                
                const answerText = `• ${option.text} (${option.count} resposta${option.count !== 1 ? "s" : ""})`;
                const answerHeight = addTextWithWrap(
                    answerText,
                    margin + 5,
                    yPosition,
                    maxWidth - 5,
                    11,
                    "normal"
                );
                yPosition += answerHeight + 3;

                // Para questões objetivas: exibir breakdown por características
                if ((question.type === 'to-mark' || question.type === 'to-mark-several') && 
                    (option.topCourses || option.topAges || option.topProfessions || option.topGenders)) {
                    checkNewPage(20);
                    doc.setFontSize(9);
                    doc.setFont(undefined, "normal");
                    
                    const indent = margin + 10;
                    let breakdownY = yPosition;

                    // Breakdown por curso
                    if (option.topCourses && option.topCourses.length > 0) {
                        const coursesText = `  Cursos: ${option.topCourses.map(c => `${c.course} (${c.count})`).join(", ")}`;
                        const coursesHeight = addTextWithWrap(coursesText, indent, breakdownY, maxWidth - 10, 9, "normal");
                        breakdownY += coursesHeight + 2;
                    }

                    // Breakdown por idade
                    if (option.topAges && option.topAges.length > 0) {
                        const agesText = `  Idades: ${option.topAges.map(a => `${a.age} anos (${a.count})`).join(", ")}`;
                        const agesHeight = addTextWithWrap(agesText, indent, breakdownY, maxWidth - 10, 9, "normal");
                        breakdownY += agesHeight + 2;
                    }

                    // Breakdown por profissão
                    if (option.topProfessions && option.topProfessions.length > 0) {
                        const professionsText = `  Profissões: ${option.topProfessions.map(p => `${p.profession} (${p.count})`).join(", ")}`;
                        const professionsHeight = addTextWithWrap(professionsText, indent, breakdownY, maxWidth - 10, 9, "normal");
                        breakdownY += professionsHeight + 2;
                    }

                    // Breakdown por gênero
                    if (option.topGenders && option.topGenders.length > 0) {
                        const gendersText = `  Gêneros: ${option.topGenders.map(g => `${translateGender(g.gender)} (${g.count})`).join(", ")}`;
                        const gendersHeight = addTextWithWrap(gendersText, indent, breakdownY, maxWidth - 10, 9, "normal");
                        breakdownY += gendersHeight + 2;
                    }

                    yPosition = breakdownY + 3;
                }

                // Para questões abertas: exibir dados do aluno
                if ((question.type === 'to-write' || question.type === 'input' || question.type === 'textarea') && 
                    option.studentInfo && option.studentInfo.length > 0) {
                    checkNewPage(15);
                    doc.setFontSize(9);
                    doc.setFont(undefined, "italic");

                    // Para cada resposta, exibir dados do aluno
                    option.studentInfo.forEach((student) => {
                        const studentInfoText = `  Aluno: ${translateGender(student.gender)}, ${student.course}, ${student.profession}, ${student.age} anos`;
                        const studentInfoHeight = addTextWithWrap(
                            studentInfoText,
                            margin + 10,
                            yPosition,
                            maxWidth - 10,
                            9,
                            "italic"
                        );
                        yPosition += studentInfoHeight + 2;
                    });
                }
            });
        } else {
            checkNewPage(10);
            doc.setFontSize(11);
            doc.setFont(undefined, "normal");
            doc.text("Nenhuma resposta registrada.", margin + 5, yPosition);
            yPosition += 8;
        }

        // Espaçamento entre questões
        yPosition += 10;
    });

    // Salvar o PDF
    const fileName = `Resultados_${data.groupName.replace(/[^a-z0-9]/gi, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);
}

