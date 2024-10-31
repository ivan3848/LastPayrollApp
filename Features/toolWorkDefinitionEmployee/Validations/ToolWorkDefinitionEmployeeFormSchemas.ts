import { z } from "zod";

const ToolWorkDefinitionEmployeeFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idToolWorkDefinitionEmployee: z.number().optional(),
        idToolWorkDefinition: z.number().optional(),
        description: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        assignationDate: z
            .date({ required_error: "El campo es requerido" })
            .optional(),
    });

    const addEntityFormSchema = z.object({
        idToolWorkDefinitionEmployee: z.number().optional(),
        idToolWorkDefinition: z.number({
            required_error: "El campo es requerido",
        }),
        description: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        assignationDate: z
            .date({ required_error: "El campo es requerido" })
            .optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default ToolWorkDefinitionEmployeeFormSchemas;
