import { z } from "zod";

const PayrollAreaFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idPayrollArea: z.number().optional(),
        payrollCode: z.string().min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(6, {
                message: "El campo debe tener menos de 6 caracteres",
            }),
        idPayrollRecurrency: z.number().optional(),
    });

    return { editEntityFormSchema };
}

export default PayrollAreaFormSchemas;