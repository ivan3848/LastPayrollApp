import { z } from "zod";

const commissionFormSchema = () => {
    const editEntityFormSchema = z.object({
        date: z.date({ message: "El campo de tener una fecha" }),
        idConcept: z.number({ message: "El campo de tener un valor" }),
        amount: z.number().optional(),
        isCommissionPayroll: z.boolean().optional(),
        idEmployee: z.number().optional(),
    });

    const addEntityFormSchema = z.object({
        payDate: z.date({ message: "El campo de tener una fecha" }),
        idConcept: z.number({ message: "El campo de tener un valor" }),
        amount: z.number().optional(),
        isCommissionPayroll: z.boolean().optional(),
        idEmployee: z.number().optional(),
        idPayrollPay: z.number().optional(),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default commissionFormSchema;
