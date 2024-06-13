import { z } from "zod";

const cityFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idCity: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        idRegion: z.number({ required_error: "El campo es requerido" }),
    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        idRegion: z.number({ required_error: "El campo es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default cityFormSchemas;