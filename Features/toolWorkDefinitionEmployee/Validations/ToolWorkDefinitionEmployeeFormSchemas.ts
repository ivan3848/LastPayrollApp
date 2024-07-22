import { z } from "zod";

const ToolWorkDefinitionEmployeeFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idToolWorkDefinitionEmployee: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        code: z.string().optional(),
        description: z.string().optional(),
    });

    const addEntityFormSchema = z.object({
        idToolWorkDefinitionEmployee: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        code: z.string().optional(),
        description: z.string().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default ToolWorkDefinitionEmployeeFormSchemas;