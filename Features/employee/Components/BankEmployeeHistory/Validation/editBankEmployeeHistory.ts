import { z } from "zod";

const editBankEmployeeHistory = () => {
    const editEntityFormSchema = z.object({
      idBank: z.number(),
        accountNumber: z.string(),
        paymentMethod: z.string().optional(),
        idStatusAccountType: z.number(),
    })


    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        workSchedulerCode: z.string().optional()
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default editBankEmployeeHistory;
