import { z } from "zod";

const statusFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idStatus: z.number().optional(),
        description: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        tableName: z.string().optional(),
    });

    const addEntityFormSchema = z.object({
        description: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        tableName: z.string().optional(),

    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default statusFormSchemas;