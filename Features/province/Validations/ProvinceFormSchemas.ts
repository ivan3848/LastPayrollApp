import { z } from "zod";

const provinceFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idProvince: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        idCity: z.number({ required_error: "El campo es requerido" }),

    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        idCity: z.number({ required_error: "El campo es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default provinceFormSchemas;