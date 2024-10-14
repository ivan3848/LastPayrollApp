import { z } from "zod";

const seniorityIncentiveFormSchemas = () => {
    const editEntityFormSchema = z.object({
        Id: z.number().optional(),
        From: z
            .number({ message: "Campo Obligatorio" })
            .min(0, { message: "El valor debe ser un numero positivo" }),
        Days: z
            .number({ message: "Campo Obligatorio" })
            .min(0, { message: "El valor debe ser un numero positivo" })
            .max(365, { message: "No puede ser mayor a 365" }),
        ToUpdate: z.boolean().optional(),
    });

    const addEntityFormSchema = z.object({
        From: z
            .number({ message: "Campo Obligatorio" })
            .min(0, { message: "El valor debe ser un numero positivo" }),
        Days: z
            .number()
            .min(0, { message: "El valor debe ser un numero positivo" })
            .max(365, { message: "No puede ser mayor a 365" }),
        ToAdd: z.boolean().optional(),
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

export default seniorityIncentiveFormSchemas;
