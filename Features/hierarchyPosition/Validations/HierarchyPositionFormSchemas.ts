import { z } from "zod";

const hierarchyPositionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idHierarchyPosition: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        positionCode: z.string().optional(),
        idPosition: z.number({ required_error: "El campo es requerido" }),
    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        positionCode: z.string().optional(),
        idPosition: z.number({ required_error: "El campo es requerido" }),
        vacancyAmount: z.number().min(1),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default hierarchyPositionFormSchemas;