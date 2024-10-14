import { z } from "zod";

const isrBreakFormSchemas = () => {
    const editEntityFormSchema = z.object({
        From: z
            .number({ message: "Campo Obligatorio" })
            .min(0, { message: "El valor debe ser un numero positivo" }),

        Percentage: z
            .number()
            .min(0, { message: "El valor debe ser un numero positivo" })
            .max(100, { message: "No puede ser mayor a 100" }),
        Id: z.number().optional(),
        Fee: z.number({ message: "Campo Obligatorio" }).min(0, {
            message: "El valor debe ser un numero positivo",
        }),
        ToUpdate: z.boolean().optional(),
        ToAdd: z.boolean().optional(),
        ToDelete: z.boolean().optional(),
    });

    const addEntityFormSchema = z.object({
        From: z
            .number({ message: "Campo Obligatorio" })
            .min(0, { message: "El valor debe ser un numero positivo" }),

        Percentage: z
            .number()
            .min(0, { message: "El valor debe ser un numero positivo" })
            .max(100, { message: "No puede ser mayor a 100" }),
        Id: z.number().optional(),
        Fee: z.number({ message: "Campo Obligatorio" }).min(0, {
            message: "El valor debe ser un numero positivo",
        }),
    });

    const deleteEntityFormSchema = z.object({
        Id: z.number().optional(),
        ToDelete: z.boolean().optional(),
    });

    return {
        editEntityFormSchema,
        addEntityFormSchema,
        deleteEntityFormSchema,
    };
};

export default isrBreakFormSchemas;
