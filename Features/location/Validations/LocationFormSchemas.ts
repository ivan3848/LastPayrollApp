import { z } from "zod";

const locationFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idLocation: z.number().optional(),
        idZone: z.number({ required_error: "El campo es requerido" }),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        address: z.string().optional(),
        code: z.string().max(4, {
            message: "El campo no debe exceder los 4 caracteres",
        }).or(z.undefined()),
    });

    const addEntityFormSchema = z.object({
        idZone: z.number({ required_error: "El campo es requerido" }),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        address: z.string().optional(),
        code: z.string().max(4, {
            message: "El campo no debe exceder los 4 caracteres",
        }).or(z.undefined()),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default locationFormSchemas;