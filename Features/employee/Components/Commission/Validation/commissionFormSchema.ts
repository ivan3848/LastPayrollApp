import { z } from "zod";

const commissionFormSchema = () => {
    const editEntityFormSchema = z.object({
        identification: z.string().optional(),
        firstName: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres." })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres.",
            }),
    });

    const addEntityFormSchema = z.object({
        payDate: z.date({ message: "El campo de tener una fecha" }),
        idConcept: z.number({ message: "El campo de tener un valor" }),
        amount: z.number().optional(),
        isCommissionPayroll: z.boolean().optional(),
        idEmployee: z.number().optional(),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default commissionFormSchema;
