import { z } from "zod";

const sectorFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idSector: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El sector debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El sector debe tener menos de 100 caracteres",
            }),
        idProvince: z.number({ required_error: "La provincia es requerida" }),
    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El sector debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El sector debe tener menos de 100 caracteres",
            }),
        idProvince: z.number({ required_error: "La provincia es requerida" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default sectorFormSchemas;