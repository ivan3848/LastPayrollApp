import { z } from "zod";

const bankFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idBank: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        idStatusAccountType: z.number({ required_error: "El campo es requerido" }),
        address: z.string().optional(),
        bankKey: z.string().optional(),
        bankCode: z.string().optional(),
    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        idStatusAccountType: z.number({ required_error: "El campo es requerido" }),
        address: z.string().optional(),
        bankKey: z.string().optional(),
        bankCode: z.string().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default bankFormSchemas;