import { z } from "zod";

const contractTypeFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idContractType: z.number().optional(),
        description: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
    });

    const addEntityFormSchema = z.object({
        description: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default contractTypeFormSchemas;