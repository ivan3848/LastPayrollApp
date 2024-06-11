import { z } from "zod";

const accountingAccountFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idAccountingAccount: z.number().optional(),
        accountNumber: z
            .string()
            .min(2, { message: "El número de cuenta debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El número de cuenta debe tener menos de 100 caracteres",
            }),
        name: z
            .string()
            .min(2, { message: "La cuenta debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La cuenta debe tener menos de 100 caracteres",
            }),
    });

    const addEntityFormSchema = z.object({
        accountNumber: z
            .string()
            .min(2, { message: "El número de cuenta debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El número de cuenta debe tener menos de 100 caracteres",
            }),
        name: z
            .string()
            .min(2, { message: "La cuenta debe tener al menos 2 caracteres" })
            .max(100, {
                message: "La cuenta debe tener menos de 100 caracteres",
            }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default accountingAccountFormSchemas;