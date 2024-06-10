import { z } from "zod";

const cityFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idCity: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "La ciudad debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La ciudad debe tener menos de 100 caracteres",
            }),
        idRegion: z.number({ required_error: "La región es requerida" }),

    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "La ciudad debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La ciudad debe tener menos de 100 caracteres",
            }),
        idRegion: z.number({ required_error: "La región es requerida" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default cityFormSchemas;