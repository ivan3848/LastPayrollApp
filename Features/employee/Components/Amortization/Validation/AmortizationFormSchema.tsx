import { z } from "zod";

const AmortizationFormSchema = () => {
    const editEntityFormSchema = z.object({
        idAmortization: z.number(),
        idLease: z.number().optional(),
        idStatus: z.number({ message: "Debe de elegir una Amortización." }),
        idConcept: z.number().optional(),
        isPaid: z.boolean().optional(),
        isToPay: z.boolean().optional(),
        amount: z.number().optional(),
        payDate: z.date({
            message: "El campo debe de tener una fecha.",
        }),
    });

    const addEntityFormSchema = z.object({
        idAmortization: z.number().optional(),
        idLease: z.number().optional(),
        idStatus: z.number({ message: "Debe de elegir una Amortización." }),
        idConcept: z.number().optional(),
        isPaid: z.boolean().optional(),
        isToPay: z.boolean().optional(),
        amount: z
            .number({ message: "El campo no puede estar vacío" })
            .min(1, "El campo no puede ser menor a 1"),
        payDate: z.date({
            message: "El campo debe de tener una fecha.",
        }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default AmortizationFormSchema;
