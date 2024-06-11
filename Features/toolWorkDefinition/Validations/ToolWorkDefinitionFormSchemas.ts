import { z } from "zod";

const toolWorkDefinitionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idToolWorkDefinition: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El nombre de herramienta debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El nombre de herramienta debe tener menos de 100 caracteres",
            }),
        code: z.string().optional(),
        description: z.string().optional(),
    });

    const addEntityFormSchema = z.object({
        idToolWorkDefinition: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El nombre de herramienta debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El nombre de herramienta debe tener menos de 100 caracteres",
            }),
        code: z.string().optional(),
        description: z.string().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default toolWorkDefinitionFormSchemas;