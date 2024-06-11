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
        description: z
            .string()
            .min(2, { message: "El centro de costo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El centro de costodebe tener menos de 100 caracteres",
            }),
    });

    const addEntityFormSchema = z.object({
        accountNumber: z
            .string()
            .min(2, { message: "El número de cuenta debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El número de cuenta debe tener menos de 100 caracteres",
            }),
        description: z
            .string()
            .min(2, { message: "El centro de costo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El centro de costodebe tener menos de 100 caracteres",
            }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default accountingAccountFormSchemas;