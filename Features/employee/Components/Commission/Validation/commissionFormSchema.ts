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
        payDate: z.date({ message: "This is required" }),
        idConcept: z.number().optional(),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default commissionFormSchema;
