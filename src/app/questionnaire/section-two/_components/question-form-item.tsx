"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { getQuestionOptions } from "./custom-question-options";

interface Question {
    id: string;
    questionText: string;
    type: string;
    questionNumber: string;
}

interface QuestionFormItemProps {
    question: Question;
    value: string | string[];
    onChange: (value: string | string[]) => void;
    otherValue?: string;
    onOtherChange?: (value: string) => void;
}

export function QuestionFormItem({ question, value, onChange, otherValue, onOtherChange }: QuestionFormItemProps) {
    const options = getQuestionOptions(question.id);

    const handleMultipleSelection = (option: string, checked: boolean) => {
        const currentValues = Array.isArray(value) ? value : [];

        if (checked) {
            // Adicionar opção se não estiver selecionada
            if (!currentValues.includes(option)) {
                onChange([...currentValues, option]);
            }
        } else {
            // Remover opção se estiver selecionada
            onChange(currentValues.filter(v => v !== option));
        }
    };

    const handleSingleSelection = (selectedValue: string) => {
        onChange(selectedValue);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-medium text-[#760d11]">
                    {question.questionText} {question.type === "to-mark-several" && <span className="text-sm text-gray-600 font-normal">(Permitido marcar mais de uma)</span>}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {question.type === "to-mark" ? (
                    <RadioGroup
                        value={Array.isArray(value) ? "" : value}
                        onValueChange={handleSingleSelection}
                        className="space-y-2 text-gray-700"
                    >
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={option}
                                    id={`${question.id}-option-${index}`}
                                />
                                <Label htmlFor={`${question.id}-option-${index}`}>
                                    {option}
                                </Label>
                                {option === "Outros" && value === "Outros" && (
                                    <Input
                                        placeholder="Especifique..."
                                        className="ml-2 flex-1 bg-white border-1 border-gray-200 text-gray-900 focus:border-accent focus:ring-accent"
                                        value={otherValue || ""}
                                        onChange={(e) => onOtherChange?.(e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </RadioGroup>
                ) : question.type === "to-mark-several" ? (
                    <div className="space-y-2 text-gray-700">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-start space-x-2">
                                <Checkbox
                                    id={`${question.id}-option-${index}`}
                                    checked={Array.isArray(value) ? value.includes(option) : false}
                                    onCheckedChange={(checked) => handleMultipleSelection(option, checked as boolean)}
                                />
                                <Label htmlFor={`${question.id}-option-${index}`}>
                                    {option}
                                </Label>
                                {option === "Outros" && Array.isArray(value) && value.includes("Outros") && (
                                    <Input
                                        placeholder="Especifique..."
                                        className="ml-2 flex-1 bg-white border-1 border-gray-200 text-gray-900 focus:border-accent focus:ring-accent"
                                        value={otherValue || ""}
                                        onChange={(e) => onOtherChange?.(e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Label htmlFor={`${question.id}-input`} className="text-gray-700">
                            Sua resposta:
                        </Label>
                        <Input
                            id={`${question.id}-input`}
                            value={Array.isArray(value) ? "" : value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="Digite sua resposta aqui..."
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
