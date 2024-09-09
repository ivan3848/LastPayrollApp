import { z } from "zod";

const commissionFormSchema = () => {
    const editEntityFormSchema = z.object({
        date: z.date({ message: "El campo de tener una fecha" }),
        idConcept: z.number({ message: "El campo de tener un valor" }),
        amount: z.number().optional(),
        isCommissionPayroll: z.boolean().optional(),
        idEmployee: z.number().optional(),
        idPayrollPay: z.number().optional(),
    });

    const addEntityFormSchema = z.object({
        payDate: z.date({ message: "El campo de tener una fecha" }),
        idConcept: z.number({ message: "El campo de tener un valor" }),
        amount: z.number().optional(),
        isCommissionPayroll: z.boolean().optional(),
        idEmployee: z.number().optional(),
        idPayrollPay: z.number().optional(),
        description: z.string().optional(),
        idCommission: z.number().optional(),
        chargeDate: z.date().optional(),
    });

    const addEntityFormSchemaArchive = z.object({
        payDate: z.date({ message: "El campo de tener una fecha" }),
        isCommissionPayroll: z.boolean().optional(),
        description: z.string({ message: "El campo de tener un valor" }),
    });
    return {
        editEntityFormSchema,
        addEntityFormSchema,
        addEntityFormSchemaArchive,
    };
};

export default commissionFormSchema;
