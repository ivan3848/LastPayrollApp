import { z } from "zod";

const CoverPositionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idCoverPosition: z.number().optional(),
        idHierarchyPosition: z.number().optional(),
        idCoverEmployee: z.number().optional(),
        idCoverHierarchyPosition: z.number().optional(),
        description: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        start: z.date({ required_error: "El campo es requerido" }).optional(),
        end: z.date({ required_error: "El campo es requerido" }).optional()
    });

    const addEntityFormSchema = z.object({
        idCoverPosition: z.number().optional(),
        idHierarchyPosition: z.number().optional(),
        idCoverEmployee: z.number().optional(),
        idCoverHierarchyPosition: z.number().optional(),
        description: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        start: z.date({ required_error: "El campo es requerido" }).optional(),
        end: z.date({ required_error: "El campo es requerido" }).optional()
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default CoverPositionFormSchemas;