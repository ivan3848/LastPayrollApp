import { z } from "zod";

const regionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idRegion: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "La región debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La región debe tener menos de 100 caracteres",
            }),
        idCountry: z.number({ required_error: "El país es requerido" }),

    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "La región debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La región debe tener menos de 100 caracteres",
            }),
        idCountry: z.number({ required_error: "El país es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default regionFormSchemas;