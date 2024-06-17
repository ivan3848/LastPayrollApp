import { z } from "zod";

const workSchedulerFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idWorkScheduler: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        workSchedulerCode: z.string().optional()
    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        workSchedulerCode: z.string().optional()
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default workSchedulerFormSchemas;