import { z } from "zod";

const provinceFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idProvince: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "La provincia debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La provincia debe tener menos de 100 caracteres",
            }),
        idCity: z.number({ required_error: "La ciudad es requerida" }),

    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "La provincia debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La provincia debe tener menos de 100 caracteres",
            }),
        idCity: z.number({ required_error: "La ciudad es requerida" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default provinceFormSchemas;