import { z } from "zod";

const zoneFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idZone: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "La zona debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La zona debe tener menos de 100 caracteres",
            }),
        idSector: z.number({ required_error: "El sector es requerido" }),
        zoneCode: z.string().optional()
    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "La zona debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La zona debe tener menos de 100 caracteres",
            }),
        idSector: z.number({ required_error: "El sector es requerido" }),
        zoneCode: z.string().optional()

    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default zoneFormSchemas;