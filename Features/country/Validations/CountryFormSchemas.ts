import { z } from "zod";

const countryFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idCountry: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default countryFormSchemas;