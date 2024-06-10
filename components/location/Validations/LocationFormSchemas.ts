import { z } from "zod";

const locationFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idLocation: z.number().optional(),
        idZone: z.number({ required_error: "La zona es requerida" }),
        name: z
            .string()
            .min(2, { message: "La ubicación debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La ubicación debe tener menos de 100 caracteres",
            }),
        Address: z.string().optional(),
        Code: z.string().optional(),
    });

    const addEntityFormSchema = z.object({
        idZone: z.number({ required_error: "La zona es requerida" }),
        name: z
            .string()
            .min(2, { message: "La ubicación debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La ubicación debe tener menos de 100 caracteres",
            }),
        Address: z.string().optional(),
        Code: z.string().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default locationFormSchemas;